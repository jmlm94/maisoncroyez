#!/usr/bin/env python3
"""dk9x (2026-10-27, owner): "I'll need to include the cart step and not going straight to checkout".
Applies to the live kits app (../../mc-dk-app.js) and writes ./mc-dk-app.js:
  - step 3 button + sticky bar: "SECURE CHECKOUT" -> "ADD TO CART" (the button now opens the cart page)
  - addToCart(): after the cart sync, go to /cart (the theme's cart page) instead of /checkout; same 800 ms pixel margin
  - preview toast wording
CSS unchanged. Deploy: copy ./mc-dk-app.js over ../../mc-dk-app.js, then the usual kits pipeline (fileUpdate, stamp, pageUpdate),
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
open(os.path.join(HERE, "mc-dk-app.js"), "w", encoding="utf-8").write(s)
print("mc-dk-app.js", len(s.encode()))
