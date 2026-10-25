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
  quickFacts: [
    { icon: "pin", text: "[Ciudad, País]" },
    { icon: "cap", text: "[Semestre] · [Universidad]" },
    { icon: "heart", text: "[Tus intereses]" },
  ],
  technologies: [
    "React Native",
    "Kotlin",
    "Python",
    "Godot",
    "Tailwind CSS",
    "Next.js",
    "TypeScript",
  ],
  socials: [
    { kind: "github", label: "GitHub", href: "https://github.com/tu-usuario" },
    { kind: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/tu-usuario" },
    { kind: "instagram", label: "Instagram", href: "https://instagram.com/tu-usuario" },
    { kind: "mail", label: "Correo", href: "mailto:tu@correo.com" },
  ],
};
