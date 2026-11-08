import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/projects";
import { WORLD_SLUGS } from "@/types/world";

const MIN_FEATURES = 3;
const PUBLIC_DIR = path.join(process.cwd(), "public");
const PLACEHOLDER = /\[[^\]]+\]/;

/** Ancho y alto reales de un PNG o JPEG, leídos de su cabecera. */
function imageSize(file: string): { width: number; height: number } {
  const bytes = readFileSync(file);
  if (bytes.toString("ascii", 1, 4) === "PNG") {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  let offset = 2;
  while (offset < bytes.length) {
    const marker = bytes[offset + 1]!;
    const length = bytes.readUInt16BE(offset + 2);
    const isFrame =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isFrame) {
      return {
        height: bytes.readUInt16BE(offset + 5),
        width: bytes.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  throw new Error(`No se pudo leer el tamaño de ${file}`);
}

/** Todos los textos de una estructura de datos, a cualquier profundidad. */
function textsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(textsOf);
  if (value && typeof value === "object") return Object.values(value).flatMap(textsOf);
  return [];
}

describe("PROJECTS", () => {
  it("hay un proyecto por mundo, sin repetir", () => {
    expect(PROJECTS.map((project) => project.slug).sort()).toEqual(
      [...WORLD_SLUGS].sort(),
    );
  });

  it("ningún texto conserva marcadores de ejemplo", () => {
    for (const text of textsOf(PROJECTS)) expect(text).not.toMatch(PLACEHOLDER);
  });

  it.each(PROJECTS)("$name trae ficha, aporte y funcionalidades completas", (project) => {
    expect(project.contribution.length).toBeGreaterThan(0);
    expect(project.contribution.every((paragraph) => paragraph.trim().length > 0)).toBe(
      true,
    );
    expect(project.features.length).toBeGreaterThanOrEqual(MIN_FEATURES);
    expect(project.roleItems.length).toBeGreaterThan(0);
    expect(Object.values(project.facts).every((value) => value.trim().length > 0)).toBe(
      true,
    );
    expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/[^/]+\/[^/]+$/);
  });

  it.each(PROJECTS)(
    "$name: cada captura existe, describe su contenido y declara su tamaño real",
    (project) => {
      for (const shot of project.screenshots) {
        const file = path.join(PUBLIC_DIR, shot.src);
        expect(existsSync(file), shot.src).toBe(true);
        expect(shot.alt.trim().length).toBeGreaterThan(0);
        expect(imageSize(file)).toEqual({ width: shot.width, height: shot.height });
      }
    },
  );
});
