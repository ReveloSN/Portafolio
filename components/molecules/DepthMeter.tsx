import type { CSSProperties } from "react";
import { DIVE_LAYOUT } from "@/data/abyss";
import { cardProgress, formatDepth, type PlacedEntry } from "@/lib/abyss/depth";

interface DepthMeterProps {
  readonly placed: readonly PlacedEntry[];
  readonly surfaceLabel: string;
}

const at = (value: number) => ({ "--at": value.toFixed(4) }) as CSSProperties;

/**
 * Medidor lateral de profundidad: la superficie y una marca por tarjeta, en el punto del
 * recorrido donde esa tarjeta queda centrada; el indicador baja con --depth. Decorativo:
 * la profundidad ya se lee en cada tarjeta.
 */
export function DepthMeter({ placed, surfaceLabel }: DepthMeterProps) {
  return (
    <div className="depth-meter" aria-hidden="true" data-testid="depth-meter">
      <span className="depth-meter-mark" style={at(0)}>
        {surfaceLabel}
      </span>
      {placed.map((item, index) => (
        <span
          key={item.entry.id}
          className="depth-meter-mark"
          style={at(cardProgress(index, placed.length, DIVE_LAYOUT))}
        >
          {formatDepth(item.meters)}
        </span>
      ))}
      <span className="depth-meter-now" />
    </div>
  );
}
