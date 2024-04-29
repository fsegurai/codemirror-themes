import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

// Abyss theme colors
const base00 = '#000c18', // Background
  base01 = '#6688cc', // Foreground
  base02 = '#770811', // Selection
  base03 = '#181f2f', // Dropdown Background
  base04 = '#FFFFFF', // Unused, placeholder for gutter foreground if needed
  base05 = '#ddbb88', // Cursor
  base06 = '#0055ff30', // Active line
  base07 = '#FFFFFF', // Another placeholder

  base08 = '#225588', // Keyword, Storage
  base09 = '#2277ff', // Variable, Parameter
  base0A = '#384887', // Comment
  base0B = '#22aa44', // String, RegExp
  base0C = '#9966b8', // Function, Type
  base0D = '#f280d0', // Constant, Number
  base0E = '#ddbb88', // Class
  base0F = '#6688cc', // Heading
  base10 = '#225588', // Tag
  invalid = '#A22D44' // Invalid

// Define the editor theme styles for Abyss.
export const abyssTheme = EditorView.theme({
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
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: base02
  },
  '.cm-panels': {
    backgroundColor: base03,
    color: base01
  },
  '.cm-activeLine': {
    backgroundColor: base06
  },
  '.cm-gutters': {
    backgroundColor: base03, // Assuming the dropdown background color for gutters
    color: base01
  },
  '.cm-tooltip': {
    backgroundColor: base01
  }
}, { dark: true })

// Define the highlighting style for code in the Abyss theme.
export const abyssHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base08, fontWeight: 'bold' },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base09 },
  { tag: [t.propertyName], color: base0C },
  { tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)], color: base0B },
  { tag: [t.function(t.variableName), t.labelName], color: base0C },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0D },
  { tag: [t.definition(t.name), t.separator], color: base09 },
  { tag: [t.className], color: base0E },
  { tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: base0D },
  { tag: [t.typeName], color: base0C },
  { tag: [t.operator, t.operatorKeyword], color: base08 },
  { tag: [t.url, t.escape, t.regexp, t.link], color: base0B },
  { tag: [t.meta, t.comment], color: base0A },
  { tag: t.tagName, color: base10 },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: base0F },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base09 },
  { tag: t.invalid, color: invalid, textDecoration: 'underline' }
])

// Extension to enable the Abyss theme (both the editor theme and the highlight style).
export const abyss: Extension = [
  abyssTheme,
  syntaxHighlighting(abyssHighlightStyle)
]
