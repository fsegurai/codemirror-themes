---
label: How Themes Are Tested
description: The automated contrast, focus and structure tests that every theme passes, and how to run them locally.
order: 4
tags: [ "accessibility", "testing" ]
keywords: [ "bun test", "contrast tests", "snapshots", "regression" ]
---

# How Themes Are Tested

The rules on the [Accessibility](README.md) page are checked by tests in the `tests/` folder of the
[repository](https://github.com/fsegurai/codemirror-themes). They load every theme package from source, render its
CSS through a real `EditorState` and measure the resolved colors, so they test exactly what an editor receives.

## Test suites

| File | What it checks |
|------|----------------|
| `tests/contrast-aa.test.ts` | Every text color reaches 4.5:1 on the background, active line, selection and gutter; the selection differs from the background by 1.2:1. |
| `tests/a11y-ui.test.ts` | Cursor, focus ring, matching bracket and current search match reach 3:1; the selection differs from the active line by 1.15:1; the focus outline survives forced-colors mode; merge-view `del`/`ins` rules stay scoped to `.cm-*` elements. |
| `tests/contrast.test.ts` | A ratchet over `tests/contrast-baseline.json`: known failures can only be removed, never added. The baseline is now empty. |
| `tests/issues.test.ts` | Regression test for issue #140 (GitHub Light token contrast). |
| `tests/theme-structure.test.ts` | Every theme styles the same UI selectors, including Lezer tags and UI parts that were unstyled before 6.31.0 (one shared structure). |
| `tests/theme-output.test.ts` | Snapshots of the resolved syntax styles, editor CSS and export surface of every theme, so any color or API change is visible in review. |
| `tests/type-contract.test.ts` | The internal `ThemeDefinition` type rejects incomplete palettes, so no theme can skip a UI part or syntax role. |

## How a ratio is measured

1. Read the editor CSS of the theme and find the background, the active line and the selection colors.
2. Composite translucent colors over the background.
3. Resolve the highlight style of every Lezer tag (base tags, single modifiers and common nested modifiers).
4. Compute the WCAG relative-luminance contrast ratio of every text color on every surface and keep the lowest.

The same helpers generate the ratios shown on each [theme page](../themes/README.md) and in the
[Contrast Summary](contrast-summary.md), so the documentation always matches the tests.

## Run the tests

```bash
bun install
bun test
```

To run only the accessibility suites:

```bash
bun test tests/contrast-aa.test.ts tests/a11y-ui.test.ts
```

## Regenerate the theme pages

After changing a palette, regenerate the theme pages and the contrast summary of the newest documentation version:

```bash
bun run generate:theme-docs
```
