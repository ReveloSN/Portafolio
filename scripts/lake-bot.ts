/**
 * Ayudantes de Playwright compartidos por las pruebas y las capturas del lago: leer la
 * fase, esperarla y jugar el anillo como lo haría una persona atenta.
 */
import type { Page } from "playwright";

const DEFAULT_TIMEOUT_MS = 9000;

export const phaseOf = (page: Page) =>
  page.evaluate(
    () => document.querySelector<SVGElement>(".lakesvg")?.dataset.phase ?? "",
  );

export function waitPhase(
  page: Page,
  phases: readonly string[],
  timeout = DEFAULT_TIMEOUT_MS,
) {
  return page.waitForFunction(
    (wanted) =>
      wanted.includes(
        document.querySelector<SVGElement>(".lakesvg")?.dataset.phase ?? "",
      ),
    phases,
    { timeout, polling: 30 },
  );
}

/**
 * Juega el anillo hasta que acaba la pelea. El jugador automático vive en la página y
 * calcula la aguja con los datos del anillo y el mismo reloj que el motor (desde Node
 * llegaría tarde con la máquina cargada). Falla `misses` veces a propósito pulsando enfrente
 * de la zona y luego acierta en su centro; pulsa con el puntero o con Espacio.
 */
export function playRing(page: Page, pointer: boolean, misses = 0) {
  // Sin funciones con nombre dentro: tsx les añade un ayudante que la página no tiene.
  return page.evaluate(
    async ([usePointer, missFirst]) => {
      let missed = 0;
      let lastSince = Number.NaN;
      for (;;) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const phase = document.querySelector<SVGElement>(".lakesvg")?.dataset.phase;
        if (phase !== "fighting") return;
        const ring = document.querySelector<HTMLElement>("[data-testid=fight-ring]");
        const action = document.querySelector<HTMLElement>(
          "[data-testid=fishing-action]",
        );
        if (!ring || !action) continue;
        const since = Number(ring.dataset.since);
        const now = performance.now();
        // Una pulsación por ronda: la ronda nueva trae otro `since`.
        if (since === lastSince || now < since) continue;
        const speed = Number(ring.dataset.speed);
        const angle = Number(ring.dataset.angleAt) + ((now - since) * speed) / 1000;
        const offset = (((angle - Number(ring.dataset.zoneStart)) % 360) + 360) % 360;
        const zone = Number(ring.dataset.zoneDeg);
        const aim = missed < missFirst ? zone / 2 + 180 : zone / 2;
        if (Math.abs(offset - aim) > Math.min(zone / 4, 12)) continue;
        if (missed < missFirst) missed++;
        lastSince = since;
        if (usePointer) {
          action.dispatchEvent(
            new PointerEvent("pointerdown", {
              bubbles: true,
              button: 0,
              isPrimary: true,
            }),
          );
        } else {
          action.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
          action.dispatchEvent(new KeyboardEvent("keyup", { key: " ", bubbles: true }));
        }
      }
    },
    [pointer, misses] as const,
  );
}
