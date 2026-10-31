import type { CreatureSize, Depth } from "@/types/fishing";

/** Geometría de la escena, en unidades del viewBox (1120 × 520). */
export const LAKE_VIEWBOX = { width: 1120, height: 520 } as const;

/** Punta de la caña: de ahí sale el hilo. */
export const ROD_TIP = { x: 440, y: 100 } as const;
/** Lejos es más arriba: el abismo queda cerca del horizonte. */
export const BOBBER_AT: Readonly<Record<Depth, { x: number; y: number }>> = {
  shore: { x: 520, y: 420 },
  mid: { x: 720, y: 350 },
  deep: { x: 930, y: 300 },
};

/** Caja (ancho × alto) donde se dibuja cada criatura al saltar. */
export const CREATURE_BOX: Readonly<Record<CreatureSize, { w: number; h: number }>> = {
  small: { w: 110, h: 58 },
  medium: { w: 170, h: 90 },
  large: { w: 380, h: 136 },
  huge: { w: 500, h: 226 },
};

/** Radio horizontal de la sombra que nada bajo la boya. */
export const SHADOW_RX: Readonly<Record<CreatureSize, number>> = {
  small: 26,
  medium: 42,
  large: 70,
  huge: 110,
};

/** La canoa del final entra por la derecha y se detiene frente al muelle. */
export const CANOE_BOX = { x: 600, y: 300, size: 230 } as const;

/** Desplazamiento máximo (unidades) de la boya cuando el pez tira. */
export const PULL_JITTER = 14;
