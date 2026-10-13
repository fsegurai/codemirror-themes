---
label: Basic
description: Basic Dark and Basic Light, neutral themes with a plain palette.
order: 1
tags: [ "themes", "basic", "neutral" ]
---

# Basic

A neutral pair for apps that want CodeMirror to blend in rather than stand out.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| Basic Dark | `npm install @fsegurai/codemirror-theme-basic-dark` | `import { basicDark } from '@fsegurai/codemirror-theme-basic-dark'` | Dark |
| Basic Light | `npm install @fsegurai/codemirror-theme-basic-light` | `import { basicLight } from '@fsegurai/codemirror-theme-basic-light'` | Light |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts` at this release.

| Theme | Background | Text |
|-------|------------|------|
| Basic Dark | `#2E3235` | `#DDDDDD` |
| Basic Light | `#ffffff` | `#2e3440` |

## Exports

Each package exports the combined extension and its two parts. See
[Editor Themes and Highlight Styles](../api/editor-themes-and-highlight-styles.md).

| Theme | Extension | Editor theme | Highlight style |
|-------|-----------|--------------|-----------------|
| Basic Dark | `basicDark` | `basicDarkTheme` | `basicDarkHighlightStyle` |
| Basic Light | `basicLight` | `basicLightTheme` | `basicLightHighlightStyle` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { basicDark } from '@fsegurai/codemirror-theme-basic-dark';

new EditorView({
  extensions: [basicSetup, basicDark],
  parent: document.body,
});
```
