/** Datos de vuelo de una luciérnaga; deterministas para que servidor y cliente coincidan. */
export interface FireflyFlight {
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly sprite: number;
  readonly path: number;
  readonly duration: number;
  readonly delay: number;
  readonly blink: number;
}

const PATHS = 3;
const SPRITES = 6;

/** Pseudoaleatorio fijo a partir del índice (sin Math.random: evita errores de hidratación). */
function seeded(index: number, salt: number): number {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function makeFlights(count: number): readonly FireflyFlight[] {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(4 + seeded(i, 1) * 90),
    y: Math.round(8 + seeded(i, 2) * 80),
    size: Number((1.8 + seeded(i, 3) * 1.6).toFixed(2)),
    sprite: i % SPRITES,
    path: i % PATHS,
    duration: Math.round(10 + seeded(i, 4) * 8),
    delay: -Math.round(seeded(i, 5) * 12),
    blink: Number((2 + seeded(i, 6) * 2.5).toFixed(1)),
  }));
}
