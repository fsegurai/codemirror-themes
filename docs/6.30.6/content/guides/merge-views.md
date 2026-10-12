---
label: Styling Merge Views
description: Apply a theme to @codemirror/merge views and color the revert buttons with the MergeStyles export.
order: 3
tags: [ "guides", "merge", "diff" ]
keywords: [ "MergeView", "unifiedMergeView", "revert controls", "applyMergeRevertStyles" ]
---

# Styling Merge Views

Theme extensions already style diff decorations (`.cm-insertedLine`, `.cm-deletedLine`, changed text). The revert
buttons between the two panes of a `MergeView` live outside the editors, so each package also ships a
`<theme>MergeStyles` object and the `applyMergeRevertStyles` function.

## Steps

1. Add the theme extension to both sides (`a` and `b`) of the `MergeView`.
2. Call `applyMergeRevertStyles(<theme>MergeStyles)` once to color the revert column.
3. Call it again with the new styles whenever you switch themes.

```ts
import { MergeView } from '@codemirror/merge';
import { basicSetup } from 'codemirror';
import { applyMergeRevertStyles, nord, nordMergeStyles } from '@fsegurai/codemirror-theme-nord';

new MergeView({
  a: { doc: 'one\ntwo', extensions: [basicSetup, nord] },
  b: { doc: 'one\nTwo\nthree', extensions: [basicSetup, nord] },
  revertControls: 'b-to-a',
  parent: document.querySelector('#merge')!,
});

applyMergeRevertStyles(nordMergeStyles);
```

## What `applyMergeRevertStyles` does

| Behavior | Detail |
|----------|--------|
| Target | Rules for `.cm-merge-revert` and `.cm-merge-revert button` (including `:hover`). |
| Injection | Appends `<style id="cm-merge-revert-styles">` to `document.head`. |
| Repeat calls | Removes the previous element with that id first, so only one set of revert styles is active. |
| Scope | Global to the page: all merge views share the last applied styles. |
| Environment | Needs `document`; call it in the browser, not during server-side rendering. |

## Unified merge view

`unifiedMergeView` renders inside a single editor, so the theme extension alone styles it:

```ts
import { unifiedMergeView } from '@codemirror/merge';
import { basicSetup, EditorView } from 'codemirror';
import { nord } from '@fsegurai/codemirror-theme-nord';

new EditorView({
  doc: 'one\nTwo\nthree',
  extensions: [basicSetup, unifiedMergeView({ original: 'one\ntwo' }), nord],
  parent: document.body,
});
```

See the merge colors of every theme on the [theme family pages](../themes/README.md).
