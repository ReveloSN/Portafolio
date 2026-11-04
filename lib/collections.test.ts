import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/projects";
import { WORLDS } from "@/data/worlds";
import { WORLD_SLUGS, type World, type WorldSlug } from "@/types/world";
import { projectsBySlug, worldsBySlug } from "./collections";

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
