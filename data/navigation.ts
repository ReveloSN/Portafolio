import type { NavLink } from "@/types/navigation";

export const SECTION_IDS = {
  home: "inicio",
  about: "sobre-mi",
  projects: "proyectos",
  testimonials: "testimonios",
  experience: "experiencia",
  contact: "contacto",
  skills: "habilidades",
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { id: SECTION_IDS.home, label: "Inicio" },
  { id: SECTION_IDS.about, label: "Sobre mí" },
  { id: SECTION_IDS.projects, label: "Proyectos" },
  { id: SECTION_IDS.testimonials, label: "Testimonios" },
  { id: SECTION_IDS.experience, label: "Experiencia" },
  { id: SECTION_IDS.contact, label: "Contacto" },
  { id: SECTION_IDS.skills, label: "Habilidades" },
];

export const FOOTER_LINKS: readonly NavLink[] = NAV_LINKS.slice(0, 6);
