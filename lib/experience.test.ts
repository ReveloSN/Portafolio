import { describe, expect, it } from "vitest";
import { sortedExperience } from "@/lib/collections";
import { countLabel, filterExperience } from "@/lib/experience";

describe("línea de tiempo de experiencia", () => {
  it("tiene las 6 entradas, de la más reciente a la más antigua", () => {
    expect(sortedExperience).toHaveLength(6);
    const years = sortedExperience.map((entry) => entry.startYear);
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it("filtra por tipo sin cambiar el orden y 'Todo' las deja todas", () => {
    const academic = filterExperience(sortedExperience, "academic");
    const work = filterExperience(sortedExperience, "work");
    expect(academic.every((entry) => entry.kind === "academic")).toBe(true);
    expect(work.every((entry) => entry.kind === "work")).toBe(true);
    expect(academic.length + work.length).toBe(sortedExperience.length);
    expect(filterExperience(sortedExperience, "all")).toBe(sortedExperience);
    expect(academic).toEqual(
      sortedExperience.filter((entry) => entry.kind === "academic"),
    );
  });

  it("anuncia cuántas entradas se ven", () => {
    expect(countLabel("Mostrando {shown} de {total} entradas", 3, 6)).toBe(
      "Mostrando 3 de 6 entradas",
    );
  });
});
