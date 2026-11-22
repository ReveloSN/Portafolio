import type { CSSProperties } from "react";
import { PortalRunner } from "@/components/atoms/PortalRunner";
import { PortalVinesBottom, PortalVinesTop } from "@/components/worlds/art/PortalVines";
import { PORTAL_ENTER_MS, PORTAL_TIMING } from "@/data/portal";
import type { PortalState } from "@/types/portal";

interface PortalVeilProps {
  readonly state: PortalState;
  readonly loadingLabel: string;
}

type VeilVars = CSSProperties & Record<`--${string}`, string>;

/**
 * Velo del portal: dos mitades oscuras con bordes de selva y una luz en la juntura.
 * Las fases las decide `usePortalController`. La espera inicial anuncia la carga.
 */
export function PortalVeil({ state, loadingLabel }: PortalVeilProps) {
  if (state.phase === "idle") return null;
  const loading = state.entrance && state.phase === "covered";
  const openMs = state.entrance ? PORTAL_ENTER_MS : PORTAL_TIMING.openMs;
  const style: VeilVars = {
    "--portal-close": `${PORTAL_TIMING.closeMs}ms`,
    "--portal-open": `${openMs}ms`,
  };
  return (
    <div
      aria-hidden={loading ? undefined : true}
      className="portal-veil"
      data-phase={state.phase}
      data-loading={loading ? "" : undefined}
      style={style}
    >
      <div className="portal-half portal-half-top" aria-hidden="true">
        <div className="portal-edge">
          <PortalVinesTop />
        </div>
      </div>
      <div className="portal-half portal-half-bottom" aria-hidden="true">
        <div className="portal-edge">
          <PortalVinesBottom />
        </div>
      </div>
      <div className="portal-light" aria-hidden="true" />
      {loading ? (
        <div className="portal-loading" role="status">
          <PortalRunner />
          <span>{loadingLabel}</span>
        </div>
      ) : null}
    </div>
  );
}
