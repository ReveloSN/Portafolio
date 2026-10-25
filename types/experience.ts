export type ExperienceKind = "academic" | "work";

export interface ExperienceEntry {
  readonly id: string;
  readonly kind: ExperienceKind;
  readonly startYear: number;
  readonly endYear: number | null;
  readonly periodLabel: string;
  readonly title: string;
  readonly organization: string;
  readonly description: string;
}
