import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Palenight theme color definitions
const base00 = '#292D3E', // Background
  base01 = '#A6ACCD', // Foreground
  base02 = '#444267', // Darker selection match
  base03 = '#676E95', // Comments
  base04 = '#A6ACCD', // Cursor color
  base05 = '#C3E88D', // Green for strings and regex
  base06 = '#33374D', // Line highlight
  base07 = '#82AAFF', // Blue for keywords, type names, and operators
  base08 = '#F78C6C'; // Orange for numbers, headings, and constants

const invalid = '#FF5370', // Red for invalid elements
  darkBackground = base00,
  highlightBackground = base06,
  background = base00, // Main background
  tooltipBackground = '#444267',
  selection = '#444267',
  cursor = base04; // Cursor color

// The editor theme styles for Palenight
export const palenightTheme = EditorView.theme(
  {
    '&': {
      color: base01,
      backgroundColor: background,
    },
    '.cm-content': {
      caretColor: cursor,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: cursor,
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
      },
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base03,
    },
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
    },
    '.cm-selectionMatch': {
      backgroundColor: base02,
    },
    '&.cm-focused .cm-matchingBracket': {
      backgroundColor: highlightBackground,
    },
    '.cm-gutters': {
      backgroundColor: darkBackground,
      color: base03,
      border: 'none',
    },
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
    },
  },
  { dark: true },
);

// The highlighting style for Palenight
export const palenightHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base07 },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base01 },
  { tag: [t.propertyName], color: base01 },
  {
    tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
    color: base05,
  },
  { tag: [t.function(t.variableName), t.labelName], color: base01 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base01 },
  { tag: [t.definition(t.name), t.separator], color: base01 },
  { tag: [t.className], color: base01 },
  {
    tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: base08,
  },
  { tag: [t.typeName], color: base07 },
  { tag: [t.operator, t.operatorKeyword], color: base07 },
  { tag: [t.url, t.escape, t.regexp, t.link], color: base05 },
  { tag: [t.meta, t.comment], color: base03 },
  { tag: t.tagName, color: base07 },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: base08 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base01 },
  { tag: t.invalid, color: invalid },
  { tag: t.strikethrough, textDecoration: 'line-through' },
]);

// Extension to enable the Palenight theme (both editor theme and highlight style)
export const palenight: Extension = [
  palenightTheme,
  syntaxHighlighting(palenightHighlightStyle),
];
