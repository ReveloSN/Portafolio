import type { CreatureSize, Depth } from "@/types/fishing";
import type { LakeLayerId } from "@/types/lake";

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

/** Patas del muelle: centro, punto donde entran al agua y ancho (lago-muelle.webp). */
export const DOCK_POSTS: readonly { x: number; y: number; width: number }[] = [
  { x: 9.7, y: 75.5, width: 4 },
  { x: 14, y: 72.4, width: 2.9 },
  { x: 25.5, y: 73.9, width: 6 },
  { x: 37.3, y: 72.5, width: 3 },
];

/** Sombra del muelle sobre el agua, bajo la cubierta. */
export const DOCK_SHADOW = {
  left: DOCK.left,
  right: DOCK.right,
  top: HORIZON_Y,
  bottom: 70,
} as const;

/** Columna del reflejo de la luna sobre el agua (lago-agua.webp). */
export const MOON_REFLECTION = {
  x: 77.5,
  width: 7,
  top: HORIZON_Y,
  bottom: 100,
} as const;

/**
 * Parallax con el ratón: desplazamiento máximo de cada capa en % de la escena. El agua y
 * el muelle quedan fijos (ahí se juega); el primer plano va en sentido contrario.
 */
export const LAYER_PARALLAX: Readonly<Record<LakeLayerId, number>> = {
  sky: 0.4,
  trees: 0.8,
  water: 0,
  dock: 0,
  foreground: -1.8,
};

/* ---------- Niño, caña y carnada ---------- */

/** Tamaño del arte pintado en px: las medidas en px del arte se pasan a % con esto. */
const ART = { width: 2400, height: 1116 } as const;

/** Recorte de una pose dentro de su lienzo original (lo guarda el manifiesto). */
export interface SourceCrop {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

/**
 * Las tres poses del niño comparten un lienzo de 1280 px con los pies en la misma fila: cada
 * pose se coloca según su recorte en ese lienzo y no salta al cambiar. Sentado en la punta
 * del muelle entre el 31 % y el 37 % del ancho, con el farol detrás.
 */
export const KID_CANVAS = { left: 26.6, top: 33.7, scale: 0.261 } as const;

/** Caja de una pose en % de la escena. */
export function kidPoseBox(crop: SourceCrop) {
  const { left, top, scale } = KID_CANVAS;
  return {
    left: left + ((crop.left * scale) / ART.width) * PERCENT,
    top: top + ((crop.top * scale) / ART.height) * PERCENT,
    width: ((crop.width * scale) / ART.width) * PERCENT,
    height: ((crop.height * scale) / ART.height) * PERCENT,
  };
}

/** Borde izquierdo del niño (pose quieto): nada del muelle lo debe tapar. */
export const KID_LEFT = 31;

/** Empuñadura de la caña: las manos del niño en la pose quieto. */
export const ROD_GRIP_PERCENT: ScenePercent = { x: 36, y: 46.9 };

/** Caña (cana.webp): empuñadura y punta medidas en px de la imagen. */
export const ROD_ART = {
  width: 900,
  height: 263,
  grip: { x: 2, y: 241.5 },
  tip: { x: 897, y: 9.5 },
} as const;

/** Largo de la caña de la empuñadura a la punta, en % del ancho de la escena. */
export const ROD_LENGTH_PERCENT = 17;
/** Ángulo de reposo (grados; negativo = hacia arriba). */
export const ROD_REST_DEG = -35;
/** Inclinación propia del dibujo de la caña: se descuenta al rotarla. */
export const ROD_ART_DEG =
  (Math.atan2(ROD_ART.tip.y - ROD_ART.grip.y, ROD_ART.tip.x - ROD_ART.grip.x) * 180) /
  Math.PI;

/** Bajo la punta cuelgan la boya y, más abajo, el anzuelo con la carnada (% del alto). */
const DANGLE_DROP = 12;
const HOOK_DROP = 6;

/** Baldes: el dibujo cabe entre el 14 % y el 29.5 %; cada botón de 44 px ocupa un tercio
 *  del tramo táctil 12.5-31 % (a 1280 × 575 la escena mide 718 px y 18.4 % = 3 × 44 px). */
export const BUCKETS = {
  hitLeft: 12.5,
  hitRight: 31,
  /** Ancho del dibujo de cada balde, en % del ancho de la escena. */
  artWidth: 3.2,
  deckY: 51.5,
} as const;

/** Juncos decorativos en el agua junto a la punta del muelle (anclaje abajo al centro). */
export const REEDS: readonly { x: number; y: number; height: number }[] = [
  { x: 42.5, y: 67, height: 13 },
  { x: 46.5, y: 63.5, height: 8 },
];

/** Tamaño de la boya y del anzuelo, en % del ancho de la escena. */
export const BOBBER_WIDTH = 1.6;
export const HOOK_WIDTH = 0.9;
/** Carnada colgando del anzuelo, en % del ancho de la escena. */
export const BAIT_WIDTH = 2.4;

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

export const ROD_GRIP = toUnits(ROD_GRIP_PERCENT);
const ROD_LENGTH = (ROD_LENGTH_PERCENT / PERCENT) * LAKE_VIEWBOX.width;
const DEG = Math.PI / 180;

/** Punta de la caña para un ángulo dado: de aquí salen el sedal y la zona de enganche. */
export function rodTip(angleDeg: number): ScenePoint {
  return {
    x: ROD_GRIP.x + ROD_LENGTH * Math.cos(angleDeg * DEG),
    y: ROD_GRIP.y + ROD_LENGTH * Math.sin(angleDeg * DEG),
  };
}

/** Escala del dibujo de la caña (unidades del SVG por px de la imagen). */
export const ROD_SCALE =
  ROD_LENGTH / Math.hypot(ROD_ART.tip.x - ROD_ART.grip.x, ROD_ART.tip.y - ROD_ART.grip.y);

export const ROD_TIP = rodTip(ROD_REST_DEG);
export const CAST_POINT = ROD_TIP;
const percentDown = (point: ScenePoint, drop: number): ScenePoint => ({
  x: point.x,
  y: point.y + (drop / PERCENT) * LAKE_VIEWBOX.height,
});
/** Boya colgando bajo la punta y, más abajo, el anzuelo donde va la carnada. */
export const dangleFrom = (tip: ScenePoint) => percentDown(tip, DANGLE_DROP);
export const hookFrom = (tip: ScenePoint) => percentDown(tip, DANGLE_DROP + HOOK_DROP);
/** En reposo: aquí se arrastra la carnada para engancharla. */
export const DANGLE = dangleFrom(ROD_TIP);
export const HOOK_POINT = hookFrom(ROD_TIP);

/** Ancho en unidades del SVG a partir de un % del ancho de la escena. */
export const widthUnits = (percent: number) => (percent / PERCENT) * LAKE_VIEWBOX.width;
export const heightUnits = (percent: number) => (percent / PERCENT) * LAKE_VIEWBOX.height;

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
