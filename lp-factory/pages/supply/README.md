# Scent Supply page (2026-10-25) — structure, not deployed

Owner: "a step by step page where customers who already bought can get a 6, 9, 12 and 18 month supply where they can save…
first step will be supply, then selecting the scents then going to checkout… an angle of cancelling subscription which is
always a pain… They'll also have a placeholder on the third step to put their name so we can cancel their subscription
automatically… 9 months the best one where we can include a diffuser for free, 12 months 2, 18 months 3."
Answers (2026-10-25): SKUs are created by the owner after the page is done; ships all at once; promise "cancelled in less than
24 hours"; hero = placeholder until the picture comes; address /pages/supply unless told otherwise.

| supply | scents | each | total today | save vs $39.95 | free diffusers (value) |
|---|---|---|---|---|---|
| 6 months | 6 | $34.95 | $209.70 | $30 | — |
| 9 months (Most popular, default) | 9 | $29.95 | $269.55 | $90 | 1 ($89.95) |
| 12 months | 12 | $24.95 | $299.40 | $180 | 2 ($179.90) |
| 18 months (Best value) | 18 | $19.95 | $359.10 | $360 | 3 ($269.85) |

## Round 2 (owner, same day)
"No need for the information below the atc button since this is a page for customer also delete the 3 bullets below the
main image and alter the layout a little so it looks different from the sales page we have." → nothing below any button
(chips, reviews, FAQ, founder note and every long-form section are gone; step 3 keeps only "Change my scents"), the badge
strip under the H1 is gone, and the layout is its own: one centred column (no left gallery column on desktop), a kicker
"FOR MAISON CROYEZ CUSTOMERS" + H1 + a landscape banner, a 3-segment progress track (Supply · Scents · Checkout) instead
of the "STEP N OF 3" eyebrow, and the four supplies as rows (radio, months + price line + free diffusers, framed thumbnail,
total) instead of the kits card grid.

## Round 3 (owner): "Revert the variants the way it was with two and two rows was good." → the four supplies are the card
grid again (two and two on phones, one row on desktop); everything else from round 2 stays.

## Round 4 (owner): badge "EXCLUSIVELY FOR MAISON CROYEZ CUSTOMERS" (gold pill) above the H1; H1 "You already love them, stock up
for months and save a lot, no more subscription."; on the cards the count and the price sit on two lines ("6 scents" / "~~$39.95~~
$34.95 each"), the "+ N FREE Diffusers" line is all green and bold, the 6-month card says "Scents only" in black, bigger, no
nudge; step 2 uses the kits page's own scent pictures (fetched into lp-factory/assets/cdn/picks by the fetch-assets workflow and
inlined in the preview; live they load from the CDN as on the kits page); step 3 gets a "Free shipping · FREE" row, the value
line names the free diffusers when the supply includes them, and the note reads "One payment, nothing renews, free shipping."

## Round 5 (owner's artifact comments, 2026-10-25 23:52–23:55): "6× Scents" on every card; the "$89.95 value" line under the
photo removed; a soft gradient per card (cream / blush / sage / gold); step 2: the quick-fill link is a centred black button
"Pick my scents for me" (+ a small "Start over"), the "Pick N more scents…" hint bold and black, the reserved-diffuser card all
bold; step 3: the shipping row reads "Free Priority Shipping*". "And also center it" (on the value line) was read as: the card
content stays centred; the title row is kept aligned across the cards.

## Files
- `make.py` — derives `mc-sp-app.js` + `mc-sp.css` from the live kits files (`../diffuser-kits/mc-dk-app.js|mc-dk.css`), so the
  branding, components and CSS are the kits page's. Re-run after any kits change you want carried over.
- `mc-sp-app.js`, `mc-sp.css` — generated. Not uploaded to Shopify yet.

## What the page does
1. Step 1 "How many months would you like to cover?" — four cards (2×2 on phones, one row on desktop): months, scents × price
   each (struck $39.95), SAVE pill, "+ N FREE Diffusers" with the 2D framed photo (6 months: "Scents only" + a nudge to 9),
   total today. Three lines under the cards rewrite with the selection; CTA "Pick my N scents".
   Badges under the H1: ONE PAYMENT. NOTHING RENEWS. / WE CANCEL YOUR SUBSCRIPTION FOR YOU. / FREE DIFFUSERS FROM 9 MONTHS.
   H1: "Stock up for months, save up to $360, and let us cancel your subscription for you."
2. Step 2 — the kits scent picker (−/+ per scent, duplicates allowed, cap = the supply's count), the reserved-diffuser card,
   a "Spread my N bottles across all seven scents" shortcut, price per bottle struck/tier in the smells-like bar.
3. Step 3 — review (scents at the tier price, struck list price; diffusers struck FREE), value + "You save", DUE TODAY, the
   cancellation card (name required, email optional; "cancelled in less than 24 hours"), one-payment note, SECURE CHECKOUT.
   Without a name the button toasts and focuses the field.

## Checkout (TODO, owner creates the SKUs)
`SUPPLY_CART` in the app: one variant per tier + the diffuser variant. Until they are filled the live page toasts
"This offer isn't open for checkout yet". Planned order shape: the supply variant carries the price (scents listed as a line
property), the chosen scents and the free diffusers go in as their own lines, one automatic buy-X-get-Y per tier zeroes them;
the cancellation request rides on the order as cart attributes ("Cancel subscription for", "Subscription email", "Supply").
Also pending: a Shopify page at /pages/supply with the kits page-body pattern (preload + loader + pre-hero), the hero picture,
the theme announcement bar text (it is global: today it says "THE DIFFUSERS ARE 100% ON US…" on every page).

Preview: build with `APP=… CSS=… [STANDIN=1] node build-variant.mjs` (scratchpad pw) — artifact "MC Scent Supply".
