"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { DEFAULT_SEED } from "@/lib/fishing/config";
import { createFishingEngine, createInitialState } from "@/lib/fishing/engine";
import type { BaitId, Creature, GameMode, GameState } from "@/types/fishing";

export interface FishingGameApi {
  readonly state: GameState;
  readonly press: () => void;
  readonly release: () => void;
  readonly pickBait: (bait: BaitId) => void;
  readonly attachBait: () => void;
  readonly detachBait: () => void;
  readonly setMode: (mode: GameMode) => void;
  readonly revealAll: () => void;
  readonly reset: () => void;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const now = () => performance.now();

/** Fases que necesitan un fotograma por cuadro: la barra de fuerza y la pelea. */
const ANIMATED = new Set(["casting", "fighting"]);

/**
 * Conecta el motor puro con React. El render inicial es determinista (semilla fija y
 * modo desafío); al montar se siembra el azar y se respeta prefers-reduced-motion.
 */
export function useFishingGame(creatures: readonly Creature[]): FishingGameApi {
  const reducer = useMemo(() => createFishingEngine(creatures), [creatures]);
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createInitialState(DEFAULT_SEED, "challenge"),
  );
  const { phase, biteAt, biteDeadline } = state;

  useEffect(() => {
    dispatch({
      type: "reseed",
      seed: crypto.getRandomValues(new Uint32Array(1))[0] ?? 0,
    });
    if (window.matchMedia(REDUCED_MOTION).matches) {
      dispatch({ type: "setMode", mode: "relaxed" });
    }
  }, []);

  // Bucle de animación: solo mientras se carga el lanzamiento o se pelea.
  useEffect(() => {
    if (!ANIMATED.has(phase)) return;
    let frame = 0;
    let last = now();
    const loop = (time: number) => {
      dispatch({ type: "tick", now: time, dt: time - last });
      last = time;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  // Esperas puntuales: la picada y, en modo desafío, el momento en que se suelta.
  useEffect(() => {
    const due = phase === "waiting" ? biteAt : phase === "bite" ? biteDeadline : null;
    if (due === null) return;
    // setTimeout trunca los milisegundos y puede adelantarse una fracción: el tick lleva
    // al menos la hora prevista, o el motor seguiría esperando sin otro temporizador.
    const timer = window.setTimeout(
      () => dispatch({ type: "tick", now: Math.max(now(), due), dt: 0 }),
      Math.max(0, Math.ceil(due - now())),
    );
    return () => window.clearTimeout(timer);
  }, [phase, biteAt, biteDeadline]);

  const press = useCallback(() => dispatch({ type: "press", now: now() }), []);
  const release = useCallback(() => dispatch({ type: "release", now: now() }), []);
  const pickBait = useCallback(
    (bait: BaitId) => dispatch({ type: "pickBait", bait }),
    [],
  );
  const attachBait = useCallback(() => dispatch({ type: "attachBait" }), []);
  const detachBait = useCallback(() => dispatch({ type: "detachBait" }), []);
  const setMode = useCallback(
    (mode: GameMode) => dispatch({ type: "setMode", mode }),
    [],
  );
  const revealAll = useCallback(() => dispatch({ type: "revealAll" }), []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  return {
    state,
    press,
    release,
    pickBait,
    attachBait,
    detachBait,
    setMode,
    revealAll,
    reset,
  };
}
