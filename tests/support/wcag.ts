/** Per-theme WCAG AA text-contrast evaluation shared by the contrast tests. */
import { composite, contrastRatio, parseColor, type Rgba, toHex } from './contrast';
import { editorCss, resolvedHighlights, ruleFor } from './themes';

export const TEXT_MIN = 4.5;

export function colorOf(decls: Record<string, string> | undefined, key: string): Rgba | undefined {
  const value = decls?.[key];
  return value ? parseColor(value) : undefined;
}

/** Editor background plus the active line and selection composited over it, when the theme styles them. */
export function themeSurfaces(extension: Parameters<typeof editorCss>[0]): Array<[string, Rgba]> | undefined {
  const css = editorCss(extension);
  const background = colorOf(ruleFor(css, '&'), 'background-color');
  if (!background || background[3] < 1) return undefined;
  const surfaces: Array<[string, Rgba]> = [['background', background]];
  const activeLine = colorOf(ruleFor(css, '.cm-activeLine'), 'background-color');
  if (activeLine) surfaces.push(['active-line', composite(activeLine, background)]);
  const selection = colorOf(ruleFor(css, '.cm-selectionBackground'), 'background-color');
  if (selection) surfaces.push(['selection', composite(selection, background)]);
  return surfaces;
}

/** Failure keys for one theme, e.g. `#4c566a on active-line (1.52)`. */
export function themeFailures(extension: Parameters<typeof editorCss>[0]): string[] {
  const css = editorCss(extension);
  const root = ruleFor(css, '&');
  const foreground = colorOf(root, 'color');
  const surfaces = themeSurfaces(extension);
  if (!surfaces || !foreground) return ['unresolved editor background or foreground'];
  const background = surfaces[0][1];

  const failures = new Map<string, number>();
  const check = (label: string, color: Rgba, surfaceName: string, surface: Rgba) => {
    const ratio = contrastRatio(color, surface);
    if (ratio >= TEXT_MIN) return;
    const key = `${label} on ${surfaceName}`;
    failures.set(key, Math.min(failures.get(key) ?? Number.POSITIVE_INFINITY, ratio));
  };

  const textColors = new Set<string>([toHex(foreground)]);
  for (const decls of Object.values(resolvedHighlights(extension))) {
    const match = decls.match(/(?:^|; )color: ([^;]+)/);
    const color = match ? parseColor(match[1]) : foreground;
    if (color) textColors.add(color[3] < 1 ? `${toHex(color)}/${color[3].toFixed(2)}` : toHex(color));
  }
  for (const label of textColors) {
    const [hex, alpha] = label.split('/');
    const color = parseColor(hex) as Rgba;
    if (alpha) color[3] = Number(alpha);
    for (const [name, surface] of surfaces) check(label, color, name, surface);
  }

  const gutters = ruleFor(css, '.cm-gutters');
  const gutterText = colorOf(gutters, 'color');
  const gutterBg = colorOf(gutters, 'background-color');
  if (gutterText) {
    const surface = gutterBg ? composite(gutterBg, background) : background;
    check(`gutter ${toHex(gutterText)}`, gutterText, 'gutter', surface);
  }

  return [...failures].map(([key, ratio]) => `${key} (${ratio.toFixed(2)})`).sort();
}

/** Minimum contrast of non-text UI indicators (WCAG 1.4.11). */
export const NON_TEXT_MIN = 3;

/** Minimum contrast between the composited selection and the composited active line. */
export const SELECTION_ON_ACTIVE_LINE_MIN = 1.15;

/** Trailing color of a shorthand such as `1px solid #abc` or `2px dashed rgba(0, 0, 0, 0.5)`. */
export function shorthandColor(value: string | undefined): Rgba | undefined {
  const match = value?.match(/(#[0-9a-f]{3,8}|rgba?\([^)]*\)|\b[a-z]+)\s*(?:!important)?$/i);
  return match ? parseColor(match[1]) : undefined;
}

/** Color of the `outline` declaration; undefined when there is none or it is `none`. */
export function outlineColor(decls: Record<string, string> | undefined): Rgba | undefined {
  const { outline } = decls ?? {};
  return outline && outline !== 'none' ? shorthandColor(outline) : undefined;
}

/** Spread rings of a `box-shadow` value made of `0 0 0 <spread> <color>` layers, innermost first. */
export function focusRings(value: string | undefined): Array<{ width: number; color: Rgba }> {
  const layers = [...(value ?? '').matchAll(/0 0 0 (\d+(?:\.\d+)?)px (#[0-9a-f]{3,8}|rgba?\([^)]*\))/gi)]
    .map((match) => ({ spread: Number(match[1]), color: parseColor(match[2]) }))
    .filter((layer): layer is { spread: number; color: Rgba } => layer.color !== undefined)
    .sort((a, b) => a.spread - b.spread);
  return layers.map((layer, index) => ({
    width: layer.spread - (index > 0 ? layers[index - 1].spread : 0),
    color: layer.color,
  }));
}

/** Failure keys for non-text UI indicators below 3:1, e.g. `cursor on active-line (2.50)`. */
export function nonTextFailures(extension: Parameters<typeof editorCss>[0]): string[] {
  const css = editorCss(extension);
  const surfaces = new Map(themeSurfaces(extension));
  const background = surfaces.get('background');
  if (!background) return ['unresolved editor background'];
  const lineSurfaces: Array<[string, Rgba]> = [['background', background]];
  const activeLine = surfaces.get('active-line');
  if (activeLine) lineSurfaces.push(['active-line', activeLine]);

  const failures: string[] = [];
  const check = (label: string, color: Rgba | undefined, on: Array<[string, Rgba]>) => {
    if (!color) {
      failures.push(`${label} missing`);
      return;
    }
    for (const [name, surface] of on) {
      const ratio = contrastRatio(color, surface);
      if (ratio < NON_TEXT_MIN) failures.push(`${label} on ${name} (${ratio.toFixed(2)})`);
    }
  };

  check('cursor', colorOf(ruleFor(css, '.cm-cursor'), 'border-left-color'), lineSurfaces);
  check('matching bracket outline', outlineColor(ruleFor(css, '.cm-matchingBracket')), lineSurfaces);

  // The current search match is indicated by its fill or its outline; one of them must stand out.
  const selected = ruleFor(css, '.cm-searchMatch.cm-searchMatch-selected');
  const fill = colorOf(selected, 'background-color');
  const outline = outlineColor(selected);
  const best = Math.max(fill ? contrastRatio(fill, background) : 0, outline ? contrastRatio(outline, background) : 0);
  if (best < NON_TEXT_MIN) failures.push(`selected search match on background (${best.toFixed(2)})`);

  // The selection-match outline must stand out when it is the only indicator (no visible fill).
  const selectionMatch = ruleFor(css, '.cm-selectionMatch');
  const matchFill = colorOf(selectionMatch, 'background-color');
  if (!matchFill || matchFill[3] === 0) {
    check('selection match outline', outlineColor(selectionMatch), [['background', background]]);
  }

  // Focus indicator: the widest visible ring of the focused editor (box-shadow spread) against the editor background.
  const focused = ruleFor(css, '&.cm-focused');
  const rings = focusRings(focused?.['box-shadow']).filter((ring) => ring.width >= 2);
  const ringRatio = Math.max(0, ...rings.map((ring) => contrastRatio(ring.color, background)));
  if (ringRatio < NON_TEXT_MIN) failures.push(`focus ring (2px or wider) on background (${ringRatio.toFixed(2)})`);

  return failures;
}

/** Contrast between the selection and the active line, both composited over the editor background. */
export function selectionOnActiveLineRatio(extension: Parameters<typeof editorCss>[0]): number | undefined {
  const surfaces = new Map(themeSurfaces(extension));
  const activeLine = surfaces.get('active-line');
  const selection = surfaces.get('selection');
  return activeLine && selection ? contrastRatio(selection, activeLine) : undefined;
}

/** Selectors of the editor UI CSS whose `del`/`ins` element compound has no `.cm-*` class on itself or an ancestor. */
export function unscopedDiffSelectors(extension: Parameters<typeof editorCss>[0]): string[] {
  const selectors = [...editorCss(extension).matchAll(/([^{}]+)\{[^}]*\}/g)].flatMap((match) =>
    match[1].split(',').map((selector) => selector.trim()),
  );
  return selectors.filter((selector) => {
    const compounds = selector.split(/\s*[\s>+~]\s*/).filter(Boolean);
    let cmContext = false;
    for (const compound of compounds) {
      const hasCmClass = /\.cm-/.test(compound);
      if (/^(del|ins)\b/.test(compound) && !hasCmClass && !cmContext) return true;
      cmContext ||= hasCmClass;
    }
    return false;
  });
}
