import type { TechIconId } from "./profile";
import type { WorldSlug } from "./world";

export type FossilKind =
  "ammonite" | "bone" | "fern" | "trilobite" | "shell" | "nautilus";

/** Al menos un proyecto: toda tecnología del sitio se usó en algo concreto. */
export type UsedIn = readonly [WorldSlug, ...WorldSlug[]];

/** Un hallazgo del sitio de excavación. No hay niveles ni porcentajes: solo dónde se usó. */
export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly area: string;
  readonly grid: string;
  readonly depth: string;
  readonly fossil: FossilKind;
  readonly icon: TechIconId;
  /** Proyectos donde se usó, por el slug de su mundo (los nombres salen de /data/projects). */
  readonly usedIn: UsedIn;
}

/** Textos ya resueltos que una cuadrícula necesita para renderizarse. */
export interface SkillCellLabels {
  readonly grid: string;
  readonly fossilFound: string;
  readonly usedIn: string;
  readonly stateDone: string;
  readonly stateLeft: string;
  readonly hint: string;
  readonly digAria: string;
}
