export type FossilKind =
  "ammonite" | "bone" | "fern" | "trilobite" | "shell" | "nautilus";

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly area: string;
  readonly grid: string;
  readonly depth: string;
  readonly fossil: FossilKind;
  readonly levelLabel: string;
  readonly percent: number;
  readonly note: string;
}
