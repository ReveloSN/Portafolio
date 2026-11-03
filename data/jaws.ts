import type { TeethConfig } from "@/types/jaws";

/** Lienzo de cada mandíbula; se estira al ancho del velo (`preserveAspectRatio="none"`). */
export const JAW_VIEWBOX = { width: 1200, height: 520 } as const;

/** Altura de la línea de los labios medida desde la raíz de la mandíbula. */
export const JAW_LIP_Y = 150;

/** Ondulación sutil del labio. */
export const JAW_LIP_WAVE = { amplitude: 6, wavelength: 150, step: 25 } as const;

/**
 * Los dientes de arriba empiezan en el centro de cada hueco y los de abajo justo en medio,
 * así que cuando las mandíbulas se cierran se entrecruzan. La punta de unos termina donde
 * empieza el labio del otro maxilar (`JAW_VIEWBOX.height - JAW_LIP_Y`).
 */
export const UPPER_TEETH: TeethConfig = {
  count: 7,
  phase: 0.5,
  rootY: 115,
  lengthMin: 190,
  lengthMax: 255,
  halfWidth: 52,
  seed: 3,
};

export const LOWER_TEETH: TeethConfig = {
  count: 6,
  phase: 1,
  rootY: 115,
  lengthMin: 178,
  lengthMax: 245,
  halfWidth: 48,
  seed: 11,
};
