"""Compose a side-by-side comparison: original (Firecrawl 1440 capture) vs A3 rebuild (Playwright 1440 capture)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

EV = Path(__file__).parent
ORIG = EV / "original-fullpage.png"
REBUILD = EV / "caso-a3-rebuild-1440.png"
OUT = EV / "compare-original-vs-a3.png"

PADDING = 32
HEADER = 64
GAP = 24


def main() -> None:
    a = Image.open(ORIG).convert("RGB")
    b = Image.open(REBUILD).convert("RGB")

    # Match heights for an honest side-by-side
    h_target = max(a.height, b.height)
    a = a.resize((int(a.width * h_target / a.height), h_target), Image.LANCZOS) if a.height != h_target else a
    b = b.resize((int(b.width * h_target / b.height), h_target), Image.LANCZOS) if b.height != h_target else b

    # Cap each side at a sensible thumbnail width to keep the compare image small
    max_w = 720
    if a.width > max_w:
        new_h = int(a.height * max_w / a.width)
        a = a.resize((max_w, new_h), Image.LANCZOS)
    if b.width > max_w:
        new_h = int(b.height * max_w / b.width)
        b = b.resize((max_w, new_h), Image.LANCZOS)

    # Re-align heights after resize
    h = max(a.height, b.height)

    canvas_w = PADDING * 2 + a.width + GAP + b.width
    canvas_h = HEADER + PADDING + h + PADDING

    canvas = Image.new("RGB", (canvas_w, canvas_h), (245, 244, 241))
    draw = ImageDraw.Draw(canvas)

    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Helvetica.ttc", 24)
        small = ImageFont.truetype("/System/Library/Fonts/Supplemental/Helvetica.ttc", 14)
    except Exception:
        font = ImageFont.load_default()
        small = ImageFont.load_default()

    draw.text((PADDING, 18), "Original (live)", fill=(23, 28, 28), font=font)
    draw.text((PADDING, 44), "pieterkoopt.nl · captured by Firecrawl Cloud, viewport 1440", fill=(110, 125, 95), font=small)

    right_x = PADDING + a.width + GAP
    draw.text((right_x, 18), "Caso A3 rebuild", fill=(23, 28, 28), font=font)
    draw.text((right_x, 44), "MD Design System · /clones/pieterkoopt · viewport 1440", fill=(110, 125, 95), font=small)

    canvas.paste(a, (PADDING, HEADER + PADDING))
    canvas.paste(b, (right_x, HEADER + PADDING))

    canvas.save(OUT, optimize=True)
    print(f"saved {OUT}: {OUT.stat().st_size//1024} KB at {canvas.size}")


if __name__ == "__main__":
    main()
