# Kit Builder V2 — /pages/build-your-kit-2 (LAUNCHED 2026-08-24, VERIFIED r82)

Page gid://shopify/Page/119186260077, handle `build-your-kit-2`, published.
Artifact source of truth: 7c116af8-483e-47d9-a90a-eea59b968e20 (mc-kit-builder-v2-draft.html).
Files (independent from V1): mc-kit2-app.js gid 29803113119853 (SHA 8d32acc) /
mc-kit2.css gid 29803113152621 (SHA adb988c). FIXED loader key v2k1-8d32acc (same protocol as V1:
fileUpdate -> origin gate on throwaway ?v keys -> pageUpdate flips to a never-requested key).

OFFER (one-time, NO subscription — anti-subscription marketing angle):
- Plan 1: Studio Kit variant 45644596936813 $79.95, no free scents (step 2 SKIPPED, straight to step 3)
- Plan 2 (default, Most popular): Condo Kit 45644596969581 ~~$159.90~~ $139.95 + 2 FREE scents ($79.90 val)
- Plan 3: House Kit 45644597002349 ~~$239.85~~ $209.95 + 3 FREE scents ($119.85 val)
- Product 8215141417069 (shared with /pages/manifestation-kits!). compareAts at checkout: 189.95/359.95/439.95.
- Free scents ride as line-item property "Free scents: A, B" on the kit line (kits-LP fulfillment pattern).
- Paid extra scents: step-3 checkbox (white, 👈 nudge) opens 7-scent menu w/ ingredients; each added as a
  separate one-time line at $39.95 (scent variants, ACTIVE, no selling plan).
- CTA "Add to cart ➔" -> fbq AddToCart (kit+extras ids, due value) -> POST /cart/add.js -> cart drawer opens
  (sitewide mc-drawer takeover); /cart fallback. No InitiateCheckout (Shopify FB channel covers checkout).
- Banner/counter: "THE FIRST 1,000 SCENTS ARE ON US" 131->58; prehero + preloads + decode-gated hide ported.
- CSS: artifact style + broad baseline + 226-rule #root armor wall (opacity excluded), fonts/side -> CDN.

r82 LAUNCH VERIFY (real Chrome vs live): key v2k1-8d32acc served; prehero collapses; banner/plans/pills/
indicators/guar/no-h1sub all green; overflow 0. Plan-3 flow: 3 free picks + 1 paid extra -> REAL cart POST:
House Kit $209.95 w/ Free-scents property + Honey Nectar $39.95 = $249.90; drawer opened; button restored;
cart cleared. Plan-1: CTA flips to "Review my kit", skips to step 3, $79.95. AddToCart pixel: ids kit+extra,
$249.90, 4 units. (Known spy-artifact TypeError from fbq stub — real-fbq runs clean, see kb17 r75.)

WATCH ITEMS handed to Jose at launch:
1. /pages/manifestation-kits SELLS THE SAME VARIANTS and still displays old prices (139.95/209.95/339.95)
   while the product now charges 79.95/139.95/209.95 — that page undercharges vs display; re-sync or retire.
2. Checkout strike-throughs use product compareAts (189.95/359.95/439.95), bigger than page anchors
   (159.90/239.85) — favorable but inconsistent; align compareAts if desired.
