---
label: What's New in 6.29.2
description: Release notes for @fsegurai/codemirror-themes 6.29.2, a dependency maintenance release.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "6.29.2", "dependencies", "security" ]
---

# What's New in 6.29.2

Released 2026-03-24. A maintenance release: dependency updates only. No theme package changed, so the theme packages
stay at the versions listed in the [catalog](../themes/README.md).

## Changes in 6.29.2

| Area | Change |
|------|--------|
| Demo dependencies | `@codemirror/language` 6.12.2, `@codemirror/merge` 6.12.1, `@codemirror/state` 6.6.0, `marked` 17.0.5 |
| Dev dependencies | ESLint 10, `rollup` 4.60.0, `typescript-eslint` 8.57.2, `cpy-cli` 7.0.0 and other updates |
| Removed | `semantic-release` and its `@semantic-release/*` plugins |

## Also new since 6.25.0

These docs follow 6.25.0. The releases in between added:

| Release | Highlights |
|---------|------------|
| 6.29.0 | New themes: Catppuccin Mocha, High Contrast Dark, High Contrast Light and Synthwave '84. Fixed line numbers drifting from their code rows (the gutter now sets `lineHeight: 1.78`). |
| 6.29.1 | Fixed the VS Code Dark and Light READMEs, which showed `vscodeDark`/`vscodeLight` imports; the packages export `vsCodeDark` and `vsCodeLight`. New project logo. |

The 6.29.0 changelog lists a rename from `vscodeDark` to `vsCodeDark` as breaking. The package source already exported
`vsCodeDark` and `vsCodeLight` in 6.24.0 and 6.25.0, so code written against those releases keeps working.

The full entry is in the [changelog](https://github.com/fsegurai/codemirror-themes/blob/main/CHANGELOG.md).
