/** Dibujo lineal que acompaña a cada hobby. */
export type HobbyGlyphKind = "wave" | "leaf" | "note" | "film";

export interface Hobby {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly glyph: HobbyGlyphKind;
  /** Ocupa la fila completa y pone la imagen junto al texto en escritorio. */
  readonly featured?: boolean;
  /** Ocupa las dos columnas en tabletas para cerrar la rejilla. */
  readonly wide?: boolean;
  /** Dato de ejemplo: la tarjeta lo indica hasta que la persona lo reemplace. */
  readonly example?: boolean;
}
