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
} from '@utils';

/**
 * Enhanced Nord theme color definitions
 * ------------------------------------
 * Colors organized by function with visual color blocks
 */

// Polar Night
const base00 = '#2e3440'; // Background - deep navy blue
const base01 = '#3b4252'; // Lighter background (popups, statuslines)
const base02 = '#434c5e'; // Selection background
const base03 = '#4c566a'; // Comments, invisibles

// Snow Storm
const base04 = '#d8dee9'; // Foreground - light blue-grey
const base05 = '#e5e9f0'; // Light foreground
const base06 = '#eceff4'; // Light background

// Frost
const base07 = '#8fbcbb'; // Moss green - function names
const base08 = '#88c0d0'; // Ice blue - classes, attributes
const base09 = '#81a1c1'; // Water blue - methods
const base0A = '#5e81ac'; // Deep blue - keywords

// Aurora
const base0B = '#bf616a'; // Red - errors, brackets
const base0C = '#d08770'; // Orange - numbers, constants
const base0D = '#ebcb8b'; // Yellow - types, classes
const base0E = '#a3be8c'; // Green - strings
const base0F = '#b48ead'; // Purple - operators, special characters

// UI specific colors
const invalid = '#d30102'; // Bright red for errors
const darkBackground = '#252a33'; // Darker background for panels
const highlightBackground = '#3b425277'; // Active line highlight with opacity
const background = base00; // Main editor background
const tooltipBackground = base01; // Tooltip background
const selection = base02; // Selection background
const selectionMatch = '#4c566a80'; // Selection match with opacity
const cursor = base04; // Cursor color
const activeBracketBg = '#4c566a55'; // Active bracket background with opacity
const activeBracketBorder = base08; // Active bracket border - ice blue
const diagnosticWarning = base0D; // Warning color - yellow
const linkColor = base09; // Link color - water blue
const visitedLinkColor = base0F; // Visited link color - purple

/**
 * Enhanced editor theme styles for Nord
 */
export const nordTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base04,
      backgroundColor: background,
      fontSize: generalContent.fontSize,
      fontFamily: 'Fira Code, Menlo, monospace',
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
      backgroundColor: '#5e81ac80',
      outline: `1px solid ${base07}`,
      color: base04,

      '& span': {
        color: base04,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base09,
      color: base06,
      padding: generalSearchField.padding,

      '& span': {
        color: base06,
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
      borderBottom: `1px solid ${base03}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base03}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base04,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base02,
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
      borderRight: `1px solid ${base02}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base01,
      color: base04,
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
      color: base04,
    },

    // Tooltips and autocomplete
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
        backgroundColor: base02,
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
        borderLeft: `3px solid ${base0B}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${diagnosticWarning}`,
      },
      '&-info': {
        borderLeft: `3px solid ${linkColor}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${base0B}`,
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
      backgroundColor: `${base0B}40`,
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
      border: `1px dotted ${base03}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base08}40`,
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
      backgroundColor: base02,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base03,
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
 * Enhanced syntax highlighting for Nord theme
 */
export const nordHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base0A, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base0A, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base0A, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base08 },
  { tag: [t.variableName], color: base04 },
  { tag: [t.propertyName], color: base08, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0D },
  { tag: [t.className], color: base0D, fontStyle: 'italic' },
  { tag: [t.namespace], color: base09, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0F },
  { tag: [t.bracket], color: base04 },
  { tag: [t.brace], color: base07 },
  { tag: [t.punctuation], color: base04 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base07 },
  { tag: [t.definition(t.function(t.variableName))], color: base07 },
  { tag: [t.definition(t.variableName)], color: base0C },

  // Constants and literals
  { tag: t.number, color: base0C },
  { tag: t.changed, color: base0F },
  { tag: t.annotation, color: base0B, fontStyle: 'italic' },
  { tag: t.modifier, color: base0F, fontStyle: 'italic' },
  { tag: t.self, color: base0F },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0C },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0F },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base07 },
  { tag: [t.special(t.string), t.regexp], color: base0F },
  { tag: t.string, color: base0E },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0D, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base0E },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0B },
  { tag: [t.attributeName], color: base0D },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base09 },
  { tag: [t.strong], fontWeight: 'bold', color: base08 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0D },

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
    color: base04,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${base0B}`,
  },
  { tag: [t.strikethrough], color: base0B, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base0C },
  { tag: t.deleted, color: base0B },
  { tag: t.squareBracket, color: base0B },
  { tag: t.angleBracket, color: base0C },

  // Additional specific styles
  { tag: t.monospace, color: base04, fontStyle: 'italic' },
  { tag: [t.contentSeparator], color: base09 },
  { tag: t.quote, color: base0F },
]);

/**
 * Combined Nord theme extension
 */
export const nord: Extension = [
  nordTheme,
  syntaxHighlighting(nordHighlightStyle),
];
