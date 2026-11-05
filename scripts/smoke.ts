/**
 * Smoke test: la portada y las tres páginas de mundo responden 200, cada página de mundo
 * tiene un solo <h1>, la portada enlaza "Descargar CV" a /cv.pdf, una ruta inexistente
 * responde 404 y ninguna página emite console.error ni pageerror.
 *
 * Uso:  npm run dev                                  (otra terminal, puerto 3000)
 *       npm run smoke                                (BASE_URL=http://localhost:3000)
 *       BASE_URL=http://localhost:3300 npm run smoke
 * Sale con código 1 si alguna comprobación falla.
 */
import { chromium, type BrowserContext, type Page } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const NAV_TIMEOUT_MS = 90000;
/** Tiempo máximo de espera a que la red se asiente antes de leer los errores. */
const IDLE_TIMEOUT_MS = 15000;
const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;
const HOME_PATH = "/";
const WORLD_PATHS = [
  "/mundos/selva",
  "/mundos/oceano",
  "/mundos/cueva",
  "/mundos/volcan",
] as const;
const MISSING_PATH = "/mundos/nada";
const CV_HREF = "/cv.pdf";
const CV_LABEL = "Descargar CV";
const EXPECTED_H1_COUNT = 1;
/** Chrome registra como console.error la respuesta 404 esperada; no es un fallo de la página. */
const EXPECTED_404_LOG =
  /Failed to load resource: the server responded with a status of 404/;

const failures: string[] = [];
function check(ok: boolean, message: string) {
  console.log(`${ok ? "  ok " : "  FAIL"} ${message}`);
  if (!ok) failures.push(message);
}

/** Guarda los console.error y los pageerror que emita la página. */
function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

async function checkHome(page: Page) {
  const cvLink = page.locator(`a[href="${CV_HREF}"]`, { hasText: CV_LABEL });
  const count = await cvLink.count();
  check(count > 0, `${HOME_PATH}: enlace "${CV_LABEL}" apunta a ${CV_HREF} (${count})`);
}

async function checkSingleH1(page: Page, path: string) {
  const count = await page.locator("h1").count();
  check(count === EXPECTED_H1_COUNT, `${path}: ${EXPECTED_H1_COUNT} <h1> (hay ${count})`);
}

/** Visita una ruta, valida el estado, ejecuta comprobaciones extra y revisa los errores. */
async function checkPage(
  context: BrowserContext,
  path: string,
  expectedStatus: number,
  extra?: (page: Page, path: string) => Promise<void>,
) {
  const page = await context.newPage();
  const errors = collectErrors(page);
  try {
    const response = await page.goto(`${BASE_URL}${path}`, {
      waitUntil: "load",
      timeout: NAV_TIMEOUT_MS,
    });
    const status = response?.status();
    check(
      status === expectedStatus,
      `${path} responde ${expectedStatus} (recibido ${status ?? "ninguno"})`,
    );
    await page
      .waitForLoadState("networkidle", { timeout: IDLE_TIMEOUT_MS })
      .catch(() => undefined);
    if (extra) await extra(page, path);
  } catch (error) {
    check(false, `${path} no carga: ${error instanceof Error ? error.message : error}`);
  } finally {
    const unexpected = errors.filter(
      (message) => !(expectedStatus === HTTP_NOT_FOUND && EXPECTED_404_LOG.test(message)),
    );
    check(
      unexpected.length === 0,
      `${path}: sin console.error ni pageerror (${unexpected.length})`,
    );
    for (const message of unexpected) console.log(`        ${message}`);
    await page.close();
  }
}

async function run() {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    await checkPage(context, HOME_PATH, HTTP_OK, checkHome);
    for (const path of WORLD_PATHS) {
      await checkPage(context, path, HTTP_OK, checkSingleH1);
    }
    await checkPage(context, MISSING_PATH, HTTP_NOT_FOUND);
    await context.close();
  } finally {
    await browser.close();
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} comprobaciones fallaron en ${BASE_URL}`);
    process.exit(1);
  }
  console.log(`\nSmoke test correcto en ${BASE_URL}`);
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
