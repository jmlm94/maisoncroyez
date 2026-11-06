# dk13 — step 3: Auto-refill (save 25%) vs One-time purchase (preview, owner 2026-11-06)

Owner: "do a change on the third step on the landing page that gives them two options, assuming we'll do $39.95 per scent
again? Option 1. 30 60 90 days of supply, $29.95. Option 2 one time purchase $39.95 each scent. but do it in terms of % off if
they subscribe". Asked whether one-time buyers still get the diffusers free: "Free either way". Previewed on MC LP Draft Copy 3
(https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN). The live page (dk12) is unchanged.

Step 3, under the Due today block: "How do you want your scents?" and two cards —
- **Auto-refill** (preselected, SAVE 25% pill): ~~$39.95~~ **$29.95**/scent, "Every 30, 60 or 90 days. Cancel anytime."
  The 60 / 30 / 90 buttons show under it ("Select your auto-refill frequency:").
- **One-Time Purchase**: **$39.95**/scent, "No auto-refills, full price." No frequency buttons.

The kit rows, Due today ("~~$39.95~~ $29.95/scent" on auto-refill) and the explanation follow the choice; the value line
counts the scents at $39.95 either way ("That's $339.70 of value, you pay $119.80 / $159.80 today"). Button unchanged.

Round 2 (owner comments on v62, 2026-11-06; artifact v63): "One-Time Purchase" (title case), "No auto-refills, full price.",
"Every 30, 60 or 90 days. Cancel anytime.", the SAVE 25% pill 10% bigger on a white background (green text + border), and the
"· 25% off" after "$29.95/scent" under Due today deleted. Round 3 (owner comment on v63; v64): the pill back to a green
background with white letters, still 10% bigger.

| Kit | Scents | Auto-refill today | One-time today | Value shown |
|---|---|---|---|---|
| 1 diffuser | 3 | $89.85 | $119.85 | $209.80 |
| 2 diffusers (Most popular) | 4 | $119.80 | $159.80 | $339.70 |
| 3 diffusers (Best value) | 7 | $209.65 | $279.65 | $549.50 |

Explanation copy (auto-refill): "Your diffusers are free ($89.95 each). With auto-refill you save 25% on every scent ($29.95
instead of $39.95). You can swap, pause or cancel your auto-refill anytime, and we'll send you a prepaid return label." (the
last sentence is the owner's dk11 line — with the diffusers free either way the return label may no longer apply; owner to
decide). One-time: "Your diffusers are free ($89.95 each) either way. One-time scents are $39.95 each; choose auto-refill above
and they're $29.95 (25% off), and you can swap, pause or cancel anytime."

Not changed: steps 1–2 still say "$29.95 each" (the auto-refill price, the default). Cart: on one-time the scents are added
without a selling plan (kitItems + addToCart); the preview toast says "one-time (no refills)".

## Before it can go live (Shopify, not the page)
- Scent variants back to $39.95, with the 30 / 60 / 90 plans of "04/10 Sub for Offer #2 and #3" at $29.95 (25% off; the plans
  take 0% today, so the subscription price = the variant price). The plan pricing lives in Subi (off-limits here).
- The three "N FREE DIFFUSER(S) — SCENT SUBSCRIPTION" BXGYs match subscription scent lines only (customerBuys isSubscription
  true / isOneTimePurchase false, restored 2026-11-03). For the kit to be free on the one-time path they need
  isOneTimePurchase: true as well — and that makes a plain one-time cart of 3+ scents + a kit free too (the product pages).
- qa-kits needs a one-time cart case.

Build: `python3 patch.py <dir>`, then `APP=<dir>/mc-dk-app.js CSS=<dir>/mc-dk.css node ../dk9s-step1-scents/build-variant.mjs <dir>/kits-raw.html "MC LP Draft Copy 3"`,
then inline the seven scent photos (../../../adv-kits/kits-ref/img/*.png → webp 320 px, replacing the `files/<name>.png?v=…&width=320` URLs).
