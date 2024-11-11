import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

const dark0 = '#3c3836',
  dark1 = '#504945',
  dark2 = '#665c54',
  dark3 = '#7c6f64',
  gray_244 = '#928374',
  light0 = '#fbf1c7',
  light1 = '#ebdbb2',
  light2 = '#bdae93',
  faded_red = '#9d0006',
  faded_green = '#79740e',
  faded_yellow = '#b57614',
  faded_blue = '#076678',
  faded_purple = '#8f3f71',
  faded_aqua = '#427b58',
  faded_orange = '#af3a03';

const bg0 = light0,
  bg1 = light1,
  bg2 = light2,
  gray = gray_244,
  fg0 = dark0,
  fg1 = dark1,
  fg2 = dark2,
  fg3 = dark3,
  red = faded_red,
  green = faded_green,
  yellow = faded_yellow,
  blue = faded_blue,
  purple = faded_purple,
  aqua = faded_aqua,
  orange = faded_orange;

const invalid = red,
  darkBackground = bg1,
  highlightBackground = '#ffc42e52',
  background = bg0,
  tooltipBackground = bg1,
  selection = darkBackground,
  selectionMatch = '#ffc42e',
  cursor = orange;

/// The editor theme styles for Gruvbox Light.
export const gruvboxLightTheme = EditorView.theme(
  {
    '&': {
      color: fg0,
      backgroundColor: background,
    },

    '.cm-content': {
      caretColor: cursor,
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: selection },

    '.cm-panels': { backgroundColor: darkBackground, color: fg0 },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

    '.cm-searchMatch': {
      backgroundColor: highlightBackground,
      color: yellow,
      outline: `1px solid ${bg2}`,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: selectionMatch,
    },

    '.cm-activeLine': { backgroundColor: highlightBackground },
    '.cm-selectionMatch': { backgroundColor: bg2 },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      outline: `1px solid ${bg2}`,
      fontStyle: 'bold',
    },

    '&.cm-focused .cm-matchingBracket': {
      backgroundColor: bg2,
    },

    '.cm-gutters': {
      backgroundColor: bg1,
      color: fg2,
      border: 'none',
    },

    '.cm-activeLineGutter': {
      backgroundColor: selectionMatch,
    },

    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ddd',
    },

    '.cm-tooltip': {
      border: 'none',
      backgroundColor: tooltipBackground,
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: highlightBackground,
        color: fg1,
      },
    },
  },
  { dark: false },
);

/// The highlighting style for code in the Gruvbox Light theme.
export const gruvboxLightHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: red },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: aqua,
  },
  { tag: [t.variableName], color: blue },
  { tag: [t.function(t.variableName)], color: green, fontStyle: 'bold' },
  { tag: [t.labelName], color: fg0 },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: purple,
  },
  { tag: [t.definition(t.name), t.separator], color: fg0 },
  { tag: [t.brace], color: fg0 },
  {
    tag: [t.annotation],
    color: invalid,
  },
  {
    tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: purple,
  },
  {
    tag: [t.typeName, t.className],
    color: yellow,
  },
  {
    tag: [t.operator, t.operatorKeyword],
    color: red,
  },
  {
    tag: [t.tagName],
    color: aqua,
    fontStyle: 'bold',
  },
  {
    tag: [t.squareBracket],
    color: orange,
  },
  {
    tag: [t.angleBracket],
    color: blue,
  },
  {
    tag: [t.attributeName],
    color: aqua,
  },
  {
    tag: [t.regexp],
    color: aqua,
  },
  {
    tag: [t.quote],
    color: gray,
  },
  { tag: [t.string], color: fg0 },
  {
    tag: t.link,
    color: fg3,
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  {
    tag: [t.url, t.escape, t.special(t.string)],
    color: purple,
  },
  { tag: [t.meta], color: yellow },
  { tag: [t.comment], color: gray, fontStyle: 'italic' },
  { tag: t.strong, fontWeight: 'bold', color: orange },
  { tag: t.emphasis, fontStyle: 'italic', color: green },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.heading, fontWeight: 'bold', color: green },
  { tag: [t.heading1, t.heading2], fontWeight: 'bold', color: green },
  {
    tag: [t.heading3, t.heading4],
    fontWeight: 'bold',
    color: yellow,
  },
  {
    tag: [t.heading5, t.heading6],
    color: yellow,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: purple },
  {
    tag: [t.processingInstruction, t.inserted],
    color: blue,
  },
  {
    tag: [t.contentSeparator],
    color: red,
  },
  { tag: t.invalid, color: orange, borderBottom: `1px dotted ${invalid}` },
]);

/// Extension to enable the Gruvbox Light theme (both the editor theme and
/// the highlight style).
export const gruvboxLight: Extension = [
  gruvboxLightTheme,
  syntaxHighlighting(gruvboxLightHighlightStyle),
];
