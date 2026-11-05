"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  CRACK_MS,
  HATCH_TIMING,
  anyOpen,
  initialNest,
  nestReducer,
} from "@/lib/contact/hatch";

interface UseHatchOptions<Id extends string> {
  readonly ids: readonly Id[];
  readonly reducedMotion: boolean;
  /** La cría ya está fuera y quieta: momento de su acción (p. ej. llevar al formulario). */
  readonly onSettled: (id: Id) => void;
  /** Se pulsa una cría que ya salió. */
  readonly onHatchlingPress: (id: Id) => void;
}

/**
 * Conecta la máquina de eclosión con el puntero, el teclado y el tacto (el huevo es un
 * botón: Enter, Espacio y toque llegan como clic) y con los temporizadores de la
 * secuencia, que se limpian al reiniciar y al desmontar.
 */
export function useHatch<Id extends string>(options: UseHatchOptions<Id>) {
  const { ids, reducedMotion } = options;
  const [state, dispatch] = useReducer(nestReducer<Id>, ids, initialNest<Id>);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  // Las acciones cambian en cada render del padre: se leen siempre las últimas
  const latest = useRef(options);
  useEffect(() => {
    latest.current = options;
  });

  const later = useCallback((ms: number, fn: () => void) => {
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      fn();
    }, ms);
    timers.current.add(timer);
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const activate = useCallback(
    (id: Id) => {
      const phase = state.phases[id];
      if (phase === "hatched") return latest.current.onHatchlingPress(id);
      if (phase === "cracking") return;
      dispatch({ type: "egg", id, event: { type: "activate", instant: reducedMotion } });
      const settle = () => latest.current.onSettled(id);
      if (reducedMotion) return later(HATCH_TIMING.reducedFade, settle);
      later(CRACK_MS, () => {
        dispatch({ type: "egg", id, event: { type: "cracked" } });
        later(HATCH_TIMING.rise, settle);
      });
    },
    [state.phases, reducedMotion, later],
  );

  const enter = useCallback(
    (id: Id) => dispatch({ type: "egg", id, event: { type: "enter" } }),
    [],
  );
  const leave = useCallback(
    (id: Id) => dispatch({ type: "egg", id, event: { type: "leave" } }),
    [],
  );

  const resetAll = useCallback(() => {
    clearTimers();
    dispatch({ type: "resetAll" });
  }, [clearTimers]);

  return {
    open: anyOpen(state),
    phases: state.phases,
    lastHatch: state.lastHatch,
    activate,
    enter,
    leave,
    resetAll,
  };
}
