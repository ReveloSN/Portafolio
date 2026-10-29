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
    { name: "React Native", glyph: "RN" },
    { name: "Kotlin", glyph: "Kt" },
    { name: "Python", glyph: "Py" },
    { name: "Godot", glyph: "Gd" },
    { name: "Tailwind CSS", glyph: "Tw" },
    { name: "Next.js", glyph: "Nx" },
    { name: "TypeScript", glyph: "TS" },
  ],
  socials: [
    { kind: "github", label: "GitHub", href: "https://github.com/tu-usuario" },
    { kind: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/tu-usuario" },
    { kind: "instagram", label: "Instagram", href: "https://instagram.com/tu-usuario" },
    { kind: "mail", label: "Correo", href: "mailto:tu@correo.com" },
  ],
};
