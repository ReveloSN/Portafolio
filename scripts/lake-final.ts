/**
 * Capturas finales del lago en 1280x575, 1440x900 y 390x844: escena en reposo, baldes y
 * niño, carnada enganchada, espera con las sombras en superposición, picada, salto del pez,
 * del mosasaurio y del megalodón (en el mordisco), pelea y captura.
 *
 * Uso:  npm run build && npm start       (en otra terminal)
 *       npm run lake:final               (BASE_URL=http://localhost:3000)
 *       → screenshots/lake/final/<tamaño>-NN-<estado>.png
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";
import { CAST_CHARGE_MS } from "@/lib/fishing/config";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, scale: 1, mobile: false },
  { name: "1440x900", width: 1440, height: 900, scale: 1, mobile: false },
  { name: "390x844", width: 390, height: 844, scale: 2, mobile: true },
] as const;

type Depth = "shore" | "mid" | "deep";
/** Partida en modo relajado: qué se fotografía en cada captura. */
const PLAN: readonly { bait: string; depth: Depth; shots: readonly string[] }[] = [
  {
    bait: "worm",
    depth: "shore",
    shots: ["hooked", "waiting", "bite", "fight", "caught"],
  },
  { bait: "firefly", depth: "shore", shots: ["breach-fish"] },
  { bait: "minnow", depth: "mid", shots: ["breach-mid"] },
  { bait: "firefly", depth: "mid", shots: [] },
  { bait: "minnow", depth: "deep", shots: ["breach-mosasaur"] },
  { bait: "firefly", depth: "deep", shots: ["breach-megalodon"] },
];
const ZONE: Readonly<Record<Depth, readonly [number, number]>> = {
  shore: [8, 26],
  mid: [42, 58],
  deep: [76, 92],
};
const WAITING_SHOT_MS = 900;
const BITE_TIMEOUT_MS = 12_000;
const TAP_GAP_MS = 80;
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const phaseOf = (page: Page) =>
  page.evaluate(
    () => document.querySelector<SVGElement>(".lakesvg")?.dataset.phase ?? "",
  );

async function castTo(page: Page, depth: Depth) {
  // Sin funciones con nombre dentro: tsx les añade un ayudante que la página no tiene.
  await page.evaluate(
    async ([lo, hi, chargeMs]) => {
      const action = document.querySelector("[data-testid=fishing-action]");
      action?.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
      const start = performance.now();
      for (;;) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const cycle = ((performance.now() - start) / chargeMs) % 2;
        const power = (cycle <= 1 ? cycle : 2 - cycle) * 100;
        if (power < lo || power > hi) continue;
        action?.dispatchEvent(new KeyboardEvent("keyup", { key: " ", bubbles: true }));
        return;
      }
    },
    [...ZONE[depth], CAST_CHARGE_MS.relaxed] as const,
  );
}

async function run() {
  const dir = path.join("screenshots", "lake", "final");
  await mkdir(dir, { recursive: true });
  const browser = await chromium.launch();
  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.scale,
      isMobile: viewport.mobile,
      hasTouch: viewport.mobile,
    });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    const game = page.getByTestId("fishing-game");
    await game.scrollIntoViewIfNeeded();
    let count = 0;
    const shot = async (name: string) => {
      count += 1;
      const file = `${viewport.name}-${String(count).padStart(2, "0")}-${name}.png`;
      await game.screenshot({ path: path.join(dir, file) });
    };
    await page.waitForTimeout(WAITING_SHOT_MS);
    await shot("rest");
    await page.getByTestId("relaxed-toggle").click();
    await page
      .getByTestId("bait-buckets")
      .screenshot({ path: path.join(dir, `${viewport.name}-buckets.png`) });
    for (const step of PLAN) {
      const wants = new Set(step.shots);
      await page.getByTestId(`bucket-${step.bait}`).click();
      await page.getByTestId("hooked-bait").waitFor();
      if (wants.has("hooked")) await shot("bait-hooked");
      await castTo(page, step.depth);
      await page.waitForTimeout(WAITING_SHOT_MS);
      if (wants.has("waiting")) await shot("waiting-superposition");
      await page.waitForFunction(
        () => document.querySelector<SVGElement>(".lakesvg")?.dataset.phase === "bite",
        null,
        { timeout: BITE_TIMEOUT_MS, polling: 30 },
      );
      // El salto empieza con la picada: se fotografía primero (el de un pez dura 900 ms).
      const breach = [...wants].find((name) => name.startsWith("breach"));
      if (breach) {
        const seen = await page
          .waitForSelector(
            // El pez salta en 900 ms (basta con la subida); los grandes, en el mordisco.
            breach === "breach-fish"
              ? "[data-testid=breach][data-stage=rise], [data-testid=breach][data-stage=snap]"
              : "[data-testid=breach][data-stage=snap]",
            { state: "attached", timeout: BITE_TIMEOUT_MS },
          )
          .then(
            () => true,
            () => false,
          );
        if (seen) await shot(breach);
        else
          console.log(
            `  ${viewport.name}: el salto (${breach}) pasó antes de la captura`,
          );
      }
      if (wants.has("bite")) {
        await page.waitForSelector("[data-testid=breach]", {
          state: "detached",
          timeout: BITE_TIMEOUT_MS,
        });
        await shot("bite");
      }
      await page.getByTestId("fishing-action").focus();
      await page.keyboard.press("Space");
      if (wants.has("fight")) await shot("fight");
      while ((await phaseOf(page)) === "fighting") {
        await page.keyboard.press("Space");
        await page.waitForTimeout(TAP_GAP_MS);
      }
      if (wants.has("caught")) await shot("caught");
    }
    await page.waitForTimeout(WAITING_SHOT_MS);
    await shot("complete");
    console.log(`  ${viewport.name}: ${count} capturas`);
    await page.close();
  }
  await browser.close();
  console.log(`Capturas en ${dir}`);
}

void run();
