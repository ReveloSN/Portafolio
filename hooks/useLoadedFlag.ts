"use client";

import { useEffect } from "react";
import { PORTAL_ENTER_MS } from "@/data/portal";
import { LOADED_ATTR } from "@/lib/constants";
import { listen } from "@/lib/dom";

/**
 * Marca `<html>` cuando termina `load`. La pantalla «Cargando…» espera ese evento, así que
 * lo que no está en la primera pantalla (máscaras de huellas, cáscaras, serif del diario)
 * se pide después, desde el CSS (`app/deferred.css`). Espera además a que abran las hojas,
 * para no meter ese layout en medio de la apertura.
 */
export function useLoadedFlag() {
  useEffect(() => {
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(
        () => document.documentElement.setAttribute(LOADED_ATTR, ""),
        PORTAL_ENTER_MS,
      );
    };
    const loaded = document.readyState === "complete";
    if (loaded) schedule();
    const unlisten = loaded ? null : listen(window, "load", schedule, { once: true });
    return () => {
      unlisten?.();
      window.clearTimeout(timer);
    };
  }, []);
}
