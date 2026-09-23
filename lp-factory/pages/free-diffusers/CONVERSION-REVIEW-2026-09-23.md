# /pages/free-diffusers — conversion review, 2026-09-23 (Sep 20–23 data)

Sources: Shopify analytics (sessions by landing page), Shopify orders + abandoned checkouts, Meta Ads insights
(act_522507185818783), Microsoft Clarity data export (3 days, aggregated), recon r240 (live funnel, 141/141 today).

## Bot contamination first
Sep 20 (ET) includes my own QA runs r235–r239 + Lighthouse + LCP forensics: ~70 sessions, 25 add-to-carts, 25 checkouts,
0 orders — they show up as "direct" / desktop. Read the page on paid social only (Facebook + Instagram referrers).
Sweden 49 + Ireland 43 sessions with 0 add-to-cart are Meta's crawlers, not shoppers.

## Real funnel (paid social, Sep 20–23)
| step | sessions | rate |
|---|---|---|
| sessions | 672 | |
| added to cart | 31 | 4.6% |
| reached checkout | 18 | 2.7% |
| completed | 6 | 0.9% |

Six-month page, Sep 6–19 (same traffic, 3,009 sessions): 10.7% add-to-cart, 7.6% reached checkout, 2.06% completed.
The new page loses at the TOP (add-to-cart 4.6% vs 10.7%); checkout->order is 33% (old 27%), drawer->checkout 58% (old 71%).
Orders by day: Sep 20 1, Sep 21 4, Sep 22 2, Sep 23 0 (partial). Abandoned checkouts with email: 5 real (all US), mix of
1S/2S sub and 1S one-time — nothing systematic.

## Meta (Sep 20–23): $2,099, 451 link clicks, 414 landing-page views, 8 purchases, CPA $262, ROAS ~0.3
| ad set | spend | CPM | link clicks | purchases | CPA |
|---|---|---|---|---|---|
| CBO · Winners Top 8 · Broad | $647 | $127 | 157 | 7 | $92 |
| CBO · Week 36 · Broad | $114 | $91 | 57 | 0 | – |
| ABO · INT Candle | $265 | $190 | 62 | 1 | $265 |
| ABO · INT Bath & Body Works | $270 | $218 | 52 | 0 | – |
| ABO · INT Interior Architecture | $236 | $165 | 52 | 0 | – |
| ABO · INT Home Decor | $229 | $173 | 50 | 0 | – |
| ABO · LIL for Maison | $309 | $457 | 11 | 0 | – |
CBO by placement: Instagram CPA $56, Facebook $147, Audience Network $36 / 0 sales at frequency 4.2.
Daily: Sep 10–16 CPM $80–160 with 4–10 purchases/day (CPA $77–183); Sep 21 8 purchases ($120); Sep 22 1; Sep 23 0 (partial).
CTR 4.4–4.8% (creative is fine), landing-page-view/link-click 92% (page loads fine).

## Clarity (3 days, 517 sessions on the page, 36 flagged bots)
- avg scroll depth 38% (six-month page on 2026-09-13: 19%); engagement 134 s total / 67 s active.
- scroll buckets by sessions: <10% 79 (15%), 10–25% 156 (30%), 25–50% 89, 50–75% 145, 75%+ 47.
- dead clicks: 96 sessions (18.6%), 229 clicks (old page 12.6%). Rage clicks 0. Quick-backs 15 (2.9%).
- script errors 11 sessions (2.1%): iOS Instagram in-app 9%, Android Facebook in-app 6.9%, zero on Safari/Chrome.
- browsers: iOS Facebook app 178, Android Facebook app 87, Mobile Safari 78, iOS Instagram app 77, Chrome mobile 64.
The API gives no click coordinates or recordings; step-level drop-off is not recorded anywhere yet.

## Live check today (r240, 19:2x UTC): 141/141 — kit pick, scents, review, ATC, drawer, BXGY $0 kit, checkout totals
$49.95 / $99.90 / $149.85 / $189.95 / $289.95 all correct. Products active, scents in stock (524–641 each), discounts ACTIVE.
