---
label: Vanilla JavaScript
description: Use a theme from plain JavaScript modules with a bundler or with an import map and a CDN, without a build step.
order: 6
tags: [ "integration", "vanilla", "javascript" ]
keywords: [ "import map", "cdn", "esm", "vite" ]
---

# Vanilla JavaScript

## With a bundler

```bash
npm install codemirror @codemirror/lang-javascript @fsegurai/codemirror-theme-dracula
```

```html
<div id="editor"></div>
<script type="module" src="./main.js"></script>
```

```js
// main.js
import { javascript } from '@codemirror/lang-javascript';
import { basicSetup, EditorView } from 'codemirror';
import { dracula } from '@fsegurai/codemirror-theme-dracula';

new EditorView({
  doc: 'const greeting = "Hello";',
  extensions: [basicSetup, javascript(), dracula],
  parent: document.querySelector('#editor'),
});
```

## Without a build step

Browsers resolve bare module names through an import map. Every CodeMirror package and every dependency it imports
must be mapped, and each must appear only once so the editor uses a single copy of `@codemirror/state` and
`@codemirror/view`. The playground samples use this setup; their `playground.json` lists a complete import map you can
copy.

```html
<script type="importmap">
  {
    "imports": {
      "@fsegurai/codemirror-theme-dracula": "https://cdn.jsdelivr.net/npm/@fsegurai/codemirror-theme-dracula/dist/index.js",
      "codemirror": "https://cdn.jsdelivr.net/npm/codemirror@6/dist/index.js",
      "@codemirror/view": "https://cdn.jsdelivr.net/npm/@codemirror/view@6/dist/index.js",
      "@codemirror/state": "https://cdn.jsdelivr.net/npm/@codemirror/state@6/dist/index.js",
      "@codemirror/language": "https://cdn.jsdelivr.net/npm/@codemirror/language@6/dist/index.js",
      "@lezer/highlight": "https://cdn.jsdelivr.net/npm/@lezer/highlight@1/dist/index.js"
    }
  }
</script>
```

The map above is shortened: `codemirror` (`basicSetup`) also imports `@codemirror/commands`, `@codemirror/search`,
`@codemirror/autocomplete`, `@codemirror/lint`, `@lezer/common`, `style-mod`, `w3c-keyname`, `crelt` and
`@marijn/find-cluster-break`. Pin exact versions in production.

## Switch the theme

```js
import { Compartment } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { catppuccinLatte, dracula } from '@fsegurai/codemirror-theme-bundle';

const themeConfig = new Compartment();
const view = new EditorView({
  extensions: [basicSetup, themeConfig.of(dracula)],
  parent: document.querySelector('#editor'),
});

document.querySelector('#light').addEventListener('click', () => {
  view.dispatch({ effects: themeConfig.reconfigure(catppuccinLatte) });
});
```

[Open in playground](../../playground/theme-switcher/) to see a complete theme switcher.
