import { CREATURES } from "@/data/creatures";
import { COPY } from "@/data/copy";
import { indexCreatures } from "@/lib/fishing/creatures";
import { isBetweenCasts } from "@/lib/fishing/engine";
import type { ExperienceEntry, ExperienceKind } from "@/types/experience";
import type { Creature, CreatureId, GameState, RingState } from "@/types/fishing";

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

/** Aciertos del anillo, para leer y para ver: "1 de 3". */
export const ringScore = (ring: RingState) =>
  fill(copy.ring.score, { hits: String(ring.hits), needed: String(ring.needed) });

/** Resultado del intento anterior, si lo hubo. */
function outcome(state: GameState): string | null {
  const { status } = copy;
  switch (state.phase) {
    case "caught":
      return fill(status.caught, { name: nameOf(state.lastCatch) });
    case "escaped":
      return status[state.escapeReason ?? "noBite"];
    default:
      return null;
  }
}

/** Qué dice el anillo tras cada pulsación (aria-live). */
function fightStatus(state: GameState, ring: RingState): string {
  const { ring: text } = copy;
  const score = ringScore(ring);
  if (ring.last === "hit") return fill(text.hit, { score });
  if (ring.last === "miss") {
    return state.mode === "relaxed" ? text.missRelaxed : fill(text.miss, { score });
  }
  return state.mode === "relaxed" ? text.startRelaxed : fill(text.start, { score });
}

/** Frase que anuncia la fase actual (aria-live). */
export function gameStatus(state: GameState): string {
  const { status } = copy;
  if (isBetweenCasts(state.phase)) {
    const result = outcome(state);
    // Recién terminado el intento se anuncia el resultado y el siguiente paso.
    return result ? `${result} ${status.idle}` : status.idle;
  }
  const depth = copy.depth[state.depth ?? "shore"];
  switch (state.phase) {
    case "casting":
      return fill(status.casting, { depth });
    case "waiting":
      return fill(status.waiting, { depth });
    case "bite":
      return sceneCreature(state)?.breach === "giant" ? status.biteGiant : status.bite;
    case "fighting":
      return state.ring ? fightStatus(state, state.ring) : status.bite;
    default:
      return status.complete;
  }
}

/** Texto de la ficha de acción persistente. */
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
      return action.strike;
    case "complete":
      return action.complete;
    default:
      return action.choose;
  }
}

/** La ficha sigue enfocable aunque no haga nada (aria-disabled, no disabled). */
export const isActionIdle = (state: GameState) =>
  state.phase === "casting" || state.phase === "waiting" || state.phase === "complete";

/** Pista del diario para una criatura aún no pescada: dónde vive. */
export const creatureHint = (creature: Creature): string => copy.depth[creature.depth];

/** Una entrada del diario se revela al pescar su criatura o al completar el lago. */
export function isRevealed(entry: ExperienceEntry, state: GameState): boolean {
  if (state.phase === "complete") return true;
  const creature = creatureByExperience.get(entry.id);
  return creature !== undefined && state.caught.includes(creature.id);
}
