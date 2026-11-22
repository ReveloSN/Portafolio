import type { CSSProperties } from "react";
import { EngraveFilter } from "@/components/atoms/EngraveFilter";
import { TechFootprint } from "@/components/molecules/TechFootprint";
import { FOOTPRINTS } from "@/data/art";
import { TECH_CATALOG } from "@/data/techCatalog";

interface ProjectTechTrailProps {
  readonly technologies: readonly string[];
  /** Nombre accesible de la lista ("Tecnologías"). */
  readonly label: string;
}

/** Inclinación alterna de cada paso, la misma del camino de Sobre mí. */
const TILTS = [-12, 9] as const;
/** Más pequeñas que en Sobre mí: aquí el rastro comparte panel con los enlaces al código. */
const TRAIL_PRINT_SIZE = "clamp(4.5rem, calc(var(--u) * 8.5), 8.5rem)";

/**
 * Tecnologías del proyecto como el camino de huellas de Sobre mí: cada huella lleva el
 * logo grabado y su nombre debajo, alternando pie izquierdo y derecho en zigzag. Aquí no
 * se pulsan (no hay panel de uso): es una lista que se lee en orden.
 */
export function ProjectTechTrail({ technologies, label }: ProjectTechTrailProps) {
  return (
    <>
      <EngraveFilter />
      <ul
        aria-label={label}
        className="mt-fluid-3 flex flex-wrap items-start justify-center gap-x-[calc(var(--u)*1.4)] gap-y-[calc(var(--u)*1.2)]"
      >
        {technologies.map((name, i) => {
          const visual = TECH_CATALOG[name];
          return (
            <li
              key={name}
              className="track-step flex w-[calc(var(--u)*9.5)] min-w-[5.5rem] flex-col items-center gap-[calc(var(--u)*.4)]"
              data-lift={i % 2 === 0 ? "up" : "down"}
              style={{ "--i": i } as CSSProperties}
            >
              {visual ? (
                <TechFootprint
                  icon={visual.icon}
                  color={visual.color}
                  palette={visual.palette}
                  footprint={FOOTPRINTS[i % FOOTPRINTS.length] ?? FOOTPRINTS[0]}
                  rotate={TILTS[i % TILTS.length] ?? 0}
                  size={TRAIL_PRINT_SIZE}
                />
              ) : null}
              <span className="text-fluid-xs text-center leading-tight font-semibold opacity-90">
                {name}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
