---
label: Solarized
description: Solarized Dark and Solarized Light, themes based on the Solarized palette.
order: 5
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

Editor background and default text color, read from `packages/<name>/src/index.ts` at this release.

| Theme | Background | Text |
|-------|------------|------|
| Solarized Dark | `#002b36` | `#93a1a1` |
| Solarized Light | `#fdf6e3` | `#657b83` |

## Exports

Each package exports the combined extension and its two parts. See
[Editor Themes and Highlight Styles](../api/editor-themes-and-highlight-styles.md).

| Theme | Extension | Editor theme | Highlight style |
|-------|-----------|--------------|-----------------|
| Solarized Dark | `solarizedDark` | `solarizedDarkTheme` | `solarizedDarkHighlightStyle` |
| Solarized Light | `solarizedLight` | `solarizedLightTheme` | `solarizedLightHighlightStyle` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { solarizedDark } from '@fsegurai/codemirror-theme-solarized-dark';

new EditorView({
  extensions: [basicSetup, solarizedDark],
  parent: document.body,
});
```
