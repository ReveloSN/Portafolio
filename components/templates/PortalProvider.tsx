"use client";

import type { ReactNode } from "react";
import { PortalVeil } from "@/components/organisms/PortalVeil";
import { useCopy } from "@/hooks/useLocale";
import { usePortalController } from "@/hooks/usePortalController";
import { PortalContext } from "@/hooks/usePortalTransition";

/** Envuelve el sitio: comparte `navigate` con los enlaces y pinta el velo encima de todo. */
export function PortalProvider({ children }: { readonly children: ReactNode }) {
  const { state, api } = usePortalController();
  const { site } = useCopy();
  return (
    <PortalContext value={api}>
      <PortalVeil state={state} loadingLabel={site.loading} />
      <div className="portal-content contents">{children}</div>
    </PortalContext>
  );
}
