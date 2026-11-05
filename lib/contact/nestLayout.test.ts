import { describe, expect, it } from "vitest";
import { CHANNEL_ORDER, CONTACT_CHANNELS } from "@/data/contactChannels";
import { EGG_SLOTS, NEST_STAGE, hatchlingSpan, hatchlingWidth } from "./nestLayout";

/** Hueco mínimo entre crías (% del escenario): la inclinación al pasar el cursor lo usa. */
const MIN_GAP = 3;

const spans = CHANNEL_ORDER.map((id) =>
  hatchlingSpan(EGG_SLOTS[id], CONTACT_CHANNELS[id].hatchling),
);

describe("nestLayout", () => {
  it("las crías caben dentro del escenario", () => {
    for (const [left, right] of spans) {
      expect(left).toBeGreaterThanOrEqual(0);
      expect(right).toBeLessThanOrEqual(100);
    }
  });

  it("las crías vecinas no se solapan, con margen para inclinarse", () => {
    for (let i = 1; i < spans.length; i++) {
      expect(spans[i]![0] - spans[i - 1]![1]).toBeGreaterThan(MIN_GAP);
    }
  });

  it("los huevos tampoco se tocan", () => {
    const xs = CHANNEL_ORDER.map((id) => EGG_SLOTS[id].x);
    for (let i = 1; i < xs.length; i++) {
      expect(xs[i]! - xs[i - 1]!).toBeGreaterThan(NEST_STAGE.eggWidth);
    }
  });

  it("la cría se mide respecto al huevo que la contiene", () => {
    const square = { src: "", width: 100, height: 100 };
    const expected = (NEST_STAGE.hatchlingHeight / NEST_STAGE.eggWidth) * 100;
    expect(hatchlingWidth(square)).toBeCloseTo(expected);
  });
});
