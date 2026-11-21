import { COPY, type Copy } from "@/data/copy";
import type { ContactFormErrors, ContactFormValues } from "@/types/contact";
import { EMAIL_PATTERN, MIN_MESSAGE_LENGTH } from "./constants";

/** Mensajes de error del formulario en un idioma. */
export type ContactErrorMessages = Copy["contact"]["errors"];

export function validateContactForm(
  values: ContactFormValues,
  errors: ContactErrorMessages = COPY.contact.errors,
): ContactFormErrors {
  const result: { name?: string; email?: string; message?: string } = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) result.name = errors.nameRequired;

  if (!email) result.email = errors.emailRequired;
  else if (!EMAIL_PATTERN.test(email)) result.email = errors.emailInvalid;

  if (!message) result.message = errors.messageRequired;
  else if (message.length < MIN_MESSAGE_LENGTH) result.message = errors.messageShort;

  return result;
}

export function hasErrors(errorsMap: ContactFormErrors): boolean {
  return Object.keys(errorsMap).length > 0;
}
