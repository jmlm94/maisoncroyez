# Diffuser kits + one free scent (Copy 3)

Fork of `lp-factory/pages/free-diffusers/ritual/` (rt18, 2026-10-03) for the second offer. Preview artifact: MC LP Draft Copy 3
(https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN). Not deployed; no Shopify page, variants or plans exist for it yet.

Offer (owner, 2026-10-03): 1 / 2 / 3 diffusers at $129.95 / $149.95 / $199.95, one scent free today on every kit, optional
refills every 30 / 60 / 90 days at $34.95 / $39.95 / $44.95 per bottle (same Subi prices as the ritual page), or no subscription.
2 diffusers = Most popular (preselected), 3 = Best value. Savings shown against $129.95 per diffuser + the $49.95 scent.

Files: `mc-dk-app.js`, `mc-dk.css` (patched copies of mc-rt-app.js / mc-rt.css; patch scripts patch-kits1/2.py in the session
scratchpad). Everything below the buy box is identical to the ritual page.

Cart wiring still open (`CART3.kitsFreeScent` is null → preview toast): needs three kit variants ($129.95 / $149.95 / $199.95),
a way to make the first scent $0 on the subscription path (a Subi plan group whose first payment is 100% off, then $15 / $10 / $5
off), and an automatic discount for the no-subscription path (buy a kit → 1 scent free).

## 2026-10-21 — dk9p (key dk9p-9efc817, LIVE 19:03 UTC): cart at Review my kit, the website's header, ?kit= deep link
Third owner round of the day (artifact v36). Four preview builds went out together:
- dk9m — `syncKitCart()` runs at "Review my kit" (button and sticky bar), so the kit variant and the scents on the chosen plan
  are in the cart while the visitor reads step 3 and the Meta pixel's AddToCart fires there; "🔒 SECURE CHECKOUT ➔" re-syncs
  (plan change) and goes straight to /checkout, where InitiateCheckout fires. Equal-height option cards (the theme's prose
  margin on the cards is reset), "(Requires X scents)" with the parentheses, step-3 heading "How frequently would you like
  your refills?" centred and 15% bigger (`.s9-freq-head`).
- dk9n — the sync reconciles the cart instead of clearing it: it reads /cart.js, changes quantity / selling plan on existing
  lines with /cart/change.js, drops lines that are no longer wanted, and calls /cart/add.js only for missing lines. A pending
  sync is awaited before the next one starts (`KITCART.pending`). Unit-tested on 7 mock carts (`scratchpad/reconcile-test.mjs`).
- dk9o — no page-own announcement bar or header (`RitualHeader` no longer rendered); the website's header, announcement bar
  and footer frame the page. The page body stopped hiding the theme header group, dropped `body{padding-top:0}` and put the
  pre-hero frame back in flow (90vw, rounded corners).
- dk9p — `tierIdx` from the URL: `?kit=one|two|three` or `1|2|3` pre-selects the option card (default stays 2 diffusers).

Deploy: fileUpdate 46262619439213 (127,582 B) + 46262619471981 (148,047 B) from raw @ 9efc817 (READY 18:41:21Z), pageUpdate
161846919277 at 19:03:44Z. Live checks at 19:08: page-shot key + body md5 match, qa-kits 20261021T1908 47/47 (new
`cart-*-review` checks), qa-cart 20261021T1908 23/23, pixel-kits 20261021T191 (AddToCart ×4 right after Review my kit,
InitiateCheckout on the checkout page).

Header catch: the live theme (speed round 3) hides `.shopify-section-group-header-group` on the diffuser-kits handle from
`layout/theme.liquid`, so with dk9o the page had no header at all. The page body (re-pushed 19:56:11Z, same key) now reveals it:
`html.mc-tcss .shopify-section-group-header-group{display:revert !important}` once the theme's deferred theme.css has applied,
and `html:has(link[data-mc-tcss]):not(.mc-tcss) #mc-prehero{visibility:hidden}` so the first paint already has the header
above the hero (no layout shift, no unstyled header). Trade-off: steps 2 and 3 start 119 px lower on a phone, so the fold
checks miss by about that much again. The clean fix is in the theme layout (remove diffuser-kits from the `mc_lp` handle list,
which also makes theme.css render-blocking on this page again); it needs a theme publish, so it stays a proposal.
Rollback = key dk9l-852ab84 with the files at commit 852ab84 (and the dk9l page body, which hides the header group itself).

## 2026-10-21 — dk9l (key dk9l-852ab84, LIVE 16:05 UTC): new title, same-size cards, Secure checkout straight to checkout
Second owner round of the day (artifact v33, "Deploy!"): title "Waterless Diffuser & Organic Scents: Protect your loved ones
while making your spaces look and feel great."; hero 90% wide (corners kept; the page body's pre-hero frame follows at 90vw,
fixed 16:19 UTC); option cards all the same size again, "1 / 2 / 3 Diffusers", a "Requires 2 / 3 / 5 scents" line, Best value
tag on the third (Most popular stays on the middle one); step-1 guarantees styled like step 2's cards; the step-1 button and
sticky bar fixed as "Pick your scents ➔"; step 2 tiles ordered photo → name → strength → quantity selector; the smells-like bar
empty state is one bold line "☝🏻 Tap a scent to read more about it." and the scent line carries "· $39.95"; step 3 frequency
buttons the same height with the MOST POPULAR pill on top of the 30-day one; the button reads "🔒 SECURE CHECKOUT ➔" and
`addToCart` goes straight to /checkout after the add (800 ms pixel margin kept; the drawer path is gone on this page, so the
drawer's "Frequently added together" upsell no longer shows here). Fold (emulated preview, accepted): phone 390×844 step 2
guarantees 934, step 3 button 899; desktop 1366×900 step 3 button 925. Deploy: fileUpdate 46262619439213 (123,088 B) +
46262619471981 (147,651 B) from raw @ 852ab84 (READY 15:51:26Z), pageUpdate 161846919277 (16:05:12Z, then 16:19:18Z with the
90vw pre-hero). QA: qa-kits and qa-cart read the cart from the checkout page and count page errors up to the navigation only;
kits scenarios expect the Secure checkout label; qa-kits checks the fixed label, the new bar prompt and the aria-label tiers.
Rollback = key dk9k-3d43fe7 with the files at commit 3d43fe7.

## 2026-10-21 — dk9k (key dk9k-3d43fe7, LIVE 10:16 UTC): the owner's sizing round, deployed as is
Owner round on the dk9j page (artifact v32, "Deploy as is"): hero 20% smaller with rounded corners and white space around it
(`.gal-slide.ph.sq` at 80% on step 1; the page body's pre-hero frame matches: 80vw, radius 16 px, 6 px above, fixed at 131 px
on phones); rating +20%; main title +15% with tighter margins; health badges with the emoji on top and the text centred, +5%;
every step title +10%; option cards without the room name (it stays in "Where it goes" and in the card's aria-label), the middle
card with a bigger picture and title; "Where it goes" text +7%; step 2: more spacing, names +10%, bigger steppers now inside a
`.e4-ph` wrapper on the photo (they used to cover a two-line name), the strength label (`.e4-str`, SOFT / MEDIUM / BOLD dots) on
each tile, the smells-like bar as a text block with the emoji inline on a bigger first line, no strength and no ingredients link
there; step 3: block gap 10 px, review card 8 px padding, fixed note +10%. Fold, measured on the emulated preview and accepted by
the owner: phone 390×844 step 2 guarantees end at 878, step 3 Add to cart at 900; desktop 1366×900 step 3 Add to cart at 928.
Picker photos stay 4 across on phones (bigger photos would need 3 across and an extra row). Deploy: fileUpdate 46262619439213
(123,138 B) + 46262619471981 (146,016 B) from raw @ 3d43fe7 (READY 2026-10-21 01:06:56Z), pageUpdate 161846919277 with the
dk9k-3d43fe7 body (33,245 B; updatedAt 10:16:03Z). qa-kits follows the markup (tierOn from the card's aria-label, no ingredients
check, strength label count). Rollback = key dk9j-b9e8578 with the files at commit b9e8578.

## 2026-10-20 — dk9 (key dk9-4f3f77f, LIVE 22:11 UTC): three-step page, free diffusers for a scent subscription
Owner brief (2026-10-20): turn the page into the three-step flow again (diffusers → scents → confirmation) keeping the branding;
new offer: 1 free diffuser for 2 scents ($79.90), 2 for 3 ($119.85), 3 for 5 ($199.75), the scents at $39.95 each; no prices on
step 1 (each option shows the diffusers' value struck + a green FREE pill, as the owner's reference card); step 3 picks the refill
frequency (60 / 30 / 90, 30 in the middle with the black "Most popular" pill) at the same price, no one-time option; everything
from the announcement bar to the guarantees above the fold on steps 2 and 3; hero video replaced by a picture; health angles
(chemical scents vs lungs / allergies, mold in water diffusers, stress / anxiety) as three all-caps badges under the title.
Eleven preview rounds on the artifact (v20–v30; the dk8e page is backed up at https://claude.ai/artifact/VJUTCewJHhvRbYBK3t1YMp).

What the page does now (`mc-dk-app.js`, `MC_HERO_STILL = true`, `TIERS`, `FREQS`, `HEALTH3`, `selStore`, `BuyBox`, `StickyBar`):
- Step 1: announcement "THE DIFFUSERS ARE 100% ON US, JUST PICK YOUR SCENTS.", square hero picture (`mc-dk-hero-800.jpg`,
  Shopify Files 46489007161453; the page body carries a 720×720 WebP pre-hero so nothing jumps before the app mounts), rating
  and title centred, badges, "Step 1 of 3", "How many spaces would you like to transform today?", three option cards
  (`.tier.t9c3`: picture, name, "N diffuser(s)", struck value, FREE), "Where it goes" panel with the coverage, "Pick your N
  scents ➔". Sticky bar visible from load on this step.
- Step 2: "Pick your N scents:" + "k of N picked" pill + the reserved card (kit picture, "N FREE DIFFUSERS RESERVED", struck
  value, green FREE!). Tapping a tile only shows the scent in the smells-like bar; + adds, − removes (duplicates allowed, cap =
  N). Inline "See the ingredients of every scent" toggle. "Review my kit ➔" appears when the kit is full.
- Step 3: 16:9 picture (`mc-dk-step3-1600x900.webp`, Files 46489007194221), "Congratulations, your free diffusers have been
  reserved.", kit review (scents + diffusers struck / FREE), "That's $X of value, you pay $Y today." + "Due today: $Y",
  "Refill my N scents every:" 60 / 30 / 90, the fixed note "Swap, pause and cancel anytime. If your home doesn't feel different
  within 30 days, full refund, and we pay the return shipping. No questions asked.", "ADD TO CART — $Y ➔", guarantees,
  testimonials, FAQ (four subscription FAQs from /pages/build-your-kit first), "← Change my scents".
- Cart: `CART3.kitVariants[T.key]` (Free Diffuser Kit 8277082341485, variants one 45900240257133 / two 45900240289901 / three
  45900240322669) + the scents on `CART3.ritualPlans[freq]` (Subi group 5181898861 "02/10 Official Plan": Monthly 7876575341,
  Every 60 days 7876608109, Every 90 days 7876640877). The kit line goes to $0 through the three automatic BXGYs "FREE DIFFUSER"
  (1389794623597), "FREE DIFFUSERS — 2 scent subscription" (1389794852973), "FREE DIFFUSERS — 3 scent subscription"
  (1389794951277), all verified ACTIVE on 2026-10-20.

Deploy: fileUpdate 46262619439213 mc-dk-app.js (122,877 B) + 46262619471981 mc-dk.css (141,271 B) from raw @ 4f3f77f, both READY;
pageUpdate 161846919277 with the dk9-4f3f77f body (33,215 B; updatedAt 22:11:41Z). Checks after the deploy: page-shot, qa-kits
(rewritten for the three steps, 45 checks + two carts, gated on the live key starting with dk9) and qa-cart (K1–K7 scenarios
added, same gate) — see STATUS.md for the results. Rollback = key dk8e-b55025a with the files at commit 98d8529.

dk9j (same day, 22:55 UTC, key dk9j-b9e8578): the first live run found two things the local preview could not show. (1) The
theme's prose rule `.prose * + :is(p, div, ul, ol){margin-block-start:var(--spacing-3)}` (12 px phones / 16 px desktop) pushed
the step-3 review rows apart and the Add to cart button ended 43 / 59 px below the first phone / desktop screen; the pill
"MOST POPULAR" also wrapped on a 390 px phone. Fix in mc-dk.css: `#root .kitrev > * + *{margin-block-start:0 !important}`,
the pill `white-space:nowrap`, desktop banner 164 px and review-card padding 6 px. (2) HeroStill adopted the page body's 720 px
inline frame and never loaded the 800 px file; it now swaps `src` to MC_HERO_POSTER once that file has loaded (same 1:1 box).
Also: Shopify splits a doubled scent (Chilled Citrus ×2) into two ×1 lines when the automatic BXGY marks only one unit as the
"buy" item — the total and the free kit are right; both QA scripts now compare lines merged by variant + plan + unit price.
The local preview builder (scratchpad pw/build.mjs) now emulates the theme's prose spacing so fold numbers match live.
Files: mc-dk-app.js 123,253 B, mc-dk.css 142,184 B from raw @ b9e8578 (READY 22:40:09Z), page body 33,220 B (updatedAt
22:55:46Z). Rollback = key dk9-4f3f77f with the files at commit 4f3f77f (or dk8e-b55025a / 98d8529 for the two-step page).

Known trade-offs (owner not yet decided): the cart shows the kit variant titles "N FREE Diffuser(s) + N Scent(s)" struck at
$79.95 / $159.90 / $239.85 while the page shows $89.95 / $179.90 / $269.85 (rename / reprice needs the owner's go-ahead); the
02/10 plans take $15 / $10 / $5 off from the second box while the page only promises the same $39.95 (a pleasant surprise, but
the FAQ copy says "same price"); the four FAQ policy lines are copied from build-your-kit and not confirmed; small phones
(360×740) scroll a little on steps 2 and 3; the automatic discount "FREE SCENT — Diffuser Kits (no subscription)" is still active
(it targets product 8245945434221, which this page no longer adds).

## 2026-10-14 — dk8e (key dk8e-b55025a, LIVE 17:07 UTC): botanical picker photos + centred smells-like bar
Owner uploaded seven 400×400 PNGs to Shopify Files (15:50 UTC: golden_blossom, crisp_citruss, chilled_citrusss, honey_nectarr,
euphoric_bloom, wilwood_mistiqye, midnight_sensation) and asked for them on the Step 2 picker. The picker and the "seven scents"
story cards shared the frag1–7 slots, so the picker got its own: CONFIG.images.pick_<key> (served at `&width=320`, the CDN resizes
and converts), each fragrance has `pimg: "pick_<key>"`, and the picker tile renders `slot=${f.pimg || f.img}`. The story cards keep
the bottle images. Also live with this key: dk8d, `#root .e4-bar{justify-content:center;align-items:center;text-align:center}`
(owner: "Could you center this?", previewed as artifact v18). Deploy: fileUpdate 46262619439213 (116,261 B) + 46262619471981
(116,949 B) from raw @ 98d8529, pageUpdate 161846919277 with the dk8e-b55025a body. Checks: page-shot + qa-kits runs after the deploy
(see STATUS.md). Rollback = key dk8-6ab424e (the previous files are the ones at commit ceb1500).

## 2026-10-14 — dk8 (key dk8-6ab424e): leaner buy box, nothing pre-selected, picker E, smells-like bar
Owner (artifact rounds v15–v17, then "Deploy!"): remove the "N diffusers picked" pill, the "Free scent: … · $39.95 value" pill, the
"We pre-selected…" banner, the two lines under the Step 3 title, the "Fact: 86%…" box and the order summary; no scent pre-selected
(keys: []); tighter spacing from the rating line to Add to cart; "Where it goes" 50% shorter (small plan left, title + chips + caption
right); tile 2 reads "Replaces room sprays, plug-ins and candles instantly." (candle icon) and the "Say goodbye…" lede is gone; the
scent picker is option E from the scent-picker options artifact (LDmEDN43FTgwNydH4zrQAa): four photo tiles per row on a phone,
seven in a row on desktop, name under each, and a bar below that says "Tap a scent to see what it smells like." until a tap, then
name · intention · strength, "Smells like: <smells2>", "Notes: <chips[0]>". Add to cart always shows the price; tapped with no scent
it scrolls to Step 2, outlines the grid for 1.6 s (.picker.nudge) and toasts "Pick your free scent first. It's included." (buy box and
sticky bar). Cart logic, prices, plans and discounts unchanged. Measured on the dk8 preview (phone 390): Add to cart 3,296 → 2,169 px
from the top (−34%), picker 579 → 244 px + 38 px bar, "Where it goes" 348 → 173 px. QA selectors kept: `.picker .pick`,
`.pick.on .pick-scent`, `#buybox .picker`.

## 2026-10-13 — dk7 (LIVE as dk7-14579ac, 17:01 UTC; the notes below are the preview rounds): one refill choice + "Where it goes"
Owner: drop the 60 / 90-day options (every 30 days or no subscription) and teach placement per kit, like the bundle page's floor plan.
App: FREQS = [30 days $24.95] only; Step 3 is now two cards ("Yes, refill every 30 days — $X today, then $24.95 per scent…" and
"No subscription — $X today, nothing after"), the "Don't want refills?" link is gone (page-shot's cart check still clicks .rf-link /
.fq:nth-child(3) — update it before the deploy: no-subscription card = `.rf2 .fq-one`). New "Where it goes" panel under the kit cards
(PLANS: studio / living room + bedroom (the bundle drawing) / living room + bedroom + kitchen, room chips with icons, caption per
tier, swaps with the selected kit); tier subtitles now name the rooms ("Studio, bathroom or entry" / "Living room + bedroom" /
"Living room, bedroom + kitchen"). CSS: .place* / .rf2 rules appended. Preview: artifact TK1GvMvzMi69pP4wiLMfyN v8, built by
inlining lp-factory/assets/cdn/{mc-lp-vendor.js,mc-lp-diffuser-assets.js} + the app + css into one HTML (fonts inlined as data URIs).
dk7b (owner round 2, preview v10): kit lines "Perfect for: Studio, Bathroom, Entry." / "Perfect for: Living Room, Bedroom, Kitchen." /
"Perfect for: 1+ Rooms, Large Spaces."; panel heading "WHERE IT GOES:" bigger + black; chips Title Case per the same lists (3D: 🏠 1+ Rooms,
📏 Large Spaces); Step 3 cards "Yes, refill every 30 days — $24.95/scent — with $15 OFF on my scent" and "One-Time Payment — $39.95/scent —
No automatic refill, scents at $39.95 each."; refill-why trimmed to the free-first-bottle line.
dk7c (owner round 3, preview v11): placement logic corrected — 2 diffusers = two coverage zones in ONE bigger room (plan: one large living
room with two diffusers, "or the bedroom, or the kitchen"); 3 diffusers = two in the living room + one in the bedroom (bundle drawing with a
second living-room zone). Captions updated to match.
dk7d (owner round 4, preview v12): refill card = one bold sentence "Yes, refill every 30 days with $15 OFF on my scent." + $24.95/scent;
one-time card grayer (title + sub) with no price on the right, "No automatic refill, scents at $39.95 each." stays below.
dk7e (owner round 5, preview v13): refill card gets a second line "Free Shipping, right at your doorstep. Swap, pause or cancel anytime."
dk7f (owner round 6, preview v14): one-time card back to the same black as the refill card; "Swap, pause or cancel anytime." bold on the
refill card and in the Step 3 subtitle ("Skip, swap, pause or cancel anytime.").
