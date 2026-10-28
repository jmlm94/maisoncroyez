#!/usr/bin/env python3
"""dk9z (2026-10-28, owner): "it needs to open the drawer not the cart page please". ADD TO CART adds the kit (AddToCart
fires here, one per line, as in dk9y) and opens the theme's cart drawer on the same page instead of leaving for /cart.
Same mechanism as dk5 (Impact theme: <cart-drawer id="cart-drawer">, re-rendered on the cart:refresh event, show() opens
it); falls back to /cart if the drawer is missing. Applies to ../../mc-dk-app.js (live dk9y), writes ./mc-dk-app.js."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(HERE, "..", "..", "mc-dk-app.js"), encoding="utf-8").read()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:90]); s = s.replace(a, b)
rep('''    setTimeout(() => { window.location.href = "/cart"; }, wait);''',
    '''    /* dk9z (2026-10-28, owner): open the theme's cart drawer on this page instead of the cart page (dk5 mechanism). */
    const drawer = document.getElementById("cart-drawer");
    if (drawer && typeof drawer.show === "function") {
      document.documentElement.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true, detail: { open: true } }));
      setTimeout(() => { try { drawer.show(); } catch (e) {} setBusy(false); }, 150);
    } else {
      setTimeout(() => { window.location.href = "/cart"; }, wait);
    }''')
rep('''today, and opens the cart.");''', '''today, and opens the cart drawer.");''')
open(os.path.join(HERE, "mc-dk-app.js"), "w", encoding="utf-8").write(s)
print("mc-dk-app.js", len(s.encode()))
