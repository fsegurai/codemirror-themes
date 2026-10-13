---
label: Editor Themes and Highlight Styles
description: The Theme and HighlightStyle exports that each package provides next to its combined extension.
order: 2
tags: [ "api", "highlight-style", "editor-theme" ]
keywords: [ "nordTheme", "nordHighlightStyle", "syntaxHighlighting" ]
---

# Editor Themes and Highlight Styles

```ts
declare const nordTheme: Extension;               // EditorView.theme(spec, { dark: true })
declare const nordHighlightStyle: HighlightStyle; // HighlightStyle.define([...])
declare const nord: Extension;                    // [nordTheme, syntaxHighlighting(nordHighlightStyle)]
```

Every package in this release exports the two parts of its theme next to the combined extension.

| Export | Type | Use it to |
|--------|------|-----------|
| `<theme>Theme` | `Extension` from `@codemirror/state` | Apply only the editor chrome. |
| `<theme>HighlightStyle` | `HighlightStyle` from `@codemirror/language` | Apply only the token colors, wrapped in `syntaxHighlighting(...)`. |

## Example

```ts
import { syntaxHighlighting } from '@codemirror/language';
import { basicSetup, EditorView } from 'codemirror';
import { nordHighlightStyle, nordTheme } from '@fsegurai/codemirror-theme-nord';

new EditorView({
  extensions: [basicSetup, nordTheme, syntaxHighlighting(nordHighlightStyle)],
  parent: document.body,
});
```

This is equivalent to adding `nord`. To combine parts of different themes, see
[Mixing Editor Themes and Highlight Styles](../guides/mixing-highlight-styles.md).

## All exports

| Editor theme | Highlight style | Package |
|--------------|-----------------|---------|
| `abcdefTheme` | `abcdefHighlightStyle` | `@fsegurai/codemirror-theme-abcdef` |
| `abyssTheme` | `abyssHighlightStyle` | `@fsegurai/codemirror-theme-abyss` |
| `androidStudioTheme` | `androidStudioHighlightStyle` | `@fsegurai/codemirror-theme-android-studio` |
| `andromedaTheme` | `andromedaHighlightStyle` | `@fsegurai/codemirror-theme-andromeda` |
| `basicDarkTheme` | `basicDarkHighlightStyle` | `@fsegurai/codemirror-theme-basic-dark` |
| `basicLightTheme` | `basicLightHighlightStyle` | `@fsegurai/codemirror-theme-basic-light` |
| `forestTheme` | `forestHighlightStyle` | `@fsegurai/codemirror-theme-forest` |
| `githubDarkTheme` | `githubDarkHighlightStyle` | `@fsegurai/codemirror-theme-github-dark` |
| `githubLightTheme` | `githubLightHighlightStyle` | `@fsegurai/codemirror-theme-github-light` |
| `gruvboxDarkTheme` | `gruvboxDarkHighlightStyle` | `@fsegurai/codemirror-theme-gruvbox-dark` |
| `gruvboxLightTheme` | `gruvboxLightHighlightStyle` | `@fsegurai/codemirror-theme-gruvbox-light` |
| `materialDarkTheme` | `materialDarkHighlightStyle` | `@fsegurai/codemirror-theme-material-dark` |
| `materialLightTheme` | `materialLightHighlightStyle` | `@fsegurai/codemirror-theme-material-light` |
| `monokaiTheme` | `monokaiHighlightStyle` | `@fsegurai/codemirror-theme-monokai` |
| `nordTheme` | `nordHighlightStyle` | `@fsegurai/codemirror-theme-nord` |
| `solarizedDarkTheme` | `solarizedDarkHighlightStyle` | `@fsegurai/codemirror-theme-solarized-dark` |
| `solarizedLightTheme` | `solarizedLightHighlightStyle` | `@fsegurai/codemirror-theme-solarized-light` |
| `tokyoNightDayTheme` | `tokyoNightDayHighlightStyle` | `@fsegurai/codemirror-theme-tokyo-night-day` |
| `tokyoNightStormTheme` | `tokyoNightStormHighlightStyle` | `@fsegurai/codemirror-theme-tokyo-night-storm` |
| `volcanoTheme` | `volcanoHighlightStyle` | `@fsegurai/codemirror-theme-volcano` |

These exports are only available from the individual packages, not from the bundle. They were removed in 6.24.0.
