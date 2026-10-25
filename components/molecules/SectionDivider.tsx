"use client";

import type { CSSProperties } from "react";
import { ArtLayer } from "@/components/atoms/ArtLayer";
import { SEAMS } from "@/data/dividers";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import type { SeamId } from "@/types/seam";

interface SectionDividerProps {
  readonly id: SeamId;
}

type DividerVars = CSSProperties & Record<`--${string}`, string | number>;

/** Banda ilustrada a todo el ancho que tapa la costura entre dos secciones. */
export function SectionDivider({ id }: SectionDividerProps) {
  const ref = useScrollParallax<HTMLDivElement>();
  const divider = SEAMS[id].divider;
  if (!divider) return null;

  const style: DividerVars = {
    zIndex: divider.zIndex,
    "--parallax-speed": divider.parallaxSpeed,
    ...(divider.offset ? { "--divider-offset": divider.offset } : {}),
  };
  return (
    <div
      ref={ref}
      className="section-divider art-parallax"
      data-anchor={divider.anchor}
      data-flip={divider.flipY ? "" : undefined}
      data-fade={divider.fadeEdge === false ? undefined : ""}
      data-seam={id}
      style={style}
    >
      <ArtLayer
        src={divider.art.src}
        width={divider.art.width}
        height={divider.art.height}
        sizes="100vw"
        eager={divider.eager}
      />
    </div>
  );
}
