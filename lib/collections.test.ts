import { describe, expect, it } from "vitest";
import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { WORLDS } from "@/data/worlds";
import type { ExperienceEntry } from "@/types/experience";
import { WORLD_SLUGS, type World, type WorldSlug } from "@/types/world";
import {
  experienceById,
  projectsBySlug,
  sortedExperience,
  worldsBySlug,
} from "./collections";

describe("sortedExperience", () => {
  it("contiene todas las entradas de la experiencia una sola vez", () => {
    expect(sortedExperience).toHaveLength(EXPERIENCE.length);
    expect(sortedExperience.map((entry) => entry.id).sort()).toEqual(
      EXPERIENCE.map((entry) => entry.id).sort(),
    );
  });

  it("va de la más reciente a la más antigua", () => {
    for (let i = 1; i < sortedExperience.length; i++) {
      const newer = sortedExperience[i - 1]!;
      const older = sortedExperience[i]!;
      expect(newer.startYear).toBeGreaterThanOrEqual(older.startYear);
    }
  });

  it("no altera el orden original de EXPERIENCE", () => {
    const originalIds = EXPERIENCE.map((entry) => entry.id);
    expect(sortedExperience).not.toBe(EXPERIENCE);
    expect(EXPERIENCE.map((entry) => entry.id)).toEqual(originalIds);
  });
});

describe("experienceById", () => {
  it("indexa cada entrada por su id", () => {
    expect(experienceById.size).toBe(EXPERIENCE.length);
    for (const entry of EXPERIENCE) {
      expect(experienceById.get(entry.id)).toBe(entry);
    }
  });

  it("devuelve undefined para un id desconocido", () => {
    const lookup: ReadonlyMap<string, ExperienceEntry> = experienceById;
    expect(lookup.get("no-existe")).toBeUndefined();
  });
});

describe("projectsBySlug", () => {
  it("indexa cada proyecto por su slug de mundo", () => {
    expect(projectsBySlug.size).toBe(PROJECTS.length);
    for (const project of PROJECTS) {
      expect(projectsBySlug.get(project.slug)).toBe(project);
    }
  });

  it("tiene un proyecto para cada mundo de la ruta /mundos/[slug]", () => {
    for (const slug of WORLD_SLUGS) {
      expect(projectsBySlug.has(slug)).toBe(true);
    }
  });
});

describe("worldsBySlug", () => {
  it("indexa cada mundo por su slug", () => {
    expect(worldsBySlug.size).toBe(WORLDS.length);
    for (const world of WORLDS) {
      expect(worldsBySlug.get(world.slug)).toBe(world);
    }
  });

  it("devuelve undefined para un slug desconocido", () => {
    const lookup: ReadonlyMap<string, World> = worldsBySlug;
    expect(lookup.get("nada")).toBeUndefined();
  });

  it("tiene un mundo para cada slug válido", () => {
    const slugs: readonly WorldSlug[] = WORLD_SLUGS;
    for (const slug of slugs) {
      expect(worldsBySlug.get(slug)?.slug).toBe(slug);
    }
  });
});
