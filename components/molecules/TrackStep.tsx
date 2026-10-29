import type { CSSProperties } from "react";
import { Illustration } from "@/components/atoms/Illustration";
import type { ArtEntry } from "@/types/art";

interface TrackStepProps {
  readonly name: string;
  readonly glyph: string;
  readonly footprint: ArtEntry;
  /** Posición en la entrada escalonada (variable --i del RevealGroup). */
  readonly order: number;
  readonly tilt: number;
  /** Zigzag del paso: arriba o abajo de la línea del camino. */
  readonly lift: "up" | "down";
}

/** Una huella en el barro con el monograma de la tecnología sobre el agua verde. */
export function TrackStep({ name, glyph, footprint, order, tilt, lift }: TrackStepProps) {
  return (
    <li
      className="track-step stagger-item flex basis-1/4 flex-col items-center gap-1 sm:basis-auto"
      data-lift={lift}
      style={{ "--i": order } as CSSProperties}
    >
      <div
        className="relative w-[clamp(2.75rem,calc(var(--u)*5),5.5rem)]"
        style={{ rotate: `${tilt}deg` }}
      >
        <Illustration
          decorative
          src={footprint.src}
          width={footprint.width}
          height={footprint.height}
          sizes="90px"
        />
        <span
          aria-hidden="true"
          className="text-fluid-sm absolute inset-x-0 top-[52%] -translate-y-1/2 text-center font-mono font-medium text-[#eaffd0] [text-shadow:0_1px_6px_rgba(0,30,10,.9)]"
          style={{ rotate: `${-tilt}deg` }}
        >
          {glyph}
        </span>
      </div>
      <span className="text-fluid-xs text-center leading-tight font-semibold opacity-85">
        {name}
      </span>
    </li>
  );
}
