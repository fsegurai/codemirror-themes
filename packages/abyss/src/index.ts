import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Abyss theme colors
const base00 = '#000c18', // Background
  base01 = '#6688cc', // Foreground
  base02 = '#770811', // Selection
  base03 = '#181f2f', // Dropdown Background
  base04 = '#ddbb88', // Cursor
  base05 = '#0055ff30', // Active line
  base06 = '#FFFFFF', // Another placeholder
  base07 = '#225588', // Keyword, Storage
  base08 = '#2277ff', // Variable, Parameter
  base09 = '#384887', // Comment
  base0A = '#22aa44', // String, RegExp
  base0B = '#9966b8', // Function, Type
  base0C = '#f280d0', // Constant, Number
  base0D = '#ddbb88', // Class
  base0E = '#6688cc', // Heading
  base0F = '#225588', // Tag
  base10 = '#ff00ff8a', // Link
  invalid = '#A22D44'; // Invalid

// Define the editor theme styles for Abyss.
export const abyssTheme = EditorView.theme({
  '&': {
    color: base01,
    backgroundColor: base00,
  },
  '.cm-content': {
    caretColor: base04,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: base04,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: base02,
  },
  '.cm-searchMatch': {
    backgroundColor: base0B,
    outline: `1px solid ${base03}`,
    color: base06,
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: base10,
    color: base06,
  },
  '.cm-panels': {
    backgroundColor: base03,
    color: base01,
  },
  '.cm-activeLine': {
    backgroundColor: base05,
  },
  '.cm-gutters': {
    backgroundColor: base03, // Assuming the dropdown background color for gutters
    color: base01,
  },
  '.cm-tooltip': {
    backgroundColor: base01,
  },
}, { dark: true });

// Define the highlighting style for code in the Abyss theme.
export const abyssHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base07, fontWeight: 'bold' },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base08 },
  { tag: [t.propertyName], color: base0B },
  { tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)], color: base0A },
  { tag: [t.function(t.variableName), t.labelName], color: base0B },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0C },
  { tag: [t.definition(t.name), t.separator], color: base08 },
  { tag: [t.className], color: base0D },
  { tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: base0C },
  { tag: [t.typeName], color: base0B },
  { tag: [t.operator, t.operatorKeyword], color: base07 },
  { tag: [t.url, t.escape, t.regexp, t.link], color: base0A },
  { tag: [t.meta, t.comment], color: base09 },
  { tag: t.tagName, color: base0F },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: base0E },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base08 },
  { tag: t.invalid, color: invalid, textDecoration: 'underline' },
]);

// Extension to enable the Abyss theme (both the editor theme and the highlight style).
export const abyss: Extension = [
  abyssTheme,
  syntaxHighlighting(abyssHighlightStyle),
];
