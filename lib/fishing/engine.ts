import {
  BITE_PATIENCE_DIFFICULTY_MS,
  BITE_PATIENCE_MS,
  CAST_CHARGE_MS,
  MAX_STEP_MS,
  WAIT_MIN_MS,
  WAIT_SPREAD_MS,
} from "@/lib/fishing/config";
import {
  depthFromPower,
  indexCreatures,
  pullAt,
  surveySpot,
} from "@/lib/fishing/creatures";
import { nextRandom, pick } from "@/lib/fishing/random";
import {
  INITIAL_FIGHT,
  relaxedTap,
  stepFight,
  type FightStep,
} from "@/lib/fishing/tension";
import type {
  Creature,
  GameAction,
  GameMode,
  GamePhase,
  GameState,
} from "@/types/fishing";

/**
 * Máquina de estados del lago (pura):
 * idle → casting → waiting → bite → fighting → caught | escaped | lineBroken → casting …
 * waiting → escaped (nada picó) · bite → escaped (se soltó, solo desafío) · 6 capturas → complete
 */

/** Fases desde las que una pulsación empieza un lanzamiento nuevo. */
const CAN_CAST: ReadonlySet<GamePhase> = new Set([
  "idle",
  "caught",
  "escaped",
  "lineBroken",
]);

/** Entre intentos: se puede tomar carnada, engancharla y lanzar. */
export const isBetweenCasts = (phase: GamePhase) => CAN_CAST.has(phase);

export function createInitialState(seed: number, mode: GameMode): GameState {
  return {
    phase: "idle",
    mode,
    seed,
    castStartedAt: null,
    power: 0,
    depth: null,
    hooked: null,
    biteAt: null,
    biteDeadline: null,
    holding: false,
    fight: INITIAL_FIGHT,
    caught: [],
    lastCatch: null,
    escapeReason: null,
  };
}

/** Fuerza del lanzamiento: sube de 0 a 1 y vuelve (vaivén) mientras se mantiene pulsado. */
export function chargePower(elapsedMs: number, mode: GameMode): number {
  const cycle = (Math.max(0, elapsedMs) / CAST_CHARGE_MS[mode]) % 2;
  return cycle <= 1 ? cycle : 2 - cycle;
}

export function createFishingEngine(creatures: readonly Creature[]) {
  const byId = indexCreatures(creatures);
  const allIds = creatures.map((creature) => creature.id);

  /** Fin de un intento: se suelta el carrete. */
  function finish(state: GameState, phase: GamePhase): GameState {
    return { ...state, phase, holding: false };
  }

  function launch(state: GameState, now: number): GameState {
    if (state.castStartedAt === null) return state;
    const power = chargePower(now - state.castStartedAt, state.mode);
    const depth = depthFromPower(power);
    const spot = surveySpot(creatures, depth, state.caught);
    const choice = nextRandom(state.seed);
    const wait = nextRandom(choice.seed);
    const hooked = pick(spot.candidates, choice.value);
    return {
      ...state,
      phase: "waiting",
      seed: wait.seed,
      power,
      depth,
      hooked: hooked?.id ?? null,
      biteAt: now + WAIT_MIN_MS + wait.value * WAIT_SPREAD_MS,
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

  function settle(state: GameState, step: FightStep): GameState {
    const next = { ...state, fight: step.fight };
    switch (step.outcome) {
      case "fighting":
        return next;
      case "lineBroken":
        return finish({ ...next, hooked: null }, "lineBroken");
      case "escaped":
        return finish({ ...next, hooked: null, escapeReason: "fought" }, "escaped");
      case "caught": {
        const id = state.hooked;
        if (!id) return next;
        const caught = state.caught.includes(id) ? state.caught : [...state.caught, id];
        const done = caught.length >= allIds.length;
        return finish(
          { ...next, hooked: null, caught, lastCatch: id },
          done ? "complete" : "caught",
        );
      }
    }
  }

  function fightTick(state: GameState, dt: number): GameState {
    const creature = state.hooked ? byId.get(state.hooked) : undefined;
    if (!creature) return state;
    const dtMs = Math.min(MAX_STEP_MS, Math.max(0, dt));
    const elapsed = state.fight.elapsedMs + dtMs;
    const step = stepFight(state.fight, {
      holding: state.holding,
      mode: state.mode,
      fishPull: pullAt(creature, elapsed, state.fight.progress),
      difficulty: creature.difficulty,
      dtMs,
    });
    return settle(state, step);
  }

  function tick(state: GameState, now: number, dt: number): GameState {
    switch (state.phase) {
      case "casting":
        return state.castStartedAt === null
          ? state
          : { ...state, power: chargePower(now - state.castStartedAt, state.mode) };
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
      case "fighting":
        return fightTick(state, dt);
      default:
        return state;
    }
  }

  function press(state: GameState, now: number): GameState {
    if (CAN_CAST.has(state.phase)) {
      return {
        ...state,
        phase: "casting",
        castStartedAt: now,
        power: 0,
        depth: null,
        escapeReason: null,
        lastCatch: null,
        fight: INITIAL_FIGHT,
      };
    }
    if (state.phase === "bite") {
      return {
        ...state,
        phase: "fighting",
        biteDeadline: null,
        holding: true,
        fight: INITIAL_FIGHT,
      };
    }
    if (state.phase === "fighting") {
      const held = { ...state, holding: true };
      return state.mode === "relaxed" ? settle(held, relaxedTap(state.fight)) : held;
    }
    return state;
  }

  function release(state: GameState, now: number): GameState {
    if (state.phase === "casting") return launch(state, now);
    if (state.phase === "fighting") return { ...state, holding: false };
    return state;
  }

  return function fishingReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
      case "press":
        return press(state, action.now);
      case "release":
        return release(state, action.now);
      case "tick":
        return tick(state, action.now, action.dt);
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
          {
            ...state,
            hooked: null,
            caught: allIds,
            lastCatch: null,
            castStartedAt: null,
          },
          "complete",
        );
      case "reset":
        return createInitialState(state.seed, state.mode);
    }
  };
}

export type FishingReducer = ReturnType<typeof createFishingEngine>;
