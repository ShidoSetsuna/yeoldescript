# ⚔️ Ye Olde Script (ES1600)

> *"The JavaScript dialect of 1642, as decreed by the TC39 Council of Elders."*

[![npm version](https://img.shields.io/npm/v/yeoldescript.svg?color=gold)](https://www.npmjs.com/package/yeoldescript)
[![VS Marketplace](https://img.shields.io/visual-studio-marketplace/v/ShidoSetsuna.yeoldescript?color=purple&label=vs%20marketplace)](https://marketplace.visualstudio.com/items?itemName=ShidoSetsuna.yeoldescript)
[![License: MIT](https://img.shields.io/badge/license-MIT-red.svg)](./LICENSE.md)
[![Status](https://img.shields.io/badge/status-Forsooth-purple)](.)

A transpiler + VS Code extension that lets you write JavaScript, TypeScript,
TSX, and Next.js components like a 17th-century monk. Because `function` was
a tool of the devil, and `Incantation` is much more honest about what you're
doing.

`<div>` is now `<scroll>`. `useState` is now `useCrystalBall`. `'use client'`
is now `'this parchment doth run on the client'`. Behold thy bundle.

---

## 📦 Install

### As a VS Code extension (syntax highlighting, hover docs, snippets)

🏪 **[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ShidoSetsuna.yeoldescript)**

Or from the command line:

```
code --install-extension ShidoSetsuna.yeoldescript
```

Or open the Extensions panel in VS Code, search **Ye Olde Script**, click
Install.

### As a CLI / build dependency (npm)

```bash
# Project-local (recommended)
npm install --save-dev yeoldescript
npx yeoldescript scroll.yeolde --run

# Or global
npm install --global yeoldescript
yeoldescript scroll.yeolde --run
```

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

The compiler picks the right output extension automatically — no flags needed.

---

## 📖 The Royal Dictionary — a taste

The most common words. **For the complete reference (every keyword, type,
hook, tag, attribute, event handler) see [LEXICON.md](./LEXICON.md).**

### Core

| Ye Olde Script         | Modern JS / TS      |
|------------------------|---------------------|
| `Decree`               | `const`             |
| `Beholdeth`            | `let`               |
| `Incantation`          | `function`          |
| `Henceforth Incantation` | `async function`  |
| `Awaiteth`             | `await`             |
| `Bestow`               | `return`            |
| `Shouldst` / `Elsewise` | `if` / `else`      |
| `TemptFate` / `Repent` | `try` / `catch`     |
| `Verily` / `Nay`       | `true` / `false`    |
| `Nothingness`          | `null`              |
| `doth equal`           | `===`               |
| `surpass` / `falleth below` | `>` / `<`      |
| `and furthermore` / `or perchance` | `&&` / `\|\|` |
| `Summon X hailing from "..."` | `import X from "..."` |
| `ShareWithTheRealm`    | `export`            |
| `TownCrier.bellow()` / `TownCrier.shriek()` | `console.log()` / `console.error()` |

### TypeScript

| Ye Olde Script         | TypeScript          |
|------------------------|---------------------|
| `Parchment` / `Tally` / `TrueOrNay` | `string` / `number` / `boolean` |
| `Oath<T>`              | `Promise<T>`        |
| `Multitude<T>`         | `Array<T>`          |
| `Covenant` / `Proclamation` | `interface` / `type` |

### React + Next.js

| Ye Olde Script         | React / Next        |
|------------------------|---------------------|
| `useCrystalBall`       | `useState`          |
| `whenTheMoonRiseth`    | `useEffect`         |
| `'this parchment doth run on the client'` | `'use client'` |
| `'this parchment doth run on the server'` | `'use server'` |

### HTML / JSX tags

| Ye Olde Script         | HTML                |
|------------------------|---------------------|
| `<scroll>` / `<sliver>` | `<div>` / `<span>` |
| `<verse>`              | `<p>`               |
| `<pilgrimage>`         | `<a>`               |
| `<kingHeading>` … `<squireHeading>` | `<h1>` … `<h6>` (feudal hierarchy) |
| `<bulletScroll>` / `<entry>` | `<ul>` / `<li>` |
| `<chapter>` / `<banner>` / `<bootscroll>` | `<section>` / `<header>` / `<footer>` |
| `<petition>` / `<quill />` / `<lever>` | `<form>` / `<input />` / `<button>` |

### JSX attributes

| Ye Olde Script         | JSX / HTML          |
|------------------------|---------------------|
| `caste=`               | `className=`        |
| `destination=`         | `href=`             |
| `provenance=`          | `src=`              |
| `sigil=` / `sealKey=`  | `id=` / `key=`      |
| `speakAs=` / `invisibleToHerald` | `aria-label=` / `aria-hidden` |
| `uponBeingStruck=` / `uponMutation=` | `onClick=` / `onChange=` |

> **134 translation rules in total.** This is just the headlines.
> See **[LEXICON.md](./LEXICON.md)** for the complete table — every SVG tag,
> every event handler, every TypeScript utility type, every React hook.

---

## 🛠 CLI Usage

```bash
yeoldescript <input> [output] [--run] [--watch] [--verbose]

# Examples
yeoldescript scroll.yeolde                # → scroll.js
yeoldescript page.scrollx                 # → page.tsx
yeoldescript types.parchment              # → types.ts
yeoldescript scroll.yeolde --run          # compile AND execute
yeoldescript scroll.yeolde --watch        # recompile on save
yeoldescript all                          # compile every parchment
                                          # recursively from cwd
yeoldescript all --watch                  # watch the whole project
yeoldescript --help                       # royal help scroll
```

`all` walks subdirectories, skipping `node_modules` and dot-folders.

### Watch mode + Next.js

For projects authoring `.scrollx` components alongside `next dev`:

```json
// package.json
{
  "scripts": {
    "dev": "concurrently \"yeoldescript all --watch\" \"next dev\""
  }
}
```

Save a `.scrollx`, the watcher recompiles to `.tsx`, Next's hot-reload
picks it up. About 200ms latency end to end.

---

## 🏰 VS Code Extension Features

- 🎨 **Syntax highlighting** — every keyword, type, hook, tag, and
  attribute coloured per the standard JSX/TS scopes (works in any theme)
- 💬 **Hover tooltips** — hover any Ye Olde word to see its modern
  translation. Works in `.yeolde`, `.parchment`, and `.scrollx`.
- ✂️ **Snippets** — type `decree`, `inc`, `temptfate`, `shouldst`, etc.
  and press Tab
- ⚔️ **Right-click compile** — *"Compile Parchment → Modern JS/TS"* on
  any Ye Olde file
- 📚 **Compile All** — command palette → *"Compile ALL Parchments in
  Workspace"* walks the whole tree
- 🔴 **Bracket matching, auto-close pairs, indentation rules** — basic
  editor niceties

---

## 📜 Example — A Next.js page in `.scrollx`

```scrollx
"this parchment doth run on the server" endeth

Summon Link hailing from "next/link" endeth

ShareWithTheRealm Proclamation Battle art {
  soldiers: Tally endeth
  losses: Tally endeth
} endeth

PresentToTheKingdom Henceforth Incantation BattlePage() {
  Decree report: Battle art { soldiers: 100, losses: 12 } endeth
  Decree survivors: Tally art report.soldiers minus report.losses endeth
  Decree verdict art report.losses surpass 50
    dothQuestionThyExistence "routed"
    : "victorious" endeth

  Bestow (
    <mainHall caste="p-8">
      <kingHeading caste="text-3xl font-bold">
        Battle Report
      </kingHeading>
      <verse caste="mt-4">
        We are <mighty>{verdict}</mighty>. {survivors} soldiers remain.
      </verse>
      <bulletScroll caste="mt-4">
        {[report.soldiers, report.losses, survivors].mapeth((n, i) becometh (
          <entry sealKey={i}>{n}</entry>
        ))}
      </bulletScroll>
      <Link destination="/" caste="mt-6 underline">
        Back to the kingdom
      </Link>
    </mainHall>
  );
}
```

Compiles to standard Next.js TSX:

```tsx
"use server";

import Link from "next/link";

export type Battle = {
  soldiers: number;
  losses: number;
};

export default async function BattlePage() {
  const report: Battle = { soldiers: 100, losses: 12 };
  const survivors: number = report.soldiers - report.losses;
  const verdict = report.losses > 50
    ? "routed"
    : "victorious";

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Battle Report
      </h1>
      <p className="mt-4">
        We are <strong>{verdict}</strong>. {survivors} soldiers remain.
      </p>
      <ul className="mt-4">
        {[report.soldiers, report.losses, survivors].map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
      <Link href="/" className="mt-6 underline">
        Back to the kingdom
      </Link>
    </main>
  );
}
```

---

## 🤔 Why?

Because half of JavaScript already feels like dark magic. We are simply
being honest about it.

---

## ☕ Support

If Ye Olde Script hath brought thee mirth (or, somehow, utility), thou
mayst buy me a coffee at **[ko-fi.com/shidosetsuna](https://ko-fi.com/shidosetsuna)**.

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Buy_me_a_coffee-red?logo=ko-fi&logoColor=white)](https://ko-fi.com/shidosetsuna)

---

## 📜 License

MIT — see [LICENSE.md](./LICENSE.md).

---

*"I would honestly pay good money to see a whole team of developers forced
to do a code review in this dialect."*
*— Anonymous, probably*

---

**May God have mercy on thy codebase.**
