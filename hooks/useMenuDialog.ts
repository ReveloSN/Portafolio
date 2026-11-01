"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Menú pequeño que se abre desde un botón: al abrir enfoca su primer control, atrapa el
 * foco con Tab, se cierra con Escape o con un toque fuera y devuelve el foco al botón.
 * Las refs las crea el componente (el botón y el panel son suyos).
 */
export function useMenuDialog(
  buttonRef: RefObject<HTMLButtonElement | null>,
  panelRef: RefObject<HTMLDivElement | null>,
) {
  const [open, setOpen] = useState(false);

  const close = useCallback(
    (restoreFocus = true) => {
      setOpen(false);
      if (restoreFocus) buttonRef.current?.focus();
    },
    [buttonRef],
  );
  const toggle = useCallback(() => setOpen((value) => !value), []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;
    const items = () => [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
    items()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const list = items();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.contains(target) && !buttonRef.current?.contains(target)) close(false);
    };
    panel.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      panel.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close, buttonRef, panelRef]);

  return { open, toggle, close };
}
