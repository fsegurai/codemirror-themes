---
label: Creating a Custom Theme
description: Build a CodeMirror 6 theme with the same structure the packages use - an EditorView theme, a HighlightStyle and merge styles.
order: 9
tags: [ "guides", "custom-theme", "highlight-style" ]
keywords: [ "EditorView.theme", "HighlightStyle", "syntaxHighlighting", "lezer tags" ]
---

# Creating a Custom Theme

The packages do not export a theme factory. Internally, since 6.31.0, every packaged theme is a `ThemeDefinition`
(a complete UI palette plus syntax roles) turned into CodeMirror primitives by a shared `defineTheme` helper. That
helper is not part of the public API, but the result is plain CodeMirror, and you can build the same structure
yourself.

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

[Open in playground](../../playground/custom-theme/) to edit a custom theme live.

## Start from an existing theme

To reuse every selector a packaged theme covers (search panel, tooltips, autocomplete, lint markers, diff lines,
scrollbars, focus ring), copy `packages/<name>/src/index.ts` together with `theme-core.ts` and `utils.ts` from the
[repository](https://github.com/fsegurai/codemirror-themes) and change the palette values passed to `defineTheme`.
`theme-core.ts` is an internal file: copy it rather than importing it from a package.

## Check contrast

Use the same minimums as the packaged themes (see [Accessibility](../accessibility/README.md)): 4.5:1 for text on the
background, active line and selection, and 3:1 for the cursor, focus ring and match outlines.

## Contributing a theme

New themes are welcome. The repository's `CONTRIBUTING.md` lists the steps: create the package, then run
`bun run generate:helpers`, `bun run generate:bundle`, `bun run generate:readme` and `bun run version:update`.
A new theme must pass the accessibility tests from its first commit; `bun run generate:theme-docs` then adds its page
to the documentation.
