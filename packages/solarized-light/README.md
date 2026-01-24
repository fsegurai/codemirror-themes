<p align="center">
  <img alt="CodeMirror 6 Themes Logo" src="https://raw.githubusercontent.com/fsegurai/codemirror-themes/main/demo/public/codemirror-themes.svg">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/codemirror-themes">
      <img src="https://img.shields.io/azure-devops/build/fsegurai/Libraries%2520NodeJs/16/main?label=Build%20Status&"
          alt="Test Status">
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
	- [@fsegurai/codemirror-theme-solarized-light](#@fsegurai/codemirror-theme-solarized-light)
	- [Using Theme](#using-theme)
- [More Resources](#more-resources)
	- [Available Themes](#available-themes)
	- [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/codemirror-theme-solarized-light

To add `@fsegurai/codemirror-theme-solarized-light` along with CodeMirror 6 to your `package.json` use the following commands.

```bash
bun install @fsegurai/codemirror-theme-solarized-light codemirror@^6.0.0 --save
```

## Using Theme

Import the respective theme from the package and apply it to your CodeMirror instance as shown below.

```javascript
import { EditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { solarizedLight } from '@fsegurai/codemirror-theme-solarized-light'

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

| Theme               | Package                                                                                                                        | Version                                                                             |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| All - Bundle        | [@fsegurai/codemirror-theme-bundle](https://www.npmjs.com/package/@fsegurai/codemirror-theme-bundle)                           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-bundle)              |
| Abcdef              | [@fsegurai/codemirror-theme-abcdef](https://www.npmjs.com/package/@fsegurai/codemirror-theme-abcdef)                           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-abcdef)              |
| Abyss               | [@fsegurai/codemirror-theme-abyss](https://www.npmjs.com/package/@fsegurai/codemirror-theme-abyss)                             | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-abyss)               |
| Android Studio      | [@fsegurai/codemirror-theme-android-studio](https://www.npmjs.com/package/@fsegurai/codemirror-theme-android-studio)           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-android-studio)      |
| Andromeda           | [@fsegurai/codemirror-theme-andromeda](https://www.npmjs.com/package/@fsegurai/codemirror-theme-andromeda)                     | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-andromeda)           |
| Basic Dark          | [@fsegurai/codemirror-theme-basic-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-basic-dark)                   | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-basic-dark)          |
| Basic Light         | [@fsegurai/codemirror-theme-basic-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-basic-light)                 | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-basic-light)         |
| Catppuccin Mocha    | [@fsegurai/codemirror-theme-catppuccin-mocha](https://www.npmjs.com/package/@fsegurai/codemirror-theme-catppuccin-mocha)       | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-catppuccin-mocha)    |
| Cobalt2             | [@fsegurai/codemirror-theme-cobalt](https://www.npmjs.com/package/@fsegurai/codemirror-theme-cobalt2)                          | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-cobalt2)             |
| Forest              | [@fsegurai/codemirror-theme-forest](https://www.npmjs.com/package/@fsegurai/codemirror-theme-forest)                           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-forest)              |
| GitHub Dark         | [@fsegurai/codemirror-theme-github-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-github-dark)                 | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-github-dark)         |
| GitHub Light        | [@fsegurai/codemirror-theme-github-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-github-light)               | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-github-light)        |
| Gruvbox Dark        | [@fsegurai/codemirror-theme-gruvbox-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-gruvbox-dark)               | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-gruvbox-dark)        |
| Gruvbox Light       | [@fsegurai/codemirror-theme-gruvbox-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-gruvbox-light)             | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-gruvbox-light)       |
| High Contrast Dark  | [@fsegurai/codemirror-theme-high-contrast-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-high-contrast-dark)   | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-high-contrast-dark)  |
| High Contrast Light | [@fsegurai/codemirror-theme-high-contrast-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-high-contrast-light) | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-high-contrast-light) |
| Material Dark       | [@fsegurai/codemirror-theme-material-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-material-dark)             | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-material-dark)       |
| Material Light      | [@fsegurai/codemirror-theme-material-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-material-light)           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-material-light)      |
| Monokai             | [@fsegurai/codemirror-theme-monokai](https://www.npmjs.com/package/@fsegurai/codemirror-theme-monokai)                         | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-monokai)             |
| Nord                | [@fsegurai/codemirror-theme-nord](https://www.npmjs.com/package/@fsegurai/codemirror-theme-nord)                               | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-nord)                |
| Palenight           | [@fsegurai/codemirror-theme-palenight](https://www.npmjs.com/package/@fsegurai/codemirror-theme-palenight)                     | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-palenight)           |
| Solarized Dark      | [@fsegurai/codemirror-theme-solarized-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-solarized-dark)           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-solarized-dark)      |
| Solarized Light     | [@fsegurai/codemirror-theme-solarized-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-solarized-light)         | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-solarized-light)     |
| Synthwave 84	       | [@fsegurai/codemirror-theme-synthwave-84](https://www.npmjs.com/package/@fsegurai/codemirror-theme-synthwave-84)               | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-synthwave-84)        |
| Tokyo Night Day     | [@fsegurai/codemirror-theme-tokyo-night-day](https://www.npmjs.com/package/@fsegurai/codemirror-theme-tokyo-night-day)         | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-tokyo-night-day)     |
| Tokyo Night Storm   | [@fsegurai/codemirror-theme-tokyo-night-storm](https://www.npmjs.com/package/@fsegurai/codemirror-theme-tokyo-night-storm)     | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-tokyo-night-storm)   |
| Volcano             | [@fsegurai/codemirror-theme-volcano](https://www.npmjs.com/package/@fsegurai/codemirror-theme-volcano)                         | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-volcano)             |
| VS Code Light       | [@fsegurai/codemirror-theme-vscode-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-vscode-light)               | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-vscode-light)        |
| VS Code Dark        | [@fsegurai/codemirror-theme-vscode-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-vscode-dark)                 | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-vscode-dark)         |

## Demo Application

To see all themes in action, check out the
demo: [https://fsegurai.github.io/codemirror-themes](https://fsegurai.github.io/codemirror-themes).

To set up the demo locally:

```bash
git clone https://github.com/fsegurai/codemirror-themes.git
bun install
bun start
```

This will serve the application locally at [http://[::1]:8000](http://[::1]:8000).

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
