---
label: Overriding Theme Styles
description: Change the font, font size, line height or individual colors on top of a packaged theme.
order: 8
tags: [ "guides", "customization", "css" ]
keywords: [ "font family", "font size", "Prec.highest", "EditorView.theme" ]
---

# Overriding Theme Styles

Add your own `EditorView.theme(...)` next to the packaged theme and give it the highest precedence.

## Shared defaults in every theme

All packages use the same layout values from their shared `utils.ts` helper:

| Property | Value | Selector |
|----------|-------|----------|
| `fontFamily` | `JetBrains Mono, Consolas, monospace` | `&` (editor root) |
| `fontSize` | `14px` | `&` (editor root) |
| `lineHeight` | `1.6` | `.cm-content` |
| Gutter font size | `0.9em` | `.cm-lineNumbers`, `.cm-foldGutter` |
| Scrollbar size | `12px` with `6px` radius | scrollbar rules |

The JetBrains Mono font is not bundled. If it is not installed or loaded by your page, the browser falls back to
Consolas, then to the generic monospace font.

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

[Open in playground](../../playground/override-styles/) to change the font and a color live.

## Keep it accessible

The packaged colors meet WCAG AA (see [Accessibility](../accessibility/README.md)). Overrides are yours to check:

- Text colors need 4.5:1 against the background, the active line and the selection.
- The cursor, focus ring and match outlines need 3:1 against the background.
- If you replace the focus ring (`&.cm-focused`), keep a visible 2px indicator and an `outline` so it survives
  forced-colors mode.

Each [theme page](../themes/README.md) lists the surface colors to measure against, and the
[contrast inspector](../../playground/contrast-inspector/) sample measures any pair.

## Change token colors

Token colors come from a `HighlightStyle`. Add your own `syntaxHighlighting(HighlightStyle.define([...]))` with
`Prec.highest` to recolor specific tags; see [Creating a Custom Theme](custom-theme.md) for the structure.
