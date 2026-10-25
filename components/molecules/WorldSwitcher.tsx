import { Button } from "@/components/atoms/Button";
import type { World, WorldSlug } from "@/types/world";

interface WorldSwitcherProps {
  readonly worlds: readonly World[];
  readonly current: WorldSlug;
  readonly hereLabel: string;
}

/** Botones para saltar a los otros mundos; el actual queda marcado con aria-current. */
export function WorldSwitcher({ worlds, current, hereLabel }: WorldSwitcherProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {worlds.map((world) => {
        const label = `${world.number} · ${world.name}`;
        return (
          <li key={world.slug}>
            {world.slug === current ? (
              <span
                aria-current="page"
                className="bg-glow py-fluid-2 text-fluid-sm inline-flex items-center rounded-full px-6 font-semibold text-(--ink)"
              >
                {label} · {hereLabel}
              </span>
            ) : (
              <Button variant="ghost" href={`/mundos/${world.slug}`}>
                {label} <span aria-hidden="true">→</span>
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
