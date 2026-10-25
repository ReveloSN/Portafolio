"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface RevealGroupProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: ElementType;
}

/**
 * Activa (una sola vez, con IntersectionObserver) la entrada escalonada de sus
 * descendientes `.stagger-item`; cada uno define su orden con la variable `--i`.
 */
export function RevealGroup({ children, className, as: Tag = "div" }: RevealGroupProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-inview={inView ? "" : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
