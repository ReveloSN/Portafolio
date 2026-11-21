import type { Hobby } from "@/types/hobby";

/** Versión en inglés de HOBBIES_INTRO, con las palabras de la persona. */
export const HOBBIES_INTRO_EN =
  "Beyond my academic and professional background, I am a curious, empathetic person who is passionate about discovering new experiences, connecting with people and enjoying the little things in life.";

/** Versión en inglés de HOBBIES_VALUES: lo que la persona valora. */
export const HOBBIES_VALUES_EN =
  "I value empathy, authenticity, constant learning and the chance to make a positive contribution to the people and places around me.";

/** Versión en inglés de HOBBIES: mismos hobbies y orden, solo cambia el texto. */
export const HOBBIES_EN: readonly Hobby[] = [
  {
    id: "naturaleza",
    name: "Nature and animals",
    description:
      "I have a special fondness for nature and animals. I have taken part in adoption drives, reforestation activities and a species count at Laguna de La Cocha, in Nariño. These experiences have deepened my interest in caring for the environment and respecting all living beings.",
    glyph: "leaf",
    featured: true,
  },
  {
    id: "musica",
    name: "Music",
    description:
      "I enjoy listening to different genres, and I can play some percussion and wind instruments.",
    glyph: "note",
  },
  {
    id: "natacion",
    name: "Swimming",
    description:
      "I swam for a while, and today I enjoy it as a hobby. It taught me consistency and to focus one step at a time.",
    glyph: "wave",
  },
  {
    id: "tiempo-libre",
    name: "Movies, series and time together",
    description:
      "In my free time I love watching movies and series of all kinds, spending time with my friends and family, and making memories through new experiences.",
    glyph: "film",
    wide: true,
  },
];
