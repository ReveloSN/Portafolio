export interface DigState {
  readonly layers: readonly number[];
  readonly lastDug: number | null;
  readonly tick: number;
}

export type DigAction =
  | { readonly type: "dig"; readonly index: number }
  | { readonly type: "digAll" }
  | { readonly type: "cover" };
