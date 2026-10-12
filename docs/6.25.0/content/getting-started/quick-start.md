---
label: Quick Start
description: Add a theme extension to a CodeMirror 6 EditorView in three steps.
order: 2
tags: [ "quick-start", "usage", "tutorial" ]
keywords: [ "EditorView", "extensions", "basicSetup" ]
---

# Quick Start

## 1. Import the theme

Each theme exports a camelCase `Extension` named after the theme.

```ts
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
// or, from the bundle
import { githubDark } from '@fsegurai/codemirror-theme-bundle';
```

## 2. Add it to the editor

```ts
import { markdown } from '@codemirror/lang-markdown';
import { basicSetup, EditorView } from 'codemirror';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';

const editor = new EditorView({
  doc: '# Hello World',
  extensions: [basicSetup, markdown(), githubDark],
  parent: document.querySelector('#editor')!,
});
```

The theme extension contains two parts: an `EditorView.theme(...)` for the editor chrome (background, gutters, cursor,
selection, panels, tooltips, search, diff decorations) and `syntaxHighlighting(...)` for token colors.

## 3. Check the result

- The editor background and gutter use the theme colors.
- Code tokens are colored once a language extension (such as `markdown()`) is active.

> Syntax colors need a language extension. Without one, only the editor chrome is themed.

## Next steps

- Browse the [theme catalog](../themes/README.md) to find an export name.
- Let users change the theme with [Switching Themes at Runtime](../guides/switching-themes.md).
