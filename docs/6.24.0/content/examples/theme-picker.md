---
label: Theme Picker
description: A select element that switches an editor between bundle themes with a Compartment.
order: 2
tags: [ "examples", "picker", "compartment" ]
---

# Theme Picker

```bash
npm install codemirror @fsegurai/codemirror-theme-bundle
```

```html
<select id="theme"></select>
<div id="editor"></div>
```

```ts
import { Compartment, type Extension } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import {
  basicLight,
  githubDark,
  gruvboxLight,
  materialDark,
  nord,
  vsCodeDark,
} from '@fsegurai/codemirror-theme-bundle';

const themes: Record<string, Extension> = {
  'Basic Light': basicLight,
  'Material Dark': materialDark,
  'GitHub Dark': githubDark,
  'Gruvbox Light': gruvboxLight,
  Nord: nord,
  'VS Code Dark': vsCodeDark,
};

const select = document.querySelector<HTMLSelectElement>('#theme')!;
for (const name of Object.keys(themes)) select.add(new Option(name, name));

const themeConfig = new Compartment();
const view = new EditorView({
  doc: 'function greet(name) {\n  return `Hello, ${name}`;\n}',
  extensions: [basicSetup, themeConfig.of(themes[select.value])],
  parent: document.querySelector('#editor')!,
});

select.addEventListener('change', () => {
  view.dispatch({ effects: themeConfig.reconfigure(themes[select.value]) });
});
```

Add more entries from the [theme catalog](../themes/README.md) as needed.
