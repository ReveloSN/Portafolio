import { CONTENT } from "@/data/content";
import { LOCALES, type Locale } from "@/lib/i18n";
import type { ExperienceEntry } from "@/types/experience";
import type { Project } from "@/types/project";
import type { World, WorldSlug } from "@/types/world";

function indexBy<T, K extends string>(items: readonly T[], key: (item: T) => K) {
  return new Map<K, T>(items.map((item) => [key(item), item]));
}

/** Búsquedas O(1) y la experiencia ordenada de un idioma. */
export interface Collections {
  readonly projectsBySlug: ReadonlyMap<WorldSlug, Project>;
  readonly worldsBySlug: ReadonlyMap<WorldSlug, World>;
  /** De lo más reciente a lo más antiguo. */
  readonly sortedExperience: readonly ExperienceEntry[];
  readonly experienceById: ReadonlyMap<string, ExperienceEntry>;
}

function buildCollections(locale: Locale): Collections {
  const { projects, worlds, experience } = CONTENT[locale];
  return {
    projectsBySlug: indexBy(projects, (project) => project.slug),
    worldsBySlug: indexBy(worlds, (world) => world.slug),
    sortedExperience: [...experience].sort((a, b) => b.startYear - a.startYear),
    experienceById: indexBy(experience, (entry) => entry.id),
  };
}

/** Se calculan una sola vez por idioma, al cargar el módulo. */
export const COLLECTIONS: Readonly<Record<Locale, Collections>> = Object.fromEntries(
  LOCALES.map((locale) => [locale, buildCollections(locale)]),
) as Record<Locale, Collections>;

/** Atajos del idioma base (español): los usan las pruebas de los datos. */
export const { projectsBySlug, worldsBySlug, sortedExperience, experienceById } =
  COLLECTIONS.es;
