/** WCAG 2.x relative-luminance contrast helpers. */

export type Rgba = [number, number, number, number];

const named: Record<string, string> = { white: '#ffffff', black: '#000000', transparent: '#00000000' };

/** Parse `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb()`, `rgba()` and a few names. Returns undefined otherwise. */
export function parseColor(input: string): Rgba | undefined {
  const value = (named[input.trim().toLowerCase()] ?? input).trim().replace(/\s*!important$/, '');
  const hex = value.match(/^#([0-9a-f]{3,8})$/i)?.[1];
  if (hex) {
    const full = hex.length <= 4 ? [...hex].map((c) => c + c).join('') : hex;
    if (full.length !== 6 && full.length !== 8) return undefined;
    const channel = (i: number) => Number.parseInt(full.slice(i, i + 2), 16);
    return [channel(0), channel(2), channel(4), full.length === 8 ? channel(6) / 255 : 1];
  }
  const fn = value.match(/^rgba?\(([^)]+)\)$/i)?.[1];
  if (fn) {
    const parts = fn
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map(Number);
    if (parts.length < 3 || parts.some(Number.isNaN)) return undefined;
    return [parts[0], parts[1], parts[2], parts[3] ?? 1];
  }
  return undefined;
}

/** Composite `top` (possibly translucent) over an opaque `bottom`. */
export function composite(top: Rgba, bottom: Rgba): Rgba {
  const a = top[3];
  return [
    Math.round(top[0] * a + bottom[0] * (1 - a)),
    Math.round(top[1] * a + bottom[1] * (1 - a)),
    Math.round(top[2] * a + bottom[2] * (1 - a)),
    1,
  ];
}

function luminance([r, g, b]: Rgba): number {
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Contrast ratio of a foreground (composited over `background` when translucent) against `background`. */
export function contrastRatio(foreground: Rgba, background: Rgba): number {
  const fg = foreground[3] < 1 ? composite(foreground, background) : foreground;
  const [hi, lo] = [luminance(fg), luminance(background)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export const toHex = ([r, g, b]: Rgba) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
