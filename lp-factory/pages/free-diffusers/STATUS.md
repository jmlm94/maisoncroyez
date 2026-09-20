
## Deploy log
- 2026-09-19 fd1-6b26d32 — LIVE. Product 8277082341485 (variants 45900240257133 / 45900240289901 / 45900240322669),
  GenericFiles mc-fd-app.js 30137393119341 + mc-fd.css 30137393152109, Page 120358797421 /pages/free-diffusers (published).
  QA: drawer-recon r224 (5 paths, real carts + checkout) → recon/r224/.
- 2026-09-19 fd2-7516c8f — LIVE. Fixes from r224 + Lighthouse: keyed Fragment per step (r224 found the step-2
  "Review my kit" navrow surviving into step 3 → two .btn.atc; same bug class exists on the live v3 page as a stale
  pick-count line), and a poster <img id="mc-hero-p"> under the pre-hero video so the LCP candidate paints at FCP
  instead of at the video's first frame (LH mobile 68/48/48, LCP 3.2/7.6/7.8 s). QA: r225. Perf: lh-live re-run after.
- 2026-09-19 fd3-3d4b028 — LIVE. fd2's LCP fix did not take (LH mobile 40/51/69 and 53/68/64; LCP still = adopted
  video first frame, render delay ~5 s: the pre-hero <img> is hidden before first paint, and moving the pre-hero
  <video> into the slide pauses it). fd3 renders a poster <img class="hv-poster"> under the video inside the gallery
  slide (same box, painted with the app render). r225 = 110/110 on fd2. QA: r226. Perf: lh-live re-run after.
  Results: LH 3x mobile 54/59/59 (LCP 3.9/4.7/4.5 s, LCP element = img.hv-poster; was 7-8 s on the video frame),
  desktop 97/96/97. r226 = 105/110: the 5 fails are the hero check requiring a playing video (runner Chromium has no
  H.264, readyState 0); everything else passed, incl. one ATC button at step 3 and the poster/video same-box check
  parts. r227 = same run with playback info-only.
  Remaining speed cost is third-party: Facebook pixel ~525 ms blocking, Clarity ~190 ms, Klaviyo ~90 ms, Shopify web
  pixels manager ~1.0 s main thread, Clarity "Brand Agents" embed 280 KB (azurefd.net), content.9gtb.com 64 KB,
  theme.css render-blocking ~330 ms, inline document scripts ~1.0-1.3 s. Our files: ~50 KB gz total, ~150 ms.
- 2026-09-19 fd4-9571dda — LIVE. Owner decision (option 2): one-time = "(One-Time)" kit variants on the same hidden
  product, 45900920324205 $80.00 / 45900920356973 $90.05 / 45900920389741 $140.10 (+ full-price scents) => $129.95 /
  $189.95 / $289.95. No automatic discount; Subi untouched. Product set ACTIVE + seo.hidden=1 (was DRAFT); all six
  variants SKU MC-DIFFUSER. r227 (fd3 re-check) = 80/92, all misses were Shopify 429s on /cart.js (runner throttled
  after 3 recon runs + 3 Lighthouse runs in 30 min) — r228 uses a 45 s gap. QA: r228.
- 2026-09-19 fd5-94c134b — LIVE. Owner adjustments: promo strip removed; deal box -20% (rows .736rem); kit titles 2+3
  .99rem/800 (1-kit unchanged); step-3 title "Congratulations, your free diffusers have been reserved."; red strip
  .84rem; Selected pill now a flex column (no overlap with the option title); Shop Pay "4 interest-free payments" line
  shown on the plan too (owner says installments are offered; checkout decides eligibility — r229 logs whether the
  checkout mentions installments); one-time option line "$X today. No refills. No lifetime discounts." QA: r229.
- 2026-09-19 fd6-0606ea1 — LIVE. Owner: no sub-lines under any button (62% offer line, ONE-TIME line, sticky bar,
  guarantee CTA). Money logic unchanged. QA: r230. r228 (fd4) = 98/110, all money checks passed; misses = owner renamed the
  product to "Maison Croyez — Home Diffuser Kit" (text checks) + hero same-box check on 3 paths (detail logged from r229).
  r229 (fd5) = 108/115: all money checks passed; misses = hero check width threshold (desktop gallery slide is 260 px,
  threshold was 300) and the combined step-3 check on all paths (title + Shop Pay line were fine; r230 logs the strip
  size / pill geometry to see which part). Checkout evidence: "installments" mentioned on one-time checkouts only, NOT on
  subscription checkouts (r229, all 3 plan paths) — the "4 interest-free payments" line on the plan is not backed by checkout.

## 2026-09-19 23:00 — MONEY MODEL CHANGE (owner changed Subi Plan 5: full price on the first order, then $10 off)
Subscription path now: scents $49.95 each on Plan 5 (then $39.95) + kit variant at diffuser value ($79.95 / $159.90 / $239.85,
compareAt cleared) made FREE by automatic BXGY discounts "FREE DIFFUSER(S) — N scent subscription"
(1389794623597 / 1389794852973 / 1389794951277): buy N scents (isSubscription) -> kit variant N 100% off, usesPerOrderLimit 1,
combines with everything. Automatic BXGY cannot discount subscription lines (API: appliesOnSubscription unsupported) — that is
why the kit, not the scents, carries the "free". One-time path unchanged ($129.95 / $189.95 / $289.95). Page code unchanged (fd6).
Six-month page: unpublished by the owner 23:05 UTC (its $89.95/$129.95 kits needed the old first-order scent discount); the two
"Six-Month Program — N scents included" BXGYs created at 22:50 were deleted (could not apply to subscription lines anyway).
r232 (23:01 UTC, fd6 + new drawer + new model) = 115/121: all totals correct (99.90 / 149.85 / 189.95 / 289.95; 1S + drawer
'+ Add' -> 99.90), drawer bar + cards + add flow PASS; the 6 misses were the old wording expectations (scents $0, "First payment
$0.00") — r233 updates them. Special Kits product 8245945434221 is now unused (recommend Draft).
- 2026-09-19 fd7-066b335 — LIVE. Owner (iPhone): kit-review rows now "N× Name" (quantity first, incl. the diffuser row);
  auto-refill option lines 10% smaller (.81rem / .855rem) and single-line; Selected pill back in the corner, title padded 96px
  so it never runs under it. Drawer (same commit): .mc-fa contain:inline-size (the scroll row was widening the theme's grid
  drawer on iPhone → bar/testimonial cut off), Add buttons black/centered/aligned at the card bottom. QA: r234.
  r234 (after the 00:01 UTC drawer cache rollover): 124/127. All page checks + all money totals passed on 5 paths. The 3 misses were
  test artefacts: (a) 2S-phone got Shopify's "There was a problem loading this website" page at checkout (drawer had already
  passed), (b) 3S-desktop-plan drawer: Shopify attaches a "FREE DIFFUSERS — 3 scent subscription (-$0.00)" badge to each scent
  line in the 3-scent BXGY case, which the price regex read as $0.00 (total was $149.85, correct), (c) the Add-button style
  check ran during a drawer re-render. r235 fixes the checks (tolerant price parse, waits for the row, checkout retry).
- 2026-09-20 fd8-9c3bb61 — LIVE (app js 85768 B; css unchanged; drawer pin dr-2026091923b kept). Removes the page's own
  fbq("track","AddToCart"): the pixel audit showed 4 AddToCart per click (Shopify's Facebook channel pixel fires one per cart
  line + ours). Only the app js changed. QA: r235 (adds an fd8 check: page-level fbq AddToCart count 0, no such call in the source).
  r235: 131/136 — every page, money and checkout check passed on 5 paths; the fd8 check passed (page fbq AddToCart = 0, no such
  call in the served source). The 5 misses were all the same drawer check: Add buttons unstyled (transparent). Root cause: the
  page's drawer PIN snippet removed #mc-drawer-style before loading mc-drawer.js; when the theme's hourly copy had already run
  (same build), the pinned copy's init returned early and never re-injected the style. Fixed in fd9 (pin removed; drawer
  re-injects). Also learned: Shopify shows a "FREE DIFFUSERS — N scent subscription (-$0.00)" badge on each scent line in the
  drawer (li.badge) — cosmetic; the discount lands on the kit line.
- 2026-09-20 fd9-616b22a — LIVE (app js 86792 B, css 64826 B, drawer 13086 B build dr-2026092017). Page speed, after the fd8
  Lighthouse (mobile 47/58/65, LCP 4.1–5.2 s, LCP element = the app's poster <img>, load delay 1.7 s + render delay 2.4 s):
  (1) hero mp4 no longer starts with the document — page-body ships data-src, preload=none, no autoplay; the app sets src
  2 rAF + 200 ms after its first paint (600 KB was competing with css/js/fonts during the LCP window on phones);
  (2) the app ADOPTS the pre-hero poster <img id="mc-hero-p"> (moves the node into .hv-pwrap{display:contents}) instead of
  rendering a second <img> of the same URL; (3) bvp-400/600 fonts preloaded (they were "VeryHigh" late discoveries);
  (4) drawer pin removed from the page (see r235). QA: r236; Lighthouse + LCP forensics re-run on fd9.
  r236: 141/141 (drawer styled on all 5 paths with the theme's copy alone, fd8 pixel check, all totals). Lighthouse fd9:
  mobile 62/71/58, LCP 3.5/3.2/4.8 s (fd8: 47/58/65, LCP 4.1–5.2 s); LCP render delay 2.4 s -> 0.34 s (adopted poster);
  desktop 94–96. LCP forensics (real 1.6 Mbps / 4x CPU phone): mp4 now starts at 3.9–4.2 s (was 0.8 s) but the poster still
  finishes at 3.6–3.9 s: DCL is 4.7–4.8 s and everything else (theme.js 3.4 s, web-pixel manager 75 KB to 5.1 s, section
  images ~200 KB from ~0.8 s, checkout preloads ~530 KB, third parties ~1 MB) saturates the pipe.
- 2026-09-20 fd10-230ff7c — LIVE (app js 87357 B; css unchanged). (1) the below-fold sections (their ~200 KB of images) and the
  hero mp4 now wait for the LCP poster's load event (cap 3 s); (2) poster served through the image CDN: &width=720 + srcset
  480w/720w, sizes (max-width:768px) 100vw / 520px, preload with imagesrcset, so Chrome/Safari get WebP/AVIF; (3) <video>
  has no poster attribute (it pointed at the plain URL = would have been a second copy). QA: r237; LH + LCP re-run.
