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

## kb8 (2026-08-17, SHA b1960dd) — perf QA round 1
- Page body: +4 font preloads (unna-700, outfit-700, bvp-400, bvp-600) to kill the late-font-swap LCP
  (r54: LCP 7.4s attributed to .stepsub TEXT, renderDelay 6.8s; fonts discovered only after JS-injected css).
  Hero preload kept at &width=820&format=pjpg. Key kb7→kb8.
- App: restored loading=lazy on 8 hidden-step imgs (7 frags + guests avatar) — regression from artifact rebuild.
- RAIL (NEW, cost 2 wasted verify runs): Shopify CDN MINIFIES .js GenericFiles on ingest, same as css —
  strips newlines, rewrites JSON-escaped double-quote strings to single-quote (\" becomes "), re-escapes
  unicode. Byte-gates MUST grep minification-stable markers (identifiers, attr text like loading="lazy",
  class names) — never quoted-string escape sequences. Served bytes also vary a few bytes per request
  (nondeterministic minifier) so md5 comparisons are useless.
- Served minified bytes captured (verify/served-app.bin) and full-flow smoke-tested locally: PASS, 0 errors.
- r55d verified (bench 2877 runner): parity probe all green (lazyFrags true, flow works on minified bytes).
  Lighthouse median: 61 / FCP 1.8 / LCP 6.6 / TBT 589 / CLS 0.000. Fonts now start at 165ms (preloads work),
  CLS perfect. OBSERVED (unthrottled) numbers: FCP 258ms, LCP 539ms, full load 1.0s — real-device speed is fine;
  the 6.6s LCP is the slow-4G simulation where third-party JS (FB/wpm/trekkie/subi/klaviyo ~500KB) starves the
  bandwidth ahead of the body font (bvp-400), whose swap repaint is counted as the text LCP. Candidate round 2
  (not deployed): prehero-style static first-slide for lab LCP + thumbs width=100->64.

## kb9 (2026-08-18, SHA 35c5696) — spacing pass
CSS-only: appended margin overrides for consistent 24-28px air between logical sections on all 3 steps
(gallery 24, usp3, ship-line 22, navrow 18, guar3 26, reserved/pickcount/booklet, kitcart/valline/due/pay4,
perkhead 28, testi2 24, minirevs, trust-strip, faqs). App bundle + cart logic untouched. Key kb8->kb9.
Artifact and live css share the identical block; before/after screenshots in scratchpad session.
r56 verify: computed-style assertions (guar3 26px, kbgal 24px, navrow 18px, perkhead 28px) + flow sanity.

## r58 CVR QA (2026-08-18) — FULL PASS
- Data layer: 7 scent variants ACTIVE+sellable (love scent 616 units), Subi plan 2627895405 alive,
  diffuser variant untracked (=always sellable; its -206 qty is a giveaway tally, not a block).
- Real cart POST (exact app payload): 200 OK; cart = 3 diffusers + 3 scents-on-plan; total $119.85
  (diffuser lines zeroed by Subi automation as designed).
- Click-through: Claim button -> real /checkouts/cn/... URL reached, no toast, no JS errors.
- Responsiveness 360/390/412/768/1280: overflow 0px at all widths, spacing rules live (guar3 26px,
  mwho block), gallery+arrows on mobile, side-photo swap at >=900px, no JS errors. 15 screenshots in verify/qa58/.
- CVR watch item: sticky bar removed 08-17 -> step-2 continue button sits below 7 scent cards.
  If CVR stays soft, first A/B candidate. (CVR was already slow pre-change.)

## kb13 (2026-08-23, SHA a136897, VERIFIED LIVE r59) — Brand-Sale funnel
Artifact-driven full rebuild (b5659944 = source of truth). Step1: banner counter 131->floor 58 (syncs .livecnt),
hero = Diseno_92 (single, preloaded, 820 pjpg), boxed ❤️92% line, promise headline, duo diffuser/scents cards,
compliments gradient card, 4 plans ($89.95 anchoring, coverage 600-2400 sqft, 4diffusers.png?v=1787451104 new CDN file),
neutral guar cards w/ emojis on all 3 steps. Step2: dynamic s2title (reserved+pick N), green pickcount, booklet,
scent-value strip, per-card price line, 7 scent stories + Smells/Feels rows, default card gradients. Step3: Secure
Checkout CTA (joinToast finder updated!), left-line counter, testi2 under CTA, FAQ w/ title; perks/minirevs/trust cut.
All em-dashes -> commas. Armor: #root+!important in css AND inline page body. Default plan 2 (Most Popular).
r59 live probe: all sections/imgs/spacing green, counter ticks, 4-plan flow $159.80, cart POST 200 (2 lines, $79.90,
diffusers zeroed by Subi), 0 JS errors, 0 overflow. App 25KB (was 33KB).
RAIL reminder: Shopify connector silently flipped to Carbinox pre-deploy — step-0 get-shop-info caught it.

## kb14/kb15 (2026-08-23) — pixel-parity hardening, VERIFIED r64
r60 parity QA vs artifact-bundle found theme drift: 15-29% pixel diff, +165-367px height (theme .prose margins on
undeclared props, font-size 15px inheritance, .banner grid, h1 refont). Fixes:
- kb14: FULL ARMOR WALL — entire stylesheet re-emitted #root-prefixed + !important (195 rules; opacity excluded to
  protect JS inline styles). kb15: BROAD BASELINE before the wall — #root :is(div,section,span,ul,li,h1,p,img,...)
  {margin:0 !important} + ul/li padding 0; FAQ answer p re-declared. Inline page armor mirrors both.
- NEW DEPLOY PROTOCOL (rail): hour-keyed loader RETIRED for this page. Sequence = fileUpdate -> origin gate using
  ONLY throwaway ?v keys (hour/visitor keys were being CACHE-POISONED by our own gate polls hitting stale origin)
  -> pageUpdate to a NEVER-REQUESTED FIXED key (kb15-7a79f04). No hourly refetch; next deploy flips the token.
- r64 certification (4 widths x 3 steps): computed-style diff = ZERO mismatches (only img color prop, invisible);
  height deltas 4-57px (was 165-367); residual 7-17% pixel diff = font-smoothing + lazy-image timing noise, floor
  ~7.5% cells have 4px height delta. Live == artifact structurally.
- Jose's stale-phone symptoms (counter pill, duo gaps, FAQ gap) were pre-wall css; fixed-key rollout ends recurrence.

## kb16 + prehero (2026-08-23, VERIFIED r72) — lab-LCP fix, score 63 -> 71 median / 78 best
kb16 polish (stepper centering, top/rating/h1 margins) shipped with key kb16-bb42cf4. Then PREHERO added to the
page body (HTML-only, key unchanged): #kb-pre fixed static hero (same Diseno_92 820-pjpg URL as app heroshot,
preloaded fetchpriority=high) shown instantly, hidden once #root renders. Three rounds to make Lighthouse credit it:
- r68/r69: LCP still attributed to app .heroshot (renderDelay ~6s). r69 probe: prehero 404x404 (163216 px^2, after
  widening to min(100vw - 8px,436px)) vs heroshot 380x380 (144400) — strictly larger yet NEVER an LCP candidate.
- r70 ground truth (app JS blocked + PerformanceObserver): prehero IS a valid candidate and wins normal loads.
  ROOT CAUSE: the hide-on-root-render observer removed it before its image ever painted when JS won the race.
- Fix 1 (r71): wait for img load + double-rAF before hiding — 2 of 3 runs flipped (79 best). Residual: `load`
  fires at bytes-arrival, DECODE can outlast the 2-frame window. Fix 2 (r72): gate on img.decode() promise
  (paint-ready), then double-rAF hide, 2.5s safety timeout, error->hide.
- r72 certification: all 3 runs LCP el = prehero; probe lcp list = single candidate {kb-pre, 163216, t~508ms};
  collapse still works (preDisplay none, rootKids 3). Median 71 / FCP 2.2 / LCP 3.6 / TBT 752 / CLS 0.000 / SI 3.0
  (runs 53/71/78 — spread is TBT on shared runners). OBSERVED real-device: FCP 223ms, LCP 270ms (was ~800ms), load 1.1s.
- Remaining lab limiters (untouchable per rails): TBT from FB pixel/Postscript/Klaviyo/Subi; theme render-blocking css (FCP 2.2 sim).
- RAIL: a prehero must survive until its image has PAINTED (img.decode() then double-rAF), not merely until the app
  renders — and must be strictly larger than the app hero. Verify with buffered largest-contentful-paint entries, not
  only Lighthouse attribution.
