"""Rebana el sprite de luciérnagas (rejilla 3x2 de celdas 600x600) en 6 imágenes.

Uso:  python scripts/slice-fireflies.py
Lee   public/art/fx/fireflies-sprite.webp
Crea  public/art/fx/firefly-1.webp ... firefly-6.webp (transparencia intacta)
"""

from pathlib import Path

from PIL import Image

FX = Path(__file__).resolve().parent.parent / "public" / "art" / "fx"
COLUMNS, ROWS, CELL = 3, 2, 600
WEBP_QUALITY = 85


def main():
    sprite = Image.open(FX / "fireflies-sprite.webp").convert("RGBA")
    expected = (COLUMNS * CELL, ROWS * CELL)
    if sprite.size != expected:
        raise SystemExit(f"El sprite mide {sprite.size}, se esperaba {expected}")
    for index in range(COLUMNS * ROWS):
        col, row = index % COLUMNS, index // COLUMNS
        cell = sprite.crop((col * CELL, row * CELL, (col + 1) * CELL, (row + 1) * CELL))
        target = FX / f"firefly-{index + 1}.webp"
        cell.save(target, "WEBP", quality=WEBP_QUALITY, method=6)
        print(f"{target.name}: caja visible {cell.getchannel('A').getbbox()}")


if __name__ == "__main__":
    main()
