import { javascript } from '@codemirror/lang-javascript';
import { Compartment } from '@codemirror/state';
import { cssVariableNames, cssVariableTheme } from '@fsegurai/codemirror-theme-core';
import { basicSetup, EditorView } from 'codemirror';

const doc = [
  '// One extension, colors from CSS custom properties',
  'export function greet(name = "world") {',
  '  const count = 42; // edit the tokens above',
  // biome-ignore lint/suspicious/noTemplateCurlyInString: editor content, shown as code
  '  return `Hello, ${name}! (${count})`;',
  '}',
].join('\n');

// The base tokens most pages set; every other --cm-* variable falls back to one of them.
const tokens = {
  light: { background: '#ffffff', foreground: '#1f2328', accent: '#0969da', 'syntax-keyword': '#cf222e' },
  dark: { background: '#0d1117', foreground: '#e6edf3', accent: '#4493f8', 'syntax-keyword': '#ff7b72' },
};

const host = document.querySelector('#editor');
const darkInput = document.querySelector('#dark');
const fieldset = document.querySelector('#colors');
const themeConfig = new Compartment();

// Start from the preview's theme (<html data-theme>), falling back to the system setting.
const pageTheme = document.documentElement.dataset.theme;
darkInput.checked = pageTheme ? pageTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

const view = new EditorView({
  doc,
  extensions: [basicSetup, javascript(), themeConfig.of(cssVariableTheme({ dark: darkInput.checked }).extension)],
  parent: host,
});

// Setting a variable on any ancestor of the editor recolors it: no reconfiguration needed.
function setToken(key, value) {
  host.style.setProperty(`--cm-${key}`, value);
}

function renderInputs() {
  const mode = darkInput.checked ? 'dark' : 'light';
  fieldset.querySelectorAll('label').forEach((label) => {
    label.remove();
  });
  for (const [key, value] of Object.entries(tokens[mode])) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'color';
    input.value = value;
    input.addEventListener('input', () => setToken(key, input.value));
    label.append(input, ` --cm-${key}`);
    fieldset.append(label);
    setToken(key, value);
  }
}

// The dark flag cannot come from CSS: reconfigure it when the page mode changes.
function applyMode() {
  view.dispatch({ effects: themeConfig.reconfigure(cssVariableTheme({ dark: darkInput.checked }).extension) });
  renderInputs();
}

darkInput.addEventListener('change', applyMode);
document.querySelector('#reset').addEventListener('click', renderInputs);
renderInputs();

const names = cssVariableNames();
document.querySelector('#count').textContent = String(names.length);
document.querySelector('#names').textContent = names.join('\n');
console.log(`cssVariableTheme reads ${names.length} custom properties`);
