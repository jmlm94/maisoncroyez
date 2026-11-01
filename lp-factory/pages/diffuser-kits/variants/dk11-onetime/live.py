#!/usr/bin/env python3
"""dk11 for the live store: patch.py's output plus, only when DK11_ONETIME=1, the one-time path wired to the cart.

Round 10 (owner, 2026-11-01): "Delete one time purchase option entirely". By default this is patch.py's subscription-only
build (step 1 title, green caps gift line, bigger step labels, step 3 unlock heading + one explanation) and the cart code is
the live dk10b one, untouched.

With DK11_ONETIME=1 (kept for reference): one-time Add to cart puts CART3.oneTimeKits[tier] (the "(One-Time)" kit variants,
to be repriced to $49.95 / $99.90 / $149.85) and the scents without a selling plan into the cart; the cart reconcile owns the
one-time kit variants too, and switching a kit from subscription to one-time removes the planned scent lines and adds the
units back without a plan (Shopify cannot clear a selling plan from a line in place).

usage: [DK11_ONETIME=1] python3 live.py [KEY]   writes ./live/mc-dk-app.js, ./live/mc-dk.css and, when KEY is given
                               (e.g. dk11-abc1234), ./live/page-body.html with every dk10b-2cb82e9 version key swapped for KEY.
"""
import os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
KITS = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(HERE, "live")
subprocess.run([sys.executable, os.path.join(HERE, "patch.py"), OUT], check=True)
app = open(os.path.join(OUT, "mc-dk-app.js"), encoding="utf-8").read()


def rep(s, a, b):
    assert s.count(a) == 1, (s.count(a), a[:100])
    return s.replace(a, b)


if os.environ.get("DK11_ONETIME") == "1":
    app = rep(app, 'const kitItems = () => { const T = selStore.tier(); const kitId = CART3.kitVariants && CART3.kitVariants[T.key]; const planId = (CART3.kitsPlans && CART3.kitsPlans[selStore.freq]) || CART3.kitsPlans[30];',
              'const kitItems = () => { const T = selStore.tier(); const one = selStore.plan === "one"; /* dk11: one-time = the "(One-Time)" kit variant + scents without a plan */ const kitId = one ? CART3.oneTimeKits[T.key] : (CART3.kitVariants && CART3.kitVariants[T.key]); const planId = one ? null : ((CART3.kitsPlans && CART3.kitsPlans[selStore.freq]) || CART3.kitsPlans[30]);')
    app = rep(app, '    const ids = Object.values(CART3.kitVariants).concat(CONFIG.fragrances.map((f) => f.variant));',
              '    const ids = Object.values(CART3.kitVariants).concat(Object.values(CART3.oneTimeKits), CONFIG.fragrances.map((f) => f.variant)); /* dk11: the one-time kits are this page\'s lines too */')
    app = rep(app, '      if (!w) { g.lines.forEach((l) => changes.push({ id: l.key, quantity: 0 })); return; }\n',
              '      if (!w) { g.lines.forEach((l) => changes.push({ id: l.key, quantity: 0 })); return; }\n'
              '      if (w.plan === null && g.lines.some((l) => l.selling_plan_allocation)) { /* dk11: a selling plan cannot be cleared from a line in place; remove those lines and add the units back one-time */\n'
              '        g.lines = g.lines.filter((l) => { if (!l.selling_plan_allocation) return true; changes.push({ id: l.key, quantity: 0 }); g.q -= l.quantity; return false; });\n'
              '        if (!g.lines.length) { if (w.q > 0) adds.push({ id: vid, quantity: w.q }); return; }\n'
              '      }\n')
    app = rep(app, '  const kitId = CART3.kitVariants && CART3.kitVariants[T.key];\n',
              '  const kitId = selStore.plan === "one" ? CART3.oneTimeKits[T.key] : (CART3.kitVariants && CART3.kitVariants[T.key]); /* dk11 */\n')
    # the preview build refused one-time on the store; the live build lets it through
    app = rep(app, '  if (onStore() && selStore.plan === "one") { setToast("One-time checkout isn\\u2019t open yet. Pick Subscribe to get your diffusers free."); return; } /* dk11 test: no one-time cart wiring */\n', '')
    app = app.replace('/* dk11 test (2026-11-01, owner): one-time path, diffusers $49.95 each, refunded if a refill plan starts within 30 days */',
                      '/* dk11 (2026-11-01, owner): one-time path, diffusers $49.95 each ("(One-Time)" kit variants), refunded if a refill plan starts within 30 days (support does the refund) */')
open(os.path.join(OUT, "mc-dk-app.js"), "w", encoding="utf-8").write(app)
print("live app", len(app.encode()), "css", os.path.getsize(os.path.join(OUT, "mc-dk.css")))

if len(sys.argv) > 1:
    key = sys.argv[1]
    body = open(os.path.join(KITS, "page-body.html"), encoding="utf-8").read()
    n = body.count("dk10b-2cb82e9")
    assert n >= 5, n
    body = body.replace("dk10b-2cb82e9", key)
    open(os.path.join(OUT, "page-body.html"), "w", encoding="utf-8").write(body)
    print("page-body", key, "keys swapped:", n, len(body.encode()), "bytes")
