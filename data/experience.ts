import type { ExperienceEntry } from "@/types/experience";

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: "formacion-ucc",
    kind: "academic",
    // Año de referencia de la formación actual, no fecha de ingreso.
    startYear: 2026,
    endYear: null,
    periodLabel: "Actualidad · 5.º semestre",
    title: "Estudiante de Ingeniería de Software",
    organization: "Universidad Cooperativa de Colombia",
    achievements: [
      "Curso quinto semestre de Ingeniería de Software.",
      "Complemento mi formación con el desarrollo de proyectos de software y la participación en un semillero de investigación.",
    ],
  },
  {
    id: "ponencia-pmec",
    kind: "academic",
    startYear: 2026,
    endYear: 2026,
    periodLabel: "9 de septiembre de 2026",
    title: "Ponente del proyecto PMEC",
    organization: "Encuentro de semilleros · Montería, Colombia",
    achievements: [
      "Participé como ponente con el proyecto PMEC en un encuentro de semilleros de investigación en Montería.",
      "Presenté el proyecto de monitoreo de enfermedades crónicas en Nariño, vinculando mi formación en software con la investigación aplicada a la salud.",
    ],
  },
  {
    id: "software-heladeria",
    kind: "work",
    startYear: 2026,
    endYear: 2026,
    periodLabel: "Julio de 2026",
    title: "Desarrollo de software para una heladería",
    organization: "Proyecto para un negocio local",
    achievements: [
      "Desarrollé un software para gestionar el inventario y los pedidos de una heladería.",
    ],
  },
  {
    id: "sitios-estrateguica",
    kind: "work",
    startYear: 2026,
    endYear: 2026,
    periodLabel: "15 de mayo de 2026",
    title: "Desarrollo de dos sitios web",
    organization: "Estrateguica",
    achievements: ["Desarrollé dos sitios web para la empresa Estrateguica."],
  },
];
