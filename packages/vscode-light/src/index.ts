import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// VSCode Light theme color definitions
const background = '#ffffff',
  foreground = '#383a42',
  caret = '#000000',
  selection = '#add6ff',
  selectionMatch = '#a8ac94',
  lineHighlight = '#99999926',
  gutterBackground = '#ffffff',
  gutterForeground = '#237893',
  gutterActiveForeground = '#0b216f',
  keywordColor = '#0000ff',
  controlKeywordColor = '#af00db',
  variableColor = '#0070c1',
  classTypeColor = '#267f99',
  functionColor = '#795e26',
  numberColor = '#098658',
  operatorColor = '#383a42',
  regexpColor = '#af00db',
  stringColor = '#a31515',
  commentColor = '#008000',
  linkColor = '#4078f2',
  invalidColor = '#e45649';

// Define the editor theme styles for VSCode Light
export const vsCodeLightTheme = EditorView.theme(
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
  { dark: false },
);

// Define the highlighting style for code in the VSCode Light theme
export const vsCodeLightHighlightStyle = HighlightStyle.define([
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
  { tag: [t.moduleKeyword, t.controlKeyword], color: controlKeywordColor },
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
  { tag: t.heading, fontWeight: 'bold', color: variableColor },
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
  { tag: t.link, color: linkColor, textDecoration: 'underline' },
  { tag: t.invalid, color: invalidColor },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
]);

// Extension to enable the VSCode Light theme (both the editor theme and the highlight style)
export const vsCodeLight: Extension = [
  vsCodeLightTheme,
  syntaxHighlighting(vsCodeLightHighlightStyle),
];
