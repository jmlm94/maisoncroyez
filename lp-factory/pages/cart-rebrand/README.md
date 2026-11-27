# Cart drawer in the new brand (proposal, 2026-11-27)

Owner: "Could you also design the whole cart drawer and completely eliminate the one that's present now please? make
sure it has branding, many CRO elements (check other brands) and ultimately with all connections to the products pixel
and whatnot. Let's do an artifact first before deployment."

Artifact only; nothing here is on the store. Source: cart.src.html -> `python3 build.py` -> cart-drawer.html (pictures
inlined from img/, icons from icons/ and ../diffuser-kits-rebrand/icons, the build stops on a middle dot).

## What the store has today (read 2026-11-27, theme copy 189629628525)
- The theme's own cart drawer (Impact, sections/cart-drawer.liquid, cart_type "drawer"), free shipping bar off, no
  recommended products set, title text "WANT MORE? GET 25% OFF ON OUR COLLECTION:" unused.
- App embeds in the theme: Klaviyo, Subi, Postscript, One Click Upsell, Gorgias, Triple Whale.
- Kit product 15507003506797: 1 / 2 / 3 diffusers at $89 / $159 (compare $178) / $239 (compare $267). Three automatic
  discounts make N scents free with the N-diffuser kit.
- The seven scent products are $39.95 and share one refill group (SellingPlanGroup 5188911213, every 30 / 60 / 90 days):
  $39.95 off the first payment, then $10 off ($29.95). So ANY scent bought with a refill plan is $0 today, kit or not.
  The proposal therefore offers refills only when a kit is in the cart, and only on the kit's free scents. Put to him.

## What the drawer does (the artifact works: sizes, plus / minus, add, remove, refills, four example carts)
Top to bottom: kit size as three steps with the next saving ($70 for the second diffuser, $80 for the third); lines with
FREE and the struck price; a slot to pick the free scent when a diffuser has none yet; refills (never preselected; price,
email before each charge, cancel); "Add a scent" from this year's most common pairs (Euphoric + Midnight 62 orders,
Golden + Midnight 51) then best sellers; one real quote and "4.7 | 124 reviews"; free shipping from Miami, 30 days or
every dollar back, lifetime warranty; a pay bar that stays on screen (subtotal, saved, free shipping, the total in the
button, the Shop Pay installments line). Scents-only carts get "add a kit and one of these scents is free". The empty
cart shows the two doors and three best sellers.
Left out: countdowns and low-stock lines (not true), a free shipping bar (every order ships free), a discount code box,
paid shipping protection.

## Other brands (cart-refs workflow, lp-factory/recon-cart, two runs)
One product added on a phone on each of nine sites. Drawers read: Flewd, Hey Hanni (UpCart), Mozi Wash, Primally Pure
(Rebuy). Cart pages without a drawer: AromaTech, Hotel Collection. Not read: Aroma360 (nothing to add on the product
it opened), Ketro (cart stayed empty), Pura (no product page opened). Sheet: lp-factory/recon-cart/sheet-drawers.jpg.
Common to the four drawers: a reward bar at the top, struck prices, products to add. Two put the total in the button,
two put a guarantee or rating by it, three have a discount code box, two add paid shipping protection.

## Checks
Scratchpad cart/test.js: totals for each example cart ($89.00 / $159.00 / $79.90), the slot after an upgrade, a third
scent charged at $39.95, the refill line ($59.90 every 30 days for 2), a kit added to a scents-only cart ($128.95, one
scent free), the empty cart, no sideways scroll at 390 and 1280, every button at least 40 px high, no script errors.

## Open, his to decide
Refills for scents-only carts; whether the kits page opens the drawer instead of going straight to checkout; fast-pay
buttons under the main button; sending /cart to the drawer; short scent names instead of the store's product titles.
Before any deploy: re-read the theme skill's Shop Pay Installments rules (the line must be Shopify's own component).
