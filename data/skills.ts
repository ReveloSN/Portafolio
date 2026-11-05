import type { Skill } from "@/types/skill";

/**
 * Hallazgos del sitio de excavación. `usedIn` son slugs de proyectos de `projects.ts`:
 * el nombre que se muestra sale de allí, así un proyecto renombrado no se desincroniza.
 */
export const SKILLS: readonly Skill[] = [
  {
    id: "react-native",
    name: "React Native",
    area: "APPS MÓVILES",
    grid: "A1",
    depth: "−0.4 m",
    fossil: "ammonite",
    icon: "react",
    usedIn: ["oceano"],
  },
  {
    id: "kotlin",
    name: "Kotlin",
    area: "ANDROID",
    grid: "A2",
    depth: "−0.8 m",
    fossil: "bone",
    icon: "kotlin",
    usedIn: ["cueva"],
  },
  {
    id: "python",
    name: "Python",
    area: "DATOS Y SCRIPTS",
    grid: "A3",
    depth: "−1.2 m",
    fossil: "fern",
    icon: "python",
    usedIn: ["volcan", "selva"],
  },
  {
    id: "godot",
    name: "Godot",
    area: "VIDEOJUEGOS",
    grid: "B1",
    depth: "−1.6 m",
    fossil: "trilobite",
    icon: "godot",
    usedIn: ["selva"],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    area: "APIS Y MOTORES",
    grid: "B2",
    depth: "−2.0 m",
    fossil: "shell",
    icon: "fastapi",
    usedIn: ["volcan"],
  },
  {
    id: "react-typescript",
    name: "React + TypeScript",
    area: "ESCRITORIO Y WEB",
    grid: "B3",
    depth: "−2.4 m",
    fossil: "nautilus",
    icon: "react",
    usedIn: ["volcan", "oceano"],
  },
];
