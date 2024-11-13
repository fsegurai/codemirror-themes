import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// VSCode Dark theme color definitions
const background = '#1e1e1e',
  foreground = '#9cdcfe',
  caret = '#c6c6c6',
  selection = '#6199ff2f',
  selectionMatch = '#72a1ff59',
  lineHighlight = '#ffffff0f',
  gutterBackground = '#1e1e1e',
  gutterForeground = '#838383',
  gutterActiveForeground = '#ffffff',
  keywordColor = '#569cd6',
  controlKeywordColor = '#c586c0',
  variableColor = '#9cdcfe',
  classTypeColor = '#4ec9b0',
  functionColor = '#dcdcaa',
  numberColor = '#b5cea8',
  operatorColor = '#d4d4d4',
  regexpColor = '#d16969',
  stringColor = '#ce9178',
  commentColor = '#6a9955',
  invalidColor = '#ff0000';

// Define the editor theme styles for VSCode Dark
export const vscodeDarkTheme = EditorView.theme(
  {
    '&': {
      color: foreground,
      backgroundColor: background,
      fontFamily:
        'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
    },
    '.cm-content': {
      caretColor: caret,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: caret,
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
      },
    '.cm-searchMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${lineHighlight}`,
    },
    '.cm-activeLine': {
      backgroundColor: lineHighlight,
    },
    '.cm-gutters': {
      backgroundColor: gutterBackground,
      color: gutterForeground,
    },
    '.cm-activeLineGutter': {
      color: gutterActiveForeground,
    },
  },
  { dark: true },
);

// Define the highlighting style for code in the VSCode Dark theme
export const vscodeDarkHighlightStyle = HighlightStyle.define([
  {
    tag: [
      t.keyword,
      t.operatorKeyword,
      t.modifier,
      t.color,
      t.constant(t.name),
      t.standard(t.name),
      t.standard(t.tagName),
      t.special(t.brace),
      t.atom,
      t.bool,
      t.special(t.variableName),
    ],
    color: keywordColor,
  },
  { tag: [t.controlKeyword, t.moduleKeyword], color: controlKeywordColor },
  {
    tag: [
      t.name,
      t.deleted,
      t.character,
      t.macroName,
      t.propertyName,
      t.variableName,
      t.labelName,
      t.definition(t.name),
    ],
    color: variableColor,
  },
  {
    tag: [
      t.typeName,
      t.className,
      t.tagName,
      t.number,
      t.changed,
      t.annotation,
      t.self,
      t.namespace,
    ],
    color: classTypeColor,
  },
  {
    tag: [t.function(t.variableName), t.function(t.propertyName)],
    color: functionColor,
  },
  { tag: [t.number], color: numberColor },
  {
    tag: [t.operator, t.punctuation, t.separator, t.url, t.escape, t.regexp],
    color: operatorColor,
  },
  { tag: [t.regexp], color: regexpColor },
  {
    tag: [t.special(t.string), t.processingInstruction, t.string, t.inserted],
    color: stringColor,
  },
  { tag: [t.meta, t.comment], color: commentColor },
  { tag: t.invalid, color: invalidColor },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: commentColor, textDecoration: 'underline' },
]);

// Extension to enable the VSCode Dark theme (both the editor theme and the highlight style)
export const vscodeDark: Extension = [
  vscodeDarkTheme,
  syntaxHighlighting(vscodeDarkHighlightStyle),
];
