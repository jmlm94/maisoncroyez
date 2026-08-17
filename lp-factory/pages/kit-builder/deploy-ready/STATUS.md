# Kit Builder — /pages/build-your-kit (LIVE)

- Page: gid://shopify/Page/118616064109, handle `build-your-kit`, loader key `kb3-`+UTC-hour
- Perf (kb3): images served as individual CDN files (mc-kb-*.jpg/png, pre-sized), frag/testimonial images lazy-loaded,
  desktop side photo desktop-only; critical JS+CSS ~37KB (was 647KB). mc-kit-assets.js retired (file remains on CDN, unused).
- Files (GenericFile GIDs, URLs stable, ?v bumps on fileUpdate):
  - mc-kit-app.js     gid://shopify/GenericFile/29641921167469
  - mc-kit-assets.js  gid://shopify/GenericFile/29641921200237
  - mc-kit.css        gid://shopify/GenericFile/29641921233005
- Offer: Circle-only. Scents $39.95/mo on Subi plan 2627895405 ("Delivered every 30 days ✨").
  Diffuser variant 45450822778989 ($79.95) × N added one line, zeroed by Subi automation.
- Rooms → diffusers: Living Room=1, +Bedroom=2, +Kitchen=3 (default 3). Scent count must equal N.
- ATC: POST /cart/add.js {items:[{scent,qty,selling_plan},...,{diffuser,qty:N}]} → redirect /checkout (no drawer).
- Rebuild: edit src/make-kit-mock.py (single source of truth) → python3 deploy-ready/build-kit.py →
  upload changed files (stagedUploadsCreate→curl→fileUpdate on GIDs) → bump loader key kb1→kb2 via pageUpdate.
- Rollback: unpublish page 118616064109 (pageUpdate isPublished:false).

## kb7 (2026-08-17, SHA 1bbb671, verified live r54)
Artifact-driven rebuild (artifact b5659944 = source of truth; kb-smoke-r8.mjs local browser smoke before deploy):
- Step 1: 14-slide swipe gallery + arrows + thumb rail (hero + 13 kits-LP gallery imgs, CDN &width=820&format=pjpg, thumbs &width=100; page preload updated to match slide 1). Diffuser value $89.95 (DV=89.95): plans ~~$89.95/$179.90/$269.85~~ FREE + green claim lines. usp3 moved under stepsub. Ship-line above CTA.
- Guarantee cards x3 (green zero-commitment w/ return-label+keep-scents copy, cream take-it-back, lavender Lifetime Warranty) on ALL 3 steps; trust-strip says Lifetime warranty.
- Step 2: title "It's time to decide what you want to attract for your life.", reserved strip, big pick counter, booklet objection card (files/15_...&width=220), Review-my-kit end button. STICKY BAR REMOVED (all steps end-buttons only).
- Step 3: pay-in-4 line (m*P/4, Shop Pay), 3 minirevs + Mariana V. testimonial, hiw timeline + nolock replaced by guar cards, FAQ x6 (added really-free + bottle-life), 30+ days everywhere.
- Cart logic UNCHANGED from kb6 (VAR/PLAN/DIFF, /cart/add.js, /checkout). r54 probe: full UI flow green (due $119.85, pay4 $29.96, valline $389.70); final POST not auto-tested.
- Lighthouse baseline r54 (bench 2388): 61 / FCP 1.9 / LCP 7.4 / TBT 517 / CLS 0.022. LCP attributed to .stepsub TEXT w/ 6.8s render delay while hero img loads in 209ms — perf QA target for next round.
