import type { ArtAsset, SeamConfig, SeamId } from "@/types/seam";

const band = (name: string): ArtAsset => ({
  src: `/art/dividers/${name}.webp`,
  width: 3072,
  height: 512,
});

const foliage = (name: string): ArtAsset => ({
  src: `/art/foliage/${name}.png`,
  width: 1024,
  height: 1536,
});

/** Un solo lugar para añadir o quitar divisores y elementos que cruzan las costuras. */
export const SEAMS: Readonly<Record<SeamId, SeamConfig>> = {
  "hero-about": {
    divider: {
      art: band("canopy"),
      anchor: "top",
      zIndex: 1,
      parallaxSpeed: 0.4,
      eager: true,
    },
    accents: [
      {
        id: "hero-monstera",
        art: foliage("monstera-left"),
        host: "upper",
        side: "left",
        widthU: 15,
        outside: 0.25,
        cross: -0.35,
        rotate: 8,
        parallaxSpeed: 0.2,
        large: true,
      },
      {
        id: "about-vine",
        art: foliage("vine-straight"),
        host: "lower",
        side: "right",
        widthU: 9,
        outside: 0,
        cross: 0.3,
        rotate: 0,
        parallaxSpeed: 0.3,
        sway: { duration: 7, delay: 0 },
      },
    ],
  },
  "about-projects": {
    divider: {
      art: band("ferns"),
      anchor: "bottom",
      zIndex: 1,
      parallaxSpeed: -0.4,
    },
    accents: [
      {
        id: "projects-monstera",
        art: foliage("monstera-right"),
        host: "lower",
        side: "right",
        widthU: 14,
        outside: 0.3,
        cross: 0.45,
        rotate: -6,
        parallaxSpeed: -0.25,
        large: true,
      },
    ],
  },
  "projects-testimonials": {
    mist: true,
    accents: [
      {
        id: "testimonials-vine",
        art: foliage("vine-curl"),
        host: "lower",
        side: "left",
        widthU: 9,
        outside: 0,
        cross: 0.3,
        rotate: 0,
        parallaxSpeed: 0.3,
        sway: { duration: 8.5, delay: -2 },
      },
    ],
  },
  "contact-skills": {
    divider: {
      art: band("roots"),
      anchor: "top",
      zIndex: 1,
      parallaxSpeed: 0.3,
      // Las raíces cuelgan desde la línea de tierra del sitio de excavación
      offset: "var(--dig-soil-line)",
    },
    accents: [],
  },
  "skills-footer": {
    divider: {
      art: band("treeline"),
      anchor: "bottom",
      zIndex: 1,
      parallaxSpeed: -0.3,
    },
    accents: [],
  },
};
