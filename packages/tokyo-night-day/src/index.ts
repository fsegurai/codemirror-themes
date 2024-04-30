import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

// Tokyo Night Day theme color definitions
const base00 = '#e1e2e7',  // Background
  base01 = '#3760bf',  // Foreground, used in several elements like cursor and variable names
  base02 = '#99a7df',  // Selection Match
  base03 = '#848cb5',  // Comment color
  base04 = '#3760bf',  // Cursor color
  base05 = '#587539',  // Green used for strings and regex
  base06 = '#5f5faf11', // Line highlight
  base07 = '#007197',  // Blue used for keywords, type names, and operators

  base08 = '#b15c00',  // Orange used for numbers and headings
  base09 = '#f52a65',  // Red for invalid elements
  invalid = '#f52a65', // Same as base09
  darkBackground = base00,
  highlightBackground = base06,
  background = base00, // Main background
  tooltipBackground = base01,
  selection = base02,
  cursor = base04 // Cursor color

/// The editor theme styles for Tokyo Night Day.
export const tokyoNightDayTheme = EditorView.theme({
  '&': {
    color: base01,
    backgroundColor: background
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
    color: base03
  },
  '.cm-panels.cm-panels-top': {
    borderBottom: '2px solid black'
  },
  '.cm-panels.cm-panels-bottom': {
    borderTop: '2px solid black'
  },
  '.cm-searchMatch': {
    backgroundColor: base02, // Lighter shade for search matches
    outline: `1px solid ${base03}`
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: base06
  },
  '.cm-activeLine': {
    backgroundColor: highlightBackground
  },
  '.cm-selectionMatch': {
    backgroundColor: base05
  },
  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    outline: `1px solid ${base03}`
  },
  '&.cm-focused .cm-matchingBracket': {
    backgroundColor: base06
  },
  '.cm-gutters': {
    backgroundColor: darkBackground,
    color: base03,
    border: 'none'
  },
  '.cm-activeLineGutter': {
    backgroundColor: highlightBackground
  },
  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: base04
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
}, { dark: false })

/// The highlighting style for code in the Tokyo Night Day theme.
export const tokyoNightDayHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base07 },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base01 },
  { tag: [t.propertyName], color: base01 },
  { tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)], color: base05 },
  { tag: [t.function(t.variableName), t.labelName], color: base01 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base01 },
  { tag: [t.definition(t.name), t.separator], color: base01 },
  { tag: [t.className], color: base01 },
  { tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: base08 },
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
  { tag: t.invalid, color: base09 },
  { tag: t.strikethrough, textDecoration: 'line-through' }
])

/// Extension to enable the Tokyo Night Day theme (both the editor theme and the highlight style).
export const tokyoNightDay: Extension = [
  tokyoNightDayTheme,
  syntaxHighlighting(tokyoNightDayHighlightStyle)
]
