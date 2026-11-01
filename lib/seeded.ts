/**
 * Pseudoaleatorio fijo (0 a 1) a partir de un índice y una sal: sin Math.random, así el
 * servidor y el cliente pintan lo mismo y no hay errores de hidratación.
 */
export function seeded(index: number, salt: number): number {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}
