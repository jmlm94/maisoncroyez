#!/usr/bin/env python3
"""Pictures for the home page proposal, all from the owner's shoot (diffuser-kits-rebrand/gallery/shoot, shoot-full) and the
kits page's own files. usage: python3 make-img.py   (needs pillow)"""
import os, shutil
from PIL import Image
D = os.path.dirname(os.path.abspath(__file__))
K = os.path.join(D, '..', 'diffuser-kits-rebrand')
OUT = os.path.join(D, 'img'); os.makedirs(OUT, exist_ok=True)

def shoot(n):
    full = os.path.join(K, 'gallery', 'shoot-full', 'shoot-%02d.webp' % n)
    return Image.open(full if os.path.exists(full) else os.path.join(K, 'gallery', 'shoot', 'shoot-%02d.jpg' % n)).convert('RGB')

def save(im, name, w, q=80):
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, name), quality=q, method=6); print(name, im.size, os.path.getsize(os.path.join(OUT, name)) // 1024, 'KB')

def zoom(im, s, ox, oy):   # the part of a square picture that stays visible at scale s around the point (ox, oy)
    W, H = im.size
    return im.crop((round(W * (ox - ox / s)), round(H * (oy - oy / s)), round(W * (ox + (1 - ox) / s)), round(H * (oy + (1 - oy) / s))))

save(shoot(21), 'hero.webp', 1400)              # travertine side table, a hand reaching for a mug
save(shoot(19), 'door-kits.webp', 1100)         # entry table, keys in the bowl, diffuser + bottle
save(shoot(20), 'door-scents.webp', 1100)       # three scent boxes on green marble
save(shoot(11), 'believe.webp', 800, 82)        # the night light, by the bed
save(shoot(22), 'closing.webp', 1600, 78)       # sofa, coffee table, the dog asleep
save(zoom(shoot(2), 1.55, .86, .34), 'how-1.webp', 420, 82)
save(zoom(shoot(1), 1.3, .52, .62), 'how-2.webp', 420, 82)
save(zoom(shoot(8), 1.06, .5, .5), 'how-3.webp', 420, 82)
for f in ['patricia1.webp'] + ['pick-%s.webp' % k for k in ('golden', 'honey', 'crisp', 'euphoric', 'wildwood', 'chilled', 'midnight')]:
    shutil.copyfile(os.path.join(K, 'old', f), os.path.join(OUT, f))
for i in range(1, 11):
    shutil.copyfile(os.path.join(K, 'img', 'ugc-%02d.webp' % i), os.path.join(OUT, 'ugc-%02d.webp' % i))
print(len(os.listdir(OUT)), 'files in img/')
