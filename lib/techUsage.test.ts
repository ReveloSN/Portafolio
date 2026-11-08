import { describe, expect, it } from "vitest";
import { PROFILE } from "@/data/profile";
import { TECH_USAGE } from "@/data/techUsage";
import { projectsBySlug } from "./collections";

describe("TECH_USAGE", () => {
  it("tiene datos para cada tecnología del perfil", () => {
    for (const tech of PROFILE.technologies) {
      expect(TECH_USAGE[tech.icon], tech.name).toBeDefined();
    }
  });

  it("solo cita mundos que existen en el portafolio", () => {
    for (const usage of Object.values(TECH_USAGE)) {
      for (const slug of usage?.projects ?? []) {
        expect(projectsBySlug.has(slug), slug).toBe(true);
      }
    }
  });

  it("enlaza repositorios de la cuenta de GitHub, sin repetir", () => {
    for (const usage of Object.values(TECH_USAGE)) {
      const repos = usage?.repos ?? [];
      expect(new Set(repos.map((repo) => repo.name)).size).toBe(repos.length);
      for (const repo of repos) {
        expect(repo.url).toBe(`https://github.com/ReveloSN/${repo.name}`);
      }
    }
  });
});
