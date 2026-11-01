"use client";

import { useId, type ReactNode, type Ref } from "react";
import { TokenButton } from "@/components/atoms/TokenButton";
import { useHoldInput } from "@/hooks/useHoldInput";

interface HudStatusProps {
  readonly status: string;
  readonly actionLabel: string;
  /** La ficha no hace nada en esta fase, pero sigue enfocable. */
  readonly idle: boolean;
  readonly urgent: boolean;
  readonly onPress: () => void;
  readonly onRelease: () => void;
  /** Indicador de la fase (si lo hay), sobre la línea de estado. */
  readonly meter?: ReactNode;
  readonly actionRef?: Ref<HTMLButtonElement>;
}

/**
 * Línea de estado del juego (aria-live) y la ficha de acción persistente: el foco se queda
 * en ella durante toda la partida y su texto cambia con la fase.
 */
export function HudStatus({
  status,
  actionLabel,
  idle,
  urgent,
  onPress,
  onRelease,
  meter,
  actionRef,
}: HudStatusProps) {
  const statusId = useId();
  const hold = useHoldInput({ onPress, onRelease });
  return (
    <div className="lake-hud-status">
      {meter ? <div className="lake-hud-meter">{meter}</div> : null}
      <p id={statusId} aria-live="polite" data-testid="fishing-status">
        {status}
      </p>
      <TokenButton
        {...hold}
        ref={actionRef}
        urgent={urgent}
        aria-disabled={idle || undefined}
        aria-describedby={statusId}
        data-testid="fishing-action"
      >
        {actionLabel}
      </TokenButton>
    </div>
  );
}
