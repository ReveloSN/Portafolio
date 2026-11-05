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

/** Canales del nido de Contacto, en el orden en que se dibujan. */
export type ChannelId = "correo" | "linkedin" | "github";

/** Imagen ya optimizada en `public/art/contact/` con sus medidas reales. */
export interface ArtImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

/** Recorte de un trozo de cáscara dentro del sprite del canal (px del sprite). */
export interface ShellPiece {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

/** Sprite con los trozos de cáscara de un canal, de mayor a menor. */
export interface ShellSprite extends ArtImage {
  readonly pieces: readonly ShellPiece[];
}

export interface ChannelArt {
  readonly egg: ArtImage;
  readonly hatchling: ArtImage;
  readonly shells: ShellSprite;
}

/** Manifiesto que genera `scripts/optimize-contact.ts`. */
export type ContactArt = Readonly<Record<ChannelId, ChannelArt>>;

/** Qué hace la cría al salir: llevar al formulario o abrir el perfil. */
export type ChannelAction = "focusForm" | "openLink";

/** Un canal del nido: su huevo, su cría y el enlace real que siempre está visible. */
export interface ContactChannel extends ChannelArt {
  readonly id: ChannelId;
  readonly label: string;
  /** Color del canal (hex): marca del rótulo, globito y cáscaras. */
  readonly color: string;
  /** Brillo del suelo del nido bajo el huevo (rgba). */
  readonly glow: string;
  readonly href: string;
  /** Usuario o dirección que se lee en el enlace y en el globito. */
  readonly handle: string;
  /** Nombre accesible del huevo cerrado ("Abrir huevo de LinkedIn"). */
  readonly ariaLabel: string;
  readonly action: ChannelAction;
}

export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
