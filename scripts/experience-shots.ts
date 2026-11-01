/**
 * Revisa y fotografía la sección Experiencia en 1280x575, 1440x900 y 390x844: las 6
 * entradas visibles, los filtros Académica / Laboral, sin scroll horizontal y sin saltos
 * de diseño (CLS) al cargar y al bajar hasta la sección.
 *
 * Uso:  npm run build && npm start       (en otra terminal)
 *       npm run experience:shots          (BASE_URL=http://localhost:3000)
 *       → screenshots/experience/<tamaño>-*.png
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, scale: 1, mobile: false },
  { name: "1440x900", width: 1440, height: 900, scale: 1, mobile: false },
  { name: "390x844", width: 390, height: 844, scale: 2, mobile: true },
] as const;

const TOTAL = 6;
/** Umbral de "bueno" de Web Vitals. */
const MAX_CLS = 0.1;
const SETTLE_MS = 1200;
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.join("screenshots", "experience");

const failures: string[] = [];
function check(ok: boolean, message: string) {
  console.log(`${ok ? "  ok " : "  FAIL"} ${message}`);
  if (!ok) failures.push(message);
}

/** Acumula los saltos de diseño desde que carga la página. */
async function watchLayoutShift(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __cls: number };
    w.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as unknown as {
        value: number;
        hadRecentInput: boolean;
      }[]) {
        if (!entry.hadRecentInput) w.__cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
}

async function checkFilters(page: Page, label: string) {
  const entries = page.getByTestId("experience-timeline").locator(".timeline-entry");
  check((await entries.count()) === TOTAL, `${label}: ${TOTAL} entradas sin filtrar`);
  await page.getByTestId("filter-academic").click();
  const academic = await entries.count();
  await page.getByTestId("filter-work").click();
  const work = await entries.count();
  check(
    academic > 0 && work > 0 && academic + work === TOTAL,
    `${label}: filtros ${academic} académicas + ${work} laborales`,
  );
  await page.getByTestId("filter-all").click();
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.scale,
      isMobile: viewport.mobile,
      hasTouch: viewport.mobile,
    });
    await watchLayoutShift(page);
    await page.goto(`${BASE_URL}/#experiencia`, { waitUntil: "networkidle" });
    const section = page.locator("#experiencia");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(SETTLE_MS);
    const name = viewport.name;
    await page.screenshot({ path: path.join(OUT_DIR, `${name}-1-viewport.png`) });
    await section.screenshot({ path: path.join(OUT_DIR, `${name}-2-section.png`) });
    await checkFilters(page, name);
    await page.getByTestId("filter-academic").click();
    await page
      .getByTestId("experience-timeline")
      .screenshot({ path: path.join(OUT_DIR, `${name}-3-academic.png`) });
    await page.getByTestId("filter-all").click();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    check(overflow <= 0, `${name}: sin scroll horizontal (${overflow}px)`);
    const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
    check(cls <= MAX_CLS, `${name}: CLS ${cls.toFixed(3)}`);
    await page.close();
  }
  await browser.close();
  if (failures.length > 0) {
    console.error(`\n${failures.length} comprobaciones fallaron`);
    process.exit(1);
  }
  console.log(`\nTodo en orden. Capturas en ${OUT_DIR}`);
}

void run();
