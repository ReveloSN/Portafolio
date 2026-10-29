/**
 * Capturas y comprobaciones de la sección "Sobre mí": cabe en una pantalla,
 * el encabezado de la credencial no se parte y la tarjeta gira (hover, toque y teclado).
 *
 * Uso:  npm run dev                  (en otra terminal)
 *       npm run about -- before      (o "after"; BASE_URL=http://localhost:3000)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, mobile: false },
  { name: "1366x768", width: 1366, height: 768, mobile: false },
  { name: "1440x900", width: 1440, height: 900, mobile: false },
  { name: "1690x780", width: 1690, height: 780, mobile: false },
  { name: "1920x1080", width: 1920, height: 1080, mobile: false },
  { name: "2560x1080", width: 2560, height: 1080, mobile: false },
  { name: "390x844", width: 390, height: 844, mobile: true },
] as const;

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const SECTION = "#sobre-mi";
const FLIP = "[data-testid=flip-card]";
/** A partir de este ancho la sección debe caber en una pantalla. */
const FIT_MIN_WIDTH = 1024;
const SETTLE_MS = 2600;
const FLIP_MS = 1000;

type Viewport = (typeof VIEWPORTS)[number];

async function openAbout(
  browser: Browser,
  vp: Viewport,
  options: { touch?: boolean; reducedMotion?: boolean } = {},
) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.mobile,
    hasTouch: vp.mobile || options.touch === true,
    reducedMotion: options.reducedMotion ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "load" });
  await page.evaluate((sel) => {
    const top = document.querySelector(sel)?.getBoundingClientRect().top ?? 0;
    window.scrollTo({ top: window.scrollY + top, behavior: "instant" });
  }, SECTION);
  await page.waitForTimeout(SETTLE_MS);
  return { context, page };
}

/** Medidas que delatan cortes: alto de la sección, tarjeta y líneas del encabezado. */
async function measure(page: Page) {
  return page.evaluate(
    ({ section, flip }) => {
      const sec = document.querySelector(section)?.getBoundingClientRect();
      const card = (
        document.querySelector(flip) ?? document.querySelector(`${section} .-rotate-3`)
      )?.getBoundingClientRect();
      // Sin funciones con nombre: tsx inyecta __name, que no existe en la página
      const headers = Array.from(document.querySelectorAll("[data-testid=card-header]"));
      // Líneas reales de cada bloque (un span partido tiene varios rectángulos)
      const header = Math.max(
        -1,
        ...headers.flatMap((h) =>
          Array.from(h.children).map((span) => span.getClientRects().length),
        ),
      );
      const headerOverflow = headers.some((h) => h.scrollWidth > h.clientWidth + 1);
      const [title] = [document.querySelector(`${section} h2`)].map((el) =>
        el
          ? Math.round(
              el.getBoundingClientRect().height /
                (parseFloat(getComputedStyle(el).lineHeight) || 16),
            )
          : -1,
      );
      const content = document.querySelector(`${section} > div`)?.getBoundingClientRect();
      return {
        sectionH: Math.round(sec?.height ?? 0),
        contentBottom: Math.round(content?.bottom ?? 0),
        cardBottom: Math.round(card?.bottom ?? 0),
        title,
        header,
        headerOverflow,
        overflowX:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    },
    { section: SECTION, flip: FLIP },
  );
}

/** Teclado: Enter y Espacio giran, Escape vuelve, la cara oculta no recibe foco. */
async function keyboardChecks(page: Page): Promise<string[]> {
  const errors: string[] = [];
  const pressed = () => page.getAttribute(FLIP, "aria-pressed");
  await page.focus(FLIP);
  await page.keyboard.press("Enter");
  if ((await pressed()) !== "true") errors.push("Enter no gira");
  await page.keyboard.press("Escape");
  if ((await pressed()) !== "false") errors.push("Escape no vuelve al frente");
  await page.keyboard.press("Space");
  if ((await pressed()) !== "true") errors.push("Espacio no gira");
  const hiddenFocusable = await page.evaluate((flip) => {
    const hidden = document.querySelector(`${flip} .flip-face[aria-hidden=true]`);
    return Boolean(hidden && !hidden.hasAttribute("inert"));
  }, FLIP);
  if (hiddenFocusable) errors.push("la cara oculta no es inert");
  await page.keyboard.press("Tab");
  const leaked = await page.evaluate(
    (flip) =>
      Boolean(document.activeElement?.closest(`${flip} .flip-face[aria-hidden=true]`)),
    FLIP,
  );
  if (leaked) errors.push("el foco entró en la cara oculta");
  await page.keyboard.press("Escape");
  return errors;
}

/** Pantalla táctil del mismo tamaño: el toque gira la tarjeta sin depender del hover. */
async function touchBack(browser: Browser, vp: Viewport, outDir: string) {
  const { context, page } = await openAbout(browser, vp, { touch: true });
  await page.tap(FLIP);
  await page.waitForTimeout(FLIP_MS);
  await page.screenshot({ path: path.join(outDir, `about-${vp.name}-back-tap.png`) });
  const flipped = (await page.getAttribute(FLIP, "aria-pressed")) === "true";
  await context.close();
  return flipped ? [] : ["no gira con toque"];
}

/** Movimiento reducido: sin rotación 3D, el reverso aparece por opacidad. */
async function reducedMotionChecks(browser: Browser, vp: Viewport): Promise<string[]> {
  const { context, page } = await openAbout(browser, vp, { reducedMotion: true });
  await page.focus(FLIP);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(FLIP_MS);
  const state = await page.evaluate((flip) => {
    const inner = document.querySelector(`${flip} .flip-inner`);
    const back = document.querySelector(`${flip} .flip-face-back`);
    const front = document.querySelector(`${flip} .flip-face-front`);
    return {
      inner: inner ? getComputedStyle(inner).transform : "",
      back: back ? getComputedStyle(back).opacity : "",
      front: front ? getComputedStyle(front).opacity : "",
    };
  }, FLIP);
  await context.close();
  // rotateY(180deg) deja la escala X negativa en la matriz
  const rotated = /^matrix(3d)?\(-/.test(state.inner);
  const faded = state.back === "1" && state.front === "0";
  return [
    ...(rotated ? ["con movimiento reducido sigue girando en 3D"] : []),
    ...(faded ? [] : ["con movimiento reducido no cambia de cara por opacidad"]),
  ];
}

async function main() {
  const label = process.argv[2] ?? "after";
  const outDir = path.join(process.cwd(), "screenshots", label);
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ ignoreDefaultArgs: ["--hide-scrollbars"] });
  let failures = 0;

  for (const vp of VIEWPORTS) {
    const { context, page } = await openAbout(browser, vp);
    const shot = (suffix: string) =>
      page.screenshot({ path: path.join(outDir, `about-${vp.name}${suffix}.png`) });
    await shot("");
    const m = await measure(page);
    const fits = vp.width < FIT_MIN_WIDTH || m.sectionH <= vp.height;
    const problems: string[] = [];
    if (!fits) problems.push(`sección ${m.sectionH}px > ${vp.height}px`);
    if (m.overflowX > 0) problems.push(`scroll horizontal ${m.overflowX}px`);
    if (m.header > 1) problems.push(`encabezado en ${m.header} líneas`);
    if (m.headerOverflow) problems.push("el encabezado se sale de la tarjeta");

    const flip = await page.$(FLIP);
    if (flip) {
      await page
        .locator(`${FLIP} [data-testid=card-header]`)
        .first()
        .screenshot({
          path: path.join(outDir, `about-${vp.name}-header.png`),
        });
      if (vp.mobile) await page.tap(FLIP);
      else await page.hover(FLIP);
      await page.waitForTimeout(FLIP_MS);
      await shot(vp.mobile ? "-back-tap" : "-back-hover");
      if ((await page.getAttribute(FLIP, "aria-pressed")) !== "true")
        problems.push("no gira con hover/toque");
      if (vp.mobile) await page.tap(FLIP);
      else await page.mouse.move(2, 2);
      await page.waitForTimeout(FLIP_MS);
      if (!vp.mobile) problems.push(...(await keyboardChecks(page)));
    }
    if (flip && !vp.mobile) problems.push(...(await touchBack(browser, vp, outDir)));
    if (flip && vp.name === "1440x900")
      problems.push(...(await reducedMotionChecks(browser, vp)));
    console.log(`${vp.name}: ${JSON.stringify(m)} ${problems.join("; ") || "ok"}`);
    if (problems.length) failures += 1;
    await context.close();
  }
  await browser.close();
  if (failures > 0) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
