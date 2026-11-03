import { describe, expect, it } from "vitest";
import { createFrameLoop, type FrameScheduler, type FrameTask } from "@/lib/abyss/frame";

/** Un requestAnimationFrame de mentira: los frames se disparan a mano. */
function fakeScheduler() {
  const queue = new Map<number, (now: number) => void>();
  let next = 1;
  let time = 0;
  const scheduler: FrameScheduler = {
    request: (callback) => {
      queue.set(next, callback);
      return next++;
    },
    cancel: (handle) => void queue.delete(handle),
  };
  return {
    scheduler,
    pending: () => queue.size,
    /** Dispara los frames pendientes (a 60 Hz). */
    tick() {
      const callbacks = [...queue.values()];
      queue.clear();
      time += 1000 / 60;
      callbacks.forEach((callback) => callback(time));
    },
  };
}

function recorder(log: string[], name: string, again = false): FrameTask {
  return {
    measure: () => void log.push(`${name}:measure`),
    apply: () => {
      log.push(`${name}:apply`);
      return again;
    },
  };
}

describe("bucle de frames de la inmersión", () => {
  it("todas las tareas leen antes de que ninguna escriba", () => {
    const { scheduler, tick } = fakeScheduler();
    const loop = createFrameLoop(scheduler);
    const log: string[] = [];
    loop.add(recorder(log, "profundidad"));
    loop.add(recorder(log, "linterna"));
    loop.request();
    tick();
    expect(log).toEqual([
      "profundidad:measure",
      "linterna:measure",
      "profundidad:apply",
      "linterna:apply",
    ]);
  });

  it("pedir varias veces en el mismo frame solo programa un frame", () => {
    const { scheduler, pending, tick } = fakeScheduler();
    const loop = createFrameLoop(scheduler);
    const log: string[] = [];
    loop.add(recorder(log, "a"));
    loop.request();
    loop.request();
    loop.request();
    expect(pending()).toBe(1);
    tick();
    expect(log.filter((entry) => entry.endsWith("apply"))).toHaveLength(1);
    expect(pending()).toBe(0);
  });

  it("sigue mientras alguna tarea lo pide y se detiene cuando todas terminan", () => {
    const { scheduler, pending, tick } = fakeScheduler();
    const loop = createFrameLoop(scheduler);
    let remaining = 3;
    loop.add({ measure: () => undefined, apply: () => --remaining > 0 });
    loop.request();
    for (let frame = 0; frame < 3; frame++) {
      expect(pending()).toBe(1);
      tick();
    }
    expect(remaining).toBe(0);
    expect(pending()).toBe(0);
  });

  it("una tarea quitada deja de ejecutarse y stop() cancela el frame pendiente", () => {
    const { scheduler, pending, tick } = fakeScheduler();
    const loop = createFrameLoop(scheduler);
    const log: string[] = [];
    const remove = loop.add(recorder(log, "a"));
    loop.add(recorder(log, "b"));
    remove();
    loop.request();
    tick();
    expect(log).toEqual(["b:measure", "b:apply"]);
    loop.request();
    expect(pending()).toBe(1);
    loop.stop();
    expect(pending()).toBe(0);
    loop.request();
    expect(pending()).toBe(1);
  });

  it("entrega la hora del frame a las dos fases", () => {
    const { scheduler, tick } = fakeScheduler();
    const loop = createFrameLoop(scheduler);
    const seen: number[] = [];
    loop.add({
      measure: (now) => void seen.push(now),
      apply: (now) => {
        seen.push(now);
        return false;
      },
    });
    loop.request();
    tick();
    expect(seen).toHaveLength(2);
    expect(seen[0]).toBe(seen[1]);
    expect(seen[0]).toBeGreaterThan(0);
  });
});
