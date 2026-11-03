import type { CSSProperties } from "react";
import type { PortalSkin, PortalState, PortalTiming } from "@/types/portal";

interface PortalVeilProps {
  readonly state: PortalState;
  readonly skin: PortalSkin;
  readonly timing: PortalTiming;
}

type VeilVars = CSSProperties & Record<`--${string}`, string>;

/**
 * Velo del portal: dos mitades oscuras con bordes de selva y una luz en la juntura.
 * Solo presentación; las fases las decide `usePortalController`. Nunca recibe
 * el puntero ni el foco, así que no bloquea el teclado.
 */
export function PortalVeil({ state, skin, timing }: PortalVeilProps) {
  if (state.phase === "idle") return null;
  const openMs = state.entrance ? skin.enterMs : timing.openMs;
  const style: VeilVars = {
    "--portal-close": `${timing.closeMs}ms`,
    "--portal-open": `${openMs}ms`,
  };
  return (
    <div
      aria-hidden="true"
      className="portal-veil"
      data-phase={state.phase}
      data-skin={state.skin}
      style={style}
    >
      <div className="portal-half portal-half-top">
        <div className="portal-edge">{skin.top}</div>
      </div>
      <div className="portal-half portal-half-bottom">
        <div className="portal-edge">{skin.bottom}</div>
      </div>
      <div className="portal-light" />
    </div>
  );
}
