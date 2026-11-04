import type { COPY } from "@/data/copy";
import type { SkillCellLabels } from "@/types/skill";
import { DIG_LAYERS_PER_CELL } from "./constants";

type SkillsCopy = (typeof COPY)["skills"];

/** Resuelve los textos de una cuadrícula según cuántas capas ya se quitaron. */
export function buildCellLabels(
  copy: SkillsCopy,
  skillName: string,
  layersDug: number,
): SkillCellLabels {
  const left = DIG_LAYERS_PER_CELL - layersDug;
  const unit = left === 1 ? copy.layerOne : copy.layerMany;
  const hint =
    layersDug === 0 ? copy.hintStart : left === 1 ? copy.hintLast : copy.hintKeep;
  return {
    grid: copy.grid,
    fossilFound: copy.fossilFound,
    usedIn: copy.usedIn,
    stateDone: copy.found,
    stateLeft: unit,
    hint,
    digAria: `${copy.digLabel} ${skillName}: ${left} ${unit}`,
  };
}
