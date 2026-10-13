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
| Editor chrome | `EditorView.theme(spec, { dark })` | Not exported on its own |
| Token colors | `HighlightStyle.define([...])` wrapped in `syntaxHighlighting(...)` | Not exported on its own |
| Combined extension | `[editorTheme, syntaxHighlighting(highlightStyle)]` | `<theme>` (`Extension`) |
| Merge revert colors | Plain object | `<theme>MergeStyles` |

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

export const myThemeMergeStyles = {
  backgroundColor: '#16161a',
  borderColor: '#2a2a30',
  buttonColor: foreground,
  buttonHoverColor: '#2a2a30',
};
```

Pass `myThemeMergeStyles` to `applyMergeRevertStyles` from any theme package; it accepts any object with the four
`IMergeRevertStyles` fields.

## Start from an existing theme

To reuse every selector a packaged theme covers (search panel, tooltips, autocomplete, lint markers, diff lines,
scrollbars), copy `packages/<name>/src/index.ts` and its `utils.ts` from the
[repository](https://github.com/fsegurai/codemirror-themes) and change the color constants at the top of the file.

## Contributing a theme

The repository's `CONTRIBUTING.md` (added in this release) lists the steps: create a folder in `packages/`,
copy the structure of an existing theme, update the colors in `src/index.ts`, add `package.json` metadata and a
README, and update the READMEs of all packages. The shared layout helper lives in `helper/src/utils.ts`;
`bun run copy:helpers` copies it into every package's `src/` folder.
