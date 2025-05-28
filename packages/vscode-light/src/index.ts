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
 * Enhanced VSCode Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#ffffff'; // Background
const base01 = '#f3f3f3'; // Lighter background (popups, statuslines)
const base02 = '#d6d6d6'; // Selection background
const base03 = '#6b6b6b'; // Comments, invisibles
const base04 = '#000000'; // Cursor color
const base05 = '#383a42'; // Default foreground
const base06 = '#1f1f1f'; // Dark foreground
const base07 = '#f5f5f5'; // Light background (gutter)

// Accent colors
const base_blue = '#0064ff'; // Keywords, storage
const base_purple = '#af00db'; // Control keywords, operators
const base_lightblue = '#0070c1'; // Variables, parameters
const base_cyan = '#267f99'; // Classes, types
const base_yellow = '#795e26'; // Functions, attributes
const base_green = '#098658'; // Numbers, constants
const base_orange = '#a31515'; // Strings
const base_red = '#e51400'; // Errors, invalid
const base_darkOrange = '#795e26'; // Modified elements
const base_lime = '#008000'; // Comments

// UI specific colors
const invalid = base_red;
const highlightBackground = '#99999926'; // Line highlight with transparency
const background = base00;
const tooltipBackground = base01;
const selection = '#add6ff'; // Selection background
const selectionMatch = '#a8ac9480'; // Selection match background with transparency
const cursor = base04; // Cursor color
const activeBracketBg = '#007acc20'; // Active bracket background with transparency
const activeBracketBorder = '#007acc'; // Active bracket border
const diagnosticWarning = '#bf8803'; // Warning color
const linkColor = '#006ab1'; // Link color
const visitedLinkColor = '#9e46d0'; // Visited link color

/**
 * Enhanced editor theme styles for VSCode Light
 */
export const vsCodeLightTheme = EditorView.theme(
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
      outline: `1px solid ${base_lightblue}90`,
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
      backgroundColor: `${base_red}20`,
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
export const vsCodeLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base_blue, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base_purple, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base_blue, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base05 },
  { tag: [t.variableName], color: base_lightblue },
  { tag: [t.propertyName], color: base_lightblue, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base_cyan },
  { tag: [t.className], color: base_cyan, fontStyle: 'normal' },
  { tag: [t.namespace], color: base05, fontStyle: 'normal' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base05 },
  { tag: [t.bracket], color: base05 },
  { tag: [t.brace], color: base05 },
  { tag: [t.punctuation], color: base05 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base_yellow },
  { tag: [t.labelName], color: base_yellow, fontStyle: 'normal' },
  { tag: [t.definition(t.function(t.variableName))], color: base_yellow },
  { tag: [t.definition(t.variableName)], color: base_lightblue },

  // Constants and literals
  { tag: t.number, color: base_green },
  { tag: t.changed, color: base_darkOrange },
  { tag: t.annotation, color: base_darkOrange, fontStyle: 'italic' },
  { tag: t.modifier, color: base_blue, fontStyle: 'normal' },
  { tag: t.self, color: base_blue },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base_lightblue,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base_blue },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base_orange },
  { tag: [t.special(t.string), t.regexp], color: base_purple },
  { tag: t.string, color: base_orange },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base_cyan, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base05 },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base_lime },
  { tag: t.docComment, fontStyle: 'italic', color: base_lime },

  // HTML/XML elements
  { tag: [t.tagName], color: base_blue },
  { tag: [t.attributeName], color: base_lightblue },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base_blue },
  { tag: t.heading1, color: base_blue, fontWeight: 'bold' },
  { tag: t.heading2, color: base_blue },
  { tag: t.heading3, color: base_blue },
  { tag: t.heading4, color: base_blue },
  { tag: t.heading5, color: base_blue },
  { tag: t.heading6, color: base_blue },
  { tag: [t.strong], fontWeight: 'bold', color: base_blue },
  { tag: [t.emphasis], fontStyle: 'italic', color: base_lightblue },

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
  { tag: t.constant(t.name), color: base_lightblue },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base05 },
  { tag: t.angleBracket, color: base05 },

  // Additional specific styles
  { tag: t.monospace, color: base05 },
  { tag: [t.contentSeparator], color: base05 },
  { tag: t.quote, color: base_lime },
]);

/**
 * Combined VSCode Light theme extension
 */
export const vsCodeLight: Extension = [
  vsCodeLightTheme,
  syntaxHighlighting(vsCodeLightHighlightStyle),
];
