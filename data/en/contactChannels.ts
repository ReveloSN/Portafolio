import { CONTACT_ART } from "@/data/contactArt";
import type { ChannelId, ContactChannel } from "@/types/contact";

/** Versión en inglés de CONTACT_CHANNELS: mismos canales, solo cambian los rótulos. */
export const CONTACT_CHANNELS_EN: Readonly<Record<ChannelId, ContactChannel>> = {
  correo: {
    id: "correo",
    label: "Email",
    color: "#f4a63a",
    glow: "rgba(255, 176, 64, 0.55)",
    href: "mailto:revelo.sns@gmail.com",
    handle: "revelo.sns@gmail.com",
    ariaLabel: "Open the Email egg",
    action: "focusForm",
    ...CONTACT_ART.correo,
  },
  linkedin: {
    id: "linkedin",
    label: "LinkedIn",
    color: "#3d7bff",
    glow: "rgba(61, 123, 255, 0.5)",
    href: "https://www.linkedin.com/in/santiago-nicol%C3%A1s-revelo-54b045262",
    handle: "santiago-nicolás-revelo",
    ariaLabel: "Open the LinkedIn egg",
    action: "openLink",
    ...CONTACT_ART.linkedin,
  },
  github: {
    id: "github",
    label: "GitHub",
    color: "#a26bff",
    glow: "rgba(150, 96, 255, 0.5)",
    href: "https://github.com/ReveloSN",
    handle: "ReveloSN",
    ariaLabel: "Open the GitHub egg",
    action: "openLink",
    ...CONTACT_ART.github,
  },
};
