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

## Weekly read Sep 12-18, 2026 (Clarity export 20260918T1543Z-3d = Sep 16-18, + Shopify sessions/orders/abandoned checkouts) - 2026-09-18

Deploy timeline inside the window: v3s20 3-step wizard (Sep 14), v3s21 refill-plan only / no opt-out (Sep 16 ~14:00 UTC),
v3s23 new prices $79.95/$89.95/$139.95 (Sep 16 ~20:00 UTC), v3s24 one-time option at kit + $49.95/scent (Sep 17 ~18:00 UTC),
v3s27 3-kit $129.95 (Sep 18).

**Caveat on Shopify numbers:** my funnel QA runs (GitHub runner, headless Chrome, desktop UA) add to cart and open checkout.
Shopify counts them as desktop sessions (Sep 14: 4, Sep 16: 16, Sep 17: 16, Sep 18: 13 sessions that "reached checkout"; zero
orders). Desktop this week therefore reads 127 sessions / 57 ATC / 48 checkout / 1 order and is useless. Clarity flags the same
sessions as bots (41 PC bot sessions on the page) and excludes them. Mobile-only Shopify numbers below are clean.

Mobile funnel, landing page /pages/six-month-program (Shopify):

| Period | Sessions | ATC | Reached checkout | Orders | ATC rate | Checkout -> order | Conversion |
|---|---|---|---|---|---|---|---|
| Sep 7-13 (old single-page, one-time available) | 1,679 | 176 | 120 | 39 | 10.5% | 33% | 2.3% |
| Sep 14-15 (3-step wizard, one-time opt-out still there, $109.95/$119.95/$159.95) | 366 | 27 | 18 | 7 | 7.4% | 39% | 1.9% |
| Sep 16-18 (plan only from Sep 16 pm, $89.95 2-kit, one-time at $189.85 from Sep 17 pm) | 487 | 37 | 26 | 6 | 7.6% | 23% | 1.2% |

Reading: the wizard cut the add-to-cart rate from ~10.5% to ~7.5% (the button is closer, but two extra taps now sit before it),
and the plan-only step 3 cut checkout completion from ~35% to ~23%. Together conversion roughly halved (2.3% -> 1.2%). Samples are
small (6 orders in the last period, Thursday partial) and prices changed twice in the same window, so this is a strong early
signal, not proof. Traffic also fell: 240/day mobile vs 270/day the week before (all US, 74% social, 26% direct).

What people bought (orders with this landing page): Sep 14-16 am, 7 kit orders, **all 7 chose "No thanks" one-time** with the free
scents (2 Diffusers + 3 Scents $119.95 x5, 3 Diffusers + 4 Scents $159.95 x2; three added an extra scent at $24.95, two the
Protection Pass). Since plan-only (Sep 16 pm -> Sep 18 15:00 UTC): 3 kit orders, all 2 Diffusers + 2 Scents at $89.95 on the
"Every 30 days" plan (one landed on build-your-kit, one on / from Google). Nobody has taken the $189.85 one-time yet (expected;
it is the anchor). Abandoned checkouts in the same plan-only window: 11 (9 x 2-kit $89.95, 1 x 3-kit, 1 x 1 Diffuser), so ~21%
of plan checkouts complete vs ~47% for the one-time checkouts of Sep 14-15 (7 orders vs 8 abandoned).

Subi renewals are flowing every morning ~08:05 UTC (Sep 15: 8, Sep 16: 8, Sep 17: 5, Sep 18: 6 renewal orders, $39.95-$49.95
per scent, "Delivered every 30 days" / "every 45 days" plans).

Two leaks found in the orders: (1) #MC26944 (Sep 17) is a $0.00 order: 3 scents on the "Every 30 days" plan with no kit. The
plan's $49.95-off first delivery applies to any scent line, so removing the kit in the drawer leaves free scents in the cart.
(2) An abandoned checkout of Sep 17 22:11 had 2+1+2 = 5 plan scents with a 2-kit at $89.95 total: the drawer's +/- lets people
raise plan-scent quantities and every unit is $0 today. Both need a guard in the drawer (lock plan-scent quantity to the kit's
count and drop plan scents if the kit is removed); Subi pricing itself is off-limits.

Clarity, page /pages/six-month-program, Sep 16-18 vs Sep 11-13 (671 vs 812 human sessions; 90% mobile):

| Metric | Sep 11-13 | Sep 16-18 |
|---|---|---|
| Mobile scroll depth, median / mean per session-URL | 13% / 19% | 21% / 32% |
| Mobile engagement, median total / active | 48 s / 24 s | 39 s / 21 s |
| Sessions with a dead click (page) | 12.6% (253 clicks) | 12.8% (181 clicks) |
| Quick-back clicks (page) | 1.7% | 3.0% |
| Sessions with a JS error (page) | 3.6% | 1.6% |
| Android FacebookApp JS-error sessions (site) | 18% | 8% |
| Tablet dead-click sessions | 27.5% | 11.4% |
| Rage clicks | 0.1% | 0.1% |

Reading: people get further down the (now shorter) page and decide faster; JS errors and tablet dead clicks dropped with the
wizard. Dead clicks did not move: still ~13% of sessions, iOS FacebookApp 18%, Mobile Safari 17%, Instagram 15%. Quick-backs
almost doubled (3%), consistent with more people bouncing back to the feed after the first screen. The Clarity export cannot say
what is being dead-clicked; check Heatmaps > Click filtered to this URL for: kit-card images, scent cards after the cap, the
"Selected" plan card, the one-time text line, and the sticky bar.

Recommended next steps, in order: (1) fix the two drawer leaks; (2) decide the plan-only question with data: run a week of the
step-3 one-time at a smaller gap (e.g. +$25/scent, $139.95) or bring back free-scents one-time as a quiet text link, and compare
checkout completion; (3) shorten step 1 -> step 2 (auto-advance to scents when a kit is tapped) to win back ATC rate; (4) mark QA
sessions so Shopify excludes them (bot user agent); (5) read the Clarity click heatmap for the dead-click targets.
