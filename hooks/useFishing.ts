"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import {
  BITE_DELAY_MIN_MS,
  BITE_DELAY_SPREAD_MS,
  BITE_WINDOW_MS,
  CAUGHT_DISPLAY_MS,
  REEL_DURATION_MS,
} from "@/lib/constants";
import { createFishingReducer, INITIAL_FISHING_STATE } from "@/lib/fishingReducer";
import type { FishingState } from "@/types/fishing";

export interface FishingApi {
  readonly state: FishingState;
  readonly cast: () => void;
  readonly pull: () => void;
  readonly reset: () => void;
}

/** Orquesta los temporizadores de la máquina de estados del lago. */
export function useFishing(totalCatches: number): FishingApi {
  const reducer = useMemo(() => createFishingReducer(totalCatches), [totalCatches]);
  const [state, dispatch] = useReducer(reducer, INITIAL_FISHING_STATE);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => {
    clear();
    switch (state.phase) {
      case "waiting":
        timer.current = setTimeout(
          () => dispatch({ type: "bite" }),
          BITE_DELAY_MIN_MS + Math.random() * BITE_DELAY_SPREAD_MS,
        );
        break;
      case "bite":
        timer.current = setTimeout(() => dispatch({ type: "escape" }), BITE_WINDOW_MS);
        break;
      case "reeling":
        timer.current = setTimeout(() => dispatch({ type: "land" }), REEL_DURATION_MS);
        break;
      case "caught":
        timer.current = setTimeout(
          () => dispatch({ type: "release" }),
          CAUGHT_DISPLAY_MS,
        );
        break;
      case "idle":
        break;
    }
    return clear;
  }, [state.phase, clear]);

  const cast = useCallback(() => dispatch({ type: "cast" }), []);
  const pull = useCallback(() => dispatch({ type: "pull" }), []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  return { state, cast, pull, reset };
}
