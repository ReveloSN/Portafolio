/** Corta después de punto, signo de cierre o puntos suspensivos (deja el corchete pegado). */
const SENTENCE_BREAK = /(?<=[.!?…]\]?)\s+/;

/** Frases de un párrafo, en orden, para la entrada escalonada. */
export function splitSentences(text: string): readonly string[] {
  return text.split(SENTENCE_BREAK).filter(Boolean);
}

/** Índice de la primera frase de cada párrafo, continuando la cuenta entre párrafos. */
export function paragraphStarts(
  paragraphs: readonly string[],
  startIndex = 0,
): readonly number[] {
  let next = startIndex;
  return paragraphs.map((paragraph) => {
    const start = next;
    next += splitSentences(paragraph).length;
    return start;
  });
}

/** Total de frases de varios párrafos. */
export function countSentences(paragraphs: readonly string[]): number {
  return paragraphs.reduce(
    (total, paragraph) => total + splitSentences(paragraph).length,
    0,
  );
}
