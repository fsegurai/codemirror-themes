---
label: Standalone Dark Themes
description: Nine single-variant dark themes, from Abcdef to Volcano.
order: 8
tags: [ "themes", "dark", "standalone" ]
---

# Standalone Dark Themes

Themes that ship as a single dark variant without a light counterpart.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| Abcdef | `npm install @fsegurai/codemirror-theme-abcdef` | `import { abcdef } from '@fsegurai/codemirror-theme-abcdef'` | Dark |
| Abyss | `npm install @fsegurai/codemirror-theme-abyss` | `import { abyss } from '@fsegurai/codemirror-theme-abyss'` | Dark |
| Android Studio | `npm install @fsegurai/codemirror-theme-android-studio` | `import { androidStudio } from '@fsegurai/codemirror-theme-android-studio'` | Dark |
| Andromeda | `npm install @fsegurai/codemirror-theme-andromeda` | `import { andromeda } from '@fsegurai/codemirror-theme-andromeda'` | Dark |
| Forest | `npm install @fsegurai/codemirror-theme-forest` | `import { forest } from '@fsegurai/codemirror-theme-forest'` | Dark |
| Monokai | `npm install @fsegurai/codemirror-theme-monokai` | `import { monokai } from '@fsegurai/codemirror-theme-monokai'` | Dark |
| Nord | `npm install @fsegurai/codemirror-theme-nord` | `import { nord } from '@fsegurai/codemirror-theme-nord'` | Dark |
| Palenight | `npm install @fsegurai/codemirror-theme-palenight` | `import { palenight } from '@fsegurai/codemirror-theme-palenight'` | Dark |
| Volcano | `npm install @fsegurai/codemirror-theme-volcano` | `import { volcano } from '@fsegurai/codemirror-theme-volcano'` | Dark |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts` at this release.

| Theme | Background | Text |
|-------|------------|------|
| Abcdef | `#0a0e14` | `#e0edff` |
| Abyss | `#000c18` | `#a3c9e9` |
| Android Studio | `#282b2e` | `#a9b7c6` |
| Andromeda | `#1b1e26` | `#e4dff0` |
| Forest | `#1a2a33` | `#d0d8e0` |
| Monokai | `#272822` | `#f8f8f2` |
| Nord | `#2e3440` | `#d8dee9` |
| Palenight | `#292D3E` | `#A6ACCD` |
| Volcano | `#390000` | `#F8F8F8` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `abcdefMergeStyles` | `#242936` | `#3a4a5f` | `#ffffff` | `#3a4a5f` |
| `abyssMergeStyles` | `#0a1422` | `#084671` | `#a3c9e9` | `#0a3555` |
| `androidStudioMergeStyles` | `#313335` | `#5b5b5b` | `#a9b7c6` | `#414141` |
| `andromedaMergeStyles` | `#242830` | `#3a3e4c` | `#24e3c3` | `#343946` |
| `forestMergeStyles` | `#233039` | `#3e5059` | `#d0d8e0` | `#2d3d47` |
| `monokaiMergeStyles` | `#414339` | `#88846f` | `#f8f8f2` | `#49483E` |
| `nordMergeStyles` | `#252a33` | `#4c566a` | `#d8dee9` | `#434c5e` |
| `palenightMergeStyles` | `#202331` | `#3A4058` | `#A6ACCD` | `#3A4058` |
| `volcanoMergeStyles` | `#680000` | `#4a0000` | `#F8F8F8` | `#ec0d1e` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { abcdef } from '@fsegurai/codemirror-theme-abcdef';

new EditorView({
  extensions: [basicSetup, abcdef],
  parent: document.body,
});
```
