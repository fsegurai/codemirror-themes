import { javascript } from '@codemirror/lang-javascript';
import { Compartment, Prec } from '@codemirror/state';
import { catppuccinLatte } from '@fsegurai/codemirror-theme-catppuccin-latte';
import { catppuccinMocha } from '@fsegurai/codemirror-theme-catppuccin-mocha';
import { basicSetup, EditorView } from 'codemirror';

const pageIsLight = document.documentElement.dataset.theme === 'light';
const packaged = pageIsLight ? catppuccinLatte : catppuccinMocha;

/**
 * Your overrides, on top of the packaged theme. Prec.highest mounts this CSS after the theme's, so equal selectors
 * win regardless of the order of the extensions.
 */
function overrides({ fontSize, lineHeight, selection }) {
  return Prec.highest(
    EditorView.theme({
      '&': { fontSize: `${fontSize}px` },
      '.cm-content': { lineHeight },
      // Use the theme's own selection selector so the override matches it. The packaged themes draw the selection
      // layer above the text, so keep the color translucent (here 40% alpha) or it would hide the selected text.
      // An unfocused editor keeps the theme's inactive selection (`&:not(.cm-focused) .cm-selectionBackground`).
      '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground': {
        backgroundColor: `${selection}66`,
      },
    }),
  );
}

const form = document.querySelector('#controls');
const enabled = document.querySelector('#enabled');
const fontSize = document.querySelector('#font-size');
const lineHeight = document.querySelector('#line-height');
const selection = document.querySelector('#selection');
// A selection hue that suits the packaged theme (Catppuccin Blue).
selection.value = pageIsLight ? '#1e66f5' : '#89b4fa';

const readValues = () => ({
  fontSize: Number(fontSize.value),
  lineHeight: lineHeight.value,
  selection: selection.value,
});

const overrideConfig = new Compartment();
const view = new EditorView({
  doc: [
    '// Select some text to see the selection color.',
    'const settings = { fontSize: 16, lineHeight: 1.8 };',
    'for (const [key, value] of Object.entries(settings)) {',
    // biome-ignore lint/suspicious/noTemplateCurlyInString: editor content, shown as code
    '  console.log(`${key} = ${value}`);',
    '}',
  ].join('\n'),
  selection: { anchor: 52, head: 100 },
  extensions: [basicSetup, javascript(), packaged, overrideConfig.of(overrides(readValues()))],
  parent: document.querySelector('#editor'),
});

function update() {
  const values = readValues();
  document.querySelector('#font-size-value').textContent = `${values.fontSize}px`;
  document.querySelector('#line-height-value').textContent = values.lineHeight;
  view.dispatch({ effects: overrideConfig.reconfigure(enabled.checked ? overrides(values) : []) });
  // Line height and font size change the layout; let CodeMirror measure it again.
  view.requestMeasure();
  document.querySelector('#code').textContent = enabled.checked
    ? `Prec.highest(
  EditorView.theme({
    '&': { fontSize: '${values.fontSize}px' },
    '.cm-content': { lineHeight: '${values.lineHeight}' },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground': {
      backgroundColor: '${values.selection}66',
    },
  }),
)`
    : '// Overrides disabled: only the packaged theme applies.';
}

form.addEventListener('input', update);
update();
