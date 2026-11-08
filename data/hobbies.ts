import type { Hobby } from "@/types/hobby";

/**
 * Hobbies del portafolio.
 * Natación es real (lo confirmó la persona). Las entradas con `example: true`
 * son marcadores para revisar el diseño: reemplázalas o bórralas antes de publicar.
 */
export const HOBBIES: readonly Hobby[] = [
  {
    id: "natacion",
    name: "Natación",
    description:
      "Nadar me enseñó constancia y a concentrarme paso a paso, algo que llevo también a mis proyectos.",
    glyph: "wave",
    featured: true,
  },
  {
    id: "lectura",
    name: "Lectura",
    description:
      "[Ejemplo] Libros de ciencia y tecnología que leo por gusto, y lo que me dejan.",
    glyph: "book",
    example: true,
  },
  {
    id: "senderismo",
    name: "Senderismo",
    description:
      "[Ejemplo] Caminatas por Nariño con amigos, y lo que aprendo de planear cada recorrido.",
    glyph: "trail",
    example: true,
  },
];
