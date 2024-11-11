import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

const base00 = '#FAFAFA', // Lighter background
  base01 = '#ECEFF1', // Light tooltip background
  base02 = '#607D8B', // Less bright main text
  base03 = '#90A4AE', // Secondary text
  base04 = '#B0BEC5', // Cursor and line numbers
  base05 = '#557C8D', // Variables and attributes
  base06 = '#ECEFF1', // Light borders or divisions
  base_red = '#FF0000', // For errors and invalid
  base_deeporange = '#FF7043', // Deep orange for tags
  base_pink = '#FF4081', // Pink for definitions
  base_yellow = '#ad8510', // Yellow for properties and headings
  base_orange = '#FFA726', // Orange for types and classes
  base_cyan = '#009EB3', // Cyan for links and keywords
  base_indigo = '#5C6BC0', // Indigo for operators
  base_purple = '#AB47BC', // Purple for labels and braces
  base_green = '#1E951D',
  base_lightgreen = '#689E34';

const invalid = base_red,
  highlightBackground = '#ECEFF1', // More visible highlight background
  background = base00,
  tooltipBackground = base01,
  selection = '#DDEEFF',
  selectionMatch = '#90a4ae26',
  match = '#b0bec56b',
  cursor = base04;

// Theme configuration adjusted for better contrast and color consistency
export const materialLightTheme = EditorView.theme({
    '&': {
      color: base02,
      backgroundColor: background,
    },
    '.cm-content': {
      caretColor: cursor,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: cursor,
    },
    // Adjusted panel colors for consistency
    '.cm-panels': {
      backgroundColor: base06,
      color: base03,
    },
    // Updated search match styling for better visibility
    '.cm-searchMatch': {
      outline: `1px solid ${base_yellow}`,
      backgroundColor: 'rgba(255, 215, 64, 0.3)', // Semi-transparent
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: selectionMatch,
    },
    '.cm-activeLine': {
      backgroundColor: selectionMatch,
      color: base02,
    },
    '.cm-selectionMatch': { backgroundColor: match },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: selection, // Updated selection color
    },
    '.cm-gutters': {
      backgroundColor: background,
      borderRight: `1px solid ${base04}`,
      color: base03,
    },
    '.cm-tooltip': {
      border: `1px solid ${base06}`,
      backgroundColor: tooltipBackground,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: highlightBackground,
        color: base03,
      },
    },
  }, { dark: false },
);

/// The highlighting style for code in the Material Dark theme.
export const materialLightHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base03 },
  {
    tag: [t.name, t.deleted, t.character, t.macroName],
    color: base_cyan,
  },
  { tag: [t.propertyName], color: base_yellow },
  { tag: [t.variableName], color: base05 },
  { tag: [t.function(t.variableName)], color: base_cyan },
  { tag: [t.labelName], color: base_purple },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base_yellow,
  },
  { tag: [t.definition(t.name), t.separator], color: base_pink },
  { tag: [t.brace], color: base_purple },
  {
    tag: [t.annotation],
    color: invalid,
  },
  {
    tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: base_orange,
  },
  {
    tag: [t.typeName, t.className],
    color: base_orange,
  },
  {
    tag: [t.operator, t.operatorKeyword],
    color: base_indigo,
  },
  {
    tag: [t.tagName],
    color: base_deeporange,
  },
  {
    tag: [t.squareBracket],
    color: base_red,
  },
  {
    tag: [t.angleBracket],
    color: base02,
  },
  {
    tag: [t.attributeName],
    color: base05,
  },
  {
    tag: [t.regexp],
    color: invalid,
  },
  {
    tag: [t.quote],
    color: base_green,
  },
  { tag: [t.string], color: base_lightgreen },
  {
    tag: t.link,
    color: base_cyan,
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  {
    tag: [t.url, t.escape, t.special(t.string)],
    color: base_yellow,
  },
  { tag: [t.meta], color: base03 },
  { tag: [t.comment], color: base03, fontStyle: 'italic' },
  { tag: t.monospace, color: base05 },
  { tag: t.strong, fontWeight: 'bold', color: base_red },
  { tag: t.emphasis, fontStyle: 'italic', color: base_lightgreen },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.heading, fontWeight: 'bold', color: base_yellow },
  { tag: t.heading1, fontWeight: 'bold', color: base_yellow },
  {
    tag: [t.heading2, t.heading3, t.heading4],
    fontWeight: 'bold',
    color: base_yellow,
  },
  {
    tag: [t.heading5, t.heading6],
    color: base_yellow,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base_cyan },
  {
    tag: [t.processingInstruction, t.inserted],
    color: base_red,
  },
  {
    tag: [t.contentSeparator],
    color: base_cyan,
  },
  { tag: t.invalid, color: base02, borderBottom: `1px dotted ${base_red}` },
]);

/// Extension to enable the Material Dark theme (both the editor theme and
/// the highlight style).
export const materialLight: Extension = [
  materialLightTheme,
  syntaxHighlighting(materialLightHighlightStyle),
];