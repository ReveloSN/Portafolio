import { BAITS, CREATURES } from "@/data/creatures";
import { COPY } from "@/data/copy";
import { indexCreatures, phaseIndex } from "@/lib/fishing/creatures";
import { isBetweenCasts } from "@/lib/fishing/engine";
import type { ExperienceEntry, ExperienceKind } from "@/types/experience";
import type { BaitId, Creature, CreatureId, GameState } from "@/types/fishing";

const { experience: copy } = COPY;

export const KIND_COLOR: Readonly<Record<ExperienceKind, string>> = {
  academic: "var(--glow)",
  work: "#ffc46e",
};

export const KIND_LABEL: Readonly<Record<ExperienceKind, string>> = {
  academic: copy.academic,
  work: copy.work,
};

export const creaturesById = indexCreatures(CREATURES);

export const creatureByExperience: ReadonlyMap<string, Creature> = new Map(
  CREATURES.map((creature) => [creature.experienceId, creature]),
);

const baitsById = new Map(BAITS.map((bait) => [bait.id, bait]));

/** Sustituye `{clave}` por su valor. */
export function fill(template: string, values: Readonly<Record<string, string>>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

const nameOf = (id: CreatureId | null) =>
  (id ? creaturesById.get(id)?.name : undefined) ?? "";

/** Criatura que se muestra en la escena: la que pica o pelea, o la recién capturada. */
export const sceneCreature = (state: GameState): Creature | null =>
  creaturesById.get(state.hooked ?? state.lastCatch ?? ("" as CreatureId)) ?? null;

export function isEnraged(state: GameState): boolean {
  const creature = sceneCreature(state);
  return (
    state.phase === "fighting" &&
    creature !== null &&
    creature.phases.length > 1 &&
    phaseIndex(creature, state.fight.progress) > 0
  );
}

/** Paso de la carnada entre intentos: tomarla, engancharla o lanzar. */
function baitStep(state: GameState): string {
  const { status } = copy;
  if (state.blocked === "noBait" && !state.bait) return status.noBait;
  if (!state.bait) return status.pickBait;
  if (!state.baitAttached) {
    const label = baitsById.get(state.bait)?.label.toLowerCase() ?? state.bait;
    return fill(status.baitPicked, { bait: label });
  }
  return status.baitAttached;
}

/** Resultado del intento anterior, si lo hubo. */
function outcome(state: GameState): string | null {
  const { status } = copy;
  switch (state.phase) {
    case "caught":
      return fill(status.caught, { name: nameOf(state.lastCatch) });
    case "escaped":
      return status[state.escapeReason ?? "noBite"];
    case "lineBroken":
      return status.lineBroken;
    default:
      return null;
  }
}

/** Frase que anuncia la fase actual (aria-live). */
export function gameStatus(state: GameState): string {
  const { status } = copy;
  if (isBetweenCasts(state.phase)) {
    const result = outcome(state);
    // Recién terminado el intento se anuncia el resultado y el siguiente paso.
    return result && !state.bait ? `${result} ${baitStep(state)}` : baitStep(state);
  }
  switch (state.phase) {
    case "casting":
      return status.casting;
    case "waiting":
      return fill(status.waiting, { depth: copy.depth[state.depth ?? "shore"] });
    case "bite":
      return status.bite;
    case "fighting":
      if (state.mode === "relaxed") return status.fightRelaxed;
      return isEnraged(state)
        ? fill(status.enraged, { name: nameOf(state.hooked) })
        : status.fight;
    default:
      return status.complete;
  }
}

/** Qué hace el botón de acción: con carnada sin enganchar, la engancha. */
export const actionIntent = (state: GameState): "attach" | "press" =>
  isBetweenCasts(state.phase) && state.bait !== null && !state.baitAttached
    ? "attach"
    : "press";

/** Texto del botón de acción persistente. */
export function actionLabel(state: GameState): string {
  const { action } = copy;
  switch (state.phase) {
    case "casting":
      return action.casting;
    case "waiting":
      return action.waiting;
    case "bite":
      return action.bite;
    case "fighting":
      return state.mode === "relaxed" ? action.reelRelaxed : action.reel;
    case "complete":
      return action.complete;
    default:
      if (!state.bait) return action.pickBait;
      return state.baitAttached ? action.cast : action.attach;
  }
}

/** El botón sigue enfocable aunque no haga nada (aria-disabled, no disabled). */
export const isActionIdle = (state: GameState) =>
  state.phase === "waiting" ||
  state.phase === "complete" ||
  (isBetweenCasts(state.phase) && !state.bait);

/** Pista del diario para una criatura aún no pescada: dónde y con qué carnada. */
export function creatureHint(creature: Creature): string {
  const baits = creature.baits
    .map((id: BaitId) => baitsById.get(id)?.label ?? id)
    .join(" o ");
  return `${copy.depth[creature.depth]} · ${baits}`;
}

/** Una entrada del diario se revela al pescar su criatura o al completar el lago. */
export function isRevealed(entry: ExperienceEntry, state: GameState): boolean {
  if (state.phase === "complete") return true;
  const creature = creatureByExperience.get(entry.id);
  return creature !== undefined && state.caught.includes(creature.id);
}
