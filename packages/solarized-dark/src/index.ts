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

/**
 * Enhanced Solarized Dark theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors from Solarized palette
const base00 = '#002b36', // Background - dark blue
  base01 = '#073642', // Lighter background (popups, statuslines)
  base02 = '#586e75', // Selection background
  base03 = '#657b83', // Comments, invisibles
  base04 = '#839496', // Body text
  base05 = '#93a1a1', // Default foreground
  base06 = '#eee8d5', // Light foreground
  base07 = '#fdf6e3', // Light background
  // Accent colors from Solarized palette
  base08 = '#dc322f', // Red
  base09 = '#cb4b16', // Orange
  base0A = '#b58900', // Yellow
  base0B = '#859900', // Green
  base0C = '#2aa198', // Cyan
  base0D = '#268bd2', // Blue
  base0E = '#6c71c4', // Violet
  base0F = '#d33682'; // Magenta

// UI specific colors
const invalid = '#d30102', // Bright red for errors
  darkBackground = '#00252f', // Darker background for panels
  highlightBackground = '#99eeff0f', // Active line highlight
  background = base00, // Main editor background
  tooltipBackground = base01, // Tooltip background
  selection = '#02B8FF3F', // Selection background with opacity
  selectionMatch = '#586e7580', // Selection match with opacity
  cursor = base04, // Cursor color
  activeBracketBg = '#586e7540', // Active bracket background with opacity
  activeBracketBorder = base0D, // Active bracket border - blue
  diagnosticWarning = base0A, // Warning color - yellow
  linkColor = base0D; // Link color - blue

// Diff/merge specific colors
const addedBackground = '#2aa19820', // Solarized cyan with transparency for insertions
  removedBackground = '#dc322f20', // Solarized red with transparency for deletions
  addedText = '#859900',         // Solarized green for added text
  removedText = '#dc322f';       // Solarized red for removed text

/**
 * Enhanced editor theme styles for Solarized Dark
 */
const solarizedDarkTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base05,
      backgroundColor: background,
      fontSize: generalContent.fontSize,
      fontFamily: generalContent.fontFamily,
    },

    // Content and cursor
    '.cm-content': {
      caretColor: cursor,
      lineHeight: generalContent.lineHeight,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: cursor,
      borderLeftWidth: generalCursor.borderLeftWidth,
    },
    '.cm-fat-cursor': {
      backgroundColor: `${cursor}99`,
      color: background,
    },

    // Selection
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#586e7599',
      outline: `1px solid ${base0D}`,
      color: base06,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base06,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base0D,
      color: base07,
      padding: generalSearchField.padding,

      '& span': {
        color: base07,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base05,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base04,
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base01}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base01}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base05,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: highlightBackground,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: darkBackground,
      color: base02,
      border: generalGutter.border,
      borderRight: `1px solid ${base01}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base01,
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
      color: base02,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base04,
    },

    // Diff/Merge View Styles
    // Inserted/Added Content
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

    // Deleted/Removed Content
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

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `1px solid ${base02}`,
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

    // Diagnostics styling
    '.cm-diagnostic': {
      '&-error': {
        borderLeft: `3px solid ${base08}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${diagnosticWarning}`,
      },
      '&-info': {
        borderLeft: `3px solid ${linkColor}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${base08}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${diagnosticWarning}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: `${base08}40`,
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base02}50`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: base03,
      border: `1px dotted ${base02}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base0D}40`,
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: darkBackground,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base01,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base02,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: base03,
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for Solarized Dark theme
 */
const solarizedDarkHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base0B, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base0B, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base0B, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base0C },
  { tag: [t.variableName], color: base05 },
  { tag: [t.propertyName], color: base0C, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base09 },
  { tag: [t.className], color: base09, fontStyle: 'italic' },
  { tag: [t.namespace], color: base0F, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0E },
  { tag: [t.bracket], color: base0F },
  { tag: [t.brace], color: base0F },
  { tag: [t.punctuation], color: base04 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base0D },
  { tag: [t.labelName], color: base0F },
  { tag: [t.definition(t.function(t.variableName))], color: base0D },
  { tag: [t.definition(t.variableName)], color: base0C },

  // Constants and literals
  { tag: t.number, color: base0F },
  { tag: t.changed, color: base0F },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base0F, fontStyle: 'italic' },
  { tag: t.self, color: base0F },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base0A,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0F },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0B },
  { tag: [t.special(t.string), t.regexp], color: invalid },
  { tag: t.string, color: base0A },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base09, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base0C },

  // Comments and documentation
  { tag: t.meta, color: base08 },
  { tag: t.comment, fontStyle: 'italic', color: base02 },
  { tag: t.docComment, fontStyle: 'italic', color: base02 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0D },
  { tag: [t.attributeName], color: base05 },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base0A },
  { tag: t.heading1, color: base07 },
  { tag: t.heading2, color: base06 },
  { tag: t.heading3, color: base06 },
  { tag: t.heading4, color: base06 },
  { tag: t.heading5, color: base06 },
  { tag: t.heading6, color: base06 },
  { tag: [t.strong], fontWeight: 'bold', color: base06 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0B },

  // Links and URLs
  {
    tag: [t.link],
    color: base0C,
    fontWeight: '500',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  {
    tag: [t.url],
    color: base0A,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  // Special states
  {
    tag: [t.invalid],
    color: base02,
    textDecoration: 'underline wavy',
    borderBottom: `1px dotted ${base08}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base0A },
  { tag: t.deleted, color: base08 },
  { tag: t.squareBracket, color: base08 },
  { tag: t.angleBracket, color: base02 },

  // Additional specific styles
  { tag: t.monospace, color: base05 },
  { tag: [t.contentSeparator], color: base0A },
  { tag: t.quote, color: base0B },
]);

/**
 * Combined Solarized Dark theme extension
 */
const solarizedDark: Extension = [
  solarizedDarkTheme,
  syntaxHighlighting(solarizedDarkHighlightStyle),
];

/**
 * Solarized Dark merge revert styles configuration
 */
const solarizedDarkMergeStyles: IMergeRevertStyles = {
  backgroundColor: darkBackground,
  borderColor: base02,
  buttonColor: base05,
  buttonHoverColor: base01,
};

export { solarizedDark, solarizedDarkMergeStyles, applyMergeRevertStyles };
