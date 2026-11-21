/**
 * Convierte los literales de un objeto `as const` en `string`, conservando su forma.
 * Así la versión en inglés de un diccionario debe tener exactamente las mismas claves
 * que la española, pero con otros textos.
 */
export type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };
