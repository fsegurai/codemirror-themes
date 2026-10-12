---
label: Troubleshooting
description: Symptoms, causes and fixes for missing token colors, wrong fonts, merge buttons and theme switching.
order: 2
tags: [ "help", "troubleshooting", "debugging" ]
---

# Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Background is themed but code has no colors | No language extension is active. | Add a language, for example `markdown()` or `javascript()`. |
| Theme colors are ignored or mixed with another theme | Two themes are active, or another theme has higher precedence. | Keep one theme per editor; use a `Compartment` to swap it. Remove `oneDark` or other themes from your setup. |
| Font is not JetBrains Mono | The font is not installed or loaded. | Load it in your page, or override `fontFamily`. See [Overriding Theme Styles](../guides/overriding-styles.md). |
| Revert buttons in a `MergeView` keep the old colors | `applyMergeRevertStyles` was not called after switching. | Call `applyMergeRevertStyles(<theme>MergeStyles)` on every switch. |
| `document is not defined` during SSR | `applyMergeRevertStyles` ran on the server. | Call it inside a browser-only lifecycle hook. |
| Only one side of a `MergeView` changes theme | The reconfigure effect was dispatched to one editor. | Dispatch to both `mergeView.a` and `mergeView.b`. |
| `Unrecognized extension value` error | Duplicate copies of `@codemirror/state` or `@codemirror/view` are installed. | Deduplicate CodeMirror packages so the app and the themes share one copy. |
| TypeScript cannot import `IMergeRevertStyles` | The interface is not exported by name. | Use `Parameters<typeof applyMergeRevertStyles>[0]`. |

## Still stuck?

Open an issue on [GitHub](https://github.com/fsegurai/codemirror-themes/issues) with your CodeMirror versions, the
theme package and version, and a minimal reproduction.
