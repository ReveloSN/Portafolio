/**
 * Prueba de punta a punta del lago de pesca: juega partidas completas solo con teclado,
 * en modo relajado y en modo desafío, comprueba que el contador llega a 6/6 y guarda una
 * captura de cada fase en cada tamaño de ventana.
 *
 * Uso:  npm run build && npm start       (en otra terminal)
 *       npm run fishing                   (BASE_URL=http://localhost:3000)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, scale: 1, mobile: false },
  { name: "1440x900", width: 1440, height: 900, scale: 1, mobile: false },
  { name: "390x844", width: 390, height: 844, scale: 2, mobile: true },
] as const;

type Mode = "relaxed" | "challenge";
type Depth = "shore" | "mid" | "deep";
const MODES: readonly Mode[] = ["relaxed", "challenge"];

/** Orden de captura (data/creatures.ts): el megalodón exige 4 capturas antes. */
const PLAN: readonly { creature: string; bait: string; depth: Depth }[] = [
  { creature: "lepidotes", bait: "Lombriz", depth: "shore" },
  { creature: "ammonite", bait: "Luciérnaga", depth: "shore" },
  { creature: "coelacanth", bait: "Pececillo", depth: "mid" },
  { creature: "ichthyosaur", bait: "Luciérnaga", depth: "mid" },
  { creature: "mosasaur", bait: "Pececillo", depth: "deep" },
  { creature: "megalodon", bait: "Luciérnaga", depth: "deep" },
];

/** Fuerza (aria-valuenow, %) a la que se suelta para caer en el centro de cada zona. */
const RELEASE_AT: Readonly<Record<Depth, readonly [number, number]>> = {
  shore: [8, 26],
  mid: [42, 58],
  deep: [76, 92],
};
/** El jugador automático mantiene la tensión entre estos dos valores (%). */
const TENSION_LOW = 44;
const TENSION_HIGH = 54;
const MAX_ATTEMPTS = 8;
const TOTAL = PLAN.length;
const BITE_TIMEOUT_MS = 9000;
const FIGHT_SNAPSHOT_MS = 1200;
const TAP_GAP_MS = 80;
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.join("screenshots", "fishing");

const failures: string[] = [];
function check(ok: boolean, message: string) {
  console.log(`${ok ? "  ok " : "  FAIL"} ${message}`);
  if (!ok) failures.push(message);
}

const phaseOf = (page: Page) =>
  page.evaluate(
    () => document.querySelector<SVGElement>(".lakesvg")?.dataset.phase ?? "",
  );

const countOf = async (page: Page) =>
  (await page.getByTestId("catch-count").textContent()) ?? "";

function waitPhase(page: Page, phases: readonly string[], timeout = BITE_TIMEOUT_MS) {
  return page.waitForFunction(
    (wanted) =>
      wanted.includes(
        document.querySelector<SVGElement>(".lakesvg")?.dataset.phase ?? "",
      ),
    phases,
    { timeout, polling: 30 },
  );
}

/** Guarda una captura del juego la primera vez que aparece cada fase. */
function snapper(page: Page, dir: string, prefix: string) {
  const seen = new Set<string>();
  return async (name: string) => {
    if (seen.has(name)) return;
    seen.add(name);
    const file = path.join(
      dir,
      `${prefix}-${String(seen.size).padStart(2, "0")}-${name}.png`,
    );
    await page.getByTestId("fishing-game").screenshot({ path: file });
  };
}

async function setMode(page: Page, mode: Mode) {
  const toggle = page.getByTestId("relaxed-toggle");
  const relaxed = (await toggle.getAttribute("aria-checked")) === "true";
  if (relaxed !== (mode === "relaxed")) await toggle.click();
}

async function cast(page: Page, depth: Depth, snap: (name: string) => Promise<void>) {
  await page.getByTestId("fishing-action").focus();
  await page.keyboard.down("Space");
  await page.waitForFunction(
    ([lo, hi]) => {
      const bar = document.querySelector("[data-testid=cast-power] [role=progressbar]");
      const value = Number(bar?.getAttribute("aria-valuenow"));
      return value >= lo && value <= hi;
    },
    RELEASE_AT[depth],
    { polling: "raf", timeout: 10_000 },
  );
  await snap("casting");
  await page.keyboard.up("Space");
}

async function fightChallenge(page: Page, snap: (name: string) => Promise<void>) {
  let holding = true;
  const started = Date.now();
  for (;;) {
    const { phase, tension } = await page.evaluate(() => ({
      phase: document.querySelector<SVGElement>(".lakesvg")?.dataset.phase ?? "",
      tension: Number(
        document
          .querySelector("[data-testid=tension-meter]")
          ?.getAttribute("aria-valuenow") ?? 0,
      ),
    }));
    if (phase !== "fighting") break;
    if (Date.now() - started > FIGHT_SNAPSHOT_MS) await snap("fighting");
    if (holding && tension > TENSION_HIGH) {
      await page.keyboard.up("Space");
      holding = false;
    } else if (!holding && tension < TENSION_LOW) {
      await page.keyboard.down("Space");
      holding = true;
    }
  }
  if (holding) await page.keyboard.up("Space");
}

async function fightRelaxed(page: Page, snap: (name: string) => Promise<void>) {
  await page.keyboard.up("Space");
  await snap("fighting");
  while ((await phaseOf(page)) === "fighting") {
    await page.keyboard.press("Space");
    await page.waitForTimeout(TAP_GAP_MS);
  }
}

/** Una partida completa: cada criatura con su carnada y zona; reintenta si se escapa. */
async function playGame(page: Page, mode: Mode, snap: (name: string) => Promise<void>) {
  await setMode(page, mode);
  await snap("idle");
  for (const step of PLAN) {
    let caught = false;
    for (let attempt = 0; attempt < MAX_ATTEMPTS && !caught; attempt++) {
      await page.getByRole("button", { name: step.bait, exact: true }).click();
      await cast(page, step.depth, snap);
      await snap("waiting");
      const bit = await waitPhase(page, ["bite", "escaped"]).then(
        () => true,
        () => false,
      );
      if (!bit) {
        const status = await page.getByTestId("fishing-status").textContent();
        console.log(`    sin picada: fase ${await phaseOf(page)} · ${status}`);
        await page.getByTestId("fishing-game").screenshot({
          path: path.join(
            "screenshots",
            "fishing",
            `stuck-${mode}-${step.creature}-${attempt}.png`,
          ),
        });
        continue;
      }
      if ((await phaseOf(page)) !== "bite") {
        await snap("escaped");
        continue;
      }
      await snap("bite");
      await page.getByTestId("fishing-action").focus();
      await page.keyboard.down("Space");
      await waitPhase(page, ["fighting", "caught", "complete"]);
      if (mode === "challenge") await fightChallenge(page, snap);
      else await fightRelaxed(page, snap);
      const phase = await phaseOf(page);
      caught = phase === "caught" || phase === "complete";
      await snap(caught ? (phase === "complete" ? "complete" : "caught") : phase);
    }
    check(caught, `${mode}: capturado ${step.creature}`);
    if (!caught) return;
  }
  await page.waitForTimeout(3500);
  await snap("complete-canoe");
}

/** El diario se lee sin jugar, filtra por tipo y responde a "Sacar todo" y "Reiniciar". */
async function checkJournal(page: Page, dir: string) {
  const journal = page.getByTestId("experience-journal");
  const cards = journal.locator(".jcard");
  check(
    (await cards.count()) === TOTAL,
    `diario visible sin jugar: ${await cards.count()} entradas`,
  );
  await page.getByTestId("filter-work").click();
  const work = await cards.count();
  await page.getByTestId("filter-academic").click();
  const academic = await cards.count();
  check(
    work > 0 && academic > 0 && work + academic === TOTAL,
    `filtros: ${work} laborales + ${academic} académicas`,
  );
  await journal.screenshot({ path: path.join(dir, "journal-filter-academic.png") });
  await page.getByTestId("filter-all").click();
  await journal.screenshot({ path: path.join(dir, "journal-pending.png") });

  await page.getByTestId("reveal-all").click();
  check(
    (await countOf(page)) === String(TOTAL),
    `Sacar todo: ${await countOf(page)}/${TOTAL}`,
  );
  await page.waitForTimeout(1000);
  const flipped = await journal.locator(".jcard[data-flipped]").count();
  check(flipped === TOTAL, `Sacar todo voltea las tarjetas: ${flipped}`);
  await journal.screenshot({ path: path.join(dir, "journal-revealed.png") });
  await page.getByTestId("reset-game").click();
  check((await countOf(page)) === "0", "Reiniciar vuelve a 0");
}

async function checkReducedMotion(browser: import("playwright").Browser) {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.getByTestId("fishing-game").scrollIntoViewIfNeeded();
  const relaxed = await page
    .waitForFunction(
      () =>
        document
          .querySelector("[data-testid=relaxed-toggle]")
          ?.getAttribute("aria-checked") === "true",
      null,
      { timeout: 5000 },
    )
    .then(
      () => true,
      () => false,
    );
  check(relaxed, "prefers-reduced-motion activa el modo relajado");
  await context.close();
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  await checkReducedMotion(browser);
  for (const viewport of VIEWPORTS) {
    console.log(`\n${viewport.name}`);
    const dir = path.join(OUT_DIR, viewport.name);
    await mkdir(dir, { recursive: true });
    for (const mode of MODES) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: viewport.scale,
        isMobile: viewport.mobile,
        hasTouch: viewport.mobile,
      });
      const page = await context.newPage();
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      await page.getByTestId("fishing-game").scrollIntoViewIfNeeded();
      const action = page.getByTestId("fishing-action");

      if (mode === "relaxed") await checkJournal(page, dir);
      const started = Date.now();
      await playGame(page, mode, snapper(page, dir, mode));
      console.log(`  (${mode}: ${Math.round((Date.now() - started) / 1000)} s)`);
      check(
        (await countOf(page)) === String(TOTAL),
        `${mode}: contador ${await countOf(page)}/${TOTAL}`,
      );
      check((await phaseOf(page)) === "complete", `${mode}: fase final complete`);
      check(
        await page.getByTestId("closing-message").isVisible(),
        `${mode}: mensaje de cierre visible`,
      );
      check(
        await action.evaluate((el) => el === document.activeElement),
        `${mode}: el foco sigue en el botón de acción`,
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      check(overflow <= 0, `${mode}: sin scroll horizontal (${overflow}px)`);
      await context.close();
    }
  }
  await browser.close();
  if (failures.length > 0) {
    console.error(`\n${failures.length} comprobaciones fallaron`);
    process.exit(1);
  }
  console.log(`\nTodo en orden. Capturas en ${OUT_DIR}`);
}

void run();
