/** Idioma de las enumeraciones del sitio ("A, B y C"). */
export const LIST_LOCALE = "es";

export type ListPart =
  | { readonly type: "element"; readonly value: string; readonly index: number }
  | { readonly type: "literal"; readonly value: string };

/**
 * Parte una enumeración en trozos: los elementos (con su posición en `items`) y los
 * separadores del idioma (", " y " y "). Sirve para pintar cada elemento como enlace.
 */
export function listParts(
  items: readonly string[],
  locale: string = LIST_LOCALE,
): readonly ListPart[] {
  const format = new Intl.ListFormat(locale, { style: "long", type: "conjunction" });
  let next = 0;
  return format
    .formatToParts(items)
    .map((part): ListPart =>
      part.type === "element"
        ? { type: "element", value: part.value, index: next++ }
        : { type: "literal", value: part.value },
    );
}

/** La misma enumeración como texto plano. */
export function formatList(
  items: readonly string[],
  locale: string = LIST_LOCALE,
): string {
  return listParts(items, locale)
    .map((part) => part.value)
    .join("");
}
