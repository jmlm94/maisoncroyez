# Scent-note cards: one square card per scent = the scent name, three note illustrations, each note's name under it.
# The illustrations (raw/<key>.png, transparent, no lettering) were generated on 2026-11-14; the lettering is set here in the
# brand fonts so every name is exact. Needs: pillow numpy scipy fonttools brotli.
# usage: python compose.py [key ...]      (writes <scent-name>.png 2000x2000 and <scent-name>-1080.jpg next to this file)
import sys, os, tempfile
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__))
RAW, OUT = os.path.join(HERE, 'raw'), HERE; ONLY = sys.argv[1:]
CDN = os.path.join(HERE, '..', 'cdn'); F = tempfile.mkdtemp()
def _ttf(name):
    p = os.path.join(F, name + '.ttf')
    if not os.path.exists(p):
        from fontTools.ttLib import TTFont
        t = TTFont(os.path.join(CDN, name + '.woff2')); t.flavor = None; t.save(p)
    return p
W = 2000
SCENTS = [
 ('love', 'Golden Blossom Harmony', ['Buttercup', 'Honeysuckle', 'Sunflower'], (252, 244, 221)),
 ('abundance', 'Crisp Citrus Scape', ['Yuzu Leaf', 'Green Mandarin', 'Cypress'], (240, 246, 226)),
 ('focus', 'Chilled Citrus', ['Chilled Lavender', 'Eucalyptus', 'White Citrus'], (239, 236, 248)),
 ('ideas', 'Honey Nectar', ['Ginger Milk', 'White Birch', 'Eucalyptus Honey'], (252, 240, 226)),
 ('energy', 'Euphoric Bloom', ['Jasmine Tea', 'White Peach', 'Sandalwood Crème'], (253, 236, 228)),
 ('purify', 'Wildwood Mystique', ['Huckleberry', 'Wild Juniper', 'Mountain Fern'], (232, 242, 233)),
 ('midnight', 'Midnight Sensation', ['Moonflower', 'Night Lily', 'Skin Musk'], (228, 232, 247)),
]
INK = (28, 24, 20); GOLD = (150, 122, 62); MUTE = (92, 79, 70)
font = lambda name, size: ImageFont.truetype(_ttf(name), size)

def split3(im):
    """the three subjects, left to right. Whole shapes only: every connected blob goes to the column its centre falls in
    (cut lines at the two emptiest column bands near 1/3 and 2/3), so a petal tip that crosses a cut stays with its flower.
    Blobs under 900 px are stray specks and are dropped."""
    import numpy as np
    from scipy import ndimage
    arr = np.array(im); solid = arr[..., 3] > 0; h, w = solid.shape
    cols = solid[::4, ::4].sum(axis=0); sw = len(cols)
    def cut(lo, hi):
        return min(range(lo, hi), key=lambda x: (int(cols[max(0, x - 3):x + 4].sum()), abs(x - (lo + hi) // 2))) * 4
    c1 = cut(int(sw * .22), int(sw * .45)); c2 = cut(int(sw * .55), int(sw * .78))
    lab, n = ndimage.label(solid); idx = list(range(1, n + 1))
    sizes = ndimage.sum(solid, lab, idx); cxs = [c[1] for c in ndimage.center_of_mass(solid, lab, idx)]
    group = np.full(n + 1, -1)
    for i, sz, cx in zip(idx, sizes, cxs):
        if sz >= 900: group[i] = 0 if cx < c1 else 1 if cx < c2 else 2
    gmap = group[lab]; parts = []
    for g in range(3):
        m = gmap == g; ys, xs = np.where(m)
        sub = arr[ys.min():ys.max() + 1, xs.min():xs.max() + 1].copy(); sub[~m[ys.min():ys.max() + 1, xs.min():xs.max() + 1], 3] = 0
        parts.append(Image.fromarray(sub, 'RGBA'))
    return parts, (c1, c2)

def tracked(d, xy_center, text, f, fill, tracking):
    widths = [d.textlength(ch, font=f) for ch in text]; total = sum(widths) + tracking * (len(text) - 1)
    x = xy_center[0] - total / 2
    for ch, wd in zip(text, widths): d.text((x, xy_center[1]), ch, font=f, fill=fill); x += wd + tracking
    return total
def tracked_w(d, text, f, tracking): return sum(d.textlength(ch, font=f) for ch in text) + tracking * (len(text) - 1)

for key, name, notes, tint in SCENTS:
    if ONLY and key not in ONLY: continue
    src = os.path.join(RAW, key + '.png')
    if not os.path.exists(src): print('missing', src); continue
    im = Image.open(src).convert('RGBA')
    # the generator leaves a faint haze in the transparent areas: clear everything under alpha 44 and re-stretch the rest
    r, g, b, a = im.split(); a = a.point(lambda v: 0 if v < 44 else min(255, round((v - 44) * 255 / 196))); im = Image.merge('RGBA', (r, g, b, a))
    parts, cuts = split3(im)
    card = Image.new('RGBA', (W, W), tint + (255,)); d = ImageDraw.Draw(card)
    # frame: a white rounded panel that holds the three notes
    M = 90; top, bot = 400, W - 120
    d.rounded_rectangle((M, top, W - M, bot), radius=56, fill=(255, 255, 255, 255))
    # eyebrow + title
    fe = font('mc-lp-f-outfit-700', 40); tracked(d, (W / 2, 104), 'MAISON CROYEZ', fe, GOLD, 13)
    size = 148; ft = font('mc-lp-f-unna-700', size)
    while d.textlength(name, font=ft) > W - 2 * M - 40: size -= 4; ft = font('mc-lp-f-unna-700', size)
    tw = d.textlength(name, font=ft); d.text(((W - tw) / 2, 176 + (148 - size) / 2), name, font=ft, fill=INK)
    # three columns
    colw = (W - 2 * M) / 3; art_top, art_h = top + 70, 1080; label_y = art_top + art_h + 80
    fl = font('mc-lp-f-outfit-700', 54)
    for i, (p, note) in enumerate(zip(parts, notes)):
        cx = M + colw * (i + .5)
        maxw, maxh = colw - 70, art_h
        s = min(maxw / p.width, maxh / p.height); q = p.resize((max(1, round(p.width * s)), max(1, round(p.height * s))), Image.LANCZOS)
        card.alpha_composite(q, (round(cx - q.width / 2), round(art_top + (art_h - q.height) / 2)))
        if i: d.line((M + colw * i, art_top + 60, M + colw * i, label_y + 110), fill=(236, 230, 220, 255), width=3)
        txt = note.upper(); words = txt.split(' '); lines = [txt]
        if tracked_w(d, txt, fl, 5) > colw - 60 and len(words) > 1:
            best = min(range(1, len(words)), key=lambda k: abs(len(' '.join(words[:k])) - len(' '.join(words[k:])))); lines = [' '.join(words[:best]), ' '.join(words[best:])]
        y = label_y + (0 if len(lines) == 2 else 34)
        for ln in lines: tracked(d, (cx, y), ln, fl, INK, 5); y += 68
    os.makedirs(OUT, exist_ok=True)
    slug = name.lower().replace(' ', '-')
    card.convert('RGB').save(os.path.join(OUT, slug + '.png'), optimize=True)
    card.convert('RGB').resize((1080, 1080), Image.LANCZOS).save(os.path.join(OUT, slug + '-1080.jpg'), quality=90, optimize=True)
    print(key, slug, 'cuts', cuts, 'parts', [p.size for p in parts])
