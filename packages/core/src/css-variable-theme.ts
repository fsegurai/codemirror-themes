// `cssVariableTheme`: a theme whose colors are CSS custom properties, so one extension follows any CSS theme (light,
// dark, high contrast) without swapping CodeMirror extensions.
import {
  type BaseSyntaxRoles,
  type DefinedTheme,
  type FineSyntaxRoles,
  ROLE_PARENTS,
  type RoleStyle,
  type SyntaxRole,
  type SyntaxRoles,
  type ThemeDefinition,
  themeFromRules,
  type UiDeclarations,
  type UiPalette,
  uiTemplate,
} from './theme-core';

export interface CssVariableThemeOptions {
  /** Custom property prefix, including the leading dashes. Default `'--cm'` (`--cm-background`, …). */
  prefix?: string;
  /**
   * CSS custom properties cannot tell CodeMirror whether the editor is dark. Set `dark: true` for a dark page: it marks
   * the theme dark (`EditorView.darkTheme`) and selects the dark fallback palette. Default `false`.
   */
  dark?: boolean;
  /**
   * Explicit mapping by variable key (the name without the prefix, e.g. `background`, `gutter-background`,
   * `syntax-keyword`). A value starting with `--` reads that custom property instead (`'--ark-surface'`); any other
   * value is used as a literal CSS value.
   */
  variables?: Partial<Record<string, string>>;
  /** Fallback value per variable key, used when the custom property is not set. */
  fallbacks?: Partial<Record<string, string>>;
  /** Theme name. Default `'CSS Variables'`. */
  name?: string;
}

/** Base colors: every other variable falls back to one of these. */
type Seed =
  | 'background'
  | 'foreground'
  | 'muted'
  | 'surface'
  | 'border-color'
  | 'accent'
  | 'selection'
  | 'active-line'
  | 'match'
  | 'error'
  | 'warning'
  | 'info'
  | 'inserted'
  | 'deleted';

/** Syntax base roles whose fallback is a literal color (the others fall back to a seed). */
type SyntaxColor =
  | 'keyword'
  | 'property'
  | 'function'
  | 'type'
  | 'string'
  | 'number'
  | 'constant'
  | 'tag'
  | 'attribute'
  | 'heading'
  | 'url';

type FallbackPalette = Record<Seed, string> & Record<`syntax-${SyntaxColor}`, string>;

/** Light fallbacks (GitHub Primer light, WCAG AA on the background). */
const LIGHT: FallbackPalette = {
  background: '#ffffff',
  foreground: '#1f2328',
  muted: '#59636e',
  surface: '#f6f8fa',
  'border-color': '#d1d9e0',
  accent: '#0969da',
  selection: '#b6e3ff',
  'active-line': '#eaeef280',
  match: '#fff8c5',
  error: '#cf222e',
  warning: '#9a6700',
  info: '#0969da',
  inserted: '#116329',
  deleted: '#82071e',
  'syntax-keyword': '#cf222e',
  'syntax-property': '#0550ae',
  'syntax-function': '#6639ba',
  'syntax-type': '#953800',
  'syntax-string': '#0a3069',
  'syntax-number': '#0550ae',
  'syntax-constant': '#0550ae',
  'syntax-tag': '#116329',
  'syntax-attribute': '#0550ae',
  'syntax-heading': '#0550ae',
  'syntax-url': '#0a3069',
};

/** Dark fallbacks (GitHub Primer dark, WCAG AA on the background). */
const DARK: FallbackPalette = {
  background: '#0d1117',
  foreground: '#e6edf3',
  muted: '#9198a1',
  surface: '#151b23',
  'border-color': '#3d444d',
  accent: '#4493f8',
  selection: '#264f78',
  'active-line': '#6e76811a',
  match: '#bb800966',
  error: '#ff7b72',
  warning: '#d29922',
  info: '#58a6ff',
  inserted: '#3fb950',
  deleted: '#ff7b72',
  'syntax-keyword': '#ff7b72',
  'syntax-property': '#79c0ff',
  'syntax-function': '#d2a8ff',
  'syntax-type': '#ffa657',
  'syntax-string': '#a5d6ff',
  'syntax-number': '#79c0ff',
  'syntax-constant': '#79c0ff',
  'syntax-tag': '#7ee787',
  'syntax-attribute': '#79c0ff',
  'syntax-heading': '#79c0ff',
  'syntax-url': '#a5d6ff',
};

const kebab = (key: string) => key.replace(/[A-Z0-9]/g, (c) => `-${c.toLowerCase()}`);

/** Resolves variable references; `literal` mode returns plain fallback values (for SVG data URLs). */
class Resolver {
  readonly names: string[] = [];
  constructor(
    private readonly options: CssVariableThemeOptions,
    private readonly palette: FallbackPalette,
    private readonly literal: boolean,
  ) {}

  /** `var(--prefix-key, fallback)`, honoring the explicit mapping and fallback overrides. */
  ref(key: string, fallback: string): string {
    const resolvedFallback = this.options.fallbacks?.[key] ?? fallback;
    if (this.literal) return resolvedFallback;
    const mapped = this.options.variables?.[key];
    if (mapped !== undefined && !mapped.startsWith('--')) return mapped;
    const name = mapped ?? `${this.options.prefix ?? '--cm'}-${key}`;
    if (!this.names.includes(name)) this.names.push(name);
    return `var(${name}, ${resolvedFallback})`;
  }

  seed(key: Seed): string {
    return this.ref(key, this.palette[key]);
  }

  /** `color` at `percent`% over transparent. */
  mix(color: string, percent: number): string {
    return this.literal ? color : `color-mix(in srgb, ${color} ${percent}%, transparent)`;
  }
}

/** UI palette built from seed references; every leaf is then exposed as its own variable by {@link exposeLeaves}. */
function seededUi(r: Resolver): UiPalette {
  const bg = r.seed('background');
  const fg = r.seed('foreground');
  const muted = r.seed('muted');
  const surface = r.seed('surface');
  const line = r.seed('border-color');
  const accent = r.seed('accent');
  const selection = r.seed('selection');
  const error = r.seed('error');
  const warning = r.seed('warning');
  const info = r.seed('info');
  const inserted = r.seed('inserted');
  const deleted = r.seed('deleted');
  return {
    background: bg,
    foreground: fg,
    border: 'none',
    cursor: accent,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: r.mix(accent, 60), border: 'none' },
    selection,
    selectionInactive: r.mix(selection, 60),
    selectionForeground: 'inherit',
    selectionOutline: 'none',
    activeLine: r.seed('active-line'),
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: muted,
    ghostTextOpacity: '0.8',
    specialChar: error,
    focusRing: `0 0 0 2px ${bg}, 0 0 0 4px ${accent}`,
    outlineWidth: '1px',
    searchMatch: {
      background: r.seed('match'),
      outline: accent,
      foreground: fg,
      shadow: 'none',
      selectedBackground: accent,
      selectedForeground: bg,
      selectedOutline: `1px solid ${accent}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: r.mix(selection, 50), outline: 'transparent' },
    matchingBracket: { background: r.mix(accent, 15), outline: accent, shadow: 'none' },
    nonMatchingBracket: { background: r.mix(error, 15), outline: error },
    panel: {
      background: surface,
      foreground: fg,
      border: line,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: bg,
      buttonForeground: fg,
      buttonBorder: `1px solid ${line}`,
      buttonHoverBackground: surface,
      buttonHoverForeground: fg,
      buttonHoverBorder: `1px solid ${accent}`,
      buttonHoverShadow: 'none',
      inputBackground: bg,
      inputBorder: `1px solid ${line}`,
    },
    gutter: {
      background: bg,
      foreground: muted,
      border: 'transparent',
      activeBackground: r.seed('active-line'),
      activeForeground: fg,
      activeFontWeight: '600',
      activeBorder: 'none',
      foldHover: fg,
    },
    foldPlaceholder: { background: surface, foreground: muted, border: line, borderStyle: 'solid' },
    tooltip: {
      background: surface,
      foreground: fg,
      border: line,
      shadow: 'none',
      listBackground: 'transparent',
      listBorder: 'none',
      hoverBackground: r.mix(accent, 10),
      selectedBackground: selection,
      selectedForeground: fg,
      selectedBorder: 'none',
      icon: accent,
      detail: muted,
    },
    diff: {
      insertedBackground: r.mix(inserted, 15),
      insertedForeground: inserted,
      insertedBorder: 'none',
      deletedBackground: r.mix(deleted, 15),
      deletedForeground: deleted,
      deletedBorder: 'none',
    },
    diagnostic: {
      error,
      warning,
      info,
      hint: muted,
      errorBackground: r.mix(error, 10),
      warningBackground: r.mix(warning, 10),
      infoBackground: r.mix(info, 10),
      borderWidth: '3px',
      underlineWidth: '1px',
    },
    scrollbar: {
      track: 'transparent',
      trackBorder: 'none',
      thumb: line,
      thumbBorder: 'none',
      thumbHover: muted,
      thumbHoverShadow: 'none',
    },
    merge: { backgroundColor: r.mix(accent, 10), borderColor: line, buttonColor: muted, buttonHoverColor: fg },
  };
}

const SEEDS = new Set<string>(Object.keys(LIGHT).filter((key) => !key.startsWith('syntax-')));

/** Wraps every palette leaf in its own variable (`--cm-gutter-background`), falling back to the seeded value. */
function exposeLeaves<T extends object>(r: Resolver, value: T, path: string[] = []): T {
  const result: Record<string, unknown> = {};
  for (const [key, leaf] of Object.entries(value)) {
    const leafPath = [...path, key];
    const name = leafPath.map(kebab).join('-');
    if (leaf !== null && typeof leaf === 'object') result[key] = exposeLeaves(r, leaf, leafPath);
    else if (typeof leaf === 'string' && !SEEDS.has(name)) result[key] = r.ref(name, leaf);
    else result[key] = leaf;
  }
  return result as T;
}

/** Syntax roles: every role color is `--cm-syntax-<role>`; fine roles fall back to their parent role. */
function variableSyntax(r: Resolver, palette: FallbackPalette): SyntaxRoles {
  const color = (role: SyntaxColor) => r.ref(`syntax-${role}`, palette[`syntax-${role}`]);
  const fromSeed = (role: string, seed: Seed) => r.ref(`syntax-${role}`, r.seed(seed));
  const base: BaseSyntaxRoles = {
    keyword: { color: color('keyword') },
    operator: { color: fromSeed('operator', 'foreground') },
    punctuation: { color: fromSeed('punctuation', 'foreground') },
    name: { color: fromSeed('name', 'foreground') },
    property: { color: color('property') },
    function: { color: color('function') },
    type: { color: color('type') },
    string: { color: color('string') },
    number: { color: color('number') },
    constant: { color: color('constant') },
    comment: { color: fromSeed('comment', 'muted'), fontStyle: 'italic' },
    meta: { color: fromSeed('meta', 'muted') },
    tag: { color: color('tag') },
    attribute: { color: color('attribute') },
    content: { color: fromSeed('content', 'foreground') },
    heading: { color: color('heading'), fontWeight: 'bold' },
    link: { color: fromSeed('link', 'accent'), textDecoration: 'underline' },
    url: { color: color('url'), textDecoration: 'underline' },
    emphasis: { color: fromSeed('emphasis', 'foreground'), fontStyle: 'italic' },
    strong: { color: fromSeed('strong', 'foreground'), fontWeight: 'bold' },
    strikethrough: { color: fromSeed('strikethrough', 'foreground'), textDecoration: 'line-through' },
    invalid: { color: fromSeed('invalid', 'error'), textDecoration: 'underline wavy' },
    inserted: { color: fromSeed('inserted', 'inserted') },
    deleted: { color: fromSeed('deleted', 'deleted') },
    changed: { color: fromSeed('changed', 'warning') },
  };
  const syntax: SyntaxRoles = { ...base };
  const resolve = (role: SyntaxRole): RoleStyle => {
    const existing = syntax[role];
    if (existing) return existing;
    const parent = resolve(ROLE_PARENTS[role as keyof FineSyntaxRoles]);
    const style: RoleStyle = { ...parent, color: r.ref(`syntax-${kebab(role)}`, parent.color ?? 'inherit') };
    syntax[role] = style;
    return style;
  };
  for (const role of Object.keys(ROLE_PARENTS) as SyntaxRole[]) resolve(role);
  return syntax;
}

function definitionFor(r: Resolver, options: CssVariableThemeOptions, palette: FallbackPalette): ThemeDefinition {
  return {
    name: options.name ?? 'CSS Variables',
    dark: options.dark ?? false,
    ui: exposeLeaves(r, seededUi(r)),
    syntax: variableSyntax(r, palette),
  };
}

/** SVG data URLs (lint icons and underlines) cannot read custom properties: they keep the literal fallback colors. */
function withLiteralImages(
  rules: Record<string, UiDeclarations>,
  literal: Record<string, UiDeclarations>,
): Record<string, UiDeclarations> {
  const result: Record<string, UiDeclarations> = {};
  for (const [selector, declarations] of Object.entries(rules)) {
    result[selector] = Object.fromEntries(
      Object.entries(declarations).map(([property, value]) =>
        typeof value === 'string' && value.includes("url('data:")
          ? [property, literal[selector]?.[property] ?? null]
          : [property, value],
      ),
    );
  }
  return result;
}

/**
 * A theme whose UI and syntax colors are CSS custom properties (`var(--cm-background, #ffffff)`, …) with literal
 * fallbacks, so one extension follows the page's CSS theme. See {@link cssVariableNames} for every variable it reads.
 */
export function cssVariableTheme(options: CssVariableThemeOptions = {}): DefinedTheme {
  const palette = options.dark ? DARK : LIGHT;
  const variables = definitionFor(new Resolver(options, palette, false), options, palette);
  const literal = definitionFor(new Resolver(options, palette, true), options, palette);
  return themeFromRules(variables, withLiteralImages(uiTemplate(variables.ui), uiTemplate(literal.ui)));
}

/** Every custom property {@link cssVariableTheme} reads with these options, in palette order. */
export function cssVariableNames(options: CssVariableThemeOptions = {}): string[] {
  const palette = options.dark ? DARK : LIGHT;
  const resolver = new Resolver(options, palette, false);
  definitionFor(resolver, options, palette);
  return [...resolver.names];
}
