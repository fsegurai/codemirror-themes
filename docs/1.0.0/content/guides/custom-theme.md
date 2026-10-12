---
label: Creating a Custom Theme
description: Build a CodeMirror 6 theme with the same structure the packages use, an EditorView theme and a HighlightStyle.
order: 5
tags: [ "guides", "custom-theme", "highlight-style" ]
keywords: [ "EditorView.theme", "HighlightStyle", "syntaxHighlighting", "lezer tags" ]
---

# Creating a Custom Theme

The packages do not export a theme factory. Each theme is built directly from CodeMirror primitives, and you can
follow the same structure for your own theme.

## Structure of a packaged theme

| Part | Built with | Exported as |
|------|------------|-------------|
| Editor chrome | `EditorView.theme(spec, { dark })` | `<theme>Theme` |
| Token colors | `HighlightStyle.define([...])` | `<theme>HighlightStyle` |
| Combined extension | `[<theme>Theme, syntaxHighlighting(<theme>HighlightStyle)]` | `<theme>` (`Extension`) |

## Minimal theme

```ts
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';

const background = '#1b1b1f';
const foreground = '#e6e6e6';

const myEditorTheme = EditorView.theme(
  {
    '&': { color: foreground, backgroundColor: background },
    '.cm-content': { caretColor: foreground },
    '.cm-gutters': { backgroundColor: background, color: '#6b6b75', border: 'none' },
    '.cm-activeLine': { backgroundColor: '#ffffff0d' },
  },
  { dark: true },
);

const myHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#c792ea' },
  { tag: [t.string, t.special(t.string)], color: '#c3e88d' },
  { tag: [t.lineComment, t.blockComment], color: '#6b6b75', fontStyle: 'italic' },
  { tag: t.number, color: '#f78c6c' },
]);

export const myTheme: Extension = [myEditorTheme, syntaxHighlighting(myHighlightStyle)];
```

## Start from an existing theme

Each theme in this release is a single self-contained file. Copy `packages/<name>/src/index.ts` from the
[repository](https://github.com/fsegurai/codemirror-themes) and change the color constants at the top of the file.

## Contributing a theme

This release has no `CONTRIBUTING.md` (it was added in 6.25.0); open a pull request on
[GitHub](https://github.com/fsegurai/codemirror-themes). Each theme is one self-contained `src/index.ts` file, and
`npm run prepare:themes` builds every package.
