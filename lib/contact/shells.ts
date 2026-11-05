import { seeded } from "@/lib/seeded";

/** Trayectoria de un trozo de cáscara, en % del ancho del huevo y en grados. */
export interface ShellFlight {
  /** Trozo del sprite (0 = el mayor). */
  readonly piece: number;
  /** Punto de partida respecto al centro del huevo. */
  readonly startX: number;
  readonly startY: number;
  /** Desplazamiento horizontal final, cuánto sube en la cima y dónde cae. */
  readonly dx: number;
  readonly rise: number;
  readonly fall: number;
  readonly spin: number;
  /** Ancho del trozo (% del ancho del huevo). */
  readonly size: number;
  readonly delay: number;
}

export const SHELL_COUNT = 6;

/** Las mitades salen poco y caen cerca; los trozos chicos vuelan más lejos. */
const SPREAD = [46, 54, 76, 84, 104, 116] as const;
const RISE = [36, 42, 60, 66, 80, 88] as const;
const MAX_DELAY_MS = 60;

/**
 * Dos decimales: Math.sin no da los mismos últimos dígitos en el servidor y en el
 * navegador, y esa diferencia rompería la hidratación de los estilos en línea.
 */
const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Seis trozos en abanico, alternando lado (pares a la izquierda, impares a la derecha).
 * Valores fijos por canal: nada de Math.random, así el HTML del servidor y el del
 * cliente coinciden.
 */
export function shellFlights(
  channelIndex: number,
  pieceWidths: readonly number[],
): readonly ShellFlight[] {
  return Array.from({ length: SHELL_COUNT }, (_, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const jitter = seeded(i, channelIndex + 1);
    const spread = SPREAD[i] ?? SPREAD[SPREAD.length - 1]!;
    const rise = RISE[i] ?? RISE[RISE.length - 1]!;
    return {
      piece: i,
      startX: round(side * (8 + jitter * 10)),
      startY: round(-10 - jitter * 18),
      dx: round(side * (spread + jitter * 14)),
      rise: round(rise + jitter * 12),
      fall: round(34 + jitter * 22),
      spin: side * (140 + Math.round(jitter * 220)),
      size: round(pieceWidths[i] ?? 0),
      delay: Math.round(jitter * MAX_DELAY_MS),
    };
  });
}
