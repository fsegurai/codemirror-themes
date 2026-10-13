---
label: Documentation Home
description: Documentation for @fsegurai/codemirror-themes 6.1.4.0, a collection of 23 CodeMirror 6 themes published as individual packages and one bundle.
order: 0
tags: [ "documentation", "overview", "codemirror" ]
keywords: [ "codemirror 6", "editor theme", "syntax highlighting", "6.1.4.0" ]
breadcrumbTitle: Home
publishedAt: "2025-04-22"
---

# CodeMirror 6 Themes

`@fsegurai/codemirror-themes` is a monorepo of **23 themes for CodeMirror 6**. Each theme ships as its own npm package
(`@fsegurai/codemirror-theme-<name>`), and `@fsegurai/codemirror-theme-bundle` re-exports all of them.

> These pages document release **6.1.4.0**, published 2025-04-22. See [What's New in 6.1.4.0](help/whats-new.md).

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

## What every theme package gives you

| Export | Type | Purpose |
|--------|------|---------|
| `<theme>` (for example `nord`) | `Extension` | Editor styles plus syntax highlighting, ready to add to an editor. |
| `<theme>Theme` (for example `nordTheme`) | `Extension` | Only the editor chrome, built with `EditorView.theme`. |
| `<theme>HighlightStyle` (for example `nordHighlightStyle`) | `HighlightStyle` | Only the token colors; wrap it in `syntaxHighlighting(...)`. |

Merge-view styling (`<theme>MergeStyles`, `applyMergeRevertStyles`) does not exist yet in this release; it arrived in 6.24.0.

## Sections

| Section | Read it when you want to |
|---------|--------------------------|
| [Getting Started](getting-started/README.md) | Install a theme or the bundle and render your first editor. |
| [Themes](themes/README.md) | Browse all 23 themes, their export names and light/dark mode. |
| [Guides](guides/README.md) | Switch themes at runtime, mix editor themes and highlight styles, override fonts, build your own theme. |
| [API Reference](api/README.md) | Look up exact exports and types. |
| [Examples](examples/README.md) | Copy complete, working setups. |
| [Help](help/README.md) | Solve common problems, read the release notes and find project resources. |

## Links

- Live demo (always shows the latest release): [fsegurai.github.io/codemirror-themes](https://fsegurai.github.io/codemirror-themes)
- Source: [github.com/fsegurai/codemirror-themes](https://github.com/fsegurai/codemirror-themes)
- License: MIT
