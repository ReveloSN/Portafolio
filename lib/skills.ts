import type { Project } from "@/types/project";
import type { Skill } from "@/types/skill";
import type { WorldSlug } from "@/types/world";

/** Proyectos donde se usó una tecnología, en el orden de `usedIn`; ignora slugs sin proyecto. */
export function projectsUsing(
  skill: Pick<Skill, "usedIn">,
  lookup: ReadonlyMap<WorldSlug, Project>,
): readonly Project[] {
  return skill.usedIn.flatMap((slug) => {
    const project = lookup.get(slug);
    return project ? [project] : [];
  });
}
