import { javascript } from '@codemirror/lang-javascript';
import { Compartment, EditorState } from '@codemirror/state';
import * as bundle from '@fsegurai/codemirror-theme-bundle';
import { basicSetup, EditorView } from 'codemirror';

// The bundle re-exports every theme package, so the list below always matches the packages of this release:
// each theme is exported as `<name>` next to `<name>MergeStyles` and the shared `applyMergeRevertStyles` helper.
const themes = Object.entries(bundle)
  .filter(([name]) => !name.endsWith('MergeStyles') && name !== 'applyMergeRevertStyles')
  .map(([name, extension]) => ({
    name,
    extension,
    // Each theme declares whether it is dark through the EditorView.darkTheme facet.
    dark: EditorState.create({ extensions: extension }).facet(EditorView.darkTheme),
  }));

const select = document.querySelector('#theme');
for (const group of ['Dark', 'Light']) {
  const optgroup = document.createElement('optgroup');
  optgroup.label = group;
  for (const theme of themes.filter((t) => t.dark === (group === 'Dark'))) optgroup.append(new Option(theme.name));
  select.append(optgroup);
}
// Start with a theme that matches the preview (<html data-theme>).
select.value = document.documentElement.dataset.theme === 'light' ? 'githubLight' : 'tokyoNightStorm';

const byName = (name) => themes.find((theme) => theme.name === name).extension;

// A Compartment holds the theme so it can be swapped without rebuilding the editor state.
const themeConfig = new Compartment();
const view = new EditorView({
  // biome-ignore lint/suspicious/noTemplateCurlyInString: editor content, shown as code
  doc: 'function greet(name) {\n  // Template literals, keywords and comments get theme colors\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("CodeMirror"));\n',
  extensions: [basicSetup, javascript(), themeConfig.of(byName(select.value))],
  parent: document.querySelector('#editor'),
});

select.addEventListener('change', () => {
  view.dispatch({ effects: themeConfig.reconfigure(byName(select.value)) });
  console.log(`Theme: ${select.value}`);
});

console.log(`${themes.length} themes available`);
