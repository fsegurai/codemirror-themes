import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

// Andromeda theme colors mapped to Basic Dark template structure
const base00 = '#23262E',  // Background
  base01 = '#D5CED9',  // Foreground
  base02 = '#db45a280', // Selection and Selection Match
  base03 = '#2b303b',   // Dropdown Background
  base04 = '#FFF',      // Cursor
  base05 = '#c74ded',   // Keyword, Storage
  base06 = '#00e8c6',   // Variable, Parameter
  base07 = '#FFE66D',   // Function, Type, Class
  base08 = '#96E072',   // String, RegExp
  base09 = '#ee5d43',   // Constant, Number
  base0A = '#A0A1A7cc',  // Comment
  base0B = '#ff00aa',    // Heading
  base0C = '#f92672',    // Tag
  invalid = 'red'      // Invalid (fallback color)

const darkBackground = '#292d30',
  highlightBackground = base02,
  tooltipBackground = base01,
  cursor = base04,
  selection = base02

// Define the editor theme styles for Andromeda.
export const andromedaTheme = EditorView.theme({
  '&': {
    color: base01,
    backgroundColor: base00
  },
  '.cm-content': {
    caretColor: cursor
  },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
    { backgroundColor: selection },
  '.cm-panels': { backgroundColor: darkBackground, color: base06 },
  '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
  '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
  '.cm-searchMatch': {
    backgroundColor: base02,
    outline: `1px solid ${base03}`,
    color: base07
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: base00,
    color: base07
  },
  '.cm-search.cm-panel': {
    color: base06
  },
  '.cm-selectionMatch': { backgroundColor: highlightBackground },
  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    outline: `1px solid ${base03}`
  },
  '&.cm-focused .cm-matchingBracket': {
    backgroundColor: base02,
    color: base07
  },
  '.cm-gutters': {
    borderRight: `1px solid #ffffff10`,
    color: base06,
    backgroundColor: darkBackground
  },
  '.cm-activeLineGutter': {
    backgroundColor: highlightBackground
  },
  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: base02
  },
  '.cm-tooltip': {
    border: 'none',
    backgroundColor: tooltipBackground
  },
  '.cm-tooltip .cm-tooltip-arrow:before': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  '.cm-tooltip .cm-tooltip-arrow:after': {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground
  },
  '.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor: highlightBackground,
      color: base03
    }
  }
}, { dark: true })

// Define the highlighting style for code in the Andromeda theme.
export const andromedaHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base05 },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: base06 },
  { tag: [t.variableName], color: base06 },
  { tag: [t.function(t.variableName)], color: base05 },
  { tag: [t.labelName], color: base09 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base05 },
  { tag: [t.definition(t.name), t.separator], color: base07 },
  { tag: [t.brace], color: base07 },
  { tag: [t.annotation], color: invalid },
  { tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: base05 },
  { tag: [t.typeName, t.className], color: base06 },
  { tag: [t.operator, t.operatorKeyword], color: base07 },
  { tag: [t.tagName], color: base05 },
  { tag: [t.squareBracket], color: base07 },
  { tag: [t.angleBracket], color: base07 },
  { tag: [t.attributeName], color: base06 },
  { tag: [t.regexp], color: base05 },
  { tag: [t.quote], color: base01 },
  { tag: [t.string], color: base08 },
  { tag: t.link, color: base0C, textDecoration: 'underline', textUnderlinePosition: 'under' },
  { tag: [t.url, t.escape, t.special(t.string)], color: base0B },
  { tag: [t.meta], color: base09 },
  { tag: [t.comment], color: base0A, fontStyle: 'italic' },
  { tag: t.monospace, color: base01 },
  { tag: t.strong, fontWeight: 'bold', color: base05 },
  { tag: t.emphasis, fontStyle: 'italic', color: base06 },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.heading, fontWeight: 'bold', color: base01 },
  { tag: t.special(t.heading1), fontWeight: 'bold', color: base01 },
  { tag: t.heading1, fontWeight: 'bold', color: base01 },
  { tag: [t.heading2, t.heading3, t.heading4], fontWeight: 'bold', color: base01 },
  { tag: [t.heading5, t.heading6], color: base01 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0B },
  { tag: [t.processingInstruction, t.inserted], color: base0B },
  { tag: [t.contentSeparator], color: base06 },
  { tag: t.invalid, color: base02, borderBottom: `1px dotted ${invalid}` }
])

// Extension to enable the Andromeda theme (both the editor theme and the highlight style).
export const andromeda: Extension = [
  andromedaTheme,
  syntaxHighlighting(andromedaHighlightStyle)
]
