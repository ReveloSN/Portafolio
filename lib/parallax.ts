/** Desplazamiento de una capa según las variables --mx/--my que publica useParallax. */
export function layerShift(x: number, y: number, factor = -1): string {
  return `translate(calc(var(--mx, 0) * ${x * factor}px), calc(var(--my, 0) * ${y * factor}px))`;
}
