"use client";

import type { ChangeEventHandler } from "react";
import { Button } from "@/components/atoms/Button";
import { HatchedEgg } from "@/components/worlds/art/HatchedEgg";
import { COPY } from "@/data/copy";
import { useContactForm } from "@/hooks/useContactForm";
import { cn } from "@/lib/utils";
import type { ContactFormValues } from "@/types/contact";

const FIELD =
  "w-full rounded-[14px] border-[1.5px] border-white/20 bg-[rgba(3,14,9,.55)] px-4 py-3.5 font-sans text-base text-leaf outline-none transition placeholder:text-leaf/45 focus:border-glow focus:shadow-[0_0_0_4px_rgba(166,255,92,.18)]";

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
    className: cn(FIELD, error && "border-[#ff8a7a]"),
  };
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
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
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[#ffb3a8]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const { contact: copy } = COPY;
  const form = useContactForm();

  if (form.sent) {
    return (
      <div role="status" className="px-1.5 py-[26px] text-center">
        <HatchedEgg width={92} height={92} className="mx-auto" />
        <h3 className="font-display mt-3.5 text-[28px] font-extrabold">
          {copy.sentTitle}
        </h3>
        <p className="mt-2.5 text-[17px] leading-relaxed opacity-85">{copy.sentText}</p>
        <Button variant="ghost" size="sm" className="mt-[22px]" onClick={form.reset}>
          {copy.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.onSubmit} noValidate className="flex flex-col gap-4">
      <h3 className="font-display text-[28px] font-extrabold">{copy.formTitle}</h3>
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
      <Button type="submit" className="mt-1 text-[17px]">
        {copy.submit} <span aria-hidden="true">→</span>
      </Button>
    </form>
  );
}
