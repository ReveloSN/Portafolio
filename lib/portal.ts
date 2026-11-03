import { PORTAL_DEFAULT_SKIN, PORTAL_ENTRANCES } from "@/data/portal";
import type {
  PortalAction,
  PortalClick,
  PortalPhase,
  PortalSkinKey,
  PortalState,
} from "@/types/portal";

const PRIMARY_BUTTON = 0;

/** Al cargar el sitio el velo ya está abriéndose: la entrada al portafolio es la misma transición. */
export function initialPortalState(pathname: string): PortalState {
  return { phase: "opening", href: null, skin: entranceSkin(pathname), entrance: true };
}

export function entranceSkin(pathname: string): PortalSkinKey {
  return PORTAL_ENTRANCES[pathname] ?? PORTAL_DEFAULT_SKIN;
}

/** Desde qué fases es válida cada acción. Una acción fuera de lugar no cambia nada. */
const ALLOWED: Readonly<Record<PortalAction["type"], readonly PortalPhase[]>> = {
  navigate: ["idle", "opening"],
  covered: ["closing"],
  arrived: ["covered"],
  settled: ["opening"],
  skip: ["opening"],
};

export function portalReducer(state: PortalState, action: PortalAction): PortalState {
  if (!ALLOWED[action.type].includes(state.phase)) return state;
  switch (action.type) {
    case "navigate":
      return { phase: "closing", href: action.href, skin: action.skin, entrance: false };
    case "covered":
      return { ...state, phase: "covered" };
    case "arrived":
      return { ...state, phase: "opening", href: null };
    case "settled":
    case "skip":
      return { ...state, phase: "idle", href: null, entrance: false };
  }
}

/** Ruta sin consulta ni ancla: "/mundos/selva#galeria" → "/mundos/selva". */
export function routeOf(href: string): string {
  return href.split(/[?#]/, 1)[0] || "/";
}

/**
 * El portal solo intercepta un clic principal sin teclas modificadoras
 * hacia otra ruta; abrir en otra pestaña o saltar a un ancla de la misma página sigue igual.
 */
export function shouldIntercept(click: PortalClick, href: string, pathname: string) {
  const plain =
    click.button === PRIMARY_BUTTON &&
    !click.metaKey &&
    !click.ctrlKey &&
    !click.shiftKey &&
    !click.altKey &&
    !click.defaultPrevented;
  return plain && href.startsWith("/") && routeOf(href) !== pathname;
}
