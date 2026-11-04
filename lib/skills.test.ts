import { describe, expect, it } from "vitest";
import { SKILLS } from "@/data/skills";
import { projectsBySlug } from "./collections";
import { projectsUsing } from "./skills";

describe("projectsUsing", () => {
  it("resuelve cada slug a su proyecto, en orden", () => {
    const projects = projectsUsing({ usedIn: ["oceano", "selva"] }, projectsBySlug);
    expect(projects.map((project) => project.slug)).toEqual(["oceano", "selva"]);
  });

  it("toda habilidad de /data apunta a proyectos que existen", () => {
    for (const skill of SKILLS) {
      expect(projectsUsing(skill, projectsBySlug)).toHaveLength(skill.usedIn.length);
    }
  });

  it("ninguna habilidad trae niveles numéricos", () => {
    for (const skill of SKILLS) {
      expect(Object.values(skill).some((value) => typeof value === "number")).toBe(false);
    }
  });
});
