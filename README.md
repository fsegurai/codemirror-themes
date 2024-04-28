Themes for CodeMirror 6
===========================

[//]: # "[ [**DEMO**](https://fsegurai.github.io/@codemirror/theme) ]"


Themes for [CodeMirror 6](https://codemirror.net/).

## Available themes

- [Basic Light]()
- [Basic Dark]()
- [Solarized Light]()
- [Solarized Dark](./packages/solarized-dark)
- [Material Dark]()
- [Nord]()
- [Gruvbox Light]()
- [Gruvbox Dark]()

## How to use

```js
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from "@codemirror/lang-javascript"
import { solarizedDark } from 'cm6-theme-solarized-dark'

let editor = new EditorView({
  doc: 'Hello',
  extensions: [
    basicSetup,
    javascript(),
    solarizedDark
  ],
  parent: document.body
})
```

Read [the CodeMirror documentation](https://codemirror.net/6/examples/styling/) for more detail about themes.

