import type { BaitId, CreatureId } from "./fishing";

/** Ilustraciones SVG provisionales disponibles en el registro de la escena. */
export type LakeSvgArt =
  | "backdrop"
  | "reeds"
  | "fish"
  | "mosasaur"
  | "megalodon"
  | "bucket-worm"
  | "bucket-minnow"
  | "bucket-firefly";

/** Una capa de la escena: hoy SVG provisional, mañana una imagen pintada. */
export type LakeAsset =
  | { readonly kind: "svg"; readonly art: LakeSvgArt; readonly tint?: string }
  | {
      readonly kind: "image";
      readonly src: string;
      readonly width: number;
      readonly height: number;
    };

export interface LakeAssets {
  readonly backdrop: LakeAsset;
  readonly foreground: LakeAsset;
  readonly canoe: LakeAsset;
  readonly creatures: Readonly<Record<CreatureId, LakeAsset>>;
  /** Los tres baldes de carnada del muelle. */
  readonly buckets: Readonly<Record<BaitId, LakeAsset>>;
}
