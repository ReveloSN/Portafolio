import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { BONE_SHAPES, PUZZLE_BOARD } from "../data/fossilPuzzle";
import { COPY } from "../data/copy";
import { EXPERIENCE } from "../data/experience";

const base = process.env.BASE_URL ?? "http://localhost:3301";
const output = "output/playwright/experience-review";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${base}/#experiencia`, { waitUntil: "networkidle" });
    const section = page.locator("#experiencia");
    const board = section.locator('[data-testid="fossil-board"]');
    const pieces = section.locator('[data-testid="fossil-piece"]');
    await board.waitFor();
    if ((await pieces.count()) !== EXPERIENCE.length)
      throw Error("Falta una pieza por experiencia");
    if (
      (await section.locator('[data-testid="experience-list"] > li').count()) !==
      EXPERIENCE.length
    )
      throw Error("Falta la trayectoria visible");
    await board.scrollIntoViewIfNeeded();
    for (let i = 0; i < EXPERIENCE.length; i++) {
      const box = await pieces.nth(i).boundingBox();
      const target = await board.boundingBox();
      if (!box || !target) throw Error("Fragmento fuera del tablero");
      const shape = BONE_SHAPES[i]!;
      const unit = target.width / PUZZLE_BOARD.width;
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(
        target.x + (shape.slot.x + shape.size.width / 2) * unit,
        target.y + (shape.slot.y + shape.size.height / 2) * unit,
        { steps: 15 },
      );
      await page.mouse.up();
      await page.waitForFunction(
        (index) =>
          document.querySelectorAll<HTMLButtonElement>('[data-testid="fossil-piece"]')[
            index
          ]?.disabled,
        i,
      );
    }
    await section.screenshot({ path: `${output}/assembled-${width}.png` });
    await section
      .getByRole("button", { name: COPY.experience.reset, exact: true })
      .click();
    if ((await pieces.locator(":scope:not(:disabled)").count()) === 0)
      throw Error("El reinicio no devuelve las piezas");
    await pieces.first().focus();
    await pieces.first().press("Enter");
    await section
      .getByRole("button", { name: COPY.experience.placeSelected, exact: true })
      .press("Enter");
    if (!(await pieces.first().isDisabled())) throw Error("No encaja con teclado");
    await section
      .getByRole("button", { name: COPY.experience.placeAll, exact: true })
      .click();
    if ((await pieces.filter({ visible: true }).count()) !== EXPERIENCE.length)
      throw Error("Desaparecieron los fragmentos");
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth))
      throw Error("Desborde horizontal");
    await section
      .getByRole("button", { name: COPY.experience.reset, exact: true })
      .click();
    await section.screenshot({ path: `${output}/construction-${width}.png` });
    await context.close();
    console.log(
      `${width}px: arrastre de ${EXPERIENCE.length} piezas, teclado, completar y reiniciar correctos`,
    );
  }
} finally {
  await browser.close();
}
