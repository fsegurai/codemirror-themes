<p align="center">
  <img alt="CodeMirror 6 Themes Logo" src="https://raw.githubusercontent.com/fsegurai/codemirror-themes/main/demo/public/codemirror-themes.png">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/codemirror-themes/actions/workflows/release-library.yml">
      <img src="https://github.com/fsegurai/codemirror-themes/actions/workflows/release-library.yml/badge.svg"
          alt="Build Status">
  </a>
  <a href="https://www.npmjs.org/package/@fsegurai/codemirror-theme-solarized-light">
      <img src="https://img.shields.io/npm/v/@fsegurai/codemirror-theme-solarized-light.svg"
          alt="Latest Release">
  </a>
  <br>
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/fsegurai/codemirror-themes">
  <img alt="Dependency status for repo" src="https://img.shields.io/librariesio/github/fsegurai/codemirror-themes">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="GitHub License" src="https://img.shields.io/github/license/fsegurai/codemirror-themes">
  </a>
  <br>
  <img alt="Stars" src="https://img.shields.io/github/stars/fsegurai/codemirror-themes?style=square&labelColor=343b41"/> 
  <img alt="Forks" src="https://img.shields.io/github/forks/fsegurai/codemirror-themes?style=square&labelColor=343b41"/>
</p>

**A library of custom themes for CodeMirror 6.**

`@fsegurai/codemirror-theme-solarized-light` is a theme for CodeMirror 6 editor, making it visually engaging and adaptable to different coding styles and user preferences.

### Table of contents

- [Installation](#installation)
  - [@fsegurai/codemirror-theme-solarized-light](#fseguraicodemirror-theme-solarized-light)
  - [Using Theme](#using-theme)
  - [Available Themes](#available-themes)
  - [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/codemirror-theme-solarized-light

To add `@fsegurai/codemirror-theme-solarized-light` along with CodeMirror 6 to your `package.json` use the following commands.

```bash
npm install @fsegurai/codemirror-theme-solarized-light codemirror@^6.0.0 --save
```

### Using Theme

Import the respective theme from the package and apply it to your CodeMirror instance as shown below.

```javascript
import { EditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { solarizedLight } from '@fsegurai/codemirror-theme-basic-solarized-light'

let editor = new EditorView({
  doc: '# Hello World',
  extensions: [
    basicSetup,
    markdown(),
    solarizedLight
  ],
  parent: document.body
})
```

Read the [CodeMirror documentation](https://codemirror.net/6/examples/styling/) for more details about themes.

### Available Themes

- [All - Bundle](./packages/bundle)
- [Abcdef](./packages/abcdef)
- [Abyss](./packages/abyss)
- [Android Studio](./packages/android-studio)
- [Andromeda](./packages/andromeda)
- [Basic Dark](./packages/basic-dark)
- [Basic Light](./packages/basic-light)
- [Forest](./packages/forest)
- [GitHub Dark](./packages/github-dark)
- [GitHub Light](./packages/github-light)
- [Gruvbox Dark](./packages/gruvbox-dark)
- [Gruvbox Light](./packages/gruvbox-light)
- [Material Dark](./packages/material-dark)
- [Material Light](./packages/material-light)
- [Monokai](./packages/monokai)
- [Nord](./packages/nord)
- [Palenight](./packages/palenight)
- [Solarized Dark](./packages/solarized-dark)
- [Solarized Light](./packages/solarized-light)
- [Tokyo Night Day](./packages/tokyo-night-day)
- [Tokyo Night Storm](./packages/tokyo-night-storm)
- [Volcano](./packages/volcano)
- [VS Code Dark](./packages/vscode-dark)
- [VS Code Light](./packages/vscode-light)

For a full list, see the [<code>@fsegurai/codemirror-theme-bundle</code>](https://github.com/fsegurai/codemirror-themes/tree/main/packages/bundle) directory or the online demo.

### Demo Application

To see all themes in action, check out the demo: [https://fsegurai.github.io/codemirror-themes](https://fsegurai.github.io/codemirror-themes).

To set up the demo locally:

```bash
git clone https://github.com/fsegurai/codemirror-themes.git
npm install
npm start
```

This will serve the application locally at [http://[::1]:8000](http://[::1]:8000).

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).