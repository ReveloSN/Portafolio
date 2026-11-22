"use client";

import { useEffect } from "react";
import { LOADED_ATTR } from "@/lib/constants";
import { listen } from "@/lib/dom";

/**
 * Marca `<html>` cuando termina `load`. La pantalla «Cargando…» espera ese evento, así que
 * lo que no está en la primera pantalla (máscaras de huellas, cáscaras, serif del diario)
 * se pide después, desde el CSS (`app/deferred.css`).
 */
export function useLoadedFlag() {
  useEffect(() => {
    const mark = () => document.documentElement.setAttribute(LOADED_ATTR, "");
    if (document.readyState === "complete") {
      mark();
      return;
    }
    return listen(window, "load", mark, { once: true });
  }, []);
}
