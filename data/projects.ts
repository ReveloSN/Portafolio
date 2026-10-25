import type { Project } from "@/types/project";

const PLACEHOLDER_PROBLEM =
  "[Describe en 3 o 4 líneas qué problema real resuelve este proyecto y para quién. Por qué importaba.]";

const PLACEHOLDER_ROLE = [
  "[Qué diseñaste o decidiste tú]",
  "[Qué programaste: pantallas, lógica, datos]",
  "[Con quién trabajaste y cómo lo coordinaron]",
] as const;

const PLACEHOLDER_METRICS = [
  { value: "[00]", label: "[Métrica 1]" },
  { value: "[00%]", label: "[Métrica 2]" },
  { value: "[0 sem.]", label: "[Métrica 3]" },
] as const;

const PLACEHOLDER_FEATURES = [
  {
    title: "[Funcionalidad 1]",
    description: "[Una línea sobre qué hace y por qué es útil.]",
  },
  {
    title: "[Funcionalidad 2]",
    description: "[Una línea sobre qué hace y por qué es útil.]",
  },
  {
    title: "[Funcionalidad 3]",
    description: "[Una línea sobre qué hace y por qué es útil.]",
  },
] as const;

const PLACEHOLDER_SCREENSHOTS = ["[Captura 1]", "[Captura 2]", "[Captura 3]"] as const;

const PLACEHOLDER_SUMMARY =
  "[Describe en 2 líneas qué problema resuelve y qué hiciste tú.]";
const PLACEHOLDER_TAGLINE = "[Una frase que resuma qué es el proyecto y para quién es.]";

export const PROJECTS: readonly Project[] = [
  {
    id: "proyecto-1",
    slug: "selva",
    name: "[Nombre del proyecto 1]",
    summary: PLACEHOLDER_SUMMARY,
    tagline: PLACEHOLDER_TAGLINE,
    technologies: ["React Native", "TypeScript", "[Tecnología]"],
    repoUrl: "https://github.com/tu-usuario/proyecto-1",
    demoUrl: "https://proyecto-1.vercel.app",
    problem: PLACEHOLDER_PROBLEM,
    roleItems: PLACEHOLDER_ROLE,
    metrics: PLACEHOLDER_METRICS,
    features: PLACEHOLDER_FEATURES,
    screenshots: PLACEHOLDER_SCREENSHOTS,
  },
  {
    id: "proyecto-2",
    slug: "oceano",
    name: "[Nombre del proyecto 2]",
    summary: PLACEHOLDER_SUMMARY,
    tagline: PLACEHOLDER_TAGLINE,
    technologies: ["Kotlin", "Python", "[Tecnología]"],
    repoUrl: "https://github.com/tu-usuario/proyecto-2",
    demoUrl: "https://proyecto-2.vercel.app",
    problem: PLACEHOLDER_PROBLEM,
    roleItems: PLACEHOLDER_ROLE,
    metrics: PLACEHOLDER_METRICS,
    features: PLACEHOLDER_FEATURES,
    screenshots: PLACEHOLDER_SCREENSHOTS,
  },
  {
    id: "proyecto-3",
    slug: "cueva",
    name: "[Nombre del proyecto 3]",
    summary: PLACEHOLDER_SUMMARY,
    tagline: PLACEHOLDER_TAGLINE,
    technologies: ["Godot", "Tailwind", "[Tecnología]"],
    repoUrl: "https://github.com/tu-usuario/proyecto-3",
    demoUrl: "https://proyecto-3.vercel.app",
    problem: PLACEHOLDER_PROBLEM,
    roleItems: PLACEHOLDER_ROLE,
    metrics: PLACEHOLDER_METRICS,
    features: PLACEHOLDER_FEATURES,
    screenshots: PLACEHOLDER_SCREENSHOTS,
  },
];
