/**
 * Capturas finales del lago en 1280x575, 1440x900 y 390x844: escena en reposo, puntos de
 * pesca, menú de ajustes, espera, picada, saltos del pez, de un mediano, del mosasaurio y
 * del megalodón, anillo, captura, final y diario.
 *
 * Uso:  npm run build && npm start       (en otra terminal)
 *       npm run lake:final -- [carpeta]  (BASE_URL=http://localhost:3000)
 *       → <carpeta>/<tamaño>-NN-<estado>.png   (por defecto screenshots/lake/final)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";
import { playRing, waitPhase } from "./lake-bot";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, scale: 1, mobile: false },
  { name: "1440x900", width: 1440, height: 900, scale: 1, mobile: false },
  { name: "390x844", width: 390, height: 844, scale: 2, mobile: true },
] as const;

type Depth = "shore" | "mid" | "deep";
/** Partida en modo relajado: qué se fotografía en cada captura. */
const PLAN: readonly { depth: Depth; shots: readonly string[] }[] = [
  { depth: "shore", shots: ["waiting", "bite", "breach-fish", "ring", "caught"] },
  { depth: "shore", shots: [] },
  { depth: "mid", shots: ["breach-mid"] },
  { depth: "mid", shots: [] },
  { depth: "deep", shots: ["breach-mosasaur"] },
  { depth: "deep", shots: ["breach-megalodon"] },
];
/** El pez salta en 900 ms (basta con la subida); los grandes se fotografían al morder. */
const BREACH_STAGE: Readonly<Record<string, string>> = {
  "breach-fish":
    "[data-testid=breach][data-stage=rise], [data-testid=breach][data-stage=snap]",
  "breach-mid": "[data-testid=breach][data-stage=snap]",
  "breach-mosasaur": "[data-testid=breach][data-stage=snap]",
  "breach-megalodon": "[data-testid=breach][data-stage=snap]",
};
const SETTLE_MS = 900;
const BITE_TIMEOUT_MS = 12_000;
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

/** Espera la fase del salto pedida y la fotografía; avisa si pasó antes de llegar. */
async function shootBreach(page: Page, name: string, shoot: () => Promise<void>) {
  const seen = await page
    .waitForSelector(BREACH_STAGE[name] ?? "[data-testid=breach]", {
      state: "attached",
      timeout: BITE_TIMEOUT_MS,
    })
    .then(
      () => true,
      () => false,
    );
  if (seen) await shoot();
  else console.log(`  el salto (${name}) pasó antes de la captura`);
}

async function run() {
  const dir = process.argv[2] ?? path.join("screenshots", "lake", "final");
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
    await page.waitForTimeout(SETTLE_MS);
    await shot("rest");
    await page.getByTestId("spot-mid").focus();
    await shot("spots");
    await page.getByTestId("settings-button").click();
    await shot("settings");
    await page.getByTestId("relaxed-toggle").click();
    await page.keyboard.press("Escape");

    for (const step of PLAN) {
      const wants = new Set(step.shots);
      await page.getByTestId(`spot-${step.depth}`).click();
      await waitPhase(page, ["waiting"], BITE_TIMEOUT_MS);
      await page.waitForTimeout(SETTLE_MS);
      if (wants.has("waiting")) await shot("waiting");
      await waitPhase(page, ["bite"], BITE_TIMEOUT_MS);
      const breach = [...wants].find((name) => name.startsWith("breach"));
      if (breach) await shootBreach(page, breach, () => shot(breach));
      if (wants.has("bite")) {
        await page.waitForSelector("[data-testid=breach]", {
          state: "detached",
          timeout: BITE_TIMEOUT_MS,
        });
        await shot("bite");
      }
      await page.getByTestId("fishing-action").focus();
      await page.keyboard.press("Space");
      await page.getByTestId("fight-ring").waitFor();
      if (wants.has("ring")) {
        await page.waitForTimeout(SETTLE_MS);
        await shot("ring");
      }
      await playRing(page, false);
      if (wants.has("caught")) await shot("caught");
    }
    await page.waitForTimeout(SETTLE_MS);
    await shot("complete");
    const journal = page.getByTestId("experience-journal");
    await journal.scrollIntoViewIfNeeded();
    await journal.screenshot({
      path: path.join(
        dir,
        `${viewport.name}-${String(count + 1).padStart(2, "0")}-journal.png`,
      ),
    });
    console.log(`  ${viewport.name}: ${count + 1} capturas`);
    await page.close();
  }
  await browser.close();
  console.log(`Capturas en ${dir}`);
}

void run();
