export type EggKind = "mail" | "linkedin" | "github" | "whatsapp";

export interface ContactEgg {
  readonly id: EggKind;
  readonly label: string;
  readonly color: string;
  readonly value: string;
  readonly href: string;
}

export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
