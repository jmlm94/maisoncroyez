#!/usr/bin/env python3
"""dk12 — scents $29.95 each; 3 scents = 1 free diffuser, 4 = 2, 7 = 3; each scent lasts about 15–21+ days (owner, 2026-11-03).

Built on the live dk11 files (../../mc-dk-app.js, ../../mc-dk.css). Changes:
- SCENT_ONE 39.95 -> 29.95 (every price on the page reads it: card "$29.95 each", aria labels, Due today, value line,
  kit review rows, "/scent").
- TIERS: scents 2 / 3 / 5 -> 3 / 4 / 7, today's price $89.85 / $119.80 / $209.65.
- Step 1 cards: "Lasts 15–21+ days" under "$29.95 each".
- Bottle life: the two FAQ answers ("One bottle lasts 30+ days on the everyday setting.") and the comparison row
  ("30+ days per bottle on the everyday setting.") now say about 15–21+ days.
The cart code is unchanged: the checkout price comes from Shopify (scent variant price / selling plan), and the free-diffuser
discounts are set in Shopify, so both must change there at deploy (see README.md).

usage: python3 patch.py <outdir>
"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
KITS = os.path.abspath(os.path.join(HERE, "..", ".."))
out = sys.argv[1]
app = open(os.path.join(KITS, "mc-dk-app.js"), encoding="utf-8").read()
css = open(os.path.join(KITS, "mc-dk.css"), encoding="utf-8").read()

def rep(s, old, new, n=1):
    assert s.count(old) == n, (s.count(old), old[:100])
    return s.replace(old, new)

app = rep(app, 'const DIFFUSER_PRICE = 80, SCENT_ONE = 39.95, SCENT_SUB = 24.95;',
          'const DIFFUSER_PRICE = 80, SCENT_ONE = 29.95, SCENT_SUB = 24.95; /* dk12 (2026-11-03, owner): scents $29.95 each */')
app = rep(app, 'scents: 2, price: 79.90,', 'scents: 3, price: 89.85,')
app = rep(app, 'scents: 3, price: 119.85,', 'scents: 4, price: 119.80,')
app = rep(app, 'scents: 5, price: 199.75,', 'scents: 7, price: 209.65,')
app = rep(app, '1 diffuser for 2 scents, 2 for 3, 3 for 5.', '1 diffuser for 3 scents, 2 for 4, 3 for 7 (dk12, 2026-11-03, owner; was 2 / 3 / 5).')
app = rep(app, 'today() { return this.keys.length * SCENT_ONE; }, /* dk9: the scents are the order ($39.95 each); the diffusers ride free */',
          'today() { return this.keys.length * SCENT_ONE; }, /* dk9: the scents are the order ($29.95 each since dk12); the diffusers ride free */')

# step 1 cards: how long a scent lasts, under the price
app = rep(app, '                <span class="t9s-each">${usd(SCENT_ONE)} each</span>\n',
          '                <span class="t9s-each">${usd(SCENT_ONE)} each</span>\n'
          '                <span class="t9s-life">Lasts 15–21+ days</span> <!-- dk12 (owner): each scent lasts about 15-21+ days -->\n')

# bottle life
app = rep(app, 'One bottle lasts 30+ days on the everyday setting.', 'Each bottle lasts about 15–21+ days.', n=2)
app = rep(app, 'v: "30+ days per bottle on the everyday setting."', 'v: "About 15–21+ days per bottle."')

css += '''
/* dk12 (2026-11-03, owner): "Lasts 15-21+ days" under "$29.95 each" on the step-1 cards */
#root .tier.t9c3 .t9s-each{margin-bottom:1px}
#root .tier.t9c3 .t9s-life{font-family:'Outfit',sans-serif;font-weight:600;font-size:.6rem;line-height:1.2;color:#5C4F46;margin:0 0 6px;white-space:nowrap}
@media (min-width:700px){#root .tier.t9c3 .t9s-life{font-size:.68rem}}
'''
os.makedirs(out, exist_ok=True)
open(os.path.join(out, "mc-dk-app.js"), "w", encoding="utf-8").write(app)
open(os.path.join(out, "mc-dk.css"), "w", encoding="utf-8").write(css)
print("dk12 variant written to", out)
