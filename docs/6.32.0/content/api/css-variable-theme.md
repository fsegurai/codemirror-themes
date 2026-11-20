---
label: CSS Variable Theme
description: cssVariableTheme - one CodeMirror theme whose UI and syntax colors are CSS custom properties with fallbacks, its options and every variable it reads.
order: 11
tags: [ "api", "core", "css-variables" ]
keywords: [ "cssVariableTheme", "cssVariableNames", "custom properties", "design tokens", "dark mode" ]
---

# CSS Variable Theme

`cssVariableTheme(options?)` from `@fsegurai/codemirror-theme-core` (also re-exported by the bundle) returns the same
`DefinedTheme` as `defineTheme`, but every UI and syntax color is a `var(--cm-…, <fallback>)` reference. Set the
variables from your own design tokens and one editor extension follows light, dark and high-contrast modes without
swapping CodeMirror extensions.

```ts
import { basicSetup, EditorView } from 'codemirror';
import { cssVariableTheme } from '@fsegurai/codemirror-theme-core';

new EditorView({
  doc: '# Hello World',
  extensions: [basicSetup, cssVariableTheme().extension],
  parent: document.body,
});
```

```css
:root {
  --cm-background: var(--app-surface);
  --cm-foreground: var(--app-text);
  --cm-accent: var(--app-primary);
  --cm-syntax-keyword: var(--app-code-keyword);
}
```

[Open in playground](../../playground/css-variables/) to recolor the editor from CSS variables live.

Unset variables use the fallbacks, so the theme works with no CSS at all. Most pages only set the 14 base variables;
every other variable falls back to one of them and can be set to fine-tune a single part.

## Dark mode

CSS variables cannot tell CodeMirror whether the editor is dark (CodeMirror uses that for its own defaults and for
`EditorView.darkTheme`). Pass `{ dark: true }` on dark pages: it marks the theme dark and switches to the dark
fallbacks. When the page switches mode at runtime, reconfigure a `Compartment` with
`cssVariableTheme({ dark }).extension`; the colors themselves update from CSS without reconfiguring.

```ts
import { Compartment } from '@codemirror/state';

const themeConfig = new Compartment();
// extensions: [basicSetup, themeConfig.of(cssVariableTheme({ dark }).extension)]
view.dispatch({ effects: themeConfig.reconfigure(cssVariableTheme({ dark: true }).extension) });
```

## Limitation

Lint marker icons and the wavy lint underlines are SVG data URLs, which cannot read CSS variables: they use the
fallback colors of `--cm-diagnostic-error`, `--cm-diagnostic-warning`, `--cm-diagnostic-info`, `--cm-diagnostic-hint`
and `--cm-background` (set them through the `fallbacks` option to match your palette).

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `prefix` | `'--cm'` | Custom property prefix: `{ prefix: '--ark-cm' }` reads `--ark-cm-background`, … |
| `dark` | `false` | Marks the theme dark and selects the dark fallbacks. |
| `variables` | `{}` | Explicit mapping by key (variable name without the prefix). A value starting with `--` reads that custom property, e.g. `{ background: '--ark-surface' }`; any other value is used as a literal CSS value. |
| `fallbacks` | `{}` | Fallback value by key, e.g. `{ background: '#fafafa' }`. |
| `name` | `'CSS Variables'` | Theme name. |

`cssVariableNames(options?)` returns the exact list of custom properties the theme reads with those options.

## Variables

Base variables (default prefix):

| Variable | Light fallback | Dark fallback | Used for |
|----------|----------------|---------------|----------|
| `--cm-background` | `#ffffff` | `#0d1117` | editor, gutter, buttons and inputs background |
| `--cm-foreground` | `#1f2328` | `#e6edf3` | text, active line number, operators, punctuation |
| `--cm-muted` | `#59636e` | `#9198a1` | line numbers, comments, placeholders, hints |
| `--cm-surface` | `#f6f8fa` | `#151b23` | panels, tooltips, fold placeholders |
| `--cm-border-color` | `#d1d9e0` | `#3d444d` | panel, tooltip and input borders, scrollbar thumb |
| `--cm-accent` | `#0969da` | `#4493f8` | cursor, focus ring, links, search and bracket outlines |
| `--cm-selection` | `#b6e3ff` | `#264f78` | selection, selected completion |
| `--cm-active-line` | `#eaeef280` | `#6e76811a` | active line and active gutter background |
| `--cm-match` | `#fff8c5` | `#bb800966` | search match background |
| `--cm-error` | `#cf222e` | `#ff7b72` | errors, invalid code, special characters |
| `--cm-warning` | `#9a6700` | `#d29922` | warnings, changed text |
| `--cm-info` | `#0969da` | `#58a6ff` | info diagnostics |
| `--cm-inserted` | `#116329` | `#3fb950` | inserted text (diff) |
| `--cm-deleted` | `#82071e` | `#ff7b72` | deleted text (diff) |

UI variables. Each one falls back to a base variable or to a fixed value (`none`, `1px`, …); colors derived from a base
color use `color-mix()`:

- **editor**: `--cm-border`, `--cm-cursor`, `--cm-cursor-width`, `--cm-cursor-shadow`, `--cm-fat-cursor-background`, `--cm-fat-cursor-border`, `--cm-selection-inactive`, `--cm-selection-foreground`, `--cm-selection-outline`, `--cm-active-line-border-left`, `--cm-active-line-border-right`, `--cm-ghost-text`, `--cm-ghost-text-opacity`, `--cm-special-char`, `--cm-focus-ring`, `--cm-outline-width`
- **search-match**: `--cm-search-match-background`, `--cm-search-match-outline`, `--cm-search-match-foreground`, `--cm-search-match-shadow`, `--cm-search-match-selected-background`, `--cm-search-match-selected-foreground`, `--cm-search-match-selected-outline`, `--cm-search-match-selected-shadow`
- **selection-match**: `--cm-selection-match-background`, `--cm-selection-match-outline`
- **matching-bracket**: `--cm-matching-bracket-background`, `--cm-matching-bracket-outline`, `--cm-matching-bracket-shadow`
- **non-matching-bracket**: `--cm-non-matching-bracket-background`, `--cm-non-matching-bracket-outline`
- **panel**: `--cm-panel-background`, `--cm-panel-foreground`, `--cm-panel-border`, `--cm-panel-border-width`, `--cm-panel-outline`, `--cm-panel-shadow`, `--cm-panel-button-background`, `--cm-panel-button-foreground`, `--cm-panel-button-border`, `--cm-panel-button-hover-background`, `--cm-panel-button-hover-foreground`, `--cm-panel-button-hover-border`, `--cm-panel-button-hover-shadow`, `--cm-panel-input-background`, `--cm-panel-input-border`
- **gutter**: `--cm-gutter-background`, `--cm-gutter-foreground`, `--cm-gutter-border`, `--cm-gutter-active-background`, `--cm-gutter-active-foreground`, `--cm-gutter-active-font-weight`, `--cm-gutter-active-border`, `--cm-gutter-fold-hover`
- **fold-placeholder**: `--cm-fold-placeholder-background`, `--cm-fold-placeholder-foreground`, `--cm-fold-placeholder-border`, `--cm-fold-placeholder-border-style`
- **tooltip**: `--cm-tooltip-background`, `--cm-tooltip-foreground`, `--cm-tooltip-border`, `--cm-tooltip-shadow`, `--cm-tooltip-list-background`, `--cm-tooltip-list-border`, `--cm-tooltip-hover-background`, `--cm-tooltip-selected-background`, `--cm-tooltip-selected-foreground`, `--cm-tooltip-selected-border`, `--cm-tooltip-icon`, `--cm-tooltip-detail`
- **diff**: `--cm-diff-inserted-background`, `--cm-diff-inserted-foreground`, `--cm-diff-inserted-border`, `--cm-diff-deleted-background`, `--cm-diff-deleted-foreground`, `--cm-diff-deleted-border`
- **diagnostic**: `--cm-diagnostic-error`, `--cm-diagnostic-warning`, `--cm-diagnostic-info`, `--cm-diagnostic-hint`, `--cm-diagnostic-error-background`, `--cm-diagnostic-warning-background`, `--cm-diagnostic-info-background`, `--cm-diagnostic-border-width`, `--cm-diagnostic-underline-width`
- **scrollbar**: `--cm-scrollbar-track`, `--cm-scrollbar-track-border`, `--cm-scrollbar-thumb`, `--cm-scrollbar-thumb-border`, `--cm-scrollbar-thumb-hover`, `--cm-scrollbar-thumb-hover-shadow`
- **merge**: `--cm-merge-background-color`, `--cm-merge-border-color`, `--cm-merge-button-color`, `--cm-merge-button-hover-color`

Syntax variables. Base roles fall back to a literal color or to a base variable (`--cm-syntax-comment` →
`--cm-muted`); fine roles fall back to their parent role (`--cm-syntax-control-keyword` → `--cm-syntax-keyword`):

- **base roles**: `--cm-syntax-keyword`, `--cm-syntax-operator`, `--cm-syntax-punctuation`, `--cm-syntax-name`, `--cm-syntax-property`, `--cm-syntax-function`, `--cm-syntax-type`, `--cm-syntax-string`, `--cm-syntax-number`, `--cm-syntax-constant`, `--cm-syntax-comment`, `--cm-syntax-meta`, `--cm-syntax-tag`, `--cm-syntax-attribute`, `--cm-syntax-content`, `--cm-syntax-heading`, `--cm-syntax-link`, `--cm-syntax-url`, `--cm-syntax-emphasis`, `--cm-syntax-strong`, `--cm-syntax-strikethrough`, `--cm-syntax-invalid`, `--cm-syntax-inserted`, `--cm-syntax-deleted`, `--cm-syntax-changed`
- **fine roles**: `--cm-syntax-control-keyword`, `--cm-syntax-module-keyword`, `--cm-syntax-definition-keyword`, `--cm-syntax-operator-keyword`, `--cm-syntax-modifier`, `--cm-syntax-arithmetic-operator`, `--cm-syntax-logic-operator`, `--cm-syntax-compare-operator`, `--cm-syntax-bitwise-operator`, `--cm-syntax-update-operator`, `--cm-syntax-deref-operator`, `--cm-syntax-definition-operator`, `--cm-syntax-type-operator`, `--cm-syntax-control-operator`, `--cm-syntax-separator`, `--cm-syntax-bracket`, `--cm-syntax-paren`, `--cm-syntax-brace`, `--cm-syntax-square-bracket`, `--cm-syntax-angle-bracket`, `--cm-syntax-character`, `--cm-syntax-macro-name`, `--cm-syntax-variable`, `--cm-syntax-local-variable`, `--cm-syntax-variable-definition`, `--cm-syntax-name-definition`, `--cm-syntax-function-definition`, `--cm-syntax-self`, `--cm-syntax-label`, `--cm-syntax-property-definition`, `--cm-syntax-method`, `--cm-syntax-method-definition`, `--cm-syntax-special-property`, `--cm-syntax-type-definition`, `--cm-syntax-class-name`, `--cm-syntax-namespace`, `--cm-syntax-standard-tag`, `--cm-syntax-annotation`, `--cm-syntax-document-meta`, `--cm-syntax-processing-instruction`, `--cm-syntax-attribute-value`, `--cm-syntax-literal`, `--cm-syntax-doc-string`, `--cm-syntax-regexp`, `--cm-syntax-special-string`, `--cm-syntax-escape`, `--cm-syntax-unit`, `--cm-syntax-atom`, `--cm-syntax-bool`, `--cm-syntax-null`, `--cm-syntax-constant-name`, `--cm-syntax-standard-name`, `--cm-syntax-color`, `--cm-syntax-special-variable`, `--cm-syntax-doc-comment`, `--cm-syntax-heading-level`, `--cm-syntax-heading-1`, `--cm-syntax-heading-2`, `--cm-syntax-heading-3`, `--cm-syntax-heading-4`, `--cm-syntax-heading-5`, `--cm-syntax-heading-6`, `--cm-syntax-list`, `--cm-syntax-quote`, `--cm-syntax-monospace`, `--cm-syntax-content-separator`

## Related

- [Core Package](core.md) - `defineTheme` and the theme types.
- [Following the System Color Scheme](../guides/light-dark-mode.md) - switching the `dark` flag with a `Compartment`.
- [Angular integration](../integration/angular.md) - the core README also has an Angular example for this theme.
