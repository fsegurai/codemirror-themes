import { javascript } from '@codemirror/lang-javascript';
import { Compartment } from '@codemirror/state';
import { catppuccinMocha } from '@fsegurai/codemirror-theme-catppuccin-mocha';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
import { githubLight } from '@fsegurai/codemirror-theme-github-light';
import { gruvboxLight } from '@fsegurai/codemirror-theme-gruvbox-light';
import { nord } from '@fsegurai/codemirror-theme-nord';
import { solarizedLight } from '@fsegurai/codemirror-theme-solarized-light';
import { tokyoNightDay } from '@fsegurai/codemirror-theme-tokyo-night-day';
import { tokyoNightStorm } from '@fsegurai/codemirror-theme-tokyo-night-storm';
import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark';
import { basicSetup, EditorView } from 'codemirror';

const themes = {
  'Catppuccin Mocha': catppuccinMocha,
  'GitHub Dark': githubDark,
  'GitHub Light': githubLight,
  'Gruvbox Light': gruvboxLight,
  Nord: nord,
  'Solarized Light': solarizedLight,
  'Tokyo Night Day': tokyoNightDay,
  'Tokyo Night Storm': tokyoNightStorm,
  'VS Code Dark': vsCodeDark,
};

const select = document.querySelector('#theme');
for (const name of Object.keys(themes)) select.add(new Option(name, name));

// A Compartment holds the theme so it can be swapped without rebuilding the editor state.
const themeConfig = new Compartment();
const view = new EditorView({
  doc: 'function greet(name) {\n  // Template literals, keywords and comments get theme colors\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("CodeMirror"));\n',
  extensions: [basicSetup, javascript(), themeConfig.of(themes[select.value])],
  parent: document.querySelector('#editor'),
});

select.addEventListener('change', () => {
  view.dispatch({ effects: themeConfig.reconfigure(themes[select.value]) });
  console.log(`Theme: ${select.value}`);
});
