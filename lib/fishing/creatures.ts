import type { Creature, CreatureId, Depth } from "@/types/fishing";

/* ---------- Reglas de aparición ---------- */

export const isUnlocked = (creature: Creature, captures: number) =>
  captures >= creature.unlockAfter;

const livesAt = (creature: Creature, depth: Depth) => creature.depth === depth;

export interface SpotResult {
  /** Criaturas que pueden picar en este lugar. */
  readonly candidates: readonly Creature[];
  /** Hay una criatura aquí que aún no se deja ver (le faltan capturas). */
  readonly locked: boolean;
}

export function surveySpot(
  creatures: readonly Creature[],
  depth: Depth,
  caught: readonly CreatureId[],
): SpotResult {
  const pending = creatures.filter(
    (creature) => !caught.includes(creature.id) && livesAt(creature, depth),
  );
  const candidates = pending.filter((creature) => isUnlocked(creature, caught.length));
  return { candidates, locked: candidates.length < pending.length };
}

export function indexCreatures(
  creatures: readonly Creature[],
): ReadonlyMap<CreatureId, Creature> {
  return new Map(creatures.map((creature) => [creature.id, creature]));
}
