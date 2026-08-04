#!/usr/bin/env python3
"""Compose the combo advertorial + sales page into one preview.html.

The advertorial half is a real fork (adv-app.js in this directory) carrying
all owner trims and the 2026-08-01 customer-journey rework, so it can be
edited directly. The sales half reuses the live pdp-free-diffuser source
with combo-only patches applied here (the live Shopify page is untouched):
buy box moved to the end of the page, buy box headline rewritten as a
narrator hand-off, LP sticky bar disabled in favor of the advertorial's
delayed one. Advertorial CTAs smooth-scroll to #buybox."""
import os, re, base64

HERE = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.join(HERE, '..', '..')
ADV = os.path.join(BASE, 'adv-scent-ritual', 'src')   # fonts + images bundle
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

# ---------- advertorial half: the local fork ----------
adv_app = R(HERE, 'adv-app.js')
assert '#buybox' in adv_app and 'Claim FREE Diffuser' in adv_app
adv_app = adv_app.replace('MC_ASSETS', 'MC_ASSETS_ADV')
adv_app = adv_app.replace('document.getElementById("root")', 'document.getElementById("advroot")')
adv_img = R(ADV, 'images.js').replace('window.MC_ASSETS=', 'window.MC_ASSETS_ADV=')
adv_css = scope_css(R(ADV, 'styles.css'), '#advroot', keep_globals=False)

# ---------- sales half: live LP source + combo-only patches ----------
lp_app = R(LP, 'app.js').replace('document.getElementById("root")', 'document.getElementById("saleroot")')

# journey order: education first, offer last (live page keeps buybox first)
old_lp_order = '''"buybox",
    "angleIntention", "angleFill", "howTo",
    "angleLux", "angleCandles", "angleLasts",
    "reviewWall", "guarantee", "faq",'''
new_lp_order = '''"angleIntention", "angleFill",
    "angleLux",
    "buybox",'''
assert old_lp_order in lp_app, 'LP sectionOrder not found'
lp_app = lp_app.replace(old_lp_order, new_lp_order)

# buy box headline: narrator hand-off instead of the PDP product title
old_title = 'title: { pre: "Maison Croyez Manifestation & Attraction Organic Scents \\u2014", em: "FREE Award Winning Diffuser." },'
if old_title not in lp_app:
    old_title = old_title.replace('\\u2014', '—')
assert old_title in lp_app, 'LP buybox title not found'
lp_app = lp_app.replace(old_title, 'title: { pre: "Choose your scent.", em: "The diffuser is on us." },')

# only one sticky bar on the combo page: the advertorial's delayed one
assert lp_app.count('<${StickyBar}/>`;') == 1
lp_app = lp_app.replace('    <${StickyBar}/>`;', '`;')

# bottle-life claim aligned with the 45-day refill cadence (combo only)
assert 'value: "30+ DAYS"' in lp_app
lp_app = lp_app.replace('value: "30+ DAYS"', 'value: "45+ DAYS"')

# simple benefits section (3 diffuser + 3 fragrance) right before the buy box
benefits_component = '''function ComboBenefits() {
  const cols = [
    { title: "The Diffuser", items: [
      "Waterless: no tank, no mold, zero cleaning",
      "Fills up to 600 sq ft in under 10 minutes",
      "One button, three strengths, 1-Year Warranty",
    ]},
    { title: "The Fragrances", items: [
      "100% organic oils, safe around kids and pets",
      "Each scent composed around an intention",
      "One 100ml bottle lasts 45+ days",
    ]},
  ];
  return html`
    <section class="section cbenef">
      <div class="wrap">
        <div class="section-head">
          <${SerifHead} pre="Everything you get," em="at a glance."/>
        </div>
        <div class="cbenef-grid">
          ${cols.map((c) => html`
            <div class="cbenef-col" key=${c.title}>
              <h3 class="caps">${c.title}</h3>
              <ul>${c.items.map((it) => html`<li key=${it}><span class="ck" aria-hidden="true">\\u2713</span>${it}</li>`)}</ul>
            </div>`)}
        </div>
      </div>
    </section>`;
}

function App() {'''
assert lp_app.count('function App() {') == 1
lp_app = lp_app.replace('function App() {', benefits_component)
old_bb_entry = '    buybox: () => html`<${BuyBox} key="bb"/>`,'
assert old_bb_entry in lp_app
lp_app = lp_app.replace(old_bb_entry,
    '    comboBenefits: () => html`<${ComboBenefits} key="cbf"/>`,\n' + old_bb_entry)
assert new_lp_order in lp_app
lp_app = lp_app.replace(new_lp_order, new_lp_order.replace('"buybox",', '"comboBenefits",\n    "buybox",'))
assert '"comboBenefits"' in lp_app and 'comboBenefits: () =>' in lp_app

lp_img = R(LP, 'images.js')
lp_prev = R(LP, 'preview.html')
gal = ''
# extract the whole script block (data URIs contain ';' so a lazy match truncates)
gm = re.search(r'<script>\s*(window\.MC_GALLERY_EMBED=.*?)</script>', lp_prev, re.S)
if gm: gal = gm.group(1)
assert gal.rstrip().endswith(';') or gal.rstrip().endswith('}'), 'gallery embed extraction incomplete'
assert len(gal) > 10000, 'gallery embed suspiciously small: %d bytes' % len(gal)
# hero image is not in the LP embed and its CDN fallback is blocked by artifact CSP
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

# combo-only overrides: larger article type for the 55+ reader; collapse
# unselected scent card details so the tall buy box scans faster on mobile
combo_css = """
#advroot .art-p{font-size:18px;line-height:1.65}
#saleroot .pick:not(.on) .pick-desc,#saleroot .pick:not(.on) .pick-ing{display:none}
#saleroot .cbenef-grid{display:grid;grid-template-columns:1fr;gap:18px;max-width:560px;margin:0 auto}
@media(min-width:700px){#saleroot .cbenef-grid{grid-template-columns:1fr 1fr;max-width:760px}}
#saleroot .cbenef-col{background:#FFFFFF;border:1px solid #EFE7DD;border-radius:16px;padding:22px 24px}
#saleroot .cbenef-col h3{font-size:13px;letter-spacing:.08em;margin-bottom:12px;color:#8A6F5C}
#saleroot .cbenef-col ul{list-style:none;margin:0;padding:0}
#saleroot .cbenef-col li{display:flex;gap:10px;align-items:flex-start;padding:7px 0;font-size:16.5px;line-height:1.5}
#saleroot .cbenef-col .ck{color:#2E7D4F;font-weight:700;flex:0 0 auto}
"""

fonts = R(ADV, 'fonts.css')

body_parts = [
    fonts, '\n', globals_css, '\n', adv_css, '\n', lp_css, '\n', combo_css,
    '\n</style>\n<div id="advroot"></div>\n<div id="saleroot"></div>\n<script>\n',
    R(LP, 'vendor.js'),
    '\n</script>\n<script>\n', adv_img,
    '\n</script>\n<script>\n', lp_img,
    '\n</script>\n<script>\n', gal,
    '\n</script>\n<script>\n(function(){\n', adv_app,
    '\n})();\n</script>\n<script>\n(function(){\n', lp_app,
    '\n})();\n</script>\n']

body_html = ''.join(body_parts).replace(
    '</style>\n<div id="advroot">', '</style>\n</head>\n<body>\n<div id="advroot">', 1)
html_doc = ''.join([
    '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n',
    '<title>MC Advertorial + Manifestation Ritual Preview</title>\n',
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n',
    body_html, '</body>\n</html>\n'])
out = os.path.join(HERE, 'preview.html')
open(out, 'w').write(html_doc)
print('combo preview.html', os.path.getsize(out) // 1024, 'KB')

# artifact variant: content only (the Artifact host wraps it in its own document skeleton)
artifact_doc = ''.join(['<title>Maison Croyez: Ritual Advertorial</title>\n<style>\n'] + body_parts)
art = os.path.join(HERE, 'ritual-advertorial.html')
open(art, 'w').write(artifact_doc)
print('combo artifact html', os.path.getsize(art) // 1024, 'KB')
