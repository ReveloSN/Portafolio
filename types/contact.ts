export type EggKind = "mail" | "linkedin" | "github";

export interface ContactEgg {
  readonly id: EggKind;
  readonly label: string;
  readonly color: string;
  readonly value: string;
  readonly href: string;
  /** Texto del botón que aparece al abrir el huevo (por ejemplo, "Ir a GitHub"). */
  readonly action: string;
}

export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
