---
label: Solarized
description: Solarized Dark and Solarized Light, themes based on the Solarized palette.
order: 6
tags: [ "themes", "solarized" ]
---

# Solarized

The classic Solarized palette in both modes.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| Solarized Dark | `npm install @fsegurai/codemirror-theme-solarized-dark` | `import { solarizedDark } from '@fsegurai/codemirror-theme-solarized-dark'` | Dark |
| Solarized Light | `npm install @fsegurai/codemirror-theme-solarized-light` | `import { solarizedLight } from '@fsegurai/codemirror-theme-solarized-light'` | Light |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts`.

| Theme | Background | Text |
|-------|------------|------|
| Solarized Dark | `#002b36` | `#93a1a1` |
| Solarized Light | `#fdf6e3` | `#657b83` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `solarizedDarkMergeStyles` | `#00252f` | `#586e75` | `#93a1a1` | `#073642` |
| `solarizedLightMergeStyles` | `#dfd9c8` | `#073642` | `#2aa198` | `#93a1a140` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { solarizedDark } from '@fsegurai/codemirror-theme-solarized-dark';

new EditorView({
  extensions: [basicSetup, solarizedDark],
  parent: document.body,
});
```
