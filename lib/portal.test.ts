import { describe, expect, it } from "vitest";
import {
  entranceSkin,
  initialPortalState,
  portalReducer,
  routeOf,
  shouldIntercept,
} from "@/lib/portal";
import type { PortalClick, PortalState } from "@/types/portal";

const PLAIN: PortalClick = {
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  defaultPrevented: false,
};

const idle: PortalState = { phase: "idle", href: null, skin: "vines", entrance: false };

describe("portalReducer", () => {
  it("recorre cierre, pantalla oscura, apertura y reposo", () => {
    const closing = portalReducer(idle, {
      type: "navigate",
      href: "/mundos/selva",
      skin: "vines",
    });
    expect(closing).toEqual({
      phase: "closing",
      href: "/mundos/selva",
      skin: "vines",
      entrance: false,
    });
    const covered = portalReducer(closing, { type: "covered" });
    expect(covered.phase).toBe("covered");
    const opening = portalReducer(covered, { type: "arrived" });
    expect(opening).toEqual({
      phase: "opening",
      href: null,
      skin: "vines",
      entrance: false,
    });
    expect(portalReducer(opening, { type: "settled" }).phase).toBe("idle");
  });

  it("ignora un segundo clic mientras el portal está cerrado o cerrándose", () => {
    const closing = portalReducer(idle, { type: "navigate", href: "/a", skin: "vines" });
    const again = portalReducer(closing, { type: "navigate", href: "/b", skin: "vines" });
    expect(again).toBe(closing);
    const covered = portalReducer(closing, { type: "covered" });
    expect(portalReducer(covered, { type: "navigate", href: "/b", skin: "vines" })).toBe(
      covered,
    );
  });

  it("permite navegar o saltar durante la apertura, pero no saltar a mitad de un cierre", () => {
    const opening: PortalState = { ...idle, phase: "opening" };
    expect(
      portalReducer(opening, { type: "navigate", href: "/a", skin: "vines" }).phase,
    ).toBe("closing");
    expect(portalReducer(opening, { type: "skip" }).phase).toBe("idle");
    const closing: PortalState = { ...idle, phase: "closing", href: "/a" };
    expect(portalReducer(closing, { type: "skip" })).toBe(closing);
  });

  it("no llega antes de estar cubierto", () => {
    const closing: PortalState = { ...idle, phase: "closing", href: "/a" };
    expect(portalReducer(closing, { type: "arrived" })).toBe(closing);
  });
});

describe("entrada", () => {
  it("la carga empieza con el velo abriéndose", () => {
    const state = initialPortalState("/mundos/cueva");
    expect(state.phase).toBe("opening");
    expect(state.entrance).toBe(true);
  });

  it("saltar la entrada la da por terminada", () => {
    const skipped = portalReducer(initialPortalState("/"), { type: "skip" });
    expect(skipped).toMatchObject({ phase: "idle", entrance: false });
  });

  it("usa el arte por defecto en rutas sin entrada propia", () => {
    expect(entranceSkin("/mundos/oceano")).toBe("vines");
  });
});

describe("routeOf", () => {
  it("quita consulta y ancla", () => {
    expect(routeOf("/mundos/selva#galeria")).toBe("/mundos/selva");
    expect(routeOf("/?x=1")).toBe("/");
    expect(routeOf("/#proyectos")).toBe("/");
  });
});

describe("shouldIntercept", () => {
  it("intercepta un clic simple hacia otra ruta", () => {
    expect(shouldIntercept(PLAIN, "/mundos/selva", "/")).toBe(true);
  });

  it("deja pasar clics con modificadores, otros botones o ya cancelados", () => {
    expect(shouldIntercept({ ...PLAIN, metaKey: true }, "/mundos/selva", "/")).toBe(
      false,
    );
    expect(shouldIntercept({ ...PLAIN, ctrlKey: true }, "/mundos/selva", "/")).toBe(
      false,
    );
    expect(shouldIntercept({ ...PLAIN, button: 1 }, "/mundos/selva", "/")).toBe(false);
    expect(shouldIntercept({ ...PLAIN, defaultPrevented: true }, "/a", "/")).toBe(false);
  });

  it("no intercepta anclas de la misma página ni enlaces externos", () => {
    expect(shouldIntercept(PLAIN, "/#proyectos", "/")).toBe(false);
    expect(shouldIntercept(PLAIN, "https://github.com", "/")).toBe(false);
  });
});
