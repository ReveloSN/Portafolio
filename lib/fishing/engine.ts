import {
  BITE_PATIENCE_DIFFICULTY_MS,
  BITE_PATIENCE_MS,
  CAST_FLIGHT_MS,
  WAIT_MIN_MS,
  WAIT_SPREAD_MS,
} from "@/lib/fishing/config";
import { indexCreatures, surveySpot } from "@/lib/fishing/creatures";
import { RING_FIGHT, type FightStrategy } from "@/lib/fishing/fight";
import { nextRandom, pick } from "@/lib/fishing/random";
import type {
  Creature,
  Depth,
  GameAction,
  GameMode,
  GamePhase,
  GameState,
} from "@/types/fishing";

/**
 * Máquina de estados del lago (pura):
 * idle → (elegir punto) casting → waiting → bite → fighting → caught | escaped → casting …
 * waiting → escaped (nada picó) · bite → escaped (se soltó, solo desafío) · 6 capturas → complete
 */

/** Fases desde las que se puede elegir un punto de pesca y lanzar. */
const CAN_CAST: ReadonlySet<GamePhase> = new Set(["idle", "caught", "escaped"]);

/** Entre intentos: los puntos de pesca están disponibles. */
export const isBetweenCasts = (phase: GamePhase) => CAN_CAST.has(phase);

export function createInitialState(seed: number, mode: GameMode): GameState {
  return {
    phase: "idle",
    mode,
    seed,
    depth: null,
    landsAt: null,
    hooked: null,
    biteAt: null,
    biteDeadline: null,
    ring: null,
    caught: [],
    lastCatch: null,
    escapeReason: null,
  };
}

export function createFishingEngine(
  creatures: readonly Creature[],
  fight: FightStrategy = RING_FIGHT,
) {
  const byId = indexCreatures(creatures);
  const allIds = creatures.map((creature) => creature.id);

  /** Fin de un intento. */
  function finish(state: GameState, phase: GamePhase): GameState {
    return { ...state, phase, ring: null };
  }

  /** Elegir un punto: la boya vuela hacia él y ahí se decide quién picará. */
  function cast(state: GameState, depth: Depth, now: number): GameState {
    if (!CAN_CAST.has(state.phase)) return state;
    const spot = surveySpot(creatures, depth, state.caught);
    const choice = nextRandom(state.seed);
    const wait = nextRandom(choice.seed);
    const hooked = pick(spot.candidates, choice.value);
    const landsAt = now + CAST_FLIGHT_MS;
    return {
      ...state,
      phase: "casting",
      seed: wait.seed,
      depth,
      landsAt,
      hooked: hooked?.id ?? null,
      biteAt: landsAt + WAIT_MIN_MS + wait.value * WAIT_SPREAD_MS,
      biteDeadline: null,
      ring: null,
      lastCatch: null,
      escapeReason: hooked ? null : spot.locked ? "locked" : "noBite",
    };
  }

  function bite(state: GameState, now: number): GameState {
    const creature = state.hooked ? byId.get(state.hooked) : undefined;
    if (!creature) return finish({ ...state, biteAt: null }, "escaped");
    const patience = BITE_PATIENCE_MS - creature.difficulty * BITE_PATIENCE_DIFFICULTY_MS;
    return {
      ...state,
      phase: "bite",
      biteAt: null,
      biteDeadline: state.mode === "challenge" ? now + patience : null,
    };
  }

  /** Enganchar: empieza el minijuego de la criatura. */
  function hook(state: GameState, now: number): GameState {
    const creature = state.hooked ? byId.get(state.hooked) : undefined;
    if (!creature) return state;
    const started = fight.start(creature, state.mode, state.seed, now);
    return {
      ...state,
      phase: "fighting",
      biteDeadline: null,
      ring: started.ring,
      seed: started.seed,
    };
  }

  function strike(state: GameState, now: number): GameState {
    if (!state.ring) return state;
    const step = fight.press(state.ring, state.mode, state.seed, now);
    const next = { ...state, ring: step.ring, seed: step.seed };
    if (step.outcome === "escaped") {
      return finish({ ...next, hooked: null, escapeReason: "missed" }, "escaped");
    }
    if (step.outcome !== "caught") return next;
    const id = state.hooked;
    if (!id) return next;
    const caught = state.caught.includes(id) ? state.caught : [...state.caught, id];
    const done = caught.length >= allIds.length;
    return finish(
      { ...next, hooked: null, caught, lastCatch: id },
      done ? "complete" : "caught",
    );
  }

  function tick(state: GameState, now: number): GameState {
    switch (state.phase) {
      case "casting":
        return state.landsAt !== null && now >= state.landsAt
          ? { ...state, phase: "waiting", landsAt: null }
          : state;
      case "waiting":
        if (state.biteAt === null || now < state.biteAt) return state;
        return state.hooked
          ? bite(state, now)
          : finish({ ...state, biteAt: null }, "escaped");
      case "bite":
        if (state.biteDeadline === null || now < state.biteDeadline) return state;
        return finish(
          { ...state, hooked: null, biteDeadline: null, escapeReason: "slipped" },
          "escaped",
        );
      default:
        return state;
    }
  }

  function press(state: GameState, now: number): GameState {
    if (state.phase === "bite") return hook(state, now);
    if (state.phase === "fighting") return strike(state, now);
    return state;
  }

  return function fishingReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
      case "cast":
        return cast(state, action.depth, action.now);
      case "press":
        return press(state, action.now);
      case "tick":
        return tick(state, action.now);
      case "setMode":
        return {
          ...state,
          mode: action.mode,
          biteDeadline: action.mode === "relaxed" ? null : state.biteDeadline,
        };
      case "reseed":
        return { ...state, seed: action.seed >>> 0 };
      case "revealAll":
        return finish(
          { ...state, hooked: null, caught: allIds, lastCatch: null, landsAt: null },
          "complete",
        );
      case "reset":
        return createInitialState(state.seed, state.mode);
    }
  };
}

export type FishingReducer = ReturnType<typeof createFishingEngine>;
