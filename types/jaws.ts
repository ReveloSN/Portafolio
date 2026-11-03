/** Un diente cónico de las mandíbulas, en coordenadas del `viewBox` de la mandíbula. */
export interface Tooth {
  readonly x: number;
  /** Altura de la raíz (dentro de la encía). */
  readonly baseY: number;
  readonly length: number;
  readonly halfWidth: number;
  /** Desvío lateral de la punta: los dientes no son simétricos. */
  readonly lean: number;
}

/** Cómo se reparten los dientes de una mandíbula. */
export interface TeethConfig {
  readonly count: number;
  /** Desplazamiento de la fila en fracciones de separación (0.5 = entre los dientes del otro maxilar). */
  readonly phase: number;
  readonly rootY: number;
  readonly lengthMin: number;
  readonly lengthMax: number;
  readonly halfWidth: number;
  readonly seed: number;
}
