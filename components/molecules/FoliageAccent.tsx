"use client";

import type { CSSProperties } from "react";
import { ArtLayer } from "@/components/atoms/ArtLayer";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import type { AccentConfig } from "@/types/seam";

interface FoliageAccentProps {
  readonly accent: AccentConfig;
}

type AccentVars = CSSProperties & Record<`--${string}`, string | number>;

const SWAY_CLASS = { vine: "foliage-sway", tail: "tail-sway" } as const;

/**
 * Hoja, liana o cola suelta en el borde de una sección: se ve completa (nunca se
 * recorta por los lados) y `cross` indica cuánto de su alto sale por el borde.
 */
export function FoliageAccent({ accent }: FoliageAccentProps) {
  const ref = useScrollParallax<HTMLDivElement>();
  const { art, side, edge, cross, sway } = accent;
  const heightRatio = art.height / art.width;

  const style: AccentVars = {
    "--accent-w": accent.widthU,
    "--accent-rotate": `${accent.rotate}deg`,
    "--parallax-speed": accent.parallaxSpeed,
    [side]: 0,
    // El alto depende del ancho: sale una fracción del propio alto
    [edge]: `calc(var(--accent-width) * ${(-cross * heightRatio).toFixed(3)})`,
    zIndex: accent.zIndex,
    ...(sway
      ? { "--sway-duration": `${sway.duration}s`, "--sway-delay": `${sway.delay}s` }
      : {}),
  };
  return (
    <div
      ref={ref}
      className="foliage-accent art-parallax"
      data-large={accent.large ? "" : undefined}
      data-desktop-only={accent.desktopOnly ? "" : undefined}
      data-accent={accent.id}
      style={style}
    >
      <div className={sway ? SWAY_CLASS[sway.kind] : undefined}>
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
