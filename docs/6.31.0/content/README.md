---
label: Documentation Home
description: Documentation for @fsegurai/codemirror-themes 6.31.0, a collection of 33 accessible CodeMirror 6 themes published as individual packages and one bundle.
order: 0
tags: [ "documentation", "overview", "codemirror" ]
keywords: [ "codemirror 6", "editor theme", "syntax highlighting", "merge view", "wcag" ]
breadcrumbTitle: Home
---

# CodeMirror 6 Themes

`@fsegurai/codemirror-themes` is a monorepo of **33 themes for CodeMirror 6**. Each theme ships as its own npm package
(`@fsegurai/codemirror-theme-<name>`), and `@fsegurai/codemirror-theme-bundle` re-exports all of them.

Since 6.31.0 every theme meets **WCAG 2.2 AA**: text reaches 4.5:1 on the background, the active line and the
selection, and the cursor, focus ring and match indicators reach 3:1. See [Accessibility](accessibility/README.md).

## Quick start

1. Install one theme and CodeMirror: `npm install @fsegurai/codemirror-theme-nord codemirror`.
2. Import the theme extension: `import { nord } from '@fsegurai/codemirror-theme-nord'`.
3. Add it to the `extensions` array of your `EditorView`.

```ts
import { basicSetup, EditorView } from 'codemirror';
import { nord } from '@fsegurai/codemirror-theme-nord';

new EditorView({
  doc: 'console.log("Hello")',
  extensions: [basicSetup, nord],
  parent: document.body,
});
```

[Open in playground](../playground/themed-editor/) to edit this setup live.

## What every theme package gives you

| Export | Type | Purpose |
|--------|------|---------|
| `<theme>` (for example `nord`) | `Extension` | Editor styles plus syntax highlighting, ready to add to an editor. |
| `<theme>MergeStyles` | `IMergeRevertStyles` | Colors for the revert controls of `@codemirror/merge` views. |
| `applyMergeRevertStyles` | `(styles) => void` | Injects a `<style>` tag that applies merge-revert colors. |

## Sections

| Section | Read it when you want to |
|---------|--------------------------|
| [Getting Started](getting-started/README.md) | Install a theme or the bundle and render your first editor. |
| [Themes](themes/README.md) | Browse all 33 themes, their export names, colors and contrast ratios. |
| [Accessibility](accessibility/README.md) | Understand the contrast rules every theme follows and how they are tested. |
| [Guides](guides/README.md) | Switch themes at runtime, style merge views, override styles, build your own theme. |
| [Integration](integration/README.md) | Use the themes from plain JavaScript, Angular or React. |
| [API Reference](api/README.md) | Look up exact exports and types. |
| [Examples](examples/README.md) | Copy complete, working setups and open them in the playground. |
| [Releases](releases/README.md) | See what changed in 6.31.0, including the color changes per theme. |
| [Help](help/README.md) | Solve common problems and find contribution resources. |

## Playground samples

Every sample runs in the documentation playground with the published packages.

| Sample | Shows |
|--------|-------|
| [Themed editor](../playground/themed-editor/) | One theme on a JavaScript editor. |
| [Theme switcher](../playground/theme-switcher/) | Swap themes at runtime with a `Compartment`. |
| [Light and dark](../playground/light-dark/) | Follow `prefers-color-scheme`. |
| [Merge view](../playground/merge-view/) | Themed `MergeView` with revert buttons. |
| [Theme gallery](../playground/theme-gallery/) | Every theme side by side. |
| [Contrast inspector](../playground/contrast-inspector/) | Contrast ratios of a theme's colors. |
| [Custom theme](../playground/custom-theme/) | Build a theme from CodeMirror primitives. |
| [Override styles](../playground/override-styles/) | Change the font or a color on top of a theme. |
| [Keyboard focus](../playground/keyboard-focus/) | The focus ring and selection while navigating with the keyboard. |

## Links

- Live demo: [fsegurai.github.io/codemirror-themes](https://fsegurai.github.io/codemirror-themes)
- Source: [github.com/fsegurai/codemirror-themes](https://github.com/fsegurai/codemirror-themes)
- License: MIT
