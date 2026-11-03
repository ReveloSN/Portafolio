"use client";

import { type RefObject, useEffect, useRef } from "react";

/**
 * Cuando `done` pasa a verdadero por una acción propia (`own`) y el foco quedó
 * huérfano porque el control desapareció, lo lleva a `target`. No roba el foco
 * si el usuario está en otro elemento (por ejemplo, un botón de la barra).
 */
export function useFocusOnComplete(
  done: boolean,
  own: boolean,
  target: RefObject<HTMLElement | null>,
): void {
  const wasDone = useRef(done);

  useEffect(() => {
    if (done && !wasDone.current && own) {
      const active = document.activeElement;
      if (!active || active === document.body) {
        target.current?.focus({ preventScroll: true });
      }
    }
    wasDone.current = done;
  }, [done, own, target]);
}
