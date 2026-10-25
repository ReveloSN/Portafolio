"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { hasErrors, validateContactForm } from "@/lib/validators";
import type { ContactFormErrors, ContactFormValues } from "@/types/contact";

const EMPTY_VALUES: ContactFormValues = { name: "", email: "", message: "" };

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [sent, setSent] = useState(false);

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
    setSent(true);
    setValues(EMPTY_VALUES);
  };

  const reset = () => {
    setSent(false);
    setErrors({});
  };

  return { values, errors, sent, onChange, onSubmit, reset };
}
