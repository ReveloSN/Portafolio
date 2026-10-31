import type { BaitId, CreatureId } from "./fishing";

/** Arte de un puesto del juego: una imagen con su tamaño real. */
export interface LakeAsset {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

/** Arte de los puestos del juego (las capas se pintan desde LAKE_ART). */
export interface LakeAssets {
  readonly canoe: LakeAsset;
  readonly creatures: Readonly<Record<CreatureId, LakeAsset>>;
  /** Los tres baldes de carnada del muelle y la carnada que sale de cada uno. */
  readonly buckets: Readonly<Record<BaitId, LakeAsset>>;
  readonly baits: Readonly<Record<BaitId, LakeAsset>>;
}

/* ---------- Arte pintado (public/art/lake, generado por scripts/optimize-lake.ts) ---------- */

export type LakeLayerId = "sky" | "trees" | "water" | "dock" | "foreground";

export type LakePieceId =
  | "explorer-idle"
  | "explorer-cast"
  | "explorer-reel"
  | "rod"
  | "bobber"
  | "hook"
  | "reeds"
  | "bucket-worm"
  | "bucket-minnow"
  | "bucket-firefly"
  | "bait-worm"
  | "bait-minnow"
  | "bait-firefly"
  | "catch-fish-1"
  | "catch-fish-2"
  | "catch-fish-3"
  | "catch-fish-4"
  | "catch-mosasaur"
  | "catch-megalodon"
  | "mosasaur-open"
  | "mosasaur-closed"
  | "megalodon-open"
  | "megalodon-closed"
  | "splash-back"
  | "splash-front"
  | `splash-crown-${CrownIndex}`
  | `particle-${ParticleIndex}`;

/** Celdas de la hoja de gotas: 6 coronas de salpicadura y 10 gotas sueltas. */
type CrownIndex = 1 | 2 | 3 | 4 | 5 | 6;
type ParticleIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type LakeArtId = LakeLayerId | LakePieceId;

/** Punto de la imagen (0 a 1) que se coloca sobre su posición en la escena. */
export interface LakeAnchor {
  readonly x: number;
  readonly y: number;
}

export interface LakeArtAsset {
  readonly id: LakeArtId;
  readonly src: string;
  /** Versión ligera para pantallas de hasta 1024 px (solo las capas). */
  readonly mobileSrc?: string;
  readonly width: number;
  readonly height: number;
  readonly anchor: LakeAnchor;
  /** Recorte dentro del original (px del original): coloca las poses sin saltos. */
  readonly crop?: { left: number; top: number; width: number; height: number };
  /** Profundidad: cielo 0 … primer plano 7. */
  readonly z: number;
  /** Sin significado propio: alt vacío y fuera del árbol accesible. */
  readonly decorative: boolean;
}
