---
label: Tokyo Night
description: Tokyo Night Day and Tokyo Night Storm, themes based on the Tokyo Night palette.
order: 6
tags: [ "themes", "tokyo-night" ]
---

# Tokyo Night

Tokyo Night in a light (Day) and a dark (Storm) variant.

## Packages

| Theme | Install | Import | Mode |
|-------|---------|--------|------|
| Tokyo Night Day | `npm install @fsegurai/codemirror-theme-tokyo-night-day` | `import { tokyoNightDay } from '@fsegurai/codemirror-theme-tokyo-night-day'` | Light |
| Tokyo Night Storm | `npm install @fsegurai/codemirror-theme-tokyo-night-storm` | `import { tokyoNightStorm } from '@fsegurai/codemirror-theme-tokyo-night-storm'` | Dark |

## Colors

Editor background and default text color, read from `packages/<name>/src/index.ts` at this release.

| Theme | Background | Text |
|-------|------------|------|
| Tokyo Night Day | `#e1e2e7` | `#3760bf` |
| Tokyo Night Storm | `#24283b` | `#c0caf5` |

## Merge view colors

Values of the `<theme>MergeStyles` export, used with [`applyMergeRevertStyles`](../api/merge-styles.md).

| Export | `backgroundColor` | `borderColor` | `buttonColor` | `buttonHoverColor` |
|--------|---------------------|-----------------|-----------------|----------------------|
| `tokyoNightDayMergeStyles` | `#d5d6db` | `#848cb5` | `#3760bf` | `#99a7df60` |
| `tokyoNightStormMergeStyles` | `#282e44` | `#565f89` | `#c0caf5` | `#414868` |

## Usage

```ts
import { basicSetup, EditorView } from 'codemirror';
import { tokyoNightDay } from '@fsegurai/codemirror-theme-tokyo-night-day';

new EditorView({
  extensions: [basicSetup, tokyoNightDay],
  parent: document.body,
});
```
