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
| Material Light | `#ffffff` | `#212121` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `materialDarkMergeStyles` | `#202325` | `#707d8b` | `#bdbdbd` | `#606f7a` |
| `materialLightMergeStyles` | `#f5f5f5` | `#9e9e9e` | `#212121` | `#CFD8DC` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { materialDark } from '@fsegurai/codemirror-theme-material-dark';

new EditorView({
  extensions: [basicSetup, materialDark],
  parent: document.body,
});
```
