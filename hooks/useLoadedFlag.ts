"use client";

import { useEffect } from "react";
import { PORTAL_ENTER_MS } from "@/data/portal";
import { JOURNAL_FONT_ATTR, LOADED_ATTR } from "@/lib/constants";
import { whenLoaded } from "@/lib/dom";

/** La serif del diario (variable de next/font) en sus dos estilos. */
const JOURNAL_FONT_VAR = "--font-fell";
const JOURNAL_SELECTOR = ".journal-sheet";
const JOURNAL_STYLES = ["400 1em", "italic 400 1em"] as const;

/** Baja las dos variantes antes de aplicarlas: un solo cambio de fuente, un solo layout. */
async function loadJournalFont() {
  const family = getComputedStyle(document.documentElement).getPropertyValue(
    JOURNAL_FONT_VAR,
  );
  // Solo la portada tiene diario: en las demás páginas serían 118 KB para nada.
  if (!family || !document.fonts || !document.querySelector(JOURNAL_SELECTOR)) return;
  await Promise.all(
    JOURNAL_STYLES.map((style) => document.fonts.load(`${style} ${family}`)),
  );
}

/**
 * Marca `<html>` cuando termina `load`. La pantalla «Cargando…» espera ese evento, así que
 * lo que no está en la primera pantalla se pide después, desde el CSS (`app/deferred.css`):
 * - Máscaras de las huellas: al abrir las hojas; con un ancla en la dirección, enseguida
 *   (pueden ser justo lo que se va a ver).
 * - Serif del diario: siempre con las hojas abiertas y ya descargada. Cambiar de fuente
 *   durante el salto a un ancla mueve la página.
 */
export function useLoadedFlag() {
  useEffect(() => {
    let timers: number[] = [];
    let mounted = true;
    const mark = (attribute: string) => {
      if (mounted) document.documentElement.setAttribute(attribute, "");
    };
    const schedule = () => {
      const artDelay = window.location.hash ? 0 : PORTAL_ENTER_MS;
      const showFont = () => mark(JOURNAL_FONT_ATTR);
      timers = [
        window.setTimeout(() => mark(LOADED_ATTR), artDelay),
        // Si la fuente falla se marca igual y queda la de respaldo.
        window.setTimeout(
          () => loadJournalFont().then(showFont, showFont),
          PORTAL_ENTER_MS,
        ),
      ];
    };
    const unlisten = whenLoaded(schedule);
    return () => {
      mounted = false;
      unlisten();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);
}
