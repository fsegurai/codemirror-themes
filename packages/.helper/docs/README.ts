const readmeTemplate = `<p align="center">
  <img alt="CodeMirror 6 Themes Logo" src="https://raw.githubusercontent.com/fsegurai/codemirror-themes/main/demo/public/codemirror-themes.svg">
</p>

<p align="center">
  <a href="https://github.com/fsegurai/codemirror-themes">
      <img src="https://img.shields.io/azure-devops/build/fsegurai/Libraries%2520NodeJs/16/main?label=Build%20Status&"
          alt="Test Status">
  </a>
  <a href="https://www.npmjs.org/package/{{NPM_PACKAGE}}">
      <img src="https://img.shields.io/npm/v/{{NPM_PACKAGE}}.svg"
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

\`{{NPM_PACKAGE}}\` is a theme for CodeMirror 6 editor, making it visually engaging and adaptable to different coding styles and user preferences.

### Table of contents

- [Installation](#installation)
\t- [{{NPM_PACKAGE}}](#{{NPM_PACKAGE}})
\t- [Using Theme](#using-theme)
- [More Resources](#more-resources)
\t- [Available Themes](#available-themes)
\t- [Demo Application](#demo-application)
- [License](#license)

## Installation

### {{NPM_PACKAGE}}

To add \`{{NPM_PACKAGE}}\` along with CodeMirror 6 to your \`package.json\` use the following commands.

\`\`\`bash
bun install {{NPM_PACKAGE}} codemirror@^6.0.0 --save
\`\`\`

## Using Theme

Import the respective theme from the package and apply it to your CodeMirror instance as shown below.

\`\`\`javascript
import { EditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { {{IMPORT_NAME}} } from '{{IMPORT_PATH}}'

let editor = new EditorView({
  doc: '# Hello World',
  extensions: [
    basicSetup,
    markdown(),
    {{IMPORT_NAME}}
  ],
  parent: document.body
})
\`\`\`

Read the [CodeMirror documentation](https://codemirror.net/6/examples/styling/) for more details about themes.

### Available Themes

{{THEMES_TABLE}}

## Demo Application

To see all themes in action, check out the
demo: [https://fsegurai.github.io/codemirror-themes](https://fsegurai.github.io/codemirror-themes).

To set up the demo locally:

\`\`\`bash
git clone https://github.com/fsegurai/codemirror-themes.git
bun install
bun start
\`\`\`

This will serve the application locally at [http://[::1]:8000](http://[::1]:8000).

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
`;

export { readmeTemplate };
