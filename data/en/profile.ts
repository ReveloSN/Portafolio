import type { Profile } from "@/types/profile";

/** Versión en inglés de PROFILE: mismos datos, solo cambia el texto. */
export const PROFILE_EN: Profile = {
  firstName: "Santiago Nicolas",
  lastName: "Revelo Saavedra",
  initials: "SR",
  role: "Software Engineering Student · Full Stack",
  tagline:
    "I build software and explore how to apply artificial intelligence to everyday problems.",
  year: 2026,
  cvUrl: "/cv.pdf",
  photo: {
    src: "/images/foto.webp",
    width: 866,
    height: 1082,
    alt: "Portrait seated on a pouf in front of a wooden wall, wearing a terracotta T-shirt and a crossbody bag.",
    focus: "50% 0%",
  },
  aboutParagraphs: [
    "I am a fifth-semester Software Engineering student at Universidad Cooperativa de Colombia. I focus on backend development and I am interested in integrating artificial intelligence and cloud services into useful applications.",
    "I am part of a student research group and contribute to PMEC, a platform for monitoring chronic diseases in Nariño. This experience connects my studies with my interest in technology applied to healthcare.",
    "I am also interested in cybersecurity and information protection. In my projects I explore different platforms, from mobile and desktop applications to video games.",
  ],
  softSkills: [
    "Technical communication and presenting ideas",
    "Teamwork and collaboration on research projects",
    "Problem solving and analytical thinking",
    "Self-directed learning and adapting to new technologies",
  ],
  funFact: {
    title: "Fun fact",
    text: "I enjoy swimming. Swimming taught me consistency and to focus one step at a time, something I also bring to my projects.",
  },
  backMeta: {
    motto: "Explore, learn and build.",
  },
  quickFacts: [
    { icon: "pin", text: "Pasto, Nariño, Colombia" },
    { icon: "cap", text: "Software Engineering · 5th semester" },
    { icon: "university", text: "Universidad Cooperativa de Colombia" },
    { icon: "code", text: "Full Stack profile" },
    { icon: "network", text: "Interested in neural networks and AI" },
    { icon: "cloud", text: "Cloud computing" },
  ],
  technologies: [
    { name: "FastAPI", icon: "fastapi", color: "#05a594" },
    { name: "Spring Boot", icon: "spring", color: "#6db33f" },
    {
      name: "NestJS",
      icon: "nestjs",
      color: "#ff5e6c",
      palette: { deep: "#4a0812", mid: "#a8182c" },
    },
    { name: "Next.js", icon: "nextjs", color: "#a9b6bf" },
    { name: "React Native", icon: "react", color: "#61dafb" },
    { name: "Tailwind CSS", icon: "tailwind", color: "#06b6d4" },
    { name: "Godot", icon: "godot", color: "#478cbf" },
    { name: "AWS", icon: "aws", color: "#ff9900" },
  ],
  socials: [
    { kind: "github", label: "GitHub", href: "https://github.com/ReveloSN" },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/santiago-nicol%C3%A1s-revelo-54b045262",
    },
    { kind: "mail", label: "Email", href: "mailto:revelo.sns@gmail.com" },
  ],
};
