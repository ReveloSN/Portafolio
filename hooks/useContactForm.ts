"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { buildMailtoUrl, type MailTemplates } from "@/lib/mailto";
import { hasErrors, validateContactForm } from "@/lib/validators";
import type { ContactFormErrors, ContactFormValues } from "@/types/contact";

const EMPTY_VALUES: ContactFormValues = { name: "", email: "", message: "" };

/**
 * Formulario de contacto sin servidor: tras validar, abre el correo del visitante
 * con el mensaje listo (`mailto:`). Conserva lo escrito por si la app de correo no abre.
 */
export function useContactForm(recipient: string, templates: MailTemplates) {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContactForm(values);
    setErrors(found);
    if (hasErrors(found)) return;
    const url = buildMailtoUrl(recipient, values, templates);
    setMailtoUrl(url);
    window.location.href = url;
  };

  const reset = () => {
    setMailtoUrl(null);
    setErrors({});
  };

  return { values, errors, mailtoUrl, onChange, onSubmit, reset };
}
