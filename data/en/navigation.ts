import { SECTION_IDS } from "@/data/navigation";
import type { NavLink } from "@/types/navigation";

/** Versión en inglés de NAV_LINKS: mismas secciones (y mismos ids), otro rótulo. */
export const NAV_LINKS_EN: readonly NavLink[] = [
  { id: SECTION_IDS.home, label: "Home" },
  { id: SECTION_IDS.about, label: "About me" },
  { id: SECTION_IDS.projects, label: "Projects" },
  { id: SECTION_IDS.testimonials, label: "Testimonials" },
  { id: SECTION_IDS.experience, label: "Experience" },
  { id: SECTION_IDS.hobbies, label: "Hobbies" },
  { id: SECTION_IDS.contact, label: "Contact" },
];
