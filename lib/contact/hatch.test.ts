import { describe, expect, it } from "vitest";
import {
  CRACK_MS,
  HATCH_TIMING,
  anyOpen,
  hatchReducer,
  initialNest,
  isOpen,
  nestReducer,
  type HatchPhase,
} from "./hatch";

const run = (phase: HatchPhase, ...types: Parameters<typeof hatchReducer>[1][]) =>
  types.reduce(hatchReducer, phase);

describe("hatchReducer", () => {
  it("pasa a hover al entrar el puntero y vuelve al salir", () => {
    expect(hatchReducer("idle", { type: "enter" })).toBe("hover");
    expect(hatchReducer("hover", { type: "leave" })).toBe("idle");
  });

  it("al activar se agrieta y, al terminar, sale la cría", () => {
    const cracking = hatchReducer("hover", { type: "activate", instant: false });
    expect(cracking).toBe("cracking");
    expect(hatchReducer(cracking, { type: "cracked" })).toBe("hatched");
  });

  it("con movimiento reducido salta directo a la cría", () => {
    expect(hatchReducer("idle", { type: "activate", instant: true })).toBe("hatched");
  });

  it("ignora el puntero mientras se abre o ya abrió", () => {
    expect(run("cracking", { type: "enter" }, { type: "leave" })).toBe("cracking");
    expect(run("hatched", { type: "enter" }, { type: "leave" })).toBe("hatched");
  });

  it("no reinicia la eclosión si se activa dos veces", () => {
    expect(hatchReducer("cracking", { type: "activate", instant: false })).toBe(
      "cracking",
    );
    expect(hatchReducer("hatched", { type: "activate", instant: false })).toBe("hatched");
  });

  it("solo termina de agrietarse lo que se estaba agrietando", () => {
    expect(hatchReducer("idle", { type: "cracked" })).toBe("idle");
    expect(hatchReducer("hover", { type: "cracked" })).toBe("hover");
  });

  it("reset vuelve al huevo entero desde cualquier fase", () => {
    for (const phase of ["idle", "hover", "cracking", "hatched"] as const) {
      expect(hatchReducer(phase, { type: "reset" })).toBe("idle");
    }
  });

  it("isOpen distingue el huevo entero del abierto", () => {
    expect([isOpen("idle"), isOpen("hover")]).toEqual([false, false]);
    expect([isOpen("cracking"), isOpen("hatched")]).toEqual([true, true]);
  });

  it("la secuencia completa dura cerca de 1,3 s", () => {
    expect(CRACK_MS).toBe(800);
    expect(CRACK_MS + HATCH_TIMING.rise).toBeGreaterThanOrEqual(1200);
    expect(CRACK_MS + HATCH_TIMING.rise).toBeLessThanOrEqual(1400);
  });
});

describe("nestReducer", () => {
  const start = initialNest(["a", "b"] as const);

  it("empieza con todos los huevos enteros y sin crías", () => {
    expect(start.phases).toEqual({ a: "idle", b: "idle" });
    expect(start.lastHatch).toBeNull();
    expect(anyOpen(start)).toBe(false);
  });

  it("cada huevo cambia sin tocar a los demás", () => {
    const next = nestReducer(start, {
      type: "egg",
      id: "a",
      event: { type: "activate", instant: false },
    });
    expect(next.phases).toEqual({ a: "cracking", b: "idle" });
    expect(anyOpen(next)).toBe(true);
  });

  it("anota la última cría y cuenta cada eclosión", () => {
    const hatch = (state: typeof start, id: "a" | "b") =>
      nestReducer(state, { type: "egg", id, event: { type: "activate", instant: true } });
    const one = hatch(start, "b");
    expect(one.lastHatch).toEqual({ id: "b", count: 1 });
    const again = hatch(nestReducer(one, { type: "resetAll" }), "b");
    expect(again.lastHatch).toEqual({ id: "b", count: 1 });
    const two = hatch(one, "a");
    expect(two.lastHatch).toEqual({ id: "a", count: 2 });
  });

  it("devuelve el mismo estado si el evento no aplica", () => {
    expect(nestReducer(start, { type: "egg", id: "a", event: { type: "cracked" } })).toBe(
      start,
    );
  });

  it("resetAll vuelve a los huevos enteros", () => {
    const open = nestReducer(start, {
      type: "egg",
      id: "a",
      event: { type: "activate", instant: true },
    });
    expect(nestReducer(open, { type: "resetAll" })).toEqual(start);
  });
});
