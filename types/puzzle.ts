export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Size {
  readonly width: number;
  readonly height: number;
}

/** Huesos del esqueleto; cada experiencia toma uno en este orden. */
export type BoneId =
  "skull" | "neck" | "ribs" | "hips" | "tail" | "legBack" | "legFront" | "tailTip";

/**
 * Una pieza del fósil. Medidas en unidades del tablero (ver `PUZZLE_BOARD`): `path` está
 * dibujado en su propia caja de `size` y `slot` es la esquina de su hueco en la losa.
 */
export interface BoneShape {
  readonly id: BoneId;
  /** Nombre del hueso para lectores de pantalla ("el cráneo"). */
  readonly label: string;
  readonly size: Size;
  readonly slot: Point;
  readonly path: string;
}

export interface PuzzleBoard {
  readonly width: number;
  /** Alto de la losa de piedra; la bandeja de piezas va debajo. */
  readonly slabHeight: number;
  /** Margen y separación de las piezas en la bandeja. */
  readonly trayPadding: number;
  readonly trayGap: number;
  /** Distancia máxima (unidades) entre el centro de la pieza y el de su hueco para encajar. */
  readonly snapTolerance: number;
  /** Paso de las flechas del teclado (unidades) y paso largo con Mayús. */
  readonly keyStep: number;
  readonly keyStepLarge: number;
}

export type PuzzleEvent = "select" | "place" | "miss" | "cancel" | "placeAll" | "reset";

export interface PuzzleState {
  readonly placed: readonly boolean[];
  /** Pieza tomada (con clic, toque o Enter), lista para moverse o encajarse. */
  readonly selected: number | null;
  /** Última pieza encajada: su ficha es la que se muestra. */
  readonly lastPlaced: number | null;
  readonly lastEvent: PuzzleEvent | null;
  /** Pieza a la que se refiere el último evento (para anunciarlo). */
  readonly lastIndex: number | null;
}

export type PuzzleAction =
  | { readonly type: "select"; readonly index: number }
  | { readonly type: "cancel" }
  | { readonly type: "place"; readonly index: number }
  | { readonly type: "miss"; readonly index: number }
  | { readonly type: "placeAll" }
  | { readonly type: "reset" };
