"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { PORTAL_DEFAULT_SKIN, PORTAL_FALLBACK_MS, PORTAL_TIMING } from "@/data/portal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { listen } from "@/lib/dom";
import { initialPortalState, portalReducer, routeOf } from "@/lib/portal";
import type { PortalApi } from "@/hooks/usePortalTransition";
import type { PortalSkin, PortalSkinKey } from "@/types/portal";

type SkinTimings = Readonly<Record<PortalSkinKey, Pick<PortalSkin, "enterMs">>>;

const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

/**
 * Orquesta el portal: cierra el velo, cambia de ruta a oscuras, espera a que la
 * ruta nueva esté montada y lo abre. Las fases se encadenan con temporizadores
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

  const navigate = useCallback(
    (target: string) => {
      if (reducedMotion) {
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
    router.push(href, { scroll: false });
    const fallback = window.setTimeout(
      () => dispatch({ type: "arrived" }),
      PORTAL_FALLBACK_MS,
    );
    return () => window.clearTimeout(fallback);
  }, [phase, href, router]);

  useEffect(() => {
    if (phase !== "covered" || !href || routeOf(href) !== pathname) return;
    toTop();
    dispatch({ type: "arrived" });
  }, [phase, href, pathname]);

  useEffect(() => {
    if (phase !== "opening") return;
    return listen(window, "keydown", (event) => {
      if (event.key === "Escape") dispatch({ type: "skip" });
    });
  }, [phase]);

  const api = useMemo<PortalApi>(() => ({ phase, navigate }), [phase, navigate]);
  return { state, api };
}
