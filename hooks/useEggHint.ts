"use client";

import { useEffect, useState } from "react";
import type { HatchPhase } from "@/lib/contact/hatch";

/** Cada cuánto un huevo entero se agrieta un poco como pista, y cuánto dura. */
export const HINT_EVERY_MS = 9000;
export const HINT_MS = 900;

/**
 * Turna una pista entre los huevos que siguen enteros. Solo corre si el movimiento
 * está permitido y el nido está en pantalla; si no, no hay pista.
 */
export function useEggHint<Id extends string>(
  ids: readonly Id[],
  phases: Readonly<Record<Id, HatchPhase>>,
  enabled: boolean,
): Id | null {
  const [hint, setHint] = useState<Id | null>(null);
  const idle = ids.filter((id) => phases[id] === "idle");
  const idleKey = idle.join(",");

  useEffect(() => {
    if (!enabled || idleKey === "") return;
    const candidates = idleKey.split(",") as Id[];
    let turn = 0;
    let clear: ReturnType<typeof setTimeout> | undefined;
    const every = setInterval(() => {
      setHint(candidates[turn % candidates.length] ?? null);
      turn++;
      clear = setTimeout(() => setHint(null), HINT_MS);
    }, HINT_EVERY_MS);
    return () => {
      clearInterval(every);
      clearTimeout(clear);
      setHint(null);
    };
  }, [enabled, idleKey]);

  return hint;
}
