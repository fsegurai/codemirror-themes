---
label: Focus, Selection and Forced Colors
description: How the themes show keyboard focus, keep the selection visible on the active line and behave in Windows High Contrast mode.
order: 5
tags: [ "accessibility", "focus", "forced-colors" ]
keywords: [ "keyboard navigation", "focus ring", "high contrast mode", "selection visibility" ]
---

# Focus, Selection and Forced Colors

## Focus ring

When the editor has keyboard focus (`.cm-focused`), every theme draws an opaque ring of at least 2px with
`box-shadow`, in an accent color that reaches 3:1 against the editor background. Most themes use two layers: a thin
inner ring in the background color and the accent ring outside it, so the ring is visible on any page background.

```css
/* Shape of the rule every theme emits (colors differ per theme) */
.cm-editor.cm-focused {
  box-shadow: 0 0 0 2px <background>, 0 0 0 4px <accent>;
  outline: 2px solid transparent;
}
```

[Open in playground](../../playground/keyboard-focus/) and press `Tab` to move focus into the editor.

## Forced colors (Windows High Contrast)

In forced-colors mode the browser removes `box-shadow` and replaces author colors with system colors. A ring drawn
only with `box-shadow` would disappear. Each theme therefore also sets `outline: 2px solid transparent` on the focused
editor: the outline is invisible normally, and the browser repaints it with the system highlight color when forced
colors are active, so focus stays visible.

The rule is emitted without a `@media (forced-colors: active)` block on purpose: CodeMirror's style modules rewrite `&`
inside at-rules, so a plain transparent outline is the reliable form.

## Selection visibility

A selection must be visible wherever it appears, including on the active line (the line with the cursor):

| Check | Minimum |
|-------|---------|
| Selection against the background | 1.2:1 |
| Selection against the active line | 1.15:1 |
| Every text color on the selection | 4.5:1 |

Several themes had a selection that almost matched their active line; 6.31.0 adjusted the active-line or the
selection color of those themes. The ratio of every theme is listed in the [Contrast Summary](contrast-summary.md).

## Cursor and match indicators

| Indicator | Selector | Minimum |
|-----------|----------|---------|
| Cursor | `.cm-cursor` | 3:1 on the background and the active line |
| Matching bracket | `.cm-matchingBracket` outline | 3:1 on the background and the active line |
| Current search match | `.cm-searchMatch-selected` fill or outline | 3:1 on the background |
| Selection match (when it has no fill) | `.cm-selectionMatch` outline | 3:1 on the background |

## Motion

The themes add no transitions or animations. The cursor blink comes from CodeMirror itself and can be configured with
`drawSelection({ cursorBlinkRate })`.
