---
label: Themes
description: Catalog of all 24 themes with package names, export names and light or dark mode.
order: 2
tags: [ "themes", "catalog" ]
keywords: [ "packages", "exports", "light", "dark" ]
breadcrumbTitle: Themes
---

# Themes

This release ships **24 themes**: 17 dark and 7 light. Every theme is available both as its own package and from
`@fsegurai/codemirror-theme-bundle` under the same export name.

## Catalog

| Theme | Package | Extension export | Mode | Version |
|-------|---------|------------------|------|---------|
| Abcdef | `@fsegurai/codemirror-theme-abcdef` | `abcdef` | Dark | 6.2.1 |
| Abyss | `@fsegurai/codemirror-theme-abyss` | `abyss` | Dark | 6.2.1 |
| Android Studio | `@fsegurai/codemirror-theme-android-studio` | `androidStudio` | Dark | 6.2.1 |
| Andromeda | `@fsegurai/codemirror-theme-andromeda` | `andromeda` | Dark | 6.2.1 |
| Basic Dark | `@fsegurai/codemirror-theme-basic-dark` | `basicDark` | Dark | 6.2.1 |
| Basic Light | `@fsegurai/codemirror-theme-basic-light` | `basicLight` | Light | 6.2.1 |
| Cobalt2 | `@fsegurai/codemirror-theme-cobalt2` | `cobalt2` | Dark | 6.0.0 |
| Forest | `@fsegurai/codemirror-theme-forest` | `forest` | Dark | 6.2.1 |
| GitHub Dark | `@fsegurai/codemirror-theme-github-dark` | `githubDark` | Dark | 6.2.1 |
| GitHub Light | `@fsegurai/codemirror-theme-github-light` | `githubLight` | Light | 6.2.1 |
| Gruvbox Dark | `@fsegurai/codemirror-theme-gruvbox-dark` | `gruvboxDark` | Dark | 6.2.1 |
| Gruvbox Light | `@fsegurai/codemirror-theme-gruvbox-light` | `gruvboxLight` | Light | 6.2.1 |
| Material Dark | `@fsegurai/codemirror-theme-material-dark` | `materialDark` | Dark | 6.2.1 |
| Material Light | `@fsegurai/codemirror-theme-material-light` | `materialLight` | Light | 6.2.1 |
| Monokai | `@fsegurai/codemirror-theme-monokai` | `monokai` | Dark | 6.2.1 |
| Nord | `@fsegurai/codemirror-theme-nord` | `nord` | Dark | 6.2.1 |
| Palenight | `@fsegurai/codemirror-theme-palenight` | `palenight` | Dark | 6.2.1 |
| Solarized Dark | `@fsegurai/codemirror-theme-solarized-dark` | `solarizedDark` | Dark | 6.2.1 |
| Solarized Light | `@fsegurai/codemirror-theme-solarized-light` | `solarizedLight` | Light | 6.2.1 |
| Tokyo Night Day | `@fsegurai/codemirror-theme-tokyo-night-day` | `tokyoNightDay` | Light | 6.2.1 |
| Tokyo Night Storm | `@fsegurai/codemirror-theme-tokyo-night-storm` | `tokyoNightStorm` | Dark | 6.2.1 |
| Volcano | `@fsegurai/codemirror-theme-volcano` | `volcano` | Dark | 6.2.1 |
| VS Code Dark | `@fsegurai/codemirror-theme-vscode-dark` | `vsCodeDark` | Dark | 6.2.1 |
| VS Code Light | `@fsegurai/codemirror-theme-vscode-light` | `vsCodeLight` | Light | 6.2.1 |

Each package also exports `<extension>MergeStyles` (for example `nordMergeStyles`) and `applyMergeRevertStyles`. See the
[API reference](../api/README.md).

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
| [Standalone Dark Themes](standalone.md) | Abcdef, Abyss, Android Studio, Andromeda, Cobalt2, Forest, Monokai, Nord, Palenight, Volcano |

## Preview

Try every theme on Markdown, a side-by-side merge view and a unified diff in the
[live playground](https://fsegurai.github.io/codemirror-themes/playground.html). The playground always shows the latest release, which can
include themes added after this one.
