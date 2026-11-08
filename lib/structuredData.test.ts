import { describe, expect, it } from "vitest";
import { CHANNEL_ORDER, CONTACT_CHANNELS } from "@/data/contactChannels";
import { PROFILE } from "@/data/profile";
import { personJsonLd, serializeJsonLd } from "./structuredData";

const channels = CHANNEL_ORDER.map((id) => CONTACT_CHANNELS[id]);

describe("personJsonLd", () => {
  const data = personJsonLd(PROFILE, channels);

  it("describe a la persona con su nombre completo y su rol", () => {
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe(`${PROFILE.firstName} ${PROFILE.lastName}`);
    expect(data.jobTitle).toBe(PROFILE.role);
  });

  it("solo enlaza perfiles web, nunca el correo", () => {
    expect(data.sameAs.length).toBeGreaterThan(0);
    for (const href of data.sameAs) expect(href).toMatch(/^https?:\/\//);
  });

  it("lista las tecnologías del perfil", () => {
    expect(data.knowsAbout).toEqual(PROFILE.technologies.map((tech) => tech.name));
  });
});

describe("serializeJsonLd", () => {
  it("escapa < para que el texto no pueda cerrar la etiqueta script", () => {
    const json = serializeJsonLd({ text: "</script><b>" });
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual({ text: "</script><b>" });
  });
});
