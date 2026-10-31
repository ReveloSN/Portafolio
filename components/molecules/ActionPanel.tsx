"use client";

import { useId, type ReactNode, type Ref } from "react";
import { Button } from "@/components/atoms/Button";
import { useHoldInput } from "@/hooks/useHoldInput";
import { cn } from "@/lib/utils";

interface ActionPanelProps {
  readonly status: string;
  readonly actionLabel: string;
  /** El botón no hace nada en esta fase, pero sigue enfocable. */
  readonly idle: boolean;
  readonly urgent: boolean;
  readonly onPress: () => void;
  readonly onRelease: () => void;
  /** Barra de fuerza o de pelea, según la fase. */
  readonly meter: ReactNode;
  /** Para devolverle el foco tras elegir o enganchar la carnada. */
  readonly actionRef?: Ref<HTMLButtonElement>;
}

/**
 * Un solo botón de acción para todo el juego (mantener para lanzar, pulsar para
 * enganchar, mantener para recoger). Su texto cambia; el foco nunca se pierde.
 */
export function ActionPanel({
  status,
  actionLabel,
  idle,
  urgent,
  onPress,
  onRelease,
  meter,
  actionRef,
}: ActionPanelProps) {
  const statusId = useId();
  const hold = useHoldInput({ onPress, onRelease });
  return (
    <div className="grid gap-3">
      <p
        id={statusId}
        aria-live="polite"
        className="text-fluid-base min-h-[2.6em] font-semibold"
        data-testid="fishing-status"
      >
        {status}
      </p>
      <div className="min-h-[3.2rem]">{meter}</div>
      <Button
        {...hold}
        ref={actionRef}
        aria-disabled={idle || undefined}
        aria-describedby={statusId}
        data-testid="fishing-action"
        className={cn(
          "w-full touch-none select-none [-webkit-touch-callout:none]",
          urgent && "pull",
          idle && "opacity-60 hover:translate-y-0",
        )}
      >
        {actionLabel}
      </Button>
    </div>
  );
}
