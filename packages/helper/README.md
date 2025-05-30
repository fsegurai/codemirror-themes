<p align="center">
  <img alt="CodeMirror 6 Themes Logo" src="https://raw.githubusercontent.com/fsegurai/codemirror-themes/main/public/codemirror-themes.png">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/codemirror-themes">
      <img src="https://img.shields.io/azure-devops/build/fsegurai/Libraries%2520NodeJs/16/main?label=Build%20Status&"
          alt="Test Status">
  </a>
  <a href="https://www.npmjs.org/package/@fsegurai/codemirror-theme-utils">
      <img src="https://img.shields.io/npm/v/@fsegurai/codemirror-theme-utils.svg"
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

**Utility constants for CodeMirror 6 themes.**

`@fsegurai/codemirror-theme-utils` provides consistent styling constants and utilities for creating CodeMirror 6 themes. This package is primarily used internally by the theme packages in this monorepo to ensure consistent styling across all themes.

### Table of contents

- [Installation](#installation)
  - [@fsegurai/codemirror-theme-utils](#fseguraicodemirror-theme-utils)
  - [Usage](#usage)
  - [Available Constants](#available-constants)
  - [Available Themes](#available-themes)
  - [Demo Application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/codemirror-theme-utils

To add `@fsegurai/codemirror-theme-utils` along with CodeMirror 6 to your `package.json` use the following commands.

```bash
npm install @fsegurai/codemirror-theme-utils codemirror@^6.0.0 --save
```

### Usage

Import the utility constants from the package and use them in your custom themes:

```javascript
import { EditorView } from '@codemirror/view'
import { 
  generalContent,
  generalCursor,
  generalGutter,
  generalPanel,
  generalLine,
  generalMatching,
  generalPlaceholder,
  generalScroller,
  generalSearchField,
  generalTooltip
} from '@fsegurai/codemirror-theme-utils'

// Example usage of utility constants in a theme
const myCustomTheme = EditorView.theme({
  // Use consistent content styling
  '.cm-content': {
    ...generalContent,
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4'
  },
  
  // Use consistent cursor styling
  '.cm-cursor': {
    ...generalCursor,
    borderLeftColor: '#aeafad'
  },
  
  // Use consistent gutter styling
  '.cm-gutter': {
    ...generalGutter,
    backgroundColor: '#2d2d30',
    color: '#858585'
  },
  
  // Use consistent panel styling
  '.cm-panels': {
    ...generalPanel,
    backgroundColor: '#2d2d30'
  },
  
  // Use consistent line styling
  '.cm-activeLine': {
    ...generalLine,
    backgroundColor: '#2a2d2e'
  },
  
  // Use consistent matching bracket styling
  '.cm-matchingBracket': {
    ...generalMatching,
    backgroundColor: '#3a3a3a'
  },
  
  // Use consistent placeholder styling
  '.cm-placeholder': {
    ...generalPlaceholder,
    color: '#6a6a6a'
  },
  
  // Use consistent scroller styling
  '.cm-scroller::-webkit-scrollbar': {
    ...generalScroller
  },
  
  // Use consistent search field styling
  '.cm-search input': {
    ...generalSearchField,
    backgroundColor: '#3c3c3c'
  },
  
  // Use consistent tooltip styling
  '.cm-tooltip': {
    ...generalTooltip,
    backgroundColor: '#1e1e1e'
  }
})

let editor = new EditorView({
  doc: '# Hello World',
  extensions: [
    myCustomTheme,
    // ... other extensions
  ],
  parent: document.body
})
```

### Available Constants

This package exports the following utility constants:

| Constant | Description | Properties |
|----------|-------------|------------|
| `generalContent` | Base content styling | `fontSize`, `fontFamily`, `lineHeight` |
| `generalCursor` | Cursor styling | `borderLeftWidth` |
| `generalGutter` | Gutter styling | `border`, `paddingRight`, `fontSize`, `fontWeight` |
| `generalPanel` | Panel styling | `border`, `borderRadius`, `padding` |
| `generalLine` | Line styling | `borderRadius` |
| `generalMatching` | Matching bracket styling | `borderRadius` |
| `generalPlaceholder` | Placeholder styling | `borderRadius`, `padding`, `margin` |
| `generalScroller` | Scrollbar styling | `width`, `height`, `borderRadius` |
| `generalSearchField` | Search field styling | `borderRadius`, `padding` |
| `generalTooltip` | Tooltip styling | `borderRadius`, `borderRadiusSelected`, `lineHeight`, `padding`, `paddingRight` |

Read the [CodeMirror documentation](https://codemirror.net/6/examples/styling/) for more details about themes.

### Available Themes

This package provides utilities for the following theme packages:

| Theme             | Package                                                                                                                    | Version                                                                           |
|-------------------|----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| All - Bundle      | [@fsegurai/codemirror-theme-bundle](https://www.npmjs.com/package/@fsegurai/codemirror-theme-bundle)                       | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-bundle)            |
| Abcdef            | [@fsegurai/codemirror-theme-abcdef](https://www.npmjs.com/package/@fsegurai/codemirror-theme-abcdef)                       | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-abcdef)            |
| Abyss             | [@fsegurai/codemirror-theme-abyss](https://www.npmjs.com/package/@fsegurai/codemirror-theme-abyss)                         | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-abyss)             |
| Android Studio    | [@fsegurai/codemirror-theme-android-studio](https://www.npmjs.com/package/@fsegurai/codemirror-theme-android-studio)       | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-android-studio)    |
| Andromeda         | [@fsegurai/codemirror-theme-andromeda](https://www.npmjs.com/package/@fsegurai/codemirror-theme-andromeda)                 | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-andromeda)         |
| Basic Light       | [@fsegurai/codemirror-theme-basic-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-basic-light)             | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-basic-light)       |
| Basic Dark        | [@fsegurai/codemirror-theme-basic-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-basic-dark)               | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-basic-dark)        |
| Forest            | [@fsegurai/codemirror-theme-forest](https://www.npmjs.com/package/@fsegurai/codemirror-theme-forest)                       | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-forest)            |
| GitHub Light      | [@fsegurai/codemirror-theme-github-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-github-light)           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-github-light)      |
| GitHub Dark       | [@fsegurai/codemirror-theme-github-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-github-dark)             | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-github-dark)       |
| Gruvbox Light     | [@fsegurai/codemirror-theme-gruvbox-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-gruvbox-light)         | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-gruvbox-light)     |
| Gruvbox Dark      | [@fsegurai/codemirror-theme-gruvbox-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-gruvbox-dark)           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-gruvbox-dark)      |
| Material Light    | [@fsegurai/codemirror-theme-material-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-material-light)       | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-material-light)    |
| Material Dark     | [@fsegurai/codemirror-theme-material-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-material-dark)         | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-material-dark)     |
| Monokai           | [@fsegurai/codemirror-theme-monokai](https://www.npmjs.com/package/@fsegurai/codemirror-theme-monokai)                     | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-monokai)           |
| Nord              | [@fsegurai/codemirror-theme-nord](https://www.npmjs.com/package/@fsegurai/codemirror-theme-nord)                           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-nord)              |
| Palenight         | [@fsegurai/codemirror-theme-palenight](https://www.npmjs.com/package/@fsegurai/codemirror-theme-palenight)                 | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-palenight)         |
| Solarized Light   | [@fsegurai/codemirror-theme-solarized-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-solarized-light)     | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-solarized-light)   |
| Solarized Dark    | [@fsegurai/codemirror-theme-solarized-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-solarized-dark)       | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-solarized-dark)    |
| Tokyo Night Storm | [@fsegurai/codemirror-theme-tokyo-night-storm](https://www.npmjs.com/package/@fsegurai/codemirror-theme-tokyo-night-storm) | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-tokyo-night-storm) |
| Tokyo Night Day   | [@fsegurai/codemirror-theme-tokyo-night-day](https://www.npmjs.com/package/@fsegurai/codemirror-theme-tokyo-night-day)     | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-tokyo-night-day)   |
| Volcano           | [@fsegurai/codemirror-theme-volcano](https://www.npmjs.com/package/@fsegurai/codemirror-theme-volcano)                     | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-volcano)           |
| VS Code Dark      | [@fsegurai/codemirror-theme-vscode-dark](https://www.npmjs.com/package/@fsegurai/codemirror-theme-vscode-dark)             | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-vscode-dark)       |
| VS Code Light     | [@fsegurai/codemirror-theme-vscode-light](https://www.npmjs.com/package/@fsegurai/codemirror-theme-vscode-light)           | ![npm](https://img.shields.io/npm/v/@fsegurai/codemirror-theme-vscode-light)      |

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