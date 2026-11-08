"use client";

import { useOffscreenPause } from "@/hooks/useOffscreenPause";

interface OffscreenPauseProps {
  /** Secciones a observar, p. ej. "main > section". */
  readonly selector: string;
}

/** Pausa las animaciones de las secciones fuera de pantalla. No pinta nada. */
export function OffscreenPause({ selector }: OffscreenPauseProps) {
  useOffscreenPause(selector);
  return null;
}
