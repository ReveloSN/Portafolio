import { DIFFICULTY_BASE, PROGRESS, RELAXED, TENSION } from "@/lib/fishing/config";
import type { FightState, GameMode } from "@/types/fishing";

export type FightOutcome = "fighting" | "caught" | "escaped" | "lineBroken";

export interface FightInput {
  readonly holding: boolean;
  readonly mode: GameMode;
  /** Tirón del pez en este instante (0 a 1). */
  readonly fishPull: number;
  readonly difficulty: number;
  readonly dtMs: number;
}

export interface FightStep {
  readonly fight: FightState;
  readonly outcome: FightOutcome;
}

const MS_PER_SECOND = 1000;

export const INITIAL_FIGHT: FightState = {
  tension: 0,
  progress: PROGRESS.start,
  fishPull: 0,
  overTensionMs: 0,
  elapsedMs: 0,
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const isInGreenZone = (tension: number) =>
  tension >= TENSION.greenMin && tension <= TENSION.greenMax;

function outcomeOf(fight: FightState): FightOutcome {
  if (fight.overTensionMs >= TENSION.breakAfterMs) return "lineBroken";
  if (fight.progress >= 1) return "caught";
  if (fight.progress <= 0) return "escaped";
  return "fighting";
}

function relaxedStep(fight: FightState, input: FightInput): FightState {
  const seconds = input.dtMs / MS_PER_SECOND;
  const gain = input.holding ? RELAXED.reelPerSecond * seconds : 0;
  return {
    ...fight,
    tension: 0,
    fishPull: 0,
    progress: clamp01(fight.progress + gain),
    elapsedMs: fight.elapsedMs + input.dtMs,
  };
}

function challengeStep(fight: FightState, input: FightInput): FightState {
  const seconds = input.dtMs / MS_PER_SECOND;
  const pull = clamp01(input.fishPull) * (DIFFICULTY_BASE + input.difficulty);

  const tensionDelta = input.holding
    ? TENSION.reelRise + TENSION.fishRise * pull
    : -Math.max(TENSION.minFall, TENSION.slackFall - TENSION.fishHold * pull);
  const tension = clamp01(fight.tension + tensionDelta * seconds);

  const progressDelta = input.holding
    ? PROGRESS.gain * (isInGreenZone(tension) ? 1 : PROGRESS.offZoneFactor)
    : -(PROGRESS.slackLoss + PROGRESS.fishDrag * pull);
  const progress = clamp01(fight.progress + progressDelta * seconds);

  return {
    tension,
    progress,
    fishPull: clamp01(input.fishPull),
    overTensionMs: tension > TENSION.breakAt ? fight.overTensionMs + input.dtMs : 0,
    elapsedMs: fight.elapsedMs + input.dtMs,
  };
}

/** Avanza la pelea `dtMs` milisegundos. Pura: no lee el reloj ni el azar. */
export function stepFight(fight: FightState, input: FightInput): FightStep {
  const next =
    input.mode === "relaxed" ? relaxedStep(fight, input) : challengeStep(fight, input);
  return { fight: next, outcome: outcomeOf(next) };
}

/** Modo relajado: una pulsación suma un tramo fijo de progreso. */
export function relaxedTap(fight: FightState): FightStep {
  const next = { ...fight, progress: clamp01(fight.progress + RELAXED.tapProgress) };
  return { fight: next, outcome: outcomeOf(next) };
}
