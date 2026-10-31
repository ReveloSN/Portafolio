import type { CSSProperties } from "react";
import { Illustration } from "@/components/atoms/Illustration";
import { TechIcon } from "@/components/atoms/TechIcon";
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

type PrintVars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Una huella con el logotipo de la tecnología brillando dentro. Capas: el charco
 * del color de la marca (detrás, se ve por el hueco y el agua), la ilustración,
 * el resplandor sobre el borde interior y el logotipo.
 */
export function TrackStep({ tech, footprint, order, tilt, lift }: TrackStepProps) {
  const { art, pool } = footprint;
  const vars: PrintVars = {
    rotate: `${tilt}deg`,
    "--tech": tech.color,
    "--pool": `url(${pool})`,
  };
  return (
    <li
      className="track-step stagger-item flex basis-1/4 flex-col items-center gap-[calc(var(--u)*.4)] sm:basis-auto"
      data-lift={lift}
      style={{ "--i": order } as CSSProperties}
    >
      <div className="track-print" style={vars}>
        <div className="track-art">
          <span aria-hidden="true" className="track-pool" />
          <Illustration
            decorative
            src={art.src}
            width={art.width}
            height={art.height}
            sizes="(min-width: 1024px) 180px, 140px"
            className="relative"
          />
          <span aria-hidden="true" className="track-glow" />
          <TechIcon
            id={tech.icon}
            className="track-icon"
            style={{ rotate: `${-tilt}deg` }}
          />
        </div>
      </div>
      <span className="text-fluid-xs text-center leading-tight font-semibold opacity-85">
        {tech.name}
      </span>
    </li>
  );
}
