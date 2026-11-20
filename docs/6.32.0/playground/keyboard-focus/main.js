import { indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { Compartment, Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import * as bundle from '@fsegurai/codemirror-theme-bundle';
import { basicSetup, EditorView } from 'codemirror';

// Every theme of this release, straight from the bundle (each `<name>` export next to its `<name>MergeStyles`).
const themes = Object.fromEntries(
  Object.entries(bundle).filter(([name]) => !name.endsWith('MergeStyles') && name !== 'applyMergeRevertStyles'),
);
const select = document.querySelector('#theme');
for (const name of Object.keys(themes)) select.add(new Option(name));
select.value = document.documentElement.dataset.theme === 'light' ? 'githubLight' : 'githubDark';

/**
 * An approximation of what forced-colors mode does to the focused editor: box-shadows are dropped and the
 * transparent outline of the theme is painted with a system color. Real forced colors also replace every other color.
 */
const forcedColorsPreview = Prec.highest(
  EditorView.theme({ '&.cm-focused': { boxShadow: 'none', outlineColor: 'CanvasText' } }),
);

const themeConfig = new Compartment();
const forcedConfig = new Compartment();
const view = new EditorView({
  doc: 'function focusRing() {\n\treturn "visible on every theme";\n}\n',
  extensions: [
    basicSetup,
    // Tab indents inside the editor. basicSetup's keymap keeps Esc-then-Tab and Ctrl-M (tab focus mode) to leave it.
    keymap.of([indentWithTab]),
    javascript(),
    themeConfig.of(themes[select.value]),
    forcedConfig.of([]),
    EditorView.updateListener.of((update) => update.focusChanged && report()),
  ],
  parent: document.querySelector('#editor'),
});

const forcedColors = matchMedia('(forced-colors: active)');
const moreContrast = matchMedia('(prefers-contrast: more)');

function describe(element) {
  if (!element || element === document.body) return 'nothing';
  if (view.contentDOM.contains(element)) return 'the editor';
  return element.textContent.trim() || element.id || element.tagName.toLowerCase();
}

// Shows what is focused and how the focused editor is painted, from its computed style.
function report() {
  const computed = getComputedStyle(view.dom);
  const entries = {
    'Focused element': describe(document.activeElement),
    'Forced colors active': forcedColors.matches ? 'yes' : 'no',
    'Prefers more contrast': moreContrast.matches ? 'yes' : 'no',
    'Editor outline': view.hasFocus
      ? `${computed.outlineStyle} ${computed.outlineWidth} ${computed.outlineColor}`
      : 'focus the editor',
    'Editor box-shadow (ring)': view.hasFocus ? computed.boxShadow : 'focus the editor',
  };
  const status = document.querySelector('#status');
  status.replaceChildren(
    ...Object.entries(entries).flatMap(([term, value]) => {
      const dt = document.createElement('dt');
      dt.textContent = term;
      const dd = document.createElement('dd');
      dd.textContent = value;
      return [dt, dd];
    }),
  );
}

select.addEventListener('change', () => {
  view.dispatch({ effects: themeConfig.reconfigure(themes[select.value]) });
  report();
});
document.querySelector('#forced').addEventListener('change', (event) => {
  view.dispatch({ effects: forcedConfig.reconfigure(event.target.checked ? forcedColorsPreview : []) });
  view.focus();
});
for (const id of ['#before', '#after']) document.querySelector(id).addEventListener('focus', report);
forcedColors.addEventListener('change', report);
moreContrast.addEventListener('change', report);
report();
