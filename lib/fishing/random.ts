/** Generador pseudoaleatorio puro (mulberry32): mismo `seed`, misma secuencia. */
export interface RandomDraw {
  readonly value: number;
  readonly seed: number;
}

const UINT32 = 2 ** 32;
const STEP = 0x6d2b79f5;

export function nextRandom(seed: number): RandomDraw {
  const next = (seed + STEP) >>> 0;
  let t = next;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  const value = ((t ^ (t >>> 14)) >>> 0) / UINT32;
  return { value, seed: next };
}

/** Elige un elemento con el sorteo dado; `null` si la lista está vacía. */
export function pick<T>(items: readonly T[], value: number): T | null {
  if (items.length === 0) return null;
  return items[Math.min(items.length - 1, Math.floor(value * items.length))] ?? null;
}
