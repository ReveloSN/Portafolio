import type { Testimonial } from "@/types/testimonial";

const PLACEHOLDER_QUOTE =
  "“[Escribe aquí el testimonio: qué hiciste con esta persona y cómo fue trabajar contigo.]”";

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "t1",
    quote: PLACEHOLDER_QUOTE,
    author: "[Nombre 1]",
    relation: "[Profesor / Profesora]",
    rating: 5,
    tapeColor: "rgba(166,255,92,.55)",
    avatarBackground: "#bcd8a6",
    avatarFigure: "#4f7a5a",
  },
  {
    id: "t2",
    quote: PLACEHOLDER_QUOTE,
    author: "[Nombre 2]",
    relation: "[Compañero / Compañera]",
    rating: 5,
    tapeColor: "rgba(110,240,224,.55)",
    avatarBackground: "#b6e0dc",
    avatarFigure: "#3f7b78",
  },
  {
    id: "t3",
    quote: PLACEHOLDER_QUOTE,
    author: "[Nombre 3]",
    relation: "[Cliente / Jefe]",
    rating: 5,
    tapeColor: "rgba(255,196,110,.6)",
    avatarBackground: "#f0d3a0",
    avatarFigure: "#9a6b2c",
  },
];
