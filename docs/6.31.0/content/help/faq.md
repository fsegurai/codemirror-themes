---
label: FAQ
description: Frequently asked questions about theme packages, the bundle, versions, fonts and framework use.
order: 10
tags: [ "help", "faq", "questions" ]
---

# FAQ

## Should I install the bundle or a single theme?

Install single packages when you use a fixed set of themes. Install the bundle when you offer a picker. Both expose
the same export names. See [Bundle](../api/bundle.md).

## Is there a `bundle` export that applies every theme?

No. The bundle only re-exports named themes such as `nord` or `githubDark`. Add one theme extension at a time.

## Why do package versions differ from the repository version?

The repository (6.31.0 in this release) and each package are versioned separately: a package version only changes
when that package changes, and newer themes started at a later version. Every [theme page](../themes/README.md) shows
the current npm version badge of its package.

## Which font do the themes use?

`JetBrains Mono, Consolas, monospace` at `14px`. The font file is not bundled. Override it as shown in
[Overriding Theme Styles](../guides/overriding-styles.md).

## Can I use the themes with React, Angular or Vue?

Yes. The exports are plain CodeMirror `Extension` values, so any wrapper that accepts CodeMirror extensions can use
them. Only `applyMergeRevertStyles` touches the DOM directly. See [Integration](../integration/README.md) for Angular
and React components.

## Do the themes work with server-side rendering?

Importing a theme is safe. Call `applyMergeRevertStyles` only in the browser, because it uses `document`.

## Is there a light version of Nord or Monokai?

Not in this release. Several themes ship in one mode only; the [catalog](../themes/README.md) groups them by family
and mode. Light and dark pairs are listed in [Following the System Color Scheme](../guides/light-dark-mode.md).

## Are the themes accessible?

Yes. Since 6.31.0 every theme meets WCAG 2.2 AA text contrast (4.5:1) on the background, the active line and the
selection, and its cursor, focus ring and match indicators reach 3:1. See [Accessibility](../accessibility/README.md).

## Why do the colors look different after upgrading to 6.31.0?

Colors that were below the WCAG minimums were made lighter or darker, keeping their hue. The changes per theme are
listed in [What is new in 6.31.0](../releases/6.31.0.md).

## Can I use `oneDark` from this project and from `@codemirror/theme-one-dark` together?

Both packages export `oneDark`. Alias one on import, for example
`import { oneDark as fsOneDark } from '@fsegurai/codemirror-theme-one-dark'`, and add only one of them to an editor.
