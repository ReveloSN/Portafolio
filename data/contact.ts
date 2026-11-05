import type { ContactEgg } from "@/types/contact";

export const CONTACT_EGGS: readonly ContactEgg[] = [
  {
    id: "mail",
    label: "Correo",
    color: "#ffe9a6",
    value: "revelo.sns@gmail.com",
    href: "mailto:revelo.sns@gmail.com",
    action: "Enviar un correo",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    color: "#a6d8ff",
    value: "linkedin.com/in/santiago-nicolás-revelo-54b045262",
    href: "https://www.linkedin.com/in/santiago-nicol%C3%A1s-revelo-54b045262",
    action: "Ir a LinkedIn",
  },
  {
    id: "github",
    label: "GitHub",
    color: "#d5c2ff",
    value: "github.com/ReveloSN",
    href: "https://github.com/ReveloSN",
    action: "Ir a GitHub",
  },
];
