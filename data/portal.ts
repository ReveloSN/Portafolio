import type { PortalTiming } from "@/types/portal";

export const PORTAL_TIMING: PortalTiming = { closeMs: 520, openMs: 820 };
export const PORTAL_ENTER_MS = 1100;

/** Si la ruta nueva tarda más que esto, el portal se abre igual: nunca deja la pantalla a oscuras. */
export const PORTAL_FALLBACK_MS = 4000;
