---
label: Creating a Custom Theme
description: Build a CodeMirror 6 theme with defineTheme from the core package, with cssVariableTheme, or from plain EditorView theme and HighlightStyle primitives.
order: 9
tags: [ "guides", "custom-theme", "highlight-style" ]
keywords: [ "defineTheme", "ThemeDefinition", "EditorView.theme", "HighlightStyle", "lezer tags" ]
---

# Creating a Custom Theme

Every packaged theme is a `ThemeDefinition` (a complete UI palette plus syntax roles) turned into CodeMirror
primitives by `defineTheme`. Since 6.32.0 both are public in `@fsegurai/codemirror-theme-core`, so you have three
options:

| Option | Use it when |
|--------|-------------|
| [`defineTheme`](#define-a-theme-with-the-core) | You want the full structure of the packaged themes (every UI part and Lezer tag). |
| [`cssVariableTheme`](../api/css-variable-theme.md) | Your app already has CSS design tokens and one theme should follow them. |
| [Plain CodeMirror](#minimal-theme) | You only need a few colors and no extra dependency. |

## Define a theme with the core

```ts
import { defineTheme, type ThemeDefinition } from '@fsegurai/codemirror-theme-core';

const definition: ThemeDefinition = {
  name: 'Brand',
  dark: true,
  ui: { /* every UiPalette token; TypeScript lists the missing ones */ },
  syntax: { keyword: { color: '#c792ea' }, string: { color: '#c3e88d' } /* the 25 base roles */ },
};

const brand = defineTheme(definition);
export const brandTheme = brand.extension;
export const brandMergeStyles = brand.mergeStyles;
```

The [Core Package](../api/core.md) page lists the rules of `ThemeDefinition`; the source of any theme package is a
complete example.

[Open in playground](../../playground/custom-theme/) to edit a palette live: it derives every `UiPalette` token and
the base syntax roles from a dozen colors and passes them to `defineTheme`.

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
scrollbars, focus ring), copy the `ThemeDefinition` from `packages/<name>/src/index.ts` in the
[repository](https://github.com/fsegurai/codemirror-themes), change its palette values and pass it to `defineTheme`
imported from `@fsegurai/codemirror-theme-core`. Copying `theme-core.ts` is no longer needed.

## Check contrast

Use the same minimums as the packaged themes (see [Accessibility](../accessibility/README.md)): 4.5:1 for text on the
background, active line and selection, and 3:1 for the cursor, focus ring and match outlines.

## Contributing a theme

New themes are welcome. The repository's `CONTRIBUTING.md` lists the steps: create the package, then run
`bun run generate:helpers`, `bun run generate:bundle`, `bun run generate:readme` and `bun run version:update`.
A new theme must pass the accessibility tests from its first commit; `bun run generate:theme-docs` then adds its page
to the documentation.
