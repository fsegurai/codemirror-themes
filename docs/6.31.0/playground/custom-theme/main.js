import { javascript } from '@codemirror/lang-javascript';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Compartment, Prec } from '@codemirror/state';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
import { githubLight } from '@fsegurai/codemirror-theme-github-light';
import { tags as t } from '@lezer/highlight';
import { basicSetup, EditorView } from 'codemirror';

const doc = [
  '// Edit the palette above: the theme is rebuilt on every change',
  'export function total(items, tax = 0.13) {',
  '  const sum = items.reduce((acc, item) => acc + item.price, 0);',
  // biome-ignore lint/suspicious/noTemplateCurlyInString: editor content, shown as code
  '  return `Total: ${(sum * (1 + tax)).toFixed(2)}`;',
  '}',
].join('\n');

// ---- 1. A theme from a palette ------------------------------------------------------------------------------------

// Two starting palettes; every value can be edited live. All text colors reach 4.5:1 on their background.
const presets = {
  dark: {
    background: '#1e1f29',
    foreground: '#e6e6f0',
    comment: '#a0a3c0',
    keyword: '#ff8fb1',
    string: '#a5e8a0',
    number: '#ffcc80',
    function: '#82cfff',
    gutter: '#a0a3c0',
    cursor: '#ffcc80',
    selection: '#3d4166',
    activeLine: '#262836',
  },
  light: {
    background: '#ffffff',
    foreground: '#1f2328',
    comment: '#59636e',
    keyword: '#cf222e',
    string: '#0a3069',
    number: '#953800',
    function: '#8250df',
    gutter: '#59636e',
    cursor: '#0969da',
    selection: '#c8e1ff',
    activeLine: '#f3f6fa',
  },
};

/** Builds a complete theme (editor UI + syntax colors) from a palette object. */
function buildTheme(palette, dark) {
  const ui = EditorView.theme(
    {
      '&': { color: palette.foreground, backgroundColor: palette.background },
      '.cm-content': { caretColor: palette.cursor },
      '.cm-cursor, .cm-dropCursor': { borderLeftColor: palette.cursor },
      '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
        { backgroundColor: palette.selection },
      '.cm-activeLine': { backgroundColor: palette.activeLine },
      '.cm-gutters': { backgroundColor: palette.background, color: palette.gutter, border: 'none' },
      '.cm-activeLineGutter': { backgroundColor: palette.activeLine, color: palette.foreground },
      // Like the packaged themes: a visible ring, plus a transparent outline that forced-colors mode repaints.
      '&.cm-focused': {
        outline: '2px solid transparent',
        boxShadow: `0 0 0 2px ${palette.background}, 0 0 0 4px ${palette.cursor}`,
      },
    },
    // `dark` tells CodeMirror which defaults (tooltips, panels) to use and sets the EditorView.darkTheme facet.
    { dark },
  );
  const syntax = HighlightStyle.define([
    { tag: t.comment, color: palette.comment, fontStyle: 'italic' },
    { tag: [t.keyword, t.operatorKeyword, t.modifier, t.definitionKeyword], color: palette.keyword },
    { tag: [t.string, t.special(t.string), t.regexp], color: palette.string },
    { tag: [t.number, t.bool, t.null, t.atom], color: palette.number },
    { tag: [t.function(t.variableName), t.function(t.propertyName)], color: palette.function },
  ]);
  return [ui, syntaxHighlighting(syntax)];
}

// WCAG contrast of a #rrggbb color against the background, shown next to each text color.
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
};
const contrast = (a, b) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};
// Text needs 4.5:1; the cursor is a non-text indicator and needs 3:1.
const minimums = {
  foreground: 4.5,
  comment: 4.5,
  keyword: 4.5,
  string: 4.5,
  number: 4.5,
  function: 4.5,
  gutter: 4.5,
  cursor: 3,
};

const darkToggle = document.querySelector('#dark');
let palette = { ...presets[darkToggle.checked ? 'dark' : 'light'] };
const themeConfig = new Compartment();
const custom = new EditorView({
  doc,
  extensions: [basicSetup, javascript(), themeConfig.of(buildTheme(palette, darkToggle.checked))],
  parent: document.querySelector('#custom'),
});

// One labelled color input per palette entry.
const fieldset = document.querySelector('#colors');
function renderInputs() {
  fieldset.querySelectorAll('.entry').forEach((entry) => {
    entry.remove();
  });
  for (const [key, value] of Object.entries(palette)) {
    const label = document.createElement('label');
    label.className = 'entry';
    label.innerHTML = `<input type="color" name="${key}" value="${value}" /><span>${key}</span><span class="ratio" data-for="${key}"></span>`;
    fieldset.append(label);
  }
}

function update() {
  custom.dispatch({ effects: themeConfig.reconfigure(buildTheme(palette, darkToggle.checked)) });
  for (const ratio of fieldset.querySelectorAll('.ratio')) {
    const key = ratio.dataset.for;
    if (!minimums[key]) continue;
    const value = contrast(palette[key], palette.background);
    const pass = value >= minimums[key];
    ratio.textContent = `${value.toFixed(2)}:1${pass ? '' : ` < ${minimums[key]}`}`;
    ratio.classList.toggle('fail', !pass);
  }
  document.querySelector('#palette-code').textContent = `const palette = ${JSON.stringify(palette, null, 2)};`;
}

fieldset.addEventListener('input', (event) => {
  palette = { ...palette, [event.target.name]: event.target.value };
  update();
});
darkToggle.addEventListener('change', () => {
  palette = { ...presets[darkToggle.checked ? 'dark' : 'light'] };
  renderInputs();
  update();
});
renderInputs();
update();

// ---- 2. Recolor one token of a packaged theme ---------------------------------------------------------------------

// A second HighlightStyle for just one tag. Prec.highest mounts its CSS after the theme's, so it wins the cascade;
// every other token keeps the packaged theme's color.
const commentOverride = (color) => Prec.highest(syntaxHighlighting(HighlightStyle.define([{ tag: t.comment, color }])));

const overrideToggle = document.querySelector('#override');
const commentColor = document.querySelector('#comment-color');
const pageIsLight = document.documentElement.dataset.theme === 'light';
// A green that keeps 4.5:1 on the packaged theme's background.
commentColor.value = pageIsLight ? '#1a7f37' : '#3fb950';
const overrideConfig = new Compartment();
const packaged = new EditorView({
  doc: doc.replace('Edit the palette above', 'This comment uses the override color'),
  extensions: [
    basicSetup,
    javascript(),
    pageIsLight ? githubLight : githubDark,
    overrideConfig.of(commentOverride(commentColor.value)),
  ],
  parent: document.querySelector('#packaged'),
});

function updateOverride() {
  const extension = overrideToggle.checked ? commentOverride(commentColor.value) : [];
  packaged.dispatch({ effects: overrideConfig.reconfigure(extension) });
}
overrideToggle.addEventListener('change', updateOverride);
commentColor.addEventListener('input', updateOverride);
