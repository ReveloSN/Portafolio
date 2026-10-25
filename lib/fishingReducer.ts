import type { FishingAction, FishingState } from "@/types/fishing";

export const INITIAL_FISHING_STATE: FishingState = {
  phase: "idle",
  castCount: 0,
  currentIndex: null,
  caughtIndexes: [],
  missed: false,
};

/**
 * Máquina de estados del lago:
 * idle → waiting → bite → reeling → caught → idle   (bite → idle si se escapa)
 */
export function createFishingReducer(totalCatches: number) {
  return function fishingReducer(
    state: FishingState,
    action: FishingAction,
  ): FishingState {
    switch (action.type) {
      case "cast":
        if (state.phase !== "idle") return state;
        return {
          ...state,
          phase: "waiting",
          currentIndex: state.castCount % totalCatches,
          missed: false,
        };
      case "bite":
        return state.phase === "waiting" ? { ...state, phase: "bite" } : state;
      case "pull":
        return state.phase === "bite" ? { ...state, phase: "reeling" } : state;
      case "land": {
        if (state.phase !== "reeling" || state.currentIndex === null) return state;
        const already = state.caughtIndexes.includes(state.currentIndex);
        return {
          ...state,
          phase: "caught",
          castCount: state.castCount + 1,
          caughtIndexes: already
            ? state.caughtIndexes
            : [...state.caughtIndexes, state.currentIndex],
        };
      }
      case "escape":
        return state.phase === "bite" ? { ...state, phase: "idle", missed: true } : state;
      case "release":
        return state.phase === "caught" ? { ...state, phase: "idle" } : state;
      case "reset":
        return INITIAL_FISHING_STATE;
    }
  };
}
