import type { ContactFormValues } from "@/types/contact";

/** Id del campo del formulario de contacto: lo usa el nido para llevar el foco ahí. */
export const contactFieldId = (name: keyof ContactFormValues) => `f-${name}`;

/** Primer campo del formulario (al que lleva la cría del correo). */
export const FIRST_FIELD: keyof ContactFormValues = "name";
