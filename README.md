# ⚔️ Ye Olde Script (ES1600)

> *"The JavaScript dialect of 1642, as decreed by the TC39 Council of Elders."*

[![npm version](https://img.shields.io/npm/v/yeoldescript.svg?color=gold)](https://www.npmjs.com/package/yeoldescript)
[![License: MIT](https://img.shields.io/badge/license-MIT-red.svg)](./LICENSE)
[![Status](https://img.shields.io/badge/status-Forsooth-purple)](.)

A transpiler + VS Code extension that lets you write JavaScript, TypeScript,
and TSX like a 17th-century monk. Because `function` was a tool of the devil,
and `Incantation` is much more honest about what you're doing.

Now with full TypeScript and Next.js support — translate `"use client"` into
`"this parchment doth run on the client"` and behold thy bundle.

---

## 📦 Install

### As a CLI / build dependency (npm)

```bash
# Project-local (recommended)
npm install --save-dev yeoldescript

# Then run via npx
npx yeoldescript scroll.yeolde --run
```

Or globally, if you want `yeoldescript` available everywhere:

```bash
npm install --global yeoldescript
yeoldescript scroll.yeolde --run
```

### As a VS Code extension (syntax highlighting + snippets)

The extension isn't on the VS Code Marketplace yet. To install manually:

1. Clone the repo (or copy the published package contents from
   `node_modules/yeoldescript`) into your VS Code extensions folder:
   - **Windows:** `%USERPROFILE%\.vscode\extensions\yeoldescript`
   - **macOS / Linux:** `~/.vscode/extensions/yeoldescript`
2. Restart VS Code completely.
3. Open any `.yeolde`, `.ye`, `.parchment`, `.scrollx`, or `.illuminated`
   file — syntax highlighting activateth automatically.

---

## 🚀 Quick Start

```bash
# Write thy ancient parchment
echo 'TownCrier.bellow("Huzzah!");' > scroll.yeolde

# Compile and run it
npx yeoldescript scroll.yeolde --run
# ✅ Huzzah! The parchment hath been compiled!
```

---

## 📁 File Extensions

| Source | Compiles to | Use for |
|---|---|---|
| `.yeolde` / `.ye` | `.js` | Plain JavaScript |
| `.parchment` | `.ts` | TypeScript modules |
| `.scrollx` / `.illuminated` | `.tsx` | React / Next.js components |

The compiler picks the right output extension automatically — no flags
needed.

---

## 📖 The Royal Dictionary

| Ye Olde Script         | Modern JS / TS      | Notes                                              |
|------------------------|---------------------|----------------------------------------------------|
| `Beholdeth`            | `let`               | Thou manifesteth a variable                        |
| `Decree`               | `const`             | Immutable. Like the King's word.                   |
| `Proclameth`           | `var`               | You monster.                                       |
| `Incantation`          | `function`          | Because it IS dark magic                           |
| `Henceforth Incantation` | `async function`  | Async incantation                                  |
| `Awaiteth`             | `await`             | The compiler shall wait                            |
| `Shouldst`             | `if`                | Conditional logic                                  |
| `Alas, Shouldst`       | `else if`           | The Shakespearean else if                          |
| `Elsewise`             | `else`              | The other path                                     |
| `Whilst`               | `while`             | As the serf toils, so the loop runs                |
| `TemptFate`            | `try`               | Walk boldly into danger                            |
| `Repent`               | `catch`             | Beg forgiveness from the compiler                  |
| `Finalleth`            | `finally`           | Runs regardless. Justice is blind.                 |
| `Bestow`               | `return`            | Granteth a value                                   |
| `Yeet X unto Y`        | `throw X`           | Hurls the error into the nearest body of water     |
| `Verily`               | `true`              | Verily!                                            |
| `Nay`                  | `false`             | Absolutely not.                                    |
| `Nothingness`          | `null`              | The void                                           |
| `Void`                 | `undefined`         | Similar to null, but more chaotic                  |
| `surpass`              | `>`                 | Greater than                                       |
| `falleth below`        | `<`                 | Less than                                          |
| `doth equal`           | `===`               | Strict equality. No coercion. Standards.           |
| `be as one with`       | `===`               | Same but more romantic                             |
| `doth not equal`       | `!==`               | Strict inequality                                  |
| `no less than`         | `>=`                |                                                    |
| `no more than`         | `<=`                |                                                    |
| `and furthermore`      | `&&`                | Logical AND                                        |
| `or perchance`         | `\|\|`              | Logical OR                                         |
| `Forsooth`             | `debugger`          | Stops everything. Inspect the carnage.             |
| `Summon`               | `import`            | Bring forth a module                               |
| `hailing from`         | `from`              | Specifies whence the module cometh                 |
| `ShareWithTheRealm`    | `export`            | Make available to other parchments                 |
| `PresentToTheKingdom`  | `export default`    | The chosen one                                     |
| `TownCrier.bellow()`   | `console.log()`     | Ring ring                                          |
| `TownCrier.weep()`     | `console.warn()`    | Woe!                                               |
| `TownCrier.shriek()`   | `console.error()`   | BURN THE SCRIPT                                    |
| `TownCrier.mumble()`   | `console.log()`     | Quiet logging                                      |
| `TownCrier.whisper()`  | `console.debug()`   | Only in verbose mode                               |
| `TownCrier.proclaim()` | `console.info()`    | For important announcements                        |

### Next.js directives

| Ye Olde Script                                  | Modern             |
|-------------------------------------------------|--------------------|
| `'this parchment doth run on the client'`       | `'use client'`     |
| `'this parchment doth run on the server'`       | `'use server'`     |

---

## 🛠 CLI Usage

```bash
yeoldescript <input> [output] [--run] [--watch] [--verbose]

# Examples
yeoldescript scroll.yeolde                # → scroll.js
yeoldescript page.scrollx                 # → page.tsx
yeoldescript types.parchment              # → types.ts
yeoldescript scroll.yeolde out.js         # custom output path
yeoldescript scroll.yeolde --run          # compile AND execute
yeoldescript scroll.yeolde --watch        # recompile on save
yeoldescript scroll.yeolde --verbose      # show every translation
yeoldescript all                          # compile every parchment in cwd
yeoldescript --help                       # royal help scroll
```

### Watch mode + Next.js

For projects that author components in `.scrollx` and want them compiled
on save while the dev server is running:

```json
// package.json
{
  "scripts": {
    "dev": "concurrently \"yeoldescript all --watch\" \"next dev\""
  }
}
```

(Requires `concurrently` as a dev dep.)

---

## 🏰 VS Code Extension Features

- 🎨 **Syntax highlighting** — Keywords, booleans, TownCrier methods, all
  coloured correctly
- 💬 **Hover tooltips** — Hover any ancient word to see its modern
  translation
- ✂️ **Snippets** — Type `incantation`, `temptfate`, `shouldst`, etc. and
  press Tab
- ⚔️ **Right-click compile** — Right-click any `.scrollx` / `.parchment` /
  `.yeolde` file → *"Compile Parchment → Modern JS/TS"*
- 🔴 **Bracket matching** — Even ancient code needs matched brackets
- 📝 **Auto-close pairs** — `{`, `(`, `"`, `'` all auto-close

---

## 📜 Example

Write this in `battle.yeolde`:

```yeolde
Decree SOLDIERS = 100;
Beholdeth casualties = 0;

Incantation assessBattle(losses) {
    Shouldst (losses surpass 50) {
        TownCrier.shriek("We are routed! Sound the retreat!");
        Bestow Nay;
    } Alas, Shouldst (losses be as one with 0) {
        TownCrier.bellow("A glorious victory! Not a scratch!");
        Bestow Verily;
    } Elsewise {
        TownCrier.mumble("Heavy losses. But we hold.");
        Bestow Verily;
    }
}

TemptFate {
    assessBattle(casualties);
} Repent (darkMagic) {
    TownCrier.shriek("BURN THE SCRIPT! " + darkMagic);
}
```

Run it:

```bash
npx yeoldescript battle.yeolde --run
```

---

## 🤔 Why?

Because half of JavaScript already feels like dark magic.
We are simply being honest about it.

---

## 📜 License

MIT — see [LICENSE](./LICENSE).

---

*"I would honestly pay good money to see a whole team of developers forced
to do a code review in this dialect."*
*— Anonymous, probably*

---

**May God have mercy on thy codebase.**
