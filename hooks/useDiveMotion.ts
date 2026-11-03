"use client";

import { useEffect, useState, type RefObject } from "react";
import { useDepthProgress } from "@/hooks/useDepthProgress";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";
import { usePointerLight } from "@/hooks/usePointerLight";
import { createFrameLoop } from "@/lib/abyss/frame";

interface DiveRefs {
  readonly dive: RefObject<HTMLElement | null>;
  readonly stage: RefObject<HTMLElement | null>;
  readonly list: RefObject<HTMLElement | null>;
}

/**
 * Todo el movimiento de la inmersión con un solo bucle de frames: el avance con el scroll
 * (--depth) y la linterna con inercia. Con movimiento reducido no se registra nada.
 */
export function useDiveMotion(refs: DiveRefs, count: number) {
  const motion = useMotionAllowed();
  const [frame] = useState(createFrameLoop);
  const depth = useDepthProgress(frame, refs, count, motion);
  usePointerLight(frame, { ...refs, depth }, motion);
  useEffect(() => () => frame.stop(), [frame]);
}
