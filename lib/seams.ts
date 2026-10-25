/**
 * Fondo de sección con uniones suaves: arriba y abajo se funde (en --seam-blend)
 * con el color de la costura, así el final de una sección es EXACTAMENTE el inicio
 * de la siguiente aunque el fondo base sea un degradado radial.
 */
export function seamBackground(
  startToken: string,
  endToken: string,
  base: string,
): string {
  return [
    `linear-gradient(to bottom, var(${startToken}) 0, transparent var(--seam-blend))`,
    `linear-gradient(to top, var(${endToken}) 0, transparent var(--seam-blend))`,
    base,
  ].join(", ");
}
