"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { MAIN_CONTENT_ID } from "@/data/navigation";
import { PORTAL_DEFAULT_SKIN, PORTAL_FALLBACK_MS, PORTAL_TIMING } from "@/data/portal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { listen } from "@/lib/dom";
import { initialPortalState, portalReducer, routeOf } from "@/lib/portal";
import type { PortalApi } from "@/hooks/usePortalTransition";
import type { PortalSkin, PortalSkinKey } from "@/types/portal";

type SkinTimings = Readonly<Record<PortalSkinKey, Pick<PortalSkin, "enterMs">>>;

/** Lleva el foco al contenido de la página nueva: el enlace pulsado ya no existe. */
const focusMain = () =>
  document.getElementById(MAIN_CONTENT_ID)?.focus({ preventScroll: true });

/**
 * Orquesta el portal: cierra el velo, cambia de ruta a oscuras, espera a que la
 * ruta nueva esté montada y lo abre. El scroll (arriba o al ancla) lo hace Next al
 * montar la ruta, aunque llegue tarde y el velo ya se haya abierto por el respaldo. Las fases se encadenan con temporizadores
 * (no con `animationend`) para que nunca quede atascado si una animación no corre.
 * Con movimiento reducido no hay velo: se navega directo.
 */
export function usePortalController(skins: SkinTimings) {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [state, dispatch] = useReducer(portalReducer, pathname, initialPortalState);
  const { phase, href, entrance, skin } = state;
  const enterMs = skins[skin].enterMs;
  /** Ruta a la que se está yendo; se limpia al llegar, sea cual sea la fase. */
  const pendingRoute = useRef<string | null>(null);

  const navigate = useCallback(
    (target: string) => {
      if (reducedMotion) {
        pendingRoute.current = routeOf(target);
        router.push(target);
        return;
      }
      router.prefetch(target);
      dispatch({ type: "navigate", href: target, skin: PORTAL_DEFAULT_SKIN });
    },
    [reducedMotion, router],
  );

  useEffect(() => {
    if (phase === "closing") {
      const timer = window.setTimeout(
        () => dispatch({ type: "covered" }),
        PORTAL_TIMING.closeMs,
      );
      return () => window.clearTimeout(timer);
    }
    if (phase === "opening") {
      const duration = entrance ? enterMs : PORTAL_TIMING.openMs;
      const timer = window.setTimeout(() => dispatch({ type: "settled" }), duration);
      return () => window.clearTimeout(timer);
    }
  }, [phase, entrance, enterMs]);

  useEffect(() => {
    if (phase !== "covered" || !href) return;
    pendingRoute.current = routeOf(href);
    router.push(href);
    const fallback = window.setTimeout(
      () => dispatch({ type: "arrived" }),
      PORTAL_FALLBACK_MS,
    );
    return () => window.clearTimeout(fallback);
  }, [phase, href, router]);

  useEffect(() => {
    if (pendingRoute.current !== pathname) return;
    pendingRoute.current = null;
    focusMain();
    dispatch({ type: "arrived" });
  }, [pathname]);

  useEffect(() => {
    if (phase !== "opening") return;
    return listen(window, "keydown", (event) => {
      if (event.key === "Escape") dispatch({ type: "skip" });
    });
  }, [phase]);

  const api = useMemo<PortalApi>(() => ({ navigate }), [navigate]);
  return { state, api };
}
