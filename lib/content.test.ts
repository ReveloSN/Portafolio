import { describe, expect, it } from "vitest";
import { CONTENT } from "@/data/content";
import { LOCALES } from "./i18n";

/**
 * Cada idioma cuenta lo mismo con otras palabras: misma forma, mismos ids, enlaces,
 * imágenes, colores y números. Solo cambia el texto. Si alguien agrega un proyecto o una
 * experiencia en un idioma y olvida el otro, esta prueba lo dice.
 */
const NEUTRAL_KEYS = new Set([
  "id",
  "slug",
  "kind",
  "icon",
  "glyph",
  "action",
  "handle",
  "initials",
  "firstName",
  "lastName",
  "author",
  "name",
]);
/** Rutas (`/cv.pdf`, no los títulos `// DATOS`), URLs, colores y degradados. */
const NEUTRAL_VALUE = /^(\/(?![/ ])|https?:|mailto:|#[0-9a-f]{3,8}$|rgba?\(|linear-gradient)/i;

/** Rutas `a.b[2].c` donde los dos idiomas no coinciden en lo que no es texto. */
function mismatches(a: unknown, b: unknown, path: string, key = ""): string[] {
  if (typeof a === "string" && typeof b === "string") {
    const neutral = (NEUTRAL_KEYS.has(key) && key !== "name") || NEUTRAL_VALUE.test(a);
    return neutral && a !== b ? [path] : [];
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return [`${path} (largo ${a.length} ≠ ${b.length})`];
    return a.flatMap((item, i) => mismatches(item, b[i], `${path}[${i}]`, key));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort();
    if (keysA.join() !== keysB.join()) return [`${path} (claves distintas)`];
    return keysA.flatMap((k) =>
      mismatches(
        (a as Record<string, unknown>)[k],
        (b as Record<string, unknown>)[k],
        `${path}.${k}`,
        k,
      ),
    );
  }
  return a === b ? [] : [path];
}

describe("CONTENT", () => {
  const [base, ...others] = LOCALES;

  it.each(others)(
    "%s tiene la misma forma y los mismos datos neutros que el español",
    (locale) => {
      expect(mismatches(CONTENT[base], CONTENT[locale], locale)).toEqual([]);
    },
  );

  it.each(others)("%s traduce el texto (no es una copia del español)", (locale) => {
    expect(CONTENT[locale].profile.role).not.toBe(CONTENT[base].profile.role);
    expect(CONTENT[locale].copy.nav.skipToContent).not.toBe(
      CONTENT[base].copy.nav.skipToContent,
    );
  });
});
