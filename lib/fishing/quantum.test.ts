import { describe, expect, it } from "vitest";
import { quantumMode, SHADOW_WIDTH } from "@/lib/fishing/quantum";

describe("lago cuántico", () => {
  it("cada fase tiene su estado visual", () => {
    expect(quantumMode("idle")).toBe("idle");
    expect(quantumMode("waiting")).toBe("superposition");
    expect(quantumMode("bite")).toBe("collapse");
    expect(quantumMode("fighting")).toBe("focused");
    expect(quantumMode("caught")).toBe("dissolve");
    expect(quantumMode("escaped")).toBe("dissolve");
  });

  it("la sombra crece con la criatura", () => {
    expect(SHADOW_WIDTH.small).toBeLessThan(SHADOW_WIDTH.medium);
    expect(SHADOW_WIDTH.medium).toBeLessThan(SHADOW_WIDTH.large);
    expect(SHADOW_WIDTH.large).toBeLessThan(SHADOW_WIDTH.huge);
  });
});
