/** Lógica pura de la linterna: inercia hacia el objetivo y qué queda iluminado. */

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Box {
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
}

/** Por debajo de esta distancia (px) la linterna ya llegó: se deja de animar. */
const SETTLE_PX = 0.5;

/** Un paso de inercia: avanza una fracción `factor` de lo que falta (1 = sin inercia). */
export function approach(current: Point, target: Point, factor: number): Point {
  return {
    x: current.x + (target.x - current.x) * factor,
    y: current.y + (target.y - current.y) * factor,
  };
}

export const hasSettled = (current: Point, target: Point) =>
  Math.hypot(target.x - current.x, target.y - current.y) < SETTLE_PX;

export const boxCenter = (box: Box): Point => ({
  x: (box.left + box.right) / 2,
  y: (box.top + box.bottom) / 2,
});

/** Distancia del punto al borde más cercano de la caja (0 si está dentro). */
export function distanceToBox(point: Point, box: Box): number {
  const dx = Math.max(box.left - point.x, 0, point.x - box.right);
  const dy = Math.max(box.top - point.y, 0, point.y - box.bottom);
  return Math.hypot(dx, dy);
}

/** La tarjeta cuenta como iluminada si el haz la alcanza. */
export const isLit = (light: Point, box: Box, radius: number) =>
  distanceToBox(light, box) < radius;
