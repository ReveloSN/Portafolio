"use client";

import { useEffect } from "react";

/** Margen antes de entrar en pantalla: cuando la sección asoma, sus animaciones ya corren. */
const ROOT_MARGIN = "200px 0px";

/**
 * Marca con `data-paused` las secciones que están fuera de pantalla; el CSS pausa sus
 * animaciones en bucle (luciérnagas, niebla, hojas, ondas). Sin renders de React: solo
 * un atributo. Así el navegador deja de producir frames para lo que nadie ve.
 */
export function useOffscreenPause(selector: string) {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = [...document.querySelectorAll<HTMLElement>(selector)];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-paused", !entry.isIntersecting);
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      sections.forEach((section) => section.removeAttribute("data-paused"));
    };
  }, [selector]);
}
