---
label: Themes
description: Catalog of all 28 themes with package names, export names and light or dark mode.
order: 2
tags: [ "themes", "catalog" ]
keywords: [ "packages", "exports", "light", "dark" ]
breadcrumbTitle: Themes
---

# Themes

This release ships **28 themes**: 20 dark and 8 light. Every theme is available both as its own package and from
`@fsegurai/codemirror-theme-bundle` under the same export name.

## Catalog

| Theme | Package | Extension export | Mode | Version |
|-------|---------|------------------|------|---------|
| Abcdef | `@fsegurai/codemirror-theme-abcdef` | `abcdef` | Dark | 6.2.3 |
| Abyss | `@fsegurai/codemirror-theme-abyss` | `abyss` | Dark | 6.2.3 |
| Android Studio | `@fsegurai/codemirror-theme-android-studio` | `androidStudio` | Dark | 6.2.3 |
| Andromeda | `@fsegurai/codemirror-theme-andromeda` | `andromeda` | Dark | 6.2.3 |
| Basic Dark | `@fsegurai/codemirror-theme-basic-dark` | `basicDark` | Dark | 6.2.3 |
| Basic Light | `@fsegurai/codemirror-theme-basic-light` | `basicLight` | Light | 6.2.3 |
| Catppuccin Mocha | `@fsegurai/codemirror-theme-catppuccin-mocha` | `catppuccinMocha` | Dark | 6.0.0 |
| Cobalt2 | `@fsegurai/codemirror-theme-cobalt2` | `cobalt2` | Dark | 6.0.3 |
| Forest | `@fsegurai/codemirror-theme-forest` | `forest` | Dark | 6.2.3 |
| GitHub Dark | `@fsegurai/codemirror-theme-github-dark` | `githubDark` | Dark | 6.2.3 |
| GitHub Light | `@fsegurai/codemirror-theme-github-light` | `githubLight` | Light | 6.2.3 |
| Gruvbox Dark | `@fsegurai/codemirror-theme-gruvbox-dark` | `gruvboxDark` | Dark | 6.2.3 |
| Gruvbox Light | `@fsegurai/codemirror-theme-gruvbox-light` | `gruvboxLight` | Light | 6.2.3 |
| High Contrast Dark | `@fsegurai/codemirror-theme-high-contrast-dark` | `highContrastDark` | Dark | 6.0.0 |
| High Contrast Light | `@fsegurai/codemirror-theme-high-contrast-light` | `highContrastLight` | Light | 6.0.0 |
| Material Dark | `@fsegurai/codemirror-theme-material-dark` | `materialDark` | Dark | 6.2.3 |
| Material Light | `@fsegurai/codemirror-theme-material-light` | `materialLight` | Light | 6.2.3 |
| Monokai | `@fsegurai/codemirror-theme-monokai` | `monokai` | Dark | 6.2.3 |
| Nord | `@fsegurai/codemirror-theme-nord` | `nord` | Dark | 6.2.3 |
| Palenight | `@fsegurai/codemirror-theme-palenight` | `palenight` | Dark | 6.2.3 |
| Solarized Dark | `@fsegurai/codemirror-theme-solarized-dark` | `solarizedDark` | Dark | 6.2.3 |
| Solarized Light | `@fsegurai/codemirror-theme-solarized-light` | `solarizedLight` | Light | 6.2.3 |
| Synthwave '84 | `@fsegurai/codemirror-theme-synthwave-84` | `synthwave84` | Dark | 6.0.0 |
| Tokyo Night Day | `@fsegurai/codemirror-theme-tokyo-night-day` | `tokyoNightDay` | Light | 6.2.3 |
| Tokyo Night Storm | `@fsegurai/codemirror-theme-tokyo-night-storm` | `tokyoNightStorm` | Dark | 6.2.3 |
| Volcano | `@fsegurai/codemirror-theme-volcano` | `volcano` | Dark | 6.2.3 |
| VS Code Dark | `@fsegurai/codemirror-theme-vscode-dark` | `vsCodeDark` | Dark | 6.2.4 |
| VS Code Light | `@fsegurai/codemirror-theme-vscode-light` | `vsCodeLight` | Light | 6.2.4 |

Each package also exports `<extension>MergeStyles` (for example `nordMergeStyles`) and `applyMergeRevertStyles`. See the
[API reference](../api/README.md).

## Theme families

The pages below group themes by family and list the colors taken from each theme's source at this release.

| Family | Themes |
|--------|--------|
| [Basic](basic.md) | Basic Dark, Basic Light |
| [GitHub](github.md) | GitHub Dark, GitHub Light |
| [Gruvbox](gruvbox.md) | Gruvbox Dark, Gruvbox Light |
| [High Contrast](high-contrast.md) | High Contrast Dark, High Contrast Light |
| [Material](material.md) | Material Dark, Material Light |
| [Solarized](solarized.md) | Solarized Dark, Solarized Light |
| [Tokyo Night](tokyo-night.md) | Tokyo Night Day, Tokyo Night Storm |
| [VS Code](vscode.md) | VS Code Dark, VS Code Light |
| [Standalone Dark Themes](standalone.md) | Abcdef, Abyss, Android Studio, Andromeda, Catppuccin Mocha, Cobalt2, Forest, Monokai, Nord, Palenight, Synthwave '84, Volcano |

## Preview

Try every theme on Markdown, a side-by-side merge view and a unified diff in the
[live playground](https://fsegurai.github.io/codemirror-themes/playground.html). The playground always shows the latest release, which can
include themes added after this one.
