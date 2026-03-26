import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

import {
  applyMergeRevertStyles,
  generalContent,
  generalCursor,
  generalDiff,
  generalGutter,
  generalLine,
  generalMatching,
  generalPanel,
  generalPlaceholder,
  generalScroller,
  generalSearchField,
  generalTooltip,
  IMergeRevertStyles,
} from './utils';

// Base colors derived from the original CM5 Material Ocean theme
const base00 = '#0F111A', // Background
  base01 = '#151825', // Slightly lighter background (popups, statuslines)
  base02 = 'rgba(113, 124, 180, 0.2)', // Selection background
  base03 = '#464B5D', // Comments, invisibles, line highlighting, gutter
  base04 = '#FFCC00', // Cursor
  base05 = '#8F93A2', // Default foreground
  base06 = '#EEFFFF', // Light foreground
  base07 = '#0F111A', // Gutter background (same as editor)
  // Accent colors (token colors)
  base08 = '#C792EA', // Keywords, attributes, properties
  base09 = '#89DDFF', // Operators
  base0A = '#FFCB6B', // Builtins, meta
  base0B = '#C3E88D', // Strings
  base0C = '#F78C6C', // Atoms
  base0D = '#82AAFF', // Definitions
  base0E = '#FF5370', // Numbers, tags, errors
  base0F = '#DECB6B', // Types, qualifiers
  base10 = '#f07178', // Variable-3, string-2
  base11 = '#80CBC4'; // Selection variant / aqua tint

// UI specific colors
const invalid = base0E,
  darkBackground = base07,
  highlightBackground = 'rgba(0, 0, 0, 0.5)', // Active line
  background = base00,
  tooltipBackground = base01,
  selection = base02,
  selectionMatch = 'rgba(128, 203, 196, 0.2)',
  cursor = base04,
  activeBracketBg = '#39496650',
  activeBracketBorder = base0D,
  diagnosticWarning = base0A,
  linkColor = base0D,
  visitedLinkColor = base08;

// Diff/merge specific colors – tuned to match the palette
const addedBackground = '#13343a80',
  removedBackground = '#3b1c2480',
  addedText = base11,
  removedText = base0E;

const materialOceanTheme = EditorView.theme(
  {
    '&': {
      color: base05,
      backgroundColor: background,
      fontSize: generalContent.fontSize,
      fontFamily: generalContent.fontFamily,
    },

    '.cm-content': {
      caretColor: cursor,
      lineHeight: generalContent.lineHeight,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: cursor,
      borderLeftWidth: generalCursor.borderLeftWidth,
    },
    '.cm-fat-cursor': {
      backgroundColor: `${cursor}75`,
      color: background,
    },

    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
      },

    '.cm-selectionLayer': {
      zIndex: 100,
    },

    '.cm-searchMatch': {
      backgroundColor: '#394966cc',
      outline: `1px solid ${base09}`,
      color: base06,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base06,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base09,
      color: background,
      padding: generalSearchField.padding,

      '& span': {
        color: background,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base05,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    '.cm-panels': {
      backgroundColor: background,
      color: base05,
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base03}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base03}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base05,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base02,
    },

    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    '.cm-gutters': {
      backgroundColor: darkBackground,
      color: base03,
      border: generalGutter.border,
      borderRight: `1px solid ${base03}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#151823',
      color: base05,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
      lineHeight: generalGutter.lineHeight,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
      lineHeight: generalGutter.lineHeight,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: base03,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base05,
    },

    '.cm-insertedLine': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: addedBackground,
      color: addedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
    },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: `${addedBackground} !important`,
      color: addedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `1px solid ${addedText}40`,
    },
    'ins.cm-insertedLine .cm-changedText': {
      background: 'transparent !important',
    },

    '.cm-deletedLine': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: removedBackground,
      color: removedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
    },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: `${removedBackground} !important`,
      color: removedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `1px solid ${removedText}40`,
    },
    'del .cm-deletedText, del .cm-changedText': {
      background: 'transparent !important',
    },

    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `1px solid ${base03}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul': {
        backgroundColor: tooltipBackground,
        border: 'none',
      },
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: selection,
        color: base06,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: base03,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: base03,
        fontStyle: 'italic',
      },
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },

    '.cm-diagnostic': {
      '&-error': {
        borderLeft: `3px solid ${invalid}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${diagnosticWarning}`,
      },
      '&-info': {
        borderLeft: `3px solid ${linkColor}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${invalid}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${diagnosticWarning}`,
    },

    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#ff537055',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base02}`,
      borderRadius: generalMatching.borderRadius,
    },

    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: base03,
      border: `1px dotted ${base03}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base09}40`,
    },

    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: darkBackground,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base03,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base05,
    },

    '.cm-ghostText': {
      opacity: '0.5',
      color: base03,
    },
  },
  { dark: true },
);

const materialOceanHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base08, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base08, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base08, fontWeight: 'bold' },

  { tag: [t.name, t.deleted, t.character, t.macroName], color: base10 },
  { tag: [t.variableName], color: base10 },
  { tag: [t.propertyName], color: base08, fontStyle: 'normal' },

  { tag: [t.typeName], color: base0F },
  { tag: [t.className], color: base0F, fontStyle: 'italic' },
  { tag: [t.namespace], color: base08, fontStyle: 'italic' },

  { tag: [t.operator, t.operatorKeyword], color: base09 },
  { tag: [t.bracket], color: base03 },
  { tag: [t.brace], color: base03 },
  { tag: [t.punctuation], color: base03 },

  { tag: [t.function(t.variableName)], color: base0D },
  { tag: [t.labelName], color: base0D, fontStyle: 'italic' },
  { tag: [t.definition(t.function(t.variableName))], color: base0D },
  { tag: [t.definition(t.variableName)], color: base0D },

  { tag: t.number, color: base0E },
  { tag: t.changed, color: base0E },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base0A, fontStyle: 'italic' },
  { tag: t.self, color: base0C },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base0A,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0C },

  { tag: [t.processingInstruction, t.inserted], color: base11 },
  { tag: [t.special(t.string), t.regexp], color: base0C },
  { tag: t.string, color: base0B },

  { tag: t.definition(t.typeName), color: base0F, fontWeight: 'bold' },

  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  { tag: [t.tagName], color: base0E },
  { tag: [t.attributeName], color: base08 },

  { tag: [t.heading], fontWeight: 'bold', color: base11 },
  { tag: t.heading1, color: base0B },
  { tag: t.heading2, color: base0C },
  { tag: t.heading3, color: base0D },
  { tag: t.heading4, color: base0E },
  { tag: t.heading5, color: base0F },
  { tag: t.heading6, color: base08 },
  { tag: [t.strong], fontWeight: 'bold', color: base08 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0B },

  {
    tag: [t.link],
    color: visitedLinkColor,
    fontWeight: '500',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  {
    tag: [t.url],
    color: linkColor,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  {
    tag: [t.invalid],
    color: base06,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${invalid}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  { tag: t.constant(t.name), color: base0A },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base03 },
  { tag: t.angleBracket, color: base03 },

  { tag: t.monospace, color: base05 },
  { tag: [t.contentSeparator], color: base08 },
  { tag: t.quote, color: base03 },
]);

const materialOcean: Extension = [
  materialOceanTheme,
  syntaxHighlighting(materialOceanHighlightStyle),
];

const materialOceanMergeStyles: IMergeRevertStyles = {
  backgroundColor: tooltipBackground,
  borderColor: base03,
  buttonColor: base06,
  buttonHoverColor: base02,
};

export { materialOcean, materialOceanMergeStyles, applyMergeRevertStyles };

