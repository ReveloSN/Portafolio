import { describe, expect, it } from "vitest";
import { countSentences, paragraphStarts, splitSentences } from "./sentences";

describe("splitSentences", () => {
  it("separa por punto, cierre y puntos suspensivos", () => {
    expect(splitSentences("Hola. ¿Qué tal? Bien… Fin")).toEqual([
      "Hola.",
      "¿Qué tal?",
      "Bien…",
      "Fin",
    ]);
  });

  it("no corta en abreviaturas sin espacio como 5.º", () => {
    expect(splitSentences("Voy en 5.º semestre. Sigo.")).toEqual([
      "Voy en 5.º semestre.",
      "Sigo.",
    ]);
  });

  it("deja el corchete de cierre pegado a su frase", () => {
    expect(splitSentences("[Una frase.] Otra.")).toEqual(["[Una frase.]", "Otra."]);
  });
});

describe("paragraphStarts y countSentences", () => {
  const paragraphs = ["Uno. Dos.", "Tres.", "Cuatro. Cinco. Seis."];

  it("continúa la cuenta de un párrafo al siguiente", () => {
    expect(paragraphStarts(paragraphs)).toEqual([0, 2, 3]);
    expect(paragraphStarts(paragraphs, 4)).toEqual([4, 6, 7]);
  });

  it("suma las frases de todos los párrafos", () => {
    expect(countSentences(paragraphs)).toBe(6);
    expect(countSentences([])).toBe(0);
  });
});
