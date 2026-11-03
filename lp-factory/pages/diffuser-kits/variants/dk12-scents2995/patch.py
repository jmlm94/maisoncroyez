#!/usr/bin/env python3
"""dk12 — scents $29.95 each; 3 scents = 1 free diffuser, 4 = 2, 7 = 3; each scent lasts about 15–21+ days (owner, 2026-11-03).

Built on the live dk11 files (../../mc-dk-app.js, ../../mc-dk.css). Changes:
- SCENT_ONE 39.95 -> 29.95 (every price on the page reads it: card "$29.95 each", aria labels, Due today, value line,
  kit review rows, "/scent").
- TIERS: scents 2 / 3 / 5 -> 3 / 4 / 7, today's price $89.85 / $119.80 / $209.65.
- Step 2 (round 2): "Each scent lasts 15–21+ days, depending on use. All IFRA 51 compliant." and three badges
  (Organic Ingredients / Paraben-Free / Cruelty-Free, with icons) between the title row and the scent tiles.
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

# round 2 (owner, 2026-11-03): "the lasts 15-21+ days depending on use should appear on the second step ... above the actual
# variants, we could also add there three icons like step 1: Organic Ingredients, Parabens-Free, Cruelty-Free. they're also ifra51
# compliant". Step 2, between the title row and the scent tiles: one line + three badges (the step-1 badge colours, with icons
# from the page's line-icon set).
app = rep(app, "const MCI = {\n",
          "const MCI = {\n"
          "  leaf: mci('<path d=\"M5 19c0-8.2 5.2-13.3 14-14-.6 8.8-5.8 14-14 14z\"/><path d=\"M5 19c2.8-4.1 5.8-6.9 9-9\" ' + MCI_A + '/>'), /* dk12: organic ingredients */\n"
          "  noparaben: mci('<path d=\"M12 3.5c3 3.6 5 6.4 5 9.3a5 5 0 0 1-10 0c0-2.9 2-5.7 5-9.3z\"/><path d=\"M4.5 4.5l15 15\" ' + MCI_A + '/>'), /* dk12: paraben-free */\n"
          "  bunny: mci('<path d=\"M9.6 10.6C8.7 7.2 8.9 3.5 10.1 3.5s1.7 3.5 1.3 7.1\"/><path d=\"M14.4 10.6c.9-3.4.7-7.1-.5-7.1s-1.7 3.5-1.3 7.1\"/><circle cx=\"12\" cy=\"15.2\" r=\"5\"/><path d=\"M11.2 16.6h1.6\" ' + MCI_A + '/>'), /* dk12: cruelty-free */\n")
app = rep(app, '          <div class="picker e4" role="group" aria-label="Pick your scents">',
          '          <div class="s2-facts"> <!-- dk12 (owner, 2026-11-03): how long a scent lasts + the three promises, above the scents -->\n'
          '            <p class="s2-life">Each scent lasts 15\u201321 days, depending on use.</p> <!-- round 4 (owner): all bold, 15% bigger, 15-21 days -->\n'
          '            <div class="s2-badges">${[["leaf", "Organic Ingredients"], ["noparaben", "Paraben-Free"], ["bunny", "Cruelty-Free"]].map(([k, t]) => html`<span class="s2-b" key=${k}>${ic(k, "s2-b-ic")}<span>${t}</span></span>`)}</div>\n'
          '            <p class="s2-ifra">All IFRA 51 compliant.</p> <!-- round 4 (owner): below the three badges -->\n'
          '          </div>\n'
          '          <div class="picker e4" role="group" aria-label="Pick your scents">')

# bottle life
app = rep(app, 'One bottle lasts 30+ days on the everyday setting.', 'Each bottle lasts about 15–21 days.', n=2)
app = rep(app, 'v: "30+ days per bottle on the everyday setting."', 'v: "About 15–21 days per bottle."')

css += '''
/* dk12 round 2 (2026-11-03, owner): step 2, between the title row and the scents: the bottle life + three badges (step-1 colours) */
#root .buybox .s2-facts{display:flex;flex-direction:column;gap:8px;margin:0}
#root .buybox .s2-life{margin:0;text-align:center;font-family:'Outfit',sans-serif;font-size:.8rem;line-height:1.35;color:#3A322D}
#root .buybox .s2-life b{color:#141414;font-weight:800}
/* round 3-4 (owner): the line all bold and 15% bigger, the icons heavier, IFRA 51 under the three badges */
#root .buybox .s2-life{font-size:.92rem;font-weight:800;color:#141414}
#root .buybox .s2-b .s2-b-ic svg{stroke-width:2.3}
#root .buybox .s2-ifra{margin:0;text-align:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:.74rem;line-height:1.3;color:#141414}
#root .buybox .s2-badges{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
#root .buybox .s2-b{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:8px 4px;border-radius:12px;text-align:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:.62rem;line-height:1.15;letter-spacing:.03em;text-transform:uppercase;color:#111}
#root .buybox .s2-b:nth-child(1){background:linear-gradient(135deg,#FDEBDD,#F8DCE6)}
#root .buybox .s2-b:nth-child(2){background:linear-gradient(135deg,#E0F0FA,#E2F4EA)}
#root .buybox .s2-b:nth-child(3){background:linear-gradient(135deg,#EEE5F8,#F9E3EF)}
#root .buybox .s2-b .s2-b-ic{width:20px;height:20px}
@media (min-width:700px){#root .buybox .s2-life{font-size:.99rem}#root .buybox .s2-ifra{font-size:.8rem}#root .buybox .s2-b{flex-direction:row;gap:6px;font-size:.66rem;padding:9px 6px}}
'''
os.makedirs(out, exist_ok=True)
open(os.path.join(out, "mc-dk-app.js"), "w", encoding="utf-8").write(app)
open(os.path.join(out, "mc-dk.css"), "w", encoding="utf-8").write(css)
print("dk12 variant written to", out)
