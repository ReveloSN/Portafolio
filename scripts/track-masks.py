"""
Máscaras y geometría de cada huella (public/art/tracks/footprint-N.webp).

La transparencia del WebP no basta: el exterior y el hueco central son transparentes,
pero el agua de los dedos está pintada opaca. La cavidad se reconstruye desde la
pintura: el agua es lisa y el barro tiene textura, así que se hace crecer una región
desde el hueco central por las zonas lisas (sin vegetación) y se suaviza el contorno.

Genera, junto a cada huella:
  footprint-N-pool.webp  cavidad interior (hueco + agua de los dedos)
  footprint-N-rim.webp   franja del borde interior de la tierra (para el resplandor)
e imprime dónde va el logo (centro y diámetro, en %) para data/art.ts.

Uso:  python scripts/track-masks.py
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as nd, signal

TRACKS = Path("public/art/tracks")
SIZE = 744  # mitad del original: contorno preciso y archivos de pocos KB
SILHOUETTE_ALPHA = 40
HOLE_ALPHA = 60
SMOOTH_WINDOW = 7  # ventana para medir la textura (desviación de luminancia)
SMOOTH_MAX = 14  # por debajo de esto el píxel es agua lisa, no barro
GREEN_MAX = 10  # el verde dominante es vegetación, nunca agua
EDGE_SOFTEN = 1.2
# Resplandor del borde interior: una línea nítida justo en el contorno de la cavidad
# más un halo ancho y tenue que sube por la tierra (px a SIZE)
LINE_OUT, LINE_IN, LINE_SOFTEN = 3, 2, 1.5
HALO_OUT, HALO_IN, HALO_SOFTEN, HALO_LEVEL = 12, 4, 6, 0.45
# El logo es el círculo más grande que queda casi entero dentro de la cavidad: llena
# la zona ancha sin que la tierra ni las hojas le queden encima.
LOGO_INSIDE = 0.92
LOGO_MAX, LOGO_MIN, LOGO_STEP = 0.36, 0.18, 0.005


def load(src: Path) -> np.ndarray:
    im = Image.open(src).convert("RGBA").resize((SIZE, SIZE), Image.LANCZOS)
    return np.asarray(im).astype(float)


def cavity(im: np.ndarray) -> np.ndarray:
    rgb, alpha = im[..., :3], im[..., 3]
    lum = rgb @ [0.299, 0.587, 0.114]
    mean = nd.uniform_filter(lum, SMOOTH_WINDOW)
    spread = np.sqrt(np.clip(nd.uniform_filter(lum * lum, SMOOTH_WINDOW) - mean**2, 0, None))
    silhouette = nd.binary_fill_holes(alpha > SILHOUETTE_ALPHA)
    hole = nd.binary_opening(silhouette & (alpha < HOLE_ALPHA), iterations=3)
    greenness = rgb[..., 1] - np.maximum(rgb[..., 0], rgb[..., 2])
    water = silhouette & (spread < SMOOTH_MAX) & (greenness < GREEN_MAX)
    labels, _ = nd.label(water | hole)
    seeds = np.unique(labels[hole])
    region = np.isin(labels, seeds[seeds > 0])
    region = nd.binary_closing(region, iterations=4)
    region = nd.binary_fill_holes(region)
    return nd.binary_opening(region, iterations=3)


def logo_box(cav: np.ndarray) -> tuple[float, float, float]:
    """Centro y diámetro (en % del lado) del mayor círculo casi entero dentro de la cavidad."""
    area = cav.astype(float)
    diameter = LOGO_MAX
    while diameter >= LOGO_MIN:
        kernel = disk(int(diameter * SIZE / 2)).astype(float)
        cover = signal.fftconvolve(area, kernel / kernel.sum(), mode="same")
        if cover.max() >= LOGO_INSIDE:
            y, x = np.unravel_index(cover.argmax(), cover.shape)
            return x / SIZE * 100, y / SIZE * 100, diameter * 100
        diameter -= LOGO_STEP
    raise ValueError("la cavidad es demasiado pequeña para el logo")


def band(cav: np.ndarray, out: int, inside: int) -> np.ndarray:
    """Franja a ambos lados del contorno de la cavidad."""
    ring = nd.binary_dilation(cav, iterations=out) & ~nd.binary_erosion(cav, iterations=inside)
    return ring.astype(float)


def disk(r: int) -> np.ndarray:
    y, x = np.ogrid[-r : r + 1, -r : r + 1]
    return x * x + y * y <= r * r


def save_mask(mask: np.ndarray, dest: Path) -> None:
    alpha = Image.fromarray((np.clip(mask, 0, 1) * 255).astype(np.uint8))
    out = Image.new("RGBA", alpha.size, (255, 255, 255, 0))
    out.putalpha(alpha)
    out.save(dest, "WEBP", quality=90)


def main() -> None:
    for src in sorted(TRACKS.glob("footprint-[0-9].webp")):
        cav = cavity(load(src))
        soft = nd.gaussian_filter(cav.astype(float), EDGE_SOFTEN)
        line = nd.gaussian_filter(band(cav, LINE_OUT, LINE_IN), LINE_SOFTEN)
        halo = nd.gaussian_filter(band(cav, HALO_OUT, HALO_IN), HALO_SOFTEN) * HALO_LEVEL
        rim = np.maximum(line, halo)
        save_mask(soft, src.with_name(f"{src.stem}-pool.webp"))
        save_mask(rim, src.with_name(f"{src.stem}-rim.webp"))
        x, y, size = logo_box(cav)
        print(f"{src.stem}: logo {{ x: {x:.1f}, y: {y:.1f}, size: {size:.1f} }}")


if __name__ == "__main__":
    main()
