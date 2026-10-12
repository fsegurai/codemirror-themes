---
label: What's New in 6.24.0
description: Release notes for @fsegurai/codemirror-themes 6.24.0, which adds merge view support and shared theme utilities.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "6.24.0", "merge view", "breaking changes" ]
---

# What's New in 6.24.0

Released 2025-06-02. Themes now style `@codemirror/merge` diff and unified views, and every theme shares one layout
helper. The public exports of each package changed.

## New

| Item | Details |
|------|---------|
| Merge view support | Themes style inserted, deleted and changed text in `MergeView` and `unifiedMergeView`. See [Styling Merge Views](../guides/merge-views.md). |
| `<theme>MergeStyles` | One `IMergeRevertStyles` object per theme for the revert column. See [Merge Styles](../api/merge-styles.md). |
| `applyMergeRevertStyles` | Injects the revert-column styles into the page. Re-exported by the bundle. |
| Shared layout helper | Every package uses the same `utils.ts` values: JetBrains Mono at 14px, line height 1.6, styled scrollbars, panels, tooltips, lint markers and more. See [Overriding Theme Styles](../guides/overriding-styles.md). |

## Breaking changes

The changelog does not list these, but the package source shows them:

| Before (6.1.4.0) | Now (6.24.0) |
|------------------|--------------|
| `<theme>Theme` exported (for example `nordTheme`) | Not exported |
| `<theme>HighlightStyle` exported (for example `nordHighlightStyle`) | Not exported |
| No font set by most themes | `JetBrains Mono, Consolas, monospace` at `14px` on every theme |

If you composed themes from these parts, copy the theme source or build your own; see
[Creating a Custom Theme](../guides/custom-theme.md).

## Changes

- Theme packages and the bundle moved from 6.1.4 to 6.2.0; the bundle now depends on `^6.2.0` of each theme instead of
  `^6.x`.
- Refined theme colors, structure styles and package keywords.
- Improved the demo playground, which now shows a merge view and a unified diff.
- Updated dependencies, including `@codemirror/language` 6.11.0 and `@codemirror/legacy-modes` 6.5.1 for the demo.

The full entry is in the [changelog](https://github.com/fsegurai/codemirror-themes/blob/main/CHANGELOG.md).
