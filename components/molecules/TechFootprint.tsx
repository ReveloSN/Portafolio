import type { CSSProperties } from "react";
import { Illustration } from "@/components/atoms/Illustration";
import { TechIcon } from "@/components/atoms/TechIcon";
import { TECH_ICON_FIT } from "@/lib/techIcons";
import { cn } from "@/lib/utils";
import type { TrackArt } from "@/types/art";
import type { TechIconId, TechPalette } from "@/types/profile";

interface TechFootprintProps {
  readonly icon: TechIconId;
  /** Color de marca: tiñe la cavidad y la luz tenue de su borde interior. */
  readonly color: string;
  /** Interior del charco; si se omite se deriva de `color`. */
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
 * Huella de dinosaurio con el logo de una tecnología grabado en el fondo. Capas, de
 * abajo arriba: tierra (ilustración), relleno de la cavidad, sombra bajo el borde,
 * luz tenue del borde y logo marfil hundido (filtro EngraveFilter). El color solo
 * toca la cavidad; la profundidad sale de las sombras.
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
    "--icon-fit": TECH_ICON_FIT[icon],
    ...(size ? { "--print-size": size } : {}),
    ...(palette
      ? {
          "--fill-deep": palette.deep,
          "--fill-mid": palette.mid,
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
        <span className="tech-print-shade" />
        <span className="tech-print-glow" />
        <TechIcon id={icon} className="tech-print-logo" />
      </div>
    </div>
  );
}
