Themes for CodeMirror 6
===========================

[//]: # "[ [**DEMO**](https://fsegurai.github.io/@codemirror/theme) ]"


Themes for [CodeMirror 6](https://codemirror.net/).

## Available themes

- [Abcdef](./packages/abcdef)
- [Basic Light](./packages/basic-light)
- [Basic Dark](./packages/basic-dark)
- [Solarized Light](./packages/solarized-light)
- [Solarized Dark](./packages/solarized-dark)
- [Material Dark](./packages/material-dark)
- [Material Light](./packages/material-light)
- [Nord](./packages/nord)
- [Gruvbox Light](./packages/gruvbox-light)
- [Gruvbox Dark](./packages/gruvbox-dark)

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

