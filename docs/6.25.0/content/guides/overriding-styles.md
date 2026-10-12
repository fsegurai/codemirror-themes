---
label: Overriding Theme Styles
description: Change the font, font size, line height or individual colors on top of a packaged theme.
order: 4
tags: [ "guides", "customization", "css" ]
keywords: [ "font family", "font size", "Prec.highest", "EditorView.theme" ]
---

# Overriding Theme Styles

Add your own `EditorView.theme(...)` next to the packaged theme and give it the highest precedence.

## Shared defaults in every theme

All packages use the same layout values from their `utils.ts` helper:

| Property | Value | Selector |
|----------|-------|----------|
| `fontFamily` | `JetBrains Mono, Consolas, monospace` | `&` (editor root) |
| `fontSize` | `14px` | `&` (editor root) |
| `lineHeight` | `1.6` | `.cm-content` |
| Gutter font size | `0.9em` | `.cm-gutters` |
| Scrollbar size | `12px` with `6px` radius | scrollbar rules |

The JetBrains Mono font is not bundled. If it is not installed or loaded by your page, the browser falls back to
Consolas, then to the generic monospace font.

This release does not set a gutter line height, so line numbers in the smaller gutter font can sit out of line
with their code rows. 6.29.0 fixed this with `lineHeight: 1.78` on `.cm-gutters`. In this release, add that rule
yourself with `Prec.highest`, as in the examples below.

## Override the font

```ts
import { Prec } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { monokai } from '@fsegurai/codemirror-theme-monokai';

const myFont = Prec.highest(
  EditorView.theme({
    '&': { fontFamily: '"Fira Code", monospace', fontSize: '16px' },
    '.cm-content': { lineHeight: '1.5' },
  }),
);

new EditorView({
  extensions: [basicSetup, monokai, myFont],
  parent: document.body,
});
```

## Override one color

```ts
const brighterSelection = Prec.highest(
  EditorView.theme({
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': { backgroundColor: '#44475a' },
  }),
);
```

`Prec.highest` makes sure your rules win over the packaged theme regardless of extension order.

## Change token colors

Token colors come from a `HighlightStyle`. Add your own `syntaxHighlighting(HighlightStyle.define([...]))` with
`Prec.highest` to recolor specific tags; see [Creating a Custom Theme](custom-theme.md) for the structure.
