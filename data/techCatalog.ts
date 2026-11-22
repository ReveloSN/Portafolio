import type { Technology } from "@/types/profile";

/** Logo y color de una tecnología (lo que pinta su huella), sin el nombre visible. */
export type TechVisual = Omit<Technology, "name">;

/**
 * Huella de cada tecnología que aparece en los proyectos, por su nombre tal como se
 * escribe en `data/projects.ts`. Colores de marca de Simple Icons; los logos casi negros
 * usan un tono claro para que la cavidad no se pierda (como Next.js en Sobre mí).
 * Agregar una tecnología a un proyecto = agregarla aquí (lo exige lib/techCatalog.test.ts).
 */
export const TECH_CATALOG: Readonly<Record<string, TechVisual>> = {
  // Backend y datos
  "Spring Boot": { icon: "spring", color: "#6db33f" },
  FastAPI: { icon: "fastapi", color: "#05a594" },
  Python: { icon: "python", color: "#3776ab" },
  "Node.js": { icon: "nodejs", color: "#5fa04e" },
  PostgreSQL: { icon: "postgresql", color: "#4169e1" },
  SQLite: { icon: "sqlite", color: "#4f9fd1" },
  Supabase: { icon: "supabase", color: "#3fcf8e" },
  spaCy: { icon: "spacy", color: "#09a3d5" },
  Gemini: { icon: "gemini", color: "#8e75b2" },
  // Web y escritorio
  "Next.js": { icon: "nextjs", color: "#a9b6bf" },
  React: { icon: "react", color: "#61dafb" },
  TypeScript: { icon: "typescript", color: "#3178c6" },
  Tauri: { icon: "tauri", color: "#24c8d8" },
  // Móvil y reloj
  "React Native": { icon: "react", color: "#61dafb" },
  Expo: { icon: "expo", color: "#b8c0cc" },
  Kotlin: { icon: "kotlin", color: "#7f52ff" },
  "Wear OS": { icon: "wearos", color: "#4285f4" },
  "Jetpack Compose": { icon: "compose", color: "#4285f4" },
  // Room es la base de datos de Android Jetpack: lleva el logo de Android.
  Room: { icon: "android", color: "#3ddc84" },
  OpenStreetMap: { icon: "openstreetmap", color: "#7ebc6f" },
  // Videojuego
  "Godot 4": { icon: "godot", color: "#478cbf" },
  GDScript: { icon: "godot", color: "#478cbf" },
  Aseprite: { icon: "aseprite", color: "#7d929e" },
  // Hardware, nube y herramientas
  ESP32: { icon: "espressif", color: "#e7352c" },
  AWS: { icon: "aws", color: "#ff9900" },
  Docker: { icon: "docker", color: "#2496ed" },
  Locust: { icon: "locust", color: "#b8ee4b" },
  "GitHub Actions": { icon: "githubactions", color: "#2088ff" },
};
