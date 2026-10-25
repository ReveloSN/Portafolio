import type { ExperienceEntry } from "./experience";

export type RareCreature = "mosasaur" | "megalodon";

export type Catch =
  | { readonly type: "entry"; readonly entry: ExperienceEntry }
  | { readonly type: "rare"; readonly creature: RareCreature };

export type FishingPhase = "idle" | "waiting" | "bite" | "reeling" | "caught";

export interface FishingState {
  readonly phase: FishingPhase;
  readonly castCount: number;
  readonly currentIndex: number | null;
  readonly caughtIndexes: readonly number[];
  readonly missed: boolean;
}

export type FishingAction =
  | { readonly type: "cast" }
  | { readonly type: "bite" }
  | { readonly type: "pull" }
  | { readonly type: "land" }
  | { readonly type: "escape" }
  | { readonly type: "release" }
  | { readonly type: "reset" };
