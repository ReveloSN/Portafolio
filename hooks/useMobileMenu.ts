"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";

/**
 * Menú desplegable del Navbar móvil. Escape lo cierra y devuelve el foco al botón;
 * si el foco sale del encabezado (Tab más allá del último enlace), también se cierra.
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((value) => !value), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const onBlur = useCallback((event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && !event.currentTarget.contains(next)) setOpen(false);
  }, []);

  return { open, toggle, close, toggleRef, onBlur };
}
