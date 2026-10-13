---
label: Gruvbox
description: Gruvbox Dark and Gruvbox Light, warm retro themes based on the Gruvbox palette.
order: 3
tags: [ "themes", "gruvbox", "retro" ]
---

# Gruvbox

Warm, retro colors based on the Gruvbox palette.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| Gruvbox Dark | `npm install @fsegurai/codemirror-theme-gruvbox-dark` | `import { gruvboxDark } from '@fsegurai/codemirror-theme-gruvbox-dark'` | Dark |
| Gruvbox Light | `npm install @fsegurai/codemirror-theme-gruvbox-light` | `import { gruvboxLight } from '@fsegurai/codemirror-theme-gruvbox-light'` | Light |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts` at this release.

| Theme | Background | Text |
|-------|------------|------|
| Gruvbox Dark | `#282828` | `#ebdbb2` |
| Gruvbox Light | `#fbf1c7` | `#3c3836` |

## Exports

Each package exports the combined extension and its two parts. See
[Editor Themes and Highlight Styles](../api/editor-themes-and-highlight-styles.md).

| Theme | Extension | Editor theme | Highlight style |
|-------|-----------|--------------|-----------------|
| Gruvbox Dark | `gruvboxDark` | `gruvboxDarkTheme` | `gruvboxDarkHighlightStyle` |
| Gruvbox Light | `gruvboxLight` | `gruvboxLightTheme` | `gruvboxLightHighlightStyle` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { gruvboxDark } from '@fsegurai/codemirror-theme-gruvbox-dark';

new EditorView({
  extensions: [basicSetup, gruvboxDark],
  parent: document.body,
});
```
