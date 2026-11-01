"use client";

import { useCallback, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Interruptor "Efectos": activado por defecto y apagado con prefers-reduced-motion, hasta
 * que la persona lo cambie a mano.
 */
export function useEffectsToggle() {
  const reduced = useReducedMotion();
  const [choice, setChoice] = useState<boolean | null>(null);
  const enabled = choice ?? !reduced;
  const setEnabled = useCallback((next: boolean) => setChoice(next), []);
  return { enabled, setEnabled };
}
