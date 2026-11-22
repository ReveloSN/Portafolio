"use client";

import { useEffect } from "react";
import { PORTAL_ENTER_MS } from "@/data/portal";
import { LOADED_ATTR } from "@/lib/constants";
import { listen } from "@/lib/dom";

/** La serif del diario (variable de next/font) en sus dos estilos. */
const JOURNAL_FONT_VAR = "--font-fell";
const JOURNAL_STYLES = ["400 1em", "italic 400 1em"] as const;

/** Baja las dos variantes antes de aplicarlas: un solo cambio de fuente, un solo layout. */
async function loadJournalFont() {
  const family = getComputedStyle(document.documentElement).getPropertyValue(
    JOURNAL_FONT_VAR,
  );
  if (!family || !document.fonts) return;
  await Promise.all(
    JOURNAL_STYLES.map((style) => document.fonts.load(`${style} ${family}`)),
  );
}

/**
 * Marca `<html>` cuando termina `load`. La pantalla «Cargando…» espera ese evento, así que
 * lo que no está en la primera pantalla (máscaras de huellas, cáscaras, serif del diario)
 * se pide después, desde el CSS (`app/deferred.css`). Espera además a que abran las hojas,
 * para no meter ese layout en medio de la apertura.
 */
export function useLoadedFlag() {
  useEffect(() => {
    let timer = 0;
    let mounted = true;
    const mark = () => {
      if (mounted) document.documentElement.setAttribute(LOADED_ATTR, "");
    };
    const schedule = () => {
      timer = window.setTimeout(() => {
        // Si la fuente falla se marca igual: el arte diferido no depende de ella.
        loadJournalFont().then(mark, mark);
      }, PORTAL_ENTER_MS);
    };
    const loaded = document.readyState === "complete";
    if (loaded) schedule();
    const unlisten = loaded ? null : listen(window, "load", schedule, { once: true });
    return () => {
      mounted = false;
      unlisten?.();
      window.clearTimeout(timer);
    };
  }, []);
}
