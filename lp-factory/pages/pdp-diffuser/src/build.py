#!/usr/bin/env python3
"""MC LP Factory — bundle media into images.js and assemble preview HTML.
Usage: python3 build.py            (run from src/)
Reads  ../assets/processed/  per MANIFEST below; writes images.js and preview.html.
For a NEW page: copy this src/ folder into pages/<handle>/src/, edit MANIFEST + app.js CONFIG.
"""
import base64, os, json

# slot name -> (filename in ../assets/processed, mime). Videos may have a webm twin (slot + 'w').
MANIFEST = {
    'guests': ('guests.jpg', 'image/jpeg'),
    'soot': ('soot.jpg', 'image/jpeg'),
    'mold': ('mold.jpg', 'image/jpeg'),
    'hotel': ('hotel.jpg', 'image/jpeg'),
    'dog': ('dog.jpg', 'image/jpeg'),
    'product': ('diseno-87.jpg', 'image/jpeg'),
    'nightstand': ('diseno-88.jpg', 'image/jpeg'),
    'logoLight': ('logo-black-trim.png', 'image/png'),
    'logoDark': ('logo-cream-trim.png', 'image/png'),
    'gif1': ('www1-c.mp4', 'video/mp4'), 'gif1w': ('www1-c.webm', 'video/webm'),
    'gif2': ('www2-c.mp4', 'video/mp4'), 'gif2w': ('www2-c.webm', 'video/webm'),
    'gif3': ('www3-c.mp4', 'video/mp4'), 'gif3w': ('www3-c.webm', 'video/webm'),
    **{f'frag{i}': (f'frag{i}.jpg', 'image/jpeg') for i in range(1, 8)},
}
A = os.path.join(os.path.dirname(__file__) or '.', '..', 'assets', 'processed')

def b64(fn, mime):
    with open(os.path.join(A, fn), 'rb') as fh:
        return f'data:{mime};base64,' + base64.b64encode(fh.read()).decode()

assets = {slot: b64(fn, mime) for slot, (fn, mime) in MANIFEST.items()}
with open('images.js', 'w') as f:
    f.write('window.MC_ASSETS=' + json.dumps(assets) + ';')
print('images.js', os.path.getsize('images.js') // 1024, 'KB')

# single-file preview (open in browser / publish as artifact)
parts = ['<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n',
         '<title>MC PDP Preview</title>\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n',
         open('fonts.css').read(), open('styles.css').read(),
         '</style>\n</head>\n<body>\n<div id="root"></div>\n<script>\n',
         open('vendor.js').read(),
         '\n</script>\n<script>\n', open('images.js').read(),
         '\n</script>\n<script>\n', open('app.js').read(),
         '\n</script>\n</body>\n</html>\n']
with open('preview.html', 'w') as f:
    f.write(''.join(parts))
print('preview.html', os.path.getsize('preview.html') // 1024, 'KB')
