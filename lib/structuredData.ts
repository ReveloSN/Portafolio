import type { ContactChannel } from "@/types/contact";
import type { Profile } from "@/types/profile";

/** Solo perfiles web públicos: el correo no se expone a buscadores ni recolectores. */
const PUBLIC_PROFILE = /^https?:\/\//;

/**
 * Datos estructurados (schema.org `Person`) para que los buscadores reconozcan a la
 * persona, su rol, sus perfiles y sus tecnologías. Todo sale de `/data`.
 */
export function personJsonLd(profile: Profile, channels: readonly ContactChannel[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${profile.firstName} ${profile.lastName}`,
    jobTitle: profile.role,
    ...(profile.tagline ? { description: profile.tagline } : {}),
    sameAs: channels
      .map((channel) => channel.href)
      .filter((href) => PUBLIC_PROFILE.test(href)),
    knowsAbout: profile.technologies.map((tech) => tech.name),
  };
}

/** JSON seguro dentro de `<script>`: "<" escapado para que nada cierre la etiqueta. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
