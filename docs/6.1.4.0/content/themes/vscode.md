---
label: VS Code
description: VS Code Dark and VS Code Light, themes inspired by the Visual Studio Code defaults.
order: 7
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

Editor background and default text color, read from `packages/<name>/src/index.ts` at this release.

| Theme | Background | Text |
|-------|------------|------|
| VS Code Dark | `#1e1e1e` | `#9cdcfe` |
| VS Code Light | `#ffffff` | `#383a42` |

## Exports

Each package exports the combined extension and its two parts. See
[Editor Themes and Highlight Styles](../api/editor-themes-and-highlight-styles.md).

| Theme | Extension | Editor theme | Highlight style |
|-------|-----------|--------------|-----------------|
| VS Code Dark | `vsCodeDark` | `vsCodeDarkTheme` | `vsCodeDarkHighlightStyle` |
| VS Code Light | `vsCodeLight` | `vsCodeLightTheme` | `vsCodeLightHighlightStyle` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark';

new EditorView({
  extensions: [basicSetup, vsCodeDark],
  parent: document.body,
});
```
