export type ExperienceKind = "academic" | "work";

export interface ExperienceEntry {
  readonly id: string;
  readonly kind: ExperienceKind;
  readonly startYear: number;
  readonly endYear: number | null;
  readonly periodLabel: string;
  readonly title: string;
  readonly organization: string;
  /** Se revelan al pescar la criatura que guarda la entrada (o con "Sacar todo"). */
  readonly achievements: readonly string[];
}
