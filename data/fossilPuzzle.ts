import type { BoneShape, PuzzleBoard } from "@/types/puzzle";

/** Tablero en unidades propias: se escala al ancho disponible sin cambiar la geometría. */
export const PUZZLE_BOARD: PuzzleBoard = {
  width: 1000,
  slabHeight: 440,
  trayPadding: 28,
  trayGap: 26,
  snapTolerance: 70,
  keyStep: 16,
  keyStepLarge: 48,
};

/** Cuántas experiencias admite el fósil (una pieza por experiencia). */
export const PUZZLE_PIECES = { min: 6, max: 8 } as const;

/**
 * Esqueleto de perfil, mirando a la izquierda. Las primeras seis piezas forman un fósil
 * completo por sí solas; las dos últimas solo aparecen con siete u ocho experiencias.
 */
export const BONE_SHAPES: readonly BoneShape[] = [
  {
    id: "skull",
    label: "el cráneo",
    size: { width: 140, height: 100 },
    slot: { x: 62, y: 112 },
    path: "M10 60Q10 15 60 10Q120 5 135 40L130 70Q110 95 70 92L40 90Q15 85 10 60ZM95 40a10 10 0 1 0-20 0a10 10 0 1 0 20 0Z",
  },
  {
    id: "neck",
    label: "el cuello",
    size: { width: 90, height: 60 },
    slot: { x: 200, y: 150 },
    path: "M5 20Q20 5 45 12Q70 5 85 20L85 40Q70 55 45 48Q20 55 5 40Z",
  },
  {
    id: "ribs",
    label: "las costillas",
    size: { width: 200, height: 160 },
    slot: { x: 288, y: 120 },
    path: "M0 20Q100 0 200 20L200 40Q190 120 140 155L130 150Q170 100 175 45L150 45Q148 110 105 158L95 152Q128 105 125 45L100 45Q95 110 60 155L50 148Q78 100 75 45L50 45Q42 95 18 140L8 133Q25 90 25 42L0 40Z",
  },
  {
    id: "hips",
    label: "la cadera",
    size: { width: 120, height: 100 },
    slot: { x: 490, y: 122 },
    path: "M10 30Q60 0 110 30L105 55Q80 60 70 95L50 95Q40 60 15 55Z",
  },
  {
    id: "tail",
    label: "la cola",
    size: { width: 220, height: 70 },
    slot: { x: 606, y: 146 },
    path: "M0 15Q110 0 220 35Q110 70 0 55Z",
  },
  {
    id: "legBack",
    label: "la pata trasera",
    size: { width: 80, height: 170 },
    slot: { x: 512, y: 224 },
    path: "M28 0Q52 0 52 18L48 120Q50 135 66 150Q80 160 76 170L8 170Q4 156 24 146L26 18Q26 0 28 0Z",
  },
  {
    id: "legFront",
    label: "la pata delantera",
    size: { width: 80, height: 120 },
    slot: { x: 352, y: 284 },
    path: "M30 0Q50 0 50 15L46 92Q60 100 75 112L70 120L10 120Q5 105 30 98L26 15Q26 0 30 0Z",
  },
  {
    id: "tailTip",
    label: "la punta de la cola",
    size: { width: 100, height: 50 },
    slot: { x: 828, y: 170 },
    path: "M0 10Q60 15 100 25Q60 35 0 40Z",
  },
];
