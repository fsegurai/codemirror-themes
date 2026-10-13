---
label: Themes
description: Catalog of all 23 themes with package names, export names and light or dark mode.
order: 2
tags: [ "themes", "catalog" ]
keywords: [ "packages", "exports", "light", "dark" ]
breadcrumbTitle: Themes
---

# Themes

This release ships **23 themes**: 16 dark and 7 light. Every theme is available both as its own package and from
`@fsegurai/codemirror-theme-bundle` under the same export name.

## Catalog

| Theme | Package | Extension export | Mode | Version |
|-------|---------|------------------|------|---------|
| Abcdef | `@fsegurai/codemirror-theme-abcdef` | `abcdef` | Dark | 6.1.4 |
| Abyss | `@fsegurai/codemirror-theme-abyss` | `abyss` | Dark | 6.1.4 |
| Android Studio | `@fsegurai/codemirror-theme-android-studio` | `androidStudio` | Dark | 6.1.4 |
| Andromeda | `@fsegurai/codemirror-theme-andromeda` | `andromeda` | Dark | 6.1.4 |
| Basic Dark | `@fsegurai/codemirror-theme-basic-dark` | `basicDark` | Dark | 6.1.4 |
| Basic Light | `@fsegurai/codemirror-theme-basic-light` | `basicLight` | Light | 6.1.4 |
| Forest | `@fsegurai/codemirror-theme-forest` | `forest` | Dark | 6.1.4 |
| GitHub Dark | `@fsegurai/codemirror-theme-github-dark` | `githubDark` | Dark | 6.1.4 |
| GitHub Light | `@fsegurai/codemirror-theme-github-light` | `githubLight` | Light | 6.1.4 |
| Gruvbox Dark | `@fsegurai/codemirror-theme-gruvbox-dark` | `gruvboxDark` | Dark | 6.1.4 |
| Gruvbox Light | `@fsegurai/codemirror-theme-gruvbox-light` | `gruvboxLight` | Light | 6.1.4 |
| Material Dark | `@fsegurai/codemirror-theme-material-dark` | `materialDark` | Dark | 6.1.4 |
| Material Light | `@fsegurai/codemirror-theme-material-light` | `materialLight` | Light | 6.1.4 |
| Monokai | `@fsegurai/codemirror-theme-monokai` | `monokai` | Dark | 6.1.4 |
| Nord | `@fsegurai/codemirror-theme-nord` | `nord` | Dark | 6.1.4 |
| Palenight | `@fsegurai/codemirror-theme-palenight` | `palenight` | Dark | 6.1.4 |
| Solarized Dark | `@fsegurai/codemirror-theme-solarized-dark` | `solarizedDark` | Dark | 6.1.4 |
| Solarized Light | `@fsegurai/codemirror-theme-solarized-light` | `solarizedLight` | Light | 6.1.4 |
| Tokyo Night Day | `@fsegurai/codemirror-theme-tokyo-night-day` | `tokyoNightDay` | Light | 6.1.4 |
| Tokyo Night Storm | `@fsegurai/codemirror-theme-tokyo-night-storm` | `tokyoNightStorm` | Dark | 6.1.4 |
| Volcano | `@fsegurai/codemirror-theme-volcano` | `volcano` | Dark | 6.1.4 |
| VS Code Dark | `@fsegurai/codemirror-theme-vscode-dark` | `vsCodeDark` | Dark | 6.1.4 |
| VS Code Light | `@fsegurai/codemirror-theme-vscode-light` | `vsCodeLight` | Light | 6.1.4 |

Each package also exports `<extension>Theme` and `<extension>HighlightStyle` (for example `nordTheme` and
`nordHighlightStyle`). The bundle re-exports only the combined extensions. See the [API reference](../api/README.md).

## Theme families

The pages below group themes by family and list the colors taken from each theme's source at this release.

| Family | Themes |
|--------|--------|
| [Basic](basic.md) | Basic Dark, Basic Light |
| [GitHub](github.md) | GitHub Dark, GitHub Light |
| [Gruvbox](gruvbox.md) | Gruvbox Dark, Gruvbox Light |
| [Material](material.md) | Material Dark, Material Light |
| [Solarized](solarized.md) | Solarized Dark, Solarized Light |
| [Tokyo Night](tokyo-night.md) | Tokyo Night Day, Tokyo Night Storm |
| [VS Code](vscode.md) | VS Code Dark, VS Code Light |
| [Standalone Dark Themes](standalone.md) | Abcdef, Abyss, Android Studio, Andromeda, Forest, Monokai, Nord, Palenight, Volcano |

## Preview

Try the themes on a Markdown document in the [live demo](https://fsegurai.github.io/codemirror-themes). The demo always shows the latest release,
which can include themes and styles added after this one.
