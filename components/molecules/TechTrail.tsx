"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { EngraveFilter } from "@/components/atoms/EngraveFilter";
import { TechUsagePanel } from "@/components/molecules/TechUsagePanel";
import { TrackStep } from "@/components/molecules/TrackStep";
import { FOOTPRINTS } from "@/data/art";
import { COPY } from "@/data/copy";
import { TECH_USAGE } from "@/data/techUsage";
import type { TechIconId, Technology } from "@/types/profile";

interface TechTrailProps {
  readonly technologies: readonly Technology[];
  /** Orden de la primera huella dentro del grupo (para empezar tras el texto). */
  readonly startIndex: number;
}

/** Inclinación alterna de cada paso, como un dinosaurio caminando. */
const TILTS = [-12, 9] as const;
/** Ritmo de la caminata: más lento que el texto (80 ms). */
const STEP_MS = 120;
const PANEL_ID = "tech-usage";

/**
 * Camino de huellas: aparecen una tras otra, alternando pie izquierdo y derecho.
 * Cada huella es un botón: al pulsarla, debajo se ve dónde se usó esa tecnología.
 */
export function TechTrail({ technologies, startIndex }: TechTrailProps) {
  const [selected, setSelected] = useState<TechIconId | null>(null);
  const trail = useRef<HTMLDivElement>(null);
  const current = technologies.find((tech) => tech.icon === selected) ?? null;
  const toggle = (icon: TechIconId) =>
    setSelected((previous) => (previous === icon ? null : icon));

  /** Cierra el panel y devuelve el foco a la huella que lo abrió (no se pierde el teclado). */
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
      <p className="text-fluid-xs mt-2 opacity-70">{COPY.about.techHint}</p>
      <ul
        className="mt-[calc(var(--u)*1.2)] flex flex-wrap items-start justify-center gap-y-[calc(var(--u)*1.6)]"
        style={{ "--stagger-step": `${STEP_MS}ms` } as CSSProperties}
      >
        {technologies.map((tech, i) => (
          <TrackStep
            key={tech.name}
            tech={tech}
            footprint={FOOTPRINTS[i % FOOTPRINTS.length] ?? FOOTPRINTS[0]}
            order={startIndex + i}
            tilt={TILTS[i % TILTS.length] ?? 0}
            lift={i % 2 === 0 ? "up" : "down"}
            selected={tech.icon === selected}
            panelId={PANEL_ID}
            onSelect={() => toggle(tech.icon)}
          />
        ))}
      </ul>
      <TechUsagePanel
        id={PANEL_ID}
        tech={current}
        usage={current ? TECH_USAGE[current.icon] : undefined}
        onClose={close}
      />
    </div>
  );
}
