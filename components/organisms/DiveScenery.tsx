import type { CSSProperties } from "react";
import { AbyssBackdrops } from "@/components/molecules/AbyssBackdrops";
import { DiveLantern } from "@/components/molecules/DiveLantern";
import { DriftingCreature } from "@/components/molecules/DriftingCreature";
import { DriftParticles } from "@/components/molecules/DriftParticles";
import { LakeSurface } from "@/components/molecules/LakeSurface";
import { ABYSS_CREATURES, ABYSS_ZONES } from "@/data/abyss";
import type { AbyssZone, AbyssZoneId } from "@/types/abyss";

const ZONE_BY_ID = new Map<AbyssZoneId, AbyssZone>(
  ABYSS_ZONES.map((zone) => [zone.id, zone]),
);

/** El temblor del escenario va al ritmo de la pasada del megalodón. */
const PASS = ABYSS_CREATURES.find((creature) => creature.path === "pass");
const QUAKE = PASS
  ? ({
      "--quake-secs": `${PASS.seconds}s`,
      "--quake-delay": `${PASS.delay}s`,
    } as CSSProperties)
  : undefined;

/**
 * Todo lo que se ve en el escenario fijo de la inmersión, de atrás hacia delante: agua y
 * criaturas (que tiemblan juntas con el megalodón), nieve marina, el lago de la
 * superficie con su sedal y el cebo, y la linterna. Decorativo de punta a punta.
 */
export function DiveScenery() {
  return (
    <>
      <div className="dive-quake" style={QUAKE}>
        <AbyssBackdrops />
        {ABYSS_CREATURES.map((spec) => {
          const zone = ZONE_BY_ID.get(spec.zone);
          return zone ? <DriftingCreature key={spec.id} spec={spec} zone={zone} /> : null;
        })}
        <DriftParticles />
      </div>
      <LakeSurface />
      <DiveLantern />
    </>
  );
}
