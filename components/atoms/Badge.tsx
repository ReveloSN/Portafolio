import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/** Etiqueta mono en mayúsculas con borde ámbar (estado de una cuadrícula). */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-glow-amber text-fluid-xs flex-none rounded-full border border-[rgba(255,196,110,.45)] px-2.5 py-[5px] font-mono tracking-[.1em] whitespace-nowrap",
        className,
      )}
    >
      {children}
    </span>
  );
}
