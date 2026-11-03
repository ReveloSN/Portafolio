export type DigEvent = "dig" | "digAll" | "cover";

export interface DigState {
  readonly layers: readonly number[];
  readonly lastDug: number | null;
  readonly tick: number;
  /** Última acción que cambió el estado; sirve para anunciarla una sola vez. */
  readonly lastEvent: DigEvent | null;
}

export type DigAction =
  | { readonly type: "dig"; readonly index: number }
  | { readonly type: "digAll" }
  | { readonly type: "cover" };
