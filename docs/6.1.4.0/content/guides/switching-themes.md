---
label: Switching Themes at Runtime
description: Swap the theme of a running EditorView by wrapping the theme extension in a Compartment.
order: 1
tags: [ "guides", "compartment", "runtime" ]
keywords: [ "reconfigure", "dispatch", "theme picker" ]
---

# Switching Themes at Runtime

Wrap the theme in a `Compartment`, then dispatch `compartment.reconfigure(...)` to replace it. This is the approach the
demo playground uses (`demo/scripts/playground.ts`).

## Steps

1. Create one `Compartment` for the theme.
2. Add `compartment.of(initialTheme)` to the editor extensions.
3. Dispatch `compartment.reconfigure(newTheme)` when the user picks another theme.

```ts
import { Compartment, type Extension } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { githubDark, githubLight } from '@fsegurai/codemirror-theme-bundle';

const themeConfig = new Compartment();

const view = new EditorView({
  doc: 'const answer = 42;',
  extensions: [basicSetup, themeConfig.of(githubDark)],
  parent: document.body,
});

function setTheme(theme: Extension) {
  view.dispatch({ effects: themeConfig.reconfigure(theme) });
}

setTheme(githubLight);
```

## Several editors, one picker

A single `Compartment` instance can be used by several editors. Dispatch the effect to each view:

```ts
for (const v of [editorA, editorB]) {
  v.dispatch({ effects: themeConfig.reconfigure(theme) });
}
```

## Tips

- Build a lookup table of `{ name, extension }` once; the demo's `demo/scripts/themes.ts` does this for all 23
  themes.
- Importing from the bundle is convenient for pickers. Unused themes are still tree-shaken because every package
  declares `"sideEffects": false`, but a picker that references all themes includes all of them.
