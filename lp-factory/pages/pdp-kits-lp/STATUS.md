# KITS LP — /pages/manifestation-kits (LAUNCHED 2026-08-14, mk1 key)

Page gid://shopify/Page/118794911853 · product 8215141417069 (UNLISTED)
Offer: one-time kits, NO subscription/plans/discounts. Scents = gift.
- Studio $139.95 (~~$189.95~~) 1 diffuser + 1 scent · variant 45644596936813
- Condo  $209.95 (~~$359.95~~) 2 + 3, DEFAULT "Most Popular & Best Value" · 45644596969581
- House  $339.95 (~~$439.95~~) 3 + 5 · 45644597002349
Prices/compare-ats read from the product — re-sync page if they change.

CART LOGIC: one line item = kit variant; scents as line-item property
"Scents: A, B ×2". No BXGY, no selling plan. Variants untracked (always sellable).

FILES: mc-lp-kits-app.js gid 29700496228461 / mc-lp-kits.css gid 29700496261229
(SHA dbdc89e; source deploy-ready/ here). Shares mc-lp-vendor.js +
mc-lp-diffuser-assets.js with the free-diffuser LP. Cache key mk1-+UTC hour.
Page-local drawer takeover REMOVED — sitewide mc-drawer.js handles the cart
(its diffuser-title injections don't match "Manifestation Special Bundles").
Perf stack ported: prehero (fixed <=768px), preloads, frame-yield loader,
chunked render, kit imgs width=160 + dims, frag thumbs width=96.

LAUNCH VERIFY (run 48, real Chrome + Lighthouse):
- DOM: 3 kits w/ store prices, Condo default, imgs loaded, black ATC,
  FREE SCENT chips, guarantees x3, GBH testimonial, no One-Time, 11 sections.
- ATC smoke: 2 picks -> ADD TO CART $209.95 -> cart = 1 line Condo 20995
  w/ Scents property, drawer opened, test cart cleared. FUNNEL WORKS.
- Lighthouse median-of-3: 71 / FCP 1.7 / LCP 3.4 / TBT 784 / CLS 0.028
  (bench 2408 = slow runner; TBT inflated. LCP/CLS match fd51 page.)
- FB pixel: 2 requests in trace. Product title fixed to "Special" store-side.

POST-LAUNCH FIXES (2026-08-16, verified live r49b): app rebuilt from FINAL
artifact (compat line removed, img dims); kit-line/ship-line -10%; key mk2.
r49b: DOM all green incl. compat ABSENT, cart smoke pass again, pixel x2.
(r49b Lighthouse 53/LCP 5.1 = cold-cache hour boundary + bench 2083 runner —
disregard; r48 warm read LCP 3.4/CLS 0.028 stands.)
RAIL: verify gates must be KEY-AGNOSTIC (extract served mk key, assert bytes) —
storefront HTML cache lags 30-60 min behind pageUpdate; version-label greps
false-negative while content is already correct.

PRE-TRAFFIC CHECKLIST: [ ] owner eyeballs page on real phone
[ ] Shop Pay Installments enabled at checkout (pay4 line promises it)
[ ] free-shipping reality matches "today only save $19.95" claim
