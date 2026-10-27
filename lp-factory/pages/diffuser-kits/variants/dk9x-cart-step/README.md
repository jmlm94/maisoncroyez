# dk9x — cart step (2026-10-27, owner): "I'll need to include the cart step and not going straight to checkout"

STAGED, NOT LIVE. Built on the live dk9w app (key dk9w-fc4b8e5). `patch.py` writes `mc-dk-app.js` here:
- step 3 button and sticky bar read "ADD TO CART ➔" (was "🔒 SECURE CHECKOUT ➔");
- after the cart sync the page goes to /cart (the theme's cart page) instead of /checkout, same 800 ms pixel margin;
- preview toast says "opens the cart". CSS unchanged.
Checked locally (phone 390, small 360, desktop 1366): 0 JS errors, step 3 button + sticky = ADD TO CART, toast correct.

History to keep in mind: fd13 (2026-09-25) measured 42% of add-to-carts stopping at the cart drawer, which is why the page
went straight to checkout; dk5 brought the drawer back, dk9l went straight to checkout again.

Deploy (needs the Shopify connector on Maison Croyez): copy `mc-dk-app.js` over `../../mc-dk-app.js` → commit → fileUpdate
GenericFile 46262619439213 with the raw URL at that sha → key dk9x-<sha7> in page-body.html (5 places) → pageUpdate
161846919277 → qa-kits.yml: s3 check expects /ADD TO CART/, the cart flow waits for /\/cart/ and reads /cart.js there →
stamp `[run dk9x-<sha7>]` on page-shot.yml and qa-kits.yml.
