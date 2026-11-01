import { describe, expect, it } from "vitest";
import { COPY } from "@/data/copy";
import { createInitialState } from "@/lib/fishing/engine";
import { actionLabel, fill, gameStatus, ringScore } from "@/lib/fishing/view";
import type { CreatureId, GameMode, GameState, RingState } from "@/types/fishing";

const { experience: copy } = COPY;

const biting = (hooked: CreatureId): GameState => ({
  ...createInitialState(1, "challenge"),
  phase: "bite",
  hooked,
});

const RING: RingState = {
  needed: 3,
  hits: 1,
  misses: 0,
  zoneStart: 120,
  zoneDeg: 40,
  speed: 200,
  angleAt: 0,
  since: 0,
  last: null,
};

const fighting = (ring: RingState, mode: GameMode = "challenge"): GameState => ({
  ...createInitialState(1, mode),
  phase: "fighting",
  hooked: "megalodon",
  depth: "deep",
  ring,
});

describe("anuncios (aria-live)", () => {
  it("una picada normal dice ¡Picó!", () => {
    expect(gameStatus(biting("lepidotes"))).toBe(copy.status.bite);
  });

  it("un gigante anuncia que algo enorme sale del agua", () => {
    expect(gameStatus(biting("megalodon"))).toBe(copy.status.biteGiant);
    expect(gameStatus(biting("mosasaur"))).toBe(copy.status.biteGiant);
  });

  it("el anillo anuncia cada acierto y cada fallo con la cuenta", () => {
    expect(ringScore(RING)).toBe("1 de 3");
    expect(gameStatus(fighting({ ...RING, last: "hit" }))).toBe(
      fill(copy.ring.hit, { score: "1 de 3" }),
    );
    expect(gameStatus(fighting({ ...RING, last: "miss" }))).toBe(
      fill(copy.ring.miss, { score: "1 de 3" }),
    );
    expect(gameStatus(fighting({ ...RING, last: "miss" }, "relaxed"))).toBe(
      copy.ring.missRelaxed,
    );
  });

  it("la ficha cambia de texto con la fase", () => {
    expect(actionLabel(createInitialState(1, "challenge"))).toBe(copy.action.choose);
    expect(actionLabel(biting("lepidotes"))).toBe(copy.action.bite);
    expect(actionLabel(fighting(RING))).toBe(copy.action.strike);
  });
});
