import { describe, expect, it } from "vitest";
import { pageLabel, stepPage } from "./pager";

describe("stepPage", () => {
  it("avanza y retrocede una página", () => {
    expect(stepPage(0, 1, 3)).toBe(1);
    expect(stepPage(2, -1, 3)).toBe(1);
  });

  it("no pasa de la primera ni de la última página", () => {
    expect(stepPage(0, -1, 3)).toBe(0);
    expect(stepPage(2, 1, 3)).toBe(2);
  });

  it("un libro vacío se queda en la página 0", () => {
    expect(stepPage(0, 1, 0)).toBe(0);
  });
});

describe("pageLabel", () => {
  it("cuenta las páginas desde 1", () => {
    expect(pageLabel("Página {n} de {total}", 0, 4)).toBe("Página 1 de 4");
    expect(pageLabel("Página {n} de {total}", 3, 4)).toBe("Página 4 de 4");
  });
});
