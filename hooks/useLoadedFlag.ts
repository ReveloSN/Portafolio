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
 * Marca `<html>` cuando termina `load` y abren las hojas. La pantalla «Cargando…» espera
 * ese evento, así que lo que no está en la primera pantalla se pide después, desde el CSS
 * (`app/deferred.css`): máscaras de las huellas y serif del diario.
 *
 * Con un ancla en la dirección no se difiere nada: puede ser justo lo que se va a ver, y
 * cambiar de fuente después de saltar al ancla movería la página.
 */
export function useLoadedFlag() {
  useEffect(() => {
    let timer = 0;
    let mounted = true;
    const mark = (attribute: string) => {
      if (mounted) document.documentElement.setAttribute(attribute, "");
    };
    if (window.location.hash) {
      mark(LOADED_ATTR);
      mark(JOURNAL_FONT_ATTR);
      return;
    }
    const showFont = () => mark(JOURNAL_FONT_ATTR);
    const schedule = () => {
      timer = window.setTimeout(() => {
        mark(LOADED_ATTR);
        // Si la fuente falla se marca igual y queda la de respaldo.
        loadJournalFont().then(showFont, showFont);
      }, PORTAL_ENTER_MS);
    };
    const unlisten = whenLoaded(schedule);
    return () => {
      mounted = false;
      unlisten();
      window.clearTimeout(timer);
    };
  }, []);
}
