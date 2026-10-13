---
label: GitHub
description: GitHub Dark and GitHub Light, themes inspired by the GitHub code view.
order: 2
tags: [ "themes", "github" ]
---

# GitHub

Colors inspired by the GitHub code view, in both modes.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| GitHub Dark | `npm install @fsegurai/codemirror-theme-github-dark` | `import { githubDark } from '@fsegurai/codemirror-theme-github-dark'` | Dark |
| GitHub Light | `npm install @fsegurai/codemirror-theme-github-light` | `import { githubLight } from '@fsegurai/codemirror-theme-github-light'` | Light |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts` at this release.

| Theme | Background | Text |
|-------|------------|------|
| GitHub Dark | `#0d1117` | `#c9d1d9` |
| GitHub Light | `#fff` | `#24292e` |

## Exports

Each package exports the combined extension and its two parts. See
[Editor Themes and Highlight Styles](../api/editor-themes-and-highlight-styles.md).

| Theme | Extension | Editor theme | Highlight style |
|-------|-----------|--------------|-----------------|
| GitHub Dark | `githubDark` | `githubDarkTheme` | `githubDarkHighlightStyle` |
| GitHub Light | `githubLight` | `githubLightTheme` | `githubLightHighlightStyle` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';

new EditorView({
  extensions: [basicSetup, githubDark],
  parent: document.body,
});
```
