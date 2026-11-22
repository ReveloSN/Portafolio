import { BoneArt } from "@/components/atoms/BoneShape";
import { SLAB_ART_PX } from "@/lib/constants";
import { optimizedSrc } from "@/lib/imageUrl";
import type { BoneShape } from "@/types/puzzle";

interface FossilSlabProps {
  readonly width: number;
  readonly height: number;
  readonly shapes: readonly BoneShape[];
  readonly placed?: readonly boolean[];
  readonly showArt: boolean;
}

/** Margen del canto de la losa respecto al tablero (unidades). */
const EDGE = 16;
const RADIUS = 36;
const SLAB_ART = "/art/experience/bones/empty-slab.webp";

/** Losa de piedra con el hueco punteado de cada hueso. Decorativa: el puzle se lee aparte. */
export function FossilSlab({ width, height, shapes, placed, showArt }: FossilSlabProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className="fossil-slab absolute inset-x-0 top-0 h-auto w-full"
    >
      <defs>
        <radialGradient id="fossil-stone" cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="var(--fossil-stone)" />
          <stop offset="1" stopColor="var(--fossil-stone-deep)" />
        </radialGradient>
      </defs>
      <rect
        x={EDGE}
        y={EDGE}
        width={width - EDGE * 2}
        height={height - EDGE * 2}
        rx={RADIUS}
        fill="url(#fossil-stone)"
        stroke="var(--fossil-socket-edge)"
        strokeWidth="2"
      />
      <image
        href={showArt ? optimizedSrc(SLAB_ART, SLAB_ART_PX) : undefined}
        width={width}
        height={height}
        preserveAspectRatio="none"
      />
      {shapes.map((shape, index) =>
        placed?.[index] ? null : shape.image ? (
          <svg
            key={shape.id}
            x={shape.slot.x}
            y={shape.slot.y}
            width={shape.size.width}
            height={shape.size.height}
            viewBox={`0 0 ${shape.size.width} ${shape.size.height}`}
            opacity=".16"
            overflow="hidden"
          >
            <BoneArt shape={shape} showArt={showArt} />
          </svg>
        ) : (
          <path
            key={shape.id}
            d={shape.path}
            fillRule="evenodd"
            transform={`translate(${shape.slot.x} ${shape.slot.y})`}
            className="fossil-socket"
          />
        ),
      )}
    </svg>
  );
}
