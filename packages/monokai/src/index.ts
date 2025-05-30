import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

import {
  generalContent,
  generalCursor,
  generalGutter,
  generalLine,
  generalMatching,
  generalPanel,
  generalPlaceholder,
  generalScroller,
  generalSearchField,
  generalTooltip,
} from '@fsegurai/codemirror-theme-utils';

/**
 * Enhanced Monokai theme color definitions
 * -------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#272822'; // Background
const base01 = '#f8f8f2'; // Foreground
// const base02 = '#4a4a76'; // Selection
const base03 = '#88846f'; // Comments, invisibles
const base04 = '#f8f8f0'; // Cursor

// Accent colors
const base05 = '#F92672'; // Keyword, Storage, Tag - Pink
const base06 = '#FD971F'; // Variable, Parameter - Orange
const base07 = '#66D9EF'; // Function, Type - Blue
const base08 = '#E6DB74'; // String, RegExp - Yellow
const base09 = '#AE81FF'; // Constant, Number - Purple
const base0A = '#A6E22E'; // Class, Heading - Green

// UI specific colors
const invalid = '#F44747'; // Error color - Red
const darkBackground = '#414339'; // Gutter background
const highlightBackground = '#3e3d3257'; // Line highlight with opacity
const tooltipBackground = '#34352f'; // Tooltip background - Slightly lighter than base00
const selection = '#49483E'; // Selection background
const selectionMatch = '#75715e70'; // Selection match with opacity
const cursor = base04; // Cursor color
const activeBracketBg = '#75715E55'; // Active bracket background with opacity
const activeBracketBorder = base07; // Active bracket border - blue
const diagnosticWarning = base06; // Warning color - orange
const linkColor = base07; // Link color - blue
const visitedLinkColor = base09; // Visited link color - purple

/**
 * Enhanced editor theme styles for Monokai
 */
export const monokaiTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base01,
      backgroundColor: base00,
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
      color: base00,
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
      backgroundColor: '#49483E99',
      outline: `1px solid ${base08}`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base01,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base05,
      color: base00,
      padding: generalSearchField.padding,

      '& span': {
        color: base00,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base01,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base01,
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base03}80`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base03}80`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#49483E',
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
      color: base03,
      border: generalGutter.border,
      borderRight: '1px solid #3e3d32',
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#35352c',
      color: base01,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: base03,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base01,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: '1px solid #49483E',
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
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
        color: base01,
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
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#f9267240',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base03}50`,
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
      boxShadow: `0 0 0 2px ${base00}, 0 0 0 3px ${base07}40`,
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
      backgroundColor: '#49483E',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#5a594d',
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
 * Enhanced syntax highlighting for Monokai theme
 */
export const monokaiHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base05, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base05, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base05, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base06 },
  { tag: [t.variableName], color: base06 },
  { tag: [t.propertyName], color: base0A, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base07, fontStyle: 'italic' },
  { tag: [t.className], color: base0A, fontStyle: 'italic' },
  { tag: [t.namespace], color: base06, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base05 },
  { tag: [t.bracket], color: base01 },
  { tag: [t.brace], color: base01 },
  { tag: [t.punctuation], color: base01 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base07 },
  { tag: [t.definition(t.function(t.variableName))], color: base07 },
  { tag: [t.definition(t.variableName)], color: base06 },

  // Constants and literals
  { tag: t.number, color: base09 },
  { tag: t.changed, color: base09 },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base09, fontStyle: 'italic' },
  { tag: t.self, color: base09 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base09 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base09 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0A },
  { tag: [t.special(t.string), t.regexp], color: base08 },
  { tag: t.string, color: base08 },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base07, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base05 },
  { tag: [t.attributeName], color: base0A },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base0A },
  { tag: [t.strong], fontWeight: 'bold', color: base06 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base06 },

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
    color: base01,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${invalid}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base09 },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base01 },
  { tag: t.angleBracket, color: base01 },

  // Additional specific styles
  { tag: t.monospace, color: base01 },
  { tag: [t.contentSeparator], color: base06 },
  { tag: t.quote, color: base03 },
]);

/**
 * Combined Monokai theme extension
 */
export const monokai: Extension = [
  monokaiTheme,
  syntaxHighlighting(monokaiHighlightStyle),
];
