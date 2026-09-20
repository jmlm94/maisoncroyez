# Subi subscription cohort analysis — orders since 1 July 2026

Data pulled 2026-09-20 from the Shopify Admin GraphQL API: every order tagged `Subi Subscription` created on or after 2026-07-01 (query `tag:'Subi Subscription' AND created_at:>=2026-07-01`, sorted by created_at, 8 pages of 50). Raw pages are saved as compact JSON in the session scratchpad (`scratchpad/cohort/page_1.json` … `page_8.json`, abbreviation key in `abbrev.json`, per-customer table in `customers.csv`).

## Headline numbers

- **365 subscription orders** in total: 259 tagged `First Subscription Order`, 101 `Recurring Order #2`, 5 `Recurring Order #3`. No #4 or higher exists yet.
- **225 distinct subscribers** (customer ids with a first order); 2 further customer ids have a #2 renewal but no first order in this window.
- The first tagged subscription order is dated **2026-07-15**; there are no Subi-tagged orders between 1 and 14 July.
- **Order-2 conversion, 30-day/Monthly plans, 37-day window: 59/85 = 69.4%.**
- 45-day plans are not yet due under a 52-day window (0/0); under a strict 45-day window 15/29 = 51.7% have renewed so far (renewals were still landing on 19–20 Sept).
- Order-3: no 30-day customer is yet 67 days old (0/0). Relaxed 60-day window: 5/11 overall, and 5/10 of those who had reached #2.
- Revenue: first orders $17,832.36; recurring $5,872.85 (avg recurring order $55.40).

## Caveats (read first)

- **Cancellations, pauses and failed/retrying payments are invisible.** Subi does not create an order for them, so "due but no #2 yet" is a *ceiling* on churn: it includes payment retries, skipped/paused cycles and customers who moved their renewal date. Conversely a customer counted as "reached #2" may have cancelled after that renewal.
- The 37-day window (30-day cycle + 7 days grace) is slightly tight: of the 82 30-day customers who did renew, 4 renewed on day 38–44 (median 31 days, max 44). Using a 44-day window gives 41/59 = 69.5%, so the ~69% figure is stable.
- Unit of analysis is the customer id; the earliest first order is the start date. 28 customers have more than one first order (details below).
- Line items were fetched with `first: 8`; no order in this set has more than 6 line items so nothing was truncated.
- The offer changed several times during the period (diffuser price $120 → $89.95 → $79.95 → "Special Kits" with scents at $0; scent price $39.95 → $49.95 → $39.95 → $0). Later cohorts are therefore not like-for-like with July.

## 1. Counts

### First subscription orders per week (weeks start Monday)

| Week starting | First orders | New subscribers (earliest first order) | Plan mix of new subscribers |
|---|---:|---:|---|
| 2026-07-13 | 11 | 10 | 30-day/Monthly 8, Every 3 months 2 |
| 2026-07-20 | 22 | 19 | 30-day/Monthly 19 |
| 2026-07-27 | 50 | 47 | 30-day/Monthly 32, 45-day 14, Every 3 months 1 |
| 2026-08-03 | 39 | 34 | 45-day 33, 30-day/Monthly 1 |
| 2026-08-10 | 40 | 39 | 30-day/Monthly 39 |
| 2026-08-17 | 40 | 30 | 30-day/Monthly 30 |
| 2026-08-24 | 16 | 15 | 30-day/Monthly 15 |
| 2026-08-31 | 2 | 1 | 45-day 1 |
| 2026-09-07 | 26 | 21 | 30-day/Monthly 11, 45-day 10 |
| 2026-09-14 | 13 | 9 | 30-day/Monthly 9 |
| **Total** | **259** | **225** | |

Weeks of 29 June and 6 July have zero orders. Week of 31 Aug has only 2 first orders (a visible gap in acquisition between 28 Aug and 6 Sept).

### Recurring orders by recurring number

| Recurring # | Orders |
|---|---:|
| #2 | 101 |
| #3 | 5 |
| #4 | 0 |
| #5 | 0 |
| #6+ | 0 |
| **Total recurring** | **106** |

Recurring orders arrive in Subi's daily batch (08:0x UTC, a second batch at 11:45 UTC). Recurring orders by month: Aug 39 orders, Sept (to the 20th) 67 orders.

## 2. Customers with more than one first order

28 of 225 subscribers (12.4%) have 2+ orders tagged `First Subscription Order`, i.e. Subi opened a second subscription contract for them. Only 4 pairs were placed within an hour of each other (likely double checkouts):

| Customer | Orders | Minutes apart | Scents | Note |
|---|---|---:|---|---|
| 8649622945901 | #MC26522, #MC26523 | 2 | Euphoric Bloom / Wildwood Mystique | different scent, both PAID (deliberate second subscription) |
| 8659811565677 | #MC26537, #MC26538 | 2 | Golden Blossom / Euphoric Bloom | different scent, both PAID (deliberate second subscription) |
| 8688917446765 | #MC26633, #MC26634 | 10 | Golden Blossom / Golden Blossom | second order REFUNDED (true duplicate) |
| 8723886112877 | #MC26754, #MC26755 | 27 | Wildwood Mystique, Midnight Sensation / Midnight Sensation, Wildwood Mystique | same scents, both PAID (probable duplicate, not refunded) |

The other 24 multi-first customers placed their second (or third/fourth) first order days or weeks later; these are add-on subscriptions or re-purchases through the funnel (several bought the later "Special Kit" offer in September after subscribing in August). Customer 8673366474861 has four first orders (1 Aug, 1 Aug, 14 Aug, 21 Aug). Customer 8647978811501 is the only one with two separate #2 renewals (two live subscriptions). All conversion metrics below use each customer's earliest first order as the start.

## 3. Per-customer table

Full table (225 rows) is in the appendix at the end of this file and in `customers.csv` in the scratchpad. Columns: start date, plan on first order, diffuser/kit in first order, first-order total, first-order scents, highest recurring number reached, last order date, refund flag.

## 4. Order-2 conversion

| Plan group | Window | Due (denominator) | Reached #2 (numerator) | Share |
|---|---|---:|---:|---:|
| 30-day / Monthly (Monthly, Delivered every 30 days, Every 30 days, Monthly 25% OFF) | start ≤ 2026-08-14 (37 days) | 85 | 59 | **69.4%** |
| 30-day / Monthly, strict 30-day window (start ≤ 2026-08-21) | 30 days | 125 | 82 | 65.6% (some still inside grace) |
| 30-day / Monthly, 44-day window (start ≤ 2026-08-07) | 44 days | 59 | 41 | 69.5% |
| 45-day (Delivered every 45 days, Every 45 days) | start ≤ 2026-07-30 (52 days) | 0 | 0 | pending — earliest 45-day start is 1 Aug, first due date under this window is 22 Sept |
| 45-day, strict 45-day window (start ≤ 2026-08-06) | 45 days | 29 | 15 | 51.7% (preliminary; renewals still landing 15–20 Sept) |
| Every 3 months | excluded | 3 customers | 1 has renewed (#MC26515 → #2 on day 65) | — |

Of the 82 30-day customers who did renew, days from first order to #2: min 30, median 31, max 44 (4 renewed after day 37). Of the 15 45-day renewers: min 44, median 45, max 50.

### Where the 26 due-but-not-renewed 30-day customers sit

| Start week | Due | Not renewed | Not-renewed share |
|---|---:|---:|---:|
| 2026-07-13 | 8 | 1 | 12.5% |
| 2026-07-20 | 19 | 9 | 47.4% |
| 2026-07-27 | 32 | 8 | 25.0% |
| 2026-08-03 | 1 | 0 | 0.0% |
| 2026-08-10 | 25 | 8 | 32.0% |

By plan name: Monthly 16, Delivered every 30 days 10. All but one paid $39.95 per scent on the first order. The week of 20 July (the $120-diffuser + $39.95 Monthly offer) is the weakest cohort: 9 of 19 have not renewed.

### Cuts of order-2 conversion (30-day and 45-day customers whose window has elapsed)

| Cut | Due | Reached #2 | Share |
|---|---:|---:|---:|
| First order included the diffuser only | 81 | 57 | 70.4% |
| First order included diffuser + Home Diffuser Kit upsell | 3 | 1 | 33.3% |
| No hardware on first order | 1 | 1 | 100.0% |
| 1 scent bottle on first order | 80 | 55 | 68.8% |
| 2 scent bottles on first order | 2 | 2 | 100.0% |
| 3 scent bottles on first order | 3 | 2 | 66.7% |
| Diffuser bought at $120 / $119.95 | 57 | 40 | 70.2% |
| Diffuser bought at $79.95 | 27 | 18 | 66.7% |
| First scent includes Golden Blossom | 38 | 31 | 81.6% |
| First scent includes Euphoric Bloom | 20 | 11 | 55.0% |
| First scent includes Midnight Sensation | 12 | 10 | 83.3% |
| First scent includes Chilled Citrus | 7 | 4 | 57.1% |
| First scent includes Crisp Citrus Scape | 6 | 3 | 50.0% |
| First scent includes Wildwood Mystique | 4 | 2 | 50.0% |
| First scent includes Honey Nectar | 6 | 4 | 66.7% |

Small denominators on most cuts; treat anything under ~20 as directional only.

## 5. Order-3 and order-4 conversion

| Metric | Window | Due | Reached | Share |
|---|---|---:|---:|---:|
| 30-day/Monthly reached #3 | start ≤ 2026-07-15 (67 days) | 0 | 0 | pending — first 30-day subscriber started 17 July, so this window opens 22 Sept |
| 30-day/Monthly reached #3, relaxed 60-day window | start ≤ 2026-07-22 | 11 | 5 | 45.5% (of all due) |
| 30-day/Monthly reached #3 among those who reached #2, 60-day window | start ≤ 2026-07-22 | 10 | 5 | 50.0% (#2 → #3 step retention, preliminary) |
| 30-day/Monthly reached #4 | start ≤ 2026-06-15 (97 days) | 0 | 0 | not applicable — programme started 1 July |

The five #3 renewals all arrived on day 61–62 after the first order (17–20 Sept), i.e. Subi is renewing on a 30/31-day cadence from the previous renewal, not from the original order date. Five more 30-day customers from the 17–22 July starts have reached #2 but their #3 is due 21–25 Sept.

## 6. Weekly start cohorts

Windows are plan-specific (37 days for 30-day plans, 52 days for 45-day plans; Every-3-months customers excluded). A cohort is *pending* when no member's window has elapsed and *partial* when only some have.

| Start week | Subscribers | Eligible (excl. 3-month) | Due for #2 | Reached #2 | Share #2 | Due for #3 | Reached #3 | Share #3 | Status |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 2026-07-13 | 10 | 8 | 8 | 7 | 87.5% | 0 | 0 | pending | complete |
| 2026-07-20 | 19 | 19 | 19 | 10 | 52.6% | 0 | 0 | pending | complete |
| 2026-07-27 | 47 | 46 | 32 | 24 | 75.0% | 0 | 0 | pending | partial |
| 2026-08-03 | 34 | 34 | 1 | 1 | 100.0% | 0 | 0 | pending | partial |
| 2026-08-10 | 39 | 39 | 25 | 17 | 68.0% | 0 | 0 | pending | partial |
| 2026-08-17 | 30 | 30 | 0 | 0 | pending | 0 | 0 | pending | pending |
| 2026-08-24 | 15 | 15 | 0 | 0 | pending | 0 | 0 | pending | pending |
| 2026-08-31 | 1 | 1 | 0 | 0 | pending | 0 | 0 | pending | pending |
| 2026-09-07 | 21 | 21 | 0 | 0 | pending | 0 | 0 | pending | pending |
| 2026-09-14 | 9 | 9 | 0 | 0 | pending | 0 | 0 | pending | pending |

Notes: the 3 Aug week is almost entirely 45-day plans (33 of 34) and becomes due from 22 Sept; the 10 Aug week is 39 30-day customers of whom 25 are due (17 renewed, 68%); the 17 Aug week (30 customers) starts coming due on 23 Sept. The 7 Sept and 14 Sept weeks are the new "Special Kit" offer with scents priced at $0 on the first order, so their renewal price and behaviour are untested.

## 7. Scent behaviour

| Scent | Bottles on earliest first orders | Share | Bottles on recurring orders | Share |
|---|---:|---:|---:|---:|
| Golden Blossom | 82 | 27.6% | 47 | 33.8% |
| Euphoric Bloom | 61 | 20.5% | 24 | 17.3% |
| Midnight Sensation | 52 | 17.5% | 27 | 19.4% |
| Chilled Citrus | 33 | 11.1% | 14 | 10.1% |
| Crisp Citrus Scape | 28 | 9.4% | 9 | 6.5% |
| Wildwood Mystique | 21 | 7.1% | 10 | 7.2% |
| Honey Nectar | 20 | 6.7% | 8 | 5.8% |
| **Total** | **297** | | **139** | |

(Counts are subscription-plan line quantities; the one-off "Manifestation Scents" upsell bottle, which carries no selling plan, is excluded: it appears on 21 first orders.)

- **Most common scent on renewals: Golden Blossom Harmony – Love** (47 of 139 renewal bottles, 33.8%), ahead of its 27.6% share of first-order bottles. Midnight Sensation over-indexes on renewals (19.4% vs 17.5% of first bottles).
- **Swap proxy:** of 104 recurring orders whose customer has a first order in the data, 21 (20.2%) have a scent set different from the customer's earliest first order, and 20 (19.2%) contain at least one scent that was not on that first order. Using the union of all the customer's first orders as the baseline (fairer for customers with two subscriptions), 20 (19.2%) differ and 13 (12.5%) contain a genuinely new scent. New scents chosen on renewal: Euphoric Bloom 4, Midnight Sensation 4, Wildwood Mystique 3, Golden Blossom 2, Chilled Citrus 2.
- Some of the "differences" are quantity changes rather than swaps (e.g. #MC26914 renewed with 5 bottles vs 2 on the first order; #MC26930 renewed with all 6 scents).

## 8. Revenue

| Metric | Value |
|---|---:|
| First-order revenue (259 orders) | $17,832.36 |
| Average / median first-order value | $68.85 / $49.95 |
| Recurring revenue (106 orders) | $5,872.85 |
| Average recurring order value | $55.40 |
| Recurring orders with more than one bottle | 22/106 = 20.8% |
| Total Subi-tagged revenue | $23,705.21 |

| Calendar month | First orders | First-order revenue | Recurring orders | Recurring revenue |
|---|---:|---:|---:|---:|
| 2026-07 | 65 | $3,159.25 | 0 | $0.00 |
| 2026-08 | 154 | $10,329.85 | 39 | $1,687.90 |
| 2026-09 (to 20th) | 40 | $4,343.26 | 67 | $4,184.95 |

First-order totals understate what customers paid for hardware in some eras: many July orders show the diffuser line at $120 but an order total of $39.95, meaning the diffuser was discounted to $0 (free-with-subscription offer). Two first orders are $0.00 in total (#MC26554, a Monthly (25% OFF) comp on 27 July; #MC26944 on 17 Sept). First-order revenue by plan group: 30-day/Monthly 164 customers $10,077.85 (avg $61.45), 45-day 58 customers $4,331.47 (avg $74.68), Every 3 months 3 customers $293.02.

## 9. Plan mix and price points

### Selling plan on the first order (per subscriber, earliest first order)

| Selling plan name | Subscribers | Share | Group | Observed period |
|---|---:|---:|---|---|
| Delivered every 30 days ✨ | 88 | 39.1% | 30-day/Monthly | 2026-07-31 → 2026-08-27 |
| Monthly | 54 | 24.0% | 30-day/Monthly | 2026-07-17 → 2026-07-30 |
| Delivered every 45 days ❤️ | 47 | 20.9% | 45-day | 2026-08-01 → 2026-08-09 |
| Every 30 days | 20 | 8.9% | 30-day/Monthly | 2026-09-09 → 2026-09-20 |
| Every 45 days | 11 | 4.9% | 45-day | 2026-09-06 → 2026-09-09 |
| Every 3 months | 3 | 1.3% | Every 3 months | 2026-07-15 → 2026-08-02 |
| Monthly (25% OFF) | 2 | 0.9% | 30-day/Monthly | 2026-07-27 → 2026-08-21 |
| **Total** | **225** | | 30-day/Monthly 164 (72.9%), 45-day 58 (25.8%), Every 3 months 3 (1.3%) | |

Six plan names are in use for what are really two cadences. `Monthly` was the launch plan (17–30 July), `Delivered every 30 days ✨` and `Delivered every 45 days ❤️` ran 31 July – 31 Aug (45-day mainly 1–9 Aug), and `Every 30 days` / `Every 45 days` are the September "Special Kit" plans. One renewal (#MC26959) carries a seventh name, `Subscription, Delivery every month`, at $49.95. Two first orders mix plans on one order (#MC26591: 45-day + 30-day lines).

### Price points on recurring orders

| Unit price on recurring line | Lines | Orders containing it |
|---|---:|---:|
| $39.95 | 121 | 90 |
| $49.95 | 17 | 16 |
| $29.95 | 1 | 1 |

Recurring order totals: 89 orders are all-$39.95 lines, 15 all-$49.95, 1 at $29.95 (the Monthly 25% OFF comp), 1 mixed $39.95/$49.95 (#MC26973). The $49.95 renewals are the 45-day customers who paid $49.95 on their first order (13 of 17 45-day renewal lines; 4 45-day renewal lines came through at $39.95) plus two `Monthly` renewals created in the same 28 Aug batch (#MC26782 and #MC26784) that came through at $49.95 instead of $39.95 and with each other's scent (customer 8665028886637 subscribed to Euphoric Bloom and was renewed with Golden Blossom; 8664273256557 the reverse), which looks like a crossed renewal in Subi worth checking. One further mixed renewal (#MC26973) has one line at $49.95 carried over from a 45-day contract. No recurring order carries shipping or protection add-ons.

### Hardware price points on first orders

| Line | Unit price | Lines |
|---|---:|---:|
| Maison Croyez — Home Scent Diffuser | $79.95 | 99 |
| Maison Croyez — Home Scent Diffuser | $89.95 | 57 |
| Maison Croyez — Home Scent Diffuser | $120.00 | 44 |
| Maison Croyez Diffuser — Special Kits | $89.95 | 28 |
| Maison Croyez — Home Scent Diffuser | $119.95 | 20 |
| Maison Croyez — Home Diffuser Kits | $89.95 | 11 |
| Maison Croyez Diffuser — Special Kits | $129.95 | 8 |
| Maison Croyez — Home Diffuser Kits | $289.95 | 2 |
| Maison Croyez — Home Diffuser Kit | $79.95 | 2 |
| Maison Croyez — Home Diffuser Kits | $249.95 | 1 |
| Maison Croyez — Home Diffuser Kits | $109.95 | 1 |

## 10. Refunded subscription orders

| Order | Date | Type | Status | Total |
|---|---|---|---|---:|
| #MC26634 | 2026-08-08 | First Subscription Order | REFUNDED | $49.95 |

Exactly one refunded order, and it is a first order: #MC26634 (customer 8688917446765) was placed 10 minutes after #MC26633 with the same scent and refunded as a duplicate. **No recurring order is REFUNDED or PARTIALLY_REFUNDED**, so refund-driven churn is not visible in this data (a refund processed as a chargeback or in Subi without touching the order's financial status would not show here).

## Tag patterns and data oddities

- Tags seen: `Subi Subscription` (365), `First Subscription Order` (259), `Recurring Order #2` (101), `Recurring Order #3` (5), `OCU Zipify Post-Purchase Upsell Bought` (30), `OCU Zipify TY Upsell Bought` (10). No order has both a first and a recurring tag, and none lacks both. No cancellation, failed-payment, paused or "Subi Retry" style tags exist.
- The OCU Zipify tags mark the post-purchase / thank-you upsells (Home Diffuser Kits at $89.95–$289.95, the "Manifestation Scents" bottle, the $4.95 Priority & Full Protection Pass). 14 subscribers took the kit upsell on their first order.
- Two customers have a #2 renewal but no first order in the window: 8702791614573 (#MC26911, 15 Sept) and 8671541887085 (#MC26909, 15 Sept). Their first orders were either not tagged `First Subscription Order` / `Subi Subscription` or predate 1 July; they are excluded from cohort denominators.
- Renewal batches: recurring orders are created at ~08:05–08:17 UTC daily with a second batch at 11:45 UTC; orders inside a batch share a timestamp and are not always sequential by order number.
- Since 6 Sept the first order is a "Maison Croyez Diffuser — Special Kits" line at $89.95 or $129.95 with 2–3 scent lines at $0.00 on `Every 45 days` / `Every 30 days` plans (29 subscribers). What Subi will charge on their first renewal is not visible in this data; this cohort's economics should be checked when the first renewals land (~6–21 Oct for 30-day, ~21 Oct onward for 45-day). Two 20-Sept orders (#MC26966, #MC26968) use a new `Home Diffuser Kit` line at $79.95 with a $49.95 scent on `Every 30 days`.
- Several subscribers re-entered the funnel and bought the September Special Kit as a *second* first order (e.g. 8661599060077, 8700238495853, 8673766047853, 8689936924781), which inflates first-order counts relative to unique subscribers.

## Appendix — per-customer table

Sorted by start date. `Max #` is the highest recurring number reached (1 = no renewal yet). `Days` is days since start as of 2026-09-20. `Due` marks whether the plan-specific order-2 window (37 / 52 days) has elapsed.

| Customer id | Start | Start order | First orders | Plan (first order) | Hardware in first order | First total | First scents | Max # | Recurring orders | Last order | Refund | Days | Due |
|---|---|---|---:|---|---|---:|---|---:|---:|---|---|---:|---|
| 8643066757229 | 2026-07-15 | #MC26514 | 1 | Every 3 months | Diffuser | $119.85 | Honey Nectar, Golden Blossom | 1 | 0 | 2026-07-15 |  | 67 | n/a |
| 7441057153133 | 2026-07-16 | #MC26515 | 2 | Every 3 months | Diffuser | $119.85 | Golden Blossom, Midnight Sensation, Euphoric Bloom | 2 | 1 | 2026-09-19 |  | 66 | n/a |
| 8646957891693 | 2026-07-17 | #MC26516 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 3 | 2 | 2026-09-17 |  | 65 | yes |
| 8647691599981 | 2026-07-18 | #MC26517 | 2 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-18 |  | 64 | yes |
| 8647821688941 | 2026-07-18 | #MC26518 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-18 |  | 64 | yes |
| 8647978811501 | 2026-07-18 | #MC26519 | 2 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 2 | 2026-08-31 |  | 64 | yes |
| 8648078131309 | 2026-07-18 | #MC26520 | 1 | Monthly | Diffuser | $39.95 | Chilled Citrus | 3 | 2 | 2026-09-18 |  | 64 | yes |
| 8648959819885 | 2026-07-19 | #MC26521 | 1 | Monthly | Diffuser | $39.95 | Chilled Citrus | 1 | 0 | 2026-07-19 |  | 63 | yes |
| 8649622945901 | 2026-07-19 | #MC26522 | 2 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 3 | 2 | 2026-09-19 |  | 63 | yes |
| 8649867067501 | 2026-07-19 | #MC26524 | 1 | Monthly | Diffuser | $39.95 | Honey Nectar | 3 | 2 | 2026-09-19 |  | 63 | yes |
| 8649990242413 | 2026-07-20 | #MC26525 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-19 |  | 62 | yes |
| 8652150997101 | 2026-07-21 | #MC26526 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 3 | 2 | 2026-09-20 |  | 61 | yes |
| 8652279939181 | 2026-07-21 | #MC26527 | 1 | Monthly | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-08-21 |  | 61 | yes |
| 8656023978093 | 2026-07-23 | #MC26528 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-05 |  | 59 | yes |
| 8656083976301 | 2026-07-23 | #MC26529 | 2 | Monthly | Diffuser | $39.95 | Honey Nectar | 1 | 0 | 2026-07-30 |  | 59 | yes |
| 8656554328173 | 2026-07-23 | #MC26530 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-07-23 |  | 59 | yes |
| 8657850105965 | 2026-07-24 | #MC26531 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-23 |  | 58 | yes |
| 8658170642541 | 2026-07-24 | #MC26533 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-07-24 |  | 58 | yes |
| 8658426101869 | 2026-07-24 | #MC26534 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-24 |  | 58 | yes |
| 8659662078061 | 2026-07-25 | #MC26535 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-08-25 |  | 57 | yes |
| 8659759267949 | 2026-07-25 | #MC26536 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-07 |  | 57 | yes |
| 8659811565677 | 2026-07-25 | #MC26537 | 2 | Monthly | Diffuser | $39.95 | Golden Blossom | 1 | 0 | 2026-07-25 |  | 57 | yes |
| 8659920224365 | 2026-07-25 | #MC26539 | 1 | Monthly | Diffuser | $39.95 | Wildwood Mystique | 1 | 0 | 2026-07-25 |  | 57 | yes |
| 8658593644653 | 2026-07-25 | #MC26540 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-07-25 |  | 57 | yes |
| 8660178731117 | 2026-07-25 | #MC26541 | 1 | Monthly | Diffuser | $39.95 | Chilled Citrus | 2 | 1 | 2026-08-25 |  | 57 | yes |
| 8660899004525 | 2026-07-26 | #MC26542 | 1 | Monthly | Diffuser | $39.95 | Midnight Sensation | 1 | 0 | 2026-07-26 |  | 56 | yes |
| 8661130346605 | 2026-07-26 | #MC26544 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-07-26 |  | 56 | yes |
| 8661142536301 | 2026-07-26 | #MC26545 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-26 |  | 56 | yes |
| 8661225963629 | 2026-07-26 | #MC26546 | 1 | Monthly | Diffuser | $39.95 | Chilled Citrus | 1 | 0 | 2026-07-26 |  | 56 | yes |
| 8662539894893 | 2026-07-27 | #MC26547 | 1 | Monthly | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-08-27 |  | 55 | yes |
| 8662547660909 | 2026-07-27 | #MC26548 | 2 | Monthly | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-08-27 |  | 55 | yes |
| 8662908272749 | 2026-07-27 | #MC26549 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-27 |  | 55 | yes |
| 8663014506605 | 2026-07-27 | #MC26550 | 1 | Monthly | Diffuser | $39.95 | Chilled Citrus | 1 | 0 | 2026-07-27 |  | 55 | yes |
| 8663045079149 | 2026-07-27 | #MC26551 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-27 |  | 55 | yes |
| 8662708125805 | 2026-07-27 | #MC26552 | 1 | Monthly | Diffuser | $39.95 | Crisp Citrus Scape | 2 | 1 | 2026-08-28 |  | 55 | yes |
| 8661567144045 | 2026-07-27 | #MC26553 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-08-27 |  | 55 | yes |
| 8660530692205 | 2026-07-27 | #MC26554 | 1 | Monthly (25% OFF) | - | $0.00 | Euphoric Bloom | 2 | 1 | 2026-08-27 |  | 55 | yes |
| 8663476633709 | 2026-07-27 | #MC26555 | 1 | Monthly | Diffuser | $39.95 | Crisp Citrus Scape | 1 | 0 | 2026-07-27 |  | 55 | yes |
| 8663479746669 | 2026-07-27 | #MC26556 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-08-27 |  | 55 | yes |
| 8663531913325 | 2026-07-27 | #MC26557 | 1 | Monthly | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-08-27 |  | 55 | yes |
| 8663944200301 | 2026-07-28 | #MC26558 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-28 |  | 54 | yes |
| 8664273256557 | 2026-07-28 | #MC26559 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-28 |  | 54 | yes |
| 8649499574381 | 2026-07-28 | #MC26560 | 1 | Monthly | Diffuser,Kit | $84.93 | Golden Blossom | 2 | 1 | 2026-08-28 |  | 54 | yes |
| 8664852332653 | 2026-07-28 | #MC26561 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 1 | 0 | 2026-07-28 |  | 54 | yes |
| 8665028886637 | 2026-07-28 | #MC26562 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-08-28 |  | 54 | yes |
| 8665098354797 | 2026-07-28 | #MC26563 | 1 | Monthly | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-08-28 |  | 54 | yes |
| 8665593839725 | 2026-07-29 | #MC26564 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-28 |  | 53 | yes |
| 8665603145837 | 2026-07-29 | #MC26565 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-28 |  | 53 | yes |
| 8666421657709 | 2026-07-29 | #MC26566 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-11 |  | 53 | yes |
| 8667008794733 | 2026-07-29 | #MC26567 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 1 | 0 | 2026-07-29 |  | 53 | yes |
| 8662723788909 | 2026-07-29 | #MC26568 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-08-29 |  | 53 | yes |
| 8669235871853 | 2026-07-30 | #MC26569 | 1 | Monthly | Diffuser | $39.95 | Honey Nectar | 2 | 1 | 2026-08-30 |  | 52 | yes |
| 8670287331437 | 2026-07-30 | #MC26571 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 1 | 0 | 2026-07-30 |  | 52 | yes |
| 8670619304045 | 2026-07-30 | #MC26572 | 1 | Monthly | Diffuser | $119.85 | Golden Blossom, Euphoric Bloom, Midnight Sensation | 2 | 1 | 2026-08-30 |  | 52 | yes |
| 8670639489133 | 2026-07-30 | #MC26573 | 1 | Monthly | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-07-30 |  | 52 | yes |
| 8670885740653 | 2026-07-30 | #MC26574 | 1 | Monthly | Diffuser | $39.95 | Wildwood Mystique | 2 | 1 | 2026-08-30 |  | 52 | yes |
| 8670905303149 | 2026-07-30 | #MC26575 | 1 | Monthly | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-30 |  | 52 | yes |
| 8671477825645 | 2026-07-31 | #MC26576 | 1 | Delivered every 30 days ✨ | Diffuser | $44.90 | Golden Blossom | 2 | 1 | 2026-08-30 |  | 51 | yes |
| 8672673890413 | 2026-07-31 | #MC26577 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-07-31 |  | 51 | yes |
| 8669270638701 | 2026-07-31 | #MC26578 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-08-31 |  | 51 | yes |
| 8673058357357 | 2026-08-01 | #MC26579 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Midnight Sensation | 1 | 0 | 2026-08-01 |  | 50 | no |
| 8673366474861 | 2026-08-01 | #MC26580 | 4 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Midnight Sensation | 1 | 0 | 2026-08-21 |  | 50 | no |
| 8673672724589 | 2026-08-01 | #MC26581 | 1 | Delivered every 45 days ❤️ | Diffuser,Kit | $252.92 | Golden Blossom | 1 | 0 | 2026-08-01 |  | 50 | no |
| 8673766047853 | 2026-08-01 | #MC26583 | 2 | Delivered every 45 days ❤️ | Diffuser,Kit | $94.93 | Euphoric Bloom | 1 | 0 | 2026-09-07 |  | 50 | no |
| 8673773256813 | 2026-08-01 | #MC26584 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Midnight Sensation | 2 | 1 | 2026-09-15 |  | 50 | no |
| 8673963868269 | 2026-08-01 | #MC26585 | 2 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 2 | 1 | 2026-09-20 |  | 50 | no |
| 8674158903405 | 2026-08-01 | #MC26588 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-01 |  | 50 | no |
| 8672830193773 | 2026-08-02 | #MC26589 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-02 |  | 49 | no |
| 8674866331757 | 2026-08-02 | #MC26590 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Chilled Citrus | 1 | 0 | 2026-08-02 |  | 49 | no |
| 8667270905965 | 2026-08-02 | #MC26591 | 1 | Delivered every 45 days ❤️ | Diffuser | $99.90 | Golden Blossom, Crisp Citrus Scape | 1 | 0 | 2026-08-02 |  | 49 | no |
| 8662660284525 | 2026-08-02 | #MC26592 | 2 | Delivered every 30 days ✨ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-09 |  | 49 | yes |
| 8675508256877 | 2026-08-02 | #MC26593 | 1 | Delivered every 45 days ❤️ | Diffuser,Kit | $112.92 | Chilled Citrus | 2 | 1 | 2026-09-17 |  | 49 | no |
| 8675621273709 | 2026-08-02 | #MC26594 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 2 | 1 | 2026-09-16 |  | 49 | no |
| 8673775943789 | 2026-08-02 | #MC26596 | 3 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-23 |  | 49 | no |
| 8667358003309 | 2026-08-02 | #MC26597 | 1 | Every 3 months | Diffuser | $53.32 | Euphoric Bloom | 1 | 0 | 2026-08-02 |  | 49 | n/a |
| 8676246945901 | 2026-08-02 | #MC26598 | 2 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Chilled Citrus | 2 | 1 | 2026-09-16 |  | 49 | no |
| 8676368875629 | 2026-08-03 | #MC26599 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Honey Nectar | 1 | 0 | 2026-08-03 |  | 48 | no |
| 8675933880429 | 2026-08-03 | #MC26600 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 2 | 1 | 2026-09-16 |  | 48 | no |
| 8677308563565 | 2026-08-03 | #MC26601 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Midnight Sensation | 2 | 1 | 2026-09-17 |  | 48 | no |
| 8677460410477 | 2026-08-03 | #MC26602 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-03 |  | 48 | no |
| 8679820034157 | 2026-08-04 | #MC26604 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 2 | 1 | 2026-09-18 |  | 47 | no |
| 8680002453613 | 2026-08-04 | #MC26605 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Crisp Citrus Scape | 1 | 0 | 2026-08-04 |  | 47 | no |
| 8680048853101 | 2026-08-04 | #MC26606 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Chilled Citrus | 2 | 1 | 2026-09-18 |  | 47 | no |
| 8680177008749 | 2026-08-04 | #MC26607 | 1 | Delivered every 45 days ❤️ | Diffuser,Kit | $112.92 | Golden Blossom | 2 | 1 | 2026-09-18 |  | 47 | no |
| 8662626369645 | 2026-08-05 | #MC26608 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Chilled Citrus | 2 | 1 | 2026-09-19 |  | 46 | no |
| 8679595901037 | 2026-08-05 | #MC26609 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Wildwood Mystique | 1 | 0 | 2026-08-05 |  | 46 | no |
| 7512503386221 | 2026-08-05 | #MC26614 | 2 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Midnight Sensation | 2 | 1 | 2026-09-19 |  | 46 | no |
| 8683859050605 | 2026-08-06 | #MC26615 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 2 | 1 | 2026-09-20 |  | 45 | no |
| 8684466864237 | 2026-08-06 | #MC26616 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 2 | 1 | 2026-09-20 |  | 45 | no |
| 8684519751789 | 2026-08-06 | #MC26617 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Chilled Citrus | 2 | 1 | 2026-09-20 |  | 45 | no |
| 7441764581485 | 2026-08-06 | #MC26618 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Euphoric Bloom | 1 | 0 | 2026-08-06 |  | 45 | no |
| 8688958308461 | 2026-08-07 | #MC26619 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Crisp Citrus Scape | 1 | 0 | 2026-08-07 |  | 44 | no |
| 8689094066285 | 2026-08-07 | #MC26620 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-07 |  | 44 | no |
| 8665695453293 | 2026-08-07 | #MC26621 | 1 | Delivered every 45 days ❤️ | Diffuser,Kit | $94.93 | Crisp Citrus Scape | 1 | 0 | 2026-08-07 |  | 44 | no |
| 8689457102957 | 2026-08-07 | #MC26622 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Chilled Citrus | 1 | 0 | 2026-08-07 |  | 44 | no |
| 8689453432941 | 2026-08-07 | #MC26623 | 2 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-20 |  | 44 | no |
| 8689794351213 | 2026-08-07 | #MC26624 | 1 | Delivered every 45 days ❤️ | Diffuser | $54.90 | Golden Blossom | 1 | 0 | 2026-08-07 |  | 44 | no |
| 8689761812589 | 2026-08-07 | #MC26625 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-07 |  | 44 | no |
| 8689917689965 | 2026-08-07 | #MC26626 | 1 | Delivered every 45 days ❤️ | Diffuser,Kit | $112.92 | Midnight Sensation | 1 | 0 | 2026-08-07 |  | 44 | no |
| 8689936924781 | 2026-08-07 | #MC26627 | 2 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Crisp Citrus Scape | 1 | 0 | 2026-09-17 |  | 44 | no |
| 8689961730157 | 2026-08-07 | #MC26628 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-07 |  | 44 | no |
| 8690138316909 | 2026-08-08 | #MC26630 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Chilled Citrus | 1 | 0 | 2026-08-08 |  | 43 | no |
| 8690191958125 | 2026-08-08 | #MC26631 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Euphoric Bloom | 1 | 0 | 2026-08-08 |  | 43 | no |
| 8688917446765 | 2026-08-08 | #MC26633 | 2 | Delivered every 45 days ❤️ | Diffuser,Kit | $142.87 | Golden Blossom | 1 | 0 | 2026-08-08 | yes | 43 | no |
| 8690962497645 | 2026-08-08 | #MC26635 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Euphoric Bloom | 1 | 0 | 2026-08-08 |  | 43 | no |
| 8673568424045 | 2026-08-08 | #MC26636 | 1 | Delivered every 45 days ❤️ | Diffuser,Kit | $94.93 | Crisp Citrus Scape | 1 | 0 | 2026-08-08 |  | 43 | no |
| 8692119634029 | 2026-08-09 | #MC26640 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Golden Blossom | 1 | 0 | 2026-08-09 |  | 42 | no |
| 8692187627629 | 2026-08-09 | #MC26641 | 1 | Delivered every 45 days ❤️ | Diffuser,Kit | $94.93 | Euphoric Bloom | 1 | 0 | 2026-08-09 |  | 42 | no |
| 8692197425261 | 2026-08-09 | #MC26642 | 1 | Delivered every 45 days ❤️ | Diffuser | $49.95 | Chilled Citrus | 1 | 0 | 2026-08-09 |  | 42 | no |
| 8692975304813 | 2026-08-09 | #MC26644 | 2 | Delivered every 30 days ✨ | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-09-09 |  | 42 | yes |
| 8672950714477 | 2026-08-10 | #MC26645 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-09-09 |  | 41 | yes |
| 8693238071405 | 2026-08-10 | #MC26646 | 1 | Delivered every 30 days ✨ | Diffuser,Kit | $102.92 | Crisp Citrus Scape | 1 | 0 | 2026-08-10 |  | 41 | yes |
| 8693383528557 | 2026-08-10 | #MC26647 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Crisp Citrus Scape | 1 | 0 | 2026-08-10 |  | 41 | yes |
| 8693520040045 | 2026-08-10 | #MC26648 | 2 | Delivered every 30 days ✨ | Diffuser | $39.95 | Wildwood Mystique | 1 | 0 | 2026-09-17 |  | 41 | yes |
| 8693573615725 | 2026-08-10 | #MC26649 | 1 | Delivered every 30 days ✨ | Diffuser,Kit | $89.88 | Golden Blossom | 1 | 0 | 2026-08-10 |  | 41 | yes |
| 8693685125229 | 2026-08-10 | #MC26650 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-10 |  | 41 | yes |
| 8659488014445 | 2026-08-10 | #MC26651 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Midnight Sensation, Euphoric Bloom | 2 | 1 | 2026-09-10 |  | 41 | yes |
| 8693861023853 | 2026-08-10 | #MC26652 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-09-10 |  | 41 | yes |
| 8693926363245 | 2026-08-10 | #MC26653 | 2 | Delivered every 30 days ✨ | Diffuser | $39.95 | Chilled Citrus | 2 | 1 | 2026-09-10 |  | 41 | yes |
| 8694001762413 | 2026-08-10 | #MC26654 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-10 |  | 41 | yes |
| 8695170072685 | 2026-08-11 | #MC26655 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-10 |  | 40 | yes |
| 8695853613165 | 2026-08-11 | #MC26656 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 1 | 0 | 2026-08-11 |  | 40 | yes |
| 8695372578925 | 2026-08-11 | #MC26657 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-11 |  | 40 | yes |
| 8698123190381 | 2026-08-12 | #MC26658 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-12 |  | 39 | yes |
| 8661599060077 | 2026-08-12 | #MC26659 | 3 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-09-07 |  | 39 | yes |
| 8699345666157 | 2026-08-13 | #MC26660 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Chilled Citrus | 2 | 1 | 2026-09-12 |  | 38 | yes |
| 8700238495853 | 2026-08-13 | #MC26661 | 3 | Delivered every 30 days ✨ | Diffuser | $119.85 | Crisp Citrus Scape, Golden Blossom, Wildwood Mystique | 2 | 1 | 2026-09-16 |  | 38 | yes |
| 8700424323181 | 2026-08-13 | #MC26662 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Honey Nectar | 2 | 1 | 2026-09-13 |  | 38 | yes |
| 8700433694829 | 2026-08-13 | #MC26663 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Honey Nectar, Golden Blossom | 2 | 1 | 2026-09-13 |  | 38 | yes |
| 8700486647917 | 2026-08-13 | #MC26665 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-13 |  | 38 | yes |
| 8701737271405 | 2026-08-14 | #MC26666 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-08-14 |  | 37 | yes |
| 8701861757037 | 2026-08-14 | #MC26667 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-09-14 |  | 37 | yes |
| 8692549451885 | 2026-08-14 | #MC26668 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-09-14 |  | 37 | yes |
| 8700476358765 | 2026-08-14 | #MC26669 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Crisp Citrus Scape | 2 | 1 | 2026-09-14 |  | 37 | yes |
| 8697382666349 | 2026-08-14 | #MC26672 | 1 | Delivered every 30 days ✨ | Diffuser | $124.80 | Midnight Sensation, Honey Nectar, Euphoric Bloom | 1 | 0 | 2026-08-14 |  | 37 | yes |
| 8703367708781 | 2026-08-15 | #MC26677 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-15 |  | 36 | no |
| 8703465128045 | 2026-08-15 | #MC26679 | 3 | Delivered every 30 days ✨ | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-09-15 |  | 36 | no |
| 8704069140589 | 2026-08-15 | #MC26680 | 1 | Delivered every 30 days ✨ | Diffuser | $119.85 | Midnight Sensation, Crisp Citrus Scape, Honey Nectar | 2 | 1 | 2026-09-15 |  | 36 | no |
| 8704161972333 | 2026-08-15 | #MC26681 | 2 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 1 | 0 | 2026-09-12 |  | 36 | no |
| 8673688879213 | 2026-08-15 | #MC26682 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-09-15 |  | 36 | no |
| 8704498434157 | 2026-08-16 | #MC26683 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Golden Blossom, Midnight Sensation | 2 | 1 | 2026-09-15 |  | 35 | no |
| 8704860258413 | 2026-08-16 | #MC26684 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-08-16 |  | 35 | no |
| 8704979665005 | 2026-08-16 | #MC26685 | 1 | Delivered every 30 days ✨ | Diffuser,Kit | $204.88 | Crisp Citrus Scape | 2 | 1 | 2026-09-16 |  | 35 | no |
| 8703029379181 | 2026-08-16 | #MC26686 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-16 |  | 35 | no |
| 8705095204973 | 2026-08-16 | #MC26687 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Midnight Sensation | 2 | 1 | 2026-09-19 |  | 35 | no |
| 8705147404397 | 2026-08-16 | #MC26688 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Euphoric Bloom, Midnight Sensation | 2 | 1 | 2026-09-16 |  | 35 | no |
| 8705370292333 | 2026-08-16 | #MC26689 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-16 |  | 35 | no |
| 8705447952493 | 2026-08-16 | #MC26690 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Crisp Citrus Scape | 2 | 1 | 2026-09-16 |  | 35 | no |
| 8705556709485 | 2026-08-16 | #MC26691 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Euphoric Bloom | 1 | 0 | 2026-08-16 |  | 35 | no |
| 8706685796461 | 2026-08-17 | #MC26694 | 1 | Delivered every 30 days ✨ | Diffuser | $119.85 | Crisp Citrus Scape, Midnight Sensation, Golden Blossom | 2 | 1 | 2026-09-17 |  | 34 | no |
| 7405735903341 | 2026-08-17 | #MC26695 | 1 | Delivered every 30 days ✨ | Diffuser | $119.85 | Midnight Sensation, Chilled Citrus | 2 | 1 | 2026-09-17 |  | 34 | no |
| 8703926698093 | 2026-08-17 | #MC26698 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Midnight Sensation, Euphoric Bloom | 1 | 0 | 2026-08-17 |  | 34 | no |
| 8707759112301 | 2026-08-17 | #MC26699 | 1 | Delivered every 30 days ✨ | Diffuser | $119.85 | Midnight Sensation, Honey Nectar, Chilled Citrus | 2 | 1 | 2026-09-17 |  | 34 | no |
| 8707818750061 | 2026-08-17 | #MC26700 | 1 | Delivered every 30 days ✨ | Diffuser | $124.80 | Euphoric Bloom, Wildwood Mystique, Midnight Sensation | 2 | 1 | 2026-09-20 |  | 34 | no |
| 8707828973677 | 2026-08-17 | #MC26701 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-17 |  | 34 | no |
| 8708855267437 | 2026-08-18 | #MC26706 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Crisp Citrus Scape | 1 | 0 | 2026-08-18 |  | 33 | no |
| 8709110005869 | 2026-08-18 | #MC26707 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-09-18 |  | 33 | no |
| 8709197135981 | 2026-08-18 | #MC26708 | 1 | Delivered every 30 days ✨ | Diffuser | $119.85 | Crisp Citrus Scape, Euphoric Bloom, Midnight Sensation | 2 | 1 | 2026-09-18 |  | 33 | no |
| 8709060558957 | 2026-08-19 | #MC26712 | 1 | Delivered every 30 days ✨ | Diffuser,Kit | $134.88 | Midnight Sensation | 2 | 1 | 2026-09-19 |  | 32 | no |
| 8711114850413 | 2026-08-19 | #MC26713 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-08-19 |  | 32 | no |
| 8711649591405 | 2026-08-19 | #MC26714 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 1 | 0 | 2026-08-19 |  | 32 | no |
| 8661161279597 | 2026-08-20 | #MC26715 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Midnight Sensation | 1 | 0 | 2026-08-20 |  | 31 | no |
| 8711785185389 | 2026-08-20 | #MC26716 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 2 | 1 | 2026-09-19 |  | 31 | no |
| 8676387684461 | 2026-08-20 | #MC26717 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-08-20 |  | 31 | no |
| 8712332345453 | 2026-08-20 | #MC26719 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-09-20 |  | 31 | no |
| 8712401092717 | 2026-08-20 | #MC26720 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Chilled Citrus, Honey Nectar | 1 | 0 | 2026-08-20 |  | 31 | no |
| 8695603888237 | 2026-08-20 | #MC26721 | 1 | Delivered every 30 days ✨ | - | $43.85 | Euphoric Bloom | 1 | 0 | 2026-08-20 |  | 31 | no |
| 8712495628397 | 2026-08-20 | #MC26722 | 1 | Delivered every 30 days ✨ | Diffuser | $59.90 | Euphoric Bloom | 2 | 1 | 2026-09-20 |  | 31 | no |
| 8705147306093 | 2026-08-21 | #MC26731 | 1 | Monthly (25% OFF) | Diffuser | $39.95 | Midnight Sensation | 1 | 0 | 2026-08-21 |  | 30 | no |
| 8713719709805 | 2026-08-21 | #MC26732 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Crisp Citrus Scape, Honey Nectar | 1 | 0 | 2026-08-21 |  | 30 | no |
| 7592652472429 | 2026-08-21 | #MC26733 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 2 | 1 | 2026-09-20 |  | 30 | no |
| 8713833414765 | 2026-08-21 | #MC26734 | 1 | Delivered every 30 days ✨ | Diffuser | $124.80 | Euphoric Bloom, Honey Nectar, Crisp Citrus Scape | 1 | 0 | 2026-08-21 |  | 30 | no |
| 8714213097581 | 2026-08-21 | #MC26736 | 1 | Delivered every 30 days ✨ | Diffuser | $119.85 | Midnight Sensation | 1 | 0 | 2026-08-21 |  | 30 | no |
| 8714355474541 | 2026-08-21 | #MC26737 | 1 | Delivered every 30 days ✨ | Diffuser | $44.90 | Crisp Citrus Scape | 1 | 0 | 2026-08-21 |  | 30 | no |
| 8700137635949 | 2026-08-21 | #MC26738 | 1 | Delivered every 30 days ✨ | Diffuser | $44.90 | Euphoric Bloom | 1 | 0 | 2026-08-21 |  | 30 | no |
| 8715805950061 | 2026-08-22 | #MC26739 | 1 | Delivered every 30 days ✨ | Diffuser | $59.90 | Wildwood Mystique | 1 | 0 | 2026-08-22 |  | 29 | no |
| 8717807091821 | 2026-08-23 | #MC26742 | 1 | Delivered every 30 days ✨ | Diffuser | $59.90 | Golden Blossom | 1 | 0 | 2026-08-23 |  | 28 | no |
| 8717832028269 | 2026-08-23 | #MC26743 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Wildwood Mystique | 1 | 0 | 2026-08-23 |  | 28 | no |
| 8717983350893 | 2026-08-23 | #MC26744 | 1 | Delivered every 30 days ✨ | Diffuser | $99.85 | Midnight Sensation, Chilled Citrus | 1 | 0 | 2026-08-23 |  | 28 | no |
| 8718891516013 | 2026-08-24 | #MC26746 | 1 | Delivered every 30 days ✨ | Diffuser | $99.85 | Wildwood Mystique, Euphoric Bloom | 1 | 0 | 2026-08-24 |  | 27 | no |
| 8721568071789 | 2026-08-24 | #MC26748 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Honey Nectar, Crisp Citrus Scape | 1 | 0 | 2026-08-24 |  | 27 | no |
| 8722024398957 | 2026-08-24 | #MC26749 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Golden Blossom | 1 | 0 | 2026-08-24 |  | 27 | no |
| 8722596659309 | 2026-08-24 | #MC26750 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Honey Nectar, Midnight Sensation | 1 | 0 | 2026-08-24 |  | 27 | no |
| 8723575734381 | 2026-08-25 | #MC26752 | 1 | Delivered every 30 days ✨ | Diffuser | $99.85 | Chilled Citrus, Golden Blossom | 1 | 0 | 2026-08-25 |  | 26 | no |
| 8723833847917 | 2026-08-25 | #MC26753 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Euphoric Bloom, Wildwood Mystique | 1 | 0 | 2026-08-25 |  | 26 | no |
| 8723886112877 | 2026-08-25 | #MC26754 | 2 | Delivered every 30 days ✨ | Diffuser | $171.35 | Wildwood Mystique, Midnight Sensation | 1 | 0 | 2026-08-25 |  | 26 | no |
| 8680716206189 | 2026-08-25 | #MC26758 | 2 | Delivered every 30 days ✨ | Diffuser | $79.90 | Midnight Sensation | 1 | 0 | 2026-09-17 |  | 26 | no |
| 8725109801069 | 2026-08-25 | #MC26759 | 1 | Delivered every 30 days ✨ | Diffuser | $79.90 | Euphoric Bloom, Midnight Sensation | 1 | 0 | 2026-08-25 |  | 26 | no |
| 8709024514157 | 2026-08-25 | #MC26760 | 2 | Delivered every 30 days ✨ | Diffuser | $59.90 | Euphoric Bloom | 1 | 0 | 2026-09-11 |  | 26 | no |
| 8726073606253 | 2026-08-26 | #MC26763 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Chilled Citrus | 1 | 0 | 2026-08-26 |  | 25 | no |
| 8718530281581 | 2026-08-26 | #MC26765 | 1 | Delivered every 30 days ✨ | Diffuser | $59.90 | Euphoric Bloom | 1 | 0 | 2026-08-26 |  | 25 | no |
| 8727242408045 | 2026-08-27 | #MC26767 | 1 | Delivered every 30 days ✨ | Diffuser | $104.85 | Golden Blossom, Honey Nectar | 1 | 0 | 2026-08-27 |  | 24 | no |
| 8727183917165 | 2026-08-27 | #MC26776 | 1 | Delivered every 30 days ✨ | Diffuser | $39.95 | Euphoric Bloom | 1 | 0 | 2026-08-27 |  | 24 | no |
| 8729267568749 | 2026-08-27 | #MC26778 | 1 | Delivered every 30 days ✨ | Diffuser | $119.85 | Midnight Sensation | 1 | 0 | 2026-08-27 |  | 24 | no |
| 8751026208877 | 2026-09-06 | #MC26827 | 1 | Every 45 days | Diffuser | $89.95 | Chilled Citrus, Golden Blossom | 1 | 0 | 2026-09-06 |  | 14 | no |
| 8767298568301 | 2026-09-07 | #MC26828 | 1 | Every 45 days | Special Kit | $89.95 | Midnight Sensation, Chilled Citrus | 1 | 0 | 2026-09-07 |  | 13 | no |
| 8773132091501 | 2026-09-07 | #MC26831 | 1 | Every 45 days | Special Kit | $124.90 | Midnight Sensation, Wildwood Mystique | 1 | 0 | 2026-09-07 |  | 13 | no |
| 8773672370285 | 2026-09-07 | #MC26833 | 1 | Every 45 days | Special Kit | $129.95 | Honey Nectar, Midnight Sensation, Wildwood Mystique | 1 | 0 | 2026-09-07 |  | 13 | no |
| 8773006590061 | 2026-09-07 | #MC26837 | 1 | Every 45 days | Special Kit | $89.95 | Chilled Citrus, Golden Blossom | 1 | 0 | 2026-09-07 |  | 13 | no |
| 8779302764653 | 2026-09-08 | #MC26839 | 1 | Every 45 days | Special Kit | $89.95 | Golden Blossom, Chilled Citrus | 1 | 0 | 2026-09-08 |  | 12 | no |
| 8781874266221 | 2026-09-08 | #MC26842 | 1 | Every 45 days | Special Kit | $104.90 | Euphoric Bloom | 1 | 0 | 2026-09-08 |  | 12 | no |
| 8781938753645 | 2026-09-08 | #MC26844 | 1 | Every 45 days | Special Kit | $159.90 | Euphoric Bloom, Crisp Citrus Scape, Golden Blossom | 1 | 0 | 2026-09-08 |  | 12 | no |
| 8783089926253 | 2026-09-09 | #MC26846 | 1 | Every 45 days | Special Kit | $89.95 | Euphoric Bloom, Crisp Citrus Scape | 1 | 0 | 2026-09-09 |  | 11 | no |
| 8783370092653 | 2026-09-09 | #MC26847 | 1 | Every 45 days | Special Kit | $164.85 | Midnight Sensation, Honey Nectar, Chilled Citrus | 1 | 0 | 2026-09-09 |  | 11 | no |
| 8784082829421 | 2026-09-09 | #MC26851 | 1 | Every 45 days | Special Kit | $129.95 | Midnight Sensation, Euphoric Bloom, Chilled Citrus | 1 | 0 | 2026-09-09 |  | 11 | no |
| 8783849848941 | 2026-09-09 | #MC26854 | 1 | Every 30 days | Special Kit | $89.95 | Midnight Sensation, Euphoric Bloom | 1 | 0 | 2026-09-09 |  | 11 | no |
| 8784923197549 | 2026-09-10 | #MC26856 | 1 | Every 30 days | Special Kit | $89.95 | Euphoric Bloom, Honey Nectar | 1 | 0 | 2026-09-10 |  | 10 | no |
| 8786561335405 | 2026-09-10 | #MC26866 | 1 | Every 30 days | Special Kit | $89.95 | Euphoric Bloom, Midnight Sensation | 1 | 0 | 2026-09-10 |  | 10 | no |
| 8789878276205 | 2026-09-11 | #MC26875 | 1 | Every 30 days | Special Kit | $89.95 | Wildwood Mystique, Midnight Sensation | 1 | 0 | 2026-09-11 |  | 9 | no |
| 8794540572781 | 2026-09-12 | #MC26886 | 1 | Every 30 days | Special Kit | $129.95 | Wildwood Mystique, Euphoric Bloom, Midnight Sensation | 1 | 0 | 2026-09-12 |  | 8 | no |
| 8796672098413 | 2026-09-13 | #MC26888 | 1 | Every 30 days | Special Kit | $89.95 | Wildwood Mystique, Chilled Citrus | 1 | 0 | 2026-09-13 |  | 7 | no |
| 8797456498797 | 2026-09-13 | #MC26893 | 1 | Every 30 days | Special Kit | $114.90 | Chilled Citrus | 1 | 0 | 2026-09-13 |  | 7 | no |
| 8798503436397 | 2026-09-13 | #MC26896 | 1 | Every 30 days | Special Kit | $89.95 | Euphoric Bloom, Golden Blossom | 1 | 0 | 2026-09-13 |  | 7 | no |
| 8783361638509 | 2026-09-13 | #MC26897 | 1 | Every 30 days | Special Kit | $114.90 | Chilled Citrus, Euphoric Bloom | 1 | 0 | 2026-09-13 |  | 7 | no |
| 8798606164077 | 2026-09-13 | #MC26899 | 1 | Every 30 days | Special Kit | $134.90 | Crisp Citrus Scape, Golden Blossom, Midnight Sensation | 1 | 0 | 2026-09-13 |  | 7 | no |
| 8798693359725 | 2026-09-13 | #MC26900 | 1 | Every 30 days | Special Kit | $89.95 | Euphoric Bloom, Wildwood Mystique | 1 | 0 | 2026-09-13 |  | 7 | no |
| 3371502403693 | 2026-09-17 | #MC26933 | 1 | Every 30 days | Special Kit | $89.95 | Chilled Citrus | 1 | 0 | 2026-09-17 |  | 3 | no |
| 8805364367469 | 2026-09-17 | #MC26934 | 1 | Every 30 days | Special Kit | $89.95 | Wildwood Mystique, Golden Blossom | 1 | 0 | 2026-09-17 |  | 3 | no |
| 8713288745069 | 2026-09-18 | #MC26952 | 1 | Every 30 days | Special Kit | $114.90 | Wildwood Mystique, Crisp Citrus Scape | 1 | 0 | 2026-09-18 |  | 2 | no |
| 8799794430061 | 2026-09-18 | #MC26953 | 2 | Every 30 days | Special Kit | $129.95 | Chilled Citrus, Crisp Citrus Scape, Golden Blossom | 1 | 0 | 2026-09-19 |  | 2 | no |
| 8809972334701 | 2026-09-18 | #MC26954 | 1 | Every 30 days | Special Kit | $89.95 | Golden Blossom, Crisp Citrus Scape | 1 | 0 | 2026-09-18 |  | 2 | no |
| 8798306828397 | 2026-09-18 | #MC26955 | 1 | Every 30 days | Special Kit | $80.96 | Midnight Sensation, Wildwood Mystique | 1 | 0 | 2026-09-18 |  | 2 | no |
| 8811479302253 | 2026-09-19 | #MC26965 | 1 | Every 30 days | Special Kit | $89.95 | Euphoric Bloom, Midnight Sensation | 1 | 0 | 2026-09-19 |  | 1 | no |
| 8670282842221 | 2026-09-20 | #MC26966 | 1 | Every 30 days | Kit (singular) | $49.95 | Wildwood Mystique | 1 | 0 | 2026-09-20 |  | 0 | no |
| 8670253777005 | 2026-09-20 | #MC26968 | 1 | Every 30 days | Kit (singular) | $49.95 | Honey Nectar | 1 | 0 | 2026-09-20 |  | 0 | no |
