"use client";

import { useEffect } from "react";

/**
 * Por abajo, 200 px antes de entrar: cuando la sección asoma, sus animaciones ya corren (y
 * lo que cruza su costura hacia arriba, como la cola, no se ve congelado). Por arriba, 1 px
 * hacia dentro: una sección que solo toca el borde (el Hero al saltar a Sobre mí) ya no se
 * ve y se pausa.
 */
const ROOT_MARGIN = "-1px 0px 200px 0px";

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
