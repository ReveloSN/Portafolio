/** Color de cada partícula flotante del lago cuántico. */
export type QuantumHue = "teal" | "lime" | "amber";

export interface QuantumParticle {
  /** Posición en % de la escena. */
  readonly x: number;
  readonly y: number;
  readonly hue: QuantumHue;
  /** Tamaño en % del ancho de la escena. */
  readonly size: number;
  /** Ciclo de flotación y desfase (s): fijos, sin azar en el render. */
  readonly duration: number;
  readonly delay: number;
}

/**
 * Partículas sobre el agua: 14 en escritorio; en móvil el CSS deja las 5 primeras.
 * Posiciones y retrasos fijos para que el servidor y el cliente pinten lo mismo.
 */
export const QUANTUM_PARTICLES: readonly QuantumParticle[] = [
  { x: 52, y: 70, hue: "teal", size: 0.5, duration: 9, delay: 0 },
  { x: 74, y: 66, hue: "lime", size: 0.4, duration: 11, delay: -3 },
  { x: 88, y: 74, hue: "amber", size: 0.45, duration: 10, delay: -6 },
  { x: 63, y: 82, hue: "teal", size: 0.6, duration: 12, delay: -2 },
  { x: 81, y: 86, hue: "lime", size: 0.5, duration: 8, delay: -5 },
  { x: 47, y: 77, hue: "amber", size: 0.35, duration: 13, delay: -7 },
  { x: 58, y: 63, hue: "lime", size: 0.4, duration: 9.5, delay: -1 },
  { x: 92, y: 64, hue: "teal", size: 0.45, duration: 11.5, delay: -4 },
  { x: 69, y: 91, hue: "amber", size: 0.5, duration: 10.5, delay: -8 },
  { x: 55, y: 89, hue: "teal", size: 0.35, duration: 12.5, delay: -9 },
  { x: 84, y: 79, hue: "lime", size: 0.55, duration: 9, delay: -2.5 },
  { x: 77, y: 60.5, hue: "amber", size: 0.3, duration: 14, delay: -6.5 },
  { x: 49, y: 64, hue: "teal", size: 0.4, duration: 10, delay: -3.5 },
  { x: 95, y: 88, hue: "lime", size: 0.45, duration: 11, delay: -7.5 },
];
