import type { TechRepo, TechUsageMap } from "@/types/techUsage";

const GITHUB = "https://github.com/ReveloSN";
const repo = (name: string): TechRepo => ({ name, url: `${GITHUB}/${name}` });

/**
 * Dónde usé cada tecnología del perfil (clave: `icon` de `profile.technologies`).
 * Fuente: archivos de dependencias de los repositorios públicos de GitHub
 * (package.json, pom.xml, build.gradle, requirements.txt, pyproject.toml), revisados
 * el 8 de noviembre de 2026. Los repositorios que forman parte de un proyecto del
 * portafolio (NeuroLive, ARGUS, Verificador de Salida) se muestran como ese proyecto.
 */
export const TECH_USAGE: TechUsageMap = {
  fastapi: { projects: ["aurora", "volcan"], repos: [] },
  spring: {
    projects: ["aurora"],
    repos: [
      repo("Fundhap"),
      repo("APIrest"),
      repo("monitoreo-de-microservicios-bakend"),
      repo("bakend_hotel-"),
      repo("patron_state"),
    ],
  },
  nestjs: { projects: [], repos: [repo("book_nest.js")] },
  nextjs: { projects: ["aurora"], repos: [repo("strategica_1"), repo("Portafolio")] },
  react: { projects: ["oceano"], repos: [] },
  tailwind: {
    projects: ["aurora"],
    repos: [
      repo("Portafolio"),
      repo("mokapPEMEC"),
      repo("craigslist-redesign"),
      repo("video"),
      repo("taller_evaluativo1"),
    ],
  },
  godot: { projects: ["selva"], repos: [] },
};
