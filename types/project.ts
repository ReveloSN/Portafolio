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

/** Ficha breve que acompaña al problema en la página del mundo. */
export interface ProjectFacts {
  readonly period: string;
  readonly team: string;
  readonly platform: string;
  readonly status: string;
}

/** Enlace para probar el proyecto: una versión descargable o publicada. */
export interface ProjectDownload {
  readonly href: string;
  readonly label: string;
}

export interface Project {
  readonly id: string;
  readonly slug: WorldSlug;
  readonly name: string;
  readonly summary: string;
  readonly tagline: string;
  readonly technologies: readonly string[];
  readonly repoUrl: string;
  /** Solo si hay algo que un visitante pueda instalar o abrir. */
  readonly download?: ProjectDownload;
  readonly problem: string;
  readonly facts: ProjectFacts;
  readonly roleItems: readonly string[];
  readonly metrics: readonly ProjectMetric[];
  readonly features: readonly ProjectFeature[];
  /** Puede ir vacío: la galería avisa que las capturas están en camino. */
  readonly screenshots: readonly ProjectScreenshot[];
}
