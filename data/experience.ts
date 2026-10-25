import type { ExperienceEntry } from "@/types/experience";

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: "e0",
    kind: "work",
    startYear: 2025,
    endYear: null,
    periodLabel: "[2025] – Hoy",
    title: "[Cargo o rol]",
    organization: "[Empresa o proyecto freelance]",
    description:
      "[Describe en 1 o 2 líneas qué lograste: una cifra, un sistema, un resultado.]",
  },
  {
    id: "e1",
    kind: "academic",
    startYear: 2023,
    endYear: null,
    periodLabel: "[2023] – Hoy",
    title: "[Programa / Título]",
    organization: "[Universidad o institución]",
    description:
      "[Describe en 1 o 2 líneas qué has aprendido o logrado: promedio, proyectos, reconocimientos.]",
  },
  {
    id: "e2",
    kind: "work",
    startYear: 2022,
    endYear: 2023,
    periodLabel: "[2022] – [2023]",
    title: "[Cargo o rol]",
    organization: "[Empresa o práctica]",
    description: "[Describe en 1 o 2 líneas qué lograste.]",
  },
  {
    id: "e3",
    kind: "academic",
    startYear: 2021,
    endYear: 2022,
    periodLabel: "[2021] – [2022]",
    title: "[Curso o certificación]",
    organization: "[Plataforma o institución]",
    description: "[Describe en 1 o 2 líneas qué aprendiste.]",
  },
];
