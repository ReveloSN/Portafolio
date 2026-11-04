import type { NavLink } from "@/types/navigation";

export const SECTION_IDS = {
  home: "inicio",
  about: "sobre-mi",
  projects: "proyectos",
  testimonials: "testimonios",
  skills: "habilidades",
  contact: "contacto",
} as const;

/** Id del contenido principal: destino del enlace "Saltar al contenido". */
export const MAIN_CONTENT_ID = "contenido";

export const NAV_LINKS: readonly NavLink[] = [
  { id: SECTION_IDS.home, label: "Inicio" },
  { id: SECTION_IDS.about, label: "Sobre mí" },
  { id: SECTION_IDS.projects, label: "Proyectos" },
  { id: SECTION_IDS.testimonials, label: "Testimonios" },
  { id: SECTION_IDS.skills, label: "Habilidades" },
  { id: SECTION_IDS.contact, label: "Contacto" },
];

/** El pie enlaza todo menos la sección adicional (habilidades). */
export const FOOTER_LINKS: readonly NavLink[] = NAV_LINKS.filter(
  (link) => link.id !== SECTION_IDS.skills,
);
