"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { DEFAULT_SEED } from "@/lib/fishing/config";
import { createFishingEngine, createInitialState } from "@/lib/fishing/engine";
import type { Creature, Depth, GameMode, GameState } from "@/types/fishing";

export interface FishingGameApi {
  readonly state: GameState;
  /** Elegir un punto de pesca: lanza ahí. */
  readonly cast: (depth: Depth) => void;
  /** La ficha de acción: enganchar en la picada y marcar en el anillo. */
  readonly press: () => void;
  readonly setMode: (mode: GameMode) => void;
  readonly revealAll: () => void;
  readonly reset: () => void;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const now = () => performance.now();

/** Próximo instante en que el motor cambia solo: la boya cae, pica o se suelta. */
function dueAt(state: GameState): number | null {
  switch (state.phase) {
    case "casting":
      return state.landsAt;
    case "waiting":
      return state.biteAt;
    case "bite":
      return state.biteDeadline;
    default:
      return null;
  }
}

/**
 * Conecta el motor puro con React. El render inicial es determinista (semilla fija y
 * modo desafío); al montar se siembra el azar y se respeta prefers-reduced-motion. No hay
 * bucle por fotograma: la aguja del anillo es CSS y el motor la calcula con el reloj.
 */
export function useFishingGame(creatures: readonly Creature[]): FishingGameApi {
  const reducer = useMemo(() => createFishingEngine(creatures), [creatures]);
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createInitialState(DEFAULT_SEED, "challenge"),
  );
  const due = dueAt(state);

  useEffect(() => {
    dispatch({
      type: "reseed",
      seed: crypto.getRandomValues(new Uint32Array(1))[0] ?? 0,
    });
    if (window.matchMedia(REDUCED_MOTION).matches) {
      dispatch({ type: "setMode", mode: "relaxed" });
    }
  }, []);

  // Esperas puntuales: la boya que cae, la picada y, en desafío, el momento en que se suelta.
  useEffect(() => {
    if (due === null) return;
    // setTimeout trunca los milisegundos y puede adelantarse una fracción: el tick lleva
    // al menos la hora prevista, o el motor seguiría esperando sin otro temporizador.
    const timer = window.setTimeout(
      () => dispatch({ type: "tick", now: Math.max(now(), due) }),
      Math.max(0, Math.ceil(due - now())),
    );
    return () => window.clearTimeout(timer);
  }, [due]);

  const cast = useCallback(
    (depth: Depth) => dispatch({ type: "cast", depth, now: now() }),
    [],
  );
  const press = useCallback(() => dispatch({ type: "press", now: now() }), []);
  const setMode = useCallback(
    (mode: GameMode) => dispatch({ type: "setMode", mode }),
    [],
  );
  const revealAll = useCallback(() => dispatch({ type: "revealAll" }), []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  return { state, cast, press, setMode, revealAll, reset };
}
