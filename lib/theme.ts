export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

/** Clave de `localStorage` con la elección explícita de la persona. */
export const THEME_STORAGE_KEY = "portafolio:theme";
/** Atributo de `<html>` que activa los tokens de cada tema. */
export const THEME_ATTR = "data-theme";
/** Evento propio para avisar a los componentes de un cambio hecho en esta pestaña. */
export const THEME_EVENT = "portafolio:themechange";
export const DARK_QUERY = "(prefers-color-scheme: dark)";
/** Sin JS ni preferencia: el tema claro es el de `:root`. */
export const DEFAULT_THEME: Theme = "light";

export const isTheme = (value: unknown): value is Theme =>
  typeof value === "string" && (THEMES as readonly string[]).includes(value);

/** Lo mínimo que necesitamos de `Storage`; permite probarlo sin navegador. */
export interface ThemeStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** `localStorage` puede lanzar (modo privado, cookies bloqueadas): entonces no hay memoria. */
export function localStoreOrNull(): ThemeStore | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function readStoredTheme(store: ThemeStore | null): Theme | null {
  try {
    const value = store?.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

/** Devuelve `false` si no se pudo guardar; el tema cambia igual para esta visita. */
export function storeTheme(store: ThemeStore | null, theme: Theme): boolean {
  try {
    store?.setItem(THEME_STORAGE_KEY, theme);
    return store !== null;
  } catch {
    return false;
  }
}

/** La elección guardada manda; si no hay, la del sistema. */
export const resolveTheme = (stored: Theme | null, prefersDark: boolean): Theme =>
  stored ?? (prefersDark ? "dark" : "light");

export const oppositeTheme = (theme: Theme): Theme =>
  theme === "dark" ? "light" : "dark";

/**
 * Script mínimo para el `<head>`: pone el tema en `<html>` antes del primer pintado, así
 * no hay parpadeo del tema claro al tema oscuro. Todo va en try/catch.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var s=null;try{s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}var t=s==="light"||s==="dark"?s:(window.matchMedia(${JSON.stringify(
  DARK_QUERY,
)}).matches?"dark":"light");var d=document.documentElement;d.setAttribute(${JSON.stringify(
  THEME_ATTR,
)},t);d.style.colorScheme=t}catch(e){}})();`;
