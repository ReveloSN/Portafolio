import { ART } from "@/data/art";
import type { SeamConfig, SeamId } from "@/types/seam";

/** Un solo lugar para añadir o quitar divisores y elementos que cruzan las costuras. */
export const SEAMS: Readonly<Record<SeamId, SeamConfig>> = {
  "hero-about": {
    divider: {
      art: ART.canopy,
      anchor: "top",
      zIndex: 1,
      overlapU: 1.5,
      parallaxSpeed: 0.4,
      // Las hojas tapan el final del Hero: su borde superior no se desvanece
      fadeEdge: false,
      eager: true,
    },
    accents: [
      {
        id: "hero-leaf",
        art: ART.leafBigLeft,
        host: "upper",
        side: "left",
        edge: "bottom",
        widthU: 13,
        cross: 0,
        rotate: 0,
        parallaxSpeed: 0,
        zIndex: 1,
        large: true,
      },
      {
        id: "about-vine",
        art: ART.vineHanging1,
        host: "lower",
        side: "right",
        edge: "top",
        widthU: 12,
        cross: 0.12,
        rotate: 0,
        parallaxSpeed: 0.3,
        zIndex: 0,
        sway: { kind: "vine", duration: 7, delay: 0 },
      },
    ],
  },
  "about-projects": {
    divider: {
      art: ART.ferns,
      anchor: "bottom",
      zIndex: 1,
      overlapU: 1.5,
      parallaxSpeed: -0.4,
    },
    accents: [
      {
        id: "projects-leaf",
        art: ART.leafBigRight,
        host: "lower",
        side: "right",
        edge: "top",
        widthU: 13,
        cross: 0.4,
        rotate: 0,
        parallaxSpeed: -0.25,
        zIndex: 1,
        large: true,
      },
    ],
  },
  "projects-testimonials": {
    mist: true,
    accents: [
      {
        id: "testimonials-vine",
        art: ART.vineHanging2,
        host: "lower",
        side: "left",
        edge: "top",
        widthU: 12,
        cross: 0.08,
        rotate: 0,
        parallaxSpeed: 0.3,
        zIndex: 0,
        sway: { kind: "vine", duration: 8.5, delay: -2 },
      },
    ],
  },
  "testimonials-experience": {
    accents: [
      {
        id: "experience-tail",
        art: ART.dinoTail,
        host: "lower",
        side: "right",
        edge: "top",
        widthU: 42,
        cross: 0.55,
        rotate: 0,
        parallaxSpeed: 0.2,
        zIndex: 1,
        sway: { kind: "tail", duration: 5, delay: 0 },
        large: true,
        desktopOnly: true,
      },
    ],
  },
  "contact-skills": {
    divider: {
      art: ART.roots,
      anchor: "top",
      zIndex: 1,
      overlapU: 1.5,
      parallaxSpeed: 0.3,
      // Las raíces cuelgan desde la línea de tierra del sitio de excavación
      offset: "var(--dig-soil-line)",
    },
    accents: [],
  },
  "skills-footer": {
    divider: {
      art: ART.treeline,
      anchor: "bottom",
      zIndex: 1,
      overlapU: 1.5,
      parallaxSpeed: -0.3,
    },
    accents: [],
  },
};
