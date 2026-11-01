import type { BreachTimeline } from "@/data/breach";
import { nextRandom } from "@/lib/fishing/random";
import type { BreachStage } from "@/types/fishing";

export interface TimedStep {
  readonly stage: BreachStage;
  readonly ms: number;
}

const ORDER = ["bulge", "rise", "snap", "fall", "splash"] as const;
/** Con movimiento reducido no hay salto: la criatura aparece a media altura con un fundido. */
export const REDUCED_FADE_MS = 300;

/** Pasos del salto en orden; con movimiento reducido, solo "snap" (quieta) y fin. */
export function breachSteps(
  timeline: BreachTimeline,
  reduced: boolean,
): readonly TimedStep[] {
  if (reduced) {
    const visible = timeline.stages.bulge + timeline.stages.rise + timeline.stages.snap;
    return [
      { stage: "snap", ms: Math.max(REDUCED_FADE_MS, visible) },
      { stage: "idle", ms: 0 },
    ];
  }
  return [
    ...ORDER.map((stage) => ({ stage, ms: timeline.stages[stage] })),
    { stage: "idle", ms: 0 },
  ];
}

export const breachDuration = (timeline: BreachTimeline) =>
  ORDER.reduce((total, stage) => total + timeline.stages[stage], 0);

/** El anzuelo cuelga en el aire hasta el mordisco. */
export const isHookInAir = (stage: BreachStage) => stage === "bulge" || stage === "rise";

export interface Droplet {
  /** Desplazamientos en % del ancho (x) y del alto (subida y caída) de la escena. */
  readonly dx: number;
  readonly rise: number;
  readonly fall: number;
  /** Tamaño en % del ancho de la escena. */
  readonly size: number;
  /** Índice de la gota pintada (particle-1 … particle-10). */
  readonly sprite: number;
  readonly delay: number;
  readonly duration: number;
}

const SPRITES = 10;
const SPREAD = 16;

/** Gotas con trayectorias parabólicas fijas por semilla: mismo salto, mismas gotas. */
export function makeDroplets(count: number, seed: number): readonly Droplet[] {
  let state = seed;
  const draw = () => {
    const result = nextRandom(state);
    state = result.seed;
    return result.value;
  };
  return Array.from({ length: count }, () => ({
    dx: (draw() - 0.5) * SPREAD,
    rise: 4 + draw() * 12,
    fall: 2 + draw() * 6,
    size: 0.6 + draw() * 0.9,
    sprite: 1 + Math.floor(draw() * SPRITES),
    delay: Math.round(draw() * 120),
    duration: Math.round(550 + draw() * 350),
  }));
}
