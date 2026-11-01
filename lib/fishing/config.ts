/** Reglas numéricas del juego de pesca. Todo valor ajustable vive aquí. */

/** Vuelo de la boya desde la caña hasta el punto elegido (ms); coincide con el CSS. */
export const CAST_FLIGHT_MS = 750;

/** Espera hasta la picada: entre MIN y MIN + SPREAD (ms). */
export const WAIT_MIN_MS = 1500;
export const WAIT_SPREAD_MS = 2500;

/** Modo desafío: lo que tarda en soltarse una criatura dócil (ms); las feroces, menos. */
export const BITE_PATIENCE_MS = 6000;
export const BITE_PATIENCE_DIFFICULTY_MS = 3000;

/** Minijuego del anillo (ángulos en grados). El ajuste de cada criatura va en sus datos. */
export const RING = {
  /** La zona nace al menos este ángulo por delante de la aguja: siempre se la ve llegar. */
  leadDeg: 100,
  /** Tras cada acierto la zona se achica y la aguja acelera. */
  shrink: 0.8,
  speedUp: 1.15,
  minZoneDeg: 26,
  /** Fallos con los que se escapa en desafío. */
  maxMisses: 2,
  /** Modo relajado: zona el doble de ancha y aguja a la mitad; fallar no cuesta nada. */
  relaxedZoneFactor: 2,
  relaxedSpeedFactor: 0.5,
} as const;

/** Semilla por defecto: el primer render es idéntico en servidor y cliente. */
export const DEFAULT_SEED = 0x5eed;
