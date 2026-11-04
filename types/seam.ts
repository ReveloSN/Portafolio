import type { ArtEntry } from "./art";

/** Costuras entre secciones consecutivas (orden de la página). */
export type SeamId =
  | "hero-about"
  | "about-projects"
  | "projects-testimonials"
  | "testimonials-skills"
  | "contact-footer";

/**
 * Borde del divisor que se pega a la costura. El divisor siempre vive en la sección
 * de abajo (que se pinta encima de la anterior):
 * - "top": su borde superior está en la costura y cuelga hacia dentro de la sección.
 * - "bottom": su borde inferior está en la costura y crece hacia la sección de arriba.
 */
export type DividerAnchor = "top" | "bottom";

export interface DividerConfig {
  readonly art: ArtEntry;
  readonly anchor: DividerAnchor;
  readonly flipY?: boolean;
  readonly zIndex: number;
  /** Solape con la sección vecina, en múltiplos de --u (más 4px fijos). */
  readonly overlapU: number;
  /** Velocidad del paralaje de scroll; negativa = sentido contrario. */
  readonly parallaxSpeed: number;
  /** Desplazamiento de la costura dentro de la sección (p. ej. la línea de tierra). */
  readonly offset?: string;
  /** Funde el borde lleno de la banda con el fondo (por defecto sí). */
  readonly fadeEdge?: boolean;
  /** Carga inmediata (solo el primer divisor de la página). */
  readonly eager?: boolean;
}

/** Sección que pinta el elemento: la de arriba o la de abajo (que puede cruzar hacia arriba). */
export type SeamHost = "upper" | "lower";

/** Balanceo: liana (desde arriba, ±2.5°) o cola (desde el borde derecho, ±3°). */
export interface SwayConfig {
  readonly kind: "vine" | "tail";
  readonly duration: number;
  readonly delay: number;
}

export interface AccentConfig {
  readonly id: string;
  readonly art: ArtEntry;
  readonly host: SeamHost;
  readonly side: "left" | "right";
  /** Borde de la sección al que se ancla. */
  readonly edge: "top" | "bottom";
  /** Ancho en múltiplos de --u. */
  readonly widthU: number;
  /** Parte del alto que sale por el borde (cruza la costura); 0 = al ras, completa. */
  readonly cross: number;
  readonly rotate: number;
  readonly parallaxSpeed: number;
  /** Orden dentro de la sección; las lianas van debajo del divisor (que tapa su extremo). */
  readonly zIndex: number;
  readonly sway?: SwayConfig;
  /** Los grandes se ocultan en móvil; los demás se reducen al 60 %. */
  readonly large?: boolean;
  /** Solo en pantallas de 1024px o más. */
  readonly desktopOnly?: boolean;
}

export interface SeamConfig {
  readonly divider?: DividerConfig;
  readonly accents: readonly AccentConfig[];
  /** Banda de niebla CSS sobre la costura. */
  readonly mist?: boolean;
}
