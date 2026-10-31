import { ROD_REST_DEG } from "@/lib/fishing/scene";
import type { FightState, GameMode, GamePhase } from "@/types/fishing";
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

/** Quieto en reposo y esperando; lanzando al cargar; recogiendo en la pelea. */
export function kidPose(phase: GamePhase): KidPose {
  if (phase === "casting") return "explorer-cast";
  if (phase === "fighting") return "explorer-reel";
  return "explorer-idle";
}

/** Ángulos de la caña (grados; negativo = hacia arriba). */
export const ROD_ANGLES = {
  /** Al cargar se echa hacia atrás hasta este extra con la fuerza al máximo. */
  pullBack: 30,
  /** La picada la dobla hacia el agua. */
  bite: -26,
  /** En la pelea queda inclinada y vibra según la tensión. */
  fight: -22,
  fightVibration: 4,
} as const;

/** Ritmo de la vibración en la pelea (radianes por ms). */
const VIBRATION_SPEED = 0.06;

/** Ángulo de la caña según la fase. La tensión (o el progreso en relajado) la hace vibrar. */
export function rodAngle(
  phase: GamePhase,
  power: number,
  fight: FightState,
  mode: GameMode,
): number {
  switch (phase) {
    case "casting":
      return ROD_REST_DEG - power * ROD_ANGLES.pullBack;
    case "bite":
      return ROD_ANGLES.bite;
    case "fighting": {
      const strain = mode === "challenge" ? fight.tension : fight.fishPull;
      const wobble = Math.sin(fight.elapsedMs * VIBRATION_SPEED) * strain;
      return ROD_ANGLES.fight + wobble * ROD_ANGLES.fightVibration;
    }
    default:
      return ROD_REST_DEG;
  }
}
