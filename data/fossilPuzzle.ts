import type { BoneShape, PuzzleBoard } from "@/types/puzzle";

export const PUZZLE_BOARD: PuzzleBoard = {
  width: 1000,
  slabHeight: 456,
  trayPadding: 28,
  trayGap: 26,
  snapTolerance: 70,
  keyStep: 16,
  keyStepLarge: 48,
};
export const PUZZLE_PIECES = { min: 4, max: 4 } as const;
export const PUZZLE_TRAY_SCALE = 0.5;

/** Huesos con alfa real: la piedra permanece fija y nunca forma parte de las piezas. */
export const BONE_SHAPES: readonly BoneShape[] = [
  {
    id: "skull",
    label: "el cráneo y el cuello",
    slot: { x: 36, y: 78 },
    size: { width: 311, height: 112 },
    path: "",
    image: "/art/experience/bones/skull.webp",
  },
  {
    id: "ribs",
    label: "el torso y las costillas",
    slot: { x: 207, y: 106 },
    size: { width: 341, height: 181 },
    path: "",
    image: "/art/experience/bones/ribs.webp",
  },
  {
    id: "hips",
    label: "las patas",
    slot: { x: 317, y: 152 },
    size: { width: 296, height: 235 },
    path: "",
    image: "/art/experience/bones/hips.webp",
  },
  {
    id: "tail",
    label: "la cola",
    slot: { x: 458, y: 120 },
    size: { width: 521, height: 81 },
    path: "",
    image: "/art/experience/bones/tail.webp",
  },
];
