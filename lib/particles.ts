export interface Particle {
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly delay: number;
  readonly duration: number;
}

interface ParticleRecipe {
  readonly xBase: number;
  readonly xStep: number;
  readonly xSpan: number;
  readonly yBase: number;
  readonly yStep: number;
  readonly ySpan: number;
  readonly sizeBase: number;
  readonly sizeStep: number;
  readonly sizeMod: number;
  readonly sizeBonus: number;
  readonly delayStep: number;
  readonly delaySpan: number;
  readonly durationBase: number;
  readonly durationStep: number;
  readonly durationMod: number;
}

/** Receta de las luciérnagas del Hero principal. */
export const HERO_FIREFLIES: ParticleRecipe = {
  xBase: 4,
  xStep: 37,
  xSpan: 92,
  yBase: 150,
  yStep: 113,
  ySpan: 640,
  sizeBase: 3,
  sizeStep: 1,
  sizeMod: 3,
  sizeBonus: 0,
  delayStep: 0.7,
  delaySpan: 5,
  durationBase: 3,
  durationStep: 1,
  durationMod: 4,
};

/** Receta de las partículas de las páginas de mundo. */
export const WORLD_PARTICLES: ParticleRecipe = {
  xBase: 3,
  xStep: 41,
  xSpan: 94,
  yBase: 120,
  yStep: 113,
  ySpan: 680,
  sizeBase: 3,
  sizeStep: 2,
  sizeMod: 4,
  sizeBonus: 0,
  delayStep: 1.3,
  delaySpan: 9,
  durationBase: 3,
  durationStep: 2,
  durationMod: 5,
};

export function makeParticles(
  count: number,
  recipe: ParticleRecipe,
): readonly Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    x: recipe.xBase + ((i * recipe.xStep) % recipe.xSpan),
    y: recipe.yBase + ((i * recipe.yStep) % recipe.ySpan),
    size: recipe.sizeBase + (i % recipe.sizeMod) * recipe.sizeStep + recipe.sizeBonus,
    delay: Number(((i * recipe.delayStep) % recipe.delaySpan).toFixed(1)),
    duration: recipe.durationBase + (i % recipe.durationMod) * recipe.durationStep,
  }));
}
