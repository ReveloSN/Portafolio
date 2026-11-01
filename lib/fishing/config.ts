/** Reglas numéricas del juego de pesca. Todo valor ajustable vive aquí. */

/** Fuerza mínima (0 a 1) para llegar a cada zona; por debajo de MID cae en la orilla. */
export const DEPTH_THRESHOLDS = { mid: 0.34, deep: 0.67 } as const;

/** Tiempo (ms) en que la barra de fuerza va de 0 a 1; luego regresa (vaivén). */
export const CAST_CHARGE_MS = { challenge: 1400, relaxed: 2400 } as const;

/** Espera hasta la picada: entre MIN y MIN + SPREAD (ms). */
export const WAIT_MIN_MS = 1500;
export const WAIT_SPREAD_MS = 2500;

/** Modo desafío: lo que tarda en soltarse una criatura dócil (ms); las feroces, menos. */
export const BITE_PATIENCE_MS = 6000;
export const BITE_PATIENCE_DIFFICULTY_MS = 3000;

export const TENSION = {
  /** Zona verde: ahí el carrete rinde al máximo. */
  greenMin: 0.35,
  greenMax: 0.65,
  /** Por encima de este valor durante BREAK_AFTER_MS se rompe el hilo. */
  breakAt: 0.95,
  breakAfterMs: 400,
  /** Subida por segundo al recoger, más la que suma el tirón del pez. */
  reelRise: 0.4,
  fishRise: 0.35,
  /** Bajada por segundo al soltar; el tirón del pez la frena. */
  slackFall: 0.8,
  fishHold: 0.25,
  minFall: 0.15,
} as const;

export const PROGRESS = {
  /** Progreso con el que empieza la pelea: soltar de inmediato no la pierde. */
  start: 0.3,
  /** Avance por segundo recogiendo en la zona verde; fuera de ella rinde menos. */
  gain: 0.32,
  offZoneFactor: 0.35,
  /** Retroceso por segundo con el hilo suelto, más el arrastre del pez. */
  slackLoss: 0.03,
  fishDrag: 0.05,
} as const;

/** El tirón efectivo se multiplica por BASE + dificultad. */
export const DIFFICULTY_BASE = 0.5;

/** Modo relajado: sin tensión; cada pulsación y cada segundo pulsado acercan la captura. */
export const RELAXED = { tapProgress: 0.25, reelPerSecond: 0.4 } as const;

/** Paso máximo de simulación (ms): una pestaña en segundo plano no salta la pelea. */
export const MAX_STEP_MS = 50;

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
