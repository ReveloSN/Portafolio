import type { CSSProperties } from "react";
import { Illustration } from "@/components/atoms/Illustration";
import { TechIcon } from "@/components/atoms/TechIcon";
import type { ArtEntry } from "@/types/art";
import type { Technology } from "@/types/profile";

interface TrackStepProps {
  readonly tech: Technology;
  readonly footprint: ArtEntry;
  /** Posición en la entrada escalonada (variable --i del RevealGroup). */
  readonly order: number;
  readonly tilt: number;
  /** Zigzag del paso: arriba o abajo de la línea del camino. */
  readonly lift: "up" | "down";
}

type PrintVars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Una huella en el barro con el logotipo de la tecnología en el agua: el charco toma
 * el color de la marca y brilla. La propia huella sirve de máscara para que el color
 * no se salga del barro.
 */
export function TrackStep({ tech, footprint, order, tilt, lift }: TrackStepProps) {
  const vars: PrintVars = {
    rotate: `${tilt}deg`,
    "--tech": tech.color,
    "--print": `url(${footprint.src})`,
  };
  return (
    <li
      className="track-step stagger-item flex basis-1/4 flex-col items-center gap-1 sm:basis-auto"
      data-lift={lift}
      style={{ "--i": order } as CSSProperties}
    >
      <div
        className="track-print relative w-[clamp(3rem,calc(var(--u)*5.4),6rem)]"
        style={vars}
      >
        <Illustration
          decorative
          src={footprint.src}
          width={footprint.width}
          height={footprint.height}
          sizes="96px"
        />
        <span aria-hidden="true" className="track-tint" />
        <span aria-hidden="true" className="track-glow" />
        <TechIcon
          id={tech.icon}
          className="track-icon"
          style={{ rotate: `${-tilt}deg` }}
        />
      </div>
      <span className="text-fluid-xs text-center leading-tight font-semibold opacity-85">
        {tech.name}
      </span>
    </li>
  );
}
