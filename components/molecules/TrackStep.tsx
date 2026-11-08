import type { CSSProperties } from "react";
import { TechFootprint } from "@/components/molecules/TechFootprint";
import type { TrackArt } from "@/types/art";
import type { Technology } from "@/types/profile";

interface TrackStepProps {
  readonly tech: Technology;
  readonly footprint: TrackArt;
  /** Posición en la entrada escalonada (variable --i del RevealGroup). */
  readonly order: number;
  readonly tilt: number;
  /** Zigzag del paso: arriba o abajo de la línea del camino. */
  readonly lift: "up" | "down";
  readonly selected: boolean;
  /** Id del panel que muestra dónde se usó la tecnología. */
  readonly panelId: string;
  readonly onSelect: () => void;
}

/** Un paso del camino: la huella con el logo y su nombre; al pulsarla abre su panel. */
export function TrackStep({
  tech,
  footprint,
  order,
  tilt,
  lift,
  selected,
  panelId,
  onSelect,
}: TrackStepProps) {
  return (
    <li
      className="track-step stagger-item flex basis-1/4 justify-center"
      data-lift={lift}
      style={{ "--i": order } as CSSProperties}
    >
      <button
        type="button"
        aria-expanded={selected}
        aria-controls={panelId}
        onClick={onSelect}
        className="flex cursor-pointer flex-col items-center gap-[calc(var(--u)*.4)] rounded-2xl p-1"
      >
        <TechFootprint
          icon={tech.icon}
          color={tech.color}
          palette={tech.palette}
          footprint={footprint}
          rotate={tilt}
        />
        <span
          className={
            selected
              ? "text-fluid-xs text-center leading-tight font-semibold underline underline-offset-4"
              : "text-fluid-xs text-center leading-tight font-semibold opacity-85"
          }
        >
          {tech.name}
        </span>
      </button>
    </li>
  );
}
