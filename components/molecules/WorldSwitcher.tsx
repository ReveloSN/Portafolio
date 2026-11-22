import { Button } from "@/components/atoms/Button";
import type { Project } from "@/types/project";
import type { WorldSlug } from "@/types/world";

interface WorldSwitcherProps {
  readonly projects: readonly Pick<Project, "slug" | "name">[];
  readonly current: WorldSlug;
  readonly hereLabel: string;
}

/** Enlaces a los proyectos del portafolio con un indicador para el actual. */
export function WorldSwitcher({ projects, current, hereLabel }: WorldSwitcherProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {projects.map(({ slug, name }) => (
        <li key={slug}>
          {slug === current ? (
            <span
              aria-current="page"
              className="bg-glow py-fluid-2 text-fluid-sm inline-flex items-center rounded-full px-6 font-semibold text-(--ink)"
            >
              {name} · {hereLabel}
            </span>
          ) : (
            <Button variant="ghost" href={`/mundos/${slug}`}>
              {name} <span aria-hidden="true">→</span>
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
