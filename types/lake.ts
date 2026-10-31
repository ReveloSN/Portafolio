import type { BaitId, CreatureId } from "./fishing";

/** Ilustraciones SVG provisionales disponibles en el registro de la escena. */
export type LakeSvgArt =
  "fish" | "mosasaur" | "megalodon" | "bucket-worm" | "bucket-minnow" | "bucket-firefly";

/** Una capa de la escena: hoy SVG provisional, mañana una imagen pintada. */
export type LakeAsset =
  | { readonly kind: "svg"; readonly art: LakeSvgArt; readonly tint?: string }
  | {
      readonly kind: "image";
      readonly src: string;
      readonly width: number;
      readonly height: number;
    };

/** Puestos del juego que aún usan arte provisional (las capas vienen de LAKE_ART). */
export interface LakeAssets {
  readonly canoe: LakeAsset;
  readonly creatures: Readonly<Record<CreatureId, LakeAsset>>;
  /** Los tres baldes de carnada del muelle. */
  readonly buckets: Readonly<Record<BaitId, LakeAsset>>;
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
  | "splash"
  | "drops"
  | "particle";

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
  /** Profundidad: cielo 0 … primer plano 7. */
  readonly z: number;
  /** Sin significado propio: alt vacío y fuera del árbol accesible. */
  readonly decorative: boolean;
}
