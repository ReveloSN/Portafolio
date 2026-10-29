import type { Profile } from "@/types/profile";

export const PROFILE: Profile = {
  firstName: "[TU NOMBRE]",
  lastName: "[TU APELLIDO]",
  initials: "TN",
  role: "Ingeniero de Software",
  tagline: "[Tu frase corta: qué haces y qué te mueve a construir.]",
  year: 2026,
  cvUrl: "/cv.pdf",
  aboutText:
    "[Escribe aquí entre 3 y 5 líneas, en primera persona: quién eres, qué estudias, qué te apasiona y qué sabes hacer. Que se pueda leer en 20 segundos y sin errores de ortografía.]",
  funFact: {
    title: "Dato curioso",
    text: "[Escribe aquí un dato curioso sobre ti en 1 o 2 frases.]",
  },
  backMeta: {
    motto: "[Tu lema de expedición]",
  },
  quickFacts: [
    { icon: "pin", text: "[Ciudad, País]" },
    { icon: "cap", text: "[Semestre] · [Universidad]" },
    { icon: "heart", text: "[Tus intereses]" },
  ],
  technologies: [
    { name: "React Native", icon: "react", color: "#61dafb" },
    { name: "Kotlin", icon: "kotlin", color: "#7f52ff" },
    { name: "Python", icon: "python", color: "#4b8bd4" },
    { name: "Godot", icon: "godot", color: "#478cbf" },
    { name: "Tailwind CSS", icon: "tailwind", color: "#06b6d4" },
    { name: "Next.js", icon: "nextjs", color: "#9aa7b0" },
    { name: "TypeScript", icon: "typescript", color: "#3178c6" },
  ],
  socials: [
    { kind: "github", label: "GitHub", href: "https://github.com/tu-usuario" },
    { kind: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/tu-usuario" },
    { kind: "instagram", label: "Instagram", href: "https://instagram.com/tu-usuario" },
    { kind: "mail", label: "Correo", href: "mailto:tu@correo.com" },
  ],
};
