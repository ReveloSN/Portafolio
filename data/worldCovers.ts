import type { WorldSlug } from "@/types/world";

/** Paisajes de entrada; las escenas narrativas y sus dinosaurios viven dentro del proyecto. */
export const WORLD_COVERS: Readonly<Record<WorldSlug, string>> = {
  selva: "/art/projects/layers/selva-background.webp",
  cueva: "/art/projects/layers/cueva-background.webp",
  oceano: "/art/projects/worlds/oceano.webp",
  volcan: "/art/projects/worlds/volcan.webp",
  aurora: "/art/projects/worlds/aurora.webp",
};
