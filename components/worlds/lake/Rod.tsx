import type { CSSProperties } from "react";
import { LAKE_ART } from "@/data/lakeAssets";
import { ROD_ART, ROD_ART_DEG, ROD_GRIP, ROD_SCALE } from "@/lib/fishing/scene";
import { cn } from "@/lib/utils";

interface RodProps {
  /** Ángulo de la caña (grados; negativo = hacia arriba). */
  readonly angle: number;
  readonly tugging: boolean;
  /** Recién lanzada: giro rápido hacia delante y vuelta. */
  readonly flicking: boolean;
}

/** Todo gira sobre la empuñadura (las manos del niño). */
const PIVOT: CSSProperties = { transformOrigin: `${ROD_GRIP.x}px ${ROD_GRIP.y}px` };

/** La caña pintada, rotada sobre la empuñadura; el dibujo ya viene inclinado. */
export function Rod({ angle, tugging, flicking }: RodProps) {
  const art = LAKE_ART.rod;
  if (!art) return null;
  return (
    <g
      className={cn(
        "lake-rod-motion",
        tugging && "is-tugging",
        flicking && "is-flicking",
      )}
      style={PIVOT}
    >
      <g className="lake-rod" style={{ ...PIVOT, rotate: `${angle - ROD_ART_DEG}deg` }}>
        <image
          href={art.src}
          x={ROD_GRIP.x - ROD_ART.grip.x * ROD_SCALE}
          y={ROD_GRIP.y - ROD_ART.grip.y * ROD_SCALE}
          width={ROD_ART.width * ROD_SCALE}
          height={ROD_ART.height * ROD_SCALE}
        />
      </g>
    </g>
  );
}
