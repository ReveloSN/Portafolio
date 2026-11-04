import manifest from "@/data/lakeArtManifest.json";
import type { LakeAnchor, LakeArtAsset, LakeArtId, LakeLayerId } from "@/types/lake";

/** Orden de pintado de la escena. */
export const LAKE_Z = {
  sky: 0,
  trees: 1,
  water: 2,
  dock: 3,
  objects: 4,
  creatures: 5,
  fx: 6,
  foreground: 7,
} as const;

/** Capas de fondo a frente. */
export const LAKE_LAYER_ORDER: readonly LakeLayerId[] = [
  "sky",
  "trees",
  "water",
  "dock",
  "foreground",
];

/** Profundidad según la carpeta que generó el script de optimización. */
const Z_BY_FOLDER: Readonly<Record<string, number>> = {
  explorer: LAKE_Z.objects,
  props: LAKE_Z.objects,
  creatures: LAKE_Z.creatures,
  breach: LAKE_Z.creatures,
  fx: LAKE_Z.fx,
};

interface ManifestEntry {
  readonly src: string;
  readonly mobileSrc?: string;
  readonly width: number;
  readonly height: number;
  readonly anchor: LakeAnchor;
  readonly crop?: LakeArtAsset["crop"];
}

const isLayer = (id: string): id is LakeLayerId =>
  (LAKE_LAYER_ORDER as readonly string[]).includes(id);

function zOf(id: string, src: string): number {
  if (isLayer(id)) return LAKE_Z[id];
  const folder = src.split("/").at(-2) ?? "";
  return Z_BY_FOLDER[folder] ?? LAKE_Z.objects;
}

/**
 * Registro de todo el arte pintado del lago. Tamaños y anclajes salen del manifiesto que
 * escribe scripts/optimize-lake.ts. La sección Experiencia usa las cinco capas como fondo;
 * las demás piezas (niño, caña, criaturas, salpicaduras) quedan registradas por si vuelven.
 */
export const LAKE_ART: Readonly<Partial<Record<LakeArtId, LakeArtAsset>>> =
  Object.fromEntries(
    Object.entries(manifest as Readonly<Record<string, ManifestEntry>>).map(
      ([id, entry]) => [
        id,
        {
          id: id as LakeArtId,
          src: entry.src,
          mobileSrc: entry.mobileSrc,
          width: entry.width,
          height: entry.height,
          anchor: entry.anchor,
          crop: entry.crop,
          z: zOf(id, entry.src),
          decorative: true,
        },
      ],
    ),
  );
