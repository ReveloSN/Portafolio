import type { PortalSkinKey, PortalTiming } from "@/types/portal";

/** Arte del velo con el que se entra a cada ruta al cargar el sitio. */
export const PORTAL_ENTRANCES: Readonly<Record<string, PortalSkinKey>> = {
  "/": "jaws",
};

/** Arte del velo al navegar entre páginas y al entrar por una ruta sin entrada propia. */
export const PORTAL_DEFAULT_SKIN: PortalSkinKey = "vines";

/** Entradas que se reproducen una sola vez por sesión de la pestaña. */
export const PORTAL_ONCE_PER_SESSION: readonly PortalSkinKey[] = ["jaws"];

export const PORTAL_TIMING: PortalTiming = { closeMs: 520, openMs: 820 };

/** Si la ruta nueva tarda más que esto, el portal se abre igual: nunca deja la pantalla a oscuras. */
export const PORTAL_FALLBACK_MS = 4000;
