#!/usr/bin/env python3
"""Compose the adv-scent-ritual advertorial + pdp-free-diffuser sales page
into one preview.html. Advertorial CTAs smooth-scroll to #buybox in the
sales half. Each app is namespaced: own mount root, scoped CSS, renamed
asset globals, IIFE-wrapped script."""
import os, re

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
ADV = os.path.join(BASE, 'adv-scent-ritual', 'src')
LP = os.path.join(BASE, 'pdp-free-diffuser', 'src')
R = lambda p, f: open(os.path.join(p, f)).read()

# ---------- CSS scoper ----------
def scope_css(css, container, keep_globals):
    out, i, n = [], 0, len(css)
    def find_block_end(start):
        depth, j = 0, start
        while j < n:
            if css[j] == '{': depth += 1
            elif css[j] == '}':
                depth -= 1
                if depth == 0: return j
            j += 1
        return n - 1
    while i < n:
        m = re.search(r'[^\s]', css[i:])
        if not m: break
        i += m.start()
        if css.startswith('/*', i):
            e = css.find('*/', i)
            i = (e + 2) if e != -1 else n
            continue
        brace = css.find('{', i)
        if brace == -1: break
        sel = css[i:brace].strip()
        end = find_block_end(brace)
        body = css[brace + 1:end]
        if sel.startswith(('@media', '@supports')):
            out.append(sel + '{' + scope_css(body, container, keep_globals) + '}')
        elif sel.startswith(('@font-face', '@keyframes', '@import', '@-')):
            out.append(sel + '{' + body + '}')
        else:
            parts = []
            for s in sel.split(','):
                s = s.strip()
                if not s: continue
                if s == ':root':
                    parts.append(container)
                elif re.match(r'^(html|body|\*)([^\w-]|$)', s):
                    if keep_globals: parts.append(s)
                    else: parts.append(container + ' __dropped__')
                else:
                    parts.append(container + ' ' + s)
            parts = [p for p in parts if '__dropped__' not in p]
            if parts:
                out.append(','.join(parts) + '{' + body + '}')
        i = end + 1
    return '\n'.join(out)

# ---------- advertorial pieces ----------
adv_app = R(ADV, 'app.js')
adv_app = adv_app.replace('productUrl: "https://maisoncroyez.com/pages/diffuser"', 'productUrl: "#buybox"')

# owner trim (2026-08-01): drop comments, offer1, guarantee, faq sections
old_order = '''"articleHeader", "heroSplit", "comments", "articleStory",
    "intentionMap", "articleClose",
    "offer1", "guarantee", "reviewWall", "faq",'''
new_order = '''"articleHeader", "heroSplit", "articleStory",
    "intentionMap", "articleClose",
    "reviewWall",'''
assert old_order in adv_app, 'sectionOrder not found'
adv_app = adv_app.replace(old_order, new_order)

# owner trim: remove "The Honest Truth" block inside articleClose (h2 + 3 paragraphs),
# keeping "Why I'm Telling You All This" and the closing CTA
hs = adv_app.index('{ t: "h2", pre: "The Honest"')
he = adv_app.index('{ t: "cta", label: "Try It Risk-Free for 90 Days"')
assert 0 < he - hs < 2000, 'Honest Truth block bounds look wrong'
adv_app = adv_app[:hs] + adv_app[he:]

# owner trim round 2 (2026-08-01):
def cut(src, start_marker, end_marker, max_span):
    s = src.index(start_marker)
    e = src.index(end_marker)
    assert 0 < e - s < max_span, 'cut bounds look wrong for %r' % start_marker
    return src[:s] + src[e:]

# pricing + candle-math comparison ($89.95 price-pop through "we'll see.")
adv_app = cut(adv_app, '{ t: "p", cls: "price-pop"',
              '{ t: "h2", pre: "The First", em: "Evening:"', 3000)
# timeline (heading, evening/week entries, "no more" checks)
adv_app = cut(adv_app, '{ t: "h2", pre: "The Timeline: What Actually Happened."',
              '{ t: "h2", pre: "So What Makes This Actually Different?"', 4000)
# perfumery / product-development lifestyle image
lab_img = '{ t: "img", slot: "lab", alt: "Composed in the French perfumery tradition" },'
assert lab_img in adv_app
adv_app = adv_app.replace(lab_img, '')
for lbl in ['Choose Your Intention', 'Try It Risk-Free for 90 Days', 'Choose Your Kit', 'Choose your intention', 'Get Yours Now', 'Check Availability']:
    adv_app = adv_app.replace('label: "%s"' % lbl, 'label: "Claim My Free Diffuser"')
    adv_app = adv_app.replace('t: "cta", label: "%s"' % lbl, 't: "cta", label: "Claim My Free Diffuser"')
adv_app = adv_app.replace('{ t: "cta", label: "Try It Risk-Free for 90 Days"', '{ t: "cta", label: "Claim My Free Diffuser"')
adv_app = adv_app.replace('MC_ASSETS', 'MC_ASSETS_ADV')
adv_app = adv_app.replace('document.getElementById("root")', 'document.getElementById("advroot")')
adv_img = R(ADV, 'images.js').replace('window.MC_ASSETS=', 'window.MC_ASSETS_ADV=')
adv_css = scope_css(R(ADV, 'styles.css'), '#advroot', keep_globals=False)

# ---------- sales page pieces ----------
lp_app = R(LP, 'app.js').replace('document.getElementById("root")', 'document.getElementById("saleroot")')
lp_img = R(LP, 'images.js')
gal = ''
GALDIR = os.path.join(LP, '..', 'assets', 'gallery')
lp_prev = R(LP, 'preview.html')
# extract the whole script block (data URIs contain ';' so a lazy match truncates)
gm = re.search(r'<script>\s*(window\.MC_GALLERY_EMBED=.*?)</script>', lp_prev, re.S)
if gm: gal = gm.group(1)
assert gal.rstrip().endswith(';') or gal.rstrip().endswith('}'), 'gallery embed extraction incomplete'
assert len(gal) > 10000, 'gallery embed suspiciously small: %d bytes' % len(gal)
# hero image is not in the LP embed and its CDN fallback is blocked by artifact CSP
import base64
hero_path = os.path.join(LP, '..', 'assets', 'gallery', 'hero-callouts.jpg')
hero_b64 = base64.b64encode(open(hero_path, 'rb').read()).decode()
gal += '\nwindow.MC_GALLERY_EMBED["mc-lp-fd-hero-callouts.jpg"]="data:image/jpeg;base64,%s";' % hero_b64
lp_css = scope_css(R(LP, 'styles.css'), '#saleroot', keep_globals=False)

# globals: minimal resets + smooth scroll + LP body treatment applied page-wide
globals_css = """
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:#FDFBF8;color:#241C18;font-family:'Be Vietnam Pro',sans-serif;font-size:16.5px;line-height:1.6;overflow-x:clip;padding-bottom:88px}
img,svg{max-width:100%;display:block}
button{font:inherit;cursor:pointer;border:none;background:none;color:inherit}
"""

fonts = R(ADV, 'fonts.css')

html_doc = ''.join([
    '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n',
    '<title>MC Advertorial + Manifestation Ritual Preview</title>\n',
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n',
    fonts, '\n', globals_css, '\n', adv_css, '\n', lp_css,
    '\n</style>\n</head>\n<body>\n<div id="advroot"></div>\n<div id="saleroot"></div>\n<script>\n',
    R(LP, 'vendor.js'),
    '\n</script>\n<script>\n', adv_img,
    '\n</script>\n<script>\n', lp_img,
    '\n</script>\n<script>\n', gal,
    '\n</script>\n<script>\n(function(){\n', adv_app,
    '\n})();\n</script>\n<script>\n(function(){\n', lp_app,
    '\n})();\n</script>\n</body>\n</html>\n'])
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'preview.html')
open(out, 'w').write(html_doc)
print('combo preview.html', os.path.getsize(out) // 1024, 'KB')

# artifact variant: content only (the Artifact host wraps it in its own document skeleton)
artifact_doc = ''.join([
    '<title>Maison Croyez: Ritual Advertorial</title>\n<style>\n',
    fonts, '\n', globals_css, '\n', adv_css, '\n', lp_css,
    '\n</style>\n<div id="advroot"></div>\n<div id="saleroot"></div>\n<script>\n',
    R(LP, 'vendor.js'),
    '\n</script>\n<script>\n', adv_img,
    '\n</script>\n<script>\n', lp_img,
    '\n</script>\n<script>\n', gal,
    '\n</script>\n<script>\n(function(){\n', adv_app,
    '\n})();\n</script>\n<script>\n(function(){\n', lp_app,
    '\n})();\n</script>\n'])
art = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'adv-ritual-combo.html')
open(art, 'w').write(artifact_doc)
print('combo artifact html', os.path.getsize(art) // 1024, 'KB')
