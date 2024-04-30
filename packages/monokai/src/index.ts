import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

// Monokai theme colors aligned with the schema
const base00 = '#272822',  // Background
  base01 = '#f8f8f2',  // Foreground
  base02 = '#4a4a76',  // Selection and Selection Match
  base03 = '#88846f',  // Comment
  base04 = '#f8f8f0',  // Cursor
  base05 = '#F92672',  // Keyword, Storage, Tag
  base06 = '#FD971F',  // Variable, Parameter
  base07 = '#66D9EF',  // Function, Type
  base08 = '#E6DB74',  // String, RegExp
  base09 = '#AE81FF',  // Constant, Number
  base0A = '#A6E22E',  // Class, Heading
  invalid = '#F44747' // Invalid

const darkBackground = '#414339',  // Dropdown background
  highlightBackground = '#3e3d3257', // Line highlight with some opacity
  tooltipBackground = base01,  // Tooltips using foreground color
  cursor = base04,  // Caret color
  selection = base02  // Selection color

// Define the editor theme styles for Monokai.
export const monokaiTheme = EditorView.theme({
  '&': {
    color: base01,
    backgroundColor: base00
  },
  '.cm-content': {
    caretColor: cursor
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: cursor
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: selection
  },
  '.cm-searchMatch': {
    backgroundColor: base02,  // Use the selection color for search matches
    color: base01,  // Foreground color for text
    outline: `1px solid ${base03}`  // Outline using comment color
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: base05,  // Use the keyword color for the selected search match
    color: base00  // Background color for high visibility
  },
  '.cm-panels': {
    backgroundColor: darkBackground,
    color: base01
  },
  '.cm-panels.cm-panels-top': {
    borderBottom: '2px solid black'
  },
  '.cm-panels.cm-panels-bottom': {
    borderTop: '2px solid black'
  },
  '.cm-activeLine': {
    backgroundColor: highlightBackground
  },
  '.cm-gutters': {
    backgroundColor: darkBackground,  // Using dropdown background for gutter
    color: base03
  },
  '.cm-tooltip': {
    backgroundColor: tooltipBackground
  }
}, { dark: true })

// Define the highlighting style for code in the Monokai theme.
export const monokaiHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base05 },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base06 },
  { tag: [t.propertyName], color: base07 },
  { tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)], color: base08 },
  { tag: [t.function(t.variableName), t.labelName], color: base07 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base09 },
  { tag: [t.definition(t.name), t.separator], color: base06 },
  { tag: [t.className], color: base0A },
  { tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: base09 },
  { tag: [t.typeName], color: base07 },
  { tag: [t.operator, t.operatorKeyword], color: base05 },
  { tag: [t.url, t.escape, t.regexp, t.link], color: base08 },
  { tag: [t.meta, t.comment], color: base03 },
  { tag: t.tagName, color: base05 },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: base0A },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base06 },
  { tag: t.invalid, color: invalid },
  { tag: t.strikethrough, textDecoration: 'line-through' }
])

// Extension to enable the Monokai theme (both the editor theme and the highlight style).
export const monokai: Extension = [
  monokaiTheme,
  syntaxHighlighting(monokaiHighlightStyle)
]
