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
| Abcdef | `#0f0f0f` | `#defdef` |
| Abyss | `#000c18` | `#6688cc` |
| Android Studio | `#282b2e` | `#a9b7c6` |
| Andromeda | `#23262E` | `#D5CED9` |
| Forest | `#1b2b34` | `#c0c5ce` |
| Monokai | `#272822` | `#f8f8f2` |
| Nord | `#2e3440` | `#d8dee9` |
| Palenight | `#292D3E` | `#A6ACCD` |
| Volcano | `#390000` | `#F8F8F8` |

## Exports

Each package exports the combined extension and its two parts. See
[Editor Themes and Highlight Styles](../api/editor-themes-and-highlight-styles.md).

| Theme | Extension | Editor theme | Highlight style |
|-------|-----------|--------------|-----------------|
| Abcdef | `abcdef` | `abcdefTheme` | `abcdefHighlightStyle` |
| Abyss | `abyss` | `abyssTheme` | `abyssHighlightStyle` |
| Android Studio | `androidStudio` | `androidStudioTheme` | `androidStudioHighlightStyle` |
| Andromeda | `andromeda` | `andromedaTheme` | `andromedaHighlightStyle` |
| Forest | `forest` | `forestTheme` | `forestHighlightStyle` |
| Monokai | `monokai` | `monokaiTheme` | `monokaiHighlightStyle` |
| Nord | `nord` | `nordTheme` | `nordHighlightStyle` |
| Palenight | `palenight` | `palenightTheme` | `palenightHighlightStyle` |
| Volcano | `volcano` | `volcanoTheme` | `volcanoHighlightStyle` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { abcdef } from '@fsegurai/codemirror-theme-abcdef';

new EditorView({
  extensions: [basicSetup, abcdef],
  parent: document.body,
});
```
