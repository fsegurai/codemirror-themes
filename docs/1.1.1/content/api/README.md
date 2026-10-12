---
label: API Reference
description: Exact exports of every theme package, with their TypeScript types.
order: 4
tags: [ "api", "reference" ]
breadcrumbTitle: API
---

# API Reference

Every theme package has the same three exports. There is no bundle package in this release.

| Export | Type | Page |
|--------|------|------|
| `<theme>` (20 names) | `Extension` from `@codemirror/state` | [Theme Extensions](theme-extensions.md) |
| `<theme>Theme` (20 names) | `Extension` built with `EditorView.theme` | [Editor Themes and Highlight Styles](editor-themes-and-highlight-styles.md) |
| `<theme>HighlightStyle` (20 names) | `HighlightStyle` from `@codemirror/language` | [Editor Themes and Highlight Styles](editor-themes-and-highlight-styles.md) |

## Not in this release

- There are no `<theme>MergeStyles` objects and no `applyMergeRevertStyles` function; both arrived in 6.24.0.
- Themes do not style `@codemirror/merge` diff decorations such as `.cm-insertedLine` and `.cm-deletedLine`.
- There is no `@fsegurai/codemirror-theme-bundle`; it arrived in 1.2.0.
- There is no shared `utils.ts` layout helper; each theme is one `src/index.ts` file.
