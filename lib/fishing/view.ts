import { CREATURES } from "@/data/creatures";
import { COPY } from "@/data/copy";
import { indexCreatures, phaseIndex } from "@/lib/fishing/creatures";
import { isBetweenCasts } from "@/lib/fishing/engine";
import type { ExperienceEntry, ExperienceKind } from "@/types/experience";
import type { Creature, CreatureId, GameState } from "@/types/fishing";

const { experience: copy } = COPY;

export const KIND_COLOR: Readonly<Record<ExperienceKind, string>> = {
  academic: "var(--journal-moss)",
  work: "var(--journal-rust)",
};

export const KIND_LABEL: Readonly<Record<ExperienceKind, string>> = {
  academic: copy.academic,
  work: copy.work,
};

export const creaturesById = indexCreatures(CREATURES);

export const creatureByExperience: ReadonlyMap<string, Creature> = new Map(
  CREATURES.map((creature) => [creature.experienceId, creature]),
);

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
    return result ? `${result} ${status.idle}` : status.idle;
  }
  switch (state.phase) {
    case "casting":
      return status.casting;
    case "waiting":
      return fill(status.waiting, { depth: copy.depth[state.depth ?? "shore"] });
    case "bite":
      return sceneCreature(state)?.breach === "giant" ? status.biteGiant : status.bite;
    case "fighting":
      if (state.mode === "relaxed") return status.fightRelaxed;
      return isEnraged(state)
        ? fill(status.enraged, { name: nameOf(state.hooked) })
        : status.fight;
    default:
      return status.complete;
  }
}

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
      return action.cast;
  }
}

/** El botón sigue enfocable aunque no haga nada (aria-disabled, no disabled). */
export const isActionIdle = (state: GameState) =>
  state.phase === "waiting" || state.phase === "complete";

/** Pista del diario para una criatura aún no pescada: dónde vive. */
export const creatureHint = (creature: Creature): string => copy.depth[creature.depth];

/** Una entrada del diario se revela al pescar su criatura o al completar el lago. */
export function isRevealed(entry: ExperienceEntry, state: GameState): boolean {
  if (state.phase === "complete") return true;
  const creature = creatureByExperience.get(entry.id);
  return creature !== undefined && state.caught.includes(creature.id);
}
