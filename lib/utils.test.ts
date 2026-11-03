import { describe, expect, it } from "vitest";
import { cn, hexToRgba, pad2 } from "./utils";

describe("cn", () => {
  it("une las clases verdaderas con un espacio", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("descarta false, null, undefined y cadenas vacías", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("devuelve cadena vacía sin argumentos útiles", () => {
    expect(cn()).toBe("");
    expect(cn(false, null)).toBe("");
  });
});

describe("hexToRgba", () => {
  it("convierte un hex de seis dígitos con o sin almohadilla", () => {
    expect(hexToRgba("#a6ff5c", 1)).toBe("rgba(166,255,92,1)");
    expect(hexToRgba("a6ff5c", 1)).toBe("rgba(166,255,92,1)");
  });

  it("expande el hex corto de tres dígitos", () => {
    expect(hexToRgba("#fff", 0.5)).toBe("rgba(255,255,255,0.5)");
    expect(hexToRgba("#f80", 0.25)).toBe("rgba(255,136,0,0.25)");
  });

  it("usa el alfa recibido tal cual", () => {
    expect(hexToRgba("#000000", 0)).toBe("rgba(0,0,0,0)");
  });
});

describe("pad2", () => {
  it("rellena con cero a la izquierda hasta dos dígitos", () => {
    expect(pad2(0)).toBe("00");
    expect(pad2(7)).toBe("07");
    expect(pad2(12)).toBe("12");
  });

  it("no recorta números de más de dos dígitos", () => {
    expect(pad2(123)).toBe("123");
  });
});
