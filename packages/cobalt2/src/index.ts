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
 * Cobalt2 theme color palette
 * ---------------------------------------------------------------------
 * Colors are organized by function with visual color blocks for quick reference
 */

// Base colors from the original Cobalt2 theme (exact match)
const background = '#193549', // Main editor background
  foreground = '#fff', // Main text color (exact from original)
  cursor = '#ffc600', // Cursor color (bright yellow)
  selection = '#0050A4', // Selection background
  selectionInactive = '#003b8b', // Inactive selection
  selectionHighlight = '#0050A480', // Selection highlights (with transparency)
  lineHighlight = '#99eeff33', // The current line highlights
  // UI backgrounds (exact from original)
  darkBackground = '#122738', // Sidebar, panels, gutter
  panelBackground = '#15232d', // Panel background
  gutterBackground = '#12273866', // Gutter background with transparency
  // Searches and finds colors (exact from original)
  findMatchCurrent = '#FF720066', // Currently found item
  findMatchOther = '#CAD40F66', // Other found items
  hoverHighlight = '#ffc60033', // Hover highlight
  // Word highlights (exact from original)
  wordHighlight = '#ffffff21', // Word highlight background
  // Accent colors from tokenColors (exact from original)
  blue = '#0088ff', // Comments, links
  cyan = '#80fcff', // Special keywords, module exports
  lightBlue = '#9effff', // Meta, variables, properties
  yellow = '#ffc600', // Entities, storage, functions
  orange = '#ff9d00', // Keywords, support functions
  pink = '#ff628c', // Constants, deleted text
  hotPink = '#fb94ff', // Language variables, storage.type.function
  lightPink = '#FF68B8', // Types, interfaces (semantic)
  green = '#3ad900', // Template strings
  lightGreen = '#a5ff90', // Regular strings, markup inserted
  red = '#f44542', // Invalid, errors
  errorRed = '#A22929', // Error foreground
  // Additional colors from the original palette
  gray = '#aaa', // Comments, secondary text
  lightGray = '#e1efff', // Punctuation, variables
  darkGray = '#0d3a58', // Borders, inactive elements
  parameterYellow = '#ffee80', // Parameters, template expressions
  stringQuotes = '#92fc79', // String quotes (special)
  supportTeal = '#80ffbb'; // Support classes, TypeScript types

// Diff/merge specific colors (exact from original)
const addedBackground = '#3ad90033', // Light green with transparency for insertions
  removedBackground = '#ee3a4333', // Light red with transparency for deletions
  addedText = lightGreen, // Green for added text
  removedText = pink; // Pink for removed text

/**
 * Enhanced editor theme styles for Cobalt2
 */
const cobalt2Theme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: foreground,
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
        color: foreground,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    '.cm-activeLine .cm-selectionBackground': {
      backgroundColor: `${selection}DD`,
      border: `1px solid ${cyan}40`,
      borderRadius: '2px',
    },

    '&.cm-focused .cm-activeLine .cm-selectionBackground': {
      backgroundColor: `${selection}FF`,
      border: `1px solid ${cyan}60`,
      boxShadow: `0 0 3px ${cyan}30`,
    },

    '&:not(.cm-focused) .cm-selectionBackground': {
      backgroundColor: selectionInactive,
    },

    '&:not(.cm-focused) .cm-activeLine .cm-selectionBackground': {
      backgroundColor: `${selectionInactive}CC`,
      border: `1px solid ${darkGray}80`,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: findMatchCurrent,
      outline: `1px solid ${orange}`,
      color: foreground,
      borderRadius: generalSearchField.borderRadius,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: findMatchOther,
      color: foreground,
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: yellow,
      backgroundColor: background,
      border: `1px solid ${darkGray}`,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: gray,
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${yellow}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${yellow}`,
    },
    '.cm-panel button': {
      backgroundColor: blue,
      color: foreground,
      border: `1px solid ${darkGray}`,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: orange,
      color: foreground,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: lineHighlight,
      borderRadius: generalLine.borderRadius,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: gutterBackground,
      color: gray,
      border: generalGutter.border,
      borderRight: `1px solid ${darkGray}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'transparent',
      color: foreground,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
      color: gray,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: gray,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: yellow,
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
      backgroundColor: panelBackground,
      border: `1px solid ${darkGray}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      color: gray, // Tooltip text color from the original
    },
    '.cm-tooltip-autocomplete': {
      '& > ul': {
        backgroundColor: panelBackground,
        border: 'none',
      },
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
        color: gray,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: background,
        color: yellow,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: blue,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: gray,
        fontStyle: 'italic',
      },
    },

    // Diagnostics styling
    '.cm-diagnostic': {
      '&-error': {
        borderLeft: `3px solid ${errorRed}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${yellow}`,
      },
      '&-info': {
        borderLeft: `3px solid ${blue}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${errorRed}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${yellow}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: darkGray,
      outline: `1px solid ${cursor}80`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: `${errorRed}20`,
      outline: `1px solid ${errorRed}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionHighlight,
      borderRadius: generalMatching.borderRadius,
    },

    '.cm-hoverHighlight': {
      backgroundColor: hoverHighlight,
    },

    '.cm-wordHighlight': {
      backgroundColor: wordHighlight,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      color: gray,
      border: `1px dotted ${blue}50`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
    },

    // Scrollbars - exact from original
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: darkBackground,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: '#406179cc',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#437da3cc',
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: gray,
    },

    // Whitespace characters
    '.cm-specialChar': {
      color: '#ffffff52',
    },

    // Indent guides
    '.cm-indentGuide': {
      borderLeft: '1px solid #3B5364',
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for the Cobalt2 theme
 */
const cobalt2HighlightStyle = HighlightStyle.define([
  // Comments
  { tag: t.comment, color: blue, fontStyle: 'italic' },
  { tag: t.docComment, color: blue, fontStyle: 'italic' },
  { tag: t.lineComment, color: blue, fontStyle: 'italic' },
  { tag: t.blockComment, color: blue, fontStyle: 'italic' },

  // Keywords and control flow
  { tag: t.keyword, color: orange },
  { tag: t.controlKeyword, color: orange },
  { tag: t.operatorKeyword, color: orange },
  { tag: t.moduleKeyword, color: cyan },
  { tag: t.definitionKeyword, color: hotPink },

  // Special language constructs
  { tag: t.self, color: hotPink },
  { tag: t.special(t.variableName), color: cyan },
  { tag: t.special(t.keyword), color: cyan },
  { tag: t.special(t.propertyName), color: cyan },

  // Variables - Enhanced for better distinction
  { tag: t.variableName, color: foreground },
  { tag: t.definition(t.variableName), color: foreground },
  { tag: t.local(t.variableName), color: foreground },

  // Classes and types
  { tag: t.typeName, color: lightPink, fontStyle: 'italic' },
  { tag: t.className, color: lightPink, fontStyle: 'italic' },
  { tag: t.namespace, color: lightPink, fontStyle: 'italic' },
  { tag: t.macroName, color: lightPink, fontStyle: 'italic' },

  // Functions - specific function types first
  { tag: t.function(t.variableName), color: yellow },
  { tag: t.function(t.definition(t.variableName)), color: yellow },
  { tag: t.function(t.propertyName), color: yellow },

  // Properties
  { tag: t.propertyName, color: lightBlue },
  { tag: t.definition(t.propertyName), color: lightBlue },
  { tag: t.standard(t.propertyName), color: supportTeal },

  // Constants
  { tag: t.constant(t.name), color: pink },
  { tag: t.standard(t.name), color: pink },
  { tag: t.number, color: pink },
  { tag: t.integer, color: pink },
  { tag: t.float, color: pink },
  { tag: t.bool, color: pink },
  { tag: t.atom, color: pink },
  { tag: t.null, color: pink },

  // Strings - specific string types first
  { tag: t.special(t.string), color: green },
  { tag: t.string, color: lightGreen },
  { tag: t.regexp, color: lightGreen },

  // String quotes
  { tag: t.quote, color: stringQuotes },

  // Parameters
  { tag: t.definition(t.function(t.variableName)), color: parameterYellow },

  // HTML/XML elements
  { tag: t.tagName, color: lightBlue },
  { tag: t.standard(t.tagName), color: supportTeal },
  { tag: t.attributeName, color: yellow, fontStyle: 'italic' },
  { tag: t.attributeValue, color: lightGreen },

  // Operators and punctuation
  { tag: t.operator, color: lightGray },
  { tag: t.derefOperator, color: lightGray },
  { tag: t.arithmeticOperator, color: lightGray },
  { tag: t.logicOperator, color: lightGray },
  { tag: t.bitwiseOperator, color: lightGray },
  { tag: t.compareOperator, color: lightGray },
  { tag: t.updateOperator, color: lightGray },
  { tag: t.punctuation, color: lightGray },
  { tag: t.bracket, color: lightGray },
  { tag: t.brace, color: lightGray },
  { tag: t.squareBracket, color: lightGray },
  { tag: t.paren, color: yellow },
  { tag: t.angleBracket, color: lightGray },

  // Storage and function keywords
  { tag: t.modifier, color: yellow, fontStyle: 'italic' },

  // Meta and annotations
  { tag: t.meta, color: lightBlue },
  { tag: t.annotation, color: yellow, fontStyle: 'italic' },
  { tag: t.processingInstruction, color: yellow },

  // Markdown elements
  { tag: t.heading, color: yellow, fontWeight: 'bold' },
  { tag: t.heading1, color: yellow, fontWeight: 'bold' },
  { tag: t.heading2, color: yellow, fontWeight: 'bold' },
  { tag: t.heading3, color: yellow, fontWeight: 'bold' },
  { tag: t.heading4, color: yellow, fontWeight: 'bold' },
  { tag: t.heading5, color: yellow, fontWeight: 'bold' },
  { tag: t.heading6, color: yellow, fontWeight: 'bold' },
  { tag: t.contentSeparator, color: yellow },
  { tag: t.strong, color: lightBlue, fontWeight: 'bold' },
  { tag: t.emphasis, color: lightBlue, fontStyle: 'italic' },
  { tag: t.list, color: yellow },

  // Code blocks and inline code - Enhanced styling
  { tag: t.monospace, color: lightBlue },
  { tag: t.special(t.monospace), color: green },
  { tag: t.strikethrough, color: gray, textDecoration: 'line-through' },

  // Links and URLs
  { tag: t.link, color: blue },
  { tag: t.url, color: lightBlue },

  // Special states
  { tag: t.invalid, color: red },
  { tag: t.deleted, color: pink },
  { tag: t.inserted, color: lightGreen },
  { tag: t.changed, color: yellow },

  // Language-specific: CSS
  { tag: t.unit, color: parameterYellow }, // CSS units


  // Entity names
  { tag: t.labelName, color: yellow },
  { tag: t.escape, color: yellow },
]);

/**
 * Combined Cobalt2 theme extension
 */
const cobalt2: Extension = [
  cobalt2Theme,
  syntaxHighlighting(cobalt2HighlightStyle),
];

/**
 * Cobalt2 merge revert styles configuration
 */
const cobalt2MergeStyles: IMergeRevertStyles = {
  backgroundColor: panelBackground,
  borderColor: darkGray,
  buttonColor: gray,
  buttonHoverColor: darkGray,
};

export { cobalt2, cobalt2MergeStyles, applyMergeRevertStyles };
