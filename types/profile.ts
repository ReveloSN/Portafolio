export type SocialKind = "github" | "linkedin" | "instagram" | "mail";

export interface Social {
  readonly kind: SocialKind;
  readonly label: string;
  readonly href: string;
}

export interface QuickFact {
  readonly icon: "pin" | "cap" | "heart";
  readonly text: string;
}

/** Tecnología del camino de huellas: el monograma va dentro de la huella. */
export interface Technology {
  readonly name: string;
  readonly glyph: string;
}

/** Reverso de la credencial: un dato curioso sobre la persona. */
export interface FunFact {
  readonly title: string;
  readonly text: string;
}

/** Datos opcionales del pie del reverso; si faltan se usan los del perfil. */
export interface CardBackMeta {
  readonly motto?: string;
  readonly role?: string;
  readonly year?: number;
}

export interface Profile {
  readonly firstName: string;
  readonly lastName: string;
  readonly initials: string;
  readonly role: string;
  readonly tagline: string;
  readonly year: number;
  readonly cvUrl: string;
  readonly aboutText: string;
  readonly funFact: FunFact;
  readonly backMeta?: CardBackMeta;
  readonly quickFacts: readonly QuickFact[];
  readonly technologies: readonly Technology[];
  readonly socials: readonly Social[];
}
