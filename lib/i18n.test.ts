import { describe, expect, it } from "vitest";
import { isLocale, localizeHref, splitLocale, switchLocaleHref } from "./i18n";

describe("localizeHref", () => {
  it("deja las rutas en español sin prefijo", () => {
    expect(localizeHref("es", "/")).toBe("/");
    expect(localizeHref("es", "/mundos/selva")).toBe("/mundos/selva");
    expect(localizeHref("es", "/#proyectos")).toBe("/#proyectos");
  });

  it("pone /en a las rutas internas en inglés", () => {
    expect(localizeHref("en", "/")).toBe("/en");
    expect(localizeHref("en", "/hobbies")).toBe("/en/hobbies");
    expect(localizeHref("en", "/mundos/cueva")).toBe("/en/mundos/cueva");
    expect(localizeHref("en", "/#contacto")).toBe("/en#contacto");
  });

  it("no toca enlaces externos, anclas ni archivos", () => {
    expect(localizeHref("en", "https://github.com/ReveloSN")).toBe(
      "https://github.com/ReveloSN",
    );
    expect(localizeHref("en", "#contacto")).toBe("#contacto");
    expect(localizeHref("en", "/cv.pdf")).toBe("/cv.pdf");
    expect(localizeHref("en", "//cdn.example.com/x")).toBe("//cdn.example.com/x");
  });
});

describe("splitLocale y switchLocaleHref", () => {
  it("separa el idioma de la ruta", () => {
    expect(splitLocale("/en/hobbies")).toEqual({ locale: "en", path: "/hobbies" });
    expect(splitLocale("/en")).toEqual({ locale: "en", path: "/" });
    expect(splitLocale("/mundos/selva")).toEqual({ locale: "es", path: "/mundos/selva" });
    expect(splitLocale("/")).toEqual({ locale: "es", path: "/" });
  });

  it("lleva a la misma página en el otro idioma", () => {
    expect(switchLocaleHref("/mundos/selva", "en")).toBe("/en/mundos/selva");
    expect(switchLocaleHref("/en/mundos/selva", "es")).toBe("/mundos/selva");
    expect(switchLocaleHref("/en", "es")).toBe("/");
    expect(switchLocaleHref("/", "en")).toBe("/en");
  });

  it("reconoce solo los idiomas del sitio", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});
