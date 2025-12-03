import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

import {
  applyMergeRevertStyles,
  generalContent,
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

/**
 * High Contrast Light theme color definitions
 * -------------------------------------------
 * Maximum contrast theme for accessibility (light variant)
 */

// Base colors - Pure white and black for maximum contrast
const base00 = '#ffffff', // Background - pure white
  base01 = '#e0e0e0', // Selection background
  base02 = '#707070', // Comments - medium grey
  base03 = '#505050', // Dark grey
  base04 = '#000000', // Foreground - pure black

  // High contrast accent colors for a light background
  darkBlue = '#0000ff',
  darkCyan = '#008080',
  darkGreen = '#008000',
  darkRed = '#c80000',
  darkMagenta = '#800080',
  darkOrange = '#d04800',
  darkPurple = '#6600cc',
  darkBrown = '#7c3400';

// UI specific colors
const invalid = darkRed,
  lightBackground = base00,
  background = base00,
  tooltipBackground = '#f0f0f0',
  selection = '#0078d4',
  selectionMatch = '#0078d480',
  cursor = darkBlue,
  activeBracketBg = '#e0e0e0',
  activeBracketBorder = darkCyan,
  diagnosticWarning = darkOrange,
  linkColor = darkBlue,
  visitedLinkColor = darkPurple;

// Diff/merge specific colors
const addedBackground = '#00800040',
  removedBackground = '#c8000040',
  addedText = darkGreen,
  removedText = darkRed;

/**
 * Enhanced editor theme styles for High Contrast Light
 */
const highContrastLightTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base04,
      backgroundColor: background,
      fontSize: generalContent.fontSize,
      fontFamily: generalContent.fontFamily,
      border: `2px solid ${base04}`,
    },

    // Content and cursor
    '.cm-content': {
      caretColor: cursor,
      lineHeight: generalContent.lineHeight,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: cursor,
      borderLeftWidth: '3px',
    },
    '.cm-fat-cursor': {
      backgroundColor: cursor,
      color: background,
      border: `2px solid ${base04}`,
    },

    // Selection
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: '#4d90fe',
        outline: `2px solid ${darkBlue}`,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#ffff00',
      outline: `2px solid ${darkOrange}`,
      color: base04,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base04,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: darkOrange,
      color: base00,
      padding: generalSearchField.padding,
      outline: `2px solid ${base04}`,

      '& span': {
        color: base00,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base04,
      backgroundColor: base00,
      border: `2px solid ${base04}`,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: lightBackground,
      color: base04,
      borderRadius: '4px',
      border: `2px solid ${base04}`,
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `2px solid ${base04}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `2px solid ${base04}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: darkBlue,
      border: `2px solid ${base04}`,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base01,
      border: `2px solid ${darkBlue}`,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: '#ffffccba',
      borderRadius: generalLine.borderRadius,
      borderLeft: `3px solid ${darkBlue}`,
      borderRight: `1px solid ${base02}`,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: lightBackground,
      color: base03,
      border: generalGutter.border,
      borderRight: `2px solid ${base04}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base01,
      color: darkBlue,
      fontWeight: 'bold',
      border: `1px solid ${base02}`,
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
      color: darkCyan,
    },

    // Diff/Merge View Styles
    '.cm-insertedLine': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: addedBackground,
      color: addedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `2px solid ${addedText}`,
    },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: `${addedBackground} !important`,
      color: addedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `2px solid ${addedText}`,
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
      border: `2px solid ${removedText}`,
    },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: `${removedBackground} !important`,
      color: removedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `2px solid ${removedText}`,
    },
    'del .cm-deletedText, del .cm-changedText': {
      background: 'transparent !important',
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `2px solid ${darkBlue}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      color: base04,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul': {
        backgroundColor: tooltipBackground,
        border: `2px solid ${base04}`,
      },
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: selection,
        color: base00,
        borderRadius: generalTooltip.borderRadiusSelected,
        border: `2px solid ${darkBlue}`,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: darkCyan,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: darkOrange,
        fontStyle: 'italic',
      },
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: darkBlue,
      borderBottomColor: darkBlue,
    },

    // Diagnostics styling
    '.cm-diagnostic': {
      '&-error': {
        borderLeft: `4px solid ${darkRed}`,
        backgroundColor: '#ff000020',
      },
      '&-warning': {
        borderLeft: `4px solid ${diagnosticWarning}`,
        backgroundColor: '#ff990020',
      },
      '&-info': {
        borderLeft: `4px solid ${linkColor}`,
        backgroundColor: '#0000ff20',
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `3px wavy ${darkRed}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `3px wavy ${diagnosticWarning}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `2px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#ff000030',
      outline: `2px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `2px solid ${darkBlue}50`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: darkBlue,
      border: `2px solid ${darkBlue}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: `3px solid ${darkBlue}`,
      outlineOffset: '2px',
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: lightBackground,
      border: `2px solid ${base04}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base03,
      border: `2px solid ${base04}`,
      borderRadius: generalScroller.borderRadius,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: darkBlue,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.7',
      color: base02,
    },
  },
  { dark: false },
);

/**
 * Enhanced syntax highlighting for High Contrast Light theme
 */
const highContrastLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: darkMagenta, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: darkMagenta, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: darkMagenta, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base04 },
  { tag: [t.variableName], color: base04 },
  { tag: [t.propertyName], color: darkBlue, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: darkCyan },
  { tag: [t.className], color: darkCyan, fontStyle: 'italic' },
  { tag: [t.namespace], color: darkOrange, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: darkCyan },
  { tag: [t.bracket], color: darkBrown },
  { tag: [t.brace], color: darkCyan },
  { tag: [t.punctuation], color: base04 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: darkBlue },
  { tag: [t.definition(t.function(t.variableName))], color: darkBlue },
  { tag: [t.definition(t.variableName)], color: darkOrange },

  // Constants and literals
  { tag: t.number, color: darkOrange },
  { tag: t.changed, color: darkOrange },
  { tag: t.annotation, color: darkRed, fontStyle: 'italic' },
  { tag: t.modifier, color: darkPurple, fontStyle: 'italic' },
  { tag: t.self, color: darkRed },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: darkOrange },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: darkOrange },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: darkGreen },
  { tag: [t.special(t.string), t.regexp], color: darkMagenta },
  { tag: t.string, color: darkGreen },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: darkCyan, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: darkBlue },

  // Comments and documentation
  { tag: t.meta, color: base02 },
  { tag: t.comment, fontStyle: 'italic', color: base02 },
  { tag: t.docComment, fontStyle: 'italic', color: base02 },

  // HTML/XML elements
  { tag: [t.tagName], color: darkMagenta },
  { tag: [t.attributeName], color: darkCyan },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: darkMagenta },
  { tag: [t.strong], fontWeight: 'bold', color: darkOrange },
  { tag: [t.emphasis], fontStyle: 'italic', color: darkMagenta },

  // Links and URLs
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

  // Special states
  {
    tag: [t.invalid],
    color: darkRed,
    textDecoration: 'underline wavy',
    borderBottom: `2px wavy ${darkRed}`,
  },
  { tag: [t.strikethrough], color: darkRed, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: darkOrange },
  { tag: t.deleted, color: darkRed },
  { tag: t.squareBracket, color: darkBrown },
  { tag: t.angleBracket, color: darkCyan },

  // Additional specific styles
  { tag: t.monospace, color: darkBlue, fontStyle: 'italic' },
  { tag: [t.contentSeparator], color: darkPurple },
  { tag: t.quote, color: darkPurple },
]);

/**
 * Combined High Contrast Light theme extension
 */
const highContrastLight: Extension = [
  highContrastLightTheme,
  syntaxHighlighting(highContrastLightHighlightStyle),
];

/**
 * High Contrast Light merge revert styles configuration
 */
const highContrastLightMergeStyles: IMergeRevertStyles = {
  backgroundColor: lightBackground,
  borderColor: darkBlue,
  buttonColor: darkBlue,
  buttonHoverColor: darkOrange,
};

export { highContrastLight, highContrastLightMergeStyles, applyMergeRevertStyles };

