import { describe, expect, it } from "vitest";
import {
  THEME_BOOT_SCRIPT,
  THEME_STORAGE_KEY,
  oppositeTheme,
  readStoredTheme,
  resolveTheme,
  storeTheme,
  type ThemeStore,
} from "./theme";

const memoryStore = (initial: Record<string, string> = {}): ThemeStore => {
  const data = { ...initial };
  return {
    getItem: (key) => data[key] ?? null,
    setItem: (key, value) => {
      data[key] = value;
    },
  };
};

const throwingStore: ThemeStore = {
  getItem: () => {
    throw new Error("bloqueado");
  },
  setItem: () => {
    throw new Error("bloqueado");
  },
};

describe("resolveTheme", () => {
  it("la elección guardada manda sobre el sistema", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });
  it("sin elección sigue al sistema", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });
});

describe("almacenamiento", () => {
  it("lee solo valores válidos", () => {
    expect(readStoredTheme(memoryStore({ [THEME_STORAGE_KEY]: "dark" }))).toBe("dark");
    expect(readStoredTheme(memoryStore({ [THEME_STORAGE_KEY]: "sepia" }))).toBeNull();
    expect(readStoredTheme(null)).toBeNull();
  });

  it("guarda y vuelve a leer", () => {
    const store = memoryStore();
    expect(storeTheme(store, "light")).toBe(true);
    expect(readStoredTheme(store)).toBe("light");
  });

  it("no lanza si el almacenamiento está bloqueado", () => {
    expect(readStoredTheme(throwingStore)).toBeNull();
    expect(storeTheme(throwingStore, "dark")).toBe(false);
  });
});

describe("oppositeTheme", () => {
  it("alterna entre claro y oscuro", () => {
    expect(oppositeTheme("light")).toBe("dark");
    expect(oppositeTheme("dark")).toBe("light");
  });
});

describe("THEME_BOOT_SCRIPT", () => {
  it("usa la misma clave de almacenamiento y protege todo con try/catch", () => {
    expect(THEME_BOOT_SCRIPT).toContain(THEME_STORAGE_KEY);
    expect(THEME_BOOT_SCRIPT.startsWith("(function(){try{")).toBe(true);
    expect(() => new Function(THEME_BOOT_SCRIPT)).not.toThrow();
  });
});
