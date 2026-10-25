import type { WorldSlug } from "./world";

export interface ProjectMetric {
  readonly value: string;
  readonly label: string;
}

export interface ProjectFeature {
  readonly title: string;
  readonly description: string;
}

export interface Project {
  readonly id: string;
  readonly slug: WorldSlug;
  readonly name: string;
  readonly summary: string;
  readonly tagline: string;
  readonly technologies: readonly string[];
  readonly repoUrl: string;
  readonly demoUrl: string;
  readonly problem: string;
  readonly roleItems: readonly string[];
  readonly metrics: readonly ProjectMetric[];
  readonly features: readonly ProjectFeature[];
  readonly screenshots: readonly string[];
}
