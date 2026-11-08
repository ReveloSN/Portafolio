import type { Hobby } from "@/types/hobby";

/** Presentación personal que abre la página de hobbies (texto de la persona). */
export const HOBBIES_INTRO =
  "Más allá de mi formación académica y profesional, soy una persona curiosa, empática y apasionada por descubrir nuevas experiencias, conectar con las personas y disfrutar de las pequeñas cosas de la vida.";

/** Cierre de la página: lo que la persona valora. */
export const HOBBIES_VALUES =
  "Valoro la empatía, la autenticidad, el aprendizaje constante y la oportunidad de aportar positivamente a mi entorno.";

/**
 * Hobbies del portafolio, con las palabras de la persona. Para agregar uno, añade una
 * entrada aquí; el componente no cambia.
 */
export const HOBBIES: readonly Hobby[] = [
  {
    id: "naturaleza",
    name: "Naturaleza y animales",
    description:
      "Tengo un cariño especial por la naturaleza y los animales. He participado en jornadas de adopción, actividades de reforestación y en un conteo de especies en la Laguna de La Cocha, en Nariño. Estas experiencias han fortalecido mi interés por el cuidado del medioambiente y el respeto por los seres vivos.",
    glyph: "leaf",
    featured: true,
  },
  {
    id: "musica",
    name: "Música",
    description:
      "Disfruto escuchar diferentes géneros y tengo conocimientos en la interpretación de algunos instrumentos de percusión y viento.",
    glyph: "note",
  },
  {
    id: "natacion",
    name: "Natación",
    description:
      "Durante un tiempo practiqué natación y hoy la disfruto como pasatiempo. Me enseñó constancia y a concentrarme paso a paso.",
    glyph: "wave",
  },
  {
    id: "tiempo-libre",
    name: "Películas, series y tiempo compartido",
    description:
      "En mis momentos libres me encanta ver películas y series de distintos géneros, compartir tiempo con mis amigos y mi familia, y crear recuerdos a través de nuevas experiencias.",
    glyph: "film",
    wide: true,
  },
];
