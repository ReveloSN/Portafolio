/** Dibujo lineal que acompaña a cada hobby. */
export type HobbyGlyphKind = "wave" | "book" | "trail";

export interface Hobby {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly glyph: HobbyGlyphKind;
  /** Ocupa el ancho doble en escritorio. */
  readonly featured?: boolean;
  /** Dato de ejemplo: la tarjeta lo indica hasta que la persona lo reemplace. */
  readonly example?: boolean;
}
