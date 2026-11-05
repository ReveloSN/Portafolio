import { describe, expect, it } from "vitest";
import { SHELL_COUNT, shellFlights } from "./shells";

const WIDTHS = [50, 48, 32, 30, 12, 10];

describe("shellFlights", () => {
  it("da seis trozos, uno por pieza del sprite", () => {
    const flights = shellFlights(0, WIDTHS);
    expect(flights).toHaveLength(SHELL_COUNT);
    expect(flights.map((f) => f.piece)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(flights.map((f) => f.size)).toEqual(WIDTHS);
  });

  it("es fijo: el mismo canal siempre dibuja lo mismo", () => {
    expect(shellFlights(1, WIDTHS)).toEqual(shellFlights(1, WIDTHS));
  });

  it("redondea a dos decimales para que servidor y cliente pinten igual", () => {
    for (const flight of shellFlights(1, [33.480176, 10.5])) {
      for (const value of [
        flight.startX,
        flight.startY,
        flight.dx,
        flight.rise,
        flight.fall,
      ]) {
        expect(Math.round(value * 100) / 100).toBe(value);
      }
    }
    expect(shellFlights(0, [33.480176])[0]!.size).toBe(33.48);
  });

  it("cambia de un canal a otro", () => {
    expect(shellFlights(0, WIDTHS)).not.toEqual(shellFlights(2, WIDTHS));
  });

  it("abre en abanico: pares a la izquierda, impares a la derecha", () => {
    shellFlights(2, WIDTHS).forEach((flight, i) => {
      expect(Math.sign(flight.dx)).toBe(i % 2 === 0 ? -1 : 1);
      expect(flight.rise).toBeGreaterThan(0);
      expect(flight.fall).toBeGreaterThan(0);
    });
  });

  it("los trozos chicos vuelan más lejos que las mitades", () => {
    const flights = shellFlights(0, WIDTHS);
    expect(Math.abs(flights[5]!.dx)).toBeGreaterThan(Math.abs(flights[0]!.dx));
  });
});
