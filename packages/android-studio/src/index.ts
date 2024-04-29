import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

// Android Studio theme colors
const base00 = '#282b2e', // Background
  base01 = '#a9b7c6', // Foreground
  base02 = '#4e5254', // Selection
  base03 = '#7f85891f', // Line highlight
  base04 = '#00FF00', // Caret
  base05 = '#cc7832', // Keyword, Deleted, ClassName
  base06 = '#6897bb', // Number, Literal, DerefOperator
  base07 = '#629755', // Link, VariableName
  base08 = 'grey',    // Comment, Quote
  base09 = '#bbb529', // Meta, DocumentMeta
  base0A = '#6a8759', // String, PropertyName, AttributeValue
  base0B = '#ffc66d', // Heading, TypeName
  base0C = '#a9b7c6' // AttributeName

// Define the editor theme styles for Android Studio.
export const androidStudioTheme = EditorView.theme({
  '&': {
    color: base01,
    backgroundColor: base00
  },
  '.cm-content': {
    caretColor: base04
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: base04
  },
  '&.cm-focused .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: base02
  },
  '.cm-activeLine': {
    backgroundColor: base03
  },
  '.cm-gutters': {
    backgroundColor: base00,
    color: base01
  },
  '.cm-tooltip': {
    backgroundColor: base01
  }
}, { dark: true })

// Define the highlighting style for code in the Android Studio theme.
export const androidStudioHighlightStyle = HighlightStyle.define([
  { tag: [t.keyword, t.deleted, t.className], color: base05 },
  { tag: [t.number, t.literal, t.derefOperator], color: base06 },
  { tag: [t.link, t.variableName], color: base07 },
  { tag: [t.comment, t.quote], color: base08 },
  { tag: [t.meta, t.documentMeta], color: base09 },
  { tag: [t.string, t.propertyName, t.attributeValue], color: base0A },
  { tag: [t.heading, t.typeName], color: base0B },
  { tag: [t.attributeName], color: base0C },
  { tag: t.emphasis, fontStyle: 'italic' }
])

// Extension to enable the Android Studio theme (both the editor theme and the highlight style).
export const androidStudio: Extension = [
  androidStudioTheme,
  syntaxHighlighting(androidStudioHighlightStyle)
]
