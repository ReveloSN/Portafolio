import type { World } from "@/types/world";

/** Versión en inglés de WORLDS: misma paleta y profundidades, solo cambia el texto. */
export const WORLDS_EN: readonly World[] = [
  {
    slug: "aurora",
    number: "05",
    name: "AURORA",
    accent: "#a9f4e0",
    ink: "#061a28",
    background:
      "linear-gradient(180deg,#061a28 0,#123044 900px,#103a40 1900px,#061a28 100%)",
    depths: [
      { title: "Horizon", subtitle: "The need that connects the project" },
      { title: "Lights", subtitle: "Data, devices and artificial intelligence" },
      { title: "Shelter", subtitle: "Technology that supports people" },
    ],
  },
  {
    slug: "selva",
    number: "01",
    name: "JUNGLE",
    accent: "#a6ff5c",
    ink: "#07160f",
    background:
      "linear-gradient(180deg,#0d3b26 0,#0a2a1c 900px,#0c3322 1900px,#06120d 3200px,#04100a 100%)",
    depths: [
      { title: "Canopy", subtitle: "Where the idea began" },
      { title: "Understory", subtitle: "How the project took shape" },
      { title: "Roots", subtitle: "What ended up working" },
    ],
  },
  {
    slug: "oceano",
    number: "02",
    name: "OCEAN",
    accent: "#6ef0e0",
    ink: "#02202f",
    background:
      "linear-gradient(180deg,#5fe3e8 0,#1593b5 420px,#0c5f86 780px,#0a4a73 1300px,#05243d 2200px,#020a14 3700px)",
    depths: [
      { title: "50 m", subtitle: "Sunlight zone" },
      { title: "200 m", subtitle: "Reef" },
      { title: "1,000 m", subtitle: "Abyssal zone" },
    ],
  },
  {
    slug: "cueva",
    number: "03",
    name: "CAVE",
    accent: "#ffc46e",
    ink: "#2a1c08",
    background:
      "linear-gradient(180deg,#150a05 0,#2d1c10 900px,#3a2418 1900px,#24150b 3000px,#150a05 100%)",
    depths: [
      { title: "Entrance", subtitle: "Torchlight" },
      { title: "Gallery", subtitle: "Paintings and fossils" },
      { title: "Chamber", subtitle: "The heart of the cave" },
    ],
  },
  {
    slug: "volcan",
    number: "04",
    name: "VOLCANO",
    accent: "#ff9a5c",
    ink: "#2a0d05",
    background:
      "linear-gradient(180deg,#120504 0,#2e0f08 900px,#3a140a 1900px,#220905 3000px,#120504 100%)",
    depths: [
      { title: "Slope", subtitle: "Where the climb begins" },
      { title: "Crater", subtitle: "Where everything boils" },
      { title: "Magma", subtitle: "What came out of the fire" },
    ],
  },
  {
    slug: "cumbre",
    number: "06",
    name: "SUMMIT",
    accent: "#a8c8ff",
    ink: "#0a1530",
    background:
      "linear-gradient(180deg,#0b1430 0,#172a4d 900px,#1f3558 1900px,#121e3a 3000px,#0a1228 100%)",
    depths: [
      { title: "Base camp", subtitle: "A transfer between two accounts" },
      { title: "Ascent", subtitle: "Queues, events and compensations" },
      { title: "Above the clouds", subtitle: "What the tests showed" },
    ],
  },
];
