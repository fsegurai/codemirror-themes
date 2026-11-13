// Shared theme core: every theme package describes a palette (`ThemeDefinition`) and this module turns it into the
// CodeMirror extension. Generated into each package by `bun run generate:helpers`; edit only the copy in
// `packages/.helper/utils/`.
import { HighlightStyle, syntaxHighlighting, type TagStyle } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { type Tag, tags as t } from '@lezer/highlight';

import {
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
  type IMergeRevertStyles,
} from './utils';

/** Semantic colors (and a few composite CSS values) of the editor UI. */
export interface UiPalette {
  /** Editor background. */
  background: string;
  /** Default text color. */
  foreground: string;
  /** Caret and drop cursor color. */
  cursor: string;
  /** Selected text background. */
  selection: string;
  /** Active line background. */
  activeLine: string;
  /** Inline completion (ghost text) color. */
  ghostText: string;
  /** Focus ring of the focused editor (`box-shadow` value). */
  focusRing: string;
  searchMatch: {
    background: string;
    outline: string;
    foreground: string;
    selectedBackground: string;
    selectedForeground: string;
  };
  /** Other occurrences of the selected text. */
  selectionMatch: { background: string; outline: string };
  matchingBracket: { background: string; outline: string };
  nonMatchingBracket: { background: string; outline: string };
  panel: {
    background: string;
    foreground: string;
    /** Separator color between panels and the editor. */
    border: string;
    buttonBackground: string;
    buttonForeground: string;
    buttonHoverBackground: string;
  };
  gutter: {
    background: string;
    foreground: string;
    border: string;
    activeBackground: string;
    activeForeground: string;
    /** Fold marker color on hover. */
    foldHover: string;
  };
  foldPlaceholder: { background: string; foreground: string; border: string };
  tooltip: {
    background: string;
    border: string;
    /** Tooltip `box-shadow` value. */
    shadow: string;
    /** Background of the autocomplete list. */
    listBackground: string;
    selectedBackground: string;
    selectedForeground: string;
    /** Completion icon color. */
    icon: string;
    /** Completion detail color. */
    detail: string;
  };
  diff: {
    insertedBackground: string;
    insertedForeground: string;
    deletedBackground: string;
    deletedForeground: string;
  };
  diagnostic: { error: string; warning: string; info: string };
  scrollbar: { track: string; thumb: string; thumbHover: string };
  /** Merge view revert column, see `applyMergeRevertStyles`. */
  merge: IMergeRevertStyles;
}

/** Text style of one syntax role. */
export interface RoleStyle {
  color?: string;
  backgroundColor?: string;
  fontStyle?: string;
  fontWeight?: string;
  opacity?: number | string;
  textDecoration?: string;
  textUnderlineOffset?: string;
  textUnderlinePosition?: string;
  textShadow?: string;
  borderBottom?: string;
}

/** Roles every theme defines. */
export interface BaseSyntaxRoles {
  keyword: RoleStyle;
  operator: RoleStyle;
  punctuation: RoleStyle;
  name: RoleStyle;
  property: RoleStyle;
  function: RoleStyle;
  type: RoleStyle;
  string: RoleStyle;
  number: RoleStyle;
  constant: RoleStyle;
  comment: RoleStyle;
  meta: RoleStyle;
  tag: RoleStyle;
  attribute: RoleStyle;
  heading: RoleStyle;
  link: RoleStyle;
  url: RoleStyle;
  emphasis: RoleStyle;
  strong: RoleStyle;
  strikethrough: RoleStyle;
  invalid: RoleStyle;
  inserted: RoleStyle;
  deleted: RoleStyle;
  changed: RoleStyle;
}

/** Fine roles; when omitted they use the style of their parent role (see `ROLE_PARENTS`). */
export interface FineSyntaxRoles {
  controlKeyword: RoleStyle;
  moduleKeyword: RoleStyle;
  definitionKeyword: RoleStyle;
  operatorKeyword: RoleStyle;
  bracket: RoleStyle;
  variable: RoleStyle;
  localVariable: RoleStyle;
  variableDefinition: RoleStyle;
  self: RoleStyle;
  label: RoleStyle;
  typeDefinition: RoleStyle;
  className: RoleStyle;
  namespace: RoleStyle;
  annotation: RoleStyle;
  modifier: RoleStyle;
  attributeValue: RoleStyle;
  regexp: RoleStyle;
  escape: RoleStyle;
  unit: RoleStyle;
  docComment: RoleStyle;
  processingInstruction: RoleStyle;
  headingLevel: RoleStyle;
  list: RoleStyle;
  quote: RoleStyle;
  monospace: RoleStyle;
  contentSeparator: RoleStyle;
}

export type SyntaxRole = keyof BaseSyntaxRoles | keyof FineSyntaxRoles;
export type SyntaxRoles = BaseSyntaxRoles & Partial<FineSyntaxRoles>;

/** Parent of every fine role: an omitted fine role resolves to its parent. */
export const ROLE_PARENTS: Record<keyof FineSyntaxRoles, SyntaxRole> = {
  controlKeyword: 'keyword',
  moduleKeyword: 'keyword',
  definitionKeyword: 'keyword',
  operatorKeyword: 'operator',
  bracket: 'punctuation',
  variable: 'name',
  localVariable: 'variable',
  variableDefinition: 'variable',
  self: 'variable',
  label: 'name',
  typeDefinition: 'type',
  className: 'type',
  namespace: 'type',
  annotation: 'meta',
  modifier: 'keyword',
  attributeValue: 'string',
  regexp: 'string',
  escape: 'string',
  unit: 'number',
  docComment: 'comment',
  processingInstruction: 'meta',
  headingLevel: 'heading',
  list: 'name',
  quote: 'string',
  monospace: 'string',
  contentSeparator: 'punctuation',
};

/** Canonical tag → role table shared by every theme. */
export const SYNTAX_TAGS: ReadonlyArray<readonly [SyntaxRole, readonly Tag[]]> = [
  ['keyword', [t.keyword]],
  ['controlKeyword', [t.controlKeyword]],
  ['moduleKeyword', [t.moduleKeyword]],
  ['definitionKeyword', [t.definitionKeyword]],
  ['operatorKeyword', [t.operatorKeyword]],
  ['modifier', [t.modifier]],
  [
    'operator',
    [
      t.operator,
      t.arithmeticOperator,
      t.logicOperator,
      t.compareOperator,
      t.bitwiseOperator,
      t.updateOperator,
      t.derefOperator,
    ],
  ],
  ['punctuation', [t.punctuation, t.separator]],
  ['bracket', [t.bracket, t.brace, t.paren, t.squareBracket, t.angleBracket]],
  ['name', [t.name, t.character, t.macroName]],
  ['variable', [t.variableName]],
  ['localVariable', [t.local(t.variableName)]],
  ['variableDefinition', [t.definition(t.variableName), t.definition(t.name)]],
  ['function', [t.function(t.variableName), t.function(t.definition(t.variableName))]],
  ['self', [t.self]],
  ['label', [t.labelName]],
  ['property', [t.propertyName]],
  ['type', [t.typeName]],
  ['typeDefinition', [t.definition(t.typeName)]],
  ['className', [t.className]],
  ['namespace', [t.namespace]],
  ['tag', [t.tagName]],
  ['attribute', [t.attributeName]],
  ['attributeValue', [t.attributeValue]],
  ['string', [t.string]],
  ['regexp', [t.regexp, t.special(t.string)]],
  ['escape', [t.escape]],
  ['number', [t.number, t.integer, t.float]],
  ['unit', [t.unit]],
  ['constant', [t.atom, t.bool, t.null, t.color, t.constant(t.name), t.standard(t.name), t.special(t.variableName)]],
  ['comment', [t.comment, t.lineComment, t.blockComment]],
  ['docComment', [t.docComment]],
  ['meta', [t.meta]],
  ['processingInstruction', [t.processingInstruction]],
  ['annotation', [t.annotation]],
  ['heading', [t.heading]],
  ['headingLevel', [t.heading1, t.heading2, t.heading3, t.heading4, t.heading5, t.heading6]],
  ['list', [t.list]],
  ['quote', [t.quote]],
  ['monospace', [t.monospace]],
  ['contentSeparator', [t.contentSeparator]],
  ['link', [t.link]],
  ['url', [t.url]],
  ['emphasis', [t.emphasis]],
  ['strong', [t.strong]],
  ['strikethrough', [t.strikethrough]],
  ['invalid', [t.invalid]],
  ['inserted', [t.inserted]],
  ['deleted', [t.deleted]],
  ['changed', [t.changed]],
];

/** CSS declarations of one UI selector; `null` removes a declaration of the canonical template. */
export type UiDeclarations = Record<string, string | number | null>;

/**
 * TEMPORARY bridge that keeps each theme's pre-6.31 output byte-for-byte while it moves onto the canonical structure.
 * Removed once every theme is expressed by its palette and roles alone.
 */
export interface ThemeMigration {
  /** Per-selector overrides of the canonical UI template; unknown selectors are added. */
  ui?: Record<string, UiDeclarations>;
  /** Highlight rules applied after the canonical table (last rule wins). */
  highlight?: TagStyle[];
}

export interface ThemeDefinition {
  /** Human-readable theme name. */
  name: string;
  dark: boolean;
  ui: UiPalette;
  syntax: SyntaxRoles;
  migration?: ThemeMigration;
}

export interface DefinedTheme {
  /** Editor theme plus syntax highlighting, ready to add to an editor. */
  extension: Extension;
  /** Editor UI theme only. */
  theme: Extension;
  highlightStyle: HighlightStyle;
  mergeStyles: IMergeRevertStyles;
}

/** Canonical UI template: the same selectors for every theme, only palette values differ. */
export function uiTemplate(ui: UiPalette): Record<string, UiDeclarations> {
  return {
    '&': {
      color: ui.foreground,
      backgroundColor: ui.background,
      fontSize: generalContent.fontSize,
      fontFamily: generalContent.fontFamily,
    },
    '.cm-content': { caretColor: ui.cursor, lineHeight: generalContent.lineHeight },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: ui.cursor, borderLeftWidth: generalCursor.borderLeftWidth },
    '.cm-fat-cursor': { backgroundColor: `${ui.cursor}99`, color: ui.background },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: ui.selection },
    '.cm-selectionLayer': { zIndex: 100 },
    '.cm-searchMatch': {
      backgroundColor: ui.searchMatch.background,
      outline: `1px solid ${ui.searchMatch.outline}`,
      color: ui.searchMatch.foreground,
      borderRadius: generalSearchField.borderRadius,
    },
    '.cm-searchMatch span': { color: ui.searchMatch.foreground },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: ui.searchMatch.selectedBackground,
      color: ui.searchMatch.selectedForeground,
      padding: generalSearchField.padding,
    },
    '.cm-searchMatch.cm-searchMatch-selected span': { color: ui.searchMatch.selectedForeground },
    '.cm-search.cm-panel.cm-textfield': {
      color: ui.panel.foreground,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },
    '.cm-panels': {
      backgroundColor: ui.panel.background,
      color: ui.panel.foreground,
      borderRadius: generalPanel.borderRadius,
    },
    '.cm-panels.cm-panels-top': { borderBottom: `1px solid ${ui.panel.border}` },
    '.cm-panels.cm-panels-bottom': { borderTop: `1px solid ${ui.panel.border}` },
    '.cm-panel button': {
      backgroundColor: ui.panel.buttonBackground,
      color: ui.panel.buttonForeground,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': { backgroundColor: ui.panel.buttonHoverBackground },
    '.cm-activeLine': { backgroundColor: ui.activeLine, borderRadius: generalLine.borderRadius, zIndex: 1 },
    '.cm-gutters': {
      backgroundColor: ui.gutter.background,
      color: ui.gutter.foreground,
      border: generalGutter.border,
      borderRight: `1px solid ${ui.gutter.border}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: ui.gutter.activeBackground,
      color: ui.gutter.activeForeground,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': { fontSize: generalGutter.fontSize, lineHeight: generalGutter.lineHeight },
    '.cm-foldGutter': { fontSize: generalGutter.fontSize, lineHeight: generalGutter.lineHeight },
    '.cm-foldGutter .cm-gutterElement': { color: ui.gutter.foreground, cursor: 'pointer' },
    '.cm-foldGutter .cm-gutterElement:hover': { color: ui.gutter.foldHover },
    '.cm-insertedLine': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: ui.diff.insertedBackground,
      color: ui.diff.insertedForeground,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadius,
    },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: `${ui.diff.insertedBackground} !important`,
      color: ui.diff.insertedForeground,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadius,
      border: `1px solid ${ui.diff.insertedForeground}40`,
    },
    'ins.cm-insertedLine .cm-changedText': { background: 'transparent !important' },
    '.cm-deletedLine': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: ui.diff.deletedBackground,
      color: ui.diff.deletedForeground,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadius,
    },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: `${ui.diff.deletedBackground} !important`,
      color: ui.diff.deletedForeground,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadius,
      border: `1px solid ${ui.diff.deletedForeground}40`,
    },
    'del .cm-deletedText, del .cm-changedText': { background: 'transparent !important' },
    '.cm-tooltip': {
      backgroundColor: ui.tooltip.background,
      border: `1px solid ${ui.tooltip.border}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: ui.tooltip.shadow,
    },
    '.cm-tooltip-autocomplete > ul': { backgroundColor: ui.tooltip.listBackground, border: 'none' },
    '.cm-tooltip-autocomplete > ul > li': { padding: generalTooltip.padding, lineHeight: generalTooltip.lineHeight },
    '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
      backgroundColor: ui.tooltip.selectedBackground,
      color: ui.tooltip.selectedForeground,
      borderRadius: generalTooltip.borderRadiusSelected,
    },
    '.cm-tooltip-autocomplete > ul > li > span.cm-completionIcon': {
      color: ui.tooltip.icon,
      paddingRight: generalTooltip.paddingRight,
    },
    '.cm-tooltip-autocomplete > ul > li > span.cm-completionDetail': { color: ui.tooltip.detail, fontStyle: 'italic' },
    '.cm-tooltip .cm-tooltip-arrow:before': { borderTopColor: 'transparent', borderBottomColor: 'transparent' },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: ui.tooltip.background,
      borderBottomColor: ui.tooltip.background,
    },
    '.cm-diagnostic-error': { borderLeft: `3px solid ${ui.diagnostic.error}` },
    '.cm-diagnostic-warning': { borderLeft: `3px solid ${ui.diagnostic.warning}` },
    '.cm-diagnostic-info': { borderLeft: `3px solid ${ui.diagnostic.info}` },
    '.cm-lintPoint-error': { borderBottom: `2px wavy ${ui.diagnostic.error}` },
    '.cm-lintPoint-warning': { borderBottom: `2px wavy ${ui.diagnostic.warning}` },
    '.cm-matchingBracket': {
      backgroundColor: ui.matchingBracket.background,
      outline: `1px solid ${ui.matchingBracket.outline}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: ui.nonMatchingBracket.background,
      outline: `1px solid ${ui.nonMatchingBracket.outline}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-selectionMatch': {
      backgroundColor: ui.selectionMatch.background,
      outline: `1px solid ${ui.selectionMatch.outline}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-foldPlaceholder': {
      backgroundColor: ui.foldPlaceholder.background,
      color: ui.foldPlaceholder.foreground,
      border: `1px dotted ${ui.foldPlaceholder.border}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },
    '&.cm-focused': { outline: 'none', boxShadow: ui.focusRing },
    '& .cm-scroller::-webkit-scrollbar': { width: generalScroller.width, height: generalScroller.height },
    '& .cm-scroller::-webkit-scrollbar-track': { background: ui.scrollbar.track },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: ui.scrollbar.thumb,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${ui.scrollbar.track}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': { backgroundColor: ui.scrollbar.thumbHover },
    '.cm-ghostText': { opacity: '0.5', color: ui.ghostText },
  };
}

/** Applies migration overrides to a UI spec: `null` drops a declaration, unknown selectors are appended. */
function applyUiOverrides(
  spec: Record<string, UiDeclarations>,
  overrides: Record<string, UiDeclarations> = {},
): Record<string, Record<string, string | number>> {
  const result: Record<string, Record<string, string | number>> = {};
  const selectors = [...new Set([...Object.keys(spec), ...Object.keys(overrides)])];
  for (const selector of selectors) {
    const declarations: Record<string, string | number> = {};
    for (const [property, value] of Object.entries({ ...spec[selector], ...overrides[selector] })) {
      if (value !== null) declarations[property] = value;
    }
    if (Object.keys(declarations).length > 0) result[selector] = declarations;
  }
  return result;
}

/** Style of a role, falling back through `ROLE_PARENTS` for omitted fine roles. */
export function resolveRole(syntax: SyntaxRoles, role: SyntaxRole): RoleStyle {
  let current: SyntaxRole | undefined = role;
  while (current) {
    const style: RoleStyle | undefined = syntax[current];
    if (style) return style;
    current = ROLE_PARENTS[current as keyof FineSyntaxRoles];
  }
  return {};
}

/** Highlight rules of a theme: the canonical table followed by migration rules. */
export function highlightRules(definition: ThemeDefinition): TagStyle[] {
  const rules: TagStyle[] = SYNTAX_TAGS.map(([role, tagList]) => ({
    tag: [...tagList],
    ...resolveRole(definition.syntax, role),
  }));
  return [...rules, ...(definition.migration?.highlight ?? [])];
}

/** Builds the editor theme, the syntax highlighting and the merge view styles of a theme definition. */
export function defineTheme(definition: ThemeDefinition): DefinedTheme {
  const spec = applyUiOverrides(uiTemplate(definition.ui), definition.migration?.ui);
  const theme = EditorView.theme(spec, { dark: definition.dark });
  const highlightStyle = HighlightStyle.define(highlightRules(definition));
  return {
    extension: [theme, syntaxHighlighting(highlightStyle)],
    theme,
    highlightStyle,
    mergeStyles: { ...definition.ui.merge },
  };
}
