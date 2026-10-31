import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Colgando de la caña, flotando a la espera, hundida por la picada o en plena pelea. */
export type BobberState = "dangling" | "floating" | "biting" | "fighting";

interface BobberProps {
  readonly x: number;
  readonly y: number;
  readonly state: BobberState;
  /** Desplazamiento del tirón del pez (unidades del viewBox). */
  readonly jitter: number;
}

/** Boya con ondas y la señal de picada. */
export function Bobber({ x, y, state, jitter }: BobberProps) {
  const inWater = state !== "dangling";
  const biting = state === "biting";
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
        style={{ transform: `translate(${jitter}px, ${Math.abs(jitter) / 2}px)` }}
      >
        <path d="M-8 -2 a8 8 0 0 1 16 0z" fill="#ff5a5a" />
        <path d="M-8 -2 a8 8 0 0 0 16 0z" fill="#fff" />
        <path d="M0 -10v-6" stroke="#fff" strokeWidth="2" />
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
