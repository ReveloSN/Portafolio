import { COPY } from "@/data/copy";
import type { ExperienceKind } from "@/types/experience";
import type { Catch, FishingPhase, FishingState } from "@/types/fishing";

const { status, rare, academic, work } = COPY.experience;

export const KIND_COLOR: Readonly<Record<ExperienceKind, string>> = {
  academic: "var(--glow)",
  work: "#ffc46e",
};

export const KIND_LABEL: Readonly<Record<ExperienceKind, string>> = { academic, work };

/** Nombre de fase que entienden las clases de motion.css. */
export type LakeCssPhase = "idle" | "wait" | "bite" | "leap";

const CSS_PHASE: Readonly<Record<FishingPhase, LakeCssPhase>> = {
  idle: "idle",
  waiting: "wait",
  bite: "bite",
  reeling: "bite",
  caught: "leap",
};

export const toCssPhase = (phase: FishingPhase): LakeCssPhase => CSS_PHASE[phase];

export interface CatchInfo {
  readonly kicker: string;
  readonly title: string;
  readonly subtitle: string;
}

export function describeCatch(item: Catch): CatchInfo {
  if (item.type === "rare") {
    const text = rare[item.creature];
    return { kicker: text.kicker, title: text.title, subtitle: text.description };
  }
  const { entry } = item;
  return {
    kicker: `${KIND_LABEL[entry.kind]} · ${entry.periodLabel}`,
    title: entry.title,
    subtitle: entry.organization,
  };
}

export function fishingStatus(
  state: FishingState,
  total: number,
  current: Catch | null,
): string {
  switch (state.phase) {
    case "waiting":
      return status.waiting;
    case "bite":
    case "reeling":
      return status.bite;
    case "caught":
      return `${status.caught} ${current ? describeCatch(current).title : ""}`.trim();
    case "idle":
      if (state.missed) return status.missed;
      if (state.caughtIndexes.length >= total) return status.complete;
      return state.caughtIndexes.length ? status.idleAfterCatch : status.idle;
  }
}
