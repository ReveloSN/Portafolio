/**
 * Capturas por tema (claro y oscuro) en escritorio y móvil, más comprobaciones:
 * el tema arranca desde prefers-color-scheme y respeta la elección guardada, no hay
 * scroll horizontal ni errores de consola, el fósil encaja con arrastre y con teclado
 * y la sección de habilidades no muestra porcentajes ni barras.
 *
 * Uso:  npm run build && npm start   (en otra terminal)
 *       npm run theme:shots           (BASE_URL=http://localhost:3000 por defecto)
 *
 * Capturas en screenshots/themes/. Termina con código 1 si algo falla.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.join(process.cwd(), "screenshots", "themes");
const SETTLE_MS = 700;
/** Las entradas escalonadas (huellas, tarjetas) tardan hasta ~2,3 s en terminar. */
const REVEAL_MS = 2500;
const THEMES = ["light", "dark"] as const;
type Theme = (typeof THEMES)[number];

const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900, mobile: false, scale: 1 },
  { name: "390x844", width: 390, height: 844, mobile: true, scale: 2 },
] as const;

/** Secciones de la portada, en orden; `footer` es el pie. */
const SECTIONS = [
  "#inicio",
  "#sobre-mi",
  "#proyectos",
  "#testimonios",
  "#experiencia",
  "#habilidades",
  "#contacto",
  "footer",
] as const;

const failures: string[] = [];
const check = (ok: boolean, message: string) => {
  if (!ok) failures.push(message);
};
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrollTo(page: Page, selector: string, offset = 0) {
  await page.evaluate(
    ({ sel, off }) => {
      const el = document.querySelector(sel);
      if (!el) throw new Error(`No existe ${sel}`);
      const top = el.getBoundingClientRect().top + window.scrollY + off;
      window.scrollTo({ top, behavior: "instant" });
    },
    { sel: selector, off: offset },
  );
  await wait(SETTLE_MS);
}

/** Arrastra la primera pieza libre hasta su hueco con el puntero. */
async function dragFirstPiece(page: Page) {
  const target = await page.evaluate(() => {
    const board = document.querySelector("[data-testid=fossil-board]");
    const piece = document.querySelector<HTMLElement>(
      "[data-testid=fossil-piece]:not([data-placed])",
    );
    if (!board || !piece) return null;
    const b = board.getBoundingClientRect();
    const p = piece.getBoundingClientRect();
    const unit = b.width / 1000;
    // La primera pieza es el cráneo: hueco en (62, 112), 140 x 100 unidades
    return {
      from: { x: p.left + p.width / 2, y: p.top + p.height / 2 },
      to: { x: b.left + (62 + 70) * unit, y: b.top + (112 + 50) * unit },
      touchAction: getComputedStyle(piece).touchAction,
    };
  });
  if (!target) return check(false, "No hay piezas del fósil");
  check(target.touchAction === "none", "Las piezas deben tener touch-action: none");
  await page.mouse.move(target.from.x, target.from.y);
  await page.mouse.down();
  await page.mouse.move(target.to.x, target.to.y, { steps: 12 });
  await page.mouse.up();
  await wait(SETTLE_MS);
}

async function progressText(page: Page) {
  return page.locator("[data-testid=fossil-puzzle] [role=group] p").first().textContent();
}

/** Toma la segunda pieza con Enter, la mueve con flechas y la suelta en su hueco. */
async function keyboardSecondPiece(page: Page) {
  const steps = await page.evaluate(() => {
    const board = document.querySelector("[data-testid=fossil-board]")!;
    const piece = document.querySelectorAll<HTMLElement>(
      "[data-testid=fossil-piece]",
    )[1]!;
    const b = board.getBoundingClientRect();
    const p = piece.getBoundingClientRect();
    const unit = b.width / 1000;
    piece.focus();
    // Segunda pieza: el cuello, hueco en (200, 150); paso largo de 48 unidades
    const dx = 200 - (p.left - b.left) / unit;
    const dy = 150 - (p.top - b.top) / unit;
    return { x: Math.round(dx / 48), y: Math.round(dy / 48) };
  });
  await page.keyboard.press("Enter");
  const horizontal = steps.x >= 0 ? "Shift+ArrowRight" : "Shift+ArrowLeft";
  const vertical = steps.y >= 0 ? "Shift+ArrowDown" : "Shift+ArrowUp";
  for (let i = 0; i < Math.abs(steps.x); i++) await page.keyboard.press(horizontal);
  for (let i = 0; i < Math.abs(steps.y); i++) await page.keyboard.press(vertical);
  await page.keyboard.press("Enter");
  await wait(SETTLE_MS);
}

async function runCase(
  browser: Browser,
  viewport: (typeof VIEWPORTS)[number],
  theme: Theme,
) {
  const tag = `${viewport.name}-${theme}`;
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.scale,
    isMobile: viewport.mobile,
    hasTouch: viewport.mobile,
    colorScheme: theme,
  });
  // Sin intro del T-rex: las capturas muestran el contenido
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem("portafolio:intro-seen", "1");
    } catch {}
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  const applied = await page.evaluate(() => document.documentElement.dataset.theme);
  check(
    applied === theme,
    `${tag}: el tema inicial debería seguir al sistema (${applied})`,
  );

  for (const [i, selector] of SECTIONS.entries()) {
    await scrollTo(page, selector);
    await wait(REVEAL_MS);
    const name = selector.replace(/[#]/g, "");
    await page.screenshot({ path: path.join(OUT_DIR, `${tag}-${i + 1}-${name}.png`) });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    check(overflow <= 0, `${tag}: scroll horizontal de ${overflow}px en ${selector}`);
  }

  const skillsText = await page.locator("#habilidades").innerText();
  check(!/\d\s*%/.test(skillsText), `${tag}: Habilidades muestra porcentajes`);
  check(
    (await page.locator("#habilidades [role=progressbar]").count()) === 0,
    `${tag}: Habilidades tiene barras de progreso`,
  );

  await scrollTo(page, "[data-testid=fossil-board]", -120);
  await dragFirstPiece(page);
  check(
    (await progressText(page))?.includes("1 de") ?? false,
    `${tag}: el arrastre no encajó`,
  );
  if (!viewport.mobile) {
    await keyboardSecondPiece(page);
    check(
      (await progressText(page))?.includes("2 de") ?? false,
      `${tag}: el teclado no encajó`,
    );
  }
  await scrollTo(page, "[data-testid=fossil-board]", -120);
  await page.screenshot({ path: path.join(OUT_DIR, `${tag}-5b-fosil-en-juego.png`) });
  await page.getByRole("button", { name: "Armar todo" }).click();
  await wait(SETTLE_MS);
  check(
    (await page
      .locator("[data-testid=fossil-puzzle] [data-testid=experience-list] > li")
      .count()) >= 6,
    `${tag}: al completar falta la lista de experiencia`,
  );
  await scrollTo(page, "[data-testid=fossil-board]", -120);
  await page.screenshot({ path: path.join(OUT_DIR, `${tag}-5c-fosil-completo.png`) });

  await page.goto(`${BASE_URL}/mundos/oceano`, { waitUntil: "networkidle" });
  await wait(SETTLE_MS);
  await page.screenshot({ path: path.join(OUT_DIR, `${tag}-9-mundo-oceano.png`) });

  check(errors.length === 0, `${tag}: errores de consola: ${errors.join(" | ")}`);
  await context.close();
}

/** La elección guardada manda sobre el sistema y se aplica antes del primer pintado. */
async function checkStoredPreference(browser: Browser) {
  const context = await browser.newContext({ colorScheme: "light" });
  await context.addInitScript(() => {
    try {
      localStorage.setItem("portafolio:theme", "dark");
    } catch {}
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  check(theme === "dark", `La preferencia guardada debería mandar (${theme})`);
  await context.close();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) await runCase(browser, viewport, theme);
    }
    await checkStoredPreference(browser);
  } finally {
    await browser.close();
  }
  if (failures.length) {
    console.error(`Fallos (${failures.length}):\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`Todo bien. Capturas en ${path.relative(process.cwd(), OUT_DIR)}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
