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

## 2026-11-06 — dk13 (key dk13-525274f, LIVE 22:20 UTC, take 2; first live 21:09–21:36): step 3 Auto-refill (save 25%) vs One-Time Purchase, diffusers free either way

Owner: two options on step 3, "assuming we'll do $39.95 per scent again … in terms of % off if they subscribe"; asked: the
diffusers stay free either way; kits page only (the Candle Swap builder stays subscription-only); the return-label sentence
kept; steps 1–2 keep "$29.95 each". Built by variants/dk13-sub-vs-onetime/patch.py from the dk12 files (owner rounds 1–3 in
that folder's README; preview MC LP Draft Copy 3 v62–v64).
- Step 3 under Due today: "How do you want your scents?" + two cards — Auto-refill (SAVE 25% pill, ~~$39.95~~ $29.95/scent,
  "Every 30, 60 or 90 days. Cancel anytime.", preselected, the 60 / 30 / 90 buttons under it) and One-Time Purchase
  ($39.95/scent, "No auto-refills, full price."). The rows, Due today, the value line ($339.70 for the 2-diffuser kit) and the
  explanation follow the choice; one-time adds the scents without a selling plan.
Shopify (connector, store confirmed Maison Croyez before the writes) — the owner's "two discounts in the order" instead of a
Subi price change:
1. New automatic discount 1543808581741 "AUTO-REFILL — $10 OFF EVERY SCENT": the 7 scents, $10 off each bottle, subscription
   lines only, recurringCycleLimit 0 (= every renewal; Shopify defaults it to 1 = first payment only, so set it explicitly),
   combines with product / order / shipping discounts.
2. Scent variants 29.95 → 39.95 seconds later (compare-at $49.95 kept). Net: auto-refill $29.95, one-time $39.95.
3. The three FREE DIFFUSERS BXGYs: customerBuys isSubscription true AND isOneTimePurchase true (both sent), minimums 3 / 4 / 7
   kept. The old "FREE SCENT — Diffuser Kits (no subscription)" discount targets another product (8245945434221), not the
   page's kit variants (product 8277082341485, unlisted), so one-time kit carts get no extra free scent.
4. fileUpdate 46262619439213 mc-dk-app.js (138,466 B) + 46262619471981 mc-dk.css (158,443 B) from raw @ 525274f, READY;
   pageUpdate 161846919277 with the dk13-525274f body (updatedAt 21:08:58Z).
Then qa-kits (qa-kits-dk13.patch: $39.95 lines with "-10" on the subscription lines, the two cards, a one-time toggle, a
one-time cart) from commit 11dee7e and page-shot from b5adfc5. Candle Swap untouched: its subscription carts now show scent
lines at $39.95 − $10 (same $119.80 total); qa-adv's line-price expectations (29.95) must change before its next run.
To verify: one real subscription order, then the contract in Subi must show $29.95 per bottle on renewals (Shopify carries the
discount into the contract; if it does not, fall back to a Subi fixed price of $29.95).

**ROLLED BACK 21:36 UTC — the $10 discount never applies.** qa-kits (qa-kits/20261106T2111) and page-shot both showed the
auto-refill carts at $39.95 per scent ($159.80 / $119.85 instead of $119.80 / $89.85): the kit was free, but no "AUTO-REFILL"
allocation on the scent lines. Shopify's docs (DiscountCombinesWithInput): "By default, only one product discount applies per
line … Buy X Get Y discounts stack only on the customer-gets products (GY), not the customer-buys products (BX)." The scents
are the BX of the free-diffuser BXGYs, so no second product discount can ever touch them (the tag-based same-line stacking is
Plus-only and also excludes BX). Done, in order: scents back to $29.95 (21:1x UTC; auto-refill carts right again), the $10
discount deactivated (status EXPIRED, 21:18:54Z — left active it would have given $19.95 scents to product-page subscribers),
the dk12 files back on the CDN from raw @ f208dca, the dk12 body (key dk12-f208dca) on page 161846919277 (21:35:52Z), the
qa-kits patch reverted. Verified 21:38–21:41 UTC: qa-kits (qa-kits/20261106T2138) carts $119.80 / $89.85 with the kit at
$0.00 and every scent line $29.95 (marked FAIL only because the harness now counts two console notices — the shop.app frame's
CSP line and a 403 resource — as page errors before the click; to fix in cartFlow: drop "console:" entries from perr);
page-shot (shots/20261106T213x) body match, live md5 identical to the 2026-11-03 run, both drawer carts $119.80 with the kit
at $0.00, no JS errors. Left as is: the BXGYs still accept one-time scent lines (harmless on dk12, needed again for dk13).
The plans read 0% off (they inherit the variant price): Subi must hold a fixed $29.95 (or $10 off) on the three plans before
the variant can go to $39.95. Order #MC27255 (21:06 UTC, a product-page one-time scent) paid $39.95 — owner's call on a $10
refund.
Live window: dk13 was up 21:09–21:36 UTC; from 21:1x the scents were $29.95, so its one-time option charged $29.95 instead of
the $39.95 shown (customer-favourable). Next for dk13: the subscription price must be the selling plan's price (Subi: the
30 / 60 / 90 plans of "04/10 Sub for Offer #2 and #3" at a fixed $29.95), then variants $39.95, then the dk13 files + body
(variants/dk13-sub-vs-onetime, qa-kits-dk13.patch needs its "-10" disc expectations removed: the lines will read price 29.95).

**LIVE AGAIN 22:20 UTC (take 2) — the $10 off lives on the Subi plans.** Owner (Subi, "done here"): the three plans of
"04/10 Sub for Offer #2 and #3" (7883817069 / 7883849837 / 7883882605) now carry a fixed $10.00 discount, every cycle —
read back through the connector as pricingPolicies FIXED_AMOUNT 10.0 (sellingPlanGroupUpdate itself is denied to the
connector: "Required access: write_products + write_own_subscription_contracts/write_purchase_options"). Then, store
confirmed Maison Croyez before each write: 1. the 7 scent variants 29.95 → 39.95 (compare-at $49.95 kept) — store-wide, so
product-page one-time buyers pay $39.95 and product-page subscribers $29.95 too; 2. fileUpdate 46262619439213 mc-dk-app.js
(138,466 B) + 46262619471981 mc-dk.css (158,443 B) from raw @ 525274f, READY; 3. pageUpdate 161846919277 with the
dk13-525274f body (updatedAt 22:20:40Z). Untouched: the BXGYs (customerBuys isSubscription + isOneTimePurchase true,
minimums 3 / 4 / 7, customerGets one-time only = the kit line), the old $10 discount (EXPIRED, keep it off), the Candle Swap
builder. Cart lines on a plan now read price 29.95 with no discount allocation (the plan price), one-time lines 39.95;
the kit line is free on both paths. qa-kits was rebuilt for that (commit c2e2568: SP 29.95 on the plan lines, LP 39.95 on
the one-time cart, no "-10" disc expectation; the shop.app frame's CSP notice + its 403 no longer count as page errors).
Verified 22:25–22:3x UTC on c2e2568: qa-kits (qa-kits/20261106T2225) 52/57 — the three real carts match to the cent:
auto-refill 2 diffusers + 4 scents every 30 days $119.80 (lines 29.95 on "Every 30 days", kit 179.90 → 0.00), auto-refill
1 diffuser + Chilled Citrus ×3 every 90 days $89.85 (kit 89.95 → 0.00), one-time 2 diffusers + 4 scents $159.80 (lines 39.95,
no plan, kit 179.90 → 0.00); step 3 shows the two cards, the one-time toggle ($159.80, no frequency buttons) and the way
back ($119.80, 90 days kept). The 5 non-passes are the same as since dk12 (phone-s2-fold, phone/desktop-s3-fold: the page
is longer than one screen; phone/desktop-errors: the shop.app frame's CSP notice + its 403, counted by run() but not by the
cart flows). page-shot (shots/20261106T2225): key dk13-525274f on phone / small / desktop, body match ignoring newlines
(live 42,165 B vs repo 42,154 B, same without newlines), both drawer carts $119.80 with the kit at $0.00 and the plan lines
at $29.95 ("now" 29.95, "perDelivery" 29.95), no JS errors.
Still to confirm with one real auto-refill order: the Subi contract must renew at $29.95 per bottle (the plan's $10 off
is what the contract carries; the page promises "Every 30, 60 or 90 days" at $29.95).

Page speed after dk13 (owner, 22:3x UTC: "page speed?"):
- paint-trace run 4 (perf/paint-20261106T2240Z.json, real CDP throttling 1.6 Mbps / 150 ms / 4× CPU) vs run 3 of 10-22
  (dk9r): slow phone — hero visible 1.12 / 1.19 s (was 0.63 / 1.17), app mount 2.95 / 3.00 s (was 3.00 / 3.00), first tap →
  step 2 268 / 529 ms (was 222 / 269; the 529 is one run with three long tasks after the tap); fast phone — hero 0.38 s, mount
  0.30 s (was 0.31 / 0.34); desktop — hero 0.30 s, mount 0.45 s. HTML 62 KB (was 53–54: dk12 step-2 badges, dk13 cards, the
  Triple Whale snippet). Long tasks on the slow phone 9–12 (were 6–7), two of them before 0.5 s (theme / pixel scripts), none
  touching the hero paint. The real page is where it was.
- Lighthouse 12, simulated throttling (perf/lh-20261106T2235Z.md): desktop 96 / 97 / 95 (10-22: 97 / 96 / 98); mobile
  49 / 73 / 70 (10-22: 45 / 92 / 91) with a modelled LCP of 5.9–6.4 s (was 2.9–3.1 s) — the lantern model, not a measured
  paint: the LCP element it picks is the adopted hero <img> (class "simg hv-poster", i.e. after the app mount) and it now
  models that paint ~3 s later; the real trace above paints the same image at 1.2 s. Heavier inputs since 10-22: the Triple
  Whale pixel (theme app embed "triple_pixel_snippet", new; api.config-security.com 61 KB XHR at 243 ms + its share of
  wpm: boot-up 458 ms, was 322), the document's inline scripts 1,158 ms (was 850), 947 DOM nodes, Shopify-hosted transfer
  745 KB (was 454: the step-3 webp + the seven tiles now land inside Lighthouse's window). Nothing of dk13 itself is in the
  critical path (mc-dk-app.js 32 KB / mc-dk.css 23 KB transfer, same as before).
- PSI (psi.yml, Google's hardware + CrUX field data): failed for all four calls (adv-kits/perf/psi-20261106T2233.md) — HTTP
  429 "Quota exceeded … 'Queries per day' … consumer project_number:583797351": the keyless PSI endpoint shares one daily
  quota across every anonymous caller and it is spent (same as 2026-10-29). To make psi.yml work it needs a PageSpeed
  Insights API key (free, Google Cloud console → APIs → PageSpeed Insights API → credentials) stored as the repo secret
  PSI_KEY, then `&key=${process.env.PSI_KEY}` on the request; until then the owner can run https://pagespeed.web.dev/ on
  the URL by hand (the web UI has its own quota).

QA as a Facebook-ad visitor (owner, 2026-11-07: "make sure everything is working especially if you're coming from a facebook
ad") - `.github/workflows/qa-ad.yml`, reports in lp-factory/qa-ad/<stamp>/. Every active ad (37 in act_522507185818783 that day)
lands on /pages/diffuser-kits with the account's URL parameters (utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}
&utm_term={{adset.name}}&utm_content={{ad.name}}&fbadid={{ad.id}}&tw_source={{site_source_name}}&tw_adid={{ad.id}}) + Facebook's
fbclid; the run opens that URL rendered for "MC | Winners | CBO (11/06)" / "MC | Winners | Broad 18-65+ US" / "PATRICIA FILLING |
Winners" in the Facebook iOS in-app browser (390x664), the Instagram iOS in-app browser, the Facebook Android in-app WebView
(412x780), iPhone Safari and desktop Chrome, walks 2 diffusers + 4 scents -> step 3 -> UNLOCK -> drawer -> cart.js -> the checkout
page, records every Meta beacon, and repeats One-Time Purchase (Facebook iOS) and the advertorial path (both Facebook browsers).
Run 3 (qa-ad/20261107T1553, 87/94; the 7 left were a harness regex on the checkout's kit title) and run 4 (qa-ad/20261107T1603,
94/94): on all
browsers the ad URL lands in one request with the parameters kept, the app renders (key dk13-525274f), no horizontal overflow, the
sticky CTA on screen, Meta PageView + _fbp + _fbc built from the fbclid, the Triple Whale pixel (api.config-security.com), step 3
$119.80 with Auto-refill selected, UNLOCK -> /cart/add.js 200 -> drawer open with its checkout button inside the small viewport ->
cart $119.80 (4 x $29.95 on Every 30 days + kit $0.00) -> AddToCart x5 (179.9, 29.95 x4) -> checkout page $299.70 struck, $119.80
due, the scents "Every 30 days", the kit line "Home Diffusers FREE Pack" $179.90 struck, FREE -> PageView + InitiateCheckout.
One-time: $159.80 (4 x $39.95, no plan) -> checkout $339.70 struck, $159.80 due. Advertorial: PageView + _fbc, fix row -> builder
-> $119.80 -> checkout, the same beacons. Findings for the owner: (1) Shopify answers a %20-encoded query (spaces in the UTM
names) with one 302 to the same URL re-encoded with "+" before serving the page - the parameters survive; the "+" form lands in
one request. (2) On the FB_IAB/FB4A user agent fbevents asks properties://browser/ebpaap - the real Facebook app answers it, plain
Chromium logs a CORS error (harness noise). Real ad orders confirm the path: #MC27254 / #MC27255 (11-06) landed on
/pages/diffuser-kits from Facebook with these UTMs (customerJourneySummary).
## 2026-11-03 — dk12 (key dk12-f208dca, LIVE 01:19 UTC): scents $29.95, 3 / 4 / 7 scents per 1 / 2 / 3 free diffusers, step-2 facts

Owner rounds on the preview (MC LP Draft Copy 3, artifact v59 to v61), then "deploy". Built by variants/dk12-scents2995/patch.py
from the dk11 files (the round-by-round copy is in that folder's README):
- Scents $29.95 each (SCENT_ONE); the kits need 3 / 4 / 7 scents (were 2 / 3 / 5), due today $89.85 / $119.80 / $209.65.
- Step 2, above the scent tiles: "Each scent lasts 15–21 days, depending on use." (bold, .92rem), the Organic Ingredients /
  Paraben-Free / Cruelty-Free badges with heavier line icons, then "All IFRA 51 compliant.".
- The two FAQ answers and the comparison row: about 15–21 days per bottle (were 30+ days).
- Cart code unchanged from dk11.
Deploy (Shopify connector, store confirmed Maison Croyez before every write), in this order so no live cart hit a bad window:
1. The 7 scent variants' price 39.95 → 29.95 (productVariantsBulkUpdate per product; compare-at $49.95 untouched; the page's
   30 / 60 / 90 plans take 0% off, so checkout charges the variant price).
2. fileUpdate 46262619439213 mc-dk-app.js (136,421 B) + 46262619471981 mc-dk.css (156,436 B) from raw @ f208dca, READY
   within the minute (checked by originalFileSize); pageUpdate 161846919277 with the dk12-f208dca body (42,154 B, sent as a
   GraphQL variable: the connector caps the document at 16 KB; updatedAt 01:19:36Z). The Candle Swap page followed (adv-kits
   README, v17).
3. The three "N FREE DIFFUSER(S) — SCENT SUBSCRIPTION" discounts (1389794623597 / 1389794852973 / 1389794951277):
   customerBuys quantity 2 / 3 / 5 → 3 / 4 / 7 (discountAutomaticBxgyUpdate; the 7 scent products and the free kit variant kept).
   TRAP (second time, after 2026-10-21): an update that passes customerBuys without isSubscription / isOneTimePurchase resets
   them to isOneTimePurchase true / isSubscription false, and the kit stops being free on the subscription carts. The first
   live QA (01:26 UTC, 39/49) caught it: every cart charged the kit ($299.70 instead of $119.80, $179.80 instead of $89.85).
   Restored 01:3x UTC with customerBuys {isSubscription: true, isOneTimePurchase: false, value {quantity}} on all three.
   Always send the two flags with any customerBuys change.
Then qa-kits (qa-kits-dk12.patch applied), page-shot and pixel-adv on the live page: first run from commit 1fab4ca (the cart
failures above + harness slips: the step-2 badges key shadowed the step-1 one, "Change my scents" keeps 4 picks now, pixel-adv
picked 3 scents for the 4-scent kit), rerun from f3cf4ae after the fix. Rerun 01:34 UTC: qa-kits 45/49 (qa-kits/20261103T0134:
both carts right, $119.80 / $89.85 with the kit line at $0.00 by the BXGY; the four left are the old fold checks + the shop.app
console noise), page-shot (shots/20261103T0135): body match, both drawer carts $119.80 with the kit at $0.00, no JS errors on
phone / small / desktop. Existing subscribers' prices live in Subi (not touched). No order was placed in the bad window.
## 2026-11-01 — dk11 (key dk11-7dade96, LIVE 23:41 UTC): step 1 title, bigger step labels, step 3 unlock copy + button

Owner rounds on the preview (MC LP Draft Copy 3, artifact v49 to v58), then "AND DEPLOY". Built by
variants/dk11-onetime/patch.py (default build, subscription only; the one-time option was removed in round 10):
- Step 1 title "Buy more scents = *Get more FREE Diffusers:*" (was "How many scents and diffusers would you like?"); the
  "+ N FREE DIFFUSERS" line on the cards in caps and green.
- "Step N of 3" labels 25% bigger (.62rem to .775rem) with 14px above them, all three steps.
- Step 3: the refill buttons come first under "Select your auto-refill frequency to unlock your FREE Diffusers:", then one
  bold explanation, "Your diffusers are free ($89.95 each) when you select any auto-refill option. You can swap, pause or
  cancel your auto-refill anytime, and we'll send you a prepaid return label." (replaces the three notes and the
  "Swap, pause and cancel anytime…" note). Button (and the step 3 sticky bar) "UNLOCK FREE DIFFUSERS ➔".
- Cart code unchanged from dk10b.
Deploy (Shopify connector, store confirmed Maison Croyez): fileUpdate 46262619439213 mc-dk-app.js (135,176 B) +
46262619471981 mc-dk.css (154,776 B) from raw @ 7dade96, both READY 23:34:03Z; pageUpdate 161846919277 with the
dk11-7dade96 body (42,166 B; updatedAt 23:41:15Z). qa-kits updated for the new copy and run on the live page.
## 2026-10-22 — dk9r (key dk9r-b1746c3, LIVE 22:49 UTC): the first tap, not the first paint
Owner: the page "loads EXTREMELY SLOW". Lab numbers said otherwise (Lighthouse mobile median 91, desktop 97; fast phone fully
there at 0.35 s), so `paint-trace.yml` now scripts the first tap under real phone throttling. That is where it hurt: 350–820 ms
from tapping "Pick your scents" to step 2, because the step change unmounted (and step 1 re-mounted) everything below the buy
box, the seven scent tiles (~280 KB) were only requested at the tap, and the first interaction released ~400 KB of third-party
JS at once.
- App: the long-form sections render once inside `StaticOnce` (preact `Component`, `shouldComponentUpdate → false`; the
  React shim has no Component) and are hidden with `display:none` on steps 2 / 3 (`#mc-rest`). The tiles and the step-3
  picture are warmed at low priority 1.5 s after mount. The owner PNG section images carry `&width=1000`. The 800 px hero
  swap runs on desktop only (phones keep the inline 720 px frame, which is also the LCP).
- Page body: third parties release 1.2 / 2.5 / 4.5 s after the first interaction (timers at 5 / 6 / 12 s unchanged).
- Result (throttled phone): tap → step 2 in 222–269 ms (was 347–819), one long task instead of four, tiles already loaded;
  fast phone 88 ms. Paint timeline unchanged (hero 0.6–1.4 s slow, 0.3 s fast; buy box ~3 s slow, 0.35 s fast).
- Tools: `paint-trace.yml` (marks, LCP, long tasks, tap latency, top resources, a third-parties-blocked variant),
  `lh-live.yml` (3 runs per form factor now). The qa-kits hero check accepts the inline frame on phones.
Rollback = key dk9q-5d84bf3 with the app at 5d84bf3.

## 2026-10-21 — dk9q (key dk9q-5d84bf3, LIVE 20:46 UTC): the 04/10 Subi plans, readable checkout lines
Owner: the checkout for 2 diffusers + 3 scents was confusing ("First payment $119.85, then $74.85 every month" on every scent
line, a scent line split in two, a kit line called "2 FREE Diffusers + 2 Scents" with a $159.90 strike-through) and the
kits page should ride the Subi group "04/10 Sub for Offer #2 and #3".
- App: `kitItems()` now takes the selling plan from `CART3.kitsPlans` (04/10 group: Every 30 / 60 / 90 days, 0% policy =
  $39.95 every cycle) instead of `CART3.ritualPlans` (02/10 group with $15 / $10 / $5 off after the first payment). Nothing
  else changed; the key is the only visible change in the page body.
- Shopify: unlisted product 8277082341485 renamed "Maison Croyez Home Diffuser"; the three subscription variants are now
  "1 Diffuser" / "2 Diffusers" / "3 Diffusers" at $89.95 / $179.90 / $269.85 (= the page's value line, so "Total savings" in
  checkout matches); the three automatic BXGYs read "1 FREE DIFFUSER — SCENT SUBSCRIPTION" / "2 FREE DIFFUSERS — …" /
  "3 FREE DIFFUSERS — …" and require 2 / 3 / 5 scents (the page's own requirement), so every scent unit is inside the
  discount and the line no longer splits.
- Checkout now reads: scent lines "$39.95 · Every 30 days" with the discount tag, kit line "Maison Croyez Home Diffuser /
  2 Diffusers  ~~$179.90~~ FREE  2 FREE DIFFUSERS — SCENT SUBSCRIPTION (−$179.90)", recurring subtotal "$119.85 every 30 days".
- Incident during the change (20:3x–21:06 UTC): the first discount update omitted `customerBuys.isSubscription`, the API
  reset it to false, and subscription scents stopped qualifying — the diffusers were charged in full on the kits and ritual
  pages for about half an hour. Restored with `customerBuys { isSubscription: true, isOneTimePurchase: true }`. The
  `cart-probe.yml` workflow (Ajax cart from a fresh session) is the fast way to check discount allocation without a browser.
- Still shared with the ritual page: variant 45900240257133 (now "1 Diffuser", $89.95) and the 1-diffuser BXGY; the ritual
  page copy still says the diffuser is worth $80 — flagged, not changed. The "(One-Time)" variants of the product are unused.
Rollback = key dk9p-9efc817 with the app at 9efc817 (02/10 plans); the product / discount edits are independent.

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

## dk9s (2026-10-25) — step 1 scents-first, LIVE (key dk9s-476dede)

Step 1 asks "How many scents and diffusers would you like?" with the line "Ships every 30, 60 or 90 days. Swap, pause and cancel anytime. Diffusers are free today only." under it.
The three cards read "2 / 3 / 5 Scents" · 2 / 3 / 5 bottle thumbnails (the step-2 product photos) · "$39.95 each" · "+ 1 / 2 / 3 Diffusers" · kit picture · struck $89.95 / $179.90 / $269.85 + FREE · "TOTAL TODAY $79.90 / $119.85 / $199.75";
a three-line how-it-works strip (today scents only + free diffusers ship with them / next boxes scents only, same price, 30-60-90 / cancel anytime, 30-day money-back) sits between the cards and "Where it goes".
Steps 2–3, prices, plans and cart wiring unchanged. `fragSrc()` next to `fillKeys()` resolves a scent key to its product photo. Deploy log and QA numbers in `../free-diffusers/STATUS.md` (2026-10-25); build history in `variants/dk9s-step1-scents/README.md` (rounds 1–2 were artifact-only, v37–v38).
