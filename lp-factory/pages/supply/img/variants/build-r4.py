#!/usr/bin/env python3
"""Variant pictures for the 9 / 18 / 24-month supplies (2026-11-16), built from the generated flat lays (supply-*-r3.webp).

Why this exists: the generated 9-month picture is right (nine sets, no diffuser, every scent name correct), but the dense
18- and 24-month ones came back with misspelled labels ("Crisp Citrus Escape", "Midnight Meditation", "Maison Crotez").
So the 18 and 24 pictures keep only their marble, their layout and their diffusers, and every bottle + box set is keyed
in from the correct 9-month picture. Two small retouches: the third note on the Euphoric Bloom box ("Sandalwood crème")
and the brand name on the diffuser cap ("MAISON CROYEZ").

  supply-9-r4.jpg   9 sets, no diffuser
  supply-18-r4.jpg  18 sets + 1 diffuser
  supply-24-r4.jpg  24 sets + 2 diffusers

usage: python3 build-r4.py   (needs pillow, numpy, scipy; fonts from FONTS)"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import gaussian_filter, binary_closing, binary_fill_holes, binary_opening

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.environ.get("FONTS", "/mnt/skills/examples/canvas-design/canvas-fonts")
SANS = os.path.join(FONTS, "Outfit-Regular.ttf")
ITALIC = os.path.join(FONTS, "CrimsonPro-Italic.ttf")


def load(name):
    return np.asarray(Image.open(os.path.join(HERE, name)).convert("RGB")).astype(np.float32)


def save(arr, name):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(os.path.join(HERE, name), "JPEG", quality=92, subsampling=0, optimize=True)
    print(name, os.path.getsize(os.path.join(HERE, name)))


def blur3(a, sigma):
    return np.stack([gaussian_filter(a[:, :, c], sigma) for c in range(3)], axis=2)


def erase(arr, box, along):
    """fills a box from the pixels just outside it: along='x' joins left and right (a box with a top-to-bottom gradient),
    along='y' joins above and below (the cap of the diffuser, shaded left to right)"""
    x0, y0, x1, y1 = box
    if along == "x":
        a = arr[y0:y1, x0 - 4:x0 - 1].mean(axis=1)[:, None, :]; b = arr[y0:y1, x1 + 1:x1 + 4].mean(axis=1)[:, None, :]
        t = np.linspace(0, 1, x1 - x0)[None, :, None]
    else:
        a = arr[y0 - 4:y0 - 1, x0:x1].mean(axis=0)[None, :, :]; b = arr[y1 + 1:y1 + 4, x0:x1].mean(axis=0)[None, :, :]
        t = np.linspace(0, 1, y1 - y0)[:, None, None]
    arr[y0:y1, x0:x1] = a * (1 - t) + b * t


def draw_line(arr, text, font_path, size, cx, baseline, color, width=None, opacity=1.0, ss=8):
    """one centred line on a baseline; `width` spaces the letters out to that width (px)"""
    font = ImageFont.truetype(font_path, round(size * ss))
    adv = [font.getlength(ch) for ch in text]
    extra = 0 if width is None else (width * ss - sum(adv)) / (len(text) - 1)
    total = sum(adv) + extra * (len(text) - 1)
    x0 = int(cx - total / ss / 2) - 6; x1 = int(cx + total / ss / 2) + 7
    y0 = int(baseline - size * 1.3); y1 = int(baseline + size * 0.6)
    layer = Image.new("L", ((x1 - x0) * ss, (y1 - y0) * ss), 0); d = ImageDraw.Draw(layer)
    x = (cx - x0) * ss - total / 2; by = (baseline - y0) * ss
    if width is None:
        d.text((x, by), text, font=font, fill=255, anchor="ls")
    else:
        for ch, w in zip(text, adv):
            d.text((x, by), ch, font=font, fill=255, anchor="ls"); x += w + extra
    a = np.asarray(layer.resize((x1 - x0, y1 - y0), Image.LANCZOS)).astype(np.float32)[:, :, None] / 255.0 * opacity
    reg = arr[y0:y1, x0:x1]
    reg[:] = reg * (1 - a) + np.array(color, dtype=np.float32)[None, None, :] * a
    return total / ss


def fix_cap(arr, x0):
    """MAISON CROTEZ -> MAISON CROYEZ on a diffuser cap; the two lines sit at x0..x0+49, y 967..988 in every picture"""
    erase(arr, [x0 - 3, 964, x0 + 52, 991], "y")
    cx = x0 + 24.5
    draw_line(arr, "MAISON", SANS, 11.3, cx, 975.4, (86, 84, 84), width=48.6)
    draw_line(arr, "CROYEZ", SANS, 11.3, cx, 987.9, (86, 84, 84), width=48.6)


def ramp_mask(w, h, left, top, right, bottom):
    """1 inside, falling to 0 over the given number of px at each side (0 = no fall on that side)"""
    x = np.arange(w, dtype=np.float32); y = np.arange(h, dtype=np.float32)
    mx = np.ones(w, np.float32); my = np.ones(h, np.float32)
    if left: mx = np.minimum(mx, np.clip((x + 1) / left, 0, 1))
    if right: mx = np.minimum(mx, np.clip((w - x) / right, 0, 1))
    if top: my = np.minimum(my, np.clip((y + 1) / top, 0, 1))
    if bottom: my = np.minimum(my, np.clip((h - y) / bottom, 0, 1))
    return np.minimum(mx[None, :], my[:, None])


def clear_marble(arr, band, inner, feather, keep):
    """replaces everything in `inner` (x0, y0, x1, y1) with clean marble: the picture's own light (estimated from the marble
    that shows between and around the items, never from the boxes in `keep`) times the veins of the clean strip `band`
    (y0, y1) at the top of the picture"""
    lum = arr.mean(axis=2); sat = arr.max(axis=2) - arr.min(axis=2)
    med = np.median(lum[band[0]:band[1]])
    free = np.ones(lum.shape, bool)
    for (kx0, ky0, kx1, ky1) in keep: free[ky0:ky1, kx0:kx1] = False
    def light(mask, sigma):
        m = mask.astype(np.float32); c = gaussian_filter(m, sigma)
        return blur3(arr * m[:, :, None], sigma) / np.maximum(c, 1e-4)[:, :, None], c
    mask = free & (sat < 14) & (lum > med - 30) & (lum < med + 18)
    for _ in range(3):                                       # each pass drops what is darker than the marble around it (shadows)
        near, conf = light(mask, 40); far, _ = light(mask, 170)
        w = np.clip(conf / 0.10, 0, 1)[:, :, None]
        L = near * w + far * (1 - w); Ll = L.mean(axis=2)
        mask = free & (sat < 14) & (lum > Ll - 5) & (lum < Ll + 14)
    x0, y0, x1, y1 = inner; fl, ft, fr, fb = feather
    X0, Y0, X1, Y1 = x0 - fl, y0 - ft, min(arr.shape[1], x1 + fr), y1 + fb
    strip = arr[band[0]:band[1]]
    veins = strip / blur3(strip, 22)
    rows = []; i = 0
    while sum(r.shape[0] for r in rows) < Y1 - Y0:
        rows.append(veins if i % 2 == 0 else veins[::-1]); i += 1
    tex = np.concatenate(rows, axis=0)[:Y1 - Y0, X0:X1] * L[Y0:Y1, X0:X1]
    m = ramp_mask(X1 - X0, Y1 - Y0, fl, ft, fr, fb)[:, :, None]
    reg = arr[Y0:Y1, X0:X1]
    reg[:] = reg * (1 - m) + tex * m


def cells(nine):
    """the nine sets of the 9-month picture, each with a margin of marble; reading order"""
    rows = [(232, 743, [(383, 725), (818, 1173), (1258, 1630)]), (801, 1308, [(380, 723), (815, 1175), (1264, 1633)]), (1365, 1873, [(382, 731), (815, 1178), (1263, 1632)])]
    names = ["golden", "crisp", "chilled", "honey", "euphoric", "wildwood", "midnight", "golden2", "crisp2"]
    out = {}; M = 27
    for (y0, y1, cols) in rows:
        for (x0, x1) in cols:
            out[names[len(out)]] = nine[y0 - M:y1 + M, x0 - M:x1 + M].copy()
    return out, M


def key_in(arr, cell, x0, y0, ramps, marble=None, mask=None):
    """lays an item onto the marble without the marble it was shot on. The item itself (and the dark of its shadow) is
    copied; the soft rest of the shadow multiplies the marble it lands on; everything that was plain marble is dropped."""
    nh, nw = cell.shape[:2]
    if marble is None:
        f = max(ramps)
        ring = np.ones((nh, nw), bool); ring[f:-f, f:-f] = False
        marble = np.median(cell[ring], axis=0)
    R = cell / marble[None, None, :]
    d = np.abs(R - 1).max(axis=2)
    solid = binary_opening(binary_fill_holes(binary_closing(d > 0.06, iterations=2)), iterations=1)
    ramp = ramp_mask(nw, nh, *ramps) if mask is None else mask
    ko = (gaussian_filter(solid.astype(np.float32), 0.8) * ramp)[:, :, None]
    dark = (1 - R).max(axis=2)                               # only what is darker than the marble counts as shadow
    k = np.clip((dark - 0.03) / 0.03, 0, 1); k = (k * k * (3 - 2 * k) * ramp)[:, :, None]
    R = np.minimum(R, 1) * (1 - ko) + R * ko
    reg = arr[y0:y0 + nh, x0:x0 + nw]
    gain = np.median(reg.reshape(-1, 3), axis=0) / marble      # the marble it lands on, against the marble it was shot on
    reg[:] = reg * (1 + k * (R - 1)) * (1 - ko) + cell * gain[None, None, :] * ko


def grid(arr, sets, margin, order, x0, x1, y0, y1, cols, max_row_gap=110):
    rows = len(order) // cols
    wmax = max(c.shape[1] for c in sets.values()) - 2 * margin; hmax = max(c.shape[0] for c in sets.values()) - 2 * margin
    gap = 24
    scale = ((x1 - x0) - (cols - 1) * gap) / cols / wmax
    pitch_x = wmax * scale + gap
    row_gap = min(max_row_gap, ((y1 - y0) - rows * hmax * scale) / max(1, rows - 1))
    pitch_y = hmax * scale + row_gap
    top = (y0 + y1) / 2 - ((rows - 1) * pitch_y) / 2
    f = max(4, int(margin * scale) - 2)
    for i, name in enumerate(order):
        r, c = divmod(i, cols)
        cell = sets[name]; h, w = cell.shape[:2]; nw, nh = round(w * scale), round(h * scale)
        im = np.asarray(Image.fromarray(np.clip(cell, 0, 255).astype(np.uint8)).resize((nw, nh), Image.LANCZOS)).astype(np.float32)
        cx = x0 + wmax * scale / 2 + c * pitch_x; cy = top + r * pitch_y
        key_in(arr, im, int(round(cx - nw / 2)), int(round(cy - nh / 2)), (f, f, f, f))
    print("grid", cols, "x", rows, "scale", round(scale, 3), "row gap", round(row_gap))


def with_sets(name, out, order, band, inner, feather, area, body, caps):
    """a base picture keeps its marble and its diffusers (cut out first, laid back last); the sets come from the 9-month one.
    `body` is the box of the diffuser(s). Only the body and the shadow it throws to the right and below come back: the
    marble left of it and above it held the shadows of the old bottles."""
    pic = load(name)
    bl, bt, br, bb = body
    dx0, dy0, dx1, dy1 = bl - 2, bt - 2, min(pic.shape[1], br + 90), bb + 60
    diff = pic[dy0:dy1, dx0:dx1].copy()
    diff_marble = np.median(pic[bt - 24:bt - 6, br + 40:br + 120].reshape(-1, 3), axis=0) if br + 120 <= pic.shape[1] else np.median(pic[bt - 60:bt - 30, bl:br].reshape(-1, 3), axis=0)
    x = np.arange(dx0, dx1, dtype=np.float32)[None, :]; y = np.arange(dy0, dy1, dtype=np.float32)[:, None]
    ax = (x >= bl) * np.clip(1 - (x - br) / 85, 0, 1)
    ay = (y >= bt) * np.clip(1 - (y - bb) / 55, 0, 1)
    below = np.where(y > bb, np.clip((x - bl) / 22, 0, 1), 1.0)
    clear_marble(pic, band, inner, feather, [(dx0 - 30, dy0 - 30, dx1, dy1)])
    grid(pic, sets, M, order, *area, 6)
    key_in(pic, diff, dx0, dy0, (0, 0, 0, 0), marble=diff_marble, mask=(ax * ay * below).astype(np.float32))
    for x in caps: fix_cap(pic, x)
    save(pic, out)


# ---------- 9 months: the generated picture, with the one note fixed ("Sandalwood citrurs" -> "Sandalwood crème") ----------
nine = load("supply-9-r3.webp")
cream = np.percentile(nine[1164:1177, 878:948].reshape(-1, 3), 96, axis=0)          # the ink of the line above ("White peach")
probe = ImageFont.truetype(ITALIC, 400)
size = 400 * 71.6 / probe.getlength("White peach")                                 # "White peach" is 71.6 px wide in the picture
erase(nine, [850, 1199, 976, 1221], "x")
wd = draw_line(nine, "Sandalwood crème", ITALIC, size, 913, 1214.8, tuple(cream), opacity=0.96)
print("note: font size", round(size, 1), "line width", round(wd, 1))
save(nine, "supply-9-r4.jpg")
sets, M = cells(nine)

ORDER18 = ["golden", "crisp", "chilled", "honey", "euphoric", "wildwood",
           "midnight", "golden2", "crisp2", "chilled", "honey", "euphoric",
           "wildwood", "midnight", "golden", "crisp", "chilled", "honey"]
ORDER24 = ORDER18 + ["euphoric", "wildwood", "midnight", "golden2", "crisp2", "chilled"]

# ---------- 18 months: its own marble and diffuser, the sets from the 9-month picture ----------
with_sets("supply-18-r3.webp", "supply-18-r4.jpg", ORDER18, (18, 262), (88, 268, 2000, 1752), (40, 36, 0, 40), (97, 1742, 278, 1740),
          (1758, 919, 1858, 1430), [1785])

# ---------- 24 months: its own marble and two diffusers ----------
with_sets("supply-24-r3.webp", "supply-24-r4.jpg", ORDER24, (18, 266), (88, 274, 2000, 1912), (40, 36, 0, 40), (97, 1745, 285, 1905),
          (1758, 919, 1970, 1430), [1785, 1896])
