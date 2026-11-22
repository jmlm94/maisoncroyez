#!/usr/bin/env python3
"""Enlarges the shoot photos (gallery/shoot, 800 px as exported) to 1600 px with a light sharpen, into gallery/hd (not committed).
make-gallery.js uses gallery/hd/shoot-NN.png when it is there and gallery/shoot/shoot-NN.jpg when it is not.
When the owner sends the full-size originals: save them as gallery/hd/shoot-NN.png (or .jpg) and run make-gallery.js again, nothing else changes.
usage: python3 prep-shoot.py      (needs pillow)"""
import os
from PIL import Image, ImageFilter
D = os.path.dirname(os.path.abspath(__file__))
os.makedirs(os.path.join(D, 'hd'), exist_ok=True)
for n in range(1, 19):
    im = Image.open(os.path.join(D, 'shoot', 'shoot-%02d.jpg' % n)).convert('RGB')
    im = im.resize((1600, 1600), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=1.6, percent=55, threshold=2))
    im.save(os.path.join(D, 'hd', 'shoot-%02d.png' % n))
print('18 photos enlarged into gallery/hd')
