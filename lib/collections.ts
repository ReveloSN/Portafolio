import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { WORLDS } from "@/data/worlds";
import type { ExperienceEntry } from "@/types/experience";
import type { Catch, RareCreature } from "@/types/fishing";
import type { Project } from "@/types/project";
import type { World, WorldSlug } from "@/types/world";

function indexBy<T, K extends string>(items: readonly T[], key: (item: T) => K) {
  return new Map<K, T>(items.map((item) => [key(item), item]));
}

export const projectsBySlug: ReadonlyMap<WorldSlug, Project> = indexBy(
  PROJECTS,
  (project) => project.slug,
);

export const worldsBySlug: ReadonlyMap<WorldSlug, World> = indexBy(
  WORLDS,
  (world) => world.slug,
);

/** Ordena de lo más reciente a lo más antiguo. Se calcula una sola vez al cargar el módulo. */
export const sortedExperience: readonly ExperienceEntry[] = [...EXPERIENCE].sort(
  (a, b) => b.startYear - a.startYear,
);

const RARE_AFTER_ENTRY: ReadonlyMap<number, RareCreature> = new Map([
  [1, "mosasaur"],
  [3, "megalodon"],
]);

/** Secuencia de capturas: las entradas en orden, con una criatura rara tras la 2.ª y la 4.ª. */
export const catchSequence: readonly Catch[] = sortedExperience.flatMap(
  (entry, index): Catch[] => {
    const rare = RARE_AFTER_ENTRY.get(index);
    const base: Catch = { type: "entry", entry };
    return rare ? [base, { type: "rare", creature: rare }] : [base];
  },
);
