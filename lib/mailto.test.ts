import { describe, expect, it } from "vitest";
import type { ContactChannel, ContactFormValues } from "@/types/contact";
import { buildMailtoUrl, findMailRecipient, type MailTemplates } from "./mailto";

const TEMPLATES: MailTemplates = {
  subject: "Mensaje de {name}",
  signature: "{name} ({email})",
};

const VALUES: ContactFormValues = {
  name: "Ana Pérez",
  email: "ana@ejemplo.com",
  message: "Hola, me interesa tu trabajo.",
};

function parse(url: string) {
  const [head = "", query = ""] = url.split("?");
  const params = new URLSearchParams(query);
  return { head, subject: params.get("subject"), body: params.get("body") };
}

describe("buildMailtoUrl", () => {
  it("apunta al destinatario con asunto y cuerpo", () => {
    const { head, subject, body } = parse(
      buildMailtoUrl("yo@correo.com", VALUES, TEMPLATES),
    );
    expect(head).toBe("mailto:yo@correo.com");
    expect(subject).toBe("Mensaje de Ana Pérez");
    expect(body).toBe("Hola, me interesa tu trabajo.\r\n\r\nAna Pérez (ana@ejemplo.com)");
  });

  it("codifica con encodeURIComponent: sin espacios ni caracteres reservados sueltos", () => {
    const url = buildMailtoUrl("yo@correo.com", VALUES, TEMPLATES);
    expect(url).not.toMatch(/\s/);
    expect(url).toContain("subject=Mensaje%20de%20Ana%20P%C3%A9rez");
    expect(url).toContain("%0D%0A%0D%0A");
  });

  it("no deja que el mensaje rompa la URL con &, ? o #", () => {
    const values = { ...VALUES, message: "a&body=x?y#z" };
    const { body } = parse(buildMailtoUrl("yo@correo.com", values, TEMPLATES));
    expect(body?.startsWith("a&body=x?y#z")).toBe(true);
  });

  it("convierte los saltos de línea del mensaje a CRLF", () => {
    const values = { ...VALUES, message: "uno\ndos\r\ntres" };
    const { body } = parse(buildMailtoUrl("yo@correo.com", values, TEMPLATES));
    expect(body?.startsWith("uno\r\ndos\r\ntres")).toBe(true);
  });

  it("limpia el nombre a una línea para que no pueda añadir cabeceras", () => {
    const values = { ...VALUES, name: "Ana\r\nBcc: otra@x.com" };
    const { subject } = parse(buildMailtoUrl("yo@correo.com", values, TEMPLATES));
    expect(subject).toBe("Mensaje de Ana Bcc: otra@x.com");
    expect(subject).not.toMatch(/[\r\n]/);
  });

  it("trata el nombre como texto literal aunque tenga patrones de reemplazo", () => {
    const values = { ...VALUES, name: "$& $1" };
    const { subject } = parse(buildMailtoUrl("yo@correo.com", values, TEMPLATES));
    expect(subject).toBe("Mensaje de $& $1");
  });

  it("recorta espacios del mensaje", () => {
    const values = { ...VALUES, message: "  hola  " };
    const { body } = parse(buildMailtoUrl("yo@correo.com", values, TEMPLATES));
    expect(body?.startsWith("hola\r\n")).toBe(true);
  });
});

const channel = (over: Partial<Pick<ContactChannel, "action" | "href">>) => ({
  action: "focusForm" as const,
  href: "mailto:href@correo.com",
  ...over,
});

describe("findMailRecipient", () => {
  it("lee la dirección del enlace mailto", () => {
    expect(findMailRecipient([channel({})])).toBe("href@correo.com");
  });

  it("ignora parámetros del mailto", () => {
    expect(findMailRecipient([channel({ href: "mailto:a@b.co?subject=x" })])).toBe(
      "a@b.co",
    );
  });

  it("ignora canales que no llevan al formulario", () => {
    expect(findMailRecipient([channel({ action: "openLink" })])).toBeUndefined();
  });

  it("devuelve undefined si el canal de correo no tiene mailto", () => {
    expect(findMailRecipient([channel({ href: "https://x.test" })])).toBeUndefined();
  });
});
