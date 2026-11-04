import { describe, expect, it } from "vitest";
import { formatList, listParts } from "./listFormat";

describe("formatList", () => {
  it("une dos elementos con «y»", () => {
    expect(formatList(["Selva", "Océano"])).toBe("Selva y Océano");
  });

  it("separa con comas y cierra con «y»", () => {
    expect(formatList(["A", "B", "C"])).toBe("A, B y C");
  });

  it("deja un solo elemento tal cual", () => {
    expect(formatList(["Selva"])).toBe("Selva");
  });
});

describe("listParts", () => {
  it("numera los elementos en el orden de entrada", () => {
    const elements = listParts(["A", "B", "C"]).filter((part) => part.type === "element");
    expect(elements.map((part) => (part.type === "element" ? part.index : -1))).toEqual([
      0, 1, 2,
    ]);
  });

  it("conserva los separadores como texto", () => {
    const literals = listParts(["A", "B"]).filter((part) => part.type === "literal");
    expect(literals.map((part) => part.value)).toEqual([" y "]);
  });
});
