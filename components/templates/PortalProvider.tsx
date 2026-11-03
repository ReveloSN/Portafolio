"use client";

import type { ReactNode } from "react";
import { PortalVeil } from "@/components/organisms/PortalVeil";
import { PORTAL_SKINS } from "@/components/worlds/portalSkins";
import { PORTAL_TIMING } from "@/data/portal";
import { usePortalController } from "@/hooks/usePortalController";
import { PortalContext } from "@/hooks/usePortalTransition";

/** Envuelve el sitio: comparte `navigate` con los enlaces y pinta el velo encima de todo. */
export function PortalProvider({ children }: { readonly children: ReactNode }) {
  const { state, api } = usePortalController(PORTAL_SKINS);
  return (
    <PortalContext value={api}>
      {children}
      <PortalVeil state={state} skin={PORTAL_SKINS[state.skin]} timing={PORTAL_TIMING} />
    </PortalContext>
  );
}
