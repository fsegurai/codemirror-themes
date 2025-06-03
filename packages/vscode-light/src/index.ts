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
 * Enhanced VSCode Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#ffffff', // Background
  base01 = '#f3f3f3', // Lighter background (popups, statuslines)
  base02 = '#d6d6d6', // Selection background
  base03 = '#6b6b6b', // Comments, invisibles
  base04 = '#000000', // Cursor color
  base05 = '#383a42', // Default foreground
  base06 = '#1f1f1f', // Dark foreground
  base07 = '#f5f5f5', // Light background (gutter)
  // Accent colors
  base08 = '#0064ff', // Keywords, storage
  base09 = '#af00db', // Control keywords, operators
  base0A = '#0070c1', // Variables, parameters
  base0B = '#267f99', // Classes, types
  base0C = '#795e26', // Functions, attributes
  base0D = '#098658', // Numbers, constants
  base0E = '#a31515', // Strings
  base0F = '#e51400', // Errors, invalid
  base10 = '#795e26', // Modified elements
  base11 = '#008000'; // Comments

// UI specific colors
const invalid = base0F,
  highlightBackground = '#99999926', // Line highlight with transparency
  background = base00,
  tooltipBackground = base01,
  selection = '#add6ff', // Selection background
  selectionMatch = '#a8ac9480', // Selection match background with transparency
  cursor = base04, // Cursor color
  activeBracketBg = '#007acc20', // Active bracket background with transparency
  activeBracketBorder = '#007acc', // Active bracket border
  diagnosticWarning = '#bf8803', // Warning color
  linkColor = '#006ab1', // Link color
  visitedLinkColor = '#9e46d0'; // Visited link color

// Diff/merge specific colors
const addedBackground = '#ddfbe0', // Light green with transparency for insertions
  removedBackground = '#ffebec', // Light red with transparency for deletions
  addedText = '#22863a',        // VS Code Light green for added text
  removedText = '#e51400';      // VS Code Light red for removed text

/**
 * Enhanced editor theme styles for VSCode Light
 */
const vsCodeLightTheme = EditorView.theme(
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
      backgroundColor: '#bbdefb',
      outline: `1px solid ${base0A}90`,
      color: base06,
      borderRadius: generalSearchField.borderRadius,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#90caf9',
      color: base06,
      padding: generalSearchField.padding,

      '& span': {
        color: base06,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base05,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: base01,
      color: base05,
      borderRadius: '3px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base02}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base02}`,
    },
    '.cm-panel button': {
      backgroundColor: background,
      color: base05,
      border: `1px solid ${base02}`,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#e8e8e8',
      border: `1px solid ${base03}80`,
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
      color: '#237893', // VSCode's specific gutter color
      border: 'none',
      borderRight: `1px solid ${base02}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground,
      color: '#0b216f', // VSCode's specific active gutter color
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: '#237893',
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: '#0b216f',
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
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul': {
        backgroundColor: tooltipBackground,
        border: 'none',
        maxHeight: '300px',
      },
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: '#dcebfc',
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
      outline: `1px solid ${activeBracketBorder}80`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: `${base0F}20`,
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base02}70`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: base03,
      border: `1px dotted ${base03}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 1px ${base02}`,
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: background,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: '#dadada',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${background}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#cccccc',
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
 * Enhanced syntax highlighting for VSCode Light theme
 */
const vsCodeLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base08, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base09, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base08, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base05 },
  { tag: [t.variableName], color: base0A },
  { tag: [t.propertyName], color: base0A, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0B },
  { tag: [t.className], color: base0B, fontStyle: 'normal' },
  { tag: [t.namespace], color: base05, fontStyle: 'normal' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base05 },
  { tag: [t.bracket], color: base05 },
  { tag: [t.brace], color: base05 },
  { tag: [t.punctuation], color: base05 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base0C },
  { tag: [t.labelName], color: base0C, fontStyle: 'normal' },
  { tag: [t.definition(t.function(t.variableName))], color: base0C },
  { tag: [t.definition(t.variableName)], color: base0A },

  // Constants and literals
  { tag: t.number, color: base0D },
  { tag: t.changed, color: base10 },
  { tag: t.annotation, color: base10, fontStyle: 'italic' },
  { tag: t.modifier, color: base08, fontStyle: 'normal' },
  { tag: t.self, color: base08 },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base0A,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base08 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0E },
  { tag: [t.special(t.string), t.regexp], color: base09 },
  { tag: t.string, color: base0E },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0B, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base05 },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base11 },
  { tag: t.docComment, fontStyle: 'italic', color: base11 },

  // HTML/XML elements
  { tag: [t.tagName], color: base08 },
  { tag: [t.attributeName], color: base0A },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base08 },
  { tag: t.heading1, color: base08, fontWeight: 'bold' },
  { tag: t.heading2, color: base08 },
  { tag: t.heading3, color: base08 },
  { tag: t.heading4, color: base08 },
  { tag: t.heading5, color: base08 },
  { tag: t.heading6, color: base08 },
  { tag: [t.strong], fontWeight: 'bold', color: base08 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0A },

  // Links and URLs
  {
    tag: [t.link],
    color: visitedLinkColor,
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
    color: base05,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${invalid}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base0A },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base05 },
  { tag: t.angleBracket, color: base05 },

  // Additional specific styles
  { tag: t.monospace, color: base05 },
  { tag: [t.contentSeparator], color: base05 },
  { tag: t.quote, color: base11 },
]);

/**
 * Combined VSCode Light theme extension
 */
const vsCodeLight: Extension = [
  vsCodeLightTheme,
  syntaxHighlighting(vsCodeLightHighlightStyle),
];

/**
 * VS Code Light merge revert styles configuration
 */
const vsCodeLightMergeStyles: IMergeRevertStyles = {
  backgroundColor: tooltipBackground,
  borderColor: base02,
  buttonColor: base05,
  buttonHoverColor: '#e8e8e8',
};

export { vsCodeLight, vsCodeLightMergeStyles, applyMergeRevertStyles };