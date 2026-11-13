---
label: Examples
description: Complete, copyable setups for a themed editor, a theme picker and a themed merge view, plus runnable playground samples.
order: 7
tags: [ "examples", "samples" ]
breadcrumbTitle: Examples
---

# Examples

Copy these setups into a project, or open the matching playground sample to run them in the browser.

| Example | Shows | Playground |
|---------|-------|------------|
| [Basic Editor](basic-editor.md) | One theme with a language extension. | [Open in playground](../../playground/themed-editor/) |
| [Theme Picker](theme-picker.md) | A `<select>` that switches between bundle themes. | [Open in playground](../../playground/theme-switcher/) |
| [Merge View](merge-view.md) | A side-by-side diff with themed revert buttons that follow the picker. | [Open in playground](../../playground/merge-view/) |

## More playground samples

| Sample | Shows | Related page |
|--------|-------|--------------|
| [Theme gallery](../../playground/theme-gallery/) | Every theme side by side on the same code. | [Themes](../themes/README.md) |
| [Light and dark](../../playground/light-dark/) | A theme pair that follows `prefers-color-scheme`. | [Following the System Color Scheme](../guides/light-dark-mode.md) |
| [Contrast inspector](../../playground/contrast-inspector/) | WCAG contrast ratios of a theme's colors. | [Accessibility](../accessibility/README.md) |
| [Keyboard focus](../../playground/keyboard-focus/) | The focus ring and selection during keyboard navigation. | [Focus, Selection and Forced Colors](../accessibility/focus-and-forced-colors.md) |
| [Custom theme](../../playground/custom-theme/) | A theme built from CodeMirror primitives. | [Creating a Custom Theme](../guides/custom-theme.md) |
| [Override styles](../../playground/override-styles/) | A different font and color on top of a theme. | [Overriding Theme Styles](../guides/overriding-styles.md) |

## Requirements

- The examples are browser code and assume a bundler such as Vite. The playground samples need no build step: they
  load the published packages through an import map.
- The [demo source](https://github.com/fsegurai/codemirror-themes/tree/main/demo) contains the full playground of the
  project website.
- For Angular and React, see [Integration](../integration/README.md).
