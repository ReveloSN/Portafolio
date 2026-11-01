import type { CSSProperties } from "react";
import { BOBBER_PERCENT } from "@/lib/fishing/scene";
import type { Depth } from "@/types/fishing";

interface FishingSpotsProps {
  readonly depths: readonly Depth[];
  /** Nombre visible de cada zona (orilla, aguas medias, abismo). */
  readonly names: Readonly<Record<Depth, string>>;
  /** Plantilla de la etiqueta accesible: "Punto de pesca: {name}". */
  readonly label: (name: string) => string;
  readonly onPick: (depth: Depth) => void;
}

const BUBBLES = 3;

/**
 * Tres burbujeos en el agua de juego: cada uno es un botón real (clic, toque o Tab +
 * Enter) que lanza la boya a esa zona. Solo están mientras se puede lanzar.
 */
export function FishingSpots({ depths, names, label, onPick }: FishingSpotsProps) {
  return (
    <>
      {depths.map((depth) => {
        const at = BOBBER_PERCENT[depth];
        return (
          <button
            key={depth}
            type="button"
            className="lake-spot"
            data-testid={`spot-${depth}`}
            aria-label={label(names[depth])}
            style={{ left: `${at.x}%`, top: `${at.y}%` } as CSSProperties}
            onClick={() => onPick(depth)}
          >
            <span aria-hidden="true" className="lake-spot-bubbles">
              {Array.from({ length: BUBBLES }, (_, index) => (
                <i key={index} />
              ))}
            </span>
          </button>
        );
      })}
    </>
  );
}
