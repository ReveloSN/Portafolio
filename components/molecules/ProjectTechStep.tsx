import type { CSSProperties } from "react";
import { TechFootprint } from "@/components/molecules/TechFootprint";
import { TECH_CATALOG } from "@/data/techCatalog";
import type { TrackArt } from "@/types/art";

interface ProjectTechStepProps {
  /** Nombre tal como aparece en el proyecto (clave de TECH_CATALOG). */
  readonly name: string;
  readonly order: number;
  readonly footprint: TrackArt;
  readonly tilt: number;
  readonly selected: boolean;
  /** Id de la ficha que explica la tecnología. */
  readonly panelId: string;
  readonly onSelect: () => void;
}

/** Más pequeñas que en Sobre mí: aquí el rastro comparte panel con los enlaces al código. */
const TRAIL_PRINT_SIZE = "clamp(4.5rem, calc(var(--u) * 8.5), 8.5rem)";

/** Un paso del rastro del proyecto: la huella con el logo y su nombre, como botón. */
export function ProjectTechStep({
  name,
  order,
  footprint,
  tilt,
  selected,
  panelId,
  onSelect,
}: ProjectTechStepProps) {
  const visual = TECH_CATALOG[name];
  return (
    <li
      className="track-step flex w-[calc(var(--u)*9.5)] min-w-[5.5rem] justify-center"
      data-lift={order % 2 === 0 ? "up" : "down"}
      style={{ "--i": order } as CSSProperties}
    >
      <button
        type="button"
        aria-expanded={selected}
        aria-controls={panelId}
        onClick={onSelect}
        className="flex w-full cursor-pointer flex-col items-center gap-[calc(var(--u)*.4)] rounded-2xl p-1"
      >
        {visual ? (
          <TechFootprint
            icon={visual.icon}
            color={visual.color}
            palette={visual.palette}
            footprint={footprint}
            rotate={tilt}
            size={TRAIL_PRINT_SIZE}
          />
        ) : null}
        <span
          className={
            selected
              ? "text-fluid-xs text-center leading-tight font-semibold underline underline-offset-4"
              : "text-fluid-xs text-center leading-tight font-semibold opacity-90"
          }
        >
          {name}
        </span>
      </button>
    </li>
  );
}
