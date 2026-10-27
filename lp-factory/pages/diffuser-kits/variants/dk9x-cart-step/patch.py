#!/usr/bin/env python3
"""dk9x (2026-10-27, owner): "I'll need to include the cart step and not going straight to checkout".
Applies to the live kits app (../../mc-dk-app.js) and writes ./mc-dk-app.js:
  - step 3 button + sticky bar: "SECURE CHECKOUT" -> "ADD TO CART" (the button now opens the cart page)
  - addToCart(): after the cart sync, go to /cart (the theme's cart page) instead of /checkout; same 800 ms pixel margin
  - preview toast wording
Round 2 (same day, owner): new title "Maison Croyez Diffuser & Scents: Make your spaces look, feel and smell great AGAIN." with a
black kicker above it ("THE DIFFUSERS ARE 100% FREE WHEN YOU PICK YOUR FIRST SCENTS!"), no "Total today" on the three cards,
"Estimated delivery: 3–5 business days" under the button of every step; writes ./mc-dk.css too.
Deploy: copy ./mc-dk-app.js and ./mc-dk.css over ../../, then the usual kits pipeline (fileUpdate, stamp, pageUpdate),
and switch qa-kits.yml's cart check from /checkouts to /cart (button text "ADD TO CART")."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "..", "mc-dk-app.js")
s = open(SRC, encoding="utf-8").read()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:80]); s = s.replace(a, b)
rep('''    setTimeout(() => { window.location.href = (CART3.checkoutUrl || "/checkout"); }, wait);''',
    '''    /* dk9x (2026-10-27, owner): the cart step is back ("include the cart step and not going straight to checkout"): the theme's
       cart page, same 800 ms margin for the channel pixel's AddToCart beacons. History: fd13 measured 42% of add-to-carts
       stopping at the drawer; dk9l went straight to checkout. */
    setTimeout(() => { window.location.href = "/cart"; }, wait);''')
rep('''<span>${busy ? "One moment…" : "🔒 SECURE CHECKOUT ➔"}</span> <!-- dk9l (owner): straight to checkout -->''',
    '''<span>${busy ? "One moment…" : "ADD TO CART ➔"}</span> <!-- dk9x (owner): the cart step is back -->''')
rep(''': "\\ud83d\\udd12 SECURE CHECKOUT \\u2794"; /* dk9: step-aware; dk9l: straight to checkout */''',
    ''': "ADD TO CART \\u2794"; /* dk9: step-aware; dk9x: the cart step is back */''')
rep('''on the every-" + selStore.freq + "-days plan, " + usd(selStore.today()) + " today, and goes straight to checkout.");''',
    '''on the every-" + selStore.freq + "-days plan, " + usd(selStore.today()) + " today, and opens the cart.");''')

# ---- round 2 (2026-10-27, owner): new headline + black kicker above it, no "Total today" on the cards, delivery estimate under
# the button of every step
rep('''<h1 class="h1-9e">Waterless Diffuser & Organic Scents: Protect your loved ones while making your spaces look and feel great.</h1> <!-- dk9l (2026-10-21, owner) -->''',
    '''<p class="dk-freebar">THE DIFFUSERS ARE 100% FREE WHEN YOU PICK YOUR FIRST SCENTS!</p> <!-- dk9x (owner): smaller headline on black, above the title -->
          <h1 class="h1-9e">Maison Croyez Diffuser & Scents: Make your spaces look, feel and smell great AGAIN.</h1> <!-- dk9x (2026-10-27, owner) -->''')
rep('''                <span class="t9s-total"><small>Total today</small><b>${usd(t.price)}</b></span>
''', "")  # dk9x (owner): the total is explained on the next steps
rep('''  const key = (e, fn) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } };
  return html`
    <section class=${"section pdp-buy step-" + step} id="buybox">''',
    '''  const eta = html`<p class="dk-eta"><span class="dk-eta-ic" aria-hidden="true">🚚</span>Estimated delivery: <b>3–5 business days</b></p>`; /* dk9x (owner): under the button of every step */
  const key = (e, fn) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } };
  return html`
    <section class=${"section pdp-buy step-" + step} id="buybox">''')
rep("\n          ${chips}", "\n          ${eta}\n          ${chips}", 3)

open(os.path.join(HERE, "mc-dk-app.js"), "w", encoding="utf-8").write(s)
print("mc-dk-app.js", len(s.encode()))

css = open(os.path.join(HERE, "..", "..", "mc-dk.css"), encoding="utf-8").read()
css += """
/* dk9x (2026-10-27, owner): black kicker above the title, delivery estimate under each step's button */
#root #buybox .buybox .dk-freebar{display:block;margin:12px 0 0;padding:8px 12px;border-radius:10px;background:#111;color:#fff !important;font-family:'Outfit',sans-serif;font-weight:800;font-size:.68rem;letter-spacing:.08em;line-height:1.35;text-align:center;text-transform:uppercase}
#root .buybox .dk-eta{margin:9px 0 0;text-align:center;font-family:'Outfit',sans-serif;font-size:.74rem;font-weight:500;color:#3A322D;line-height:1.3}
#root .buybox .dk-eta b{font-weight:800;color:#141414}
#root .buybox .dk-eta-ic{margin-right:6px}
@media (min-width:700px){#root #buybox .buybox .dk-freebar{font-size:.78rem;padding:9px 14px}#root .buybox .dk-eta{font-size:.82rem}}
"""
open(os.path.join(HERE, "mc-dk.css"), "w", encoding="utf-8").write(css)
print("mc-dk.css", len(css.encode()))
