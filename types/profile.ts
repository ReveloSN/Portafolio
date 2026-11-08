export type SocialKind = "github" | "linkedin" | "mail";

export interface Social {
  readonly kind: SocialKind;
  readonly label: string;
  readonly href: string;
}

export type QuickFactIcon =
  "pin" | "cap" | "university" | "code" | "network" | "cloud" | "heart";

export interface QuickFact {
  readonly icon: QuickFactIcon;
  readonly text: string;
}

export type TechIconId =
  | "fastapi"
  | "spring"
  | "nestjs"
  | "nextjs"
  | "react"
  | "tailwind"
  | "godot"
  | "kotlin"
  | "python";

/** Tecnología del camino de huellas: su logotipo llena la huella y brilla con su color. */
/** Colores del interior de la huella; si faltan se derivan del color de marca. */
export interface TechPalette {
  /** Borde del charco, en sombra. */
  readonly deep: string;
  /** Centro del charco, detrás del logo. */
  readonly mid: string;
}

export interface Technology {
  readonly name: string;
  readonly icon: TechIconId;
  /** Color de marca (hex) para el brillo; los logos negros usan un tono claro. */
  readonly color: string;
  readonly palette?: TechPalette;
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

/** Foto personal (archivo en `public/images/`). Si falta, se dibuja la silueta. */
export interface ProfilePhoto {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** Punto de la foto que queda a la vista al recortarla (CSS `object-position`). */
  readonly focus?: string;
}

export interface Profile {
  readonly firstName: string;
  readonly lastName: string;
  readonly initials: string;
  readonly role: string;
  readonly tagline: string;
  readonly year: number;
  readonly cvUrl: string;
  readonly photo?: ProfilePhoto;
  /** Foto de portada independiente de la credencial de Sobre mí. */
  readonly heroPhoto?: ProfilePhoto;
  /** Texto de "Sobre mí", un elemento por párrafo. */
  readonly aboutParagraphs: readonly string[];
  /** Habilidades blandas, en texto (sin niveles ni porcentajes). */
  readonly softSkills: readonly string[];
  readonly funFact: FunFact;
  readonly backMeta?: CardBackMeta;
  readonly quickFacts: readonly QuickFact[];
  readonly technologies: readonly Technology[];
  readonly socials: readonly Social[];
}
