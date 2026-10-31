import type { CreatureSize, Depth } from "@/types/fishing";

/** Geometría de la escena, en unidades del viewBox (1120 × 520). */
export const LAKE_VIEWBOX = { width: 1120, height: 520 } as const;

export interface ScenePoint {
  readonly x: number;
  readonly y: number;
}

/** El niño y su caña se corren hacia la punta del muelle para dejar sitio a los baldes. */
export const KID_OFFSET = 140;
export const DOCK_WIDTH = 480;
/** Tablón del muelle: ahí se apoyan los baldes. */
export const PLANK_Y = 260;

/** Mano del niño (base de la caña) y punta de la caña: de ahí sale el hilo. */
export const ROD_BASE: ScenePoint = { x: 280 + KID_OFFSET, y: 240 };
export const ROD_TIP: ScenePoint = { x: 440 + KID_OFFSET, y: 100 };
/** Boya colgando de la caña y, bajo ella, el anzuelo donde se engancha la carnada. */
export const DANGLE: ScenePoint = { x: ROD_TIP.x + 6, y: ROD_TIP.y + 70 };
export const HOOK_POINT: ScenePoint = { x: DANGLE.x, y: DANGLE.y + 26 };

/** Tramo del muelle entre el farol y el niño donde van los tres baldes. */
export const BUCKET_AREA = { x: 34, width: 316 } as const;

/** Lejos es más arriba: el abismo queda cerca del horizonte. */
export const BOBBER_AT: Readonly<Record<Depth, ScenePoint>> = {
  shore: { x: 670, y: 420 },
  mid: { x: 820, y: 350 },
  deep: { x: 970, y: 300 },
};

/** Posición en porcentaje del ancho y alto de la escena (para capas HTML encima). */
export const toScenePercent = (point: ScenePoint) => ({
  left: `${(point.x / LAKE_VIEWBOX.width) * 100}%`,
  top: `${(point.y / LAKE_VIEWBOX.height) * 100}%`,
});

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
export const CANOE_BOX = { x: 640, y: 300, size: 230 } as const;

/** Desplazamiento máximo (unidades) de la boya cuando el pez tira. */
export const PULL_JITTER = 14;
