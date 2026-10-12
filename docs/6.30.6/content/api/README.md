---
label: API Reference
description: Exact exports of every theme package and of the bundle, with their TypeScript types.
order: 4
tags: [ "api", "reference" ]
breadcrumbTitle: API
---

# API Reference

Every theme package has the same three exports. The bundle re-exports them all.

| Export | Type | Page |
|--------|------|------|
| `<theme>` (29 names) | `Extension` from `@codemirror/state` | [Theme Extensions](theme-extensions.md) |
| `<theme>MergeStyles` (29 names) | `IMergeRevertStyles` | [Merge Styles](merge-styles.md) |
| `applyMergeRevertStyles` | `(styles: IMergeRevertStyles) => void` | [Merge Styles](merge-styles.md) |
| Bundle re-exports (59 names) | Same as above | [Bundle](bundle.md) |

## Not part of the public API

- The internal `EditorView.theme(...)` and `HighlightStyle` values of each theme are not exported separately.
- The `general*` layout helpers in each package's `src/utils.ts` are not exported from the package entry point.
- `IMergeRevertStyles` is declared in the type definitions but not exported by name. Type your own objects
  structurally, for example with `Parameters<typeof applyMergeRevertStyles>[0]`.
