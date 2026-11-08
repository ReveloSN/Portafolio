import type { Profile } from "@/types/profile";

export const PROFILE: Profile = {
  firstName: "Santiago Nicolas",
  lastName: "Revelo Saavedra",
  initials: "SR",
  role: "Estudiante de Ingeniería de Software · Full Stack",
  tagline:
    "Desarrollo software y exploro cómo aplicar la inteligencia artificial a problemas cotidianos.",
  year: 2026,
  cvUrl: "/cv.pdf",
  photo: {
    src: "/images/foto.webp",
    width: 866,
    height: 1082,
    alt: "Retrato sentado en un puf frente a una pared de madera, con camiseta terracota y un bolso cruzado.",
    focus: "50% 0%",
  },
  aboutParagraphs: [
    "Soy estudiante de quinto semestre de Ingeniería de Software en la Universidad Cooperativa de Colombia. Me enfoco en el desarrollo backend y me interesa integrar inteligencia artificial y servicios en la nube en aplicaciones útiles.",
    "Participo en un semillero de investigación y colaboro en PMEC, una plataforma para el monitoreo de enfermedades crónicas en Nariño. Esta experiencia conecta mi formación con mi interés por la tecnología aplicada a la salud.",
    "También me interesa la ciberseguridad y la protección de la información. En mis proyectos exploro distintas plataformas, desde aplicaciones móviles y de escritorio hasta videojuegos.",
  ],
  softSkills: [
    "Comunicación técnica y presentación de ideas",
    "Trabajo en equipo y colaboración en proyectos de investigación",
    "Resolución de problemas y pensamiento analítico",
    "Aprendizaje autónomo y adaptación a nuevas tecnologías",
  ],
  funFact: {
    title: "Dato curioso",
    text: "Me gusta la natación. Nadar me enseñó constancia y a concentrarme paso a paso, algo que llevo también a mis proyectos.",
  },
  backMeta: {
    motto: "Explorar, aprender y construir.",
  },
  quickFacts: [
    { icon: "pin", text: "Pasto, Nariño, Colombia" },
    { icon: "cap", text: "Ingeniería de Software · 5.º semestre" },
    { icon: "university", text: "Universidad Cooperativa de Colombia" },
    { icon: "code", text: "Perfil Full Stack" },
    { icon: "network", text: "Interés en redes neuronales e IA" },
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
  ],
  socials: [
    { kind: "github", label: "GitHub", href: "https://github.com/ReveloSN" },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/santiago-nicol%C3%A1s-revelo-54b045262",
    },
    { kind: "mail", label: "Correo", href: "mailto:revelo.sns@gmail.com" },
  ],
};
