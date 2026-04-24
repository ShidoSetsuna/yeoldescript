const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * Ye Olde Script VS Code Extension
 * Activateth when a .yeolde, .ye, or .parchment file is opened
 */

function activate(context) {

  console.log('⚔️  Ye Olde Script hath been activated! Forsooth.');

  // Show a greeting when a .yeolde file is opened for the first time
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

  // ── COMMAND: Compile Parchment ─────────────────────────────────────────────
  const compileCommand = vscode.commands.registerCommand('yeoldescript.compile', async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage(
        '❌ No active parchment detected! Open a .yeolde file first, thou scoundrel.'
      );
      return;
    }

    const doc = editor.document;
    const ext = path.extname(doc.fileName);

    if (!['.yeolde', '.ye', '.parchment'].includes(ext)) {
      vscode.window.showWarningMessage(
        '⚠️ This doth not appear to be a Ye Olde Script file. ' +
        'Only .yeolde, .ye, and .parchment files can be compiled.'
      );
      return;
    }

    // Save the file first
    await doc.save();

    const inputPath  = doc.fileName;
    const outputPath = inputPath.replace(/\.(yeolde|ye|parchment)$/, '.js');

    try {
      // Inline transpile (same logic as compiler.js)
      let code = fs.readFileSync(inputPath, 'utf8');
      code = transpile(code);
      const stamped = stampParchment(code, path.basename(inputPath));
      fs.writeFileSync(outputPath, stamped, 'utf8');

      vscode.window.showInformationMessage(
        `✅ Huzzah! Compiled to ${path.basename(outputPath)}`,
        'Open Compiled File'
      ).then(choice => {
        if (choice === 'Open Compiled File') {
          vscode.workspace.openTextDocument(outputPath)
            .then(d => vscode.window.showTextDocument(d, vscode.ViewColumn.Beside));
        }
      });

    } catch (err) {
      vscode.window.showErrorMessage(
        `💀 BURN THE SCRIPT! The foul error readeth: ${err.message}`
      );
    }
  });

  // ── HOVER PROVIDER ─────────────────────────────────────────────────────────
  // When you hover over ancient words, show their modern translation
  const hoverProvider = vscode.languages.registerHoverProvider('yeoldescript', {
    provideHover(document, position) {
      const range = document.getWordRangeAtPosition(position, /[A-Za-z,\s]+/);
      if (!range) return;
      const word = document.getText(range).trim();

      const translations = {
        'Beholdeth':       '`let` — A mutable variable. Like your commitments.',
        'Decree':          '`const` — An immutable constant. Like the King\'s word.',
        'Incantation':     '`function` — Dark magic, formalized.',
        'Shouldst':        '`if` — Conditional logic for those uncertain of fate.',
        'Elsewise':        '`else` — The path not taken... until now.',
        'Verily':          '`true` — Verily, this is true. No argument.',
        'Nay':             '`false` — Nay. Absolutely not. Get out.',
        'TemptFate':       '`try` — Walk boldly into danger.',
        'Repent':          '`catch` — Beg forgiveness for thy runtime errors.',
        'Bestow':          '`return` — Granteth a value to the caller.',
        'Yeet':            '`throw` — Hurls an error into the abyss.',
        'Nothingness':     '`null` — The void. The absence of all things.',
        'Void':            '`undefined` — Similar to null, but more chaotic.',
        'Forsooth':        '`debugger` — Stops everything so thou canst inspect the carnage.',
        'Whilst':          '`while` — Loopeth, as the serf toils.',
        'TownCrier':       '`console` — Your output to the terminal. Ring ring.',
        'Henceforth':      '`async` — Because even in 1642, some tasks took time.',
        'Awaiteth':        '`await` — Waiteth patiently for the async gods.',
        'surpass':         '`>` — Greater than.',
        'falleth below':   '`<` — Less than.',
        'doth equal':      '`===` — Strict equality. No type coercion. The compiler hath standards.',
        'be as one with':  '`===` — Same as doth equal, but more poetic.',
        'and furthermore': '`&&` — Logical AND.',
        'or perchance':    '`||` — Logical OR.',
      };

      const translation = translations[word];
      if (!translation) return;

      return new vscode.Hover(
        new vscode.MarkdownString(
          `**Ye Olde Script** ⚔️\n\n\`${word}\` → ${translation}`
        )
      );
    }
  });

  context.subscriptions.push(compileCommand, hoverProvider);
}

function deactivate() {
  console.log('⚔️  Ye Olde Script hath been deactivated. The dark magic sleepeth.');
}

// ── TRANSPILER (same logic as compiler.js, inlined for extension use) ────────
function transpile(code) {
  return code
    .replace(/\bAlas,\s+Shouldst\b/g,         'else if')
    .replace(/\bdoth not equal\b/g,            '!==')
    .replace(/\bdoth equal\b/g,                '===')
    .replace(/\bbe as one with\b/g,            '===')
    .replace(/\bsurpass(?:eth)?\b/g,           '>')
    .replace(/\bfalleth below\b/g,             '<')
    .replace(/\bno less than\b/g,              '>=')
    .replace(/\bno more than\b/g,              '<=')
    .replace(/\band furthermore\b/g,           '&&')
    .replace(/\bor perchance\b/g,              '||')
    .replace(/\bHenceforth\s+Incantation\b/g,  'async function')
    .replace(/\bHenceforth\b/g,                'async')
    .replace(/\bAwaiteth\b/g,                  'await')
    .replace(/\bBeholdeth\b/g,                 'let')
    .replace(/\bDecree\b/g,                    'const')
    .replace(/\bProclameth\b/g,                'var')
    .replace(/\bIncantation\b/g,               'function')
    .replace(/\bShouldst\b/g,                  'if')
    .replace(/\bElsewise\b/g,                  'else')
    .replace(/\bPerchance\b/g,                 'if')
    .replace(/\bWhilst\b/g,                    'while')
    .replace(/\bTraverse\b/g,                  'for')
    .replace(/\bTemptFate\b/g,                 'try')
    .replace(/\bRepent\b/g,                    'catch')
    .replace(/\bFinalleth\b/g,                 'finally')
    .replace(/\bBestow\b/g,                    'return')
    .replace(/\bYeet\b(.+?)\bunto\b[^;]+/g,   (_, t) => `throw ${t.trim()}`)
    .replace(/\bYeet\b/g,                      'throw')
    .replace(/\bVerily\b/g,                    'true')
    .replace(/\bNay\b/g,                       'false')
    .replace(/\bNothingness\b/g,               'null')
    .replace(/\bVoid\b/g,                      'undefined')
    .replace(/\bForsooth\b/g,                  'debugger')
    .replace(/\bTownCrier\.bellow\b/g,         'console.log')
    .replace(/\bTownCrier\.weep\b/g,           'console.warn')
    .replace(/\bTownCrier\.mumble\b/g,         'console.log')
    .replace(/\bTownCrier\.shriek\b/g,         'console.error')
    .replace(/\bTownCrier\.whisper\b/g,        'console.debug')
    .replace(/\bTownCrier\.proclaim\b/g,       'console.info');
}

function stampParchment(code, inputFile) {
  const now = new Date();
  return [
    `// AUTO-GENERATED BY YE OLDE SCRIPT TRANSPILER v1.6.4.2`,
    `// Source: ${inputFile}  |  Compiled: ${now.toUTCString()}`,
    `// "Thou art reading machine-translated medieval JavaScript."`,
    ``,
    code
  ].join('\n');
}

module.exports = { activate, deactivate };
