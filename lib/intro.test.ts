import { describe, expect, it } from "vitest";
import {
  hasSeenIntro,
  INTRO_BOOT_SCRIPT,
  INTRO_SEEN_ATTR,
  INTRO_STORAGE_KEY,
  markIntroSeen,
  type IntroStore,
} from "@/lib/intro";

function memoryStore(): IntroStore & { readonly data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
  };
}

const brokenStore: IntroStore = {
  getItem: () => {
    throw new Error("bloqueado");
  },
  setItem: () => {
    throw new Error("bloqueado");
  },
};

describe("memoria de la intro", () => {
  it("empieza sin verse y recuerda tras marcarla", () => {
    const store = memoryStore();
    expect(hasSeenIntro(store)).toBe(false);
    expect(markIntroSeen(store)).toBe(true);
    expect(hasSeenIntro(store)).toBe(true);
  });

  it("no rompe si no hay almacenamiento o está bloqueado", () => {
    expect(hasSeenIntro(null)).toBe(false);
    expect(markIntroSeen(null)).toBe(false);
    expect(hasSeenIntro(brokenStore)).toBe(false);
    expect(markIntroSeen(brokenStore)).toBe(false);
  });
});

describe("INTRO_BOOT_SCRIPT", () => {
  function run(store: IntroStore | "throws") {
    const attrs = new Map<string, string>();
    const doc = { documentElement: { setAttribute: (k: string, v: string) => void attrs.set(k, v) } };
    const storage =
      store === "throws"
        ? {
            getItem: () => {
              throw new Error("bloqueado");
            },
          }
        : store;
    new Function("sessionStorage", "document", INTRO_BOOT_SCRIPT)(storage, doc);
    return attrs;
  }

  it("marca <html> cuando la intro ya se vio", () => {
    const store = memoryStore();
    store.setItem(INTRO_STORAGE_KEY, "1");
    expect(run(store).has(INTRO_SEEN_ATTR)).toBe(true);
  });

  it("no marca nada en la primera visita ni si el almacenamiento falla", () => {
    expect(run(memoryStore()).size).toBe(0);
    expect(run("throws").size).toBe(0);
  });
});
