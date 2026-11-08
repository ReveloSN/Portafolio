/** Página resultante de avanzar `delta` páginas, sin salirse de [0, total - 1]. */
export function stepPage(index: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(total - 1, Math.max(0, index + delta));
}

/** "Página {n} de {total}" con números legibles (empiezan en 1). */
export function pageLabel(template: string, index: number, total: number): string {
  return template.replace("{n}", String(index + 1)).replace("{total}", String(total));
}
