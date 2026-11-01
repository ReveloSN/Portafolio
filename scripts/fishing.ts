/**
 * Prueba de punta a punta del lago de pesca. En cada tamaño juega cuatro partidas
 * completas: con el puntero, solo con teclado, en modo relajado y sin efectos. Comprueba
 * que el contador llega a 6/6, que el foco no sale de la ficha de acción, que la interfaz
 * cabe en la escena sin cortar el muelle ni el agua, que el menú de ajustes se abre y se
 * cierra con teclado y que no hay scroll horizontal; guarda una captura de cada fase.
 *
 * Uso:  npm run build && npm start       (en otra terminal)
 *       npm run fishing                   (BASE_URL=http://localhost:3000, SHOTS=carpeta)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { CAST_CHARGE_MS } from "@/lib/fishing/config";

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

/** Orden de captura (data/creatures.ts): el megalodón exige 4 capturas antes. */
const PLAN: readonly { creature: string; depth: Depth }[] = [
  { creature: "lepidotes", depth: "shore" },
  { creature: "ammonite", depth: "shore" },
  { creature: "coelacanth", depth: "mid" },
  { creature: "ichthyosaur", depth: "mid" },
  { creature: "mosasaur", depth: "deep" },
  { creature: "megalodon", depth: "deep" },
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
const BITE_WAITS = 2;
const FIGHT_SNAPSHOT_MS = 1200;
const TAP_GAP_MS = 80;
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

const phaseOf = (page: Page) =>
  page.evaluate(
    () => document.querySelector<SVGElement>(".lakesvg")?.dataset.phase ?? "",
  );

const countOf = async (page: Page) =>
  (await page.getByTestId("catch-count").textContent()) ?? "";

const statusOf = async (page: Page) =>
  (await page.getByTestId("fishing-status").textContent()) ?? "";

const actionFocused = (page: Page) =>
  page.getByTestId("fishing-action").evaluate((el) => el === document.activeElement);

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

async function center(page: Page, testId: string) {
  const box = await page.getByTestId(testId).boundingBox();
  if (!box) throw new Error(`sin caja: ${testId}`);
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

/** Mantener pulsada la ficha de acción: con el puntero o con Espacio. */
function holdInput(page: Page, run: Run) {
  if (run === "pointer") {
    return {
      down: async () => {
        // En móvil la ficha queda bajo la escena: primero a la vista, como haría el dedo.
        await page.getByTestId("fishing-action").scrollIntoViewIfNeeded();
        const at = await center(page, "fishing-action");
        await page.mouse.move(at.x, at.y);
        await page.mouse.down();
      },
      up: () => page.mouse.up(),
    };
  }
  return {
    down: () => page.keyboard.down("Space"),
    up: () => page.keyboard.up("Space"),
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
 * Carga el lanzamiento y suelta en la zona pedida. Pulsa y suelta dentro de la página y
 * calcula la fuerza con el mismo reloj que el motor (vaivén de CAST_CHARGE_MS): si el
 * render va lento, la barra pintada llega tarde, pero la fuerza real no.
 */
async function cast(page: Page, run: Run, depth: Depth, snap: Snap) {
  const charge = CAST_CHARGE_MS[run === "relaxed" ? "relaxed" : "challenge"];
  // Sin funciones con nombre dentro: tsx les añade un ayudante que la página no tiene.
  await page.evaluate(
    async ([lo, hi, chargeMs]) => {
      const action = document.querySelector("[data-testid=fishing-action]");
      action?.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
      const start = performance.now();
      for (;;) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const cycle = ((performance.now() - start) / chargeMs) % 2;
        const power = (cycle <= 1 ? cycle : 2 - cycle) * 100;
        if (power < lo || power > hi) continue;
        action?.dispatchEvent(new KeyboardEvent("keyup", { key: " ", bubbles: true }));
        return;
      }
    },
    [...RELEASE_AT[depth], charge] as const,
  );
  await snap("casting");
}

/**
 * Pelea en modo desafío: el jugador automático vive en la página y decide en cada fotograma
 * (recoger por debajo de TENSION_LOW, aflojar por encima de TENSION_HIGH). Desde Node
 * llegaba tarde con la máquina cargada y rompía el hilo.
 */
async function fightChallenge(page: Page, run: Run, snap: Snap) {
  // Sin funciones con nombre dentro: tsx les añade un ayudante que la página no tiene.
  const fight = page.evaluate(
    async ([low, high]) => {
      let holding = true;
      for (;;) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const phase = document.querySelector<SVGElement>(".lakesvg")?.dataset.phase;
        if (phase !== "fighting") return;
        const meter = document.querySelector("[data-testid=tension-meter]");
        const tension = Number(meter?.getAttribute("aria-valuenow") ?? 0);
        const action = document.querySelector("[data-testid=fishing-action]");
        if (holding && tension > high) {
          action?.dispatchEvent(new KeyboardEvent("keyup", { key: " ", bubbles: true }));
          holding = false;
        } else if (!holding && tension < low) {
          action?.dispatchEvent(
            new KeyboardEvent("keydown", { key: " ", bubbles: true }),
          );
          holding = true;
        }
      }
    },
    [TENSION_LOW, TENSION_HIGH] as const,
  );
  await page.waitForTimeout(FIGHT_SNAPSHOT_MS);
  if ((await phaseOf(page)) === "fighting") await snap("fighting");
  await fight;
  // Ya soltado en la página: esto solo limpia el estado del teclado o del ratón.
  await holdInput(page, run).up();
}

async function fightRelaxed(page: Page, snap: Snap) {
  await page.keyboard.up("Space");
  await snap("fighting");
  while ((await phaseOf(page)) === "fighting") {
    await page.keyboard.press("Space");
    await page.waitForTimeout(TAP_GAP_MS);
  }
}

/** Una partida completa: lanzamiento y pelea por criatura; reintenta si falla. */
async function playGame(page: Page, run: Run, snap: Snap) {
  await setToggle(page, "relaxed-toggle", run === "relaxed");
  await setToggle(page, "effects-toggle", run !== "plain");
  await page.getByTestId("fishing-action").focus();
  check(
    (await page.getByTestId("quantum-water").count()) === (run === "plain" ? 0 : 1),
    `${run}: efectos ${run === "plain" ? "apagados" : "encendidos"}`,
  );
  await snap("idle");
  for (const step of PLAN) {
    let caught = false;
    for (let attempt = 0; attempt < MAX_ATTEMPTS && !caught; attempt++) {
      await cast(page, run, step.depth, snap);
      await snap("waiting");
      // Con la máquina cargada la picada puede tardar más: se espera una segunda vez.
      for (let wait = 0; wait < BITE_WAITS; wait++) {
        const settled = await waitPhase(page, ["bite", "escaped"]).then(
          () => true,
          () => false,
        );
        if (settled) break;
        console.log(`    picada lenta: ${await phaseOf(page)} · ${await statusOf(page)}`);
      }
      if ((await phaseOf(page)) !== "bite") {
        console.log(`    intento ${attempt + 1}: ${await statusOf(page)}`);
        await snap("escaped");
        continue;
      }
      await snap("bite");
      const input = holdInput(page, run === "pointer" ? "pointer" : "keyboard");
      await input.down();
      await waitPhase(page, ["fighting", "caught", "complete"]);
      if (run === "relaxed") await fightRelaxed(page, snap);
      else await fightChallenge(page, run, snap);
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
      const parts = [gear!, token!, ...rest];
      return {
        grounded:
          Math.abs(canvas!.bottom - frame!.bottom) <= 1 &&
          Math.abs(canvas!.left - frame!.left) <= 1 &&
          canvas!.width >= frame!.width - 1,
        fits:
          window.innerWidth < overScene ||
          parts.every(
            (box) =>
              box.left >= frame!.left - 1 &&
              box.right <= frame!.right + 1 &&
              box.top >= frame!.top - 1 &&
              box.bottom <= frame!.bottom + 1,
          ),
        small: [gear!, token!].some((box) => box.width < minPx || box.height < minPx),
      };
    },
    [HUD_OVER_SCENE_PX, MIN_TARGET_PX] as const,
  );
  check(result.grounded, `${label}: la escena apoya abajo y no corta muelle ni agua`);
  check(result.fits, `${label}: la interfaz cabe dentro de la escena`);
  check(!result.small, `${label}: engranaje y ficha de al menos 44x44 px`);
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
  const entries = journal.locator(".jcard");
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
    for (const game of RUNS) {
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
