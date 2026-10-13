---
label: Following the System Color Scheme
description: Choose a light or a dark theme from prefers-color-scheme and update it when the system setting changes.
order: 2
tags: [ "guides", "dark-mode", "light-mode" ]
keywords: [ "prefers-color-scheme", "matchMedia", "compartment" ]
---

# Following the System Color Scheme

Pair a light theme with a dark theme and switch between them with `matchMedia`.

## Pick a pair

These families ship both modes:

| Family | Light export | Dark export |
|--------|--------------|-------------|
| Basic | `basicLight` | `basicDark` |
| GitHub | `githubLight` | `githubDark` |
| Gruvbox | `gruvboxLight` | `gruvboxDark` |
| Material | `materialLight` | `materialDark` |
| Solarized | `solarizedLight` | `solarizedDark` |
| Tokyo Night | `tokyoNightDay` | `tokyoNightStorm` |

## Wire it up

```ts
import { Compartment } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
import { githubLight } from '@fsegurai/codemirror-theme-github-light';

const query = window.matchMedia('(prefers-color-scheme: dark)');
const themeConfig = new Compartment();
const themeFor = (dark: boolean) => (dark ? githubDark : githubLight);

const view = new EditorView({
  extensions: [basicSetup, themeConfig.of(themeFor(query.matches))],
  parent: document.body,
});

query.addEventListener('change', (event) => {
  view.dispatch({ effects: themeConfig.reconfigure(themeFor(event.matches)) });
});
```

## How the mode flag works

Each theme calls `EditorView.theme(spec, { dark })`. Dark themes pass `dark: true`, light themes pass `dark: false`.
CodeMirror uses that flag to pick matching base styles, so you do not need to set anything else.
