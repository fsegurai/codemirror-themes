---
label: What's New in 6.25.0
description: Release notes for @fsegurai/codemirror-themes 6.25.0, which adds the Cobalt2 theme.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "6.25.0", "cobalt2", "new theme" ]
---

# What's New in 6.25.0

Released 2025-08-11. Adds the **Cobalt2** theme and new helper scripts for keeping the shared theme utilities in sync.

## New

| Item | Details |
|------|---------|
| Cobalt2 theme | `@fsegurai/codemirror-theme-cobalt2` 6.0.0, export `cobalt2`, plus `cobalt2MergeStyles`. Also in the bundle. See [Standalone Dark Themes](../themes/standalone.md). |
| Helper scripts | `helper/src/utils.ts` holds the shared layout helper; `bun run copy:helpers` copies it into every package. |
| Project docs | `CHANGELOG.md` and `CONTRIBUTING.md` added to the repository. |

## Changes

- Theme packages moved to 6.2.1 and the bundle to 6.2.1; the bundle now depends on `^6.2.1` of each theme.
- Refined theme structure styles and the demo playground.
- Updated every package README to list the new theme.
- Updated dependencies, including `@lezer/markdown` 1.4.3 and `marked` 15.0.12 for the demo.

There are no breaking API changes. Release 6.25.1 followed with a Cobalt2 highlight-style fix.

The full entry is in the [changelog](https://github.com/fsegurai/codemirror-themes/blob/main/CHANGELOG.md).
