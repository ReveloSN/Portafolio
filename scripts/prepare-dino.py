"""Prepara las imágenes del dinosaurio de cuerpo completo para el Hero.

Uso:  python scripts/prepare-dino.py
Lee   public/images/dino-full.png   (original con fondo transparente)
Crea  public/images/dino-full.webp       (1850 px, cuenca del ojo transparente)
      public/images/dino-full-1200.webp  (1200 px, para reflejo y pantallas pequeñas)

La cuenca del ojo grande se detecta con un relleno por inundación desde su centro:
todo píxel oscuro conectado se vuelve transparente para colocar detrás el globo ocular.
"""

import math
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

IMAGES = Path(__file__).resolve().parent.parent / "public" / "images"
SOURCE = IMAGES / "dino-full.png"

# Centro de la cuenca (px de la imagen original 1850x850) y límites de búsqueda
EYE_CENTER = (247, 121)
SEARCH_BOX = (180, 60, 320, 200)
DARK_LUMINANCE = 60
WEBP_QUALITY = 85
# La elipse se encoge un poco para no comerse el borde claro de la cuenca
ELLIPSE_SHRINK = 0.97
SMALL_WIDTH = 1200


def luminance(pixel):
    r, g, b = pixel[:3]
    return 0.299 * r + 0.587 * g + 0.114 * b


def socket_mask(image):
    """Máscara (L) blanca donde está el interior oscuro de la cuenca."""
    pixels = image.load()
    x0, y0, x1, y1 = SEARCH_BOX
    seen = {EYE_CENTER}
    queue = deque([EYE_CENTER])
    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if (nx, ny) in seen or not (x0 < nx < x1 and y0 < ny < y1):
                continue
            if luminance(pixels[nx, ny]) < DARK_LUMINANCE:
                seen.add((nx, ny))
                queue.append((nx, ny))
    return ellipse_mask(image.size, seen), seen


def ellipse_mask(size, region):
    """Elipse ajustada (momentos de segundo orden) a la región: borde liso, sin dientes."""
    n = len(region)
    mx = sum(p[0] for p in region) / n
    my = sum(p[1] for p in region) / n
    sxx = sum((p[0] - mx) ** 2 for p in region) / n
    syy = sum((p[1] - my) ** 2 for p in region) / n
    sxy = sum((p[0] - mx) * (p[1] - my) for p in region) / n
    # Ejes principales de la covarianza
    trace, det = sxx + syy, sxx * syy - sxy**2
    root = math.sqrt(max(trace**2 / 4 - det, 0))
    l1, l2 = trace / 2 + root, trace / 2 - root
    angle = 0.5 * math.atan2(2 * sxy, sxx - syy)
    # Para una elipse uniforme, varianza en un eje = semieje² / 4
    a, b = 2 * math.sqrt(l1) * ELLIPSE_SHRINK, 2 * math.sqrt(l2) * ELLIPSE_SHRINK
    scale = 4
    big = Image.new("L", (size[0] * scale, size[1] * scale), 0)
    points = [
        (
            (mx + a * math.cos(t) * math.cos(angle) - b * math.sin(t) * math.sin(angle)) * scale,
            (my + a * math.cos(t) * math.sin(angle) + b * math.sin(t) * math.cos(angle)) * scale,
        )
        for t in (i * 2 * math.pi / 180 for i in range(180))
    ]
    ImageDraw.Draw(big).polygon(points, fill=255)
    return big.resize(size, Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))


def main():
    image = Image.open(SOURCE).convert("RGBA")
    mask, region = socket_mask(image)
    xs = [p[0] for p in region]
    ys = [p[1] for p in region]
    width, height = image.size
    print(f"Cuenca: {len(region)} px, caja x {min(xs)}-{max(xs)}, y {min(ys)}-{max(ys)}")
    print(
        "En porcentaje: centro "
        f"{EYE_CENTER[0] / width:.2%} x {EYE_CENTER[1] / height:.2%}, "
        f"tamaño {(max(xs) - min(xs)) / width:.2%} x {(max(ys) - min(ys)) / height:.2%}"
    )

    alpha = image.getchannel("A")
    alpha.paste(0, mask=mask)
    image.putalpha(alpha)

    image.save(IMAGES / "dino-full.webp", "WEBP", quality=WEBP_QUALITY, method=6)
    small = image.resize((SMALL_WIDTH, round(height * SMALL_WIDTH / width)), Image.LANCZOS)
    small.save(IMAGES / "dino-full-1200.webp", "WEBP", quality=WEBP_QUALITY, method=6)
    print("Listo: dino-full.webp y dino-full-1200.webp")


if __name__ == "__main__":
    main()
