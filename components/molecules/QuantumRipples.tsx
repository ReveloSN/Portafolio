import type { CSSProperties } from "react";

interface QuantumRipplesProps {
  /** Punto donde cae el anzuelo, en % de la escena. */
  readonly x: number;
  readonly y: number;
  /** Onda única y fuerte (impacto de un salto) en lugar de anillos continuos. */
  readonly burst?: boolean;
}

/** Dos focos un poco separados: sus anillos se cruzan y dibujan la interferencia. */
const EMITTERS = [
  { dx: -1.2, hue: "teal" },
  { dx: 1.2, hue: "lime" },
] as const;
const RINGS = [0, 1, 2] as const;
/** Desfase entre anillos del mismo foco (s). */
const RING_STAGGER_S = 0.7;

/** Anillos concéntricos turquesa y lima que salen del punto donde cae el anzuelo. */
export function QuantumRipples({ x, y, burst = false }: QuantumRipplesProps) {
  return (
    <div className="q-ripples" data-burst={burst || undefined} aria-hidden="true">
      {EMITTERS.flatMap((emitter, e) =>
        RINGS.map((ring) => (
          <span
            key={`${e}-${ring}`}
            className="q-ring"
            data-hue={emitter.hue}
            style={
              {
                left: `${x + emitter.dx}%`,
                top: `${y}%`,
                animationDelay: `${(ring + e / 2) * RING_STAGGER_S}s`,
              } as CSSProperties
            }
          />
        )),
      )}
    </div>
  );
}
