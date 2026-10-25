export const WORLD_SLUGS = ["selva", "oceano", "cueva"] as const;

export type WorldSlug = (typeof WORLD_SLUGS)[number];

export interface WorldDepth {
  readonly title: string;
  readonly subtitle: string;
}

export interface World {
  readonly slug: WorldSlug;
  readonly number: string;
  readonly name: string;
  readonly accent: string;
  readonly ink: string;
  readonly background: string;
  readonly depths: readonly [WorldDepth, WorldDepth, WorldDepth];
}
