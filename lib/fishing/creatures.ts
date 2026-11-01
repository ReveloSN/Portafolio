import { DEPTH_THRESHOLDS } from "@/lib/fishing/config";
import type { Creature, CreatureId, Depth, PullPattern } from "@/types/fishing";

const FULL_TURN = Math.PI * 2;

/* ---------- Patrones de tirón (Strategy): cada criatura combina uno por fase ---------- */

/** Tirón ondulante: sube y baja con un periodo fijo. */
export const wave =
  (base: number, amplitude: number, periodMs: number): PullPattern =>
  (elapsedMs) =>
    base + amplitude * Math.sin((FULL_TURN * elapsedMs) / periodMs);

/** Tirón a sacudidas: un pico de `lengthMs` cada `everyMs`. */
export const bursts =
  (base: number, peak: number, everyMs: number, lengthMs: number): PullPattern =>
  (elapsedMs) =>
    elapsedMs % everyMs < lengthMs ? peak : base;

/** Fase activa según el progreso: con 2 fases, la segunda empieza a mitad de pelea. */
export function pullAt(creature: Creature, elapsedMs: number, progress: number): number {
  const { phases } = creature;
  const index = Math.min(phases.length - 1, Math.floor(progress * phases.length));
  const pattern = phases[Math.max(0, index)];
  return pattern ? pattern(elapsedMs) : 0;
}

export const phaseIndex = (creature: Creature, progress: number) =>
  Math.min(creature.phases.length - 1, Math.floor(progress * creature.phases.length));

/* ---------- Reglas de aparición ---------- */

export function depthFromPower(power: number): Depth {
  if (power < DEPTH_THRESHOLDS.mid) return "shore";
  if (power < DEPTH_THRESHOLDS.deep) return "mid";
  return "deep";
}

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
