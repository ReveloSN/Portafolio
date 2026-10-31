import type { CSSProperties } from "react";
import { EngraveFilter } from "@/components/atoms/EngraveFilter";
import { TrackStep } from "@/components/molecules/TrackStep";
import { FOOTPRINTS } from "@/data/art";
import type { Technology } from "@/types/profile";

interface TechTrailProps {
  readonly technologies: readonly Technology[];
  /** Orden de la primera huella dentro del grupo (para empezar tras el texto). */
  readonly startIndex: number;
}

/** Inclinación alterna de cada paso, como un dinosaurio caminando. */
const TILTS = [-12, 9] as const;
/** Ritmo de la caminata: más lento que el texto (80 ms). */
const STEP_MS = 120;

/**
 * Camino de huellas: aparecen una tras otra, alternando pie izquierdo y derecho.
 * Cuatro por fila y la última fila centrada (7 tecnologías = 4 + 3).
 */
export function TechTrail({ technologies, startIndex }: TechTrailProps) {
  return (
    <>
      <EngraveFilter />
      <ul
        className="mt-[calc(var(--u)*1.2)] flex flex-wrap items-start justify-center gap-y-[calc(var(--u)*1.6)]"
        style={
          {
            "--stagger-step": `${STEP_MS}ms`,
          } as CSSProperties
        }
      >
        {technologies.map((tech, i) => (
          <TrackStep
            key={tech.name}
            tech={tech}
            footprint={FOOTPRINTS[i % FOOTPRINTS.length] ?? FOOTPRINTS[0]}
            order={startIndex + i}
            tilt={TILTS[i % TILTS.length] ?? 0}
            lift={i % 2 === 0 ? "up" : "down"}
          />
        ))}
      </ul>
    </>
  );
}
