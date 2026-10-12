---
label: Themes
description: Catalog of all 20 themes with package names, export names and light or dark mode.
order: 2
tags: [ "themes", "catalog" ]
keywords: [ "packages", "exports", "light", "dark" ]
breadcrumbTitle: Themes
---

# Themes

This release ships **20 themes**: 14 dark and 6 light. Every theme is its own package; there is no bundle in this
release.

## Catalog

| Theme | Package | Extension export | Mode | Version |
|-------|---------|------------------|------|---------|
| Abcdef | `@fsegurai/codemirror-theme-abcdef` | `abcdef` | Dark | 6.0.1 |
| Abyss | `@fsegurai/codemirror-theme-abyss` | `abyss` | Dark | 6.0.1 |
| Android Studio | `@fsegurai/codemirror-theme-android-studio` | `androidStudio` | Dark | 6.0.1 |
| Andromeda | `@fsegurai/codemirror-theme-andromeda` | `andromeda` | Dark | 6.0.1 |
| Basic Dark | `@fsegurai/codemirror-theme-basic-dark` | `basicDark` | Dark | 6.0.1 |
| Basic Light | `@fsegurai/codemirror-theme-basic-light` | `basicLight` | Light | 6.0.1 |
| Forest | `@fsegurai/codemirror-theme-forest` | `forest` | Dark | 6.0.1 |
| GitHub Dark | `@fsegurai/codemirror-theme-github-dark` | `githubDark` | Dark | 6.0.1 |
| GitHub Light | `@fsegurai/codemirror-theme-github-light` | `githubLight` | Light | 6.0.1 |
| Gruvbox Dark | `@fsegurai/codemirror-theme-gruvbox-dark` | `gruvboxDark` | Dark | 6.0.1 |
| Gruvbox Light | `@fsegurai/codemirror-theme-gruvbox-light` | `gruvboxLight` | Light | 6.0.1 |
| Material Dark | `@fsegurai/codemirror-theme-material-dark` | `materialDark` | Dark | 6.0.1 |
| Material Light | `@fsegurai/codemirror-theme-material-light` | `materialLight` | Light | 6.0.1 |
| Monokai | `@fsegurai/codemirror-theme-monokai` | `monokai` | Dark | 6.0.1 |
| Nord | `@fsegurai/codemirror-theme-nord` | `nord` | Dark | 6.0.1 |
| Solarized Dark | `@fsegurai/codemirror-theme-solarized-dark` | `solarizedDark` | Dark | 6.0.1 |
| Solarized Light | `@fsegurai/codemirror-theme-solarized-light` | `solarizedLight` | Light | 6.0.1 |
| Tokyo Night Day | `@fsegurai/codemirror-theme-tokyo-night-day` | `tokyoNightDay` | Light | 6.0.1 |
| Tokyo Night Storm | `@fsegurai/codemirror-theme-tokyo-night-storm` | `tokyoNightStorm` | Dark | 6.0.1 |
| Volcano | `@fsegurai/codemirror-theme-volcano` | `volcano` | Dark | 6.0.1 |

Each package also exports `<extension>Theme` and `<extension>HighlightStyle` (for example `nordTheme` and
`nordHighlightStyle`). See the [API reference](../api/README.md).

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

This release has no hosted demo; the demo site arrived in 1.1.0. To preview locally, clone the repository at
tag `v1.0.0`, run `npm install` and `npm run example`; the example page lists every theme on a Markdown document.
