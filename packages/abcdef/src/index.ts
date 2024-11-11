import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Abcdef theme colors redefined to match the structure
const base00 = '#0f0f0f',  // Background
  base01 = '#defdef',  // Foreground
  base02 = '#515151',  // Selection
  base03 = '#515151',  // Gutter background (same as selection for consistency)
  base04 = '#FFFFFF',  // Gutter foreground
  base05 = '#00FF00',  // Caret
  base06 = '#51515160',  // Line highlight with some opacity for visibility
  base07 = '#555',    // Dark background for panels
  base08 = 'darkgoldenrod', // Keyword
  base09 = '#77F',          // Atom
  base0A = '#7a7b7c',       // Comment
  base0B = 'violet',        // Number
  base0C = '#fffabc',       // Definition, Function
  base0D = '#abcdef',       // Variable
  base0E = '#FFDD44',       // Type Name
  base0F = '#def',          // Tag Name
  invalid = '#fc6d24';      // Invalid color, making it slightly more vibrant

const darkBackground = base07,  // Use base07 for panel backgrounds
  highlightBackground = base06,  // Adding opacity for highlight
  tooltipBackground = base01,
  cursor = base05,
  selection = base02;

// Define the editor theme styles for Abcdef.
export const abcdefTheme = EditorView.theme({
  '&': {
    color: base01,
    backgroundColor: base00,
  },
  '.cm-content': {
    caretColor: cursor,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: cursor,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: selection,
  },
  '.cm-search.cm-panel.cm-textfield': {
    color: base04,
    borderRadius: '3px',
  },
  '.cm-panels': {
    backgroundColor: darkBackground,
    color: base04,
  },
  '.cm-panels.cm-panels-top': {
    borderBottom: '2px solid black',
  },
  '.cm-panels.cm-panels-bottom': {
    borderTop: '2px solid black',
  },
  '.cm-activeLine': {
    backgroundColor: highlightBackground,
  },
  '.cm-gutters': {
    backgroundColor: base03,
    color: base04,
  },
  '.cm-tooltip': {
    backgroundColor: tooltipBackground,
  },
}, { dark: true });

// Define the highlighting style for code in the Abcdef theme.
export const abcdefHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base08, fontWeight: 'bold' },
  { tag: t.atom, color: base09 },
  { tag: t.comment, fontStyle: 'italic', color: base0A },
  { tag: t.number, color: base0B },
  { tag: t.definition(t.variableName), color: base0C },
  { tag: t.variableName, color: base0D },
  { tag: t.function(t.variableName), color: base0C },
  { tag: t.typeName, color: base0E },
  { tag: t.tagName, color: base0F },
  { tag: t.string, color: base0C }, // Updated to base0C for consistency with definitions
  { tag: t.meta, color: base0B },
  { tag: t.bracket, color: base0C },
  { tag: t.attributeName, color: base0D },
  { tag: t.heading, color: base0E, fontWeight: 'bold' },
  { tag: t.link, color: base0F, fontWeight: 'bold' },
  { tag: t.invalid, color: invalid, textDecoration: 'underline' },
]);

// Extension to enable the Abcdef theme (both the editor theme and the highlight style).
export const abcdef: Extension = [
  abcdefTheme,
  syntaxHighlighting(abcdefHighlightStyle),
];
