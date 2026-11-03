import { PortalVinesBottom, PortalVinesTop } from "./art/PortalVines";
import type { PortalSkin, PortalSkinKey } from "@/types/portal";

/** Apertura de entrada al sitio, algo más lenta que la de navegación. */
const VINES_ENTER_MS = 1100;

/**
 * Registro: arte de los bordes del velo del portal según su clave.
 * Separado de `registry.tsx` para no cargar escenas ni fósiles en el layout.
 */
export const PORTAL_SKINS: Readonly<Record<PortalSkinKey, PortalSkin>> = {
  vines: {
    top: <PortalVinesTop />,
    bottom: <PortalVinesBottom />,
    enterMs: VINES_ENTER_MS,
  },
};
