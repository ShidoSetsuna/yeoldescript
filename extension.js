const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// Single source of truth — pull the real transpiler + extension map from
// the CLI module so the extension and CLI stay in lockstep. No more
// half-stale duplicate dictionaries.
const { transpile, stampParchment, EXTENSION_MAP } = require('./compiler.js');

const SUPPORTED_EXTS = Object.keys(EXTENSION_MAP);
const LANGUAGE_IDS = ['yeoldescript', 'yeoldescript-ts', 'yeoldescript-tsx'];

/**
 * Ye Olde Script VS Code Extension
 * Activates when any .yeolde / .ye / .parchment / .scrollx / .illuminated
 * file is opened.
 */
function activate(context) {
  console.log('⚔️  Ye Olde Script hath been activated! Forsooth.');

  // First-run greeting
  const hasGreeted = context.globalState.get('yeolde.hasGreeted', false);
  if (!hasGreeted) {
    vscode.window.showInformationMessage(
      '⚔️ Ye Olde Script (ES1600) hath been activated! ' +
      'May thy Incantations be free of dark magic.',
      'Huzzah!',
      'To the Stocks'
    ).then(choice => {
      if (choice === 'To the Stocks') {
        vscode.window.showWarningMessage(
          'Thou art being sent to the stocks for ungrateful behaviour.'
        );
      }
    });
    context.globalState.update('yeolde.hasGreeted', true);
  }

  // ── COMMAND: Compile current file ─────────────────────────────────────────
  const compileCommand = vscode.commands.registerCommand('yeoldescript.compile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage(
        '❌ No active parchment detected! Open a Ye Olde file first, thou scoundrel.'
      );
      return;
    }
    await editor.document.save();
    await compilePath(editor.document.fileName, { revealAfter: true });
  });

  // ── COMMAND: Compile every Ye Olde file in the workspace ──────────────────
  const compileAllCommand = vscode.commands.registerCommand('yeoldescript.compileAll', async () => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
      vscode.window.showErrorMessage('❌ No workspace open. Cannot compile all.');
      return;
    }
    let total = 0;
    let failed = 0;
    for (const folder of folders) {
      const files = walkSync(folder.uri.fsPath);
      for (const f of files) {
        const ok = await compilePath(f, { silent: true });
        if (ok) total++; else failed++;
      }
    }
    vscode.window.showInformationMessage(
      `⚔️  Compiled ${total} parchment(s)${failed ? ` (${failed} failed)` : ''}.`
    );
  });

  // ── HOVER PROVIDER ─────────────────────────────────────────────────────────
  // Same provider, registered for all three Ye Olde language IDs so that
  // hover tooltips work in .parchment and .scrollx files too — not just
  // .yeolde / .ye.
  const hoverProvider = {
    provideHover(document, position) {
      // Match multi-word tokens like "Alas, Shouldst" or "be as one with"
      const range = document.getWordRangeAtPosition(position, /[A-Za-z][A-Za-z,\s]*[A-Za-z]/);
      if (!range) return;
      const word = document.getText(range).trim();
      const meaning = HOVER_DICT[word];
      if (!meaning) return;
      return new vscode.Hover(
        new vscode.MarkdownString(`**Ye Olde Script** ⚔️\n\n\`${word}\` → ${meaning}`)
      );
    },
  };

  const hoverDisposables = LANGUAGE_IDS.map(lang =>
    vscode.languages.registerHoverProvider(lang, hoverProvider)
  );

  context.subscriptions.push(compileCommand, compileAllCommand, ...hoverDisposables);
}

function deactivate() {
  console.log('⚔️  Ye Olde Script hath been deactivated. The dark magic sleepeth.');
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Compile a single Ye Olde source file to its corresponding modern file.
 * Output extension picked from EXTENSION_MAP, so .parchment → .ts and
 * .scrollx → .tsx (no more hardcoded .js for everything).
 */
async function compilePath(inputPath, { silent = false, revealAfter = false } = {}) {
  const ext = path.extname(inputPath);
  const outExt = EXTENSION_MAP[ext];
  if (!outExt) {
    if (!silent) {
      vscode.window.showWarningMessage(
        `⚠️  "${path.basename(inputPath)}" is not a Ye Olde Script file. ` +
        `Known extensions: ${SUPPORTED_EXTS.join(', ')}`
      );
    }
    return false;
  }

  const outputPath = inputPath.slice(0, -ext.length) + outExt;

  try {
    const src = fs.readFileSync(inputPath, 'utf8');
    const { code } = transpile(src);
    fs.writeFileSync(outputPath, stampParchment(code, path.basename(inputPath), outExt), 'utf8');
    if (!silent) {
      const action = await vscode.window.showInformationMessage(
        `✅ Huzzah! Compiled to ${path.basename(outputPath)}`,
        'Open Compiled File'
      );
      if (revealAfter && action === 'Open Compiled File') {
        const doc = await vscode.workspace.openTextDocument(outputPath);
        await vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside);
      }
    }
    return true;
  } catch (err) {
    vscode.window.showErrorMessage(
      `💀 BURN THE SCRIPT! The foul error readeth: ${err.message}`
    );
    return false;
  }
}

/**
 * Recursive directory walk, used by the "Compile All" command.
 * Skips node_modules and dot-folders (.git, .next, etc.).
 */
function walkSync(dir) {
  const out = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkSync(full));
    } else if (SUPPORTED_EXTS.some(e => entry.name.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

// ─── Hover dictionary ──────────────────────────────────────────────────────
// Subset of the full transpile dictionary, with friendlier explanations
// for hover. Add more as the joke matures.
const HOVER_DICT = {
  // Variables
  'Beholdeth':       '`let` — A mutable variable. Like thy commitments.',
  'Decree':          '`const` — An immutable constant. Like the King\'s word.',
  'Proclameth':      '`var` — Thou monster.',

  // Functions
  'Incantation':                '`function` — Dark magic, formalized.',
  'Henceforth Incantation':     '`async function` — Async incantation.',
  'Awaiteth':                   '`await` — Waiteth patiently for the async gods.',
  'Bestow':                     '`return` — Granteth a value to the caller.',

  // Control flow
  'Shouldst':         '`if` — Conditional logic for those uncertain of fate.',
  'Alas, Shouldst':   '`else if` — The Shakespearean else if.',
  'Elsewise':         '`else` — The path not taken... until now.',
  'Whilst':           '`while` — Loopeth, as the serf toils.',
  'TemptFate':        '`try` — Walk boldly into danger.',
  'Repent':           '`catch` — Beg forgiveness for thy runtime errors.',
  'Finalleth':        '`finally` — Runs regardless. Justice is blind.',

  // Literals
  'Verily':       '`true` — Verily, this is true. No argument.',
  'Nay':          '`false` — Nay. Absolutely not. Get out.',
  'Nothingness':  '`null` — The void. The absence of all things.',
  'Void':         '`undefined` — Similar to null, but more chaotic.',
  'Forsooth':     '`debugger` — Stops everything so thou canst inspect the carnage.',

  // Operators
  'surpass':         '`>` — Greater than.',
  'falleth below':   '`<` — Less than.',
  'doth equal':      '`===` — Strict equality. No type coercion. The compiler hath standards.',
  'be as one with':  '`===` — Same as doth equal, but more poetic.',
  'doth not equal':  '`!==` — Strict inequality.',
  'no less than':    '`>=` — Greater than or equal.',
  'no more than':    '`<=` — Less than or equal.',
  'and furthermore': '`&&` — Logical AND.',
  'or perchance':    '`||` — Logical OR.',

  // Modules
  'Summon':                  '`import` — Bring forth a module.',
  'hailing from':            '`from` — Specifies whence the module cometh.',
  'ShareWithTheRealm':       '`export` — Make available to other parchments.',
  'PresentToTheKingdom':     '`export default` — The chosen one.',

  // Console
  'TownCrier':           '`console` — Thy output to the terminal. Ring ring.',
  'TownCrier.bellow':    '`console.log` — Plain logging.',
  'TownCrier.weep':      '`console.warn` — A warning, gently sobbed.',
  'TownCrier.shriek':    '`console.error` — BURN THE SCRIPT!',
  'TownCrier.mumble':    '`console.log` — Quiet logging.',
  'TownCrier.whisper':   '`console.debug` — Verbose mode only.',
  'TownCrier.proclaim':  '`console.info` — For important announcements.',

  // TypeScript
  'Parchment':         '`string` — A scroll of text.',
  'Tally':             '`number` — A counted thing.',
  'TrueOrNay':         '`boolean` — A yes-or-no decree.',
  'Naught':            '`void` — Returns nothing.',
  'WhateverThouWilt':  '`any` — TypeScript escape hatch. Use sparingly.',
  'Mysterious':        '`unknown` — Type-safe `any`. Inspect before use.',
  'Nevereth':          '`never` — A function that never returns.',
  'Multitude':         '`Array` — A list of things.',
  'Oath':              '`Promise` — A pledge that may or may not be honored.',
  'Ledger':            '`Record` — A keyed scroll.',
  'Covenant':          '`interface` — A binding agreement on shape.',
  'Proclamation':      '`type` — A type alias.',
  'HierarchyOfRank':   '`enum` — Ordered choices.',
  'PickThyFields':     '`Pick<T, K>` — Select fields from a type.',
  'OmitHeresy':        '`Omit<T, K>` — Exclude fields from a type.',
  'PartialScroll':     '`Partial<T>` — All fields optional.',
  'RequiredByLaw':     '`Required<T>` — All fields required.',
  'ReadOnlyScroll':    '`Readonly<T>` — All fields readonly.',
  'disguiseth as':     '`as` — Type assertion.',
  'bequeatheth':       '`extends` — Inherits from / extends.',
  'the nature of':     '`typeof` — Type query.',
  'the keys of':       '`keyof` — Get keys of a type.',
};

module.exports = { activate, deactivate };
