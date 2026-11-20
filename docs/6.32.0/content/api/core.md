---
label: Core Package
description: The public theme builder @fsegurai/codemirror-theme-core - defineTheme, ThemeDefinition, UiPalette, the syntax role types and the shared helpers.
order: 10
tags: [ "api", "core", "define-theme" ]
keywords: [ "codemirror-theme-core", "ThemeDefinition", "UiPalette", "SyntaxRoles", "custom theme" ]
---

# Core Package

`@fsegurai/codemirror-theme-core` (new in 6.32.0, version `6.0.0`) turns a palette into a complete CodeMirror 6 theme.
Every theme package depends on it and is built with it, so a theme you define gets the same structure (every Lezer
tag, every CodeMirror UI part) as the published themes. Installing several themes now shares one copy of the builder.

```bash
npm install @fsegurai/codemirror-theme-core codemirror
```

Peer dependencies: `@codemirror/language ^6.0.0`, `@codemirror/state ^6.0.0`, `@codemirror/view ^6.0.0`,
`@lezer/highlight ^1.0.0`.

## Exports

| Export | Kind | Purpose |
|--------|------|---------|
| `defineTheme(definition)` | Function | Builds a `DefinedTheme` from a `ThemeDefinition`. |
| `cssVariableTheme(options?)` | Function | A theme whose colors are CSS custom properties. See [CSS Variable Theme](css-variable-theme.md). |
| `cssVariableNames(options?)` | Function | Every custom property `cssVariableTheme` reads with those options. |
| `applyMergeRevertStyles(styles)` | Function | Injects the merge-revert colors (same helper the theme packages export). |
| `ROLE_PARENTS` | Constant | The parent base role of every fine syntax role. |
| `SYNTAX_TAGS` | Constant | The Lezer tags each syntax role styles. |
| `ThemeDefinition` | Type | `{ name, dark, ui: UiPalette, syntax: SyntaxRoles }`. |
| `DefinedTheme` | Type | `{ extension, theme, highlightStyle, mergeStyles }`. |
| `UiPalette`, `UiDeclarations` | Types | Every UI token of a theme; all tokens are required. |
| `SyntaxRoles`, `BaseSyntaxRoles`, `FineSyntaxRoles`, `SyntaxRole`, `RoleStyle` | Types | Syntax colors by role. |
| `CssVariableThemeOptions` | Type | Options of `cssVariableTheme`. |
| `IMergeRevertStyles` | Type | The four merge-revert colors. |

The bundle re-exports `defineTheme`, `cssVariableTheme`, `cssVariableNames` and the types `ThemeDefinition`,
`DefinedTheme`, `UiPalette`, `RoleStyle`, `SyntaxRole`, `SyntaxRoles`, `BaseSyntaxRoles`, `FineSyntaxRoles` and
`CssVariableThemeOptions`.

## defineTheme

```ts
import { defineTheme, type ThemeDefinition } from '@fsegurai/codemirror-theme-core';

const definition: ThemeDefinition = {
  name: 'Brand',
  dark: false,
  ui: { /* every UiPalette token: background, foreground, gutter: { ... }, panel: { ... }, ... */ },
  syntax: { keyword: { color: '#cf222e' }, comment: { color: '#59636e', fontStyle: 'italic' } /* ... */ },
};

const brand = defineTheme(definition);

export const brandTheme = brand.extension; // add to the editor extensions
export const brandMergeStyles = brand.mergeStyles; // pass to applyMergeRevertStyles
```

| `DefinedTheme` field | Type | Contents |
|----------------------|------|----------|
| `extension` | `Extension` | Editor theme plus syntax highlighting; what the theme packages export as `<theme>`. |
| `theme` | `Extension` | The `EditorView.theme(...)` part only. |
| `highlightStyle` | `HighlightStyle` | The syntax part only, for `syntaxHighlighting(...)` or a second highlighter. |
| `mergeStyles` | `IMergeRevertStyles` | Merge-revert colors; what the theme packages export as `<theme>MergeStyles`. |

## ThemeDefinition rules

- **`ui: UiPalette`** - every token is required (background, cursor, selection, search and bracket matches, panels,
  gutters, fold placeholders, tooltips, diff, diagnostics, scrollbars, merge view). TypeScript rejects an incomplete
  palette, so no UI part is left unstyled.
- **`syntax: SyntaxRoles`** - 25 base roles are required (`keyword`, `operator`, `punctuation`, `name`, `property`,
  `function`, `type`, `string`, `number`, `constant`, `comment`, `meta`, `tag`, `attribute`, `content`, `heading`,
  `link`, `url`, `emphasis`, `strong`, `strikethrough`, `invalid`, `inserted`, `deleted`, `changed`). Fine roles such
  as `controlKeyword` or `functionDefinition` are optional and fall back to their parent (`ROLE_PARENTS`).
- **`RoleStyle`** - `color`, `backgroundColor`, `fontStyle`, `fontWeight`, `opacity`, `textDecoration`,
  `textUnderlineOffset`, `textUnderlinePosition`, `textShadow`, `borderBottom`.
- **`dark`** - sets the CodeMirror dark flag (`EditorView.darkTheme`).

The source of any theme package, for example
[`packages/github-light/src/index.ts`](https://github.com/fsegurai/codemirror-themes/blob/main/packages/github-light/src/index.ts),
is a complete `ThemeDefinition`. To keep the accessibility guarantees of the packaged themes, check your colors with
the rules in [Accessibility](../accessibility/README.md).

See [Creating a Custom Theme](../guides/custom-theme.md) for a walkthrough.
