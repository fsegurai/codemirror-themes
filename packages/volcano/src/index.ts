import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

// Volcano theme color definitions aligned with the schema
const base00 = '#390000',  // Background
  base01 = '#F8F8F8',  // Foreground
  base02 = '#750000',  // Selection and Selection Match
  base03 = '#e7c0c0ff', // Comment
  base04 = '#970000',  // Cursor
  base05 = '#f12727ff', // Keyword
  base06 = '#edef7dff', // Variable, Parameter, String, Regexp
  base07 = '#ffb454ff', // Function
  base08 = '#ec0d1e',   // Constant
  base09 = '#9df39fff', // Type
  base0A = '#fec758ff', // Class, Heading
  base0B = '#994646ff', // Number
  base0C = '#aa5507ff', // Tag
  invalid = '#ffffffff' // Invalid

const darkBackground = '#580000',   // Dropdown background
  highlightBackground = '#ff000033', // Active line and Matching bracket
  tooltipBackground = base01,     // Tooltip using foreground color
  cursor = base04,               // Caret color
  selection = base02            // Selection color

// Define the editor theme styles for Volcano.
export const volcanoTheme = EditorView.theme({
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
    color: base01,            // Foreground color for text
    outline: `1px solid ${base03}`  // Outline using comment color
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: base05,  // Use the keyword color for the selected search match
    color: base00             // Background color for high visibility
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
    backgroundColor: darkBackground,
    color: base03
  },
  '.cm-tooltip': {
    backgroundColor: tooltipBackground
  }
}, { dark: true })

// Define the highlighting style for code in the Volcano theme.
export const volcanoHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base05 },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base06 },
  { tag: [t.propertyName], color: base07 },
  { tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)], color: base06 },
  { tag: [t.function(t.variableName), t.labelName], color: base07 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base08 },
  { tag: [t.definition(t.name), t.separator], color: base06 },
  { tag: [t.className], color: base0A },
  { tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: base0B },
  { tag: [t.typeName], color: base09 },
  { tag: [t.operator, t.operatorKeyword], color: base05 },
  { tag: [t.url, t.escape, t.regexp, t.link], color: base06 },
  { tag: [t.meta, t.comment], color: base03 },
  { tag: t.tagName, color: base0C },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: base0A },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base06 },
  { tag: t.invalid, color: invalid },
  { tag: t.strikethrough, textDecoration: 'line-through' }
])

// Extension to enable the Volcano theme (both the editor theme and the highlight style).
export const volcano: Extension = [
  volcanoTheme,
  syntaxHighlighting(volcanoHighlightStyle)
]