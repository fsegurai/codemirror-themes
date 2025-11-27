<p align="center">
  <img alt="CodeMirror 6 Themes Logo" src="https://raw.githubusercontent.com/fsegurai/codemirror-themes/main/demo/public/codemirror-themes.png">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/codemirror-themes">
      <img src="https://img.shields.io/azure-devops/build/fsegurai/Libraries%2520NodeJs/16/main?label=Build%20Status&"
          alt="Test Status">
  </a>
  <a href="https://www.npmjs.org/package/@fsegurai/codemirror-theme-synthwave-84">
      <img src="https://img.shields.io/npm/v/@fsegurai/codemirror-theme-synthwave-84.svg"
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

`@fsegurai/codemirror-theme-synthwave-84` is a theme for CodeMirror 6 editor, making it visually engaging and adaptable to different coding styles and user preferences.

### Table of contents

- [Installation](#installation)
  - [@fsegurai/codemirror-theme-synthwave-84](#fseguraicodemirror-theme-synthwave-84)
  - [Using Theme](#using-theme)
  - [Available Themes](#available-themes)
  - [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/codemirror-theme-synthwave-84

To add `@fsegurai/codemirror-theme-synthwave-84` along with CodeMirror 6 to your `package.json` use the following commands.

```bash
npm install @fsegurai/codemirror-theme-synthwave-84 codemirror@^6.0.0 --save
```

### Using Theme

Import the respective theme from the package and apply it to your CodeMirror instance as shown below.

```typescript
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { synthwave84 } from '@fsegurai/codemirror-theme-synthwave-84';

const state = EditorState.create({
  doc: 'console.log("Hello, Synthwave!");',
  extensions: [synthwave84],
});

const view = new EditorView({
  state,
  parent: document.querySelector('#editor'),
});
```

### Available Themes

Explore the full range of themes available in the `@fsegurai/codemirror-themes` collection by visiting
the [demo application](https://fsegurai.github.io/codemirror-themes/).

### Demo Application

Experience the themes in action by visiting the [demo application](https://fsegurai.github.io/codemirror-themes/).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/fsegurai/codemirror-themes/blob/main/LICENSE) file for details.

