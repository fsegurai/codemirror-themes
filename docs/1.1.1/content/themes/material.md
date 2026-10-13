---
label: Material
description: Material Dark and Material Light, themes based on the Material palette.
order: 4
tags: [ "themes", "material" ]
---

# Material

A light and a dark variant based on the Material palette.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| Material Dark | `npm install @fsegurai/codemirror-theme-material-dark` | `import { materialDark } from '@fsegurai/codemirror-theme-material-dark'` | Dark |
| Material Light | `npm install @fsegurai/codemirror-theme-material-light` | `import { materialLight } from '@fsegurai/codemirror-theme-material-light'` | Light |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts` at this release.

| Theme | Background | Text |
|-------|------------|------|
| Material Dark | `#212121` | `#bdbdbd` |
| Material Light | `#FAFAFA` | `#607D8B` |

## Exports

Each package exports the combined extension and its two parts. See
[Editor Themes and Highlight Styles](../api/editor-themes-and-highlight-styles.md).

| Theme | Extension | Editor theme | Highlight style |
|-------|-----------|--------------|-----------------|
| Material Dark | `materialDark` | `materialDarkTheme` | `materialDarkHighlightStyle` |
| Material Light | `materialLight` | `materialLightTheme` | `materialLightHighlightStyle` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { materialDark } from '@fsegurai/codemirror-theme-material-dark';

new EditorView({
  extensions: [basicSetup, materialDark],
  parent: document.body,
});
```
