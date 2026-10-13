---
label: VS Code
description: VS Code Dark and VS Code Light, themes inspired by the Visual Studio Code defaults.
order: 8
tags: [ "themes", "vscode" ]
---

# VS Code

Colors inspired by the default Visual Studio Code themes.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| VS Code Dark | `npm install @fsegurai/codemirror-theme-vscode-dark` | `import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark'` | Dark |
| VS Code Light | `npm install @fsegurai/codemirror-theme-vscode-light` | `import { vsCodeLight } from '@fsegurai/codemirror-theme-vscode-light'` | Light |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts`.

| Theme | Background | Text |
|-------|------------|------|
| VS Code Dark | `#1e1e1e` | `#d4d4d4` |
| VS Code Light | `#ffffff` | `#383a42` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `vsCodeDarkMergeStyles` | `#252526` | `#2d2d30` | `#d4d4d4` | `#3a3a3a` |
| `vsCodeLightMergeStyles` | `#f3f3f3` | `#d6d6d6` | `#383a42` | `#e8e8e8` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark';

new EditorView({
  extensions: [basicSetup, vsCodeDark],
  parent: document.body,
});
```
