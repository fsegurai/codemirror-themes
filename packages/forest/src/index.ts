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
} from '../../.helper/utils';

/**
 * Enhanced Forest theme color palette
 * -----------------------------------
 * Colors organized by natural forest elements with visual color blocks for reference
 */

// Core natural elements
const base00 = '#1a2a33'; // Background - deeper forest shade for better contrast
const base01 = '#d0d8e0'; // Foreground - clearer moonlight for better readability
// const base02 = '#2d3c44'; // Selection - dark forest floor, more defined
const base03 = '#607d8b'; // Comments - silvery bark gray, more legible

// Flora elements (accent colors)
const base04 = '#c594c5'; // Cursor - forest wildflower
const base05 = '#a9d3ab'; // Keywords - lighter, fresher leaf green
const base06 = '#4db6ac'; // Variables - clearer water reflection
const base07 = '#78aadc'; // Functions - brighter dusk sky
const base08 = '#ef5350'; // Strings - vibrant woodland berries
const base09 = '#bc8f6a'; // Numbers - rich forest soil
const base0A = '#ffb74d'; // Classes - golden sunlight through canopy
const base0B = '#9ccc65'; // Properties - fresh moss
const base0C = '#4dd0e1'; // Special chars - forest stream
const base0D = '#7986cb'; // Tags - morning mist
const base0E = '#ba68c8'; // Operators - purple wildflowers
// const base0F = '#f57f17'; // Metadata - autumn leaves

// UI-specific colors
const invalid = '#ff5252';           // Error highlight - warning red berry
const darkBackground = '#233039';    // Panel background - shadowy forest
const highlightBackground = '#314443aa'; // Active line - forest clearing with dappled light
const tooltipBackground = '#2a3b42';  // Tooltip background - darker canopy shadow
const cursor = base04;               // Cursor color
const selection = '#2c5a3acc';       // Selection - translucent forest green
const selectionMatch = '#5d482faa';  // Selection match - amber forest light
const lineNumbers = '#607d8b90';     // Line numbers - faded tree bark
const activeBracketBg = '#2c5a3a80'; // Active bracket - forest green
const activeBracketBorder = base0A;  // Active bracket border - golden sunlight

/**
 * Enhanced editor theme styles for Forest
 */
export const forestTheme = EditorView.theme(
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
        color: base01,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#4d653b80',
      outline: `1px solid ${base0A}90`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base01,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#42855c',
      color: base01,
      padding: generalSearchField.padding,

      '& span': {
        color: base01,
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
      borderRadius: '0 0 4px 4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '1px solid #3e5059',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '1px solid #3e5059',
    },
    '.cm-panel button': {
      backgroundColor: darkBackground,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#2d3d47',
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
      color: lineNumbers,
      border: generalGutter.border,
      borderRight: '1px solid #3e505980',
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground,
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
      color: lineNumbers,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base01,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: '1px solid #3e5059',
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
        borderLeft: `3px solid ${base0A}`,
      },
      '&-info': {
        borderLeft: `3px solid ${base0C}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${invalid}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${base0A}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}80`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#5d482f80',
      outline: `1px solid ${invalid}80`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base0A}40`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      color: base03,
      border: `1px dotted ${base0A}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base00}, 0 0 0 3px ${base0A}40`,
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
      backgroundColor: '#3e5059',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#4e616a',
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: '#8fa7b5',
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for Forest theme
 */
export const forestHighlightStyle = HighlightStyle.define([
  // Keywords and language constructs
  { tag: t.keyword, color: base05, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base05, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base05, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base06 },
  { tag: [t.variableName], color: base06 },
  { tag: [t.propertyName], color: base0B, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0A },
  { tag: [t.className], color: base0A, fontStyle: 'italic' },
  { tag: [t.namespace], color: base06, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0E },
  { tag: [t.bracket], color: base0E },
  { tag: [t.brace], color: base0E },
  { tag: [t.punctuation], color: base0E },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base07 },
  { tag: [t.definition(t.variableName)], color: base07 },

  // Constants and literals
  { tag: t.number, color: base09 },
  { tag: t.changed, color: base09 },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base09, fontStyle: 'italic' },
  { tag: t.self, color: base09 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base09, fontWeight: 'bold' },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base09 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base08 },
  { tag: [t.special(t.string), t.regexp], color: base08 },
  { tag: t.string, color: base08 },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0A, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0D },
  { tag: [t.attributeName], color: base0C },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base0A },
  { tag: [t.strong], fontWeight: 'bold', color: base05 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base06 },

  // Links and URLs
  { tag: [t.link], color: base0A, fontWeight: '500', textDecoration: 'underline', textUnderlinePosition: 'under' },
  {
    tag: [t.url],
    color: base0C,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  // Special states
  { tag: [t.invalid], color: base01, textDecoration: 'underline wavy', borderBottom: `1px wavy ${invalid}` },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base09 },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base0E },
  { tag: t.angleBracket, color: base0E },

  // Additional specific styles
  { tag: t.heading1, fontWeight: 'bold', color: base0A },
  { tag: t.special(t.heading1), fontWeight: 'bold', color: base0A },
  { tag: [t.heading2, t.heading3, t.heading4], fontWeight: 'bold', color: base0A },
  { tag: [t.heading5, t.heading6], color: base0A },
  { tag: t.monospace, color: base01 },
  { tag: [t.contentSeparator], color: base0C },
  { tag: t.quote, color: base03 },
]);

/**
 * Combined Forest theme extension
 */
export const forest: Extension = [
  forestTheme,
  syntaxHighlighting(forestHighlightStyle),
];