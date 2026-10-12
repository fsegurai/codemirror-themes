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

Each package exports one `Extension` named after the theme in camelCase. It is an array of two extensions:

| Item | Source | Styles |
|------|--------|--------|
| Editor theme | `EditorView.theme(spec, { dark })` | Root colors and font, content, cursor, selection, search matches, panels, active line, gutters, fold gutter, inserted/deleted lines, tooltips, autocomplete, lint diagnostics, matching brackets, fold placeholder, focus outline, scrollbars, ghost text. |
| Syntax highlighting | `syntaxHighlighting(HighlightStyle.define([...]))` | Token colors keyed by `@lezer/highlight` tags (keywords, strings, comments, numbers, headings, operators and more). |

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
| `catppuccinMocha` | `@fsegurai/codemirror-theme-catppuccin-mocha` | Dark |
| `cobalt2` | `@fsegurai/codemirror-theme-cobalt2` | Dark |
| `forest` | `@fsegurai/codemirror-theme-forest` | Dark |
| `githubDark` | `@fsegurai/codemirror-theme-github-dark` | Dark |
| `githubLight` | `@fsegurai/codemirror-theme-github-light` | Light |
| `gruvboxDark` | `@fsegurai/codemirror-theme-gruvbox-dark` | Dark |
| `gruvboxLight` | `@fsegurai/codemirror-theme-gruvbox-light` | Light |
| `highContrastDark` | `@fsegurai/codemirror-theme-high-contrast-dark` | Dark |
| `highContrastLight` | `@fsegurai/codemirror-theme-high-contrast-light` | Light |
| `materialDark` | `@fsegurai/codemirror-theme-material-dark` | Dark |
| `materialLight` | `@fsegurai/codemirror-theme-material-light` | Light |
| `monokai` | `@fsegurai/codemirror-theme-monokai` | Dark |
| `nord` | `@fsegurai/codemirror-theme-nord` | Dark |
| `palenight` | `@fsegurai/codemirror-theme-palenight` | Dark |
| `solarizedDark` | `@fsegurai/codemirror-theme-solarized-dark` | Dark |
| `solarizedLight` | `@fsegurai/codemirror-theme-solarized-light` | Light |
| `synthwave84` | `@fsegurai/codemirror-theme-synthwave-84` | Dark |
| `tokyoNightDay` | `@fsegurai/codemirror-theme-tokyo-night-day` | Light |
| `tokyoNightStorm` | `@fsegurai/codemirror-theme-tokyo-night-storm` | Dark |
| `volcano` | `@fsegurai/codemirror-theme-volcano` | Dark |
| `vsCodeDark` | `@fsegurai/codemirror-theme-vscode-dark` | Dark |
| `vsCodeLight` | `@fsegurai/codemirror-theme-vscode-light` | Light |

Mode is `Dark` when the theme passes `{ dark: true }` to `EditorView.theme`.
