import type { CSSProperties } from "react";
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
          <svg
            className="portal-runner"
            viewBox="0 0 64 54"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              className="portal-runner-leg portal-runner-leg-back"
              d="M29 32h7v8l-5 6v5h-8v-4h4v-6l2-3Z"
            />
            <path d="M38 6h15v3h6v12H46v4h7v5H43v5H33v5h-9v-5l-7-2-6-4-5-5-3-7 8 5 9 3h7l5-6v-7h3V9h3Z" />
            <path className="portal-runner-leg" d="M26 32h8v9l5 5v5h-9v-4l-4-5Z" />
            <rect x="43" y="11" width="3" height="3" fill="#000" />
          </svg>
          <span>{loadingLabel}</span>
        </div>
      ) : null}
    </div>
  );
}
