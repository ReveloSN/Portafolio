"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  /** Retraso (ms) para escalonar varios elementos hermanos. */
  readonly delay?: number;
}

/** Anima (opacity + transform) cuando el elemento entra en pantalla. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("fade-up", inView && "fade-up-in", className)}
      style={{ transitionDelay: inView ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
