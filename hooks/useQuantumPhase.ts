"use client";

import { useMemo } from "react";
import { quantumMode, type QuantumMode } from "@/lib/fishing/quantum";
import type { GamePhase } from "@/types/fishing";

/** Estado visual del lago cuántico para la fase del juego (o "idle" sin efectos). */
export function useQuantumPhase(phase: GamePhase, enabled: boolean): QuantumMode {
  return useMemo(() => (enabled ? quantumMode(phase) : "idle"), [phase, enabled]);
}
