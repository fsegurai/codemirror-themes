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
 * Enhanced Gruvbox Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Gruvbox base colors
const dark0 = '#3c3836'; // Main foreground (text)
const dark1 = '#504945'; // Secondary foreground
const dark2 = '#665c54'; // Tertiary foreground
const dark3 = '#7c6f64'; // Quaternary foreground
const gray_244 = '#928374'; // Comments, invisibles, line highlighting

// Light/background shades
const light0 = '#fbf1c7'; // Main background
const light1 = '#ebdbb2'; // Secondary background
const light2 = '#d5c4a1'; // Tertiary background (not defined above)
const light3 = '#bdae93'; // Quaternary background
const light4 = '#a89984'; // Quinary background (not defined above)

// Accent colors
const faded_red = '#9d0006'; // Keywords, storage, operator
const faded_green = '#79740e'; // Strings, tag attributes
const faded_yellow = '#b57614'; // Functions, tag names
const faded_blue = '#076678'; // Variables
const faded_purple = '#8f3f71'; // Numbers, special constants
const faded_aqua = '#427b58'; // Types
const faded_orange = '#af3a03'; // Cursor, constants

// Simplified naming
const bg0 = light0;
const bg1 = light1;
const bg2 = light2;
const bg3 = light3;
const bg4 = light4;
const gray = gray_244;
const fg0 = dark0;
const fg1 = dark1;
const fg2 = dark2;
const fg3 = dark3;
const red = faded_red;
const green = faded_green;
const yellow = faded_yellow;
const blue = faded_blue;
const purple = faded_purple;
const aqua = faded_aqua;
const orange = faded_orange;

// UI specific colors
const invalid = red;
const darkBackground = bg1;
const highlightBackground = '#ffc42e25'; // Line highlight with transparency
const background = bg0;
const tooltipBackground = bg1;
const selection = darkBackground;
const selectionMatch = '#ffc42e40'; // Selection match background
const cursor = orange; // Cursor color
const activeBracketBg = '#d5c4a180'; // Active bracket background
const activeBracketBorder = orange; // Active bracket border
const diagnosticWarning = yellow; // Warning color
const linkColor = blue; // Link color
const visitedLinkColor = purple; // Visited link color

/**
 * Enhanced editor theme styles for Gruvbox Light
 */
export const gruvboxLightTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: fg0,
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
      color: bg0,
    },

    // Selection
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
        color: fg0,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#ffc42e80',
      outline: `1px solid ${orange}`,
      color: fg0,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: fg0,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: orange,
      color: bg0,
      padding: generalSearchField.padding,

      '& span': {
        color: bg0,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: fg0,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: bg1,
      color: fg1,
      borderRadius: '0 0 4px 4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${bg3}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${bg3}`,
    },
    '.cm-panel button': {
      backgroundColor: bg0,
      color: fg0,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: light2,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: bg1,
      color: fg3,
      border: generalGutter.border,
      borderRight: `1px solid ${bg3}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: bg2,
      color: fg0,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: fg3,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: fg0,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `1px solid ${bg3}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
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
        backgroundColor: orange + '30',
        color: fg0,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li:hover': {
        backgroundColor: orange + '15',
      },
      '& > ul > li > span.cm-completionIcon': {
        color: fg3,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: fg3,
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
      backgroundColor: '#fb492740',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${bg3}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      color: fg2,
      border: `1px dotted ${bg3}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${bg0}, 0 0 0 3px ${orange}40`,
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: bg0,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: bg3,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${bg0}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: bg4,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: gray,
    },
  },
  { dark: false },
);

/**
 * Enhanced syntax highlighting for Gruvbox Light theme
 */
export const gruvboxLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: red, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: red, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: red, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: blue },
  { tag: [t.variableName], color: blue },
  { tag: [t.propertyName], color: aqua, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: aqua },
  { tag: [t.className], color: yellow, fontStyle: 'italic' },
  { tag: [t.namespace], color: blue, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: fg0 },
  { tag: [t.bracket], color: gray },
  { tag: [t.brace], color: gray },
  { tag: [t.punctuation], color: gray },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: yellow },
  { tag: [t.definition(t.variableName)], color: blue },

  // Constants and literals
  { tag: t.number, color: purple },
  { tag: t.changed, color: purple },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: purple, fontStyle: 'italic' },
  { tag: t.self, color: purple },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: orange },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: orange },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: green },
  { tag: [t.special(t.string), t.regexp], color: green },
  { tag: t.string, color: green },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: aqua, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: gray },
  { tag: t.comment, fontStyle: 'italic', color: gray },
  { tag: t.docComment, fontStyle: 'italic', color: gray },

  // HTML/XML elements
  { tag: [t.tagName], color: red },
  { tag: [t.attributeName], color: yellow },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: yellow },
  { tag: [t.strong], fontWeight: 'bold', color: yellow },
  { tag: [t.emphasis], fontStyle: 'italic', color: green },

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
    color: fg0,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${invalid}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: orange },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: gray },
  { tag: t.angleBracket, color: gray },

  // Additional specific styles
  { tag: t.monospace, color: fg0 },
  { tag: [t.contentSeparator], color: blue },
  { tag: t.quote, color: gray },
]);

/**
 * Combined Gruvbox Light theme extension
 */
export const gruvboxLight: Extension = [
  gruvboxLightTheme,
  syntaxHighlighting(gruvboxLightHighlightStyle),
];
