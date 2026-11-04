"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  DARK_QUERY,
  DEFAULT_THEME,
  THEME_ATTR,
  THEME_EVENT,
  isTheme,
  localStoreOrNull,
  readStoredTheme,
  storeTheme,
  type Theme,
} from "@/lib/theme";

const readTheme = (): Theme => {
  const value = document.documentElement.getAttribute(THEME_ATTR);
  return isTheme(value) ? value : DEFAULT_THEME;
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.setAttribute(THEME_ATTR, theme);
  root.style.colorScheme = theme;
  window.dispatchEvent(new Event(THEME_EVENT));
};

const subscribe = (onChange: () => void) => {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
};

/**
 * Tema actual (el que el script del `<head>` ya puso en `<html>`) y la acción para
 * cambiarlo. Mientras la persona no elija, sigue los cambios del sistema.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const follow = () => {
      if (readStoredTheme(localStoreOrNull()) === null) {
        applyTheme(media.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    storeTheme(localStoreOrNull(), next);
    applyTheme(next);
  }, []);

  return { theme, setTheme };
}
