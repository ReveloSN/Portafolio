/**
 * Prueba de punta a punta del lago de pesca. En cada tamaño juega cuatro partidas
 * completas: con el puntero, solo con teclado, en modo relajado y sin efectos. Comprueba
 * que el contador llega a 6/6, que el foco vuelve a la ficha tras elegir un punto, que la
 * interfaz cabe en la escena sin cortar el muelle ni el agua, que el menú de ajustes se
 * abre y se cierra con teclado, que dos fallos en el anillo dejan escapar a la criatura y
 * que no hay scroll horizontal; guarda una captura de cada fase.
 *
 * Uso:  npm run build && npm start       (en otra terminal)
 *       npm run fishing                   (BASE_URL=http://localhost:3000, SHOTS=carpeta)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { phaseOf, playRing, waitPhase } from "./lake-bot";

const VIEWPORTS = [
  { name: "1280x575", width: 1280, height: 575, scale: 1, mobile: false },
  { name: "1440x900", width: 1440, height: 900, scale: 1, mobile: false },
  { name: "390x844", width: 390, height: 844, scale: 2, mobile: true },
] as const;
/** Solo se revisa que la interfaz quepa en la escena. */
const LAYOUT_VIEWPORTS = [{ name: "1920x1080", width: 1920, height: 1080 }] as const;
/** Desde este ancho la interfaz flota sobre la escena; por debajo va bajo ella. */
const HUD_OVER_SCENE_PX = 640;

/** Cómo juega cada partida. "plain": como "keyboard", con el interruptor Efectos apagado. */
type Run = "pointer" | "keyboard" | "relaxed" | "plain";
type Depth = "shore" | "mid" | "deep";
type Snap = (name: string) => Promise<void>;
const RUNS: readonly Run[] = ["pointer", "keyboard", "relaxed", "plain"];
/** Orden de los puntos en el DOM (y con Tab). */
const SPOTS: readonly Depth[] = ["shore", "mid", "deep"];

/** Orden de captura (data/creatures.ts): el megalodón exige 4 capturas antes. */
const PLAN: readonly { creature: string; depth: Depth }[] = [
  { creature: "lepidotes", depth: "shore" },
  { creature: "ammonite", depth: "shore" },
  { creature: "coelacanth", depth: "mid" },
  { creature: "ichthyosaur", depth: "mid" },
  { creature: "mosasaur", depth: "deep" },
  { creature: "megalodon", depth: "deep" },
];

/** Fallos a propósito antes de acertar: en relajado no cuestan nada; en desafío, uno. */
const DELIBERATE_MISSES: Readonly<Record<Run, number>> = {
  pointer: 0,
  keyboard: 1,
  relaxed: 3,
  plain: 0,
};
const MAX_ATTEMPTS = 8;
const TOTAL = PLAN.length;
const BITE_WAITS = 2;
const RING_TIMEOUT_MS = 5000;
const MIN_TARGET_PX = 44;
/** Tabulaciones dentro del menú: más que sus controles, para comprobar que el foco no sale. */
const MENU_TABS = 8;
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = process.env.SHOTS ?? path.join("screenshots", "fishing");

const failures: string[] = [];
function check(ok: boolean, message: string) {
  console.log(`${ok ? "  ok " : "  FAIL"} ${message}`);
  if (!ok) failures.push(message);
}

const countOf = async (page: Page) =>
  (await page.getByTestId("catch-count").textContent()) ?? "";

const statusOf = async (page: Page) =>
  (await page.getByTestId("fishing-status").textContent()) ?? "";

const focusedTestId = (page: Page) =>
  page.evaluate(() => document.activeElement?.getAttribute("data-testid") ?? "");

const actionFocused = async (page: Page) =>
  (await focusedTestId(page)) === "fishing-action";

const noSnap: Snap = async () => {};

/** Guarda una captura del juego la primera vez que aparece cada fase. */
function snapper(page: Page, dir: string, prefix: string): Snap {
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

/** Abre el menú de ajustes, pone el interruptor como se pide y lo cierra con Escape. */
async function setToggle(page: Page, testId: string, on: boolean) {
  await page.getByTestId("settings-button").click();
  const toggle = page.getByTestId(testId);
  if (((await toggle.getAttribute("aria-checked")) === "true") !== on)
    await toggle.click();
  await page.keyboard.press("Escape");
}

/** Ejecuta una acción del menú ("Sacar todo", "Reiniciar"); el menú se cierra solo. */
async function menuAction(page: Page, testId: string) {
  await page.getByTestId("settings-button").click();
  await page.getByTestId(testId).click();
}

/**
 * Elige el punto de pesca. Con puntero: un clic en el burbujeo. Con teclado: la ficha lleva
 * el foco al primer punto, Tab hasta el pedido y Enter; el foco vuelve a la ficha.
 */
async function pickSpot(page: Page, run: Run, depth: Depth) {
  if (run === "pointer") {
    await page.getByTestId(`spot-${depth}`).click();
    return;
  }
  await page.getByTestId("fishing-action").focus();
  await page.keyboard.press("Space");
  for (let tab = 0; tab < SPOTS.indexOf(depth); tab++) await page.keyboard.press("Tab");
  const focused = await focusedTestId(page);
  check(focused === `spot-${depth}`, `${run}: Tab llega al punto ${depth}`);
  await page.keyboard.press("Enter");
  check(await actionFocused(page), `${run}: tras lanzar, el foco vuelve a la ficha`);
}

/** Enganchar en la picada: Espacio en la ficha o una pulsación con el puntero. */
async function hook(page: Page, run: Run) {
  if (run !== "pointer") {
    await page.keyboard.press("Space");
    return;
  }
  const box = await page.getByTestId("fishing-action").boundingBox();
  if (!box) throw new Error("sin ficha");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.up();
}

/** El anillo: el jugador automático acierta (tras `misses` fallos a propósito). */
async function fightRing(page: Page, run: Run, snap: Snap, misses: number) {
  await page.getByTestId("fight-ring").waitFor({ timeout: RING_TIMEOUT_MS });
  await snap("ring");
  await playRing(page, run === "pointer", misses);
}

/** Lanza y espera la picada; con la máquina cargada se espera una segunda vez. */
async function castAndWait(page: Page, run: Run, depth: Depth, snap: Snap) {
  await pickSpot(page, run, depth);
  await snap("casting");
  await waitPhase(page, ["waiting", "escaped", "bite"]);
  await snap("waiting");
  for (let wait = 0; wait < BITE_WAITS; wait++) {
    const settled = await waitPhase(page, ["bite", "escaped"]).then(
      () => true,
      () => false,
    );
    if (settled) break;
    console.log(`    picada lenta: ${await phaseOf(page)} · ${await statusOf(page)}`);
  }
  return (await phaseOf(page)) === "bite";
}

/** Una partida completa: punto, picada y anillo por criatura; reintenta si falla. */
async function playGame(page: Page, run: Run, snap: Snap) {
  await setToggle(page, "relaxed-toggle", run === "relaxed");
  await setToggle(page, "effects-toggle", run !== "plain");
  check(
    (await page.getByTestId("quantum-water").count()) === (run === "plain" ? 0 : 1),
    `${run}: efectos ${run === "plain" ? "apagados" : "encendidos"}`,
  );
  await snap("idle");
  for (const [index, step] of PLAN.entries()) {
    let caught = false;
    for (let attempt = 0; attempt < MAX_ATTEMPTS && !caught; attempt++) {
      if (!(await castAndWait(page, run, step.depth, snap))) {
        console.log(`    intento ${attempt + 1}: ${await statusOf(page)}`);
        await snap("escaped");
        continue;
      }
      await snap("bite");
      const biteSeen = Date.now();
      await hook(page, run);
      const hookMs = Date.now() - biteSeen;
      const hooked = await waitPhase(page, ["fighting"]).then(
        () => true,
        () => false,
      );
      if (!hooked) {
        console.log(
          `    intento ${attempt + 1}: sin enganchar en ${hookMs} ms · ${await phaseOf(page)} · ${await statusOf(page)}`,
        );
        continue;
      }
      // Los fallos a propósito, solo con la primera criatura y en el primer intento.
      const misses = index === 0 && attempt === 0 ? DELIBERATE_MISSES[run] : 0;
      await fightRing(page, run, snap, misses);
      const phase = await phaseOf(page);
      caught = phase === "caught" || phase === "complete";
      if (!caught)
        console.log(`    intento ${attempt + 1}: ${phase} · ${await statusOf(page)}`);
      await snap(caught ? (phase === "complete" ? "complete" : "caught") : phase);
    }
    check(caught, `${run}: capturado ${step.creature}`);
    if (!caught) return;
  }
  await page.waitForTimeout(3500);
  await snap("complete-canoe");
}

/** Desafío: dos fallos seguidos en el anillo y la criatura se escapa. */
async function checkRingEscape(page: Page, label: string) {
  await setToggle(page, "relaxed-toggle", false);
  if (!(await castAndWait(page, "keyboard", "shore", noSnap))) {
    check(false, `${label}: no picó nada para probar el escape`);
    return;
  }
  await hook(page, "keyboard");
  await waitPhase(page, ["fighting"]);
  await fightRing(page, "keyboard", noSnap, 2);
  check(
    (await phaseOf(page)) === "escaped" && (await statusOf(page)).includes("fallaste"),
    `${label}: dos fallos en el anillo y se escapa`,
  );
  await menuAction(page, "reset-game");
}

/**
 * La escena no se corta (el lienzo apoya abajo en el marco y llena su ancho) y la interfaz
 * cabe: desde 640 px dentro de la escena, debajo en pantallas angostas; objetivos de 44 px.
 */
async function checkHudLayout(page: Page, label: string) {
  const result = await page.evaluate(
    ([overScene, minPx]) => {
      // Sin funciones con nombre dentro: tsx les añade un ayudante que la página no tiene.
      const [frame, canvas, gear, token, ...rest] = [
        ".lake-viewport",
        ".lake-canvas",
        ".lake-gear",
        ".lake-token",
        ".lake-marks",
        ".lake-hud-status",
      ].map((selector) => document.querySelector(selector)!.getBoundingClientRect());
      const spots = [...document.querySelectorAll(".lake-spot")].map((el) =>
        el.getBoundingClientRect(),
      );
      return {
        grounded:
          Math.abs(canvas!.bottom - frame!.bottom) <= 1 &&
          Math.abs(canvas!.left - frame!.left) <= 1 &&
          canvas!.width >= frame!.width - 1,
        fits:
          window.innerWidth < overScene ||
          [gear!, token!, ...rest].every(
            (box) =>
              box.left >= frame!.left - 1 &&
              box.right <= frame!.right + 1 &&
              box.top >= frame!.top - 1 &&
              box.bottom <= frame!.bottom + 1,
          ),
        spotsInside:
          spots.length === 3 &&
          spots.every(
            (box) =>
              box.left >= frame!.left &&
              box.right <= frame!.right &&
              box.top >= frame!.top &&
              box.bottom <= frame!.bottom,
          ),
        spotsApart: spots.every((box, i) => i === 0 || box.left >= spots[i - 1]!.right),
        small: [gear!, token!, ...spots].some(
          (box) => box.width < minPx || box.height < minPx,
        ),
      };
    },
    [HUD_OVER_SCENE_PX, MIN_TARGET_PX] as const,
  );
  check(result.grounded, `${label}: la escena apoya abajo y no corta muelle ni agua`);
  check(result.fits, `${label}: la interfaz cabe dentro de la escena`);
  check(result.spotsInside, `${label}: los tres puntos de pesca se ven en la escena`);
  check(result.spotsApart, `${label}: los puntos de pesca no se montan`);
  check(!result.small, `${label}: engranaje, ficha y puntos de al menos 44x44 px`);
}

/** El menú de ajustes se abre con Enter, atrapa el foco y se cierra con Escape. */
async function checkMenuKeyboard(page: Page, label: string) {
  const gear = page.getByTestId("settings-button");
  await gear.focus();
  await page.keyboard.press("Enter");
  const menu = page.getByTestId("settings-menu");
  check(await menu.isVisible(), `${label}: Enter abre el menú de ajustes`);
  check(
    (await gear.getAttribute("aria-expanded")) === "true",
    `${label}: aria-expanded en el engranaje`,
  );
  for (let tab = 0; tab < MENU_TABS; tab++) await page.keyboard.press("Tab");
  const trapped = await menu.evaluate((el) => el.contains(document.activeElement));
  check(trapped, `${label}: el foco no sale del menú con Tab`);
  await page.keyboard.press("Escape");
  check((await menu.count()) === 0, `${label}: Escape cierra el menú`);
  check(
    await gear.evaluate((el) => el === document.activeElement),
    `${label}: el foco vuelve al engranaje`,
  );
}

/** El diario se lee sin jugar, filtra por tipo y responde a "Sacar todo" y "Reiniciar". */
async function checkJournal(page: Page, dir: string) {
  const journal = page.getByTestId("experience-journal");
  const entries = journal.locator(".journal-entry");
  check(
    (await entries.count()) === TOTAL,
    `diario visible sin jugar: ${await entries.count()} entradas`,
  );
  await page.getByTestId("filter-work").click();
  const work = await entries.count();
  await page.getByTestId("filter-academic").click();
  const academic = await entries.count();
  check(
    work > 0 && academic > 0 && work + academic === TOTAL,
    `filtros: ${work} laborales + ${academic} académicas`,
  );
  await journal.screenshot({ path: path.join(dir, "journal-filter-academic.png") });
  await page.getByTestId("filter-all").click();

  await menuAction(page, "reveal-all");
  check(
    (await countOf(page)) === String(TOTAL),
    `Sacar todo: ${await countOf(page)}/${TOTAL}`,
  );
  await journal.screenshot({ path: path.join(dir, "journal-revealed.png") });
  await menuAction(page, "reset-game");
  check((await countOf(page)) === "0", "Reiniciar vuelve a 0");
}

/** Movimiento reducido: modo relajado, sin efectos y el anillo se llena en vez de girar. */
async function checkReducedMotion(browser: Browser) {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.getByTestId("fishing-game").scrollIntoViewIfNeeded();
  await page.getByTestId("settings-button").click();
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
  check(
    (await page.getByTestId("effects-toggle").getAttribute("aria-checked")) === "false",
    "prefers-reduced-motion apaga los efectos",
  );
  await page.keyboard.press("Escape");
  if (await castAndWait(page, "pointer", "shore", noSnap)) {
    await hook(page, "pointer");
    await page.getByTestId("fight-ring").waitFor({ timeout: RING_TIMEOUT_MS });
    check(
      (await page.locator(".lake-ring-fill").count()) === 1 &&
        (await page.locator(".lake-ring-needle").count()) === 0,
      "movimiento reducido: el anillo se llena en vez de girar la aguja",
    );
  } else check(false, "movimiento reducido: no picó nada");
  await context.close();
}

async function checkLayoutOnly(browser: Browser) {
  for (const viewport of LAYOUT_VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
    });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.getByTestId("fishing-game").scrollIntoViewIfNeeded();
    await checkHudLayout(page, viewport.name);
    await page.close();
  }
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  await checkReducedMotion(browser);
  await checkLayoutOnly(browser);
  const only = process.env.ONLY;
  for (const viewport of VIEWPORTS.filter((v) => !only || v.name === only)) {
    console.log(`\n${viewport.name}`);
    const dir = path.join(OUT_DIR, viewport.name);
    await mkdir(dir, { recursive: true });
    for (const game of RUNS.filter((r) => !process.env.RUN || r === process.env.RUN)) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: viewport.scale,
        isMobile: viewport.mobile,
        hasTouch: viewport.mobile,
      });
      const page = await context.newPage();
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      await page.getByTestId("fishing-game").scrollIntoViewIfNeeded();

      if (game === "keyboard") {
        await checkHudLayout(page, viewport.name);
        await checkMenuKeyboard(page, viewport.name);
      }
      if (game === "relaxed") await checkJournal(page, dir);
      if (game === "plain") await checkRingEscape(page, viewport.name);
      const started = Date.now();
      await playGame(page, game, snapper(page, dir, game));
      console.log(`  (${game}: ${Math.round((Date.now() - started) / 1000)} s)`);
      check(
        (await countOf(page)) === String(TOTAL),
        `${game}: contador ${await countOf(page)}/${TOTAL}`,
      );
      check((await phaseOf(page)) === "complete", `${game}: fase final complete`);
      check(
        await page.getByTestId("closing-message").isVisible(),
        `${game}: mensaje de cierre visible`,
      );
      check(await actionFocused(page), `${game}: el foco sigue en la ficha de acción`);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      check(overflow <= 0, `${game}: sin scroll horizontal (${overflow}px)`);
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
