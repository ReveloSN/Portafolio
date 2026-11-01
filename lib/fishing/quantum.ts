import type { CreatureSize, GamePhase } from "@/types/fishing";

/**
 * Estados visuales del "lago cuántico":
 * superposition (esperando: la criatura está en varios sitios a la vez), collapse (picada:
 * las copias se juntan en una), focused (pelea: una sola nítida con destello) y dissolve
 * (captura o escape: se deshace en partículas).
 */
export type QuantumMode = "idle" | "superposition" | "collapse" | "focused" | "dissolve";

const MODE_BY_PHASE: Partial<Readonly<Record<GamePhase, QuantumMode>>> = {
  waiting: "superposition",
  bite: "collapse",
  fighting: "focused",
  caught: "dissolve",
  escaped: "dissolve",
};

export const quantumMode = (phase: GamePhase): QuantumMode =>
  MODE_BY_PHASE[phase] ?? "idle";

/** Ancho de la sombra (% del ancho de la escena): anticipa el tamaño de la criatura. */
export const SHADOW_WIDTH: Readonly<Record<CreatureSize, number>> = {
  small: 7,
  medium: 10,
  large: 15,
  huge: 21,
};

/** Las copias se juntan en este tiempo al picar. */
export const COLLAPSE_MS = 300;
