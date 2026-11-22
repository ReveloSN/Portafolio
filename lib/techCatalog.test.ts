import { describe, expect, it } from "vitest";
import { CONTENT } from "@/data/content";
import { TECH_CATALOG } from "@/data/techCatalog";
import { TECH_ICON_PATHS } from "./techIcons";

describe("TECH_CATALOG", () => {
  it("tiene la huella de cada tecnología de cada proyecto", () => {
    for (const project of CONTENT.es.projects) {
      for (const tech of project.technologies) {
        expect(TECH_CATALOG[tech], `${project.name}: ${tech}`).toBeDefined();
      }
    }
  });

  it.each(Object.keys(CONTENT) as (keyof typeof CONTENT)[])(
    "%s: cada tecnología de cada proyecto dice para qué se usó, sin notas sobrantes",
    (locale) => {
      for (const project of CONTENT[locale].projects) {
        expect(Object.keys(project.techNotes).sort(), project.name).toEqual(
          [...project.technologies].sort(),
        );
        for (const note of Object.values(project.techNotes)) {
          expect(note.trim().length, project.name).toBeGreaterThan(0);
        }
      }
    },
  );

  it("solo usa logos que existen y colores hex", () => {
    for (const [name, visual] of Object.entries(TECH_CATALOG)) {
      expect(TECH_ICON_PATHS[visual.icon], name).toBeTruthy();
      expect(visual.color, name).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
