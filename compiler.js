#!/usr/bin/env node

/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║        YE OLDE SCRIPT TRANSPILER  —  v2.0.0  (The TSX Update)       ║
 * ║  "Now with TypeScript, React, and Next.js. God help us all."         ║
 * ║                                                                      ║
 * ║  By decree of the TC39 Council of Elders, Anno Domini 1642          ║
 * ║  Extended by the React Guild and the Next.js Monastery              ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * FILE EXTENSIONS:
 *   .yeolde       → .js       (Vanilla JavaScript, for simple peasants)
 *   .ye           → .js       (Shorthand)
 *   .parchment    → .ts       (TypeScript. Typed medieval chaos.)
 *   .scrollx      → .tsx      (React TSX. Illuminated manuscripts.)
 *   .illuminated  → .tsx      (Alias for .scrollx)
 *
 * USAGE:
 *   node compiler.js <input>             auto-detects output
 *   node compiler.js page.scrollx        → page.tsx
 *   node compiler.js types.parchment     → types.ts
 *   node compiler.js all                 → compiles everything in cwd
 *   node compiler.js app.scrollx --run   → compile and run
 *   node compiler.js app.scrollx --watch → watch mode
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─────────────────────────────────────────────────────────────────────────────
// FILE EXTENSION MAP
// ─────────────────────────────────────────────────────────────────────────────

const EXTENSION_MAP = {
  '.yeolde':      '.js',
  '.ye':          '.js',
  '.parchment':   '.ts',
  '.scrollx':     '.tsx',
  '.illuminated': '.tsx',
};

// ─────────────────────────────────────────────────────────────────────────────
// THE GRAND ROYAL DICTIONARY — COMPLETE EDITION
// Order matters. Multi-word phrases MUST precede single-word replacements.
// ─────────────────────────────────────────────────────────────────────────────

const ROYAL_DECREES = [

  // ══════════════════════════════════════════════════════════════════════════
  // I. IMPORTS & EXPORTS
  // ══════════════════════════════════════════════════════════════════════════

  [/\bPresentToTheKingdom\b/g,              'export default'],
  [/\bShareWithTheRealm\b/g,               'export'],
  [/\bSummon\b/g,                          'import'],
  [/\bhailing from\b/g,                    'from'],

  // ══════════════════════════════════════════════════════════════════════════
  // II. NEXT.JS DIRECTIVES (must be early — they're string literals)
  // ══════════════════════════════════════════════════════════════════════════

  [/'this parchment doth run on the client'/g, "'use client'"],
  [/'this parchment doth run on the server'/g, "'use server'"],
  [/"this parchment doth run on the client"/g, '"use client"'],
  [/"this parchment doth run on the server"/g, '"use server"'],

  // ══════════════════════════════════════════════════════════════════════════
  // III. MULTI-WORD OPERATORS (must precede single-word keywords)
  // ══════════════════════════════════════════════════════════════════════════

  [/\bAlas,\s+Shouldst\b/g,               'else if'],
  [/\bdoth not equal\b/g,                 '!=='],
  [/\bdoth equal\b/g,                     '==='],
  [/\bbe as one with\b/g,                 '==='],
  [/\bno less than\b/g,                   '>='],
  [/\bno more than\b/g,                   '<='],
  [/\bfalleth below\b/g,                  '<'],
  [/\bsurpass(?:eth)?\b/g,               '>'],
  [/\band furthermore\b/g,                '&&'],
  [/\bor perchance\b/g,                   '||'],
  [/\bnot\s+(?=[a-zA-Z(])/g,             '!'],
  [/\bHenceforth\s+Incantation\b/g,       'async function'],
  [/\babideth by\b/g,                     'implements'],
  [/\bthe nature of\b/g,                  'typeof'],
  [/\bthe keys of\b/g,                    'keyof'],
  [/\bdisguiseth as\b/g,                  'as'],

  // ══════════════════════════════════════════════════════════════════════════
  // IV. TYPESCRIPT — PRIMITIVE TYPES
  // ══════════════════════════════════════════════════════════════════════════

  [/\bParchment\b/g,                      'string'],
  [/\bTally\b/g,                          'number'],
  [/\bTrueOrNay\b/g,                      'boolean'],
  [/\bNaught\b/g,                         'void'],
  [/\bWhateverThouWilt\b/g,              'any'],
  [/\bMysterious\b/g,                     'unknown'],
  [/\bNevereth\b/g,                       'never'],

  // ══════════════════════════════════════════════════════════════════════════
  // V. TYPESCRIPT — COMPLEX TYPES & UTILITIES
  // ══════════════════════════════════════════════════════════════════════════

  [/\bMultitude\b/g,                      'Array'],
  [/\bOath\b/g,                           'Promise'],
  [/\bLedger\b/g,                         'Record'],
  [/\bPartialScroll\b/g,                  'Partial'],
  [/\bRequiredByLaw\b/g,                  'Required'],
  [/\bReadOnlyScroll\b/g,                 'Readonly'],
  [/\bPickThyFields\b/g,                  'Pick'],
  [/\bOmitHeresy\b/g,                     'Omit'],
  [/\bExcludeThePeasants\b/g,            'Exclude'],

  // ══════════════════════════════════════════════════════════════════════════
  // VI. TYPESCRIPT — DECLARATIONS & MODIFIERS
  // ══════════════════════════════════════════════════════════════════════════

  [/\bCovenant\b/g,                       'interface'],
  [/\bProclamation\b/g,                   'type'],
  [/\bHierarchyOfRank\b/g,              'enum'],
  [/\bImmutable\b/g,                      'readonly'],
  [/\bConcealed\b/g,                      'private'],
  [/\bShielded\b/g,                       'protected'],
  [/\bExposed\b/g,                        'public'],
  [/\bStationary\b/g,                     'static'],
  [/\bRoyallyAbstract\b/g,              'abstract'],
  [/\bbequeatheth\b/g,                    'extends'],

  // ══════════════════════════════════════════════════════════════════════════
  // VII. REACT HOOKS
  // ══════════════════════════════════════════════════════════════════════════

  [/\buseCrystalBall\b/g,                'useState'],
  [/\bwhenTheMoonRiseth\b/g,             'useEffect'],
  [/\buseParchmentScroll\b/g,            'useRef'],
  [/\bconsultTheOracle\b/g,              'useContext'],
  [/\bremembereth\b/g,                   'useMemo'],
  [/\brecallIncantation\b/g,             'useCallback'],
  [/\buseCouncilOfElders\b/g,           'useReducer'],
  [/\bforgeRef\b/g,                      'forwardRef'],
  [/\bcreateScrollContext\b/g,           'createContext'],
  [/\buseLayoutSorcery\b/g,             'useLayoutEffect'],
  [/\buseImperativeScroll\b/g,          'useImperativeHandle'],
  [/\buseDeferredToil\b/g,              'useDeferredValue'],
  [/\buseIdScroll\b/g,                  'useId'],

  // React APIs
  [/\bfragmentOfReality\b/g,            'Fragment'],
  [/\bsuspendThyBelief\b/g,             'Suspense'],
  [/\bcreatePortalgate\b/g,             'createPortal'],
  [/\bChildren\.mapPeasants\b/g,        'Children.map'],

  // ══════════════════════════════════════════════════════════════════════════
  // VIII. NEXT.JS APIS
  // ══════════════════════════════════════════════════════════════════════════

  [/\bconsultTheRoyalMap\b/g,           'useRouter'],
  [/\bwhereAmI\b/g,                     'usePathname'],
  [/\breadTheScroll\b/g,                'useSearchParams'],
  [/\bwatchTheRoad\b/g,                 'useParams'],
  [/\bfetchFromTheKingdomServer\b/g,    'getServerSideProps'],
  [/\binscribeIntoStone\b/g,            'getStaticProps'],
  [/\bcartographTheKingdom\b/g,         'getStaticPaths'],
  [/\bredirectToExile\b/g,              'redirect'],
  [/\bnotFoundInTheKingdom\b/g,         'notFound'],
  [/\broyalMetadata\b/g,                'metadata'],

  // ══════════════════════════════════════════════════════════════════════════
  // IX. JSX PROPS (React-specific — safe to translate)
  // ══════════════════════════════════════════════════════════════════════════

  [/\bcaste=/g,                          'className='],
  [/\buponBeingStruck=/g,               'onClick='],
  [/\buponMutation=/g,                   'onChange='],
  [/\buponSubmission=/g,                 'onSubmit='],
  [/\buponKeystroke=/g,                  'onKeyDown='],
  [/\buponKeyRelease=/g,                 'onKeyUp='],
  [/\buponGazing=/g,                     'onFocus='],
  [/\buponLookingAway=/g,               'onBlur='],
  [/\buponHovering=/g,                   'onMouseEnter='],
  [/\buponFleeing=/g,                    'onMouseLeave='],
  [/\buponLoading=/g,                    'onLoad='],
  [/\buponScrolling=/g,                  'onScroll='],
  [/\buponError=/g,                      'onError='],
  [/\bimprisoned=/g,                     'disabled='],
  [/\bprophecy=/g,                       'placeholder='],
  [/\bdestination=/g,                    'href='],
  [/\bprovenance=/g,                     'src='],
  [/\binscription=/g,                    'alt='],
  [/\btether=/g,                         'ref='],

  // ══════════════════════════════════════════════════════════════════════════
  // X. VARIABLE DECLARATIONS
  // ══════════════════════════════════════════════════════════════════════════

  [/\bBeholdeth\b/g,                     'let'],
  [/\bDecree\b/g,                        'const'],
  [/\bProclameth\b/g,                    'var'],

  // ══════════════════════════════════════════════════════════════════════════
  // XI. FUNCTIONS & ASYNC
  // ══════════════════════════════════════════════════════════════════════════

  [/\bHenceforth\b/g,                   'async'],
  [/\bAwaiteth\b/g,                     'await'],
  [/\bIncantation\b/g,                  'function'],

  // ══════════════════════════════════════════════════════════════════════════
  // XII. CONTROL FLOW
  // ══════════════════════════════════════════════════════════════════════════

  [/\bShouldst\b/g,                      'if'],
  [/\bElsewise\b/g,                      'else'],
  [/\bPerchance\b/g,                     'if'],
  [/\bWhilst\b/g,                        'while'],
  [/\bTraverse\b/g,                      'for'],
  [/\bForEachPeasant\b/g,               'forEach'],
  [/\bSwitchThyFate\b/g,                'switch'],
  [/\bCaseOf\b/g,                        'case'],
  [/\bBreakFree\b/g,                     'break'],
  [/\bContinueSuffering\b/g,            'continue'],

  // ══════════════════════════════════════════════════════════════════════════
  // XIII. ERROR HANDLING
  // ══════════════════════════════════════════════════════════════════════════

  [/\bTemptFate\b/g,                     'try'],
  [/\bRepent\b/g,                        'catch'],
  [/\bFinalleth\b/g,                     'finally'],

  // ══════════════════════════════════════════════════════════════════════════
  // XIV. RETURN, THROW, MISC
  // ══════════════════════════════════════════════════════════════════════════

  [/\bBestow\b/g,                        'return'],
  [/\bYeet\b(.+?)\bunto\b[^;{\n]+/g,    (_, t) => `throw ${t.trim()}`],
  [/\bYeet\b/g,                          'throw'],
  [/\bForsooth\b/g,                      'debugger'],
  [/\bDeleteFromExistence\b/g,          'delete'],

  // ══════════════════════════════════════════════════════════════════════════
  // XV. BOOLEANS & NULLS
  // ══════════════════════════════════════════════════════════════════════════

  [/\bVerily\b/g,                        'true'],
  [/\bNay\b/g,                           'false'],
  [/\bNothingness\b/g,                   'null'],
  [/\bVoid\b/g,                          'undefined'],

  // ══════════════════════════════════════════════════════════════════════════
  // XVI. THE TOWN CRIER (console)
  // ══════════════════════════════════════════════════════════════════════════

  [/\bTownCrier\.bellow\b/g,            'console.log'],
  [/\bTownCrier\.weep\b/g,              'console.warn'],
  [/\bTownCrier\.mumble\b/g,            'console.log'],
  [/\bTownCrier\.shriek\b/g,            'console.error'],
  [/\bTownCrier\.whisper\b/g,           'console.debug'],
  [/\bTownCrier\.proclaim\b/g,          'console.info'],
  [/\bTownCrier\.tableOfContents\b/g,   'console.table'],
  [/\bTownCrier\.countThePeasants\b/g,  'console.count'],
  [/\bTownCrier\.time\b/g,              'console.time'],
  [/\bTownCrier\.timeEndeth\b/g,        'console.timeEnd'],

];

// ─────────────────────────────────────────────────────────────────────────────
// TRANSPILER
// ─────────────────────────────────────────────────────────────────────────────

function transpile(src, verbose = false) {
  let code = src;
  const log = [];
  for (const [pattern, replacement] of ROYAL_DECREES) {
    const before = code;
    code = typeof replacement === 'function'
      ? code.replace(pattern, replacement)
      : code.replace(pattern, replacement);
    if (verbose && code !== before) {
      log.push(`  ⚔️  ${String(pattern)} → ${typeof replacement === 'string' ? replacement : '[fn]'}`);
    }
  }
  return { code, log };
}

function stampParchment(code, inputFile, outputExt) {
  const label = { '.js': 'JS', '.ts': 'TypeScript', '.jsx': 'JSX', '.tsx': 'React TSX' }[outputExt] ?? 'JS';
  return [
    `// ══════════════════════════════════════════════════════════════════`,
    `//  AUTO-GENERATED — YE OLDE SCRIPT TRANSPILER v2.0.0`,
    `//  Source: ${inputFile}  →  ${label}`,
    `//  "Thou art reading machine-translated medieval ${label}."`,
    `// ══════════════════════════════════════════════════════════════════`,
    ``, code,
  ].join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────────────────────────────────────

const args      = process.argv.slice(2);
const verbose   = args.includes('--verbose');
const shouldRun = args.includes('--run');
const watchMode = args.includes('--watch');
const inputFile = args.find(a => !a.startsWith('--'));

if (!inputFile || inputFile === '--help') {
  console.log(`Usage: node compiler.js <file.scrollx|.parchment|.yeolde> [--run] [--watch] [--verbose]`);
  console.log(`       node compiler.js all   (compile everything in cwd)`);
  process.exit(0);
}

// ── Compile ALL ───────────────────────────────────────────────────────────────
if (inputFile === 'all') {
  const files = fs.readdirSync('.').filter(f => Object.keys(EXTENSION_MAP).some(e => f.endsWith(e)));
  if (!files.length) { console.log('⚠️  No ancient parchments found.'); process.exit(0); }
  console.log(`\n⚔️  Compiling ${files.length} parchment(s)...\n`);
  for (const f of files) {
    const ext = path.extname(f);
    const outExt = EXTENSION_MAP[ext];
    const out = f.slice(0, -ext.length) + outExt;
    try {
      const { code } = transpile(fs.readFileSync(f, 'utf8'), verbose);
      fs.writeFileSync(out, stampParchment(code, f, outExt));
      console.log(`  ✅  ${f}  →  ${out}`);
    } catch (e) { console.error(`  ❌  ${f}: ${e.message}`); }
  }
  process.exit(0);
}

// ── Single file ───────────────────────────────────────────────────────────────
const inputExt = path.extname(inputFile);
if (!EXTENSION_MAP[inputExt]) {
  console.error(`❌  Unknown extension "${inputExt}". Known: ${Object.keys(EXTENSION_MAP).join(', ')}`);
  process.exit(1);
}
const outputExt  = EXTENSION_MAP[inputExt];
const outputArg  = args.find(a => !a.startsWith('--') && a !== inputFile);
const outputFile = outputArg ?? inputFile.slice(0, -inputExt.length) + outputExt;

function compileOnce() {
  let src;
  try { src = fs.readFileSync(inputFile, 'utf8'); }
  catch { console.error(`❌  Cannot read "${inputFile}"`); return false; }

  const { code, log } = transpile(src, verbose);

  if (verbose && log.length) {
    console.log('\n📖  Translations:');
    log.forEach(l => console.log(l));
  }

  fs.writeFileSync(outputFile, stampParchment(code, path.basename(inputFile), outputExt));
  console.log(`✅  ${inputFile}  →  ${outputFile}`);
  return true;
}

if (watchMode) {
  console.log(`👁️  Watching ${inputFile}... (Ctrl+C to stop)\n`);
  compileOnce();
  let bounce;
  fs.watch(inputFile, () => {
    clearTimeout(bounce);
    bounce = setTimeout(() => { process.stdout.write('🔄  '); compileOnce(); }, 100);
  });
} else {
  compileOnce();
  if (shouldRun) {
    const runner = ['.ts','.tsx'].includes(outputExt) ? `npx ts-node "${outputFile}"` : `node "${outputFile}"`;
    console.log(`\n🏃  ${runner}\n` + '─'.repeat(60));
    try { execSync(runner, { stdio: 'inherit' }); } catch {}
    console.log('─'.repeat(60));
  }
}
