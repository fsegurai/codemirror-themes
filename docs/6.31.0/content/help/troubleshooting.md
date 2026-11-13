---
label: Troubleshooting
description: Symptoms, causes and fixes for missing token colors, wrong fonts, merge buttons and theme switching.
order: 11
tags: [ "help", "troubleshooting", "debugging" ]
---

# Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Background is themed but code has no colors | No language extension is active. | Add a language, for example `markdown()` or `javascript()`. |
| Theme colors are ignored or mixed with another theme | Two themes are active, or another theme has higher precedence. | Keep one theme per editor; use a `Compartment` to swap it. Remove `oneDark` or other themes from your setup. |
| Font is not JetBrains Mono | The font is not installed or loaded. | Load it in your page, or override `fontFamily`. See [Overriding Theme Styles](../guides/overriding-styles.md). |
| Revert buttons in a `MergeView` keep the old colors | `applyMergeRevertStyles` was not called after switching. | Call `applyMergeRevertStyles(<theme>MergeStyles)` on every switch. |
| `document is not defined` during SSR | `applyMergeRevertStyles` ran on the server. | Call it inside a browser-only lifecycle hook. |
| Only one side of a `MergeView` changes theme | The reconfigure effect was dispatched to one editor. | Dispatch to both `mergeView.a` and `mergeView.b`. |
| `Unrecognized extension value` error | Duplicate copies of `@codemirror/state` or `@codemirror/view` are installed. | Deduplicate CodeMirror packages so the app and the themes share one copy. |
| TypeScript cannot import `IMergeRevertStyles` | The interface is not exported by name. | Use `Parameters<typeof applyMergeRevertStyles>[0]`. |
| `Duplicate identifier 'oneDark'` or the wrong One Dark is applied | Both `@codemirror/theme-one-dark` and `@fsegurai/codemirror-theme-one-dark` export `oneDark`. | Alias one import: `import { oneDark as fsOneDark } from '@fsegurai/codemirror-theme-one-dark'`. |
| Two focus outlines around the editor | Your own `.cm-focused` outline adds to the theme's focus ring (6.31.0 and later). | Remove your rule, or override the ring with `Prec.highest(EditorView.theme({ '&.cm-focused': { ... } }))`. |
| No focus indicator in Windows High Contrast | An override removed the theme's transparent `outline`. | Keep an `outline` (for example `2px solid transparent`) on `&.cm-focused`; forced-colors mode repaints it. |
| Selection invisible on the current line | A custom active-line or selection color is too close to the other. | Keep at least 1.15:1 between them; see [Focus, Selection and Forced Colors](../accessibility/focus-and-forced-colors.md). |
| `<del>` or `<ins>` elements outside the editor lost their theme styling | Since 6.31.0 the merge-view `del`/`ins` rules only apply inside `.cm-*` elements. | Style those page elements with your own CSS. |
| Colors changed after upgrading | 6.31.0 adjusted colors below the WCAG minimums. | See [What is new in 6.31.0](../releases/6.31.0.md); pin the previous package versions if you need the old colors. |

## Debugging tips

1. Open the browser developer tools and inspect `.cm-editor`: the theme adds one generated class (for example
   `.ͼ1a`) whose rules show the theme colors.
2. Compare your setup with a playground sample: [Open in playground](../../playground/themed-editor/) for a single
   editor, [theme switcher](../../playground/theme-switcher/) or [merge view](../../playground/merge-view/).
3. Check that only one theme extension is active per editor, and that it is inside a `Compartment` if you switch it.

## Still stuck?

Open an issue on [GitHub](https://github.com/fsegurai/codemirror-themes/issues) with your CodeMirror versions, the
theme package and version, and a minimal reproduction.
