import { ROD_REST_DEG } from "@/lib/fishing/scene";
import type { GamePhase } from "@/types/fishing";
import type { LakePieceId } from "@/types/lake";

export type KidPose = Extract<
  LakePieceId,
  "explorer-idle" | "explorer-cast" | "explorer-reel"
>;

export const KID_POSES: readonly KidPose[] = [
  "explorer-idle",
  "explorer-cast",
  "explorer-reel",
];

/** Quieto en reposo y esperando; lanzando mientras vuela la boya; recogiendo en la pelea. */
export function kidPose(phase: GamePhase): KidPose {
  if (phase === "casting") return "explorer-cast";
  if (phase === "fighting") return "explorer-reel";
  return "explorer-idle";
}

/** Ángulos de la caña (grados; negativo = hacia arriba). */
export const ROD_ANGLES = {
  /** La picada la dobla hacia el agua. */
  bite: -26,
  /** En la pelea queda inclinada; el temblor lo pone el CSS. */
  fight: -22,
} as const;

/** Ángulo de la caña según la fase (el lanzamiento es un gesto CSS sobre el reposo). */
export function rodAngle(phase: GamePhase): number {
  switch (phase) {
    case "bite":
      return ROD_ANGLES.bite;
    case "fighting":
      return ROD_ANGLES.fight;
    default:
      return ROD_REST_DEG;
  }
}
