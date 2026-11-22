"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { EngraveFilter } from "@/components/atoms/EngraveFilter";
import { ProjectTechNote } from "@/components/molecules/ProjectTechNote";
import { ProjectTechStep } from "@/components/molecules/ProjectTechStep";
import { FOOTPRINTS } from "@/data/art";
import { useCopy } from "@/hooks/useLocale";

interface ProjectTechTrailProps {
  readonly technologies: readonly string[];
  /** Para qué se usó cada tecnología en el proyecto, por su nombre. */
  readonly notes: Readonly<Record<string, string>>;
  readonly projectName: string;
  /** Nombre accesible de la lista ("Tecnologías"). */
  readonly label: string;
}

/** Inclinación alterna de cada paso, la misma del camino de Sobre mí. */
const TILTS = [-12, 9] as const;
const PANEL_ID = "project-tech-note";

/**
 * Tecnologías del proyecto como el camino de huellas de Sobre mí: cada huella lleva el
 * logo grabado y su nombre, en zigzag. Al pulsar una, debajo se abre una ficha con lo que
 * hizo esa tecnología en este proyecto; Esc o "Cerrar" la cierran y devuelven el foco.
 */
export function ProjectTechTrail({
  technologies,
  notes,
  projectName,
  label,
}: ProjectTechTrailProps) {
  const { world } = useCopy();
  const [selected, setSelected] = useState<string | null>(null);
  const trail = useRef<HTMLDivElement>(null);

  const close = () => {
    trail.current
      ?.querySelector<HTMLButtonElement>(
        `[aria-controls="${PANEL_ID}"][aria-expanded="true"]`,
      )
      ?.focus();
    setSelected(null);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && selected) close();
  };

  return (
    <div ref={trail} onKeyDown={onKeyDown}>
      <EngraveFilter />
      <p className="text-fluid-xs mt-2 text-center opacity-70">{world.techHint}</p>
      <ul
        aria-label={label}
        className="mt-fluid-3 flex flex-wrap items-start justify-center gap-x-[calc(var(--u)*1.4)] gap-y-[calc(var(--u)*1.2)]"
      >
        {technologies.map((name, i) => (
          <ProjectTechStep
            key={name}
            name={name}
            order={i}
            footprint={FOOTPRINTS[i % FOOTPRINTS.length] ?? FOOTPRINTS[0]}
            tilt={TILTS[i % TILTS.length] ?? 0}
            selected={name === selected}
            panelId={PANEL_ID}
            onSelect={() => setSelected((current) => (current === name ? null : name))}
          />
        ))}
      </ul>
      <ProjectTechNote
        id={PANEL_ID}
        title={
          selected
            ? world.techUsedFor
                .replace("{name}", selected)
                .replace("{project}", projectName)
            : null
        }
        note={selected ? notes[selected] : undefined}
        closeLabel={world.techClose}
        onClose={close}
      />
    </div>
  );
}
