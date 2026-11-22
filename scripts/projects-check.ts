import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { WORLD_SLUGS } from "../types/world";

const base = process.env.BASE_URL ?? "http://localhost:3301";
const output = "output/playwright/projects-review";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const failures: string[] = [];
const results: unknown[] = [];
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const slug of WORLD_SLUGS) {
      const errors: string[] = [];
      const listener = (error: Error) => errors.push(error.message);
      page.on("pageerror", listener);
      const response = await page.goto(`${base}/mundos/${slug}`, {
        waitUntil: "networkidle",
      });
      await page
        .locator(".world-hero img")
        .first()
        .evaluate((image) => (image as HTMLImageElement).decode());
      const storyArt = page.locator(".project-story-art");
      if (slug === "cumbre" || slug === "volcan") {
        await storyArt.scrollIntoViewIfNeeded();
        await storyArt
          .locator("img")
          .evaluateAll((images) =>
            Promise.all(images.map((image) => (image as HTMLImageElement).decode())),
          );
      }
      const report = await page.evaluate((slug) => {
        const links = [
          ...document.querySelectorAll<HTMLAnchorElement>(".world-section-nav a"),
        ];
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          h1: document.querySelectorAll("h1").length,
          anchors: links.every((link) => document.querySelector(link.hash)),
          broken: [...document.images]
            .filter((image) => image.complete && !image.naturalWidth)
            .map((image) => image.src),
          clipped: [
            ...document.querySelectorAll<HTMLElement>(
              ".world-panel-card,.world-feature,.world-journey li",
            ),
          ].some((element) => element.scrollWidth > element.clientWidth + 1),
          storyArt:
            slug === "cumbre"
              ? ["fondo", "empleado", "cliente"].every((layer) =>
                  document.querySelector(
                    `.project-story-art .bank-scene-layer[data-layer="${layer}"] img`,
                  ),
                )
              : slug === "volcan"
                ? document.querySelectorAll(
                    '.project-story-art > img[src*="argus-profesor.webp"]',
                  ).length === 1
                : document.querySelectorAll(
                    ".project-story-art .project-scene-background img",
                  ).length === 1 &&
                  document.querySelectorAll(
                    ".project-story-art .project-scene-dinosaur img",
                  ).length === 1,
        };
      }, slug);
      if (
        response?.status() !== 200 ||
        report.overflow ||
        report.h1 !== 1 ||
        !report.anchors ||
        report.broken.length ||
        report.clipped ||
        !report.storyArt ||
        errors.length
      )
        failures.push(`${width}/${slug}: ${JSON.stringify({ report, errors })}`);
      results.push({ width, slug, ...report, errors });
      if (width === 390 || width === 1440) {
        await page
          .locator(".world-hero")
          .screenshot({ path: `${output}/${slug}-${width}-hero.png` });
        if (slug === "cumbre" || slug === "volcan") {
          await storyArt.screenshot({ path: `${output}/${slug}-${width}-recorrido.png` });
        }
        if (slug === "aurora") {
          for (const id of ["contexto", "recorrido", "funcionalidades"])
            await page
              .locator(`#${id}`)
              .screenshot({ path: `${output}/${slug}-${width}-${id}.png` });
        }
      }
      page.off("pageerror", listener);
    }
    await page.goto(base, { waitUntil: "networkidle" });
    await page.locator("#proyectos").scrollIntoViewIfNeeded();
    await page.locator("#proyectos .project-card").last().scrollIntoViewIfNeeded();
    const cards = await page.locator(".project-card").count();
    const columns = await page
      .locator(".projects-grid")
      .evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);
    const expectedColumns = width >= 1100 ? 3 : width >= 768 ? 2 : 1;
    if (columns !== expectedColumns)
      failures.push(`${width}/home: ${columns} columnas, esperadas ${expectedColumns}`);
    const homeOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    if (cards !== WORLD_SLUGS.length || homeOverflow)
      failures.push(`${width}/home: cards=${cards}, overflow=${homeOverflow}`);
    await page.locator("#proyectos").screenshot({ path: `${output}/cards-${width}.png` });
    await context.close();
  }
  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const motionPage = await motionContext.newPage();
  const animatedScenes = [
    {
      slug: "aurora",
      layers: ".project-scene-background, .project-scene-dinosaur",
      count: 2,
    },
    { slug: "cumbre", layers: ".bank-scene-layer", count: 3 },
  ];
  for (const { slug, layers, count } of animatedScenes) {
    await motionPage.goto(`${base}/mundos/${slug}`, { waitUntil: "networkidle" });
    const scene = motionPage.locator(".project-story-art .project-scene");
    await scene.scrollIntoViewIfNeeded();
    const bounds = await scene.boundingBox();
    if (!bounds) throw new Error(`${slug}: falta la ilustración por capas`);
    await motionPage.mouse.move(
      bounds.x + bounds.width * 0.8,
      bounds.y + bounds.height * 0.3,
    );
    await motionPage.waitForFunction(
      () =>
        Math.abs(
          Number(
            document
              .querySelector<HTMLElement>(".project-story-art .project-scene")
              ?.style.getPropertyValue("--mx"),
          ),
        ) > 0.1,
    );
    const transforms = await scene
      .locator(layers)
      .evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).transform),
      );
    if (new Set(transforms).size !== count || transforms.length !== count)
      failures.push(`${slug}: las capas deben moverse de forma independiente`);
  }
  await motionContext.close();
} finally {
  await browser.close();
}
await writeFile(`${output}/report.json`, JSON.stringify({ results, failures }, null, 2));
if (failures.length) throw new Error(failures.join("\n"));
console.log(
  `Verificados ${results.length} mundos y las tarjetas en 4 anchos: sin desbordes, errores ni imágenes rotas.`,
);
