---
label: Merge Styles
description: The IMergeRevertStyles shape, the MergeStyles export of each theme and the applyMergeRevertStyles function.
order: 2
tags: [ "api", "merge", "styles" ]
keywords: [ "IMergeRevertStyles", "applyMergeRevertStyles", "revert buttons" ]
---

# Merge Styles

## `IMergeRevertStyles`

```ts
interface IMergeRevertStyles {
  backgroundColor: string; // background of the revert column
  borderColor: string;     // left and right border of the revert column
  buttonColor: string;     // revert button text color
  buttonHoverColor: string; // revert button background on hover
}
```

The interface appears in each package's type declarations but is not exported by name. Use a structural type:

```ts
import { applyMergeRevertStyles } from '@fsegurai/codemirror-theme-bundle';

type MergeStyles = Parameters<typeof applyMergeRevertStyles>[0];
```

## `applyMergeRevertStyles(styles)`

```ts
declare function applyMergeRevertStyles(styles: IMergeRevertStyles): void;
```

| Aspect | Behavior |
|--------|----------|
| Effect | Creates `<style id="cm-merge-revert-styles">` with rules for `.cm-merge-revert`, `.cm-merge-revert button` and its `:hover` state, and appends it to `document.head`. |
| Repeat calls | Removes any existing element with id `cm-merge-revert-styles` first. |
| Return value | `undefined`. |
| Requirements | A DOM (`document`). Do not call during server-side rendering. |

Every theme package exports an identical copy. The bundle re-exports the copy from `@fsegurai/codemirror-theme-abcdef`.

## `<theme>MergeStyles`

A plain `IMergeRevertStyles` object per theme. Color values are listed on the
[theme family pages](../themes/README.md).

| Export | Package |
|--------|---------|
| `abcdefMergeStyles` | `@fsegurai/codemirror-theme-abcdef` |
| `abyssMergeStyles` | `@fsegurai/codemirror-theme-abyss` |
| `androidStudioMergeStyles` | `@fsegurai/codemirror-theme-android-studio` |
| `andromedaMergeStyles` | `@fsegurai/codemirror-theme-andromeda` |
| `basicDarkMergeStyles` | `@fsegurai/codemirror-theme-basic-dark` |
| `basicLightMergeStyles` | `@fsegurai/codemirror-theme-basic-light` |
| `catppuccinMochaMergeStyles` | `@fsegurai/codemirror-theme-catppuccin-mocha` |
| `cobalt2MergeStyles` | `@fsegurai/codemirror-theme-cobalt2` |
| `forestMergeStyles` | `@fsegurai/codemirror-theme-forest` |
| `githubDarkMergeStyles` | `@fsegurai/codemirror-theme-github-dark` |
| `githubLightMergeStyles` | `@fsegurai/codemirror-theme-github-light` |
| `gruvboxDarkMergeStyles` | `@fsegurai/codemirror-theme-gruvbox-dark` |
| `gruvboxLightMergeStyles` | `@fsegurai/codemirror-theme-gruvbox-light` |
| `highContrastDarkMergeStyles` | `@fsegurai/codemirror-theme-high-contrast-dark` |
| `highContrastLightMergeStyles` | `@fsegurai/codemirror-theme-high-contrast-light` |
| `materialDarkMergeStyles` | `@fsegurai/codemirror-theme-material-dark` |
| `materialLightMergeStyles` | `@fsegurai/codemirror-theme-material-light` |
| `materialOceanMergeStyles` | `@fsegurai/codemirror-theme-material-ocean` |
| `monokaiMergeStyles` | `@fsegurai/codemirror-theme-monokai` |
| `nordMergeStyles` | `@fsegurai/codemirror-theme-nord` |
| `palenightMergeStyles` | `@fsegurai/codemirror-theme-palenight` |
| `solarizedDarkMergeStyles` | `@fsegurai/codemirror-theme-solarized-dark` |
| `solarizedLightMergeStyles` | `@fsegurai/codemirror-theme-solarized-light` |
| `synthwave84MergeStyles` | `@fsegurai/codemirror-theme-synthwave-84` |
| `tokyoNightDayMergeStyles` | `@fsegurai/codemirror-theme-tokyo-night-day` |
| `tokyoNightStormMergeStyles` | `@fsegurai/codemirror-theme-tokyo-night-storm` |
| `volcanoMergeStyles` | `@fsegurai/codemirror-theme-volcano` |
| `vsCodeDarkMergeStyles` | `@fsegurai/codemirror-theme-vscode-dark` |
| `vsCodeLightMergeStyles` | `@fsegurai/codemirror-theme-vscode-light` |

## Example

```ts
import { applyMergeRevertStyles, solarizedLightMergeStyles } from '@fsegurai/codemirror-theme-bundle';

applyMergeRevertStyles(solarizedLightMergeStyles);
```
