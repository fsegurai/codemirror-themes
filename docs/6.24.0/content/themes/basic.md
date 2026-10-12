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
| Basic Dark | `#1e2124` | `#e2e2e2` |
| Basic Light | `#ffffff` | `#1c2434` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `basicDarkMergeStyles` | `#252529` | `#3a3a3a` | `#e4e4e4` | `#35373d` |
| `basicLightMergeStyles` | `#f0f4f8` | `#e2e8f0` | `#4a5568` | `#e2e8f0` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { basicDark } from '@fsegurai/codemirror-theme-basic-dark';

new EditorView({
  extensions: [basicSetup, basicDark],
  parent: document.body,
});
```
