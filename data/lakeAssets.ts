import manifest from "@/data/lakeArtManifest.json";
import type {
  LakeAnchor,
  LakeArtAsset,
  LakeArtId,
  LakeAssets,
  LakeLayerId,
} from "@/types/lake";

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
 * escribe scripts/optimize-lake.ts; lo que falte en el original no aparece aquí y la
 * escena sigue usando su arte provisional.
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
          z: zOf(id, entry.src),
          decorative: true,
        },
      ],
    ),
  );

/**
 * Arte provisional por puesto de juego (SVG o imagen). Para pasar al arte pintado basta
 * con cambiar una entrada por `{ kind: "image", src, width, height }`.
 */
export const LAKE_ASSETS: LakeAssets = {
  backdrop: { kind: "svg", art: "backdrop" },
  foreground: { kind: "svg", art: "reeds" },
  canoe: { kind: "image", src: "/images/canoa.webp?v=2", width: 1254, height: 1254 },
  creatures: {
    lepidotes: { kind: "svg", art: "fish", tint: "#9fe6d0" },
    ammonite: { kind: "svg", art: "fish", tint: "#ffc46e" },
    coelacanth: { kind: "svg", art: "fish", tint: "#7fb6ff" },
    ichthyosaur: { kind: "svg", art: "fish", tint: "#d6ff9f" },
    mosasaur: { kind: "svg", art: "mosasaur" },
    megalodon: { kind: "svg", art: "megalodon" },
  },
  buckets: {
    worm: { kind: "svg", art: "bucket-worm" },
    minnow: { kind: "svg", art: "bucket-minnow" },
    firefly: { kind: "svg", art: "bucket-firefly" },
  },
};
