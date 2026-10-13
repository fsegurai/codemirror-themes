---
label: FAQ
description: Frequently asked questions about theme packages, the bundle, versions, fonts and framework use.
order: 2
tags: [ "help", "faq", "questions" ]
---

# FAQ

## Should I install the bundle or a single theme?

Install single packages when you use a fixed set of themes. Install the bundle when you offer a picker. Both expose
the same extension names. See [Bundle](../api/bundle.md).

## Is there a `bundle` export that applies every theme?

No. The bundle only re-exports named themes such as `nord` or `githubDark`. Add one theme extension at a time.

## Why do package versions differ from the repository version?

The repository (6.29.2 in this release) and each package are versioned separately. Most themes are at 6.2.3;
VS Code Dark and Light are at 6.2.4; Cobalt2 is at 6.0.3; Catppuccin Mocha, High Contrast and Synthwave '84
started at 6.0.0; the bundle is 6.3.1. The [catalog](../themes/README.md) lists every version.

## Which font do the themes use?

`JetBrains Mono, Consolas, monospace` at `14px`. The font file is not bundled. Override it as shown in
[Overriding Theme Styles](../guides/overriding-styles.md).

## Can I use the themes with React, Angular or Vue?

Yes. The exports are plain CodeMirror values, so any wrapper that accepts CodeMirror extensions can use them.
Only `applyMergeRevertStyles` touches the DOM directly.

## Do the themes work with server-side rendering?

Importing a theme is safe. Call `applyMergeRevertStyles` only in the browser, because it uses `document`.

## Is there a light version of Nord or Monokai?

Not in this release. Twelve themes ship only as a dark variant; see [Standalone Dark Themes](../themes/standalone.md).
The light themes are listed in [Following the System Color Scheme](../guides/light-dark-mode.md).
