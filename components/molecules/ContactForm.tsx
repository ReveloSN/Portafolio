"use client";

import { useRef, type ChangeEventHandler } from "react";
import { Button } from "@/components/atoms/Button";
import { HatchedEgg } from "@/components/worlds/art/HatchedEgg";
import { COPY } from "@/data/copy";
import { useContactForm } from "@/hooks/useContactForm";
import { useFocusOnComplete } from "@/hooks/useFocusOnComplete";
import { cn } from "@/lib/utils";
import type { ContactFormValues } from "@/types/contact";

const FIELD =
  "w-full rounded-[14px] border-[1.5px] border-line-strong bg-(--field-bg) px-4 py-3.5 font-sans text-fluid-base text-fg outline-none transition placeholder:text-muted focus:border-glow focus:shadow-[0_0_0_4px_var(--focus-halo)]";

interface FieldProps {
  readonly name: keyof ContactFormValues;
  readonly label: string;
  readonly placeholder: string;
  readonly value: string;
  readonly error?: string;
  readonly type?: "text" | "email";
  readonly multiline?: boolean;
  readonly autoComplete?: string;
  readonly onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function Field({ name, label, error, multiline, type = "text", ...rest }: FieldProps) {
  const id = `f-${name}`;
  const shared = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: cn(FIELD, error && "border-(--error-edge)"),
  };
  return (
    <div>
      <label htmlFor={id} className="text-fluid-sm mb-2 block font-semibold">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={4}
          {...shared}
          {...rest}
          className={cn(shared.className, "resize-y")}
        />
      ) : (
        <input type={type} {...shared} {...rest} />
      )}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-fluid-sm mt-1.5 text-(--error-ink)"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface ContactFormProps {
  /** Dirección a la que se escribe: sale de los datos de contacto. */
  readonly recipient: string;
}

export function ContactForm({ recipient }: ContactFormProps) {
  const { contact: copy } = COPY;
  const form = useContactForm(recipient, {
    subject: copy.mailSubject,
    signature: copy.mailSignature,
  });
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const opened = form.mailtoUrl !== null;
  useFocusOnComplete(opened, true, confirmationRef);

  if (form.mailtoUrl !== null) {
    return (
      <div role="status" className="py-fluid-4 px-1.5 text-center">
        <HatchedEgg width={92} height={92} className="mx-auto" />
        <h3
          ref={confirmationRef}
          tabIndex={-1}
          className="font-display text-fluid-xl mt-3.5 font-extrabold outline-none"
        >
          {copy.sentTitle}
        </h3>
        <p className="text-fluid-base mt-2.5 leading-relaxed opacity-85">
          {copy.sentText}
        </p>
        <p className="text-fluid-base mt-3 leading-relaxed opacity-85">
          {copy.fallback}{" "}
          <span className="text-glow font-semibold break-all select-all">
            {recipient}
          </span>
        </p>
        <div className="mt-fluid-3 gap-fluid-2 flex flex-wrap justify-center">
          <Button variant="ghost" size="sm" href={form.mailtoUrl}>
            {copy.reopen}
          </Button>
          <Button variant="ghost" size="sm" onClick={form.reset}>
            {copy.backToForm}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={form.onSubmit} noValidate className="flex flex-col gap-4">
      <h3 className="font-display text-fluid-xl font-extrabold">{copy.formTitle}</h3>
      <Field
        name="name"
        label={copy.name}
        placeholder={copy.namePlaceholder}
        autoComplete="name"
        value={form.values.name}
        error={form.errors.name}
        onChange={form.onChange}
      />
      <Field
        name="email"
        type="email"
        label={copy.email}
        placeholder={copy.emailPlaceholder}
        autoComplete="email"
        value={form.values.email}
        error={form.errors.email}
        onChange={form.onChange}
      />
      <Field
        name="message"
        multiline
        label={copy.message}
        placeholder={copy.messagePlaceholder}
        value={form.values.message}
        error={form.errors.message}
        onChange={form.onChange}
      />
      <Button type="submit" className="text-fluid-base mt-1">
        {copy.submit} <span aria-hidden="true">→</span>
      </Button>
      <p className="text-fluid-sm -mt-1 text-center opacity-70">{copy.submitHint}</p>
    </form>
  );
}
