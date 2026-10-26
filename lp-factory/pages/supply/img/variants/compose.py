#!/usr/bin/env python3
"""Variant pictures for the Scent Supply product, composed from the REAL product photos (no AI): the seven scent
bottle+box photos (lp-factory/assets/cdn/products/*.png, first image of each scent product on the store) and a diffuser
packshot (lp-factory/assets/cdn/diffuser/*.png). One tile per bottle, one tile per free diffuser, a caption band on top.
  6  → 3×2 bottles
  9  → 3×3 bottles + the diffuser as a tall 1×3 tile
  12 → 4×4 grid: 12 bottles + the diffuser as a 2×2 tile (bottom right)
  18 → 5×4 grid: 18 bottles + 2 diffuser tiles (bottom right)
usage: DIFF=<diffuser png> python3 compose.py   → supply-{6,9,12,18}-real.jpg (1600², sRGB JPEG q92)"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.join(HERE, "..", "..", "..", "..", "assets", "cdn", "products")
DIFF = os.environ.get("DIFF") or os.path.join(HERE, "..", "..", "..", "..", "assets", "cdn", "diffuser", "d92.png")
FONT_B = "/mnt/skills/examples/canvas-design/canvas-fonts/Outfit-Bold.ttf"
FONT_R = "/mnt/skills/examples/canvas-design/canvas-fonts/Outfit-Regular.ttf"
SCENTS = ["golden-blossom", "crisp-citrus", "chilled-citrus", "honey-nectar", "euphoric-bloom", "wildwood-mystique", "midnight-sensation"]
BG = (246, 242, 236); INK = (24, 22, 20); MUTED = (110, 104, 96); GREEN = (22, 122, 72)
W = 1600; PAD = 56; GAP = 18; RADIUS = 28

def load(p):
    im = Image.open(p); im.load()
    if im.mode in ("P", "LA", "RGBA"):
        bg = Image.new("RGB", im.size, BG); bg.paste(im.convert("RGBA"), mask=im.convert("RGBA").split()[-1]); return bg
    return im.convert("RGB")

def cover(im, w, h, focus=(0.5, 0.55)):
    """crop-to-cover with a focus point (fractions of the source)"""
    sw, sh = im.size; s = max(w / sw, h / sh)
    nw, nh = max(w, round(sw * s)), max(h, round(sh * s)); im = im.resize((nw, nh), Image.LANCZOS)
    cx, cy = focus[0] * nw, focus[1] * nh
    x = min(max(0, cx - w / 2), nw - w); y = min(max(0, cy - h / 2), nh - h)
    return im.crop((round(x), round(y), round(x) + w, round(y) + h))

def rounded(im, r=RADIUS):
    m = Image.new("L", im.size, 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, im.size[0] - 1, im.size[1] - 1), r, fill=255)
    out = Image.new("RGB", im.size, BG); out.paste(im, mask=m); return out, m

def shadow(canvas, box, r=RADIUS):
    x0, y0, x1, y1 = box; sh = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle((x0, y0 + 10, x1, y1 + 10), r, fill=(60, 40, 20, 46))
    sh = sh.filter(ImageFilter.GaussianBlur(14)); canvas.paste(Image.alpha_composite(canvas.convert("RGBA"), sh).convert("RGB"))

def caption(d, y, title, sub, green=None):
    fb = ImageFont.truetype(FONT_B, 92); fr = ImageFont.truetype(FONT_R, 44); fg = ImageFont.truetype(FONT_B, 44)
    tw = d.textlength(title, font=fb); d.text(((W - tw) / 2, y), title, font=fb, fill=INK)
    y2 = y + 112
    if green:
        sw_ = d.textlength(sub + "  ", font=fr); gw = d.textlength(green, font=fg); x = (W - sw_ - gw) / 2
        d.text((x, y2), sub + "  ", font=fr, fill=MUTED); d.text((x + sw_, y2), green, font=fg, fill=GREEN)
    else:
        sw_ = d.textlength(sub, font=fr); d.text(((W - sw_) / 2, y2), sub, font=fr, fill=MUTED)

def build(n, cols, rows, slots, title, sub, green, name):
    """slots: list of (kind, c, r, cw, rh); kind 'b' (bottle i) or 'd' (diffuser)"""
    cap_h = 230
    tile = min((W - 2 * PAD - (cols - 1) * GAP) // cols, (W - cap_h - PAD - (rows - 1) * GAP) // rows)  # always fits 1600²
    grid_w = cols * tile + (cols - 1) * GAP; grid_h = rows * tile + (rows - 1) * GAP
    total = cap_h + grid_h + PAD; H = W; top = cap_h + (H - total) / 2 + 10; left = (W - grid_w) // 2
    canvas = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(canvas)
    caption(d, (H - total) / 2 + 34, title, sub, green)
    bottles = [load(os.path.join(PROD, SCENTS[i % 7] + ".png")) for i in range(n)]
    diff = load(DIFF); bi = 0
    for kind, c, r, cw, rh in slots:
        w = cw * tile + (cw - 1) * GAP; h = rh * tile + (rh - 1) * GAP
        x = left + c * (tile + GAP); y = round(top + r * (tile + GAP))
        if kind == "b":
            im = cover(bottles[bi], w, h, (0.5, 0.56)); bi += 1
        else:
            im = cover(diff, w, h, (0.5, 0.5))
        shadow(canvas, (x, y, x + w, y + h)); d = ImageDraw.Draw(canvas)
        im, m = rounded(im); canvas.paste(im, (x, y), m)
    assert bi == n, (name, bi, n)
    out = os.path.join(HERE, f"supply-{name}-real.jpg"); canvas.save(out, quality=92, subsampling=0, optimize=True)
    print(out, os.path.getsize(out))

if __name__ == "__main__":
    s6 = [("b", i % 3, i // 3, 1, 1) for i in range(6)]
    build(6, 3, 2, s6, "6-Month Supply", "6 bottles · one each month", None, "6")
    s9 = [("b", i % 3, i // 3, 1, 1) for i in range(9)] + [("d", 3, 0, 1, 3)]
    build(9, 4, 3, s9, "9-Month Supply", "9 bottles", "+ 1 FREE diffuser", "9")
    s12 = [("b", i, 0, 1, 1) for i in range(4)] + [("b", i, 1, 1, 1) for i in range(4)] + [("b", 0, 2, 1, 1), ("b", 1, 2, 1, 1), ("b", 0, 3, 1, 1), ("b", 1, 3, 1, 1), ("d", 2, 2, 2, 2)]
    build(12, 4, 4, s12, "12-Month Supply", "12 bottles", "+ 1 FREE diffuser", "12")
    s18 = [("b", i % 5, i // 5, 1, 1) for i in range(18)] + [("d", 3, 3, 1, 1), ("d", 4, 3, 1, 1)]
    build(18, 5, 4, s18, "18-Month Supply", "18 bottles", "+ 2 FREE diffusers", "18")
