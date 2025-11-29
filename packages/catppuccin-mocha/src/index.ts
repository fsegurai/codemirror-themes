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
 * Catppuccin Mocha theme color definitions
 * ----------------------------------------
 * A soothing pastel theme with warm tones
 */

// Base colors (Mocha variant)
const base00 = '#1e1e2e', // Background - dark navy
  base01 = '#313244', // Selection background
  base02 = '#45475a', // Comments
  base03 = '#585b70', // Dark grey
  base04 = '#cdd6f4', // Foreground - light blue
  base05 = '#f5e0dc', // Light foreground

  // Catppuccin Mocha colors
  rosewater = '#f5e0dc',
  flamingo = '#f2cdcd',
  pink = '#f5c2e7',
  mauve = '#cba6f7',
  red = '#f38ba8',
  maroon = '#eba0ac',
  peach = '#fab387',
  yellow = '#f9e2af',
  green = '#a6e3a1',
  teal = '#94e2d5',
  sky = '#89dceb',
  sapphire = '#74c7ec',
  blue = '#89b4fa',
  lavender = '#b4befe';

// UI specific colors
const invalid = '#f38ba8',
  darkBackground = '#181825',
  background = base00,
  tooltipBackground = base01,
  selectionMatch = '#45475a80',
  cursor = rosewater,
  activeBracketBg = '#45475a55',
  activeBracketBorder = lavender,
  diagnosticWarning = yellow,
  linkColor = blue,
  visitedLinkColor = mauve;

// Diff/merge specific colors
const addedBackground = '#a6e3a140',
  removedBackground = '#f38ba840',
  addedText = green,
  removedText = red;

/**
 * Enhanced editor theme styles for Catppuccin Mocha
 */
const catppuccinMochaTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base04,
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
        backgroundColor: '#585b7080',
        outline: `1px solid ${mauve}`,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#89b4fa40',
      outline: `1px solid ${sapphire}`,
      color: base04,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base04,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: blue,
      color: base00,
      padding: generalSearchField.padding,

      '& span': {
        color: base00,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base04,
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
      borderBottom: `1px solid ${base02}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base02}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base04,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base01,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: '#3a3a5266',
      borderRadius: generalLine.borderRadius,
      borderLeft: `2px solid ${lavender}`,
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
      color: base04,
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
        backgroundColor: base01,
        color: base05,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: base02,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: base02,
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
        borderLeft: `3px solid ${red}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${diagnosticWarning}`,
      },
      '&-info': {
        borderLeft: `3px solid ${linkColor}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${red}`,
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
      backgroundColor: `${red}40`,
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base01}50`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: base02,
      border: `1px dotted ${base02}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${lavender}40`,
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
      color: base02,
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for Catppuccin Mocha theme
 */
const catppuccinMochaHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: mauve, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: mauve, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: mauve, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base04 },
  { tag: [t.variableName], color: base04 },
  { tag: [t.propertyName], color: blue, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: yellow },
  { tag: [t.className], color: yellow, fontStyle: 'italic' },
  { tag: [t.namespace], color: peach, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: sky },
  { tag: [t.bracket], color: base03 },
  { tag: [t.brace], color: teal },
  { tag: [t.punctuation], color: base03 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: blue },
  { tag: [t.definition(t.function(t.variableName))], color: blue },
  { tag: [t.definition(t.variableName)], color: peach },

  // Constants and literals
  { tag: t.number, color: peach },
  { tag: t.changed, color: yellow },
  { tag: t.annotation, color: red, fontStyle: 'italic' },
  { tag: t.modifier, color: mauve, fontStyle: 'italic' },
  { tag: t.self, color: red },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: peach },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: peach },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: green },
  { tag: [t.special(t.string), t.regexp], color: pink },
  { tag: t.string, color: green },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: yellow, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: flamingo },

  // Comments and documentation
  { tag: t.meta, color: base02 },
  { tag: t.comment, fontStyle: 'italic', color: base02 },
  { tag: t.docComment, fontStyle: 'italic', color: base02 },

  // HTML/XML elements
  { tag: [t.tagName], color: pink },
  { tag: [t.attributeName], color: yellow },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: mauve },
  { tag: [t.strong], fontWeight: 'bold', color: maroon },
  { tag: [t.emphasis], fontStyle: 'italic', color: pink },

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
    color: red,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${red}`,
  },
  { tag: [t.strikethrough], color: red, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: peach },
  { tag: t.deleted, color: red },
  { tag: t.squareBracket, color: maroon },
  { tag: t.angleBracket, color: sky },

  // Additional specific styles
  { tag: t.monospace, color: teal, fontStyle: 'italic' },
  { tag: [t.contentSeparator], color: sapphire },
  { tag: t.quote, color: lavender },
]);

/**
 * Combined Catppuccin Mocha theme extension
 */
const catppuccinMocha: Extension = [
  catppuccinMochaTheme,
  syntaxHighlighting(catppuccinMochaHighlightStyle),
];

/**
 * Catppuccin Mocha merge revert styles configuration
 */
const catppuccinMochaMergeStyles: IMergeRevertStyles = {
  backgroundColor: darkBackground,
  borderColor: base02,
  buttonColor: base04,
  buttonHoverColor: base01,
};

export { catppuccinMocha, catppuccinMochaMergeStyles, applyMergeRevertStyles };

