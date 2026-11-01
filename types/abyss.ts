/* ---------- Inmersión al abismo (sección Experiencia) ---------- */

export type AbyssZoneId = "surface" | "middle" | "deep";

export type AbyssCreatureArt =
  | "fish-1"
  | "fish-2"
  | "fish-3"
  | "fish-4"
  | "mosasaur"
  | "megalodon"
  | "abyssal-fish"
  | "jelly-1"
  | "jelly-2";

/** Piezas que genera scripts/optimize-abyss.ts (los fondos se llaman como su zona). */
export type AbyssArtId =
  | AbyssZoneId
  | "rays"
  | "kelp-left"
  | "kelp-right"
  | "lantern"
  | "particle"
  | AbyssCreatureArt;

export interface AbyssArtAsset {
  readonly id: AbyssArtId;
  readonly src: string;
  /** Versión de 960 px para móviles (solo los fondos). */
  readonly mobileSrc?: string;
  readonly width: number;
  readonly height: number;
}

export interface AbyssZone {
  readonly id: AbyssZoneId;
  /** Tramo de la inmersión (--depth, de 0 a 1) en el que domina la zona. */
  readonly from: number;
  readonly to: number;
  /** Agua de respaldo (arriba → abajo) si falta el fondo pintado; también sin JS. */
  readonly water: readonly [string, string];
  /** Niebla que tiñe a lo lejos. */
  readonly fog: string;
  /** Oscuridad propia (0 a 1): cuánto se apagan sus criaturas fuera del haz. */
  readonly darkness: number;
}

/**
 * glide: cruza recto con un vaivén suave · pulse: medusa que late y sube y baja ·
 * pass: el megalodón, una pasada lenta por ciclo y el resto del ciclo fuera de escena.
 */
export type DriftPath = "glide" | "pulse" | "pass";

export interface DriftingCreatureSpec {
  readonly id: string;
  readonly art: AbyssCreatureArt;
  readonly zone: AbyssZoneId;
  /** Duración de un cruce completo (s): entre 30 y 70; la pasada del megalodón, 45. */
  readonly seconds: number;
  /** Desfase (s, negativo): empieza a medio camino y no van todas a la par. */
  readonly delay: number;
  /** Altura en el escenario (%). */
  readonly top: number;
  /** Ancho en unidades --u. */
  readonly size: number;
  /** Lejanía de 0 (cerca) a 1 (al fondo): más oscura, más desenfocada y más lenta. */
  readonly z: number;
  readonly direction: "ltr" | "rtl";
  readonly path: DriftPath;
  /** En móvil solo se animan 3 por zona. */
  readonly mobile: boolean;
}

export interface ParticleLayerSpec {
  readonly id: "far" | "near";
  readonly count: number;
  /** Tamaño mínimo y máximo en --u. */
  readonly size: readonly [number, number];
  /** Segundos que tarda en subir una partícula. */
  readonly rise: number;
  /** Cuánto se desplaza la capa (svh) de la superficie al fondo. */
  readonly parallax: number;
  readonly opacity: number;
}

/** Alto (svh) de la pantalla inicial, de cada tarjeta y del final de la inmersión. */
export interface DiveLayout {
  readonly surface: number;
  readonly slot: number;
  readonly end: number;
}
