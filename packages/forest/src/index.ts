import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

// Forest theme color definitions
const base00 = '#1b2b34',  // Background - dark blue-green forest shade
  base01 = '#c0c5ce',  // Foreground - soft cloudy light
  base02 = '#343d46',  // Selection and Selection Match - darker shade of forest mud
  base03 = '#65737e',  // Comment - greyish tinge resembling tree bark
  base04 = '#c594c5',  // Cursor - muted lavender, like early morning forest blooms
  base05 = '#99c794',  // Keyword, Tag - fresh leaf green
  base06 = '#5fb3b3',  // Variable, Parameter - reflective water surface tone
  base07 = '#6699cc',  // Function, Type - sky at dusk
  base08 = '#ec5f67',  // String, RegExp - autumn berry red
  base09 = '#ab7967',  // Constant, Number - earthy tone, wet autumn leaves
  base0A = '#f99157',  // Class, Heading - soft fox orange
  invalid = '#f2777a' // Invalid - faded red warning

const darkBackground = '#2b303b',  // Dropdown background - deep shade found under thick leaves
  highlightBackground = '#3e3d3257', // Active line and Matching bracket - moss on a rock
  tooltipBackground = base01,        // Tooltip using foreground color
  cursor = base04,                   // Caret color
  selection = base02                // Selection color

// Define the editor theme styles for Forest.
export const forestTheme = EditorView.theme({
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
  },
  '.cm-searchMatch': {
    backgroundColor: base02,  // Use the selection color for search matches
    color: base01,            // Foreground color for text
    outline: `1px solid ${base03}`  // Outline using comment color
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: base05,  // Use the keyword color for the selected search match
    color: base00             // Background color for high visibility
  }
}, { dark: true })

// Define the highlighting style for code in the Forest theme.
export const forestHighlightStyle = HighlightStyle.define([
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

// Extension to enable the Forest theme (both the editor theme and the highlight style).
export const forest: Extension = [
  forestTheme,
  syntaxHighlighting(forestHighlightStyle)
]
