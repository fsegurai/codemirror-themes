---
label: What's New in 6.1.4.0
description: Release notes for @fsegurai/codemirror-themes 6.1.4.0, a maintenance release.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "6.1.4.0", "maintenance", "dependencies" ]
---

# What's New in 6.1.4.0

Released 2025-04-22. A maintenance release with a dependency update and minor fixes. The API is unchanged.

## Changes in 6.1.4.0

| Area | Change |
|------|--------|
| Packages | All theme packages and the bundle published as 6.1.4. |
| Demo dependencies | `@lezer/markdown` 1.4.1 to 1.4.2. |
| Fixes | Minor fixes and README improvements. |

## The API in this release

Each package exports `<theme>`, `<theme>Theme` and `<theme>HighlightStyle`; see the [API reference](../api/README.md).
Merge-view styling and the shared layout helper do not exist yet; they arrived in 6.24.0, which also removed the
`<theme>Theme` and `<theme>HighlightStyle` exports.

The full entry is in the [changelog](https://github.com/fsegurai/codemirror-themes/blob/main/CHANGELOG.md).
