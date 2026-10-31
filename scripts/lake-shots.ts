/**
 * Capturas del lago de pesca para comparar etapas: el juego completo y la escena sola, en
 * los tres tamaños de referencia, con una carnada elegida y otra enganchada.
 *
 * Uso:  npm run build && npm start               (en otra terminal)
 *       npm run lake:shots -- <etapa>             (BASE_URL=http://localhost:3000)
 *       → screenshots/lake/<etapa>/<tamaño>-*.png
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, scale: 1, mobile: false },
  { name: "1440x900", width: 1440, height: 900, scale: 1, mobile: false },
  { name: "390x844", width: 390, height: 844, scale: 2, mobile: true },
] as const;

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const SETTLE_MS = 900;

async function shoot(page: Page, file: string) {
  await page.waitForTimeout(SETTLE_MS);
  await page.getByTestId("fishing-game").screenshot({ path: file });
}

async function run() {
  const stage = process.argv[2] ?? "actual";
  const dir = path.join("screenshots", "lake", stage);
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
    await shoot(page, path.join(dir, `${viewport.name}-1-idle.png`));
    await page.getByTestId("bucket-firefly").click();
    await shoot(page, path.join(dir, `${viewport.name}-2-bait-picked.png`));
    await page.getByTestId("fishing-action").click();
    await shoot(page, path.join(dir, `${viewport.name}-3-bait-hooked.png`));
    await page.screenshot({ path: path.join(dir, `${viewport.name}-4-viewport.png`) });
    console.log(`  ${viewport.name}: listo`);
    await page.close();
  }
  await browser.close();
  console.log(`Capturas en ${dir}`);
}

void run();
