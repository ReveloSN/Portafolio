import type { WorldSlug } from "./world";

export interface ProjectMetric {
  readonly value: string;
  readonly label: string;
}

export interface ProjectFeature {
  readonly title: string;
  readonly description: string;
}

/** Captura real del proyecto en `public/images/projects/<slug>/`, con su tamaño (sin CLS). */
export interface ProjectScreenshot {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Project {
  readonly id: string;
  readonly slug: WorldSlug;
  readonly name: string;
  readonly summary: string;
  readonly tagline: string;
  readonly technologies: readonly string[];
  readonly repoUrl: string;
  readonly problem: string;
  readonly roleItems: readonly string[];
  readonly metrics: readonly ProjectMetric[];
  readonly features: readonly ProjectFeature[];
  /** Puede ir vacío: la galería avisa que las capturas están en camino. */
  readonly screenshots: readonly ProjectScreenshot[];
}
