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
}

/** Un paso del camino: la huella con el logo y, debajo, el nombre de la tecnología. */
export function TrackStep({ tech, footprint, order, tilt, lift }: TrackStepProps) {
  return (
    <li
      className="track-step stagger-item flex basis-1/4 flex-col items-center gap-[calc(var(--u)*.4)]"
      data-lift={lift}
      style={{ "--i": order } as CSSProperties}
    >
      <TechFootprint
        icon={tech.icon}
        color={tech.color}
        palette={tech.palette}
        footprint={footprint}
        rotate={tilt}
      />
      <span className="text-fluid-xs text-center leading-tight font-semibold opacity-85">
        {tech.name}
      </span>
    </li>
  );
}
