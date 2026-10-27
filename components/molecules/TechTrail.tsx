import type { CSSProperties } from "react";
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

/** Camino de huellas: aparecen una tras otra, alternando pie izquierdo y derecho. */
export function TechTrail({ technologies, startIndex }: TechTrailProps) {
  return (
    <ul
      className="gap-x-fluid-2 gap-y-fluid-3 mt-3.5 flex flex-wrap items-start"
      style={{ "--stagger-step": `${STEP_MS}ms` } as CSSProperties}
    >
      {technologies.map((tech, i) => (
        <TrackStep
          key={tech.name}
          name={tech.name}
          glyph={tech.glyph}
          footprint={FOOTPRINTS[i % FOOTPRINTS.length] ?? FOOTPRINTS[0]}
          order={startIndex + i}
          tilt={TILTS[i % TILTS.length] ?? 0}
          lift={i % 2 === 0 ? "up" : "down"}
        />
      ))}
    </ul>
  );
}
