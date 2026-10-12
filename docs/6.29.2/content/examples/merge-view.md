---
label: Merge View
description: A side-by-side MergeView whose editors and revert buttons follow the selected theme.
order: 3
tags: [ "examples", "merge", "diff" ]
---

# Merge View

```bash
npm install codemirror @codemirror/merge @fsegurai/codemirror-theme-bundle
```

```ts
import { MergeView } from '@codemirror/merge';
import { Compartment, type Extension } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import {
  applyMergeRevertStyles,
  githubDark,
  githubDarkMergeStyles,
  githubLight,
  githubLightMergeStyles,
} from '@fsegurai/codemirror-theme-bundle';

type Entry = { extension: Extension; mergeStyles: typeof githubDarkMergeStyles };

const themes: Record<'light' | 'dark', Entry> = {
  light: { extension: githubLight, mergeStyles: githubLightMergeStyles },
  dark: { extension: githubDark, mergeStyles: githubDarkMergeStyles },
};

const themeConfig = new Compartment();

const merge = new MergeView({
  a: { doc: 'one\ntwo\nthree', extensions: [basicSetup, themeConfig.of(themes.dark.extension)] },
  b: { doc: 'one\nTwo\nthree\nfour', extensions: [basicSetup, themeConfig.of(themes.dark.extension)] },
  orientation: 'b-a',
  revertControls: 'b-to-a',
  highlightChanges: true,
  gutter: true,
  parent: document.querySelector('#merge')!,
});

function useTheme(mode: 'light' | 'dark') {
  const { extension, mergeStyles } = themes[mode];
  merge.a.dispatch({ effects: themeConfig.reconfigure(extension) });
  merge.b.dispatch({ effects: themeConfig.reconfigure(extension) });
  applyMergeRevertStyles(mergeStyles);
}

useTheme('dark');
```

The `MergeView` options mirror the demo playground (`demo/scripts/playground.ts`).
