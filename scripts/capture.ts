/**
 * Capturas de página completa y de la primera pantalla, con barra de scroll visible
 * (como en Windows) para detectar desbordes laterales.
 *
 * Uso:  npm run build && npm start       (en otra terminal)
 *       npm run capture -- before         (o "after"; BASE_URL=http://localhost:3000)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, scale: 1.5, mobile: false },
  { name: "1440x900", width: 1440, height: 900, scale: 1, mobile: false },
  { name: "1920x1080", width: 1920, height: 1080, scale: 1, mobile: false },
  { name: "2560x1080", width: 2560, height: 1080, scale: 1, mobile: false },
  { name: "3440x1440", width: 3440, height: 1440, scale: 1, mobile: false },
  { name: "390x844", width: 390, height: 844, scale: 2, mobile: true },
] as const;

/** Ilustraciones que nunca deben quedar recortadas por un contenedor. */
const MUST_NOT_CLIP = [
  "[data-testid=hero-canoe]",
  "[data-testid=hero-dino]",
  ".track-step img",
  ".bone-meter img",
  "[data-testid=egg-nest] svg",
  "#proyectos article svg",
];

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const STEP_MS = 120;
const SETTLE_MS = 800;

/** Recorre la página para que carguen las imágenes diferidas antes de la captura completa. */
async function warmUp(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewport = page.viewportSize()?.height ?? 800;
  for (let y = 0; y < height; y += viewport * 0.8) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(STEP_MS);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(SETTLE_MS);
}

/** Devuelve los selectores cuya ilustración sobresale de un ancestro que recorta (overflow). */
async function findClipped(page: Page): Promise<string[]> {
  return page.evaluate((selectors) => {
    const result: string[] = [];
    for (const selector of selectors) {
      for (const el of Array.from(document.querySelectorAll(selector))) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        let parent = el.parentElement;
        while (parent && parent !== document.body) {
          const style = getComputedStyle(parent);
          const clipsX = style.overflowX === "hidden" || style.overflowX === "clip";
          const clipsY = style.overflowY === "hidden" || style.overflowY === "clip";
          if (clipsX || clipsY) {
            const p = parent.getBoundingClientRect();
            const outX = r.left < p.left - 1 || r.right > p.right + 1;
            const outY = r.top < p.top - 1 || r.bottom > p.bottom + 1;
            if ((clipsX && outX) || (clipsY && outY)) {
              result.push(selector);
              break;
            }
          }
          parent = parent.parentElement;
        }
      }
    }
    return Array.from(new Set(result));
  }, MUST_NOT_CLIP);
}

async function main() {
  const label = process.argv[2] ?? "after";
  const outDir = path.join(process.cwd(), "screenshots", label);
  await mkdir(outDir, { recursive: true });
  // Sin --hide-scrollbars: la barra vertical ocupa ancho real, como en Windows
  const browser = await chromium.launch({ ignoreDefaultArgs: ["--hide-scrollbars"] });
  const report: string[] = [];
  let failures = 0;

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.scale,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
    });
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: "load" });
    await warmUp(page);
    await page.screenshot({ path: path.join(outDir, `${vp.name}-viewport.png`) });
    await page.screenshot({
      path: path.join(outDir, `${vp.name}-full.png`),
      fullPage: true,
    });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    const clipped = await findClipped(page);
    report.push(
      `${vp.name}: desborde horizontal ${overflow}px · ilustraciones recortadas: ${clipped.length ? clipped.join(", ") : "ninguna"}`,
    );
    if (overflow > 0 || clipped.length) failures += 1;
    await context.close();
  }
  await browser.close();
  console.log(report.join("\n"));
  if (failures > 0) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
