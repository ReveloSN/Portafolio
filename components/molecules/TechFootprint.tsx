import type { CSSProperties } from "react";
import { Illustration } from "@/components/atoms/Illustration";
import { TechIcon } from "@/components/atoms/TechIcon";
import { cn } from "@/lib/utils";
import type { TrackArt } from "@/types/art";
import type { TechIconId, TechPalette } from "@/types/profile";

interface TechFootprintProps {
  readonly icon: TechIconId;
  /** Color de marca: resplandor del logo y del borde interior de la tierra. */
  readonly color: string;
  /** Interior y logo; si se omite se deriva de `color`. */
  readonly palette?: TechPalette;
  readonly footprint: TrackArt;
  /** Orientación de la huella en grados; el logo se mantiene derecho. */
  readonly rotate?: number;
  /** Ancho de la huella (cualquier longitud CSS); por defecto el del camino. */
  readonly size?: string;
  readonly className?: string;
}

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Huella de dinosaurio con el logo de una tecnología. Capas, de abajo arriba:
 * tierra (ilustración), relleno de la cavidad, resplandor del borde interior,
 * halo del logo y logo nítido. El color solo toca la cavidad y su luz.
 */
export function TechFootprint({
  icon,
  color,
  palette,
  footprint,
  rotate = 0,
  size,
  className,
}: TechFootprintProps) {
  const { art, pool, rim, logo } = footprint;
  const vars: Vars = {
    "--tech": color,
    "--print-rotate": `${rotate}deg`,
    "--pool": `url(${pool})`,
    "--rim": `url(${rim})`,
    "--logo-x": `${logo.x}%`,
    "--logo-y": `${logo.y}%`,
    "--logo-size": `${logo.size}%`,
    ...(size ? { "--print-size": size } : {}),
    ...(palette
      ? {
          "--fill-deep": palette.deep,
          "--fill-mid": palette.mid,
          "--logo-color": palette.logo,
        }
      : {}),
  };
  return (
    <div aria-hidden="true" className={cn("tech-print", className)} style={vars}>
      <div className="tech-print-art">
        <Illustration
          decorative
          src={art.src}
          width={art.width}
          height={art.height}
          sizes="(min-width: 1024px) 260px, 120px"
        />
        <span className="tech-print-fill" />
        <span className="tech-print-glow">
          <span className="tech-print-rim" />
          <TechIcon id={icon} className="tech-print-logo tech-print-halo" />
        </span>
        <TechIcon id={icon} className="tech-print-logo" />
      </div>
    </div>
  );
}
