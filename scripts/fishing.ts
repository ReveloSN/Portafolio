/**
 * Prueba de punta a punta del lago de pesca. En cada tamaño juega tres partidas
 * completas: (a) carnada arrastrada con el ratón, (b) solo teclado (Enter en el balde y
 * luego «Enganchar en la caña») y (c) modo relajado. Comprueba que el contador llega a
 * 6/6, que no se lanza sin carnada, que el foco no sale del botón de acción y que los
 * baldes no tapan al niño ni la caña; guarda una captura de cada fase.
 *
 * Uso:  npm run build && npm start       (en otra terminal)
 *       npm run fishing                   (BASE_URL=http://localhost:3000)
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
/** Solo se revisa la colocación de los baldes. */
const LAYOUT_VIEWPORTS = [{ name: "1920x1080", width: 1920, height: 1080 }] as const;

/** Cómo juega cada partida: con qué se toma la carnada y en qué modo. */
/** "plain": como "keyboard", con el interruptor Efectos apagado. */
type Run = "drag" | "keyboard" | "relaxed" | "plain";
type Depth = "shore" | "mid" | "deep";
type Bait = "worm" | "minnow" | "firefly";
type Snap = (name: string) => Promise<void>;
const RUNS: readonly Run[] = ["drag", "keyboard", "relaxed", "plain"];

/** Orden de captura (data/creatures.ts): el megalodón exige 4 capturas antes. */
const PLAN: readonly { creature: string; bait: Bait; depth: Depth }[] = [
  { creature: "lepidotes", bait: "worm", depth: "shore" },
  { creature: "ammonite", bait: "firefly", depth: "shore" },
  { creature: "coelacanth", bait: "minnow", depth: "mid" },
  { creature: "ichthyosaur", bait: "firefly", depth: "mid" },
  { creature: "mosasaur", bait: "minnow", depth: "deep" },
  { creature: "megalodon", bait: "firefly", depth: "deep" },
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
const HOOK_TIMEOUT_MS = 3000;
const FIGHT_SNAPSHOT_MS = 1200;
const TAP_GAP_MS = 80;
const DRAG_STEPS = 10;
const MIN_TARGET_PX = 44;
/** Borde izquierdo del niño en % del ancho de la escena: los baldes deben quedar antes. */
const KID_LEFT = 31;
const PERCENT = 100;
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

/** Mantener pulsado el botón de acción: con el ratón (partida de arrastre) o con Espacio. */
function holdInput(page: Page, run: Run) {
  if (run === "drag") {
    return {
      down: async () => {
        // En móvil el botón queda bajo la escena: primero a la vista, como haría el dedo.
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

async function setToggle(page: Page, testId: string, on: boolean) {
  const toggle = page.getByTestId(testId);
  if (((await toggle.getAttribute("aria-checked")) === "true") !== on)
    await toggle.click();
}

async function setRelaxed(page: Page, relaxed: boolean) {
  const toggle = page.getByTestId("relaxed-toggle");
  if (((await toggle.getAttribute("aria-checked")) === "true") !== relaxed) {
    await toggle.click();
  }
}

/** Arrastra con el ratón la carnada del balde hasta el anzuelo. */
async function dragToHook(page: Page, bait: Bait, snap: Snap) {
  await page.getByTestId("lake-canvas").scrollIntoViewIfNeeded();
  await page.getByTestId(`bucket-${bait}`).click();
  await snap("bucket-selected");
  const from = await center(page, `bucket-${bait}`);
  const to = await center(page, "hook-zone");
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move((from.x + to.x) / 2, (from.y + to.y) / 2, {
    steps: DRAG_STEPS,
  });
  await snap("bait-dragging");
  await page.mouse.move(to.x, to.y, { steps: DRAG_STEPS });
  await snap("hook-zone-active");
  await page.mouse.up();
}

/** Toma la carnada del balde y la engancha según la partida. */
async function takeBait(page: Page, run: Run, bait: Bait, snap: Snap) {
  if (run === "drag") {
    await dragToHook(page, bait, snap);
  } else if (run === "keyboard" || run === "plain") {
    await page.getByTestId(`bucket-${bait}`).focus();
    await page.keyboard.press("Enter");
    await snap("bucket-selected");
    check(await actionFocused(page), "teclado: tras elegir, el foco pasa al botón");
    await page.keyboard.press("Enter");
  } else {
    await page.getByTestId(`bucket-${bait}`).click();
  }
  await page.getByTestId("hooked-bait").waitFor({ timeout: HOOK_TIMEOUT_MS });
  await snap("bait-hooked");
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

/** Una partida completa: carnada, lanzamiento y pelea por criatura; reintenta si falla. */
async function playGame(page: Page, run: Run, snap: Snap) {
  await setRelaxed(page, run === "relaxed");
  await setToggle(page, "effects-toggle", run !== "plain");
  check(
    (await page.getByTestId("quantum-water").count()) === (run === "plain" ? 0 : 1),
    `${run}: efectos ${run === "plain" ? "apagados" : "encendidos"}`,
  );
  await snap("idle");
  for (const step of PLAN) {
    let caught = false;
    for (let attempt = 0; attempt < MAX_ATTEMPTS && !caught; attempt++) {
      await takeBait(page, run, step.bait, snap);
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
      const input = holdInput(page, run === "drag" ? "drag" : "keyboard");
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

/** No se lanza sin carnada enganchada: se avisa y el foco no se mueve. */
async function checkNoBait(page: Page) {
  await page.getByTestId("fishing-action").focus();
  await page.keyboard.press("Space");
  check(
    (await phaseOf(page)) === "idle" &&
      (await statusOf(page)).startsWith("Falta carnada"),
    "sin carnada no se lanza y se avisa",
  );
  check(await actionFocused(page), "el foco sigue en el botón tras el aviso");
  await page.getByTestId("bucket-worm").click();
  await page.getByTestId("fishing-action").focus();
  await page.keyboard.down("Space");
  check(
    (await phaseOf(page)) !== "casting",
    "con carnada sin enganchar, el botón la engancha en vez de lanzar",
  );
  await page.keyboard.up("Space");
  await page.getByTestId("reset-game").click();
}

/** Los baldes no tapan al niño ni la caña, no se montan entre sí y miden 44 px o más. */
async function checkBucketLayout(page: Page, label: string) {
  const result = await page.evaluate(
    ([kidLeft, width, minPx]) => {
      const canvas = document.querySelector(".lake-canvas")!.getBoundingClientRect();
      const boxes = [...document.querySelectorAll(".lake-bucket")].map((el) =>
        el.getBoundingClientRect(),
      );
      const kid = canvas.left + (kidLeft / width) * canvas.width;
      const inStrip = boxes.every((box) => box.top >= canvas.bottom - 1);
      return {
        overlap: boxes.some((box, i) => i > 0 && box.left < boxes[i - 1]!.right - 1),
        small: boxes.some((box) => box.width < minPx || box.height < minPx),
        clearOfKid: inStrip || boxes.every((box) => box.right <= kid),
      };
    },
    [KID_LEFT, PERCENT, MIN_TARGET_PX] as const,
  );
  check(!result.overlap, `${label}: los baldes no se montan entre sí`);
  check(!result.small, `${label}: baldes de al menos 44x44 px`);
  check(result.clearOfKid, `${label}: los baldes no tapan al niño ni la caña`);
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

  await page.getByTestId("reveal-all").click();
  check(
    (await countOf(page)) === String(TOTAL),
    `Sacar todo: ${await countOf(page)}/${TOTAL}`,
  );
  await page.getByTestId("reset-game").click();
  check((await countOf(page)) === "0", "Reiniciar vuelve a 0");
}

async function checkReducedMotion(browser: Browser) {
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
  check(
    (await page.getByTestId("effects-toggle").getAttribute("aria-checked")) === "false",
    "prefers-reduced-motion apaga los efectos",
  );
  await page.getByTestId("bucket-minnow").click();
  const hooked = await page
    .getByTestId("hooked-bait")
    .waitFor({ timeout: HOOK_TIMEOUT_MS })
    .then(
      () => true,
      () => false,
    );
  check(hooked, "movimiento reducido: la carnada aparece directamente en el anzuelo");
  await context.close();
}

async function checkLayoutOnly(browser: Browser) {
  for (const viewport of LAYOUT_VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
    });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.getByTestId("fishing-game").scrollIntoViewIfNeeded();
    await checkBucketLayout(page, viewport.name);
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

      if (game === "drag") {
        await checkBucketLayout(page, viewport.name);
        await checkNoBait(page);
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
      check(await actionFocused(page), `${game}: el foco sigue en el botón de acción`);
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
