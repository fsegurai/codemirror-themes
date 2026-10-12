---
label: Material
description: Material Dark, Material Light and Material Ocean, themes based on the Material palette.
order: 5
tags: [ "themes", "material" ]
---

# Material

Three variants based on the Material palette; Ocean is a deeper blue dark variant.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| Material Dark | `npm install @fsegurai/codemirror-theme-material-dark` | `import { materialDark } from '@fsegurai/codemirror-theme-material-dark'` | Dark |
| Material Light | `npm install @fsegurai/codemirror-theme-material-light` | `import { materialLight } from '@fsegurai/codemirror-theme-material-light'` | Light |
| Material Ocean | `npm install @fsegurai/codemirror-theme-material-ocean` | `import { materialOcean } from '@fsegurai/codemirror-theme-material-ocean'` | Dark |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts`.

| Theme | Background | Text |
|-------|------------|------|
| Material Dark | `#212121` | `#bdbdbd` |
| Material Light | `#ffffff` | `#212121` |
| Material Ocean | `#0F111A` | `#8F93A2` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `materialDarkMergeStyles` | `#202325` | `#707d8b` | `#bdbdbd` | `#606f7a` |
| `materialLightMergeStyles` | `#f5f5f5` | `#9e9e9e` | `#212121` | `#CFD8DC` |
| `materialOceanMergeStyles` | `#151825` | `#464B5D` | `#EEFFFF` | `rgba(113, 124, 180, 0.2)` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { materialDark } from '@fsegurai/codemirror-theme-material-dark';

new EditorView({
  extensions: [basicSetup, materialDark],
  parent: document.body,
});
```
