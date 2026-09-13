# Microsoft Clarity exports

Pulled by `.github/workflows/clarity-export.yml` (bump the number in `RUN` to trigger; token lives only in the
`CLARITY_TOKEN` repo secret). The Data Export API returns aggregated metrics for the last 1-3 days only:
sessions, scroll depth, engagement time, dead/rage/quick-back/error clicks, script errors, split by URL, device,
OS/browser. It does NOT expose heatmap images, click coordinates or recordings; those stay in the Clarity dashboard.
Quota: 10 requests per project per day, one export run uses 4.

## Read of export 20260913T2019Z (3 days, 974 sessions) - 2026-09-13

Founder's Offer page `/pages/six-month-program`: 810 sessions (83% of site traffic).

| Metric | Value |
|---|---|
| Avg scroll depth (URL rows, unweighted) | 19% |
| Avg scroll depth, mobile / tablet / PC (site-wide) | 25% / 26% / 44% |
| Engagement, mobile | 149 s total, 73 s active |
| Sessions with a dead click | 12.6% (tablet 28%) |
| Sessions with a quick-back click | 1.7% |
| Sessions with a JS error | 3.6% (Android FacebookApp 18%, Android InstagramApp 13%, zero on Safari/Chrome) |
| Rage clicks | 0.1% |

Browser mix on the page: Facebook in-app 428 sessions (iOS 306, Android 122), Instagram in-app 106, Mobile Safari 92,
Chrome mobile 111. iOS FacebookApp has the worst dead-click rate (18%, 171 dead clicks).

Page geometry from drawer-recon r202 (live page, % of total page height):

| Section | Mobile 390x844 (page 13,690 px, 16 screens) | Desktop 1366x900 (12,555 px) |
|---|---|---|
| H1 | 5% | 2% |
| Step 1 tiers | 7% | 4% |
| Step 2 scent picker | 11% | 8% |
| Step 3 plan | 22% | 17% |
| Buybox ADD TO CART (reads "Pick 2 more scents" until scents chosen) | ~26-28% | ~20% |
| How auto-refill works | 29% | 23% |
| Mid-page ADD TO CART (mechanism section) | 56% | 54% |
| Proof stats (30+ DAYS) | 66% | 66% |
| FAQ | 88% | 90% |

Reading: the typical mobile visitor (25% scroll ~ 3,400 px) gets through steps 1-3 and stops right around the
buybox add-to-cart. Everything below (how it works, enemy stack, mechanism, Patricia, guarantee, FAQ, proof stats)
is seen by a minority. The sticky bar covers the CTA once the tiers scroll away, so the CTA is always reachable.

Hypotheses to confirm in the Clarity dashboard (Heatmaps > Click > dead clicks, and Recordings filtered by
"dead click" + URL contains six-month-program): taps on tier-card images / "Most popular" badges, taps on scent
cards after 2 are already picked, taps on the disabled "Pick 2 more scents" button, taps on stat tiles or step
titles. JS errors cluster in the Android Facebook in-app browser; check Recordings filtered by "script error".

Other pages (small samples): `/` 48 sessions, 55% scroll, 10% quick-back; `/collections/power-fragrances` 40
sessions, 49% scroll; `/products/diffuser-scents` 24 sessions, 55% scroll, 17% dead + 17% quick-back.

## 7-day read (Sep 7-13, 2026) - Clarity + Shopify

Clarity's export API rejects numOfDays above 3 (empty 4xx body, run 3), so the 7-day funnel comes from Shopify
sessions/orders/abandoned checkouts; Clarity covers behaviour for the last 3 days only.

Funnel for landing page `/pages/six-month-program` (Shopify sessions, landing_page_path):

| Week | Visits | Added to cart | Reached checkout | Bought | Conversion |
|---|---|---|---|---|---|
| Aug 30 - Sep 5 | 672 | 41 | 12 | 3 | 0.45% |
| Sep 7 - Sep 13 | 1,796 | 178 (9.9%) | 121 (6.7%) | 40 | 2.2% |

Biggest leak: checkout -> purchase, 121 -> 40 (33% finish; mobile 109 -> 34). Cart -> checkout is healthy (68%).
51 abandoned checkouts in the window, 45 of them contain the Special Kit and look identical to the orders that did
complete (mostly "2 Diffusers + 2 Scents" at $89.95, two scents chosen). Shipping is free on every order and all
payments go through Shopify Payments, so the leak is checkout hesitation/friction (in-app browsers, subscription
line at checkout), not cart contents or shipping surprise.

Traffic: Facebook 1,072 visits at 2.2%, direct 485 at 2.5%, Instagram 231 at 1.3%. Mobile 88% of visits (2.2%),
tablet 76 (3.9%), desktop 136 (2.2%). US 1,750 of 1,796.

Orders from the page: 2+2 kit 29, 3+3 kit 12, 1 diffuser 6 (7-day product report). Of the kit orders seen in the
last 50 orders, about half were one-time and half on the "Every 30 days" plan. Most buyers convert the same day;
a handful come back after 4-28 days (retargeting/email matter). Protection Pass attached on 3 orders.

Clarity behaviour (Sep 11-13, 810 sessions): mobile scroll 19-25% = through steps 1-3 to the buybox button;
55 s active; dead clicks in 11% of mobile and 28% of tablet sessions; FB/IG in-app browsers = 70% of sessions;
JS errors in 18% of Android FacebookApp sessions, none on Safari/Chrome.

Recommended order of work: (1) abandoned-checkout recovery + checkout reassurance/express pay, (2) move proof
next to the buybox button and shorten the mobile page, (3) make every tap act (kit photo selects, 3rd scent swaps,
disabled button scrolls to picker), (4) Instagram-specific landing/creative check, (5) make the refill plan the
obvious choice vs one-time, (6) reproduce the Android FB in-app browser errors.
