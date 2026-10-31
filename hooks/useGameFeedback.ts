"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FEEDBACK, playTones } from "@/lib/fishing/feedback";
import type { GamePhase } from "@/types/fishing";

export interface GameFeedback {
  /** La escena se sacude una vez (la animación CSS respeta prefers-reduced-motion). */
  readonly shaking: boolean;
  readonly soundOn: boolean;
  readonly toggleSound: () => void;
}

/** Sacudida, vibración y sonido opcional (silenciado por defecto) al cambiar de fase. */
export function useGameFeedback(phase: GamePhase): GameFeedback {
  const [soundOn, setSoundOn] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const previous = useRef(phase);
  const sound = useRef(false);

  useEffect(() => {
    if (previous.current === phase) return;
    previous.current = phase;
    const feedback = FEEDBACK[phase];
    if (!feedback) return;

    if (feedback.vibrate.length > 0) navigator.vibrate?.([...feedback.vibrate]);
    if (sound.current && audio.current) playTones(audio.current, feedback.tones);
  }, [phase]);

  useEffect(() => () => void audio.current?.close(), []);

  // El contexto de audio nace en el clic que activa el sonido (lo exige el navegador).
  const toggleSound = useCallback(() => {
    sound.current = !sound.current;
    if (sound.current) {
      audio.current ??= new AudioContext();
      void audio.current.resume();
    }
    setSoundOn(sound.current);
  }, []);

  // La sacudida es una animación CSS de una vuelta: basta con la clase durante la fase.
  return { shaking: FEEDBACK[phase]?.shake ?? false, soundOn, toggleSound };
}
