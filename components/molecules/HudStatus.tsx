"use client";

import { useId, type Ref } from "react";
import { TokenButton } from "@/components/atoms/TokenButton";
import { usePressInput } from "@/hooks/usePressInput";

interface HudStatusProps {
  readonly status: string;
  readonly actionLabel: string;
  /** La ficha no hace nada en esta fase, pero sigue enfocable. */
  readonly idle: boolean;
  readonly urgent: boolean;
  readonly onPress: () => void;
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
  actionRef,
}: HudStatusProps) {
  const statusId = useId();
  const press = usePressInput(onPress);
  return (
    <div className="lake-hud-status">
      <p id={statusId} aria-live="polite" data-testid="fishing-status">
        {status}
      </p>
      <TokenButton
        {...press}
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
