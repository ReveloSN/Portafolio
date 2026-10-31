import { describe, expect, it } from "vitest";
import { COPY } from "@/data/copy";
import { createInitialState } from "@/lib/fishing/engine";
import { gameStatus } from "@/lib/fishing/view";
import type { CreatureId, GameState } from "@/types/fishing";

const biting = (hooked: CreatureId): GameState => ({
  ...createInitialState(1, "challenge"),
  phase: "bite",
  hooked,
});

describe("anuncios (aria-live)", () => {
  it("una picada normal dice ¡Picó!", () => {
    expect(gameStatus(biting("lepidotes"))).toBe(COPY.experience.status.bite);
  });

  it("un gigante anuncia que algo enorme sale del agua", () => {
    expect(gameStatus(biting("megalodon"))).toBe(COPY.experience.status.biteGiant);
    expect(gameStatus(biting("mosasaur"))).toBe(COPY.experience.status.biteGiant);
  });
});
