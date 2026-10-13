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

Editor background and default text color, read from `packages/<name>/src/index.ts`.

| Theme | Background | Text |
|-------|------------|------|
| Gruvbox Dark | `#282828` | `#ebdbb2` |
| Gruvbox Light | `#fbf1c7` | `#3c3836` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `gruvboxDarkMergeStyles` | `#3c3836` | `#665c54` | `#ebdbb2` | `#504945` |
| `gruvboxLightMergeStyles` | `#ebdbb2` | `#bdae93` | `#3c3836` | `#d5c4a1` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { gruvboxDark } from '@fsegurai/codemirror-theme-gruvbox-dark';

new EditorView({
  extensions: [basicSetup, gruvboxDark],
  parent: document.body,
});
```
