/** Geometría del anillo dibujado (unidades de su propio viewBox cuadrado). */
export const RING_GEOMETRY = { size: 100, radius: 40, center: 50 } as const;

const DEG = Math.PI / 180;
const HALF_TURN = 180;

/** Punto del anillo a `angle` grados (0 arriba, sentido horario). */
export function ringPoint(angle: number, radius = RING_GEOMETRY.radius) {
  const { center } = RING_GEOMETRY;
  return {
    x: center + radius * Math.sin(angle * DEG),
    y: center - radius * Math.cos(angle * DEG),
  };
}

/** Arco SVG de la zona: de `start` a `start + size` grados. */
export function ringArcPath(start: number, size: number): string {
  const { radius } = RING_GEOMETRY;
  const from = ringPoint(start);
  const to = ringPoint(start + size);
  const large = size > HALF_TURN ? 1 : 0;
  return `M ${from.x} ${from.y} A ${radius} ${radius} 0 ${large} 1 ${to.x} ${to.y}`;
}
