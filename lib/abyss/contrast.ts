/** Contraste WCAG entre colores (hex de 6 dígitos): para comprobar el texto de las placas. */

export type Rgb = readonly [number, number, number];

const HEX = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

export function parseHex(hex: string): Rgb {
  const match = HEX.exec(hex.trim());
  if (!match) throw new Error(`Color hex no válido: ${hex}`);
  return [match[1], match[2], match[3]].map((part) =>
    parseInt(part ?? "0", 16),
  ) as unknown as Rgb;
}

/** Mezcla `top` con opacidad `alpha` sobre `base` (como lo pinta el navegador). */
export function blend(top: Rgb, base: Rgb, alpha: number): Rgb {
  return top.map(
    (channel, i) => channel * alpha + (base[i] ?? 0) * (1 - alpha),
  ) as unknown as Rgb;
}

const linear = (channel: number) => {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
};

const luminance = ([r, g, b]: Rgb) =>
  0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);

/** Razón de contraste de WCAG (1 a 21). */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
}
