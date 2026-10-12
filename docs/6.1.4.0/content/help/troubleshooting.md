---
label: Troubleshooting
description: Symptoms, causes and fixes for missing token colors, fonts, theme switching and mixed theme parts.
order: 3
tags: [ "help", "troubleshooting", "debugging" ]
---

# Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Background is themed but code has no colors | No language extension is active. | Add a language, for example `markdown()` or `javascript()`. |
| Theme colors are ignored or mixed with another theme | Two themes are active, or another theme has higher precedence. | Keep one theme per editor; use a `Compartment` to swap it. Remove `oneDark` or other themes from your setup. |
| Font changes when switching to or from a VS Code theme | Only VS Code Dark and Light set a `fontFamily`. | Set one font for all themes with `Prec.highest`. See [Overriding Theme Styles](../guides/overriding-styles.md). |
| `nordTheme` is not exported by the bundle | The bundle re-exports only combined extensions. | Import `<theme>Theme` and `<theme>HighlightStyle` from the individual package. |
| Token colors look wrong after mixing parts | A combined `<theme>` extension is also active. | Use either `<theme>` or its parts, not both. |
| `Unrecognized extension value` error | Duplicate copies of `@codemirror/state` or `@codemirror/view` are installed. | Deduplicate CodeMirror packages so the app and the themes share one copy. |

## Still stuck?

Open an issue on [GitHub](https://github.com/fsegurai/codemirror-themes/issues) with your CodeMirror versions, the
theme package and version, and a minimal reproduction.
