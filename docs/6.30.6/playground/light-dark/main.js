import { javascript } from '@codemirror/lang-javascript';
import { Compartment } from '@codemirror/state';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
import { githubLight } from '@fsegurai/codemirror-theme-github-light';
import { basicSetup, EditorView } from 'codemirror';

const query = window.matchMedia('(prefers-color-scheme: dark)');
const themeConfig = new Compartment();
const themeFor = (dark) => (dark ? githubDark : githubLight);
const modeLabel = document.querySelector('#mode');
let dark = query.matches;

const view = new EditorView({
  doc: 'const query = matchMedia("(prefers-color-scheme: dark)");\nquery.addEventListener("change", update);\n',
  extensions: [basicSetup, javascript(), themeConfig.of(themeFor(dark))],
  parent: document.querySelector('#editor'),
});

function apply(nextDark) {
  dark = nextDark;
  // Each theme sets the EditorView "dark" flag itself, so swapping the extension is enough.
  view.dispatch({ effects: themeConfig.reconfigure(themeFor(dark)) });
  document.body.style.background = dark ? '#0d1117' : '#ffffff';
  document.body.style.color = dark ? '#e6edf3' : '#1f2328';
  modeLabel.textContent = dark ? 'GitHub Dark' : 'GitHub Light';
}

apply(dark);
// Follow the system setting when it changes...
query.addEventListener('change', (event) => apply(event.matches));
// ...and let the button override it to try both modes.
document.querySelector('#toggle').addEventListener('click', () => apply(!dark));

console.log(`System prefers ${query.matches ? 'dark' : 'light'}`);
