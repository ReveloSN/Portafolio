"use client";

import { useId, type ReactNode } from "react";
import { useFlip } from "@/hooks/useFlip";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  readonly front: ReactNode;
  readonly back: ReactNode;
  /** Nombre accesible del control (qué pasa al girarla). */
  readonly label: string;
  readonly flipped?: boolean;
  readonly onFlip?: (next: boolean) => void;
  readonly className?: string;
  readonly testId?: string;
}

/** Inclinación máxima (grados) que sigue al cursor. */
const TILT_MAX_DEG = 6;

/**
 * Tarjeta de dos caras que gira en 3D. No conoce su contenido: recibe el frente y el
 * reverso; la cara oculta queda fuera del árbol accesible y del orden de foco (inert).
 */
export function FlipCard({
  front,
  back,
  label,
  flipped: controlled,
  onFlip,
  className,
  testId,
}: FlipCardProps) {
  const { flipped, turning, handlers } = useFlip({ flipped: controlled, onFlip });
  const tiltRef = useTilt<HTMLDivElement>(TILT_MAX_DEG);
  const id = useId();
  const frontId = `${id}-front`;
  const backId = `${id}-back`;

  return (
    <div
      ref={tiltRef}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={label}
      aria-describedby={flipped ? backId : frontId}
      data-testid={testId}
      data-flipped={flipped || undefined}
      data-turning={turning || undefined}
      className={cn("flip-card", className)}
      {...handlers}
    >
      <span aria-hidden="true" className="flip-shadow" />
      <div className="flip-tilt">
        <div className="flip-inner">
          <div
            id={frontId}
            className="flip-face flip-face-front"
            aria-hidden={flipped || undefined}
            inert={flipped}
          >
            {front}
          </div>
          <div
            id={backId}
            className="flip-face flip-face-back"
            aria-hidden={!flipped || undefined}
            inert={!flipped}
          >
            {back}
          </div>
        </div>
      </div>
    </div>
  );
}
