# 📜 The Royal Lexicon

The complete translation table for Ye Olde Script. Every keyword, type,
hook, tag, attribute, and event handler the compiler knows.

For an introduction and the most common terms, see the
[README](./README.md). This document is the exhaustive reference.

---

## Variables, functions, control flow

| Ye Olde Script         | Modern JS / TS      | Notes                                              |
|------------------------|---------------------|----------------------------------------------------|
| `Decree`               | `const`             | Immutable. Like the King's word.                   |
| `Beholdeth`            | `let`               | Mutable variable.                                  |
| `Proclameth`           | `var`               | You monster.                                       |
| `Incantation`          | `function`          | Because it IS dark magic.                          |
| `Henceforth Incantation` | `async function`  | Async incantation.                                 |
| `Awaiteth`             | `await`             | The compiler shall wait.                           |
| `Bestow`               | `return`            | Granteth a value.                                  |
| `Yeet X unto Y`        | `throw X`           | Hurls the error into the abyss.                    |
| `Shouldst`             | `if`                | Conditional logic.                                 |
| `Alas, Shouldst`       | `else if`           | The Shakespearean else if.                         |
| `Elsewise`             | `else`              | The other path.                                    |
| `Whilst`               | `while`             | As the serf toils, so the loop runs.               |
| `Traverse`             | `for`               | Walk through the iterable.                         |
| `TemptFate`            | `try`               | Walk boldly into danger.                           |
| `Repent`               | `catch`             | Beg forgiveness from the compiler.                 |
| `Finalleth`            | `finally`           | Runs regardless. Justice is blind.                 |
| `SwitchThyFate`        | `switch`            |                                                    |
| `CaseOf`               | `case`              |                                                    |
| `BreakFree`            | `break`             |                                                    |
| `ContinueSuffering`    | `continue`          |                                                    |
| `Forsooth`             | `debugger`          | Stops everything for inspection.                   |
| `DeleteFromExistence`  | `delete`            |                                                    |
| `Verily`               | `true`              |                                                    |
| `Nay`                  | `false`             |                                                    |
| `Nothingness`          | `null`              |                                                    |
| `Void`                 | `undefined`         |                                                    |

## Operators

| Ye Olde Script         | Modern              |
|------------------------|---------------------|
| `doth equal`           | `===`               |
| `be as one with`       | `===`               |
| `doth not equal`       | `!==`               |
| `surpass` / `surpasseth` | `>`               |
| `falleth below`        | `<`                 |
| `no less than`         | `>=`                |
| `no more than`         | `<=`                |
| `and furthermore`      | `&&`                |
| `or perchance`         | `\|\|`              |
| `not X`                | `!X` (where X starts with a letter or `(`) |

## Modules

| Ye Olde Script         | Modern              |
|------------------------|---------------------|
| `Summon`               | `import`            |
| `hailing from`         | `from`              |
| `ShareWithTheRealm`    | `export`            |
| `PresentToTheKingdom`  | `export default`    |

## Console (TownCrier)

| Ye Olde Script         | Modern              |
|------------------------|---------------------|
| `TownCrier.bellow()`   | `console.log()`     |
| `TownCrier.weep()`     | `console.warn()`    |
| `TownCrier.shriek()`   | `console.error()`   |
| `TownCrier.mumble()`   | `console.log()`     |
| `TownCrier.whisper()`  | `console.debug()`   |
| `TownCrier.proclaim()` | `console.info()`    |
| `TownCrier.tableOfContents()` | `console.table()` |
| `TownCrier.countThePeasants()` | `console.count()` |
| `TownCrier.time()` / `TownCrier.timeEndeth()` | `console.time()` / `console.timeEnd()` |

## TypeScript types

| Ye Olde Script         | TypeScript          |
|------------------------|---------------------|
| `Parchment`            | `string`            |
| `Tally`                | `number`            |
| `TrueOrNay`            | `boolean`           |
| `Naught`               | `void`              |
| `WhateverThouWilt`     | `any`               |
| `Mysterious`           | `unknown`           |
| `Nevereth` / `NeverEth` | `never`            |
| `Multitude<T>`         | `Array<T>`          |
| `Oath<T>`              | `Promise<T>`        |
| `Ledger<K,V>`          | `Record<K,V>`       |
| `PartialScroll<T>`     | `Partial<T>`        |
| `RequiredByLaw<T>`     | `Required<T>`       |
| `ReadOnlyScroll<T>`    | `Readonly<T>`       |
| `PickThyFields<T,K>`   | `Pick<T,K>`         |
| `OmitHeresy<T,K>`      | `Omit<T,K>`         |
| `ExcludeThePeasants<T,K>` | `Exclude<T,K>`   |
| `Covenant`             | `interface`         |
| `Proclamation`         | `type`              |
| `HierarchyOfRank`      | `enum`              |
| `Immutable`            | `readonly`          |
| `Concealed` / `Shielded` / `Exposed` | `private` / `protected` / `public` |
| `Stationary`           | `static`            |
| `RoyallyAbstract`      | `abstract`          |
| `bequeatheth`          | `extends`           |
| `abideth by`           | `implements`        |
| `disguiseth as`        | `as`                |
| `the nature of`        | `typeof`            |
| `the keys of`          | `keyof`             |

## React hooks & APIs

| Ye Olde Script         | React               |
|------------------------|---------------------|
| `useCrystalBall`       | `useState`          |
| `whenTheMoonRiseth`    | `useEffect`         |
| `useParchmentScroll`   | `useRef`            |
| `consultTheOracle`     | `useContext`        |
| `remembereth`          | `useMemo`           |
| `recallIncantation`    | `useCallback`       |
| `useCouncilOfElders`   | `useReducer`        |
| `useLayoutSorcery`     | `useLayoutEffect`   |
| `useImperativeScroll`  | `useImperativeHandle` |
| `useDeferredToil`      | `useDeferredValue`  |
| `useIdScroll`          | `useId`             |
| `forgeRef`             | `forwardRef`        |
| `createScrollContext`  | `createContext`     |
| `fragmentOfReality`    | `Fragment`          |
| `suspendThyBelief`     | `Suspense`          |
| `createPortalgate`     | `createPortal`      |
| `Children.mapPeasants` | `Children.map`      |

## Next.js

### Directives

| Ye Olde Script         | Next.js             |
|------------------------|---------------------|
| `'this parchment doth run on the client'` | `'use client'` |
| `'this parchment doth run on the server'` | `'use server'` |

### Hooks

| Ye Olde Script         | Next.js             |
|------------------------|---------------------|
| `consultTheRoyalMap`   | `useRouter`         |
| `whereAmI`             | `usePathname`       |
| `readTheScroll`        | `useSearchParams`   |
| `watchTheRoad`         | `useParams`         |

### Server functions

| Ye Olde Script         | Next.js             |
|------------------------|---------------------|
| `fetchFromTheKingdomServer` | `getServerSideProps` |
| `inscribeIntoStone`    | `getStaticProps`    |
| `cartographTheKingdom` | `getStaticPaths`    |
| `redirectToExile`      | `redirect`          |
| `notFoundInTheKingdom` | `notFound`          |
| `royalMetadata`        | `metadata` (export name) |

---

## HTML / JSX tags

### Document structure

| Ye Olde Script         | HTML                |
|------------------------|---------------------|
| `<manuscript>`         | `<html>`            |
| `<corpus>`             | `<body>`            |
| `<preamble>`           | `<head>`            |
| `<mainHall>`           | `<main>`            |
| `<chapter>`            | `<section>`         |
| `<tome>`               | `<article>`         |
| `<banner>`             | `<header>`          |
| `<bootscroll>`         | `<footer>`          |
| `<wayfinder>`          | `<nav>`             |
| `<marginalia>`         | `<aside>`           |
| `<dwelling>`           | `<address>`         |

### Content & inline

| Ye Olde Script         | HTML                |
|------------------------|---------------------|
| `<scroll>`             | `<div>`             |
| `<sliver>`             | `<span>`            |
| `<verse>`              | `<p>`               |
| `<pilgrimage>`         | `<a>`               |
| `<mighty>`             | `<strong>`          |
| `<emphatic>`           | `<em>`              |
| `<linebreak />`        | `<br />`            |
| `<horizontalDivider />` | `<hr />`           |
| `<portrait>`           | `<figure>`          |
| `<portraitTitle>`      | `<figcaption>`      |
| `<painting />`         | `<img />`           |

### Lists

| Ye Olde Script         | HTML                |
|------------------------|---------------------|
| `<bulletScroll>`       | `<ul>`              |
| `<numberedScroll>`     | `<ol>`              |
| `<entry>`              | `<li>`              |
| `<glossary>`           | `<dl>`              |
| `<term>`               | `<dt>`              |
| `<definition>`         | `<dd>`              |

### Headings (feudal hierarchy)

| Ye Olde Script         | HTML                |
|------------------------|---------------------|
| `<kingHeading>`        | `<h1>`              |
| `<princeHeading>`      | `<h2>`              |
| `<dukeHeading>`        | `<h3>`              |
| `<earlHeading>`        | `<h4>`              |
| `<knightHeading>`      | `<h5>`              |
| `<squireHeading>`      | `<h6>`              |

### Forms

| Ye Olde Script         | HTML                |
|------------------------|---------------------|
| `<petition>`           | `<form>`            |
| `<quill />`            | `<input />`         |
| `<wideQuill>`          | `<textarea>`        |
| `<lever>`              | `<button>`          |
| `<placard>`            | `<label>`           |
| `<menuOfChoices>`      | `<select>`          |
| `<optionEth>`          | `<option>`          |

### SVG

| Ye Olde Script         | SVG                 |
|------------------------|---------------------|
| `<inkCanvas>`          | `<svg>`             |
| `<inkStroke>`          | `<path>`            |
| `<inkBundle>`          | `<g>`               |
| `<inkLibrary>`         | `<defs>`            |
| `<inkBoundary>`        | `<clipPath>`        |
| `<inkSquare>`          | `<rect>`            |
| `<inkRing>`            | `<circle>`          |
| `<inkPolygon>`         | `<polygon>`         |
| `<inkLine>`            | `<line>`            |

---

## JSX / HTML attributes

### Common attributes

| Ye Olde Script         | JSX / HTML          |
|------------------------|---------------------|
| `caste=`               | `className=`        |
| `destination=`         | `href=`             |
| `provenance=`          | `src=`              |
| `inscription=`         | `alt=`              |
| `genus=`               | `type=`             |
| `calling=`             | `name=`             |
| `sigil=`               | `id=`               |
| `sealKey=`             | `key=`              |
| `treasure=`            | `value=`            |
| `prophecy=`            | `placeholder=`      |
| `placardFor=`          | `htmlFor=`          |
| `command=`             | `action=`           |
| `rite=`                | `method=`           |
| `station=`             | `role=`             |
| `tongue=`              | `lang=`             |
| `tooltip=`             | `title=`            |
| `flourish=`            | `style=`            |
| `tether=`              | `ref=`              |
| `wherethrough=`        | `target=`           |
| `relation=`            | `rel=`              |

### Boolean attributes (no `=`)

| Ye Olde Script         | JSX / HTML          |
|------------------------|---------------------|
| `compulsory`           | `required`          |
| `imprisoned`           | `disabled`          |
| `invisibleToHerald`    | `aria-hidden`       |
| `urgent`               | `priority` (Next/Image) |
| `fillEntirely`         | `fill` (Next/Image) |

### ARIA

| Ye Olde Script         | JSX / HTML          |
|------------------------|---------------------|
| `speakAs=`             | `aria-label=`       |
| `speakAsBy=`           | `aria-labelledby=`  |
| `describedAsBy=`       | `aria-describedby=` |
| `currentlyAt=`         | `aria-current=`     |

### Event handlers

| Ye Olde Script         | JSX                 |
|------------------------|---------------------|
| `uponBeingStruck=`     | `onClick=`          |
| `uponMutation=`        | `onChange=`         |
| `uponSubmission=`      | `onSubmit=`         |
| `uponKeystroke=`       | `onKeyDown=`        |
| `uponKeyRelease=`      | `onKeyUp=`          |
| `uponHovering=`        | `onMouseEnter=`     |
| `uponFleeing=`         | `onMouseLeave=`     |
| `uponGazing=`          | `onFocus=`          |
| `uponLookingAway=`     | `onBlur=`           |
| `uponScrolling=`       | `onScroll=`         |
| `uponLoading=`         | `onLoad=`           |
| `uponError=`           | `onError=`          |

### Sizing & SVG-specific

| Ye Olde Script         | Modern              |
|------------------------|---------------------|
| `breadth=`             | `width=`            |
| `stature=`             | `height=`           |
| `spans=`               | `sizes=` (Next/Image) |
| `inkFrame=`            | `viewBox=`          |
| `inkFill=`             | `fill=`             |
| `inkOutline=`          | `stroke=`           |
| `inkOutlineWidth=`     | `strokeWidth=`      |
| `inkOutlineEnd=`       | `strokeLinecap=`    |
| `inkOutlineJoin=`      | `strokeLinejoin=`   |
| `inkFillRule=`         | `fillRule=`         |
| `inkClipRule=`         | `clipRule=`         |
| `inkData=`             | `d=` (path data)    |
| `namespaceFrom=`       | `xmlns=`            |
