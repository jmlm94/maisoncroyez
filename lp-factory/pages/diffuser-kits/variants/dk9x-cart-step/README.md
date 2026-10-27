# dk9x — cart step (2026-10-27, owner): "I'll need to include the cart step and not going straight to checkout"

STAGED, NOT LIVE. Built on the live dk9w app (key dk9w-fc4b8e5). `patch.py` writes `mc-dk-app.js` and `mc-dk.css` here:
- step 3 button and sticky bar read "ADD TO CART ➔" (was "🔒 SECURE CHECKOUT ➔");
- after the cart sync the page goes to /cart (the theme's cart page) instead of /checkout, same 800 ms pixel margin;
- preview toast says "opens the cart".
Round 2 (same day, owner): title "Maison Croyez Diffuser & Scents: Make your spaces look, feel and smell great AGAIN." with a black
kicker above it, "THE DIFFUSERS ARE 100% FREE WHEN YOU PICK YOUR FIRST SCENTS!" (`.dk-freebar`); no "Total today" on the three
step-1 cards; "🚚 Estimated delivery: 3–5 business days" (`.dk-eta`) under the button of steps 1, 2 and 3.
Round 3 (same day, owner's artifact comments): kicker reads "JUST FOR TODAY: THE DIFFUSERS ARE 100% FREE!"; no price in the
step-2 scent bar ("Name · Intention" only); the three "Today / Next boxes / Cancel anytime" lines moved from step 1 to step 3,
between "Due today" and the frequency question ("You pick on the last step." → "You pick just below.").
Preview: artifact TK1GvMvzMi69pP4wiLMfyN v45 (ahead of live until deploy).
Checked locally (phone 390, small 360, desktop 1366): 0 JS errors, step 3 button + sticky = ADD TO CART, toast correct.

History to keep in mind: fd13 (2026-09-25) measured 42% of add-to-carts stopping at the cart drawer, which is why the page
went straight to checkout; dk5 brought the drawer back, dk9l went straight to checkout again.

Deploy (needs the Shopify connector on Maison Croyez): copy `mc-dk-app.js` + `mc-dk.css` over `../../` → commit → fileUpdate
GenericFiles 46262619439213 (app) + 46262619471981 (css) with the raw URLs at that sha → key dk9x-<sha7> in page-body.html (5 places) → pageUpdate
161846919277 → qa-kits.yml: s1-copy expects the new title and no card totals ($79.90 / $119.85 / $199.75 leave step 1), s3 check expects /ADD TO CART/, the cart flow waits for /\/cart/ and reads /cart.js there →
stamp `[run dk9x-<sha7>]` on page-shot.yml and qa-kits.yml.

Supply page coupling: `../../../supply/make.py` derives the supply app from the kits files, so before the kits files change, point
make.py at a frozen copy of the dk9w kits files (or it would pick up the new title, the removed card total and the delivery line).
