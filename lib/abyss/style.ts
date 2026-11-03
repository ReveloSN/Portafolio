import type { CSSProperties } from "react";
import { CARD_DIM_OPACITY, DIVE_LAYOUT, LANTERN, ZONE_FADE } from "@/data/abyss";

/**
 * Medidas de la inmersión como variables CSS de la sección: alturas de cada tramo,
 * fundido entre zonas, radio del haz y oscuridad. Una sola fuente: data/abyss.ts.
 */
export const DIVE_STYLE = {
  "--surface-h": `${DIVE_LAYOUT.surface}svh`,
  "--slot-h": `${DIVE_LAYOUT.slot}svh`,
  "--end-h": `${DIVE_LAYOUT.end}svh`,
  "--zone-fade": ZONE_FADE,
  "--beam-u": LANTERN.radiusU,
  "--dark-base": LANTERN.baseDark,
  "--dark-depth": LANTERN.depthDark,
  "--card-dim": CARD_DIM_OPACITY,
} as CSSProperties;
