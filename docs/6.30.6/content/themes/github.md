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

Editor background and default text color, read from `packages/<name>/src/index.ts`.

| Theme | Background | Text |
|-------|------------|------|
| GitHub Dark | `#0d1117` | `#c9d1d9` |
| GitHub Light | `#ffffff` | `#24292e` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `githubDarkMergeStyles` | `#21262d` | `#30363d` | `#c9d1d9` | `#2c333a` |
| `githubLightMergeStyles` | `#f8f9fa` | `#e1e4e8` | `#24292e` | `#f5f5f5` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';

new EditorView({
  extensions: [basicSetup, githubDark],
  parent: document.body,
});
```
