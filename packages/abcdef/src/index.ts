import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Abcdef theme colors
const base00 = '#0f0f0f',  // Background
  base01 = '#defdef',  // Foreground
  base02 = '#515151',  // Selection match
  base03 = '#515151',  // Gutter background
  base04 = '#FFFFFF',  // Gutter foreground
  base05 = '#00FF00',  // Caret
  base06 = '#0a6bcb3d',  // Line highlight
  base07 = '#555',      // Gutter background

  base08 = 'darkgoldenrod', // Keyword
  base09 = '#77F',          // Atom
  base0A = '#7a7b7c',       // Comment
  base0B = 'violet',        // Number
  base0C = '#fffabc',       // Definition, Function
  base0D = '#abcdef',       // Variable
  base0E = '#FFDD44',       // Type Name
  base0F = '#def',          // Tag Name
  base10 = '#2b4',          // String
  base11 = '#C9F',          // Meta
  base12 = '#8a8a8a',       // Bracket
  base13 = '#DDFF00',       // Attribute Name
  base14 = 'aquamarine',    // Heading
  base15 = 'blueviolet',    // Link
  invalid = '#fc6d24';      // Invalid color

// Define the editor theme styles for Abcdef.
export const abcdefTheme = EditorView.theme({
  '&': {
    color: base01,
    backgroundColor: base00
  },
  '.cm-content': {
    caretColor: base05
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: base05
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: base02
  },
  '.cm-panels': {
    backgroundColor: base07,
    color: base04
  },
  '.cm-panels.cm-panels-top': {
    borderBottom: '2px solid black'
  },
  '.cm-panels.cm-panels-bottom': {
    borderTop: '2px solid black'
  },
  '.cm-activeLine': {
    backgroundColor: base06
  },
  '.cm-gutters': {
    backgroundColor: base03,
    color: base04
  },
  '.cm-tooltip': {
    backgroundColor: base01
  }
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
  { tag: t.string, color: base10 },
  { tag: t.meta, color: base11 },
  { tag: t.bracket, color: base12 },
  { tag: t.attributeName, color: base13 },
  { tag: t.heading, color: base14, fontWeight: 'bold' },
  { tag: t.link, color: base15, fontWeight: 'bold' },
  { tag: t.invalid, color: invalid, textDecoration: 'underline' }
]);

// Extension to enable the Abcdef theme (both the editor theme and the highlight style).
export const abcdef: Extension = [
  abcdefTheme,
  syntaxHighlighting(abcdefHighlightStyle)
];
