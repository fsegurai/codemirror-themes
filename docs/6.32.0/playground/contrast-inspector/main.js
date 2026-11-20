import { javascript } from '@codemirror/lang-javascript';
import { syntaxTree } from '@codemirror/language';
import { Compartment, EditorSelection } from '@codemirror/state';
import * as bundle from '@fsegurai/codemirror-theme-bundle';
import { basicSetup, EditorView } from 'codemirror';

// WCAG 2.2 minimums: 4.5:1 for text (SC 1.4.3), 3:1 for non-text UI such as the cursor or the focus ring (SC 1.4.11).
const TEXT_MIN = 4.5;
const NON_TEXT_MIN = 3;

// ---- Color math (WCAG relative luminance) -------------------------------------------------------------------------

/** Parses a computed color (`rgb(...)` / `rgba(...)`) into [r, g, b, alpha]. */
function parseColor(value) {
  const match = value?.match(/rgba?\(([^)]+)\)/);
  if (!match) return undefined;
  const [r, g, b, a = 1] = match[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map(Number);
  // Computed styles round alpha to 3 decimals (#2c5a3a92 -> 0.573), but colors are stored with 8-bit alpha
  // (146 / 255 = 0.5725): snap back to n / 255 so the composited color matches what is painted.
  return [r, g, b, Math.round(a * 255) / 255];
}

/** Paints a translucent color over an opaque one. */
const composite = (top, bottom) =>
  [0, 1, 2].map((i) => Math.round(top[i] * top[3] + bottom[i] * (1 - top[3]))).concat(1);

function luminance([r, g, b]) {
  const linear = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrast(foreground, background) {
  const fg = foreground[3] < 1 ? composite(foreground, background) : foreground;
  const [high, low] = [luminance(fg), luminance(background)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

const toHex = (color) =>
  `#${color
    .slice(0, 3)
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;

// ---- Themes and editor --------------------------------------------------------------------------------------------

// Every theme of this release, straight from the bundle (each `<name>` export next to its `<name>MergeStyles`).
const themes = Object.fromEntries(
  Object.entries(bundle).filter(([name]) => !name.endsWith('MergeStyles') && name !== 'applyMergeRevertStyles'),
);

const select = document.querySelector('#theme');
for (const name of Object.keys(themes)) select.add(new Option(name));
select.value = document.documentElement.dataset.theme === 'light' ? 'githubLight' : 'githubDark';

const doc = [
  'function greet(name) {',
  '  // A comment explains the code',
  '  const count = 42, ok = true, nothing = null;',
  // biome-ignore lint/suspicious/noTemplateCurlyInString: editor content, shown as code
  '  return `Hello, ${name}!` + /re+/g.source + count;',
  '}',
  'class Greeter extends Base { #secret = "x"; static of() { return new Greeter(); } }',
].join('\n');

const themeConfig = new Compartment();
const view = new EditorView({
  doc,
  // Two ranges (basicSetup allows multiple selections): `function` is selected, so the selection is drawn, and the
  // main cursor sits after `greet(`, so the matching bracket is highlighted (only empty ranges match brackets).
  selection: EditorSelection.create([EditorSelection.range(0, 8), EditorSelection.cursor(15)], 1),
  extensions: [
    basicSetup,
    javascript(),
    themeConfig.of(themes[select.value]),
    // The focused and unfocused selection colors differ, so measure again when the focus changes.
    EditorView.updateListener.of((update) => update.focusChanged && measure()),
  ],
  parent: document.querySelector('#editor'),
});

// ---- Measuring ----------------------------------------------------------------------------------------------------

const style = (selector) => {
  const element = view.dom.querySelector(selector);
  return element ? getComputedStyle(element) : undefined;
};

/** A table cell with the ratio and a pass/fail word (not color alone). */
function ratioCell(ratio, minimum) {
  const cell = document.createElement('td');
  if (ratio === undefined) {
    cell.textContent = 'n/a';
    return cell;
  }
  const pass = ratio >= minimum;
  cell.textContent = `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1 ${pass ? 'pass' : `fail (< ${minimum})`}`;
  if (!pass) cell.className = 'fail';
  return cell;
}

function colorCell(color) {
  const cell = document.createElement('td');
  const swatch = document.createElement('span');
  swatch.className = 'swatch';
  swatch.style.background = toHex(color);
  const code = document.createElement('code');
  code.textContent = color[3] < 1 ? `${toHex(color)} @ ${color[3].toFixed(2)}` : toHex(color);
  cell.append(swatch, code);
  return cell;
}

function row(label, ...cells) {
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  th.scope = 'row';
  th.textContent = label;
  tr.append(th, ...cells);
  return tr;
}

let pending = false;
function measure() {
  if (pending) return;
  pending = true;
  // Selection and cursor layers are drawn in CodeMirror's measure cycle: wait two frames for them.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      pending = false;
      report();
    }),
  );
}

function report() {
  const page = parseColor(getComputedStyle(document.body).backgroundColor) ?? [255, 255, 255, 1];
  const background = composite(parseColor(getComputedStyle(view.dom).backgroundColor), page);
  const over = (selector) => {
    const color = parseColor(style(selector)?.backgroundColor);
    return color ? composite(color, background) : undefined;
  };
  const activeLine = over('.cm-activeLine');
  const selection = over('.cm-selectionBackground');
  let checks = 0;
  let failures = 0;
  const count = (ratio, minimum) => {
    if (ratio === undefined) return;
    checks += 1;
    if (ratio < minimum) failures += 1;
  };

  // Syntax tokens: group every highlighted span of the rendered document by its computed color.
  const groups = new Map();
  const add = (color, label) => {
    const key = color.join(',');
    if (!groups.has(key)) groups.set(key, { color, labels: new Set() });
    groups.get(key).labels.add(label);
  };
  add(parseColor(getComputedStyle(view.contentDOM).color), 'plain text');
  for (const span of view.contentDOM.querySelectorAll('.cm-line span')) {
    // Skip decorations such as .cm-matchingBracket; only theme highlight spans are measured.
    if (span.className.includes('cm-')) continue;
    const position = view.posAtDOM(span, 0);
    const node = syntaxTree(view.state).resolveInner(position, 1).name;
    add(parseColor(getComputedStyle(span).color), node);
  }

  const tokens = document.querySelector('#tokens');
  tokens.replaceChildren(
    ...[...groups.values()].map(({ color, labels }) => {
      const ratios = [background, activeLine, selection].map((surface) =>
        surface ? contrast(color, surface) : undefined,
      );
      for (const ratio of ratios) count(ratio, TEXT_MIN);
      return row([...labels].join(', '), colorCell(color), ...ratios.map((ratio) => ratioCell(ratio, TEXT_MIN)));
    }),
  );

  // Editor surfaces: gutter text is text (4.5:1); the cursor, bracket outline and focus ring are non-text (3:1).
  const gutter = over('.cm-gutters') ?? background;
  const activeGutter = parseColor(style('.cm-activeLineGutter')?.backgroundColor);
  const activeGutterBg = activeGutter ? composite(activeGutter, gutter) : gutter;
  const parts = [
    [
      'Line numbers',
      parseColor(style('.cm-lineNumbers .cm-gutterElement:not(.cm-activeLineGutter)')?.color),
      gutter,
      'gutter',
      TEXT_MIN,
    ],
    [
      'Active line number',
      parseColor(style('.cm-lineNumbers .cm-activeLineGutter')?.color),
      activeGutterBg,
      'active gutter',
      TEXT_MIN,
    ],
    ['Cursor', parseColor(style('.cm-cursor')?.borderLeftColor), background, 'background', NON_TEXT_MIN],
    ['Matching bracket outline', bracketOutline(), activeLine ?? background, 'active line', NON_TEXT_MIN],
    // Informational (no minimum): how visible a selection is depends on the text it covers.
    [`Selection (${view.hasFocus ? 'focused' : 'unfocused'})`, selection, background, 'background', undefined],
  ];
  if (view.hasFocus) {
    // The ring is a stack of box-shadows such as `0 0 0 2px <gap>, 0 0 0 4px <ring>`; one layer usually repeats the
    // background as a gap. The indicator is the layer that stands out most from the background.
    const layers = (getComputedStyle(view.dom).boxShadow.match(/rgba?\([^)]+\)/g) ?? []).map(parseColor);
    const ring = layers.sort((a, b) => contrast(b, background) - contrast(a, background))[0];
    parts.push(['Focus ring', ring, background, 'background', NON_TEXT_MIN]);
  }

  const surfaces = document.querySelector('#surfaces');
  surfaces.replaceChildren(
    ...parts.map(([label, color, against, againstLabel, minimum]) => {
      if (!color) return row(label, cellText('not drawn'), cellText(againstLabel), cellText('n/a'));
      const ratio = contrast(color, against);
      if (minimum === undefined)
        return row(label, colorCell(color), cellText(againstLabel), cellText(`${ratio.toFixed(2)}:1`));
      count(ratio, minimum);
      return row(label, colorCell(color), cellText(againstLabel), ratioCell(ratio, minimum));
    }),
  );
  if (!view.hasFocus)
    surfaces.append(
      row('Focus ring', cellText('focus the editor to measure it'), cellText('background'), cellText('n/a')),
    );

  const summary = failures ? `${failures} of ${checks} checks below the minimum` : `All ${checks} checks pass`;
  document.querySelector('#summary').textContent = summary;
  console.log(`${select.value}: ${summary}`);
}

function bracketOutline() {
  const bracket = style('.cm-matchingBracket');
  if (!bracket || bracket.outlineStyle === 'none') return undefined;
  return parseColor(bracket.outlineColor);
}

function cellText(text) {
  const cell = document.createElement('td');
  cell.textContent = text;
  return cell;
}

select.addEventListener('change', () => {
  view.dispatch({ effects: themeConfig.reconfigure(themes[select.value]) });
  measure();
});
document.querySelector('#measure').addEventListener('click', measure);
measure();
