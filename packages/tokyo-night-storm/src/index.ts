import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Tokyo Night Storm theme color definitions
const base00 = '#24283b', // Background
  base01 = '#7982a9', // Foreground
  base02 = '#6f7bb630', // Selection Match
  base03 = '#565f89', // Comment
  base04 = '#c0caf5', // Cursor, Variable Name, and several others
  base05 = '#c0caf5', // Light blue for brighter foreground
  base06 = '#292e427a', // Line Highlight
  base07 = '#bb9af7', // Keyword, Operator, Constant
  base08 = '#7aa2f7', // Property Name, Function
  base09 = '#9ece6a', // Strings
  base0A = '#ff9e64', // Numbers
  base0B = '#2ac3de', // Type Name
  base0C = '#b4f9f8', // Regexp
  base0D = '#89ddff', // Heading
  base0E = '#ff5370', // Invalid
  base0F = '#ff5370'; // Link

const invalid = '#ff5370', // Bright red for errors
  darkBackground = base00,
  highlightBackground = base06,
  background = base00, // Main background
  tooltipBackground = base01,
  selection = base02,
  cursor = base04; // Cursor color

/// The editor theme styles for Tokyo Night Storm.
export const tokyoNightStormTheme = EditorView.theme(
  {
    '&': {
      color: base01,
      backgroundColor: background,
    },
    '.cm-content': {
      caretColor: cursor,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: cursor,
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
      },
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base03,
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '2px solid black',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '2px solid black',
    },
    '.cm-searchMatch': {
      backgroundColor: '#7aa2f730', // Lighter shade of property name color
      outline: `1px solid ${base03}`,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base05,
    },
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
    },
    '.cm-selectionMatch': {
      backgroundColor: base05,
    },
    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      outline: `1px solid ${base03}`,
    },
    '&.cm-focused .cm-matchingBracket': {
      backgroundColor: base06,
    },
    '.cm-gutters': {
      backgroundColor: darkBackground,
      color: base03,
      border: 'none',
    },
    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground,
    },
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: base05,
    },
    '.cm-tooltip': {
      border: 'none',
      backgroundColor: tooltipBackground,
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: highlightBackground,
        color: base03,
      },
    },
  },
  { dark: true },
);

/// The highlighting style for code in the Tokyo Night Storm theme.
export const tokyoNightStormHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base07 },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base04 },
  { tag: [t.propertyName], color: base08 },
  {
    tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
    color: base09,
  },
  { tag: [t.function(t.variableName), t.labelName], color: base08 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base07 },
  { tag: [t.definition(t.name), t.separator], color: base04 },
  { tag: [t.className], color: base04 },
  {
    tag: [t.number, t.changed, t.modifier, t.self, t.namespace],
    color: base0A,
  },
  {
    tag: [t.annotation],
    color: invalid,
  },
  { tag: [t.typeName], color: base0B },
  { tag: [t.operator, t.operatorKeyword], color: base07 },
  { tag: [t.url, t.escape, t.regexp, t.link], color: base0C },
  { tag: [t.meta, t.comment], color: base03 },
  { tag: t.tagName, color: base07 },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.link, color: base0F, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: base0D },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base04 },
  { tag: t.invalid, color: base0E },
  { tag: t.strikethrough, textDecoration: 'line-through' },
]);

/// Extension to enable the Tokyo Night Storm theme (both the editor theme and the highlight style).
export const tokyoNightStorm: Extension = [
  tokyoNightStormTheme,
  syntaxHighlighting(tokyoNightStormHighlightStyle),
];
