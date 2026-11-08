import type { TechIconId } from "./profile";
import type { WorldSlug } from "./world";

/** Repositorio público de GitHub donde aparece la tecnología. */
export interface TechRepo {
  readonly name: string;
  readonly url: string;
}

/** Dónde se aplicó una tecnología: mundos del portafolio y otros repositorios. */
export interface TechUsage {
  readonly projects: readonly WorldSlug[];
  readonly repos: readonly TechRepo[];
}

export type TechUsageMap = Readonly<Partial<Record<TechIconId, TechUsage>>>;
