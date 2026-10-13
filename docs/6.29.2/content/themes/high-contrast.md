---
label: High Contrast
description: High Contrast Dark and High Contrast Light, maximum-contrast themes for accessibility.
order: 4
tags: [ "themes", "high-contrast", "accessibility" ]
---

# High Contrast

Maximum-contrast themes for accessibility, with pure black or white backgrounds.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| High Contrast Dark | `npm install @fsegurai/codemirror-theme-high-contrast-dark` | `import { highContrastDark } from '@fsegurai/codemirror-theme-high-contrast-dark'` | Dark |
| High Contrast Light | `npm install @fsegurai/codemirror-theme-high-contrast-light` | `import { highContrastLight } from '@fsegurai/codemirror-theme-high-contrast-light'` | Light |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts` at this release.

| Theme | Background | Text |
|-------|------------|------|
| High Contrast Dark | `#000000` | `#ffffff` |
| High Contrast Light | `#ffffff` | `#000000` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `highContrastDarkMergeStyles` | `#000000` | `#00ffff` | `#00ffff` | `#ffff00` |
| `highContrastLightMergeStyles` | `#ffffff` | `#0000ff` | `#0000ff` | `#d04800` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { highContrastDark } from '@fsegurai/codemirror-theme-high-contrast-dark';

new EditorView({
  extensions: [basicSetup, highContrastDark],
  parent: document.body,
});
```
