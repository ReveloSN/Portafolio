import type { CSSProperties } from "react";
import { AbyssArt } from "@/components/atoms/AbyssArt";
import type { AbyssZone, DriftingCreatureSpec } from "@/types/abyss";

interface DriftingCreatureProps {
  readonly spec: DriftingCreatureSpec;
  readonly zone: AbyssZone;
}

/** Ancho máximo de --u en px: tamaño del archivo que se pide (sizes). */
const MAX_UNIT_PX = 19;

/**
 * Una criatura que cruza el escenario despacio (translateX lineal e infinito) con un
 * vaivén vertical suave y desfasado. Más lejos (z) es más oscura, más borrosa y se funde
 * con la niebla. Solo se ve en su zona y solo se anima mientras su zona es la actual.
 */
export function DriftingCreature({ spec, zone }: DriftingCreatureProps) {
  const style = {
    top: `${spec.top}%`,
    "--size": spec.size,
    "--secs": `${spec.seconds}s`,
    "--delay": `${spec.delay}s`,
    "--z": spec.z,
    "--from": zone.from,
    "--to": zone.to,
    "--zone-dark": zone.darkness,
  } as CSSProperties;
  return (
    <div
      className="creature"
      data-zone={spec.zone}
      data-path={spec.path}
      data-dir={spec.direction}
      data-mobile={spec.mobile ? undefined : "off"}
      data-testid={`creature-${spec.id}`}
      style={style}
    >
      <div className="creature-sway">
        <AbyssArt
          id={spec.art}
          sizes={`${Math.round(spec.size * MAX_UNIT_PX)}px`}
          className="creature-art"
        />
      </div>
    </div>
  );
}
