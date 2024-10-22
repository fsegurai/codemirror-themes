Themes for CodeMirror 6
===========================

[ [**DEMO**](https://fsegurai.github.io/codemirror-themes/) ]


Themes for [CodeMirror 6](https://codemirror.net/).

## Available themes

- [All - Bundle](./packages/bundle)
- [Abcdef](./packages/abcdef)
- [Abyss](./packages/abyss)
- [Android Studio](./packages/android-studio)
- [Andromeda](./packages/andromeda)
- [Basic Light](./packages/basic-light)
- [Basic Dark](./packages/basic-dark)
- [Forest](./packages/forest)
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
- [Tokyo Night Storm](./packages/tokyo-night-storm)
- [Tokyo Night Day](./packages/tokyo-night-day)
- [Volcano](./packages/volcano)

## How to use

```js
import { EditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { basicLight } from '@fsegurai/codemirror-theme-basic-light'

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

