import type { GamePhase } from "@/types/fishing";

/** Respuesta física y sonora de cada fase. Las fases sin entrada no reaccionan. */
export interface PhaseFeedback {
  readonly shake: boolean;
  /** Patrón de navigator.vibrate (ms). */
  readonly vibrate: readonly number[];
  /** Notas (Hz) que suenan una tras otra. */
  readonly tones: readonly number[];
}

export const FEEDBACK: Partial<Readonly<Record<GamePhase, PhaseFeedback>>> = {
  bite: { shake: true, vibrate: [90], tones: [660, 880] },
  caught: { shake: false, vibrate: [40, 30, 40], tones: [523, 659, 784] },
  escaped: { shake: false, vibrate: [], tones: [330, 262] },
  lineBroken: { shake: true, vibrate: [70, 40, 120], tones: [196, 147] },
  complete: {
    shake: false,
    vibrate: [60, 40, 60, 40, 120],
    tones: [523, 659, 784, 1047],
  },
};

/** Avisos del salto: el rugido de un gigante al subir y el chapoteo al caer. */
export type FeedbackCue = "splash" | "roar";

export const CUES: Readonly<
  Record<FeedbackCue, Pick<PhaseFeedback, "vibrate" | "tones">>
> = {
  splash: { vibrate: [40, 30, 80], tones: [180, 120, 90] },
  roar: { vibrate: [], tones: [98, 82, 65] },
};

const TONE_SECONDS = 0.12;
const TONE_GAIN = 0.08;
const SILENT_GAIN = 0.0001;

/** Toca una secuencia corta de notas con un oscilador. */
export function playTones(context: AudioContext, tones: readonly number[]): void {
  tones.forEach((frequency, index) => {
    const start = context.currentTime + index * TONE_SECONDS;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(TONE_GAIN, start);
    gain.gain.exponentialRampToValueAtTime(SILENT_GAIN, start + TONE_SECONDS);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + TONE_SECONDS);
  });
}
