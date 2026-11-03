import { interpolate } from "./utils";
import type { ContactEgg, ContactFormValues } from "@/types/contact";

/** Textos con marcadores `{name}` y `{email}` para el asunto y la firma del correo. */
export interface MailTemplates {
  readonly subject: string;
  readonly signature: string;
}

const MAILTO_PREFIX = "mailto:";
const LINE_BREAK = "\r\n";

const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();

function fill(template: string, name: string, email: string): string {
  return interpolate(template, { name, email });
}

/** Codifica una parte de la URL; la arroba del destinatario se deja legible. */
const encodePart = (text: string) => encodeURIComponent(text);

/**
 * Arma el enlace `mailto:` con asunto y cuerpo ya escritos. Los saltos de línea
 * del cuerpo pasan a CRLF (RFC 6068) y nombre y correo se limpian a una sola línea
 * para que no puedan colar cabeceras extra en el asunto.
 */
export function buildMailtoUrl(
  to: string,
  values: ContactFormValues,
  templates: MailTemplates,
): string {
  const name = oneLine(values.name);
  const email = oneLine(values.email);
  const message = values.message.trim().replace(/\r?\n/g, LINE_BREAK);
  const body = `${message}${LINE_BREAK}${LINE_BREAK}${fill(templates.signature, name, email)}`;
  const subject = oneLine(fill(templates.subject, name, email));
  const recipient = encodePart(oneLine(to)).replace(/%40/g, "@");
  return `${MAILTO_PREFIX}${recipient}?subject=${encodePart(subject)}&body=${encodePart(body)}`;
}

/** Dirección de destino a partir de los huevos de contacto; `undefined` si no hay uno de correo. */
export function findMailRecipient(eggs: readonly ContactEgg[]): string | undefined {
  const mail = eggs.find((egg) => egg.id === "mail");
  if (!mail) return undefined;
  const raw = mail.href.startsWith(MAILTO_PREFIX)
    ? mail.href.slice(MAILTO_PREFIX.length)
    : mail.value;
  const address = raw.split("?")[0]?.trim();
  return address ? address : undefined;
}
