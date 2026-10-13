---
label: Mixing Editor Themes and Highlight Styles
description: Combine the editor chrome of one theme with the token colors of another using the separate Theme and HighlightStyle exports.
order: 3
tags: [ "guides", "highlight-style", "composition" ]
keywords: [ "syntaxHighlighting", "EditorView.theme", "nordTheme" ]
---

# Mixing Editor Themes and Highlight Styles

In this release every theme package exports its two building blocks separately, so you can pair the chrome of one theme
with the token colors of another.

| Export | Contains |
|--------|----------|
| `<theme>Theme` | Editor chrome from `EditorView.theme(spec, { dark })`. |
| `<theme>HighlightStyle` | Token colors from `HighlightStyle.define([...])`. |
| `<theme>` | Both, as `[<theme>Theme, syntaxHighlighting(<theme>HighlightStyle)]`. |

## Steps

1. Import `<a>Theme` from one package and `<b>HighlightStyle` from another.
2. Wrap the highlight style in `syntaxHighlighting(...)`.
3. Add both to the editor instead of a combined `<theme>` extension.

```ts
import { syntaxHighlighting } from '@codemirror/language';
import { basicSetup, EditorView } from 'codemirror';
import { githubDarkHighlightStyle } from '@fsegurai/codemirror-theme-github-dark';
import { nordTheme } from '@fsegurai/codemirror-theme-nord';

new EditorView({
  extensions: [basicSetup, nordTheme, syntaxHighlighting(githubDarkHighlightStyle)],
  parent: document.body,
});
```

## Things to know

- The `dark` flag comes from `<theme>Theme`. Pair a dark editor theme with a highlight style designed for dark
  backgrounds.
- Do not also add a combined `<theme>` extension, or two highlight styles compete for the same tokens.
- These separate exports were removed in 6.24.0, where each package exports only `<theme>`, `<theme>MergeStyles` and
  `applyMergeRevertStyles`.
