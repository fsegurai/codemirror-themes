import { javascript } from '@codemirror/lang-javascript';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Compartment, Prec } from '@codemirror/state';
import { defineTheme } from '@fsegurai/codemirror-theme-core';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
import { githubLight } from '@fsegurai/codemirror-theme-github-light';
import { tags as t } from '@lezer/highlight';
import { basicSetup, EditorView } from 'codemirror';

const doc = [
  '// Edit the palette above: defineTheme rebuilds the theme on every change',
  'export function total(items, tax = 0.13) {',
  '  const sum = items.reduce((acc, item) => acc + item.price, 0);',
  // biome-ignore lint/suspicious/noTemplateCurlyInString: editor content, shown as code
  '  return `Total: ${(sum * (1 + tax)).toFixed(2)}`;',
  '}',
].join('\n');

// ---- 1. A theme from a palette, through defineTheme ---------------------------------------------------------------

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
    error: '#ff8a80',
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
    error: '#b3261e',
    gutter: '#59636e',
    cursor: '#0969da',
    selection: '#c8e1ff',
    activeLine: '#f3f6fa',
  },
};

// `percent` of `color` over `base` (a CSS value, so the editor recomputes nothing on its own).
const mix = (color, percent, base = 'transparent') => `color-mix(in srgb, ${color} ${percent}%, ${base})`;

/**
 * Expands a small palette into a complete ThemeDefinition. `defineTheme` requires every UiPalette token, so the
 * resulting theme also styles the search panel, tooltips, autocomplete, lint markers, diff lines and scrollbars,
 * like the packaged themes. Try Ctrl-F or Ctrl-Space in the editor.
 */
function definitionFrom(palette, dark) {
  const { background, foreground, comment, cursor, error, gutter, selection, activeLine } = palette;
  const surface = mix(foreground, 6, background);
  const border = mix(foreground, 20, background);
  return {
    name: 'Playground',
    dark,
    ui: {
      background,
      foreground,
      border: 'none',
      cursor,
      cursorWidth: '2px',
      cursorShadow: 'none',
      fatCursor: { background: mix(cursor, 60), border: 'none' },
      selection,
      selectionInactive: mix(selection, 70),
      selectionForeground: null,
      selectionOutline: 'none',
      activeLine,
      activeLineBorder: { left: 'none', right: 'none' },
      ghostText: comment,
      ghostTextOpacity: '0.7',
      specialChar: error,
      // Like the packaged themes: a visible ring around the focused editor (forced-colors mode repaints it).
      focusRing: `0 0 0 2px ${background}, 0 0 0 4px ${cursor}`,
      outlineWidth: '1px',
      searchMatch: {
        background: mix(palette.number, 30),
        outline: mix(palette.number, 60),
        foreground,
        shadow: 'none',
        selectedBackground: mix(palette.number, 55),
        selectedForeground: foreground,
        selectedOutline: `1px solid ${palette.number}`,
        selectedShadow: 'none',
      },
      selectionMatch: { background: mix(selection, 60), outline: 'transparent' },
      matchingBracket: { background: mix(cursor, 20), outline: cursor, shadow: 'none' },
      nonMatchingBracket: { background: mix(error, 20), outline: error },
      panel: {
        background: surface,
        foreground,
        border,
        borderWidth: '1px',
        outline: 'none',
        shadow: 'none',
        buttonBackground: surface,
        buttonForeground: foreground,
        buttonBorder: `1px solid ${border}`,
        buttonHoverBackground: activeLine,
        buttonHoverForeground: foreground,
        buttonHoverBorder: `1px solid ${cursor}`,
        buttonHoverShadow: 'none',
        inputBackground: background,
        inputBorder: `1px solid ${border}`,
      },
      gutter: {
        background,
        foreground: gutter,
        border: 'transparent',
        activeBackground: activeLine,
        activeForeground: foreground,
        activeFontWeight: '600',
        activeBorder: 'none',
        foldHover: foreground,
      },
      foldPlaceholder: { background: surface, foreground: comment, border, borderStyle: 'dotted' },
      tooltip: {
        background: surface,
        foreground,
        border,
        shadow: `0 2px 8px ${mix('#000000', dark ? 40 : 15)}`,
        listBackground: surface,
        listBorder: 'none',
        hoverBackground: activeLine,
        selectedBackground: selection,
        selectedForeground: foreground,
        selectedBorder: 'none',
        icon: comment,
        detail: comment,
      },
      diff: {
        insertedBackground: mix(palette.string, 18),
        insertedForeground: palette.string,
        insertedBorder: `1px solid ${mix(palette.string, 40)}`,
        deletedBackground: mix(error, 18),
        deletedForeground: error,
        deletedBorder: `1px solid ${mix(error, 40)}`,
      },
      // Lint markers are SVG data URLs: these four must stay plain colors (no color-mix or var()).
      diagnostic: {
        error,
        warning: palette.number,
        info: palette.function,
        hint: comment,
        errorBackground: 'transparent',
        warningBackground: 'transparent',
        infoBackground: 'transparent',
        borderWidth: '3px',
        underlineWidth: '2px',
      },
      scrollbar: {
        track: background,
        trackBorder: 'none',
        thumb: border,
        thumbBorder: `3px solid ${background}`,
        thumbHover: comment,
        thumbHoverShadow: 'none',
      },
      merge: { backgroundColor: surface, borderColor: border, buttonColor: foreground, buttonHoverColor: activeLine },
    },
    // The 25 base roles are required; fine roles (controlKeyword, method, …) fall back to their parent role.
    syntax: {
      keyword: { color: palette.keyword },
      operator: { color: foreground },
      punctuation: { color: comment },
      name: { color: foreground },
      property: { color: palette.function },
      function: { color: palette.function },
      type: { color: palette.keyword, fontStyle: 'italic' },
      string: { color: palette.string },
      number: { color: palette.number },
      constant: { color: palette.number },
      comment: { color: comment, fontStyle: 'italic' },
      meta: { color: comment },
      tag: { color: palette.keyword },
      attribute: { color: palette.function },
      content: { color: foreground },
      heading: { color: palette.keyword, fontWeight: 'bold' },
      link: { color: palette.function, textDecoration: 'underline' },
      url: { color: palette.function, textDecoration: 'underline' },
      emphasis: { fontStyle: 'italic' },
      strong: { fontWeight: 'bold' },
      strikethrough: { textDecoration: 'line-through' },
      invalid: { color: error, textDecoration: 'underline wavy' },
      inserted: { color: palette.string },
      deleted: { color: error },
      changed: { color: palette.number },
    },
  };
}

/** The palette as a complete theme: `defineTheme` returns `{ extension, theme, highlightStyle, mergeStyles }`. */
const buildTheme = (palette, dark) => defineTheme(definitionFrom(palette, dark)).extension;

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
  error: 4.5,
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
