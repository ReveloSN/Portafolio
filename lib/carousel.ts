import { interpolate } from "./utils";

export type CarouselOffset = -1 | 0 | 1;

/** Lleva cualquier índice (también negativo o mayor que `count`) al rango [0, count). */
export function wrapIndex(index: number, count: number): number {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
}

/** Posición de `item` respecto al activo, normalizada: anterior (-1), activo (0) o siguiente (1). */
export function carouselOffset(
  item: number,
  active: number,
  count: number,
): CarouselOffset {
  const diff = wrapIndex(item - active, count);
  if (diff === 0) return 0;
  return diff === 1 ? 1 : -1;
}

/** Nombre accesible de un punto: sustituye `{n}` (posición, desde 1) y `{total}` en la plantilla. */
export function carouselDotLabel(template: string, index: number, total: number): string {
  return interpolate(template, { n: index + 1, total });
}
