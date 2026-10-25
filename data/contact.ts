import type { ContactEgg } from "@/types/contact";

export const CONTACT_EGGS: readonly ContactEgg[] = [
  {
    id: "mail",
    label: "Correo",
    color: "#ffe9a6",
    value: "tu@correo.com",
    href: "mailto:tu@correo.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    color: "#a6d8ff",
    value: "linkedin.com/in/tu-usuario",
    href: "https://linkedin.com/in/tu-usuario",
  },
  {
    id: "github",
    label: "GitHub",
    color: "#d5c2ff",
    value: "github.com/tu-usuario",
    href: "https://github.com/tu-usuario",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    color: "#b8f5c2",
    value: "+57 000 000 0000",
    href: "https://wa.me/570000000000",
  },
];
