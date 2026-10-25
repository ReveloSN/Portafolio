import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
}

export function Tag({ children, className, style }: TagProps) {
  return (
    <span
      style={style}
      className={cn(
        "rounded-full border border-white/20 bg-white/5 px-3 py-[5px] font-mono text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
