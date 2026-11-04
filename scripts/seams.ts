/**
 * Capturas de cada costura entre secciones (la unión queda en el centro de la pantalla).
 *
 * Uso:  npm run build && npm start   (en otra terminal)
 *       npm run seams                (BASE_URL=http://localhost:3000 por defecto)
 *
 * Termina con código 1 si en alguna posición aparece scroll horizontal.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, scale: 1.5, mobile: false },
  { name: "1440x900", width: 1440, height: 900, scale: 1, mobile: false },
  { name: "1920x1080", width: 1920, height: 1080, scale: 1, mobile: false },
  { name: "390x844", width: 390, height: 844, scale: 3, mobile: true },
] as const;

/** Selector de la sección de ABAJO de cada costura. */
const SEAMS = [
  { name: "hero-about", selector: "#sobre-mi" },
  { name: "about-proyectos", selector: "#proyectos" },
  { name: "proyectos-testimonios", selector: "#testimonios" },
  { name: "testimonios-experiencia", selector: "#experiencia" },
  { name: "experiencia-habilidades", selector: "#habilidades" },
  { name: "contacto-footer", selector: "footer" },
] as const;

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.join(process.cwd(), "screenshots", "seams");
const SETTLE_MS = 900;

async function scrollSeamToCenter(page: Page, selector: string) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) throw new Error(`No existe ${sel}`);
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - window.innerHeight / 2, behavior: "instant" });
  }, selector);
  await page.waitForTimeout(SETTLE_MS);
  // Espera las ilustraciones diferidas que acaban de entrar en pantalla
  await page.evaluate(async () => {
    const pending = Array.from(document.images).filter((img) => {
      const r = img.getBoundingClientRect();
      return !img.complete && r.bottom > 0 && r.top < window.innerHeight;
    });
    await Promise.all(
      pending.map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          }),
      ),
    );
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const errors: string[] = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.scale,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
    });
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: "load" });
    for (const seam of SEAMS) {
      await scrollSeamToCenter(page, seam.selector);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      if (overflow > 1)
        errors.push(`${vp.name} ${seam.name}: scroll horizontal de ${overflow}px`);
      await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}--${seam.name}.png`) });
    }
    await context.close();
  }
  await browser.close();

  console.log(`Capturas en ${OUT_DIR}`);
  if (errors.length) {
    errors.forEach((e) => console.log(`FALLA  ${e}`));
    process.exit(1);
  }
  console.log("Sin scroll horizontal en ninguna costura.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
