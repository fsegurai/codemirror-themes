---
label: Themes
description: Catalog of all 20 themes with package names, export names and light or dark mode.
order: 2
tags: [ "themes", "catalog" ]
keywords: [ "packages", "exports", "light", "dark" ]
breadcrumbTitle: Themes
---

# Themes

This release ships **20 themes**: 14 dark and 6 light. Every theme is available both as its own package and from
`@fsegurai/codemirror-theme-bundle` under the same export name.

## Catalog

| Theme | Package | Extension export | Mode | Version |
|-------|---------|------------------|------|---------|
| Abcdef | `@fsegurai/codemirror-theme-abcdef` | `abcdef` | Dark | 6.0.7 |
| Abyss | `@fsegurai/codemirror-theme-abyss` | `abyss` | Dark | 6.0.7 |
| Android Studio | `@fsegurai/codemirror-theme-android-studio` | `androidStudio` | Dark | 6.0.7 |
| Andromeda | `@fsegurai/codemirror-theme-andromeda` | `andromeda` | Dark | 6.0.7 |
| Basic Dark | `@fsegurai/codemirror-theme-basic-dark` | `basicDark` | Dark | 6.0.7 |
| Basic Light | `@fsegurai/codemirror-theme-basic-light` | `basicLight` | Light | 6.0.7 |
| Forest | `@fsegurai/codemirror-theme-forest` | `forest` | Dark | 6.0.7 |
| GitHub Dark | `@fsegurai/codemirror-theme-github-dark` | `githubDark` | Dark | 6.0.7 |
| GitHub Light | `@fsegurai/codemirror-theme-github-light` | `githubLight` | Light | 6.0.7 |
| Gruvbox Dark | `@fsegurai/codemirror-theme-gruvbox-dark` | `gruvboxDark` | Dark | 6.0.7 |
| Gruvbox Light | `@fsegurai/codemirror-theme-gruvbox-light` | `gruvboxLight` | Light | 6.0.7 |
| Material Dark | `@fsegurai/codemirror-theme-material-dark` | `materialDark` | Dark | 6.0.7 |
| Material Light | `@fsegurai/codemirror-theme-material-light` | `materialLight` | Light | 6.0.7 |
| Monokai | `@fsegurai/codemirror-theme-monokai` | `monokai` | Dark | 6.0.7 |
| Nord | `@fsegurai/codemirror-theme-nord` | `nord` | Dark | 6.0.7 |
| Solarized Dark | `@fsegurai/codemirror-theme-solarized-dark` | `solarizedDark` | Dark | 6.0.7 |
| Solarized Light | `@fsegurai/codemirror-theme-solarized-light` | `solarizedLight` | Light | 6.0.7 |
| Tokyo Night Day | `@fsegurai/codemirror-theme-tokyo-night-day` | `tokyoNightDay` | Light | 6.0.7 |
| Tokyo Night Storm | `@fsegurai/codemirror-theme-tokyo-night-storm` | `tokyoNightStorm` | Dark | 6.0.7 |
| Volcano | `@fsegurai/codemirror-theme-volcano` | `volcano` | Dark | 6.0.7 |

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
| [Standalone Dark Themes](standalone.md) | Abcdef, Abyss, Android Studio, Andromeda, Forest, Monokai, Nord, Volcano |

## Preview

Try the themes on a Markdown document in the [live demo](https://fsegurai.github.io/codemirror-themes). The demo always shows the latest release,
which can include themes and styles added after this one.
