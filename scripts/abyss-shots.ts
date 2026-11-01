/**
 * Recorre la inmersión de la sección Experiencia en 1280x575, 1440x900 y 390x844 (táctil)
 * y la fotografía: superficie, cada placa, zona media, abismo y final, con y sin "Encender
 * luces"; solo con teclado (Tab ilumina cada placa); con el dedo; sin JS y con movimiento
 * reducido. Comprueba las 6 experiencias en orden (más reciente primero) con fechas,
 * institución, cargo y logros visibles al iluminarlas, los filtros, la vuelta a la
 * superficie, el scroll horizontal, el CLS, las tareas largas y el peso del arte.
 *
 * Uso:  npm run build && npm start       (en otra terminal)
 *       npm run abyss:shots               (BASE_URL=http://localhost:3000)
 *       → screenshots/abyss/<tamaño>/*.png
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { sortedExperience } from "@/lib/collections";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, scale: 1, touch: false },
  { name: "1440x900", width: 1440, height: 900, scale: 1, touch: false },
  { name: "390x844", width: 390, height: 844, scale: 2, touch: true },
] as const;
type Viewport = (typeof VIEWPORTS)[number];

const MAX_CLS = 0.1;
const MAX_ART_BYTES = 2 * 1024 * 1024;
/** Una tarea larga de más de esto cuenta como bloqueo del hilo principal. */
const LONG_TASK_MS = 50;
const SETTLE_MS = 900;
const FADE_TIMEOUT_MS = 5000;
/** Paso y pausa de la rueda: un scroll de lectura, no un salto. */
const WHEEL_PX = 120;
const WHEEL_PAUSE_MS = 40;
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.join("screenshots", "abyss");
const IDS = sortedExperience.map((entry) => entry.id);

const failures: string[] = [];
function check(ok: boolean, message: string) {
  console.log(`${ok ? "  ok " : "  FAIL"} ${message}`);
  if (!ok) failures.push(message);
}

/** CLS y tareas largas desde que carga la página. */
async function watchPerformance(page: Page) {
  await page.addInitScript((longMs) => {
    const w = window as unknown as { __cls: number; __long: number };
    w.__cls = 0;
    w.__long = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as unknown as {
        value: number;
        hadRecentInput: boolean;
      }[]) {
        if (!entry.hadRecentInput) w.__cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (entry.duration > longMs) w.__long++;
    }).observe({ type: "longtask" });
  }, LONG_TASK_MS);
}

const metrics = (page: Page) =>
  page.evaluate(() => {
    const w = window as unknown as { __cls: number; __long: number };
    return { cls: w.__cls, long: w.__long };
  });

/** Scroll instantáneo a una fracción de la inmersión o a una placa centrada. */
async function diveTo(page: Page, fraction: number) {
  await page.evaluate((f) => {
    const dive = document.querySelector<HTMLElement>(".dive")!;
    const top = dive.getBoundingClientRect().top + scrollY;
    const span = dive.offsetHeight - innerHeight;
    scrollTo({ top: top + f * span, behavior: "instant" });
  }, fraction);
  await page.waitForTimeout(SETTLE_MS);
}
async function centerCard(page: Page, id: string) {
  await page.evaluate((testId) => {
    const card = document.querySelector<HTMLElement>(`[data-testid="${testId}"]`)!;
    const box = card.getBoundingClientRect();
    scrollTo({
      top: scrollY + box.top + box.height / 2 - innerHeight / 2,
      behavior: "instant",
    });
  }, `dive-card-${id}`);
  await page.waitForTimeout(SETTLE_MS);
}

const shot = (page: Page, dir: string, name: string) =>
  page.screenshot({ path: path.join(dir, `${name}.png`) });

/** La placa centrada muestra fecha, cargo, institución y logros (opacidad plena). */
async function readCard(page: Page, id: string) {
  return page.evaluate((testId) => {
    const card = document.querySelector<HTMLElement>(`[data-testid="${testId}"]`)!;
    // Sin funciones con nombre dentro de evaluate: tsx les añade __name y el navegador no lo tiene
    const [time, title, org] = ["time", "h3", ".dive-card-org"].map(
      (selector) => card.querySelector(selector)?.textContent?.trim() ?? "",
    );
    const log = card.querySelector(".dive-card-achievements")!;
    return {
      time,
      title,
      org,
      items: card.querySelectorAll(".dive-card-achievements li").length,
      shown: getComputedStyle(log).opacity === "1",
      lit: card.hasAttribute("data-lit"),
    };
  }, `dive-card-${id}`);
}

async function checkOrder(page: Page, label: string) {
  const order = await page
    .getByTestId("dive-list")
    .locator(".dive-card")
    .evaluateAll((cards) => cards.map((card) => card.getAttribute("data-testid")));
  check(
    JSON.stringify(order) === JSON.stringify(IDS.map((id) => `dive-card-${id}`)),
    `${label}: 6 experiencias, de la más reciente a la más antigua`,
  );
}

async function walk(page: Page, dir: string, label: string, lights: boolean) {
  const suffix = lights ? "luces" : "linterna";
  await diveTo(page, 0);
  await shot(page, dir, `01-superficie-${suffix}`);
  for (const [index, id] of IDS.entries()) {
    await centerCard(page, id);
    await shot(page, dir, `0${index + 2}-placa-${index + 1}-${suffix}`);
    const card = await readCard(page, id);
    const entry = sortedExperience[index]!;
    check(
      card.time === entry.periodLabel &&
        card.title === entry.title &&
        card.org === entry.organization &&
        card.items === entry.achievements.length &&
        card.shown,
      `${label} ${suffix}: placa ${index + 1} con fechas, cargo, institución y logros visibles`,
    );
  }
  for (const [fraction, name] of [
    [0.45, "10-zona-media"],
    [0.85, "11-abismo"],
    [1, "12-final"],
  ] as const) {
    await diveTo(page, fraction);
    await shot(page, dir, `${name}-${suffix}`);
  }
}

async function checkLights(page: Page, label: string) {
  const toggle = page.getByTestId("lights-toggle");
  await toggle.click();
  // Espera a que terminen los fundidos (oscuridad y logros) en lugar de una pausa fija
  await page
    .waitForFunction(
      () =>
        getComputedStyle(document.querySelector(".dive-dark")!).opacity === "0" &&
        [...document.querySelectorAll(".dive-card-achievements")].every(
          (log) => getComputedStyle(log).opacity === "1",
        ),
      undefined,
      { timeout: FADE_TIMEOUT_MS },
    )
    .catch(() => undefined);
  const state = await page.evaluate(() => ({
    pressed: document
      .querySelector("[data-testid=lights-toggle]")
      ?.getAttribute("aria-pressed"),
    dark: getComputedStyle(document.querySelector(".dive-dark")!).opacity,
    hidden: [...document.querySelectorAll(".dive-card-achievements")].filter(
      (log) => getComputedStyle(log).opacity !== "1",
    ).length,
  }));
  check(
    state.pressed === "true" && state.dark === "0" && state.hidden === 0,
    `${label}: "Encender luces" quita la oscuridad y muestra todos los logros (aria-pressed ${state.pressed}, oscuridad ${state.dark}, ocultos ${state.hidden})`,
  );
}

async function checkKeyboard(page: Page, dir: string, label: string) {
  await diveTo(page, 0);
  await page.getByTestId("lights-toggle").focus();
  for (const [index, id] of IDS.entries()) {
    await page.keyboard.press("Tab");
    // El scroll suave hasta la placa enfocada tarda más que el asentado normal
    await page.waitForTimeout(SETTLE_MS * 2);
    const state = await page.evaluate((testId) => {
      const card = document.activeElement as HTMLElement;
      const box = card.getBoundingClientRect();
      return {
        focused: card.dataset.testid === testId,
        inView: box.top >= 0 && box.bottom <= innerHeight,
      };
    }, `dive-card-${id}`);
    const card = await readCard(page, id);
    check(
      state.focused && state.inView && card.lit && card.shown,
      `${label} teclado: Tab enfoca, centra e ilumina la placa ${index + 1}`,
    );
    if (index === 0 || index === IDS.length - 1) {
      await shot(page, dir, `20-teclado-placa-${index + 1}`);
    }
  }
}

async function checkTouch(page: Page, dir: string, label: string) {
  const first = IDS[0]!;
  await centerCard(page, first);
  const cdp = await page.context().newCDPSession(page);
  const point = { x: 80, y: 150 };
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [point],
  });
  await page.waitForTimeout(SETTLE_MS);
  const held = await page.evaluate(() => {
    const dive = document.querySelector<HTMLElement>(".dive-lantern")!;
    return [
      parseFloat(dive.style.getPropertyValue("--lx")),
      parseFloat(dive.style.getPropertyValue("--ly")),
    ];
  });
  await shot(page, dir, "30-tactil-dedo");
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await page.waitForTimeout(SETTLE_MS * 1.5);
  const card = await readCard(page, first);
  check(
    Math.abs(held[0]! - point.x) < 12 && Math.abs(held[1]! - point.y) < 12,
    `${label} táctil: la linterna sigue al dedo mientras toca`,
  );
  check(card.lit, `${label} táctil: sin contacto vuelve a la placa activa`);
  await shot(page, dir, "31-tactil-sin-contacto");
}

async function checkFilters(page: Page, label: string) {
  await diveTo(page, 0);
  const cards = page.getByTestId("dive-list").locator(".dive-card");
  await page.getByTestId("filter-academic").click();
  await page.waitForTimeout(SETTLE_MS);
  const academic = await cards.count();
  const firstDepth = await cards.first().locator(".dive-card-depth").textContent();
  const live = await page.locator(".dive [aria-live]").textContent();
  await page.getByTestId("filter-work").click();
  const work = await cards.count();
  await page.getByTestId("filter-all").click();
  check(
    academic > 0 && work > 0 && academic + work === IDS.length,
    `${label}: filtros ${academic} académicas + ${work} laborales`,
  );
  check(firstDepth === "−60 m", `${label}: al filtrar, las profundidades se recalculan`);
  check(
    live === `Mostrando ${academic} de ${IDS.length} experiencias`,
    `${label}: aria-live anuncia "${live}"`,
  );
}

async function checkBack(page: Page, label: string) {
  await diveTo(page, 1);
  await page.getByTestId("back-to-surface").click();
  await page.waitForTimeout(2500);
  const top = await page.evaluate(
    () => document.querySelector(".dive")!.getBoundingClientRect().top,
  );
  check(
    Math.abs(top) < 4,
    `${label}: "Volver a la superficie" sube al inicio (${top.toFixed(0)} px)`,
  );
}

/**
 * Tareas largas mientras se baja con la rueda por toda la inmersión (no cuenta la carga
 * de la página ni los saltos de scroll de las capturas).
 */
async function checkScrollTasks(page: Page, viewport: Viewport) {
  await diveTo(page, 0);
  await page.mouse.move(viewport.width / 2, viewport.height / 2);
  await page.evaluate(() => {
    (window as unknown as { __long: number }).__long = 0;
  });
  const span = await page.evaluate(
    () => document.querySelector<HTMLElement>(".dive")!.offsetHeight - innerHeight,
  );
  const steps = Math.ceil(span / WHEEL_PX);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, WHEEL_PX);
    await page.waitForTimeout(WHEEL_PAUSE_MS);
  }
  await page.waitForTimeout(SETTLE_MS);
  return (await metrics(page)).long;
}

async function runViewport(browser: Browser, viewport: Viewport) {
  const dir = path.join(OUT_DIR, viewport.name);
  await mkdir(dir, { recursive: true });
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.scale,
    isMobile: viewport.touch,
    hasTouch: viewport.touch,
  });
  await watchPerformance(page);
  await page.goto(`${BASE_URL}/#experiencia`, { waitUntil: "networkidle" });
  const label = viewport.name;
  await page.waitForTimeout(SETTLE_MS);
  const long = viewport.touch ? 0 : await checkScrollTasks(page, viewport);
  await checkOrder(page, label);
  await walk(page, dir, label, false);
  if (viewport.touch) await checkTouch(page, dir, label);
  else await checkKeyboard(page, dir, label);
  await checkFilters(page, label);
  await checkBack(page, label);
  await checkLights(page, label);
  await walk(page, dir, label, true);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  const { cls } = await metrics(page);
  // Bytes transferidos del arte de la sección (capas del lago y piezas del abismo)
  const artBytes = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .filter((entry) => /\/art\/(abyss|lake)\//.test(decodeURIComponent(entry.name)))
      .reduce(
        (sum, entry) => sum + (entry as PerformanceResourceTiming).encodedBodySize,
        0,
      ),
  );
  check(overflow <= 0, `${label}: sin scroll horizontal (${overflow}px)`);
  check(cls <= MAX_CLS, `${label}: CLS ${cls.toFixed(3)}`);
  if (!viewport.touch) {
    check(
      long === 0,
      `${label}: ${long} tareas largas (> ${LONG_TASK_MS} ms) al bajar con la rueda`,
    );
  }
  check(
    artBytes < MAX_ART_BYTES,
    `${label}: arte de la sección ${(artBytes / 1024).toFixed(0)} KB`,
  );
  await page.close();
}

/** Sin JS y con movimiento reducido: lista vertical legible, sin escenario fijo. */
async function checkFallbacks(browser: Browser) {
  const dir = path.join(OUT_DIR, "alternativa");
  await mkdir(dir, { recursive: true });
  for (const [name, options] of [
    ["sin-js", { javaScriptEnabled: false }],
    ["movimiento-reducido", { reducedMotion: "reduce" as const }],
  ] as const) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      ...options,
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/#experiencia`, { waitUntil: "networkidle" });
    await page.waitForTimeout(SETTLE_MS);
    const state = await page.evaluate(() => ({
      stage: getComputedStyle(document.querySelector(".dive-stage")!).display,
      cards: document.querySelectorAll(".dive-card").length,
      hidden: [
        ...document.querySelectorAll(".dive .stagger-item, .dive-card-achievements"),
      ].filter((element) => getComputedStyle(element).opacity !== "1").length,
    }));
    check(
      state.stage === "none" && state.cards === IDS.length && state.hidden === 0,
      `${name}: sin escenario fijo y las 6 placas legibles`,
    );
    await page
      .locator("#experiencia")
      .screenshot({ path: path.join(dir, `${name}.png`) });
    await context.close();
  }
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  for (const viewport of VIEWPORTS) await runViewport(browser, viewport);
  await checkFallbacks(browser);
  await browser.close();
  if (failures.length > 0) {
    console.error(`\n${failures.length} comprobaciones fallaron`);
    process.exit(1);
  }
  console.log(`\nTodo en orden. Capturas en ${OUT_DIR}`);
}

void run();
