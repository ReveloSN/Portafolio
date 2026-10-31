"""
Máscaras del charco de cada huella (public/art/tracks/footprint-N-pool.webp).

El interior de la huella (hueco central y agua translúcida de los dedos) es la zona
transparente que no conecta con el exterior. Se rellena por inundación desde los bordes,
se expande un poco para meterse bajo el barro y se suaviza. El CSS usa el alfa como
máscara del color de marca que va detrás de la ilustración.

Uso:  python scripts/pool-masks.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

TRACKS = Path("public/art/tracks")
WALL_ALPHA = 235  # el barro es casi opaco; el agua y el hueco, no
OUT_SIZE = 372  # 1/4 del original: basta para una máscara suave
GROW_PX = 9  # se mete bajo el borde de barro (en px del original / 4)
SOFTEN_PX = 3
SPECK_PX = 9  # huecos menores que esto no son charco


def pool_mask(src: Path) -> Image.Image:
    alpha = Image.open(src).getchannel("A")
    small = alpha.resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS)
    walls = small.point(lambda v: 255 if v >= WALL_ALPHA else 0)
    # Marco de 1px abierto: la inundación rodea toda la huella desde fuera
    framed = Image.new("L", (OUT_SIZE + 2, OUT_SIZE + 2), 0)
    framed.paste(walls, (1, 1))
    ImageDraw.floodfill(framed, (0, 0), 128)
    outside = framed.crop((1, 1, OUT_SIZE + 1, OUT_SIZE + 1))
    interior = outside.point(lambda v: 255 if v == 0 else 0)
    # Apertura: quita los huecos sueltos entre las piedritas del borde exterior
    opened = interior.filter(ImageFilter.MinFilter(SPECK_PX)).filter(
        ImageFilter.MaxFilter(SPECK_PX)
    )
    grown = opened.filter(ImageFilter.MaxFilter(GROW_PX))
    return grown.filter(ImageFilter.GaussianBlur(SOFTEN_PX))


def main() -> None:
    for src in sorted(TRACKS.glob("footprint-[0-9].webp")):
        mask = pool_mask(src)
        out = Image.new("RGBA", mask.size, (255, 255, 255, 0))
        out.putalpha(mask)
        dest = src.with_name(f"{src.stem}-pool.webp")
        out.save(dest, "WEBP", quality=80)
        print(dest, dest.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
