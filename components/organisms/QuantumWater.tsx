"use client";

import { QuantumParticles } from "@/components/molecules/QuantumParticles";
import { QuantumRipples } from "@/components/molecules/QuantumRipples";
import { QuantumShadow } from "@/components/molecules/QuantumShadow";
import { LAKE_ASSETS } from "@/data/lakeAssets";
import { useQuantumPhase } from "@/hooks/useQuantumPhase";
import { BOBBER_PERCENT, waterlineAt } from "@/lib/fishing/scene";
import type { Creature, Depth, GamePhase } from "@/types/fishing";

interface QuantumWaterProps {
  readonly phase: GamePhase;
  readonly depth: Depth | null;
  /** La que pica o pelea, o la recién capturada. */
  readonly creature: Creature | null;
  /** Interruptor "Efectos": apagado, el lago es el de siempre y se juega igual. */
  readonly enabled: boolean;
}

/** Ondas desde el anzuelo mientras se espera o pica. */
const RIPPLING = new Set(["superposition", "collapse"]);

/** El lago cuántico: partículas, interferencia y la criatura en superposición. */
export function QuantumWater({ phase, depth, creature, enabled }: QuantumWaterProps) {
  const mode = useQuantumPhase(phase, enabled);
  if (!enabled) return null;
  const spot = depth ? BOBBER_PERCENT[depth] : null;
  return (
    <div
      className="q-water"
      aria-hidden="true"
      data-testid="quantum-water"
      data-mode={mode}
    >
      <QuantumParticles />
      {spot && RIPPLING.has(mode) ? <QuantumRipples x={spot.x} y={spot.y} /> : null}
      {spot && depth && creature && mode !== "idle" ? (
        <QuantumShadow
          key={creature.id}
          art={LAKE_ASSETS.creatures[creature.id]}
          size={creature.size}
          x={spot.x}
          waterline={waterlineAt(depth)}
          mode={mode}
        />
      ) : null}
    </div>
  );
}
