---
label: API Reference
description: Exact exports of every theme package and of the bundle, with their TypeScript types.
order: 6
tags: [ "api", "reference" ]
breadcrumbTitle: API
---

# API Reference

Every theme package has the same three exports. The bundle re-exports them all, plus the public API of the core
package.

| Export | Type | Page |
|--------|------|------|
| `<theme>` (33 names) | `Extension` from `@codemirror/state` | [Theme Extensions](theme-extensions.md) |
| `<theme>MergeStyles` (33 names) | `IMergeRevertStyles` | [Merge Styles](merge-styles.md) |
| `applyMergeRevertStyles` | `(styles: IMergeRevertStyles) => void` | [Merge Styles](merge-styles.md) |
| Bundle re-exports (70 values plus types) | Same as above, plus `defineTheme`, `cssVariableTheme`, `cssVariableNames` | [Bundle](bundle.md) |
| `defineTheme`, `ThemeDefinition`, `UiPalette`, syntax role types | `@fsegurai/codemirror-theme-core` | [Core Package](core.md) |
| `cssVariableTheme`, `cssVariableNames` | `@fsegurai/codemirror-theme-core` | [CSS Variable Theme](css-variable-theme.md) |

## Not part of the public API

- The internal `EditorView.theme(...)` and `HighlightStyle` values of each theme are not exported separately.
- Theme packages do not re-export `defineTheme` or `ThemeDefinition`. Since 6.32.0 they are public in
  `@fsegurai/codemirror-theme-core` (and the bundle); see [Core Package](core.md).
- The `general*` layout helpers in each package's `src/utils.ts` are not exported from the package entry point.
- `IMergeRevertStyles` is declared in the type definitions but not exported by name. Type your own objects
  structurally, for example with `Parameters<typeof applyMergeRevertStyles>[0]`.
