import { NEST_ART } from "@/data/contactArt";
import type { ArtImage, ChannelId } from "@/types/contact";

/**
 * Geometría del nido. El escenario tiene la proporción de las capas pintadas del nido;
 * todo lo demás va en porcentajes de su ancho, así los tres huevos escalan juntos y
 * las crías nunca se solapan.
 */
export const NEST_STAGE = {
  /** Ancho y alto del escenario: los de las capas del nido. */
  width: NEST_ART.back.width,
  height: NEST_ART.back.height,
  /** Ancho de cada huevo (% del escenario): los tres tienen la misma escala. */
  eggWidth: 14,
  /** Alto de cada cría (% del ancho del escenario). */
  hatchlingHeight: 22,
  /** La cría se para un poco más arriba que la base del huevo, sobre el borde delantero. */
  hatchlingLift: 4,
} as const;

export interface EggSlot {
  /** Centro del huevo (% del ancho del escenario). */
  readonly x: number;
  /**
   * Base del huevo y de la cría, desde abajo (% del ancho del escenario): un cuarto
   * del huevo por debajo del borde delantero del nido, que mide
   * `scripts/optimize-contact.ts` en cada posición.
   */
  readonly base: number;
  /** Duración del vaivén en reposo (s) y desfase (s, negativo: ya empezado). */
  readonly sway: number;
  readonly swayDelay: number;
}

/**
 * Dentro del hueco del nido, separados para las crías de cada canal (la de GitHub es
 * la más ancha). En el centro el borde delantero baja más, por eso ese huevo va más abajo.
 */
export const EGG_SLOTS: Readonly<Record<ChannelId, EggSlot>> = {
  correo: { x: 25, base: 18.9, sway: 5, swayDelay: -1.2 },
  linkedin: { x: 50, base: 13.5, sway: 6.2, swayDelay: -3.4 },
  github: { x: 76, base: 18.6, sway: 7, swayDelay: -0.6 },
};

/** Base del huevo como porcentaje del alto del escenario (para `bottom`). */
export const slotBottom = (slot: EggSlot) =>
  (slot.base * NEST_STAGE.width) / NEST_STAGE.height;

/** Ancho de la cría como porcentaje del ancho del huevo (su contenedor). */
export function hatchlingWidth(art: ArtImage): number {
  const width = (NEST_STAGE.hatchlingHeight * art.width) / art.height;
  return (width / NEST_STAGE.eggWidth) * 100;
}

/** Cuánto sube la cría sobre la base del huevo, en cqw del huevo. */
export const hatchlingLiftCqw = (NEST_STAGE.hatchlingLift / NEST_STAGE.eggWidth) * 100;

/** Alto de la cría en unidades cqw del huevo (100cqw = ancho del huevo). */
export const hatchlingHeightCqw =
  (NEST_STAGE.hatchlingHeight / NEST_STAGE.eggWidth) * 100;

/** Borde izquierdo y derecho de una cría (% del ancho del escenario). */
export function hatchlingSpan(slot: EggSlot, art: ArtImage): readonly [number, number] {
  const half = (NEST_STAGE.hatchlingHeight * art.width) / art.height / 2;
  return [slot.x - half, slot.x + half];
}
