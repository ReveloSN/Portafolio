"use client";

import type { ElementType, ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";

interface ParallaxStageProps {
  readonly as?: ElementType;
  readonly id?: string;
  readonly className?: string;
  /** Escena de noche: conserva la paleta oscura en los dos temas. */
  readonly palette?: "night";
  readonly children: ReactNode;
}

/** Escena cuyas capas (`.px`, `[data-pointer-layer]`) se mueven con el mouse (useParallax). */
export function ParallaxStage({
  as: Tag = "div",
  id,
  className,
  palette,
  children,
}: ParallaxStageProps) {
  const ref = useParallax<HTMLElement>();
  return (
    <Tag ref={ref} id={id} className={className} data-palette={palette}>
      {children}
    </Tag>
  );
}
