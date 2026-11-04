import { PROJECTS } from "@/data/projects";
import { WORLDS } from "@/data/worlds";
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

