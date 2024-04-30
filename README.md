Themes for CodeMirror 6
===========================

[//]: # "[ [**DEMO**](https://fsegurai.github.io/@codemirror/theme) ]"


Themes for [CodeMirror 6](https://codemirror.net/).

## Available themes

- [Abcdef](./packages/abcdef)
- [Abyss](./packages/abyss)
- [Android Studio](./packages/android-studio)
- [Andromeda](./packages/andromeda)
- [Basic Light](./packages/basic-light)
- [Basic Dark](./packages/basic-dark)
- [GitHub Light](./packages/github-light)
- [GitHub Dark](./packages/github-dark)
- [Gruvbox Light](./packages/gruvbox-light)
- [Gruvbox Dark](./packages/gruvbox-dark)
- [Material Light](./packages/material-light)
- [Material Dark](./packages/material-dark)
- [Monokai](./packages/monokai)
- [Nord](./packages/nord)
- [Solarized Light](./packages/solarized-light)
- [Solarized Dark](./packages/solarized-dark)
- [Volcano](./packages/volcano)

## How to use

```js
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { markdown } from '@codemirror/lang-markdown'
import { basicLight } from 'codemirror-theme-basic-light'

let editor = new EditorView({
  doc: '# Hello World',
  extensions: [
    basicSetup,
    markdown(),
    basicLight
  ],
  parent: document.body
})
```

Read [the CodeMirror documentation](https://codemirror.net/6/examples/styling/) for more detail about themes.

