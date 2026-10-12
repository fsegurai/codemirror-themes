---
label: Theme Extensions
description: The Extension exported by each theme package, what it contains and the full list of export names.
order: 1
tags: [ "api", "extension", "themes" ]
keywords: [ "EditorView.theme", "syntaxHighlighting", "dark flag" ]
---

# Theme Extensions

```ts
declare const nord: Extension; // from '@codemirror/state'
```

Each package exports one `Extension` named after the theme in camelCase. It is an array of two extensions, which
are also exported on their own (see [Editor Themes and Highlight Styles](editor-themes-and-highlight-styles.md)):

| Item | Source | Styles |
|------|--------|--------|
| Editor theme | `<theme>Theme`, built with `EditorView.theme(spec, { dark })` | Root colors, content caret, cursor, selection, panels, search matches, active line, selection match, matching brackets, gutters, active line gutter, fold placeholder, tooltips and autocomplete. The exact selectors vary by theme; diff decorations are not styled yet. |
| Syntax highlighting | `syntaxHighlighting(<theme>HighlightStyle)` | Token colors keyed by `@lezer/highlight` tags (keywords, strings, comments, numbers, headings, operators and more). |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { nord } from '@fsegurai/codemirror-theme-nord';

new EditorView({ extensions: [basicSetup, nord], parent: document.body });
```

## All extension exports

| Export | Package | `dark` flag |
|--------|---------|-------------|
| `abcdef` | `@fsegurai/codemirror-theme-abcdef` | Dark |
| `abyss` | `@fsegurai/codemirror-theme-abyss` | Dark |
| `androidStudio` | `@fsegurai/codemirror-theme-android-studio` | Dark |
| `andromeda` | `@fsegurai/codemirror-theme-andromeda` | Dark |
| `basicDark` | `@fsegurai/codemirror-theme-basic-dark` | Dark |
| `basicLight` | `@fsegurai/codemirror-theme-basic-light` | Light |
| `forest` | `@fsegurai/codemirror-theme-forest` | Dark |
| `githubDark` | `@fsegurai/codemirror-theme-github-dark` | Dark |
| `githubLight` | `@fsegurai/codemirror-theme-github-light` | Light |
| `gruvboxDark` | `@fsegurai/codemirror-theme-gruvbox-dark` | Dark |
| `gruvboxLight` | `@fsegurai/codemirror-theme-gruvbox-light` | Light |
| `materialDark` | `@fsegurai/codemirror-theme-material-dark` | Dark |
| `materialLight` | `@fsegurai/codemirror-theme-material-light` | Light |
| `monokai` | `@fsegurai/codemirror-theme-monokai` | Dark |
| `nord` | `@fsegurai/codemirror-theme-nord` | Dark |
| `solarizedDark` | `@fsegurai/codemirror-theme-solarized-dark` | Dark |
| `solarizedLight` | `@fsegurai/codemirror-theme-solarized-light` | Light |
| `tokyoNightDay` | `@fsegurai/codemirror-theme-tokyo-night-day` | Light |
| `tokyoNightStorm` | `@fsegurai/codemirror-theme-tokyo-night-storm` | Dark |
| `volcano` | `@fsegurai/codemirror-theme-volcano` | Dark |

Mode is `Dark` when the theme passes `{ dark: true }` to `EditorView.theme`.
