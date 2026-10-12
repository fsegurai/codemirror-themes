---
label: API Reference
description: Exact exports of every theme package and of the bundle, with their TypeScript types.
order: 4
tags: [ "api", "reference" ]
breadcrumbTitle: API
---

# API Reference

Every theme package has the same three exports. The bundle re-exports only the combined extensions.

| Export | Type | Page |
|--------|------|------|
| `<theme>` (23 names) | `Extension` from `@codemirror/state` | [Theme Extensions](theme-extensions.md) |
| `<theme>Theme` (23 names) | `Extension` built with `EditorView.theme` | [Editor Themes and Highlight Styles](editor-themes-and-highlight-styles.md) |
| `<theme>HighlightStyle` (23 names) | `HighlightStyle` from `@codemirror/language` | [Editor Themes and Highlight Styles](editor-themes-and-highlight-styles.md) |
| Bundle re-exports (23 names) | `<theme>` extensions only | [Bundle](bundle.md) |

## Not in this release

- There are no `<theme>MergeStyles` objects and no `applyMergeRevertStyles` function; both arrived in 6.24.0.
- Themes do not style `@codemirror/merge` diff decorations such as `.cm-insertedLine` and `.cm-deletedLine`.
- There is no shared `utils.ts` layout helper; each theme is one `src/index.ts` file.
