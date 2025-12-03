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
 * Enhanced Material Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#ffffff', // Background - pure white for clean look
  base01 = '#f5f5f5', // Lighter background (popups, statuslines)
  base02 = '#212121', // Main text - nearly black for contrast
  base03 = '#757575', // Comments, invisibles - gray 600
  base04 = '#9e9e9e', // Cursor and line numbers - gray 500
  base05 = '#424242', // Default foreground - gray 800
  base06 = '#eeeeee', // Light borders or divisions - gray 200
  base07 = '#fafafa', // Light background (gutter) - gray 50
  // Accent colors - using standard Material Design palette
  base08 = '#f44336', // Red 500
  base09 = '#ff3e00', // Deep Orange 500
  base0A = '#FF00E9FF', // Pink 500
  base0B = '#ffc107', // Amber 500 (better than yellow for light theme)
  base0C = '#ff9800', // Orange 500
  base0D = '#00acc1', // Cyan 600 (better contrast for light theme)
  base0E = '#3949ab', // Indigo 600 (better contrast for light theme)
  base0F = '#8e24aa', // Purple 600 (better contrast for light theme)
  base10 = '#43a047', // Green 600 (better contrast for light theme)
  base11 = '#00897b', // Teal 600 (better contrast for light theme)
  base12 = '#1e88e5'; // Blue 600 (better contrast for light theme)

// UI specific colors
const invalid = base08,
  highlightBackground = '#00000008', // Line highlight
  background = base00,
  tooltipBackground = base01,
  selection = '#DDEEFF', // Selection background
  selectionMatch = '#90a4ae26', // Selection match background
  cursor = base04, // Cursor color
  activeBracketBg = '#DDEEFF80', // Active bracket background
  activeBracketBorder = base0D, // Active bracket border
  diagnosticWarning = base0C, // Warning color
  linkColor = base0D, // Link color
  visitedLinkColor = base0F, // Visited link color
  hoverHighlight = '#ECEFF180'; // Hover highlight

// Diff/merge specific colors
const addedBackground = '#e6ffed80', // Light green with transparency for insertions
  removedBackground = '#ffebe980', // Light red with transparency for deletions
  addedText = '#28a745',         // Bright green for added text
  removedText = '#d73a49';       // Bright red for removed text

/**
 * Enhanced editor theme styles for Material Light
 */
const materialLightTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base02,
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
      backgroundColor: `${base02}99`,
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
      backgroundColor: '#FFA72680',
      outline: `1px solid ${base0B}`,
      color: base02,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base02,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base0D,
      color: background,
      padding: generalSearchField.padding,

      '& span': {
        color: background,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base02,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: base06,
      color: base02,
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base04}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base04}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base02,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#CFD8DC',
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: base07,
      color: base03,
      border: generalGutter.border,
      borderRight: `1px solid ${base04}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#E0E0E0',
      color: base02,
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
      transition: 'color 0.15s ease',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base02,
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
      border: `1px solid ${addedText}30`,
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
      border: `1px solid ${removedText}30`,
    },
    'del .cm-deletedText, del .cm-changedText': {
      background: 'transparent !important',
    },
    
    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `1px solid ${base04}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
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
        backgroundColor: hoverHighlight,
        color: base02,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li:hover': {
        backgroundColor: hoverHighlight,
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

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: `${invalid}20`,
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base03}30`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: base01,
      color: base03,
      border: `1px dotted ${base03}70`,
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
      background: base07,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base03,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${base07}`,
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
  { dark: false },
);

/**
 * Enhanced syntax highlighting for Material Light theme
 */
const materialLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base0D, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base0D, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base0D, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base05 },
  { tag: [t.variableName], color: base05 },
  { tag: [t.propertyName], color: base11, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0C },
  { tag: [t.className], color: base0C, fontStyle: 'italic' },
  { tag: [t.namespace], color: base0E, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0E },
  { tag: [t.bracket], color: base0F },
  { tag: [t.brace], color: base0F },
  { tag: [t.punctuation], color: base03 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base09 },
  { tag: [t.labelName], color: base12, fontStyle: 'italic' },
  { tag: [t.definition(t.function(t.variableName))], color: base09 },
  { tag: [t.definition(t.variableName)], color: base0A },

  // Constants and literals
  { tag: t.number, color: base0C },
  { tag: t.changed, color: base0C },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base0C, fontStyle: 'italic' },
  { tag: t.self, color: base0C },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base0C,
  },
  { tag: [t.atom, t.bool], color: base0F },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base10 },
  { tag: t.string, color: base10 },
  { tag: [t.special(t.string), t.regexp], color: base0A },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0A, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base0A },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base09 },
  { tag: [t.attributeName], color: base05 },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base11 },
  { tag: t.heading1, color: base12 },
  { tag: t.heading2, color: base0C },
  { tag: t.heading3, color: base0D },
  { tag: t.heading4, color: base0E },
  { tag: t.heading5, color: base0F },
  { tag: t.heading6, color: base10 },
  { tag: [t.strong], fontWeight: 'bold', color: base0E },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0C },

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
    color: base02,
    textDecoration: 'underline wavy',
    borderBottom: `1px dotted ${base08}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base09 },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base08 },
  { tag: t.angleBracket, color: base02 },

  // Additional specific styles
  { tag: t.monospace, color: base02 },
  { tag: [t.contentSeparator], color: base0D },
  { tag: t.quote, color: base10 },
]);

/**
 * Combined Material Light theme extension
 */
const materialLight: Extension = [
  materialLightTheme,
  syntaxHighlighting(materialLightHighlightStyle),
];

/**
 * Material Light merge revert styles configuration
 */
const materialLightMergeStyles: IMergeRevertStyles = {
  backgroundColor: tooltipBackground,
  borderColor: base04,
  buttonColor: base02,
  buttonHoverColor: '#CFD8DC',
};

export { materialLight, materialLightMergeStyles, applyMergeRevertStyles };
