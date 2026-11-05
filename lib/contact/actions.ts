import { contactFieldId, FIRST_FIELD } from "@/lib/contact/form";
import { interpolate } from "@/lib/utils";
import type { ContactChannel } from "@/types/contact";

/** Lleva el foco al primer campo del formulario (sin enviar nada). */
export function focusFirstField(): void {
  document.getElementById(contactFieldId(FIRST_FIELD))?.focus();
}

/** Acción de la cría: el correo lleva al formulario y los perfiles se abren aparte. */
export function openChannel(channel: ContactChannel): void {
  if (channel.action === "focusForm") return focusFirstField();
  window.open(channel.href, "_blank", "noopener,noreferrer");
}

interface AnnouncementCopy {
  readonly hatched: string;
  readonly hatchedForm: string;
}

/** Texto para el aria-live cuando sale una cría. */
export function hatchAnnouncement(
  channel: ContactChannel,
  copy: AnnouncementCopy,
): string {
  const template = channel.action === "focusForm" ? copy.hatchedForm : copy.hatched;
  return interpolate(template, { label: channel.label });
}
