"use client";

import { useCallback, type RefObject } from "react";
import type { FishingGameApi } from "@/hooks/useFishingGame";
import { useBaitDrag } from "@/hooks/useBaitDrag";
import { actionIntent } from "@/lib/fishing/view";
import type { BaitId } from "@/types/fishing";

/**
 * Tomar y enganchar la carnada por cualquier camino: arrastre, teclado o modo relajado.
 * Tras enganchar (o elegir con teclado) el foco vuelve al botón de acción persistente.
 */
export interface BaitControlRefs {
  readonly canvasRef: RefObject<HTMLDivElement | null>;
  readonly zoneRef: RefObject<HTMLDivElement | null>;
  readonly ghostRef: RefObject<HTMLDivElement | null>;
  readonly actionRef: RefObject<HTMLButtonElement | null>;
}

export function useBaitControls(game: FishingGameApi, refs: BaitControlRefs) {
  const { canvasRef, zoneRef, ghostRef, actionRef } = refs;
  const { state, pickBait, attachBait, press } = game;
  const relaxed = state.mode === "relaxed";

  const focusAction = useCallback(
    () => actionRef.current?.focus({ preventScroll: true }),
    [actionRef],
  );

  const attach = useCallback(() => {
    attachBait();
    focusAction();
  }, [attachBait, focusAction]);

  const drag = useBaitDrag({
    canvasRef,
    zoneRef,
    ghostRef,
    dragEnabled: !relaxed,
    onPick: (bait: BaitId, via) => {
      pickBait(bait);
      // Modo relajado: el motor ya la enganchó; solo se ve el vuelo hasta el anzuelo.
      if (relaxed) void drag.flyFromBucket(bait);
      if (via === "keyboard") focusAction();
    },
    onAttach: attach,
    onPointerClick: () => {
      if (relaxed) focusAction();
    },
  });

  /** El botón de acción engancha la carnada si aún no lo está; si no, lanza o pelea. */
  const onAction = useCallback(() => {
    if (actionIntent(state) === "attach" && state.bait) {
      void drag.flyFromBucket(state.bait).then(attach);
      return;
    }
    press();
  }, [state, drag, attach, press]);

  return { interactionFor: drag.interactionFor, onAction };
}
