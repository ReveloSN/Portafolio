/**
 * Convierte el arte vectorial de los mundos dibujados en código en las imágenes que piden
 * la portada (`data/worldCovers.ts`) y la ilustración por capas de `ProjectScene`.
 *
 * Uso:  npm run worlds:art
 *
 * Cada salida se dibuja desde su componente SVG (fuente de verdad) y se guarda como WebP:
 * el paisaje a 1600 × 900 (portada y fondo) y el personaje a 1100 × 733 con transparencia,
 * las mismas medidas que las capas pintadas de los otros mundos.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { CumbreArt } from "@/components/worlds/art/CumbreArt";
import { CumbreDinosaur } from "@/components/worlds/art/CumbreDinosaur";

const WEBP_QUALITY = 84;
const LANDSCAPE = { width: 1600, height: 900 } as const;
const CHARACTER = { width: 1100, height: 733 } as const;

interface ArtOutput {
  readonly component: ComponentType;
  readonly size: { readonly width: number; readonly height: number };
  readonly files: readonly string[];
}

const OUTPUTS: readonly ArtOutput[] = [
  {
    component: CumbreArt,
    size: LANDSCAPE,
    files: [
      "public/art/projects/worlds/cumbre.webp",
      "public/art/projects/layers/cumbre-background.webp",
    ],
  },
  {
    component: CumbreDinosaur,
    size: CHARACTER,
    files: ["public/art/projects/layers/cumbre-dinosaur.webp"],
  },
];

async function render({ component, size, files }: ArtOutput) {
  const svg = renderToStaticMarkup(createElement(component));
  const image = sharp(Buffer.from(svg)).resize(size.width, size.height);
  for (const file of files) {
    await mkdir(path.dirname(file), { recursive: true });
    const info = await image
      .clone()
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(file);
    console.log(
      `${file}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`,
    );
  }
}

for (const output of OUTPUTS) await render(output);
