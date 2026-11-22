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

  it("solo usa logos que existen y colores hex", () => {
    for (const [name, visual] of Object.entries(TECH_CATALOG)) {
      expect(TECH_ICON_PATHS[visual.icon], name).toBeTruthy();
      expect(visual.color, name).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
