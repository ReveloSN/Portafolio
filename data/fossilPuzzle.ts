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
export const PUZZLE_PIECES = { min: 7, max: 7 } as const;
export const PUZZLE_TRAY_SCALE = 0.5;

/** Huesos con alfa real: la piedra permanece fija y nunca forma parte de las piezas. */
export const BONE_SHAPES: readonly BoneShape[] = [
  {
    id: "skull",
    label: "el cráneo",
    slot: { x: 36, y: 78 },
    size: { width: 190, height: 112 },
    imageSize: { width: 311, height: 112 },
    path: "",
    image: "/art/experience/bones/skull.webp",
  },
  {
    id: "neck",
    label: "el cuello",
    slot: { x: 226, y: 78 },
    size: { width: 121, height: 112 },
    imageSize: { width: 311, height: 112 },
    imageOffset: { x: 190, y: 0 },
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
    label: "la cadera y las patas superiores",
    slot: { x: 317, y: 152 },
    size: { width: 296, height: 120 },
    imageSize: { width: 296, height: 235 },
    path: "",
    image: "/art/experience/bones/hips.webp",
  },
  {
    id: "feet",
    label: "la parte inferior de las patas",
    slot: { x: 317, y: 272 },
    size: { width: 296, height: 115 },
    imageSize: { width: 296, height: 235 },
    imageOffset: { x: 0, y: 120 },
    path: "",
    image: "/art/experience/bones/hips.webp",
  },
  {
    id: "tail",
    label: "la base de la cola",
    slot: { x: 458, y: 120 },
    size: { width: 313, height: 81 },
    imageSize: { width: 521, height: 81 },
    path: "",
    image: "/art/experience/bones/tail.webp",
  },
  {
    id: "tailTip",
    label: "la punta de la cola",
    slot: { x: 771, y: 120 },
    size: { width: 208, height: 81 },
    imageSize: { width: 521, height: 81 },
    imageOffset: { x: 313, y: 0 },
    path: "",
    image: "/art/experience/bones/tail.webp",
  },
];
