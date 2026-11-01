import type { ExperienceEntry, ExperienceKind } from "@/types/experience";

/** Filtro de la línea de tiempo: un tipo de experiencia o todas. */
export type ExperienceFilter = ExperienceKind | "all";

/** Tinta de cada tipo sobre el papel de la bitácora. */
export const KIND_COLOR: Readonly<Record<ExperienceKind, string>> = {
  academic: "var(--journal-moss)",
  work: "var(--journal-rust)",
};

/** Entradas del tipo pedido, en el mismo orden en que llegan (ya ordenadas por fecha). */
export function filterExperience(
  entries: readonly ExperienceEntry[],
  filter: ExperienceFilter,
): readonly ExperienceEntry[] {
  return filter === "all" ? entries : entries.filter((entry) => entry.kind === filter);
}

/** Sustituye `{shown}` y `{total}` en el anuncio del filtro. */
export function countLabel(template: string, shown: number, total: number): string {
  return template.replace("{shown}", String(shown)).replace("{total}", String(total));
}
