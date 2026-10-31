/** Reglas del arrastre de la carnada (píxeles de pantalla). Puras y sin DOM. */
export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Box {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

export const DRAG = {
  /** Por debajo de este desplazamiento, la pulsación es un clic y no un arrastre. */
  thresholdPx: 8,
  /** Vuelo de la carnada hasta el anzuelo y regreso al balde. */
  flightMs: 280,
  returnMs: 220,
} as const;

export const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

export const hasDragged = (start: Point, point: Point) =>
  distance(start, point) >= DRAG.thresholdPx;

export const centerOf = (box: Box): Point => ({
  x: box.left + box.width / 2,
  y: box.top + box.height / 2,
});

/** La zona de enganche es un círculo: su radio es la mitad del lado de la caja. */
export function isInZone(point: Point, zone: Box): boolean {
  return distance(point, centerOf(zone)) <= zone.width / 2;
}

/** Punto relativo a una caja (para mover la carnada dentro de la escena). */
export const relativeTo = (point: Point, box: Box): Point => ({
  x: point.x - box.left,
  y: point.y - box.top,
});
