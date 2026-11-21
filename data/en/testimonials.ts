import type { Testimonial } from "@/types/testimonial";

/** Versión en inglés de TESTIMONIALS: traducción fiel de las citas, sin suavizarlas. */
export const TESTIMONIALS_EN: readonly Testimonial[] = [
  {
    id: "t1",
    quote:
      "“Nicolás showed responsibility, commitment and punctuality throughout the development of our website. He stood out for his ability to communicate ideas, propose solutions and keep us constantly informed about the project's progress and changes. His work was organized and efficient, meeting the agreed timelines and delivering the website in line with our expectations.”",
    author: "Sara Johana Vergara",
    photo: {
      src: "/images/testimonials/sara-johana-vergara.webp",
      alt: "Sara Johana Vergara",
      width: 640,
      height: 640,
      focus: "35% 25%",
    },
    relation: "Estrateguica · Web development client",
    rating: 4,
    tapeColor: "rgba(166,255,92,.55)",
    avatarBackground: "#bcd8a6",
    avatarFigure: "#4f7a5a",
  },
  {
    id: "t2",
    quote:
      "“During the development of the system, Nicolás showed a good ability to communicate his ideas, understand our business needs and propose practical solutions. Although there was a small delay in delivery, the final product works correctly and meets our needs. We also value his willingness to provide technical support when problems or failures come up in the application, looking for solutions to make sure it works properly.”",
    author: "María Zambrano",
    relation: "Client · Ice cream shop management system",
    rating: 4,
    tapeColor: "rgba(110,240,224,.55)",
    avatarBackground: "#b6e0dc",
    avatarFigure: "#3f7b78",
  },
  {
    id: "t3",
    quote:
      "“Nicolás showed willingness to work collaboratively, contribute ideas and look for solutions to the project's challenges. Although there were at times difficulties in communication with the team, he showed interest in improving, learning from his mistakes and strengthening his skills. He stands out for his initiative in asking questions and clearing up doubts when necessary, his commitment to continuous learning and his ability to adapt to new technologies and artificial intelligence tools.”",
    author: "Constructora Cadel",
    relation: "Development team · Collaborative project",
    rating: 3,
    tapeColor: "rgba(255,196,110,.6)",
    avatarBackground: "#f0d3a0",
    avatarFigure: "#9a6b2c",
  },
];
