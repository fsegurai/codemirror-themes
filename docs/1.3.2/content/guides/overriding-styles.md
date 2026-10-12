---
label: Overriding Theme Styles
description: Change the font, font size, line height or individual colors on top of a packaged theme.
order: 4
tags: [ "guides", "customization", "css" ]
keywords: [ "font family", "font size", "Prec.highest", "EditorView.theme" ]
---

# Overriding Theme Styles

Add your own `EditorView.theme(...)` next to the packaged theme and give it the highest precedence.

## Font defaults in this release

No theme sets `fontFamily`, `fontSize` or `lineHeight`, so CodeMirror's default monospace font applies to every theme.
Switching themes never changes the font.

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

To take all token colors from another packaged theme, use its `<theme>HighlightStyle`; see
[Mixing Editor Themes and Highlight Styles](mixing-highlight-styles.md).
