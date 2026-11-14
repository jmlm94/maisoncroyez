# Scent cards, photo version (owner 2026-11-14: "full background ... really colorful images"): one square card per scent,
# three full-bleed photo panels (one per note, the real ingredient on a matching bold colour), the scent name on a white plate
# and each note's name on a white pill. Panels: photo/raw/<key>-<1|2|3>.jpg (generated, no lettering). The lettering is set
# here in the brand fonts. Needs: pillow fonttools brotli.
# usage: python compose_photo.py [key ...]   (writes photo/<scent-name>.jpg 2000x2000 and photo/<scent-name>-1080.jpg)
import sys, os, tempfile
from PIL import Image, ImageDraw, ImageFont, ImageFilter
HERE = os.path.dirname(os.path.abspath(__file__))
RAW, OUT = os.path.join(HERE, 'photo', 'raw'), os.path.join(HERE, 'photo'); ONLY = sys.argv[1:]
CDN = os.path.join(HERE, '..', 'cdn'); F = tempfile.mkdtemp()
def _ttf(name):
    p = os.path.join(F, name + '.ttf')
    if not os.path.exists(p):
        from fontTools.ttLib import TTFont
        t = TTFont(os.path.join(CDN, name + '.woff2')); t.flavor = None; t.save(p)
    return p
font = lambda name, size: ImageFont.truetype(_ttf(name), size)
W = 2000; G = 14; PW = (W - 2 * G) / 3
INK = (28, 24, 20); GOLD = (150, 122, 62)
SCENTS = [
 ('love', 'Golden Blossom Harmony', ['Buttercup', 'Honeysuckle', 'Sunflower']),
 ('abundance', 'Crisp Citrus Scape', ['Yuzu Leaf', 'Green Mandarin', 'Cypress']),
 ('focus', 'Chilled Citrus', ['Chilled Lavender', 'Eucalyptus', 'White Citrus']),
 ('ideas', 'Honey Nectar', ['Ginger Milk', 'White Birch', 'Eucalyptus Honey']),
 ('energy', 'Euphoric Bloom', ['Jasmine Tea', 'White Peach', 'Sandalwood Crème']),
 ('purify', 'Wildwood Mystique', ['Huckleberry', 'Wild Juniper', 'Mountain Fern']),
 ('midnight', 'Midnight Sensation', ['Moonflower', 'Night Lily', 'Skin Musk']),
]
def tw(d, text, f, tr): return sum(d.textlength(ch, font=f) for ch in text) + tr * (len(text) - 1)
def tracked(d, cx, y, text, f, fill, tr):
    x = cx - tw(d, text, f, tr) / 2
    for ch in text: d.text((x, y), ch, font=f, fill=fill); x += d.textlength(ch, font=f) + tr
def plate(card, box, radius):
    """a white rounded plate with a soft shadow under it"""
    x0, y0, x1, y1 = [round(v) for v in box]; pad = 60
    sh = Image.new('RGBA', (x1 - x0 + 2 * pad, y1 - y0 + 2 * pad), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle((pad, pad + 10, pad + x1 - x0, pad + y1 - y0 + 10), radius=radius, fill=(0, 0, 0, 105))
    card.alpha_composite(sh.filter(ImageFilter.GaussianBlur(22)), (x0 - pad, y0 - pad))
    ImageDraw.Draw(card).rounded_rectangle((x0, y0, x1, y1), radius=radius, fill=(255, 255, 255, 255))
def cover(im, w, h):
    s = max(w / im.width, h / im.height); q = im.resize((round(im.width * s) + 1, round(im.height * s) + 1), Image.LANCZOS)
    x = (q.width - w) // 2; y = (q.height - h) // 2; return q.crop((x, y, x + w, y + h))

for key, name, notes in SCENTS:
    if ONLY and key not in ONLY: continue
    srcs = [os.path.join(RAW, '%s-%d.jpg' % (key, i + 1)) for i in range(3)]
    if not all(os.path.exists(s) for s in srcs): print('missing panels for', key); continue
    card = Image.new('RGBA', (W, W), (255, 255, 255, 255))
    for i, s in enumerate(srcs):
        x0 = round(i * (PW + G)); x1 = round(i * (PW + G) + PW)
        card.paste(cover(Image.open(s).convert('RGB'), x1 - x0, W), (x0, 0))
    d = ImageDraw.Draw(card)
    # the scent name
    fe = font('mc-lp-f-outfit-700', 34); size = 124; ft = font('mc-lp-f-unna-700', size)
    while d.textlength(name, font=ft) > 1380: size -= 4; ft = font('mc-lp-f-unna-700', size)
    nw = d.textlength(name, font=ft); pw_ = max(nw, tw(d, 'MAISON CROYEZ', fe, 12)) + 150
    top = 84; ph = 74 + 34 + 26 + size + 38
    plate(card, ((W - pw_) / 2, top, (W + pw_) / 2, top + ph), 46); d = ImageDraw.Draw(card)
    tracked(d, W / 2, top + 50, 'MAISON CROYEZ', fe, GOLD, 12)
    d.text(((W - nw) / 2, top + 50 + 34 + 14), name, font=ft, fill=INK)
    # the three note names
    fl = font('mc-lp-f-outfit-700', 50); TR = 5
    for i, note in enumerate(notes):
        cx = i * (PW + G) + PW / 2; txt = note.upper(); words = txt.split(' '); lines = [txt]
        if tw(d, txt, fl, TR) > PW - 170 and len(words) > 1:
            k = min(range(1, len(words)), key=lambda k: abs(len(' '.join(words[:k])) - len(' '.join(words[k:])))); lines = [' '.join(words[:k]), ' '.join(words[k:])]
        lw = max(tw(d, ln, fl, TR) for ln in lines); lh = 64; bh = len(lines) * lh + 52; bw = lw + 96
        y1 = W - 96; y0 = y1 - bh
        plate(card, (cx - bw / 2, y0, cx + bw / 2, y1), 44 if len(lines) == 2 else bh // 2); d = ImageDraw.Draw(card)
        y = y0 + 26 - 6
        for ln in lines: tracked(d, cx, y, ln, fl, INK, TR); y += lh
    os.makedirs(OUT, exist_ok=True); slug = name.lower().replace(' ', '-'); rgb = card.convert('RGB')
    rgb.save(os.path.join(OUT, slug + '.jpg'), quality=92, optimize=True, subsampling=0)
    rgb.resize((1080, 1080), Image.LANCZOS).save(os.path.join(OUT, slug + '-1080.jpg'), quality=90, optimize=True)
    print(key, slug, 'ok')
