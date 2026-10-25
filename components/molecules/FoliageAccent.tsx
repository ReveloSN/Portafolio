"use client";

import type { CSSProperties } from "react";
import { ArtLayer } from "@/components/atoms/ArtLayer";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { cn } from "@/lib/utils";
import type { AccentConfig } from "@/types/seam";

interface FoliageAccentProps {
  readonly accent: AccentConfig;
}

type AccentVars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Hoja o liana suelta en el borde de una sección. `cross` positivo la hace subir
 * por encima del borde superior (cruza la costura); negativo la deja bajar por el inferior.
 */
export function FoliageAccent({ accent }: FoliageAccentProps) {
  const ref = useScrollParallax<HTMLDivElement>();
  const { art, side, outside, cross, sway } = accent;
  const heightRatio = art.height / art.width;
  const edge = cross >= 0 ? "top" : "bottom";

  const style: AccentVars = {
    "--accent-w": accent.widthU,
    "--accent-rotate": `${accent.rotate}deg`,
    "--parallax-speed": accent.parallaxSpeed,
    [side]: `calc(var(--accent-width) * ${-outside})`,
    // El alto depende del ancho: se cruza una fracción del propio alto
    [edge]: `calc(var(--accent-width) * ${(-Math.abs(cross) * heightRatio).toFixed(3)})`,
    zIndex: 1,
    ...(sway
      ? { "--sway-duration": `${sway.duration}s`, "--sway-delay": `${sway.delay}s` }
      : {}),
  };
  return (
    <div
      ref={ref}
      className="foliage-accent art-parallax"
      data-large={accent.large ? "" : undefined}
      data-accent={accent.id}
      style={style}
    >
      <div className={cn(sway && "foliage-sway")}>
        <ArtLayer
          src={art.src}
          width={art.width}
          height={art.height}
          sizes={`(max-width: 767px) 25vw, ${Math.round(accent.widthU * 1.2)}vw`}
        />
      </div>
    </div>
  );
}
