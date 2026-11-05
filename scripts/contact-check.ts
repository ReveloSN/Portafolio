/**
 * Comprueba el nido de Contacto y guarda capturas en screenshots/contact/.
 *
 * Uso:  npm run build && npm start   (en otra terminal)
 *       npm run contact:check         (BASE_URL=http://localhost:3000 por defecto)
 *
 * Eclosiona los tres huevos con ratón, teclado y toque; mira que el correo lleve el
 * foco al formulario, que los enlaces visibles sean los de los datos, que nada tape
 * rótulos ni botones y que no haya scroll horizontal, errores de hidratación ni CLS.
 * Termina con código 1 si algo falla.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import {
  chromium,
  type Browser,
  type BrowserContextOptions,
  type Page,
} from "playwright";
import { CHANNEL_ORDER, CONTACT_CHANNELS } from "../data/contactChannels";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "screenshots/contact";
const ART_DIR = "public/art/contact";
const MAX_ART_BYTES = 1.5 * 1024 * 1024;
const HATCH_WAIT_MS = 1600;
const CRACKING_AT_MS = 520;
/** Ya salió la cría: se congela el vuelo de las cáscaras a esta altura (ms). */
const BURST_AT_MS = 900;
const FLIGHT_FREEZE_MS = 300;
const REDUCED_WAIT_MS = 450;
const MAX_CLS = 0.1;

interface ViewportCase {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly mobile?: boolean;
}

const VIEWPORTS: readonly ViewportCase[] = [
  { name: "1280x575", width: 1280, height: 575 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "390x844", width: 390, height: 844, mobile: true },
];

const failures: string[] = [];
const check = (ok: boolean, message: string) => {
  if (!ok) failures.push(message);
  console.log(`${ok ? "ok " : "FALLA"}  ${message}`);
};

async function open(
  browser: Browser,
  viewport: ViewportCase,
  extra: BrowserContextOptions = {},
) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.mobile,
    hasTouch: viewport.mobile,
    ...extra,
  });
  await context.addInitScript(() => {
    sessionStorage.setItem("portafolio:intro-seen", "1");
    // CLS de toda la visita
    (window as unknown as { __cls: number }).__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & {
        value: number;
        hadRecentInput: boolean;
      })[]) {
        if (!entry.hadRecentInput)
          (window as unknown as { __cls: number }).__cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await page.locator('[data-testid="egg-nest"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  return { context, page, errors };
}

const shot = (page: Page, name: string) =>
  page.locator("#contacto").screenshot({ path: path.join(OUT, `${name}.png`) });

/**
 * Captura la eclosión con las cáscaras en el aire: la captura tarda más que el vuelo,
 * así que se congelan las animaciones del huevo en ese instante y luego se reanudan.
 */
async function burstShot(page: Page, id: string, name: string) {
  await page.getByTestId(`egg-${id}`).evaluate((egg, at) => {
    for (const animation of egg.getAnimations({ subtree: true })) {
      animation.pause();
      animation.currentTime = at;
    }
  }, FLIGHT_FREEZE_MS);
  await shot(page, name);
  await page.getByTestId(`egg-${id}`).evaluate((egg) => {
    for (const animation of egg.getAnimations({ subtree: true })) animation.play();
  });
}

/** Ningún rótulo ni botón queda tapado: en su centro, lo primero que hay es él mismo. */
async function nothingCovers(page: Page, label: string) {
  // Cada destino se trae a la vista: fuera de la ventana elementFromPoint no ve nada
  const blocked = await page.evaluate(() => {
    const targets = [
      ...document.querySelectorAll('[data-testid^="link-"], [data-testid^="hatch-"]'),
    ];
    return targets.flatMap((el) => {
      el.scrollIntoView({ block: "center", behavior: "instant" });
      const r = el.getBoundingClientRect();
      if (r.width === 0) return [];
      const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
      return hit && (el === hit || el.contains(hit))
        ? []
        : [
            `${el.getAttribute("data-testid")}<${hit ? hit.className || hit.tagName : "nada"}>`,
          ];
    });
  });
  check(
    blocked.length === 0,
    `${label}: nada tapa rótulos ni botones ${blocked.join(" ")}`,
  );
}

async function layout(page: Page, label: string) {
  // Sin funciones con nombre dentro de evaluate: tsx les añade un ayudante que el
  // navegador no tiene
  const info = await page.evaluate(() => {
    const nest = document
      .querySelector('[data-testid="egg-nest"]')
      ?.getBoundingClientRect();
    const form = document.querySelector("#contacto form")?.getBoundingClientRect();
    return {
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      inside: [nest, form].every((r) => r && r.left >= 0 && r.right <= window.innerWidth),
      hatchlings: [
        ...document.querySelectorAll(
          ".nest-slot[data-phase=hatched] .nest-hatchling img",
        ),
      ]
        .map((img) => img.getBoundingClientRect())
        .map((r) => [r.left, r.right]),
    };
  });
  check(!info.overflow, `${label}: sin scroll horizontal`);
  check(info.inside, `${label}: nido y formulario completos a lo ancho`);
  const spans = info.hatchlings.sort((a, b) => a[0]! - b[0]!);
  const overlap = spans.some((span, i) => i > 0 && span[0]! < spans[i - 1]![1]!);
  check(!overlap, `${label}: las crías no se solapan`);
}

async function hatchAll(
  page: Page,
  viewport: ViewportCase,
  method: "raton" | "teclado" | "toque",
) {
  const label = `${viewport.name} ${method}`;
  for (const id of CHANNEL_ORDER) {
    const egg = page.getByTestId(`egg-${id}`);
    if (method === "raton") await egg.click();
    if (method === "toque") await egg.tap();
    if (method === "teclado") {
      await egg.focus();
      await page.keyboard.press(id === "github" ? "Space" : "Enter");
    }
    if (method === "raton" && viewport.name === "1440x900") {
      await page.waitForTimeout(CRACKING_AT_MS);
      await shot(page, `${viewport.name}-agrietandose-${id}`);
      await page.waitForTimeout(BURST_AT_MS - CRACKING_AT_MS);
      await burstShot(page, id, `${viewport.name}-eclosion-${id}`);
      await page.waitForTimeout(HATCH_WAIT_MS - BURST_AT_MS);
    } else await page.waitForTimeout(HATCH_WAIT_MS);
    const channel = CONTACT_CHANNELS[id];
    check(
      (await egg.getAttribute("aria-pressed")) === "true",
      `${label}: ${id} eclosiona`,
    );
    const status = await page.locator('#contacto [role="status"]').last().textContent();
    check(
      status?.includes(`Salió la cría de ${channel.label}`) ?? false,
      `${label}: aria-live de ${id}`,
    );
    if (channel.action === "focusForm") {
      const focused = await page.evaluate(() => document.activeElement?.id);
      check(focused === "f-name", `${label}: el correo lleva el foco al formulario`);
    } else {
      const link = page.getByTestId("hatch-link");
      check(
        (await link.getAttribute("href")) === channel.href,
        `${label}: botón Abrir ${channel.label}`,
      );
      check(
        (await link.getAttribute("target")) === "_blank",
        `${label}: ${id} abre en otra pestaña`,
      );
    }
  }
  await layout(page, label);
  await nothingCovers(page, label);
  await shot(page, `${viewport.name}-final-${method}`);
  await page.getByTestId("hatch-reset").click();
  const reset = await page
    .getByTestId(`egg-${CHANNEL_ORDER[0]}`)
    .evaluate((el) => el === document.activeElement);
  check(reset, `${label}: "Volver a los huevos" reinicia y devuelve el foco`);
}

async function links(page: Page, label: string) {
  for (const id of CHANNEL_ORDER) {
    const href = await page.getByTestId(`link-${id}`).getAttribute("href");
    check(href === CONTACT_CHANNELS[id].href, `${label}: enlace visible de ${id}`);
  }
}

async function artWeight() {
  let total = 0;
  for (const dir of await readdir(ART_DIR)) {
    for (const file of await readdir(path.join(ART_DIR, dir))) {
      total += (await stat(path.join(ART_DIR, dir, file))).size;
    }
  }
  check(
    total < MAX_ART_BYTES,
    `arte de Contacto: ${Math.round(total / 1024)} KB (< 1,5 MB)`,
  );
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await artWeight();
  const browser = await chromium.launch();
  for (const viewport of VIEWPORTS) {
    const methods = viewport.mobile
      ? (["toque"] as const)
      : (["raton", "teclado"] as const);
    for (const method of methods) {
      const { context, page, errors } = await open(browser, viewport);
      if (method !== "teclado") await shot(page, `${viewport.name}-reposo`);
      await layout(page, `${viewport.name} reposo`);
      await nothingCovers(page, `${viewport.name} reposo`);
      await links(page, viewport.name);
      await hatchAll(page, viewport, method);
      const cls = await page.evaluate(
        () => (window as unknown as { __cls: number }).__cls,
      );
      check(cls < MAX_CLS, `${viewport.name} ${method}: CLS ${cls.toFixed(3)}`);
      check(
        errors.length === 0,
        `${viewport.name} ${method}: sin errores de consola ${errors.join(" | ")}`,
      );
      await context.close();
    }
  }
  // Movimiento reducido: el huevo da paso a la cría con un fundido corto
  const { context, page } = await open(browser, VIEWPORTS[1]!, {
    reducedMotion: "reduce",
  });
  await page.getByTestId("egg-linkedin").click();
  await page.waitForTimeout(REDUCED_WAIT_MS);
  const shells = await page
    .locator('[data-testid="egg-linkedin"] .nest-shell')
    .first()
    .isVisible();
  check(!shells, "movimiento reducido: sin cáscaras");
  check(
    (await page.getByTestId("egg-linkedin").getAttribute("aria-pressed")) === "true",
    "movimiento reducido: sale la cría",
  );
  await shot(page, "1440x900-movimiento-reducido");
  await context.close();
  await browser.close();
  if (failures.length) {
    console.error(`\n${failures.length} comprobaciones fallaron`);
    process.exit(1);
  }
  console.log("\nTodo en orden.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
