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

export interface Profile {
  readonly firstName: string;
  readonly lastName: string;
  readonly initials: string;
  readonly role: string;
  readonly tagline: string;
  readonly year: number;
  readonly cvUrl: string;
  readonly aboutText: string;
  readonly quickFacts: readonly QuickFact[];
  readonly technologies: readonly string[];
  readonly socials: readonly Social[];
}
