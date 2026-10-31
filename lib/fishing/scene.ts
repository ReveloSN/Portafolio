import type { CreatureSize, Depth } from "@/types/fishing";

/**
 * Única fuente de verdad de la geometría del lago. Todo se mide en porcentajes de la
 * escena (x: % del ancho, y: % del alto) sobre las capas pintadas de 2400 × 1116; el SVG
 * y las capas HTML lo convierten a sus propias unidades.
 */

/** Proporción del arte pintado (2400 × 1116 ≈ 2.15). */
export const SCENE_ASPECT = 2400 / 1116;

/** Unidades del SVG de juego: mismo aspecto que el arte, así el % coincide en ambos. */
export const LAKE_VIEWBOX = { width: 1120, height: 1120 / SCENE_ASPECT } as const;

/** Punto en unidades del viewBox. */
export interface ScenePoint {
  readonly x: number;
  readonly y: number;
}

/** Punto en porcentajes de la escena (0 a 100). */
export type ScenePercent = ScenePoint;

const PERCENT = 100;

export const toUnits = (point: ScenePercent): ScenePoint => ({
  x: (point.x / PERCENT) * LAKE_VIEWBOX.width,
  y: (point.y / PERCENT) * LAKE_VIEWBOX.height,
});

/** Posición en porcentaje para capas HTML colocadas encima de la escena. */
export const toScenePercent = (point: ScenePoint) => ({
  left: `${(point.x / LAKE_VIEWBOX.width) * PERCENT}%`,
  top: `${(point.y / LAKE_VIEWBOX.height) * PERCENT}%`,
});

/* ---------- Medidas sobre las capas pintadas ---------- */

/** Línea del horizonte: ahí terminan los árboles y empieza el agua (lago-agua.webp). */
export const HORIZON_Y = 58;

/** Muelle (lago-muelle.webp): cubierta a ~52 % del alto, del 12 % al 40 % del ancho. */
export const DOCK = { left: 12, right: 40, deckY: 52 } as const;

/** Farol sobre el muelle, centro del vidrio. */
export const LANTERN: ScenePercent = { x: 33, y: 44 };

/** El follaje del primer plano tapa la izquierda hasta aquí (lago-primer-plano.webp). */
export const FOLIAGE_FREE_X = 15;

/** Aguas de juego: donde caen la boya y nadan y saltan las criaturas. */
export const PLAY_WATER = { left: 45, right: 95, top: 62, bottom: 95 } as const;

/* ---------- Personaje, caña y carnada ---------- */

/**
 * El niño se sienta en la punta del muelle, junto al farol, con las piernas colgando.
 * Anclaje abajo al centro (las botas); `height` en % del alto de la escena.
 */
export const KID = { x: 38.5, y: 62, height: 26 } as const;

/** Manos del niño: base de la caña (medidas sobre el niño provisional). */
export const ROD_BASE_PERCENT: ScenePercent = { x: 39.6, y: 48.8 };
/** Punta de la caña, ya sobre el agua: de ahí sale el hilo y desde ahí se lanza. */
export const ROD_TIP_PERCENT: ScenePercent = { x: 52, y: 24 };
export const CAST_POINT_PERCENT = ROD_TIP_PERCENT;
/** Boya colgando de la caña y, bajo ella, el anzuelo donde se engancha la carnada. */
export const DANGLE_PERCENT: ScenePercent = { x: 52.5, y: 37.5 };
export const HOOK_PERCENT: ScenePercent = { x: 52.5, y: 42.5 };

/** Baldes: entre el borde del follaje y el farol, apoyados en la cubierta del muelle. */
export const BUCKETS = { left: FOLIAGE_FREE_X, right: 31, deckY: DOCK.deckY } as const;

/** Dónde cae la boya en cada zona: lejos es más arriba (más cerca del horizonte). */
export const BOBBER_PERCENT: Readonly<Record<Depth, ScenePercent>> = {
  shore: { x: 54, y: 80 },
  mid: { x: 70, y: 71 },
  deep: { x: 86, y: 65 },
};

/** Línea de agua para las máscaras: la criatura se recorta bajo la superficie de su zona. */
export const waterlineAt = (depth: Depth) => BOBBER_PERCENT[depth].y;

/** La canoa del final se detiene en aguas de juego, frente al muelle (anclaje abajo). */
export const CANOE_PERCENT = { x: 66, y: 92, width: 20 } as const;

/* ---------- Derivados en unidades del SVG ---------- */

export const ROD_BASE = toUnits(ROD_BASE_PERCENT);
export const ROD_TIP = toUnits(ROD_TIP_PERCENT);
export const DANGLE = toUnits(DANGLE_PERCENT);
export const HOOK_POINT = toUnits(HOOK_PERCENT);

export const BOBBER_AT: Readonly<Record<Depth, ScenePoint>> = {
  shore: toUnits(BOBBER_PERCENT.shore),
  mid: toUnits(BOBBER_PERCENT.mid),
  deep: toUnits(BOBBER_PERCENT.deep),
};

const canoeSize = (CANOE_PERCENT.width / PERCENT) * LAKE_VIEWBOX.width;
const canoeBottom = toUnits(CANOE_PERCENT);
/** Caja cuadrada de la canoa (unidades del SVG). */
export const CANOE_BOX = {
  x: canoeBottom.x - canoeSize / 2,
  y: canoeBottom.y - canoeSize,
  size: canoeSize,
} as const;

/** Caja (ancho × alto, unidades del SVG) donde se dibuja cada criatura al saltar. */
export const CREATURE_BOX: Readonly<Record<CreatureSize, { w: number; h: number }>> = {
  small: { w: 110, h: 58 },
  medium: { w: 170, h: 90 },
  large: { w: 380, h: 136 },
  huge: { w: 500, h: 226 },
};

/** Radio horizontal (unidades del SVG) de la sombra que nada bajo la boya. */
export const SHADOW_RX: Readonly<Record<CreatureSize, number>> = {
  small: 26,
  medium: 42,
  large: 70,
  huge: 110,
};

/** Desplazamiento máximo (unidades del SVG) de la boya cuando el pez tira. */
export const PULL_JITTER = 14;
