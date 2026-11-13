/** Per-theme WCAG AA text-contrast evaluation shared by the contrast tests. */
import { composite, contrastRatio, parseColor, type Rgba, toHex } from './contrast';
import { editorCss, resolvedHighlights, ruleFor } from './themes';

export const TEXT_MIN = 4.5;

export function colorOf(decls: Record<string, string> | undefined, key: string): Rgba | undefined {
  const value = decls?.[key];
  return value ? parseColor(value) : undefined;
}

/** Failure keys for one theme, e.g. `#4c566a on active-line (1.52)`. */
export function themeFailures(extension: Parameters<typeof editorCss>[0]): string[] {
  const css = editorCss(extension);
  const root = ruleFor(css, '&');
  const background = colorOf(root, 'background-color');
  const foreground = colorOf(root, 'color');
  if (!background || background[3] < 1 || !foreground) return ['unresolved editor background or foreground'];

  const surfaces: Array<[string, Rgba]> = [['background', background]];
  const activeLine = colorOf(ruleFor(css, '.cm-activeLine'), 'background-color');
  if (activeLine) surfaces.push(['active-line', composite(activeLine, background)]);
  const selection = colorOf(ruleFor(css, '.cm-selectionBackground'), 'background-color');
  if (selection) surfaces.push(['selection', composite(selection, background)]);

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
