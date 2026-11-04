import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { AA_GRAPHIC, AA_TEXT, contrastRatio } from "./color";

/**
 * Contraste AA de los tokens reales de app/theme.css en los dos temas: el texto, el
 * texto secundario y los acentos usados como texto, sobre cada fondo de sección.
 */
const CSS = readFileSync(path.join(process.cwd(), "app/theme.css"), "utf8");

function block(selector: string): Record<string, string> {
  const start = CSS.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`No existe el bloque ${selector}`);
  const body = CSS.slice(start, CSS.indexOf("}", start));
  const tokens: Record<string, string> = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\b/g)) {
    tokens[name!] = value!;
  }
  return tokens;
}

const root = block(":root");
const darkContent = block('[data-theme="dark"],\n[data-palette="night"]');
const darkPage = block('[data-theme="dark"]');
const light = root;
const dark = { ...root, ...darkContent, ...darkPage };

const TEXT_TOKENS = ["text", "text-muted", "glow", "amber-ink"] as const;

const themes = [
  {
    name: "claro",
    tokens: light,
    backgrounds: [
      "bg",
      "about-glow",
      "seam-about-end",
      "seam-projects-end",
      "seam-testimonials-end",
      "testimonials-glow",
      "seam-experience-end",
      "experience-glow",
      "contact-bg",
      "contact-glow",
    ],
  },
  {
    name: "oscuro",
    tokens: dark,
    backgrounds: [
      "bg",
      "seam-about-end",
      "seam-projects-end",
      "seam-testimonials-end",
      "seam-experience-end",
      "contact-bg",
    ],
  },
] as const;

describe.each(themes)("tema $name", ({ tokens, backgrounds }) => {
  const get = (name: string) => {
    const value = tokens[name];
    if (!value) throw new Error(`Falta el token --${name}`);
    return value;
  };

  it.each(TEXT_TOKENS)("--%s cumple AA sobre cada fondo de sección", (token) => {
    for (const bg of backgrounds) {
      expect(
        contrastRatio(get(token), get(bg)),
        `--${token} sobre --${bg}`,
      ).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it("los botones cumplen AA", () => {
    expect(contrastRatio(get("ink"), get("glow"))).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrastRatio(get("btn-dark-fg"), get("btn-dark-bg"))).toBeGreaterThanOrEqual(
      AA_TEXT,
    );
  });

  it("los íconos de datos rápidos cumplen el mínimo gráfico", () => {
    for (const bg of backgrounds) {
      expect(contrastRatio(get("fact-cap"), get(bg))).toBeGreaterThanOrEqual(AA_GRAPHIC);
    }
  });

  it("el acento de las fichas del fósil cumple AA sobre la sección", () => {
    expect(
      contrastRatio(get("fossil-accent"), get("seam-experience-end")),
    ).toBeGreaterThanOrEqual(AA_TEXT);
  });
});
