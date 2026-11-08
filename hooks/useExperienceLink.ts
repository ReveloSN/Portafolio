"use client";

import { createContext, useContext } from "react";

/** Pedido de mostrar una experiencia; `seq` cambia en cada pedido aunque se repita el id. */
export interface ExperienceRequest {
  readonly id: string;
  readonly seq: number;
}

export interface ExperienceLink {
  readonly request: ExperienceRequest | null;
  /** El fósil avisa qué experiencia acaba de revelarse; su diario pasa a esa página. */
  readonly reveal: (id: string) => void;
}

export const ExperienceLinkContext = createContext<ExperienceLink | null>(null);

/** Vínculo entre el fósil y los diarios; `null` si el componente se usa fuera del proveedor. */
export function useExperienceLink(): ExperienceLink | null {
  return useContext(ExperienceLinkContext);
}
