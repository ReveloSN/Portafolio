import { describe, expect, it } from "vitest";
import { DIG_LAYERS_PER_CELL } from "./constants";
import { buildDigAnnouncement, fillTemplate } from "./digAnnouncement";
import { createDigReducer, createInitialDigState } from "./digReducer";

const NAMES = ["Alfa", "Beta"] as const;
const COPY = {
  layer: "{name}: quedan {left} {unit}.",
  fossil: "Fósil: {name}. {found} de {total}.",
  all: "Todo. {found} de {total}.",
  cover: "Cubierto. {found} de {total}.",
  layerOne: "capa",
  layerMany: "capas",
} as const;

const reduce = createDigReducer(NAMES.length);

describe("fillTemplate", () => {
  it("sustituye claves y deja las desconocidas", () => {
    expect(fillTemplate("{a}-{b}-{c}", { a: 1, b: "x" })).toBe("1-x-{c}");
  });
});

describe("buildDigAnnouncement", () => {
  it("no anuncia nada antes de la primera acción", () => {
    expect(buildDigAnnouncement(createInitialDigState(2), NAMES, COPY)).toBe("");
  });

  it("anuncia las capas restantes con la unidad en singular o plural", () => {
    const first = reduce(createInitialDigState(2), { type: "dig", index: 0 });
    expect(buildDigAnnouncement(first, NAMES, COPY)).toBe("Alfa: quedan 2 capas.");
    const second = reduce(first, { type: "dig", index: 0 });
    expect(buildDigAnnouncement(second, NAMES, COPY)).toBe("Alfa: quedan 1 capa.");
  });

  it("anuncia el fósil y el conteo al quitar la última capa", () => {
    let state = createInitialDigState(2);
    for (let i = 0; i < DIG_LAYERS_PER_CELL; i += 1) {
      state = reduce(state, { type: "dig", index: 1 });
    }
    expect(buildDigAnnouncement(state, NAMES, COPY)).toBe("Fósil: Beta. 1 de 2.");
  });

  it("anuncia excavar todo y cubrir de nuevo", () => {
    const all = reduce(createInitialDigState(2), { type: "digAll" });
    expect(buildDigAnnouncement(all, NAMES, COPY)).toBe("Todo. 2 de 2.");
    const covered = reduce(all, { type: "cover" });
    expect(buildDigAnnouncement(covered, NAMES, COPY)).toBe("Cubierto. 0 de 2.");
  });
});
