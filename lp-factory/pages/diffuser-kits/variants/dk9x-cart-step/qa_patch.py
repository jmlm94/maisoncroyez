#!/usr/bin/env python3
"""dk9x: bring .github/workflows/qa-kits.yml in line with the dk9x page. Run AT DEPLOY (pushing the workflow triggers a run
against the live page). New title, arrow instead of the emoji in the step-2 bar, no price in that bar, ADD TO CART on step 3,
the cart flow lands on /cart instead of /checkouts."""
import os
P = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "..", "..", ".github", "workflows", "qa-kits.yml")
s = open(P, encoding="utf-8").read()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:90]); s = s.replace(a, b)
rep(r"/Waterless Diffuser & Organic Scents: Protect your loved ones while making your spaces look and feel great\./.test(s.h1 || '')",
    r"/Maison Croyez Home Diffuser & 100% Organic Scents: Make your spaces look and feel great and safe again\./.test(s.h1 || '')")
rep("'title, badges under it, option cards: scents, $39.95 each, diffusers, struck value, FREE, total today (dk9s)'",
    "'title (dk9x), badges under it, option cards: scents, $39.95 each, diffusers, struck value, FREE, no total on the cards'")
rep("return l ? !!l.querySelector('.e4-emoji') : null;", "return l ? !!l.querySelector('.e4-arrow') : null;")
rep("'bar: \"Tap a scent to read…\" with the emoji inline on the first line,", "'bar: \"Tap a scent to read…\" with the arrow inline on the first line,")
rep("/Wildwood Mystique/.test(s.bar || '') && /Smells like/.test(s.bar || '')", r"/Wildwood Mystique/.test(s.bar || '') && /Smells like/.test(s.bar || '') && !/\$39\.95/.test(s.bar || '')")
rep("fixed note, no payment logos, Secure checkout button'", "fixed note, no payment logos, Add to cart button'")
rep("&& !s.paylogos && /SECURE CHECKOUT/.test(s.btn || '')", "&& !s.paylogos && /ADD TO CART/.test(s.btn || '')")
rep("/* dk9l (2026-10-21): \"Secure checkout\" adds the lines and goes straight to /checkout; the cart is read from the checkout page (same origin), page errors are counted up to the navigation only */",
    "/* dk9x (2026-10-27): \"Add to cart\" syncs the lines and opens the cart page; the cart is read there, page errors are counted up to the navigation only */")
rep("await pg.waitForURL(/checkouts?\\//, { timeout: 30000 }).catch(() => {});", "await pg.waitForURL(/\\/cart(\\?|#|$)/, { timeout: 30000 }).catch(() => {});")
rep("before.btn === exp.btn && /checkouts?\\//.test(landed)", "before.btn === exp.btn && /\\/cart(\\?|#|$)/.test(landed)")
rep("btn: '🔒 SECURE CHECKOUT ➔'", "btn: 'ADD TO CART ➔'", 2)
rep("every 30 days → straight to checkout,", "every 30 days → cart page,")
rep("every 90 days → straight to checkout,", "every 90 days → cart page,")
open(P, "w", encoding="utf-8").write(s)
print("qa-kits.yml patched")
