---
label: What's New in 6.0.3
description: Release notes for @fsegurai/codemirror-themes 6.0.3, which adds ESLint and reworks the release pipelines.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "6.0.3", "eslint", "pipelines" ]
---

# What's New in 6.0.3

Released 2024-11-11. A tooling release: ESLint, reworked release pipelines and dependency updates. The public API is
unchanged.

## Changes in 6.0.3

| Area | Change |
|------|--------|
| Linting | ESLint added; `npm run lint` checks the demo and every package. Theme sources were reformatted (semicolons, trailing commas). |
| Repository | The repository version jumped from 1.3.2 to 6.0.3. The `example/` folder became `demo/`, built with `rollup.demo.config.js`. |
| Pipelines | Improved build, test and release workflows, including a library release pipeline. |
| Packages | Every theme package published as 6.0.7. The bundle stays at 6.0.5 and depends on `^6.0.5` of each theme. |
| Fixes | Fixed demo pipeline issues. |
| Dependencies | `@codemirror/lang-markdown` 6.3.1, `@codemirror/legacy-modes` 6.4.2, `@lezer/markdown` 1.3.2; dev: `rollup` 4.25.0, `typescript-eslint` 8.14.0. |

The changelog does not mention it, but a few color constants changed while the sources were reformatted. For example,
the Tokyo Night Storm selection-match color moved from `#343b5f` to `#6f7bb630`.

## The API in this release

Each package exports `<theme>`, `<theme>Theme` and `<theme>HighlightStyle`; see the [API reference](../api/README.md).
The bundle re-exports the 20 combined extensions.

The full entry is in the [changelog](https://github.com/fsegurai/codemirror-themes/blob/main/CHANGELOG.md).
