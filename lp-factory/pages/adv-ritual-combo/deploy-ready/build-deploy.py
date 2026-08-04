#!/usr/bin/env python3
"""Build the-scent-story deploy bundles from the combo sources.

Outputs (in this directory):
  mc-adv-ritual-app.js     advertorial fork (mount #advroot) + combo-patched LP app (mount #root)
  mc-adv-ritual-assets.js  window.MC_ASSETS_ADV -> Shopify CDN URLs (pass URLs as argv)
  mc-adv-ritual.css        adv styles scoped #advroot + combo overrides (sales half under #root)

Reuses from the fd18 deploy (NOT rebuilt here): mc-lp-free-diffuser.css,
mc-lp-vendor.js, mc-lp-diffuser-assets.js, the mc-lp-f-*.woff2 fonts, and the
gallery images (live gallery loads from CDNIMG, no embed needed).
"""
import os, sys, re, json

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'src')
LPDEP = os.path.join(HERE, '..', '..', 'pdp-free-diffuser', 'deploy-ready')
sys.path.insert(0, SRC)

def R(p, f): return open(os.path.join(p, f)).read()

# scope_css from compose.py (import would run the whole compose; re-exec the def only)
compose_src = R(SRC, 'compose.py')
scope_def = compose_src[compose_src.index('def scope_css'):compose_src.index('# ---------- advertorial half')]
ns = {'re': re}
exec(scope_def, ns)
scope_css = ns['scope_css']

# ---------- advertorial app (fork, verbatim transforms from compose.py) ----------
adv_app = R(SRC, 'adv-app.js')
assert '#buybox' in adv_app and 'Claim FREE Diffuser' in adv_app
adv_app = adv_app.replace('MC_ASSETS', 'MC_ASSETS_ADV')
adv_app = adv_app.replace('document.getElementById("root")', 'document.getElementById("advroot")')

# ---------- sales app: live deploy bundle + the same combo patches compose.py applies ----------
lp_app = R(LPDEP, 'mc-lp-free-diffuser-app.js')
old_lp_order = '''"buybox",
    "angleIntention", "angleFill", "howTo",
    "angleLux", "angleCandles", "angleLasts",
    "reviewWall", "guarantee", "faq",'''
assert old_lp_order in lp_app, 'LP sectionOrder not found in deploy bundle'
lp_app = lp_app.replace(old_lp_order, '"buybox",')
assert lp_app.count('<${StickyBar}/>`;') == 1
lp_app = lp_app.replace('    <${StickyBar}/>`;', '`;')
assert 'value: "30+ DAYS"' in lp_app
lp_app = lp_app.replace('value: "30+ DAYS"', 'value: "45+ DAYS"')

def benefit_col(title, items):
    lis = ''.join('<li><span class="ck" aria-hidden="true">✓</span>%s</li>' % it for it in items)
    return '<div class="cbenef-col"><h3 class="caps">%s</h3><ul>%s</ul></div>' % (title, lis)
benefits_html = ('          <div class="cbenef-grid">\n            '
    + benefit_col('The Diffuser', [
        'Waterless: no tank, no mold, zero cleaning',
        'Fills up to 600 sq ft in under 10 minutes',
        'One button, three strengths, 1-Year Warranty',
    ]) + '\n            '
    + benefit_col('The Fragrances', [
        '100% organic oils, safe around kids and pets',
        'Each scent composed around an intention',
        'One 100ml bottle lasts 45+ days',
    ]) + '\n          </div>\n')
faq_anchor = '          <div class="acc faq">'
assert lp_app.count(faq_anchor) == 1
lp_app = lp_app.replace(faq_anchor, benefits_html + faq_anchor)

app_js = '(function(){\n' + adv_app + '\n})();\n(function(){\n' + lp_app + '\n})();\n'
open(os.path.join(HERE, 'mc-adv-ritual-app.js'), 'w').write(app_js)

# ---------- assets map ----------
slots = ['narrator', 'grave', 'splitAfter', 'firstEvening', 'painScene', 'product']
urls = sys.argv[1:]
assert len(urls) == 6, 'pass 6 CDN URLs: narrator grave splitAfter firstEvening painScene product'
assets = dict(zip(slots, urls))
open(os.path.join(HERE, 'mc-adv-ritual-assets.js'), 'w').write(
    'window.MC_ASSETS_ADV=' + json.dumps(assets) + ';')

# ---------- css ----------
adv_css = scope_css(R(os.path.join(HERE, '..', '..', 'adv-scent-ritual', 'src'), 'styles.css'),
                    '#advroot', keep_globals=False)
combo_css = """
/* base for the advertorial half (page body styles come from the theme) */
#advroot{background:#FDFBF8;color:#241C18;font-family:'Be Vietnam Pro',sans-serif;font-size:16.5px;line-height:1.6}
#advroot .art-p{font-size:18px;line-height:1.65}
#advroot .art-cta .btn{font-size:1.03rem;padding:20px 31px}
#advroot .art-cta .btn .btn-sub{font-size:.74rem}
#advroot .art-h2.allblack,#advroot .art-h2.allblack em{color:#241C18;background:none;-webkit-background-clip:initial;-webkit-text-fill-color:initial;background-clip:initial}
#root .pick:not(.on) .pick-desc,#root .pick:not(.on) .pick-ing{display:none}
#root .cbenef-grid{display:grid;grid-template-columns:1fr;gap:14px;margin:26px 0 10px}
@media(min-width:700px){#root .cbenef-grid{grid-template-columns:1fr 1fr}}
#root .cbenef-col{background:#FFFFFF;border:1px solid #EFE7DD;border-radius:16px;padding:22px 24px}
#root .cbenef-col h3{font-size:13px;letter-spacing:.08em;margin-bottom:12px;color:#8A6F5C}
#root .cbenef-col ul{list-style:none;margin:0;padding:0}
#root .cbenef-col li{display:flex;gap:10px;align-items:flex-start;padding:7px 0;font-size:16.5px;line-height:1.5}
#root .cbenef-col .ck{color:#2E7D4F;font-weight:700;flex:0 0 auto}
#root .gal{max-width:82%;margin:0 auto}
"""
open(os.path.join(HERE, 'mc-adv-ritual.css'), 'w').write(adv_css + '\n' + combo_css)

for f in ['mc-adv-ritual-app.js', 'mc-adv-ritual-assets.js', 'mc-adv-ritual.css']:
    print(f, os.path.getsize(os.path.join(HERE, f)) // 1024, 'KB')
