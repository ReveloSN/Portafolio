import { TechIcon } from "@/components/atoms/TechIcon";
import { UsedIn } from "@/components/molecules/UsedIn";
import type { Project } from "@/types/project";
import type { Skill } from "@/types/skill";

export interface InventoryItem {
  readonly skill: Skill;
  readonly projects: readonly Project[];
}

interface SkillInventoryProps {
  readonly title: string;
  readonly intro: string;
  readonly usedInLabel: string;
  readonly items: readonly InventoryItem[];
}

const TITLE_ID = "inventario-hallazgos";

/**
 * Lista completa de los hallazgos, siempre visible y sin juego: la misma información
 * de la excavación para quien no quiere o no puede excavar.
 */
export function SkillInventory({
  title,
  intro,
  usedInLabel,
  items,
}: SkillInventoryProps) {
  return (
    <section aria-labelledby={TITLE_ID} className="mt-fluid-6">
      <h3
        id={TITLE_ID}
        className="font-display text-fluid-xl leading-tight font-extrabold"
      >
        {title}
      </h3>
      <p className="text-fluid-sm mt-1.5 opacity-80">{intro}</p>
      <ul className="mt-fluid-3 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ skill, projects }) => (
          <li
            key={skill.id}
            className="flex gap-3.5 rounded-2xl border border-[rgba(255,196,110,.25)] bg-black/20 p-4"
          >
            <TechIcon
              id={skill.icon}
              className="text-glow-amber mt-0.5 size-8 flex-none"
            />
            <div className="min-w-0">
              <p className="font-display text-fluid-base leading-tight font-extrabold">
                {skill.name}
              </p>
              <p className="text-fluid-xs mt-0.5 font-mono tracking-[.14em] opacity-80">
                {skill.area}
              </p>
              <UsedIn
                label={usedInLabel}
                projects={projects}
                className="text-fluid-sm mt-2"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
