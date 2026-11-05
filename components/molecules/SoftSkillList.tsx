import type { CSSProperties } from "react";

interface SoftSkillListProps {
  readonly skills: readonly string[];
  /** Posición del primer elemento en la entrada escalonada del grupo. */
  readonly startIndex: number;
}

/** Habilidades blandas como lista de texto, cada una con una marca del color de la escena. */
export function SoftSkillList({ skills, startIndex }: SoftSkillListProps) {
  return (
    <ul className="mt-[calc(var(--u)*.6)] grid gap-x-[calc(var(--u)*1.6)] gap-y-[.55em] text-[clamp(.85rem,calc(var(--u)*1.25),1rem)] leading-[1.4] sm:grid-cols-2">
      {skills.map((skill, i) => (
        <li
          key={skill}
          className="stagger-item flex gap-[.6em]"
          style={{ "--i": startIndex + i } as CSSProperties}
        >
          <span
            aria-hidden="true"
            className="bg-glow mt-[.55em] size-[.4em] shrink-0 rotate-45 rounded-[1px]"
          />
          {skill}
        </li>
      ))}
    </ul>
  );
}
