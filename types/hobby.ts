/** Dibujo lineal que acompaña a cada hobby. */
export type HobbyGlyphKind = "wave" | "leaf" | "note" | "film";

export interface Hobby {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly glyph: HobbyGlyphKind;
  /** Ocupa dos columnas y dos filas en escritorio. */
  readonly featured?: boolean;
  /** Ocupa toda la fila en escritorio (útil para cerrar la rejilla sin huecos). */
  readonly wide?: boolean;
  /** Dato de ejemplo: la tarjeta lo indica hasta que la persona lo reemplace. */
  readonly example?: boolean;
}
