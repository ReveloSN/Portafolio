import type { CSSProperties } from "react";

interface StaggerTextProps {
  readonly text: string;
  readonly className?: string;
  /** Posición de la primera frase dentro del grupo (para continuar el escalonado). */
  readonly startIndex?: number;
}

/** Corta después de punto, signo de cierre o puntos suspensivos (deja el corchete pegado). */
const SENTENCE_BREAK = /(?<=[.!?…]\]?)\s+/;

/** Párrafo que aparece frase por frase dentro de un `RevealGroup`. */
export function StaggerText({ text, className, startIndex = 0 }: StaggerTextProps) {
  const phrases = text.split(SENTENCE_BREAK).filter(Boolean);
  return (
    <p className={className}>
      {phrases.map((phrase, i) => (
        <span
          key={`${i}-${phrase.slice(0, 12)}`}
          className="stagger-item inline"
          style={{ "--i": startIndex + i } as CSSProperties}
        >
          {phrase}
          {i < phrases.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
