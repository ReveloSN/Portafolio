"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BREACH, type BreachTimeline } from "@/data/breach";
import { breachSteps } from "@/lib/fishing/breach";
import type { FeedbackCue } from "@/lib/fishing/feedback";
import type { BreachStage, Creature, GamePhase } from "@/types/fishing";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export interface BreachSequence {
  readonly stage: BreachStage;
  /** La criatura que salta (sigue aunque el juego ya haya pasado a la pelea). */
  readonly creature: Creature | null;
  readonly timeline: BreachTimeline | null;
  readonly reduced: boolean;
}

const IDLE: BreachSequence = {
  stage: "idle",
  creature: null,
  timeline: null,
  reduced: false,
};

/**
 * Fases visuales del salto: bulge, rise, snap, fall, splash. Empieza al entrar en la picada
 * y sigue hasta el final aunque se enganche antes (el motor no espera a la animación).
 * Avisa con `onCue` del rugido al subir un gigante y del chapoteo al caer.
 */
export function useBreachSequence(
  phase: GamePhase,
  creature: Creature | null,
  onCue: (cue: FeedbackCue) => void,
): BreachSequence {
  const [sequence, setSequence] = useState<BreachSequence>(IDLE);
  const previous = useRef(phase);
  const timers = useRef<number[]>([]);
  const cue = useRef(onCue);
  useLayoutEffect(() => {
    cue.current = onCue;
  });

  useEffect(() => {
    const entering = phase === "bite" && previous.current !== "bite";
    previous.current = phase;
    if (!entering || !creature) return;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    const timeline = BREACH[creature.breach];
    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    let at = 0;
    timers.current = breachSteps(timeline, reduced).map((step) => {
      const timer = window.setTimeout(() => {
        setSequence(
          step.stage === "idle"
            ? IDLE
            : { stage: step.stage, creature, timeline, reduced },
        );
        if (step.stage === "rise" && creature.breach === "giant") cue.current("roar");
        if (step.stage === "splash") cue.current("splash");
      }, at);
      at += step.ms;
      return timer;
    });
  }, [phase, creature]);

  useEffect(() => {
    const pending = timers;
    return () => pending.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return sequence;
}
