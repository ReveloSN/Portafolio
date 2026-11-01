import { pressRing, startRing, type RingStep } from "@/lib/fishing/ring";
import type { Creature, GameMode, RingState } from "@/types/fishing";

/**
 * Estrategia de pelea (Strategy): cómo empieza el minijuego con una criatura y qué pasa en
 * cada pulsación. El motor no conoce las reglas; solo guarda el estado y el resultado.
 */
export interface FightStrategy {
  readonly start: (
    creature: Creature,
    mode: GameMode,
    seed: number,
    now: number,
  ) => { readonly ring: RingState; readonly seed: number };
  readonly press: (
    ring: RingState,
    mode: GameMode,
    seed: number,
    now: number,
  ) => RingStep;
}

/** El anillo: aguja que gira y zona que acertar; cada criatura trae su propio ajuste. */
export const RING_FIGHT: FightStrategy = {
  start: (creature, mode, seed, now) => startRing(creature.ring, mode, seed, now),
  press: pressRing,
};
