/** Costuras entre secciones consecutivas (orden de la página). */
export type SeamId =
  | "hero-about"
  | "about-projects"
  | "projects-testimonials"
  | "contact-skills"
  | "skills-footer";

/**
 * Borde del divisor que se pega a la costura. El divisor siempre vive en la sección
 * de abajo (que se pinta encima de la anterior):
 * - "top": su borde superior está en la costura y cuelga hacia dentro de la sección.
 * - "bottom": su borde inferior está en la costura y crece hacia la sección de arriba.
 */
export type DividerAnchor = "top" | "bottom";

export interface ArtAsset {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

export interface DividerConfig {
  readonly art: ArtAsset;
  readonly anchor: DividerAnchor;
  readonly flipY?: boolean;
  readonly zIndex: number;
  /** Velocidad del paralaje de scroll; negativa = sentido contrario. */
  readonly parallaxSpeed: number;
  /** Desplazamiento de la costura dentro de la sección (p. ej. la línea de tierra). */
  readonly offset?: string;
  /** Carga inmediata (solo el primer divisor de la página). */
  readonly eager?: boolean;
}

/** Sección que pinta el elemento: la de arriba (queda recortado) o la de abajo (cruza la costura). */
export type SeamHost = "upper" | "lower";

export interface AccentConfig {
  readonly id: string;
  readonly art: ArtAsset;
  readonly host: SeamHost;
  readonly side: "left" | "right";
  /** Ancho en múltiplos de --u. */
  readonly widthU: number;
  /** Parte del ancho que queda fuera del borde lateral (0–1). */
  readonly outside: number;
  /** Parte del alto que cruza la costura (0–1). */
  readonly cross: number;
  readonly rotate: number;
  readonly parallaxSpeed: number;
  /** Balanceo de liana: duración y retraso en segundos. */
  readonly sway?: { readonly duration: number; readonly delay: number };
  /** Los grandes se ocultan en móvil; los demás se reducen al 60 %. */
  readonly large?: boolean;
}

export interface SeamConfig {
  readonly divider?: DividerConfig;
  readonly accents: readonly AccentConfig[];
  /** Banda de niebla CSS sobre la costura. */
  readonly mist?: boolean;
}
