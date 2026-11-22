/** Distancia mínima (px) de un deslizamiento horizontal para pasar de imagen. */
export const SWIPE_MIN_PX = 50;

/** Índice tras avanzar `delta` posiciones en una lista circular de `count` imágenes. */
export function wrapIndex(index: number, delta: number, count: number): number {
  if (count <= 0) return 0;
  return (((index + delta) % count) + count) % count;
}

/** Dirección de un deslizamiento: -1 (hacia la anterior), 1 (siguiente) o 0 (muy corto). */
export function swipeDirection(startX: number, endX: number): -1 | 0 | 1 {
  const distance = endX - startX;
  if (Math.abs(distance) < SWIPE_MIN_PX) return 0;
  return distance < 0 ? 1 : -1;
}

/** Rellena "Captura {n} de {total}" (o cualquier plantilla con esos marcadores). */
export function formatCounter(template: string, index: number, total: number): string {
  return template.replace("{n}", String(index + 1)).replace("{total}", String(total));
}
