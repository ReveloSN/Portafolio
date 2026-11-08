import type { ExperienceKind } from "@/types/experience";
import type { GlyphKind } from "@/types/glyph";

/** Franja de jeroglíficos que enmarca la hoja del diario, de izquierda a derecha. */
export const JOURNAL_BAND: readonly GlyphKind[] = [
  "sun",
  "eye",
  "footprint",
  "water",
  "spiral",
  "fern",
  "bird",
  "bone",
  "footprint",
  "water",
  "eye",
  "sun",
];

/** Sello de cada entrada según su tipo: herramienta para el trabajo, ojo para la investigación. */
export const KIND_SEAL: Readonly<Record<ExperienceKind, GlyphKind>> = {
  work: "tool",
  academic: "eye",
};
