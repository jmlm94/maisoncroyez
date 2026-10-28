#!/usr/bin/env python3
"""dk9y (2026-10-28, owner): "fix the review my kit situation … just fire once when we actually open the cart".
The kit no longer goes into the cart at "Review my kit" (that add made Shopify's Meta channel fire AddToCart there, one per
cart line); the whole kit is added when the shopper taps ADD TO CART, right before the cart page opens. Probe 2026-10-28
(atc-probe): /cart/add.js AND /cart/update.js both fire one AddToCart per added line, /cart/change.js plan changes fire
nothing, so the add must stay a real add (Klaviyo's live "MC Abandoned Cart v2" is triggered by Shopify's Added to Cart).
Applies to ../../mc-dk-app.js (live dk9x) and writes ./mc-dk-app.js. CSS unchanged."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(HERE, "..", "..", "mc-dk-app.js"), encoding="utf-8").read()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:90]); s = s.replace(a, b)
rep('''html`<button class="btn atc" onClick=${() => { syncKitCart().catch(() => {}); go(3); }}><span>Review my kit ➔</span></button>`} <!-- dk9m: the kit goes into the cart here (AddToCart fires now) -->''',
    '''html`<button class="btn atc" onClick=${() => go(3)}><span>Review my kit ➔</span></button>`} <!-- dk9y (owner): nothing goes into the cart here any more; the kit is added at ADD TO CART -->''')
rep('''if (step === 2) { if (left > 0) return goPick(); syncKitCart().catch(() => {}); return go(3); } addToCart(setBusy, setToast); }; /* dk9m: review = cart add */''',
    '''if (step === 2) { if (left > 0) return goPick(); return go(3); } addToCart(setBusy, setToast); }; /* dk9y: review only reviews; ADD TO CART adds */''')
rep('''const added = await syncKitCart(); /* dk9m/dk9n: usually nothing left to do (the kit went in at "Review my kit"); a changed frequency is a plan change, n''',
    '''const added = await syncKitCart(); /* dk9y (2026-10-28, owner): the whole kit is added here, at ADD TO CART, so the AddToCart beacons fire as the cart opens, not at "Review my kit"; a kit already in the cart from an earlier visit is only adjusted. Was (dk9m/dk9n): usually nothing left to do (the kit went in at "Review my kit"); a changed frequency is a plan change, n''')
open(os.path.join(HERE, "mc-dk-app.js"), "w", encoding="utf-8").write(s)
print("mc-dk-app.js", len(s.encode()))
