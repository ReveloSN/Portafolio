import { BONE_SHAPES } from "@/data/fossilPuzzle";
import type { BoneId, BoneShape } from "@/types/puzzle";

/** Nombres en inglés de cada hueso, para frases como "You picked up the skull". */
export const BONE_LABELS_EN: Readonly<Record<BoneId, string>> = {
  skull: "the skull",
  neck: "the neck",
  ribs: "the torso and ribs",
  hips: "the hips and upper legs",
  feet: "the lower legs",
  tail: "the base of the tail",
  legBack: "the back leg",
  legFront: "the front leg",
  tailTip: "the tip of the tail",
};

/** Versión en inglés de BONE_SHAPES: misma geometría, solo cambia el nombre del hueso. */
export const BONE_SHAPES_EN: readonly BoneShape[] = BONE_SHAPES.map((bone) => ({
  ...bone,
  label: BONE_LABELS_EN[bone.id],
}));
