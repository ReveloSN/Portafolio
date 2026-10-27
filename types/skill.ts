export type FossilKind =
  "ammonite" | "bone" | "fern" | "trilobite" | "shell" | "nautilus";

export type BoneKind = "femur" | "rib";

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly area: string;
  readonly grid: string;
  readonly depth: string;
  readonly fossil: FossilKind;
  readonly levelLabel: string;
  readonly percent: number;
  /** Hueso de la barra: fémur (desarrollo) o costilla (diseño y juegos). */
  readonly bone: BoneKind;
  readonly note: string;
}
