import { describe, expect, it } from "vitest";
import { COPY } from "@/data/copy";
import type { ContactFormValues } from "@/types/contact";
import { MIN_MESSAGE_LENGTH } from "./constants";
import { hasErrors, validateContactForm } from "./validators";

const { errors } = COPY.contact;

const VALID: ContactFormValues = {
  name: "Ana",
  email: "ana@ejemplo.com",
  message: "Hola, me interesa tu trabajo.",
};

describe("validateContactForm", () => {
  it("acepta un formulario completo y correcto", () => {
    expect(validateContactForm(VALID)).toEqual({});
  });

  it("pide los tres campos cuando están vacíos", () => {
    expect(validateContactForm({ name: "", email: "", message: "" })).toEqual({
      name: errors.nameRequired,
      email: errors.emailRequired,
      message: errors.messageRequired,
    });
  });

  it("trata los campos con solo espacios como vacíos", () => {
    const result = validateContactForm({ name: "   ", email: "\t", message: " \n " });
    expect(result.name).toBe(errors.nameRequired);
    expect(result.email).toBe(errors.emailRequired);
    expect(result.message).toBe(errors.messageRequired);
  });

  it.each([
    "ana",
    "ana@",
    "@ejemplo.com",
    "ana@ejemplo",
    "ana@ejemplo.c",
    "ana lopez@ejemplo.com",
    "ana@@ejemplo.com",
  ])("rechaza el correo inválido %s", (email) => {
    expect(validateContactForm({ ...VALID, email }).email).toBe(errors.emailInvalid);
  });

  it.each(["a@b.co", "nombre.apellido+tag@dominio.com.co", "  ana@ejemplo.com  "])(
    "acepta el correo válido %s",
    (email) => {
      expect(validateContactForm({ ...VALID, email }).email).toBeUndefined();
    },
  );

  it("exige el largo mínimo del mensaje sin contar los espacios de los extremos", () => {
    const justShort = "x".repeat(MIN_MESSAGE_LENGTH - 1);
    const exact = "x".repeat(MIN_MESSAGE_LENGTH);

    expect(validateContactForm({ ...VALID, message: justShort }).message).toBe(
      errors.messageShort,
    );
    expect(validateContactForm({ ...VALID, message: `   ${justShort}   ` }).message).toBe(
      errors.messageShort,
    );
    expect(validateContactForm({ ...VALID, message: exact }).message).toBeUndefined();
  });

  it("solo marca los campos que fallan", () => {
    const result = validateContactForm({ ...VALID, name: " " });
    expect(Object.keys(result)).toEqual(["name"]);
    expect(result.name).toBe(errors.nameRequired);
  });
});

describe("hasErrors", () => {
  it("devuelve false sin errores", () => {
    expect(hasErrors({})).toBe(false);
  });

  it("devuelve true si hay al menos un error", () => {
    expect(hasErrors({ name: errors.nameRequired })).toBe(true);
  });
});
