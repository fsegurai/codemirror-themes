<p align="center">
  <img alt="CodeMirror 6 Themes Logo" src="https://raw.githubusercontent.com/fsegurai/codemirror-themes/main/demo/public/codemirror-themes.png">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/codemirror-themes/actions/workflows/release-library.yml">
      <img src="https://github.com/fsegurai/codemirror-themes/actions/workflows/release-library.yml/badge.svg"
          alt="Build Status">
  </a>
  <a href="https://github.com/fsegurai/codemirror-themes/releases/latest">
      <img src="https://img.shields.io/github/v/release/fsegurai/codemirror-themes"
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

`@fsegurai/codemirror-theme-bundle` is a collection of themes to enhance CodeMirror 6 editor, making it visually engaging and adaptable to different coding styles and user preferences. 

### Table of contents

- [Installation](#installation)
  - [@fsegurai/codemirror-theme-bundle](#fseguraicodemirror-theme-bundle)
  - [Using a Specific Theme](#using-a-specific-theme)
  - [Available Themes](#available-themes)
  - [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/codemirror-theme-bundle

To add `@fsegurai/codemirror-theme-bundle` along with CodeMirror 6 to your `package.json` use the following commands.

```bash
npm install @fsegurai/codemirror-theme-bundle codemirror@^6.0.0 --save
```

### Using a Specific Theme

Import the desired theme from the package and apply it to your CodeMirror instance as shown below.

```javascript
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

Read the [CodeMirror documentation](https://codemirror.net/6/examples/styling/) for more details about themes.

### Available Themes

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

For a full list, see the [`@fsegurai/codemirror-theme-bundle`](./packages/bundle) directory or the online [DEMO](https://fsegurai.github.io/codemirror-themes/).

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