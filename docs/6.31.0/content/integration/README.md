---
label: Integration
description: Use the theme packages from plain JavaScript, Angular or React, with runtime switching and merge views.
order: 5
tags: [ "integration", "frameworks" ]
keywords: [ "vanilla javascript", "angular", "react", "ssr" ]
breadcrumbTitle: Integration
---

# Integration

The themes are plain CodeMirror `Extension` values. Any setup that creates an `EditorView` can use them; frameworks
only change where the editor is created and destroyed.

| Page | Covers |
|------|--------|
| [Vanilla JavaScript](vanilla.md) | Script modules, a bundler, or an import map without a build step. |
| [Angular](angular.md) | A standalone component with signals that creates, reconfigures and destroys the editor. |
| [React](react.md) | A component with `useRef` and `useEffect`, plus the `@uiw/react-codemirror` wrapper. |

## Rules that apply everywhere

1. Create the `EditorView` once, when its host element exists, and call `view.destroy()` when it goes away.
2. Keep the theme in a `Compartment` and dispatch `compartment.reconfigure(theme)` to change it. Do not recreate the
   editor to switch themes.
3. Use one copy of `@codemirror/state` and `@codemirror/view` in the whole app; duplicates cause
   `Unrecognized extension value` errors.
4. `applyMergeRevertStyles` writes a `<style>` element to `document.head`. Call it only in the browser.
5. Importing a theme is side-effect free, so it is safe during server-side rendering.

## Playground

The playground samples are plain browser modules and work as a reference for any framework:
[Open in playground](../../playground/theme-switcher/) (theme switcher) or
[Open in playground](../../playground/merge-view/) (merge view).
