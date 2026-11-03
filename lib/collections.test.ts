import { describe, expect, it } from "vitest";
import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { WORLDS } from "@/data/worlds";
import { WORLD_SLUGS, type World, type WorldSlug } from "@/types/world";
import {
  catchSequence,
  projectsBySlug,
  sortedExperience,
  worldsBySlug,
} from "./collections";

/** Índices de la experiencia (ordenada) tras los que aparece una criatura rara. */
const RARE_AFTER_INDEXES = [1, 3] as const;

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

describe("catchSequence", () => {
  it("incluye las entradas en el mismo orden que sortedExperience", () => {
    const entries = catchSequence.flatMap((item) =>
      item.type === "entry" ? [item.entry] : [],
    );
    expect(entries).toEqual(sortedExperience);
  });

  it("coloca una criatura rara justo después de las entradas 2.ª y 4.ª", () => {
    const expectedRares = RARE_AFTER_INDEXES.filter(
      (index) => index < sortedExperience.length,
    ).length;
    const rares = catchSequence.flatMap((item, position) =>
      item.type === "rare" ? [{ position, creature: item.creature }] : [],
    );

    expect(rares).toHaveLength(expectedRares);
    for (const { position } of rares) {
      const before = catchSequence[position - 1];
      expect(before?.type).toBe("entry");
      if (before?.type !== "entry") continue;
      const index = sortedExperience.indexOf(before.entry);
      expect(RARE_AFTER_INDEXES).toContain(index);
    }
  });

  it("tiene una posición por entrada más una por cada criatura rara", () => {
    const rares = RARE_AFTER_INDEXES.filter(
      (index) => index < sortedExperience.length,
    ).length;
    expect(catchSequence).toHaveLength(sortedExperience.length + rares);
  });
});
