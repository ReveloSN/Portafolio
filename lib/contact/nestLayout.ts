import type { ArtImage, ChannelId } from "@/types/contact";

/**
 * Geometría del nido. El escenario guarda la proporción de los SVG del nido
 * (560 de ancho); todo lo demás va en porcentajes de su ancho, así los tres huevos
 * escalan juntos y las crías nunca se solapan.
 */
export const NEST_STAGE = {
  /** Ancho y alto del escenario (unidades del viewBox del nido). */
  width: 560,
  height: 340,
  /** Ancho máximo del escenario, en múltiplos de --u. */
  maxWidthU: 46,
  /** Ancho de cada huevo (% del escenario): los tres tienen la misma escala. */
  eggWidth: 17,
  /** Alto de cada cría (% del ancho del escenario). */
  hatchlingHeight: 29,
  /** Base de huevos y crías (% del alto): queda tapada por el borde delantero del nido. */
  base: 15,
} as const;

export interface EggSlot {
  /** Centro del huevo (% del ancho del escenario). */
  readonly x: number;
  /** Duración del vaivén en reposo (s) y desfase (s, negativo: ya empezado). */
  readonly sway: number;
  readonly swayDelay: number;
  /** Altura extra del globito (em) para que los de huevos vecinos no se crucen. */
  readonly bubbleLift: number;
}

/** Separación pensada para las crías de cada canal (la de GitHub es la más ancha). */
export const EGG_SLOTS: Readonly<Record<ChannelId, EggSlot>> = {
  correo: { x: 18, sway: 5, swayDelay: -1.2, bubbleLift: 0 },
  linkedin: { x: 49.5, sway: 6.2, swayDelay: -3.4, bubbleLift: 1.9 },
  github: { x: 81, sway: 7, swayDelay: -0.6, bubbleLift: 0 },
};

/** Alto del escenario como porcentaje de su ancho (para aspect-ratio y cálculos). */
const stageRatio = NEST_STAGE.height / NEST_STAGE.width;

/** Ancho de la cría como porcentaje del ancho del huevo (su contenedor). */
export function hatchlingWidth(art: ArtImage): number {
  const width = (NEST_STAGE.hatchlingHeight * art.width) / art.height;
  return (width / NEST_STAGE.eggWidth) * 100;
}

/** Alto de la cría en unidades cqw del huevo (100cqw = ancho del huevo). */
export const hatchlingHeightCqw =
  (NEST_STAGE.hatchlingHeight / NEST_STAGE.eggWidth) * 100;

/** Borde izquierdo y derecho de una cría (% del ancho del escenario). */
export function hatchlingSpan(slot: EggSlot, art: ArtImage): readonly [number, number] {
  const half = (NEST_STAGE.hatchlingHeight * art.width) / art.height / 2;
  return [slot.x - half, slot.x + half];
}

/** Proporción del escenario para CSS (`aspect-ratio`). */
export const stageAspect = `${NEST_STAGE.width} / ${NEST_STAGE.height}`;

/** Alto del huevo como porcentaje del alto del escenario. */
export function eggHeightOfStage(art: ArtImage): number {
  return (NEST_STAGE.eggWidth * art.height) / art.width / stageRatio;
}
