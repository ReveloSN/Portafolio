import type { DigState } from "@/types/dig";
import { DIG_LAYERS_PER_CELL } from "./constants";
import { countFound } from "./digReducer";

export interface DigAnnouncementCopy {
  readonly layer: string;
  readonly fossil: string;
  readonly all: string;
  readonly cover: string;
  readonly layerOne: string;
  readonly layerMany: string;
}

type TemplateValues = Readonly<Record<string, string | number>>;

/** Sustituye `{clave}` por su valor; las claves desconocidas se dejan intactas. */
export function fillTemplate(template: string, values: TemplateValues): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}

/**
 * Texto único para la región `aria-live`: describe solo lo que acaba de pasar,
 * así cada acción se anuncia una vez. Devuelve "" mientras no haya acciones.
 */
export function buildDigAnnouncement(
  state: DigState,
  names: readonly string[],
  copy: DigAnnouncementCopy,
): string {
  const total = state.layers.length;
  const found = countFound(state.layers);

  switch (state.lastEvent) {
    case null:
      return "";
    case "cover":
      return fillTemplate(copy.cover, { found, total });
    case "digAll":
      return fillTemplate(copy.all, { found, total });
    case "dig": {
      if (state.lastDug === null) return "";
      const name = names[state.lastDug] ?? "";
      const left = DIG_LAYERS_PER_CELL - (state.layers[state.lastDug] ?? 0);
      if (left <= 0) return fillTemplate(copy.fossil, { name, found, total });
      const unit = left === 1 ? copy.layerOne : copy.layerMany;
      return fillTemplate(copy.layer, { name, left, unit });
    }
  }
}
