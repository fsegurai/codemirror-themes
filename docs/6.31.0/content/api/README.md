---
label: API Reference
description: Exact exports of every theme package and of the bundle, with their TypeScript types.
order: 6
tags: [ "api", "reference" ]
breadcrumbTitle: API
---

# API Reference

Every theme package has the same three exports. The bundle re-exports them all.

| Export | Type | Page |
|--------|------|------|
| `<theme>` (33 names) | `Extension` from `@codemirror/state` | [Theme Extensions](theme-extensions.md) |
| `<theme>MergeStyles` (33 names) | `IMergeRevertStyles` | [Merge Styles](merge-styles.md) |
| `applyMergeRevertStyles` | `(styles: IMergeRevertStyles) => void` | [Merge Styles](merge-styles.md) |
| Bundle re-exports (67 names) | Same as above | [Bundle](bundle.md) |

## Not part of the public API

- The internal `EditorView.theme(...)` and `HighlightStyle` values of each theme are not exported separately.
- Since 6.31.0 every theme is built from a shared internal `ThemeDefinition` (a complete UI palette plus syntax
  roles) by an internal `defineTheme` helper. Both live in each package's `src/theme-core.ts` and are not exported:
  the public API is unchanged.
- The `general*` layout helpers in each package's `src/utils.ts` are not exported from the package entry point.
- `IMergeRevertStyles` is declared in the type definitions but not exported by name. Type your own objects
  structurally, for example with `Parameters<typeof applyMergeRevertStyles>[0]`.
