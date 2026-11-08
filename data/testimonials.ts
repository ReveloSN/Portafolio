import type { Testimonial } from "@/types/testimonial";

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "t1",
    quote:
      "“Nicolás demostró responsabilidad, compromiso y puntualidad durante el desarrollo de nuestro sitio web. Se destacó por su capacidad para comunicar ideas, proponer soluciones y mantenernos informados constantemente sobre los avances y cambios del proyecto. Su trabajo fue organizado y eficiente, cumpliendo con los tiempos establecidos y entregando la página web de acuerdo con nuestras expectativas”.",
    author: "Sara Johana Vergara",
    photo: {
      src: "/images/testimonials/sara-johana-vergara.webp",
      alt: "Sara Johana Vergara",
      width: 640,
      height: 640,
      focus: "35% 25%",
    },
    relation: "Estrateguica · Cliente de desarrollo web",
    rating: 4,
    tapeColor: "rgba(166,255,92,.55)",
    avatarBackground: "#bcd8a6",
    avatarFigure: "#4f7a5a",
  },
  {
    id: "t2",
    quote:
      "“Durante el desarrollo del sistema, Nicolás demostró una buena capacidad para comunicar sus ideas, comprender las necesidades de nuestro negocio y proponer soluciones prácticas. Aunque hubo un pequeño retraso en la entrega, el producto final funciona correctamente y cumple con nuestras necesidades. Además, valoramos su disposición para brindar soporte técnico cuando se presentan inconvenientes o fallas en la aplicación, buscando soluciones para garantizar su correcto funcionamiento”.",
    author: "María Zambrano",
    relation: "Cliente · Sistema de gestión para heladería",
    rating: 4,
    tapeColor: "rgba(110,240,224,.55)",
    avatarBackground: "#b6e0dc",
    avatarFigure: "#3f7b78",
  },
  {
    id: "t3",
    quote:
      "“Nicolás demostró disposición para trabajar de manera colaborativa, aportar ideas y buscar soluciones ante los desafíos del proyecto. Aunque en ocasiones se presentaron dificultades en la comunicación con el equipo, mostró interés por mejorar, aprender de sus errores y fortalecer sus habilidades. Se caracteriza por su iniciativa para preguntar y aclarar dudas cuando es necesario, su compromiso con el aprendizaje continuo y su capacidad para adaptarse a nuevas tecnologías y herramientas de inteligencia artificial”.",
    author: "Constructora Cadel",
    relation: "Equipo de desarrollo · Proyecto colaborativo",
    rating: 3,
    tapeColor: "rgba(255,196,110,.6)",
    avatarBackground: "#f0d3a0",
    avatarFigure: "#9a6b2c",
  },
];
