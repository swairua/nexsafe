#!/usr/bin/env python3
"""Derive the Nexsate favicon / Apple touch icon / Open Graph card from the
client-supplied wordmark, so every brand surface is the *same* logo.

Why this exists
---------------
`public/brand/nexsate-wordmark.png` is a flattened **RGB** PNG: the "transparent"
background the art was delivered with is a light-grey checkerboard baked into the
pixels (254,254,254 / 246,246,246). That is fine for the header/footer plate
but it means the artwork cannot be composited onto any other background.

The two brand surfaces that *must* be rebuilt from the artwork were not:

  * `favicon.svg` was a hand-made tile of three white bars - not the logo at all.
  * `og:image` pointed at `nexsate-banner.png` (600x150, 4:1) which is off the
    1200x630 card spec and still carries the retired "Managed IT / Software /
    Telecommunications" lockup rather than the current NEXSATE wordmark.

Pipeline: strip the checkerboard into a real alpha channel -> recover the
leading "N" glyph -> vector-trace it (Moore boundary walk + Ramer-Douglas-Peucker)
for a resolution-independent `favicon.svg`, and rasterise the same glyph for the
PNG icons and the 1200x630 share card.

Idempotent: an input that is already RGBA is passed through untouched, so the
cleaned wordmark can safely be written back to its own source path.

Usage:  python scripts/build-brand-assets.py
Requires: Pillow (`pip install Pillow`)
"""
from __future__ import annotations

import os
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, 'public')
BRAND = os.path.join(PUBLIC, 'brand')

WORDMARK_SRC = os.path.join(BRAND, 'nexsate-wordmark.png')
FAVICON_SVG = os.path.join(PUBLIC, 'favicon.svg')
APPLE_ICON = os.path.join(PUBLIC, 'apple-touch-icon.png')
OG_CARD = os.path.join(BRAND, 'nexsate-og.png')

# Solid ink colour sampled from the wordmark body.
INK = (1, 116, 164)                  # #0174A4

# Tile gradient: the documented 135deg brand sweep (index.css @theme).
TILE_TOP = (0x06, 0x93, 0xE3)       # --color-shell-red   #0693e3
TILE_BOTTOM = (0x01, 0x0E, 0xD0)    # --color-shell-red-dark #010ed0

TAGLINE = 'EnableIT. Transform. Empower.'
OG_BG_TOP = (0xF2, 0xF8, 0xFD)
OG_BG_BOTTOM = (0xFF, 0xFF, 0xFF)

FONT_CANDIDATES = [
    r'C:\Windows\Fonts\arialbd.ttf',      # closest local stand-in for Roboto
    r'C:\Windows\Fonts\segoeuib.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
]

# Glyph column run measured from the source wordmark (see tmp_analyze.py output).
N_BOX = (9, 9, 170, 137)


def log(msg: str) -> None:
    print(f'[brand-assets] {msg}')


# --------------------------------------------------------------------------- #
# 1. Source cleanup
# --------------------------------------------------------------------------- #
def to_clean_alpha(path: str) -> Image.Image:
    """Return the wordmark as RGBA with the baked-in checkerboard removed."""
    im = Image.open(path)
    if im.mode == 'RGBA':
        log(f'{os.path.basename(path)} already RGBA - alpha reused as-is')
        return im.convert('RGBA')

    rgb = im.convert('RGB')
    w, h = rgb.size
    px = rgb.load()

    # The checkerboard is two near-identical light greys, so greyness (spread of
    # the RGB channels) is a clean ink/paper discriminator: ink is strongly
    # blue-dominant, paper is neutral. Ramp it so antialiased edges keep partial
    # coverage instead of being snapped to hard pixels.
    out = Image.new('RGBA', (w, h))
    op = out.load()
    lo, hi = 22.0, 140.0
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            spread = max(r, g, b) - min(r, g, b)
            t = (spread - lo) / (hi - lo)
            t = 0.0 if t < 0 else (1.0 if t > 1 else t)
            op[x, y] = (*INK, int(round(255 * t)))
    log(f'stripped checkerboard from {os.path.basename(path)} ({w}x{h})')
    return out


# --------------------------------------------------------------------------- #
# 2. Vector trace of the leading "N"
# --------------------------------------------------------------------------- #
# Clockwise neighbour offsets, starting West.
N8 = [(-1, 0), (-1, -1), (0, -1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1)]


def _rdp(pts, eps):
    """Ramer-Douglas-Peucker polyline simplification."""
    if len(pts) < 3:
        return pts
    ax, ay = pts[0]
    bx, by = pts[-1]
    dx, dy = bx - ax, by - ay
    norm = (dx * dx + dy * dy) ** 0.5
    worst_i, worst = 0, -1.0
    for i in range(1, len(pts) - 1):
        px_, py_ = pts[i]
        if norm == 0:
            d = ((px_ - ax) ** 2 + (py_ - ay) ** 2) ** 0.5
        else:
            d = abs(dy * px_ - dx * py_ + bx * ay - by * ax) / norm
        if d > worst:
            worst_i, worst = i, d
    if worst <= eps:
        return [pts[0], pts[-1]]
    return _rdp(pts[:worst_i + 1], eps)[:-1] + _rdp(pts[worst_i:], eps)


def _shoelace(pts):
    s = 0
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        s += x1 * y2 - x2 * y1
    return s / 2.0


def trace_n(master: Image.Image):
    """Trace the first glyph of the wordmark.

    Returns ``(glyph_rgba, path_data, width, height)``. ``glyph_rgba`` is the
    cropped glyph for raster output; ``path_data`` is an SVG path in a viewBox
    of ``width x height`` with a 1px margin baked in on every side.
    """
    glyph = master.crop(N_BOX)
    alpha = glyph.getchannel('A')
    gw, gh = glyph.size
    ap = alpha.load()

    # Guard: the crop must contain exactly one glyph, otherwise N_BOX has drifted
    # relative to the artwork and the trace would silently produce garbage.
    runs, start = [], None
    for x in range(gw):
        col_ink = any(ap[x, y] > 128 for y in range(gh))
        if col_ink and start is None:
            start = x
        elif not col_ink and start is not None:
            runs.append((start, x - 1))
            start = None
    if start is not None:
        runs.append((start, gw - 1))
    if len(runs) != 1:
        raise SystemExit(
            f'N_BOX {N_BOX} should hold exactly one glyph, found {len(runs)}: {runs}'
        )

    glyph = glyph.crop(alpha.getbbox())
    gw, gh = glyph.size
    ap = glyph.getchannel('A').load()

    def is_ink(x, y):
        return 0 <= x < gw and 0 <= y < gh and ap[x, y] > 128

    def walk(start):
        contour = [start]
        cur, back = start, 0          # enter from the West
        limit = gw * gh * 8
        for _ in range(limit):
            hit = False
            for i in range(1, 9):     # clockwise from the backtrack pixel
                j = (back + i) % 8
                nx, ny = cur[0] + N8[j][0], cur[1] + N8[j][1]
                if is_ink(nx, ny):
                    back = (j + 4) % 8
                    cur = (nx, ny)
                    contour.append(cur)
                    hit = True
                    break
            if not hit:
                break
            if cur == start and len(contour) > 2:
                break
        return contour[:-1] if contour[-1] == start else contour

    seen, contours = set(), []
    for y in range(gh):
        for x in range(gw):
            if is_ink(x, y) and (x, y) not in seen:
                c = walk((x, y))
                seen.update(c)
                if len(c) >= 8:
                    contours.append(_rdp(c, 0.55))
    if not contours:
        raise SystemExit('glyph trace produced no contours')

    parts = []
    for c in contours:
        if _shoelace(c) < 0:
            c = c[::-1]               # wind every ring the same way
        # +1 shift into a viewBox with a 1px margin so strokes never clip.
        parts.append('M' + ' '.join(f'{x + 1},{y + 1}' for x, y in c) + 'Z')
    path = ''.join(parts)
    log(f'traced "N" -> {len(contours)} contour(s), {len(path)} path chars, {gw}x{gh}')
    return glyph, path, gw + 2, gh + 2


# --------------------------------------------------------------------------- #
# 3. Outputs
# --------------------------------------------------------------------------- #
def _vertical_gradient(size, top, bottom):
    """Diagonal (135deg) gradient, matching the site's brand sweep direction."""
    w, h = size
    grad = Image.new('RGB', (w, h))
    px = grad.load()
    span = float(w + h)
    for y in range(h):
        for x in range(w):
            t = (x + y) / span
            px[x, y] = tuple(int(round(top[i] + (bottom[i] - top[i]) * t)) for i in range(3))
    return grad


def write_favicon_svg(path_data, tw, th):
    """The real "N" in white on the brand tile, as a 100x100 SVG."""
    size = 100.0
    inset = size * 0.13                     # ~26px breathing room at 16px render
    box = size - 2 * inset
    scale = min(box / tw, box / th)         # preserve aspect; the N is wide
    tx = (size - tw * scale) / 2.0
    ty = (size - th * scale) / 2.0
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Nexsate">
  <!--
    Generated by scripts/build-brand-assets.py from public/brand/nexsate-wordmark.png
    (vector-traced leading "N"). Do not hand-edit: re-run the script instead.
  -->
  <defs>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0693e3"/>
      <stop offset="1" stop-color="#010ed0"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#tile)"/>
  <g transform="translate({tx:.3f} {ty:.3f}) scale({scale:.5f})">
    <path d="{path_data}" fill="#ffffff" fill-rule="evenodd"/>
  </g>
</svg>
'''
    with open(FAVICON_SVG, 'w', encoding='utf-8') as fh:
        fh.write(svg)
    log(f'wrote {os.path.relpath(FAVICON_SVG, ROOT)} ({len(svg)} bytes)')


def _glyph_mask(glyph, box, pad_ratio=0.0):
    """Scale the traced glyph into a square `box`, returning an 'L' alpha mask."""
    gw, gh = glyph.size
    inner = box * (1.0 - pad_ratio)
    scale = min(inner / gw, inner / gh)
    w, h = max(1, round(gw * scale)), max(1, round(gh * scale))
    resized = glyph.resize((w, h), Image.LANCZOS)
    mask = Image.new('L', (box, box), 0)
    mask.paste(resized.getchannel('A'), ((box - w) // 2, (box - h) // 2))
    return mask


def write_apple_icon(glyph, size=180):
    """iOS masks the icon itself and renders transparency as black, so ship an
    opaque square with the glyph knocked out in white."""
    tile = _vertical_gradient((size, size), TILE_TOP, TILE_BOTTOM)
    mask = _glyph_mask(glyph, size, pad_ratio=0.22)
    tile.paste(Image.new('RGB', (size, size), (255, 255, 255)), (0, 0), mask)
    tile.save(APPLE_ICON, 'PNG', optimize=True)
    log(f'wrote {os.path.relpath(APPLE_ICON, ROOT)} ({size}x{size})')


def _load_font(size):
    for candidate in FONT_CANDIDATES:
        if os.path.exists(candidate):
            return ImageFont.truetype(candidate, size)
    raise SystemExit(
        'No usable bold TTF found. Install Arial/Segoe UI, or edit FONT_CANDIDATES.'
    )


def _text_width(draw, text, font, tracking):
    return int(round(draw.textlength(text, font=font) + tracking * (len(text) - 1)))


def _draw_tracked(draw, xy, text, font, fill, tracking):
    """Draw `text` with extra letter-spacing (the wordmark's own tracking)."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking


def write_og_card(master, size=(1200, 630)):
    """1200x630 share card: the real wordmark + the live tagline.

    Replaces `nexsate-banner.png`, a 600x150 strip carrying the retired
    "Managed IT / Software / Telecommunications" lockup. Crawlers want
    >=600x315 (1.91:1); 600x150 is 4:1 and gets letterboxed or centre-cropped.
    """
    w, h = size
    card = _vertical_gradient(size, OG_BG_TOP, OG_BG_BOTTOM)
    draw = ImageDraw.Draw(card)

    font = _load_font(54)
    tracking = 2.0
    tagline_h = font.getbbox(TAGLINE)[3] - font.getbbox(TAGLINE)[1]

    # Measure the stack first, then centre it vertically so the card stays
    # balanced no matter how the artwork's aspect ratio moves.
    plate_w = int(w * 0.78)
    plate_h = int(plate_w * 0.155)
    rule_w, rule_h = 96, 6
    gap_above_tag = 58
    gap_above_rule = 46

    stack_h = plate_h + gap_above_tag + tagline_h + gap_above_rule + rule_h
    stack_y = (h - stack_h) // 2

    # Wordmark, on its own light plate (mirrors NexsateLogo's header treatment).
    plate_x = (w - plate_w) // 2
    plate_y = stack_y
    draw.rounded_rectangle(
        [plate_x, plate_y, plate_x + plate_w, plate_y + plate_h],
        radius=plate_h // 3, fill=(255, 255, 255), outline=(216, 219, 221), width=2,
    )

    logo = master.crop(master.getbbox())            # trim the transparent margin
    pad = int(plate_h * 0.16)
    target_w = plate_w - 2 * pad
    target_h = plate_h - 2 * pad
    scale = min(target_w / logo.width, target_h / logo.height)
    logo = logo.resize(
        (max(1, round(logo.width * scale)), max(1, round(logo.height * scale))),
        Image.LANCZOS,
    )
    card.paste(
        logo,
        (plate_x + (plate_w - logo.width) // 2, plate_y + (plate_h - logo.height) // 2),
        logo,
    )

    # Tagline, in the brand ink, letterspaced to match the wordmark.
    tag_y = plate_y + plate_h + gap_above_tag
    tw = _text_width(draw, TAGLINE, font, tracking)
    _draw_tracked(draw, ((w - tw) / 2.0, tag_y), TAGLINE, font, INK, tracking)

    # Accent rule under the tagline.
    rule_y = tag_y + tagline_h + gap_above_rule
    draw.rounded_rectangle(
        [(w - rule_w) // 2, rule_y, (w - rule_w) // 2 + rule_w, rule_y + rule_h],
        radius=rule_h // 2, fill=TILE_TOP,
    )

    card.save(OG_CARD, 'PNG', optimize=True)
    log(f'wrote {os.path.relpath(OG_CARD, ROOT)} ({w}x{h})')


# --------------------------------------------------------------------------- #
# 4. Entry point
# --------------------------------------------------------------------------- #
def main():
    if not os.path.exists(WORDMARK_SRC):
        raise SystemExit(f'missing source artwork: {WORDMARK_SRC}')

    master = to_clean_alpha(WORDMARK_SRC)
    glyph, path_data, tw, th = trace_n(master)

    write_favicon_svg(path_data, tw, th)
    write_apple_icon(glyph)
    write_og_card(master)

    # Write the de-checkerboarded wordmark back, so the header/footer logo and
    # every derived asset share one clean source. Idempotent (RGBA passes through).
    master.save(WORDMARK_SRC, 'PNG', optimize=True)
    log(f'wrote {os.path.relpath(WORDMARK_SRC, ROOT)} (clean alpha)')


if __name__ == '__main__':
    sys.exit(main())