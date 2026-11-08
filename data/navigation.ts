import type { NavLink } from "@/types/navigation";

export const SECTION_IDS = {
  home: "inicio",
  about: "sobre-mi",
  projects: "proyectos",
  testimonials: "testimonios",
  experience: "experiencia",
  hobbies: "hobbies",
  contact: "contacto",
} as const;

/** Página completa de hobbies; la portada solo la enlaza. */
export const HOBBIES_PATH = "/hobbies";

/** Id del contenido principal: destino del enlace "Saltar al contenido". */
export const MAIN_CONTENT_ID = "contenido";

export const NAV_LINKS: readonly NavLink[] = [
  { id: SECTION_IDS.home, label: "Inicio" },
  { id: SECTION_IDS.about, label: "Sobre mí" },
  { id: SECTION_IDS.projects, label: "Proyectos" },
  { id: SECTION_IDS.testimonials, label: "Testimonios" },
  { id: SECTION_IDS.experience, label: "Experiencia" },
  { id: SECTION_IDS.hobbies, label: "Hobbies" },
  { id: SECTION_IDS.contact, label: "Contacto" },
];

/** El pie enlaza todas las secciones de la navegación. */
export const FOOTER_LINKS: readonly NavLink[] = NAV_LINKS;
