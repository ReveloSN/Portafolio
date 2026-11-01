import type { CSSProperties } from "react";
import { LAKE_ART } from "@/data/lakeAssets";
import {
  BOBBER_WIDTH,
  DANGLE,
  HOOK_POINT,
  HOOK_WIDTH,
  widthUnits,
} from "@/lib/fishing/scene";
import type { BobberState } from "@/lib/fishing/rig";
import { cn } from "@/lib/utils";

interface BobberProps {
  readonly x: number;
  readonly y: number;
  readonly state: BobberState;
}

const bobberW = widthUnits(BOBBER_WIDTH);
const hookW = widthUnits(HOOK_WIDTH);
/** El anzuelo cuelga a esta distancia bajo la boya. */
const HOOK_DY = HOOK_POINT.y - DANGLE.y;

/** Boya pintada con sus ondas y la señal de picada; colgando de la caña, lleva el anzuelo. */
export function Bobber({ x, y, state }: BobberProps) {
  const bobber = LAKE_ART.bobber;
  const hook = LAKE_ART.hook;
  const inWater = state !== "dangling";
  const biting = state === "biting";
  const bobberH = bobber ? (bobberW * bobber.height) / bobber.width : bobberW;
  const place = { transform: `translate(${x}px, ${y}px)` } as CSSProperties;
  return (
    <g className="lake-bobber" style={place}>
      {inWater ? (
        <>
          <ellipse className="lake-ripple" rx="26" ry="7" cy="4" />
          <ellipse className="lake-ripple lake-ripple-late" rx="26" ry="7" cy="4" />
        </>
      ) : null}
      <g
        className={cn(
          "lake-float",
          state === "floating" && "is-floating",
          biting && "is-biting",
        )}
      >
        {!inWater && hook ? (
          <>
            <path d={`M0 ${bobberH / 2} V${HOOK_DY}`} stroke="#c9d2d6" strokeWidth="1" />
            <image
              href={hook.src}
              x={-hookW / 2}
              y={HOOK_DY}
              width={hookW}
              height={(hookW * hook.height) / hook.width}
            />
          </>
        ) : null}
        {bobber ? (
          <image
            href={bobber.src}
            x={-bobberW / 2}
            y={-bobberH / 2}
            width={bobberW}
            height={bobberH}
          />
        ) : null}
      </g>
      {biting ? (
        <g className="lake-alert" data-testid="bite-alert">
          <circle cy="-48" r="17" fill="#ffc46e" stroke="#2a1c08" strokeWidth="2" />
          <path d="M0 -58v11" stroke="#2a1c08" strokeWidth="4.5" strokeLinecap="round" />
          <circle cy="-38" r="2.8" fill="#2a1c08" />
        </g>
      ) : null}
    </g>
  );
}
