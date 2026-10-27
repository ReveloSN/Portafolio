/**
 * Capturas de la primera pantalla en una matriz de tamaños + verificaciones de layout.
 *
 * Uso:  npm run build && npm start   (en otra terminal)
 *       npm run screenshots           (BASE_URL=http://localhost:3000 por defecto)
 *
 * Termina con código 1 si algún tamaño falla.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";

interface ViewportCase {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly scale?: number;
  readonly mobile?: boolean;
}

const VIEWPORTS: readonly ViewportCase[] = [
  { name: "1280x575-win150", width: 1280, height: 575, scale: 1.5 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1536x730", width: 1536, height: 730 },
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "2560x1080", width: 2560, height: 1080 },
  { name: "2560x1440", width: 2560, height: 1440 },
  { name: "3440x1440-ultrawide", width: 3440, height: 1440 },
  { name: "820x1180-tablet", width: 820, height: 1180, mobile: true },
  { name: "390x844-mobile", width: 390, height: 844, mobile: true, scale: 3 },
  { name: "360x640-mobile", width: 360, height: 640, mobile: true, scale: 2 },
  { name: "844x390-landscape", width: 844, height: 390, mobile: true, scale: 3 },
];

/** Elementos del Hero que deben verse completos en la primera pantalla. */
const MUST_BE_VISIBLE = [
  "hero-title",
  "hero-cta-primary",
  "hero-cta-secondary",
  "hero-canoe",
];

/** Primera pantalla de cada página de mundo. */
const WORLD_SLUGS = ["selva", "oceano", "cueva"] as const;
const WORLD_MUST_BE_VISIBLE = ["world-title", "world-cta-code", "world-cta-demo"];

/** Escenas que deben caber completas en el alto visible (sin alejar el zoom). */
const SCENES_FIT = ["lake-scene", "carousel-stage", "egg-nest", "dig-cell"];

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.join(process.cwd(), "screenshots");
const TOLERANCE_PX = 0.5;
const ASSET_TIMEOUT_MS = 8_000;
/** Parte de la cola que puede salir por el borde derecho (fracción del ancho del dino). */
const TAIL_TIP_FRACTION = 0.04;
const SETTLE_MS = 400;

/** Espera fuentes e imágenes visibles; las imágenes diferidas fuera de pantalla no se esperan. */
async function waitForAssets(page: Page) {
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);
  await page.evaluate(
    async ({ timeoutMs }) => {
      await document.fonts.ready;
      const visible = Array.from(document.images).filter((img) => {
        const r = img.getBoundingClientRect();
        return !img.complete && r.bottom > 0 && r.top < window.innerHeight;
      });
      const loads = visible.map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          }),
      );
      await Promise.race([
        Promise.all(loads),
        new Promise((resolve) => setTimeout(resolve, timeoutMs)),
      ]);
    },
    { timeoutMs: ASSET_TIMEOUT_MS },
  );
}

async function checkFirstScreen(
  page: Page,
  ids: readonly string[],
  withTrunks: boolean,
): Promise<string[]> {
  return page.evaluate(
    ({ ids, tolerance, withTrunks, tailTipFraction }) => {
      const errors: string[] = [];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      for (const id of ids) {
        const el = document.querySelector(`[data-testid="${id}"]`);
        if (!el) {
          errors.push(`${id}: no existe`);
          continue;
        }
        const r = el.getBoundingClientRect();
        const inside =
          r.left >= -tolerance &&
          r.top >= -tolerance &&
          r.right <= vw + tolerance &&
          r.bottom <= vh + tolerance;
        if (!inside) {
          errors.push(
            `${id} fuera del viewport (${Math.round(r.left)},${Math.round(r.top)} → ${Math.round(r.right)},${Math.round(r.bottom)})`,
          );
        }
      }
      const scrollX = document.documentElement.scrollWidth - vw;
      if (scrollX > 1) errors.push(`scroll horizontal de ${scrollX}px`);

      const center = (id: string) => {
        const el = document.querySelector(`[data-testid="${id}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.left + r.width / 2;
      };
      if (!withTrunks) return errors;

      // Dinosaurio: completo bajo el navbar (salvo la punta de la cola) y sin tocar el h1
      const dino = document.querySelector('[data-testid="hero-dino"]');
      const title = document.querySelector('[data-testid="hero-title"]');
      if (!dino) errors.push("hero-dino: no existe");
      if (dino && title) {
        const d = dino.getBoundingClientRect();
        const t = title.getBoundingClientRect();
        const rootStyle = getComputedStyle(document.documentElement);
        const navPx =
          parseFloat(rootStyle.getPropertyValue("--nav-h")) *
          parseFloat(rootStyle.fontSize);
        const tailTip = d.width * tailTipFraction;
        if (
          d.left < -tolerance ||
          d.top < navPx - tolerance ||
          d.bottom > vh + tolerance ||
          d.right > vw + tailTip
        ) {
          errors.push(
            `dinosaurio fuera del viewport (${Math.round(d.left)},${Math.round(d.top)} → ${Math.round(d.right)},${Math.round(d.bottom)})`,
          );
        }
        const behindText = window.matchMedia(
          "(max-aspect-ratio: 4/5) and (max-width: 900px)",
        ).matches;
        const overlaps =
          d.left < t.right && t.left < d.right && d.top < t.bottom && t.top < d.bottom;
        if (overlaps && !behindText) errors.push("el dinosaurio se superpone con el h1");
      }
      const left = center("trunk-left");
      const right = center("trunk-right");
      if (left === null || left >= vw / 2)
        errors.push(`tronco izquierdo no está en la mitad izquierda (${left})`);
      if (right === null || right <= vw / 2)
        errors.push(`tronco derecho no está en la mitad derecha (${right})`);
      return errors;
    },
    { ids, tolerance: TOLERANCE_PX, withTrunks, tailTipFraction: TAIL_TIP_FRACTION },
  );
}

async function checkScenesFit(page: Page, name: string): Promise<string[]> {
  const errors: string[] = [];
  for (const id of SCENES_FIT) {
    const locator = page.locator(`[data-testid="${id}"]`).first();
    if ((await locator.count()) === 0) {
      errors.push(`${id}: no existe`);
      continue;
    }
    await locator.scrollIntoViewIfNeeded();
    const fits = await locator.evaluate((el) => {
      const nav =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
        ) || 0;
      const navPx = nav * parseFloat(getComputedStyle(document.documentElement).fontSize);
      const r = el.getBoundingClientRect();
      return {
        height: Math.round(r.height),
        available: Math.round(window.innerHeight - navPx),
      };
    });
    if (fits.height > fits.available) {
      errors.push(`${id} mide ${fits.height}px y solo caben ${fits.available}px`);
    }
    await locator.evaluate((el) =>
      el.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await page.waitForTimeout(SETTLE_MS);
    await page.screenshot({ path: path.join(OUT_DIR, `${name}--${id}.png`) });
  }
  return errors;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const results: { name: string; errors: string[] }[] = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.scale ?? 1,
      isMobile: vp.mobile ?? false,
      hasTouch: vp.mobile ?? false,
      reducedMotion: "reduce",
    });
    // tsx (esbuild) añade __name a las funciones con nombre dentro de page.evaluate
    await context.addInitScript("window.__name = (fn) => fn");
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: "load" });
    await waitForAssets(page);
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}.png`) });

    const errors = [
      ...(await checkFirstScreen(page, MUST_BE_VISIBLE, true)),
      ...(await checkScenesFit(page, vp.name)),
    ];
    for (const slug of WORLD_SLUGS) {
      await page.goto(`${BASE_URL}/mundos/${slug}`, { waitUntil: "load" });
      await waitForAssets(page);
      await page.screenshot({
        path: path.join(OUT_DIR, `${vp.name}--mundo-${slug}.png`),
      });
      const worldErrors = await checkFirstScreen(page, WORLD_MUST_BE_VISIBLE, false);
      errors.push(...worldErrors.map((e) => `mundo ${slug}: ${e}`));
    }
    results.push({ name: vp.name, errors });
    await context.close();
  }
  await browser.close();

  console.log("\nResultado por tamaño:");
  for (const r of results) {
    console.log(`${r.errors.length ? "FALLA" : "OK   "}  ${r.name}`);
    for (const e of r.errors) console.log(`        - ${e}`);
  }
  const failed = results.filter((r) => r.errors.length > 0).length;
  console.log(`\n${results.length - failed}/${results.length} tamaños pasaron.`);
  if (failed > 0) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
