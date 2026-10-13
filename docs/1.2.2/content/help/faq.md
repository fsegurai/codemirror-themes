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

The repository version (1.2.2 in this release) and the package versions are separate. The packages follow
CodeMirror 6 and are versioned one by one: theme packages range from 6.0.2 to 6.0.4, and the new bundle
is 6.0.0. The [catalog](../themes/README.md) lists every version.

## Which font do the themes use?

None of them sets a font, so CodeMirror's default monospace font applies. Override it as shown in
[Overriding Theme Styles](../guides/overriding-styles.md).

## Can I use the themes with React, Angular or Vue?

Yes. The exports are plain CodeMirror values, so any wrapper that accepts CodeMirror extensions can use them.

## Do the themes work with server-side rendering?

Yes. Importing a theme does not touch the DOM; CodeMirror itself still needs a browser to render the editor.

## Can I style `@codemirror/merge` views?

Not specifically in this release. Diff decorations and the revert buttons are not themed; merge-view support arrived in
6.24.0.

## Is there a light version of Nord or Monokai?

Not in this release. Eight themes ship only as a dark variant; see [Standalone Dark Themes](../themes/standalone.md).
The light themes are listed in [Following the System Color Scheme](../guides/light-dark-mode.md).
