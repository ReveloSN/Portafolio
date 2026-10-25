import type { World } from "@/types/world";

export const WORLDS: readonly World[] = [
  {
    slug: "selva",
    number: "01",
    name: "SELVA",
    accent: "#a6ff5c",
    ink: "#07160f",
    background:
      "linear-gradient(180deg,#0d3b26 0,#0a2a1c 900px,#0c3322 1900px,#06120d 3200px,#04100a 100%)",
    depths: [
      { title: "Dosel", subtitle: "Donde empezó la idea" },
      { title: "Sotobosque", subtitle: "Donde me ensucié las manos" },
      { title: "Raíces", subtitle: "Lo que quedó funcionando" },
    ],
  },
  {
    slug: "oceano",
    number: "02",
    name: "OCÉANO",
    accent: "#6ef0e0",
    ink: "#02202f",
    background:
      "linear-gradient(180deg,#5fe3e8 0,#1593b5 420px,#0c5f86 780px,#0a4a73 1300px,#05243d 2200px,#020a14 3700px)",
    depths: [
      { title: "50 m", subtitle: "Zona de luz" },
      { title: "200 m", subtitle: "Arrecife" },
      { title: "1 000 m", subtitle: "Zona abisal" },
    ],
  },
  {
    slug: "cueva",
    number: "03",
    name: "CUEVA",
    accent: "#ffc46e",
    ink: "#2a1c08",
    background:
      "linear-gradient(180deg,#150a05 0,#2d1c10 900px,#3a2418 1900px,#24150b 3000px,#150a05 100%)",
    depths: [
      { title: "Entrada", subtitle: "Luz de antorcha" },
      { title: "Galería", subtitle: "Pinturas y fósiles" },
      { title: "Cámara", subtitle: "El corazón de la cueva" },
    ],
  },
];
