/** Clave de `sessionStorage` que recuerda que la intro de esta pestaña ya se reprodujo. */
export const INTRO_STORAGE_KEY = "portafolio:intro-seen";
/** Atributo de `<html>` que el script del `<head>` pone antes del primer pintado. */
export const INTRO_SEEN_ATTR = "data-intro-seen";

const SEEN_VALUE = "1";

/** Lo mínimo que necesitamos de `Storage`; permite probarlo sin navegador. */
export interface IntroStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** `sessionStorage` puede lanzar (modo privado, cookies bloqueadas): en ese caso no hay memoria. */
export function sessionStoreOrNull(): IntroStore | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

export function hasSeenIntro(store: IntroStore | null): boolean {
  try {
    return store?.getItem(INTRO_STORAGE_KEY) === SEEN_VALUE;
  } catch {
    return false;
  }
}

/** Devuelve `false` si no se pudo recordar; la intro simplemente volverá a verse. */
export function markIntroSeen(store: IntroStore | null): boolean {
  try {
    store?.setItem(INTRO_STORAGE_KEY, SEEN_VALUE);
    return store !== null;
  } catch {
    return false;
  }
}

/**
 * Script que va en el `<head>`: se ejecuta antes del primer pintado y, si la intro ya
 * se vio en esta pestaña, marca `<html>` para que el CSS oculte las mandíbulas sin parpadeo.
 */
export const INTRO_BOOT_SCRIPT =
  `try{if(sessionStorage.getItem(${JSON.stringify(INTRO_STORAGE_KEY)})===${JSON.stringify(SEEN_VALUE)})` +
  `document.documentElement.setAttribute(${JSON.stringify(INTRO_SEEN_ATTR)},"")}catch(e){}`;
