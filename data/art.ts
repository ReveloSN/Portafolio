import type { ArtEntry, TrackArt } from "@/types/art";

const decorative = (src: string, width: number, height: number): ArtEntry => ({
  src,
  width,
  height,
  alt: "",
  decorative: true,
});

const FIREFLY_CELL = 600;

/** Registro único de las ilustraciones de /public/art (ruta y tamaño real). */
export const ART = {
  canopy: decorative("/art/dividers/canopy.webp", 3072, 512),
  ferns: decorative("/art/dividers/ferns.webp", 3072, 512),
  roots: decorative("/art/dividers/roots.webp", 3072, 512),
  treeline: decorative("/art/dividers/treeline.webp", 3072, 512),
  leafBigLeft: decorative("/art/foliage/leaf-big-left.webp", 800, 1200),
  leafBigRight: decorative("/art/foliage/leaf-big-right.webp", 800, 1200),
  vineHanging1: decorative("/art/foliage/vine-hanging-1.webp", 800, 1200),
  vineHanging2: decorative("/art/foliage/vine-hanging-2.webp", 800, 1200),
  dinoTail: decorative("/art/creatures/dino-tail.webp", 2612, 1200),
  footprint1: decorative("/art/tracks/footprint-1.webp", 1488, 1488),
  footprint2: decorative("/art/tracks/footprint-2.webp", 1488, 1488),
  bone1: decorative("/art/bones/bone-1.webp", 1800, 1200),
  bone2: decorative("/art/bones/bone-2.webp", 1800, 1200),
  boneSmall: decorative("/art/bones/bone-small.webp", 512, 441),
  firefly1: decorative("/art/fx/firefly-1.webp", FIREFLY_CELL, FIREFLY_CELL),
  firefly2: decorative("/art/fx/firefly-2.webp", FIREFLY_CELL, FIREFLY_CELL),
  firefly3: decorative("/art/fx/firefly-3.webp", FIREFLY_CELL, FIREFLY_CELL),
  firefly4: decorative("/art/fx/firefly-4.webp", FIREFLY_CELL, FIREFLY_CELL),
  firefly5: decorative("/art/fx/firefly-5.webp", FIREFLY_CELL, FIREFLY_CELL),
  firefly6: decorative("/art/fx/firefly-6.webp", FIREFLY_CELL, FIREFLY_CELL),
} as const satisfies Record<string, ArtEntry>;

export type ArtKey = keyof typeof ART;

/**
 * Huellas alternas del camino de tecnologías. Máscaras y posición del logo generadas
 * con scripts/track-masks.py a partir de cada ilustración.
 */
export const FOOTPRINTS: readonly [TrackArt, ...TrackArt[]] = [
  {
    art: ART.footprint1,
    pool: "/art/tracks/footprint-1-pool.webp",
    rim: "/art/tracks/footprint-1-rim.webp",
    logo: { x: 53.4, y: 58.2, size: 29 },
  },
  {
    art: ART.footprint2,
    pool: "/art/tracks/footprint-2-pool.webp",
    rim: "/art/tracks/footprint-2-rim.webp",
    logo: { x: 46.5, y: 58.2, size: 29 },
  },
];

/** Las 6 luciérnagas rebanadas del sprite (scripts/slice-fireflies.py). */
export const FIREFLY_SPRITES = [
  ART.firefly1,
  ART.firefly2,
  ART.firefly3,
  ART.firefly4,
  ART.firefly5,
  ART.firefly6,
] as const;
