
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
  r237 133/141 (4 paths still got the cached fd9 body; the 5th got fd10 and passed 100%), r238 = fd10 on all paths. Lighthouse
  fd10: desktop 96/98/97, LCP 1.0–1.1 s (best so far). Mobile 46/57/54 with LCP 5.7/8.5/8.8 s — a REGRESSION: with no poster
  attribute Chrome reports the <video>'s first frame as the LCP element (render delay 8.1 s on the simulated phone); the
  poster-bearing video in fd9 never did that. The CDN &width=720 poster is served as image/webp but is 26 KB either way.
  LCP forensics (runner Chromium, no H.264 so the video never paints): unchanged at 3.5–3.9 s, bandwidth-bound.
- 2026-09-20 fd11-52ee8bc — LIVE (page body only; CDN files = fd10 build). <video poster> restored with the SAME &width=720
  URL as the <img> (one request), srcset dropped so the two URLs always match. QA: r239; Lighthouse re-run.
  r239: 141/141 (fd11 on all 5 paths; poster one request, width=720, video poster on the same URL). Lighthouse fd11:
  mobile 68/65/66, LCP 3.7/5.6/5.9 s (LCP element back to the poster <img>), TBT 720/390/400 ms; desktop 97/98/96, LCP 1.1–1.2 s.
  Series (mobile score / LCP): fd3 54-59 / 3.9–4.7 s -> fd8 47-65 / 4.1–5.2 s -> fd9 58-71 / 3.2–4.8 s -> fd10 46-57 / 5.7–8.8 s
  (video first frame) -> fd11 65-68 / 3.7–5.9 s. Desktop 94-96 -> 96-98. Page total transfer ~3.4 MB, 255 requests; our
  files are ~130 KB of it. What is left is outside the page body: theme.js/vendor/sections modules (DCL 4.7 s on a slow
  phone), Shopify web-pixel manager (75 KB, 900 ms main thread), checkout preloads (~530 KB), Facebook 248 KB / 300 ms
  blocking, Clarity + Clarity Brand Agents (29 + 280 KB), 9gtb 64 KB, Subi 58 KB, Klaviyo 67 KB — app embeds, owner call.
- 2026-09-24 fd12-ef38e41 — LIVE (app js 88022 B, css 65563 B; page updated 00:13 UTC). Owner-directed changes, previewed
  on the owner's artifact (MC LP Draft Copy v63–65) first: (1) "Here's the deal" box removed; (2) 1-diffuser card pill
  "FREE ON $75+ ORDERS" (no flat-fee mention); (3) step-3 option 1 "Subscribe & Save + 20% OFF Lifetime:" + "$39.95/scent
  every 30 days." (the "$99.90 today" line removed); (4) one-time option "No subscription. $X today. No refills. Diffusers &
  scents at full price after."; (5) one-time totals $129.95 / $159.95 / $239.95 — kit one-time variants repriced
  45900920356973 $90.05 -> $60.05, 45900920389741 $140.10 -> $90.10 (45900920324205 stays $80.00); (6) Shop Pay installments
  line only when one-time is selected (so steps 1–2 and the plan option never show it); (7) 10-minute hold countdown badge at
  the bottom centre of the hero video (red #B3261E, white, HH:MM:SS, per-visitor localStorage, holds at 00:00:00).
  The fd12 prototype from 2026-09-23 (price on cards, auto-advance, checkout button) is NOT part of this; it lives in commit
  17d197f only. port-fd.py is retired; deploy-ready files are the source. QA: r241; Lighthouse re-run.
  r241: 146/146 on all 5 paths (new checks: no deal box, FREE ON $75+ pill, Subscribe & Save copy, one-time copy + totals
  159.95/239.95 with kit 60.05/90.10 in drawer + checkout, no Shop Pay line on the plan / present on one-time, countdown
  badge centred + ticking + red/white). Lighthouse fd12: mobile 46/61/64, LCP 5.9/4.9/4.8 s, TBT 1,820/730/620 ms; desktop
  97/97/97, LCP 1.1–1.2 s. Same band as fd11 (65–68 / 3.7–5.9 s); the badge costs nothing measurable. Third parties
  unchanged (Facebook 249 KB / 331 ms blocking, Clarity 320 ms, 9gtb 64 KB, Subi 58 KB, Clarity Brand Agents 280 KB).
- 2026-09-25 fd13 — LIVE, final key fd13-5d7fbe3 (app js 89224 B, css 71016 B; page updated 01:59 UTC). Sequence tonight:
  fd13-e595eb8 01:31 (owner round + CRO items 1/2/3/5 with a new headline) -> owner: "revert, you changed the main title" ->
  fd13-c6296fb 01:47 (owner round only) -> owner: "the changes are ok, the title should be the one I had" -> fd13-c30f98f
  01:53 (CRO items back, original headline, kit-card price row unsquashed) -> owner mockup for the cards -> fd13-5d7fbe3.
  Owner round (previewed on MC LP Draft Copy v66-70): "(Requires N scent)" removed; stepbar removed on all 3 steps; kit
  cards "N FREE Diffusers + N Scents 🎁" with room badges (RESTROOM/STUDIO/STORAGE · LIVING ROOM/BEDROOM/KITCHEN · LARGE
  SPACES/1+ ROOM/+ INTENSITY), shipping pills removed, MOST POPULAR green (#1E7A46); step 3: "LAST 100 DIFFUSERS" strip
  removed, "You only pay: $49.95/scent" (plan), "How would you like your refills?" title + explainer, Auto-refill card
  ("Auto-refill & 20% OFF for life:", $49.95 struck -> $39.95 / scent from day 30, 4 perks with green check dots) and
  "No thanks, I'll re-order myself another time (make it a one-time purchase)" link replacing the two radio options.
  CRO round (owner picked 1, 2, 3, 5): (1) price on the kit cards; (2) offer on the first screen -> reduced by the owner to
  the price lede under the ORIGINAL headline (the offer pill on the hero was removed again); (3) step-2 progress pill
  "N of N picked", dashed hint instead of a dead button, sticky bar disabled until complete, auto-advance to the review
  450 ms after the last pick (Back never traps), step-3 button "🔒 SECURE CHECKOUT — $X ➔" that adds to cart and redirects
  to /checkout after 1.6 s (drawer no longer opened; 700 ms was a coin flip against fbevents' ~1 s beacon batching);
  (5) countdown now "Free diffusers reserved · HH:MM:SS" on a dark blurred pill (owner: no number, not red).
  Kit cards per the owner's mockup (v73-74): image | name + room badges + green "YOU SAVE $X" pill | right column struck
  value (red) + serif price (1.25rem); no "today", no "$39.95 every 30 days", no per-scent line.
  02:08 UTC fd13-c9f1148 (CSS only): kit cards + refill card compacted for phones (owner: "more compact, less big") —
  card height 166-201 -> 94-137 px at 390-430 px, refill card ~200-225 px, single-column perks under 480 px.
  QA: r243 = 109/120 on fd13-5d7fbe3 (all funnel/cart/checkout checks pass; the 11 fails = a strict 20 px price assertion
  and the Meta beacon checks, which saw ZERO facebook.com/tr hits in any frame — fbevents sends nothing from a browser
  with navigator.webdriver=true; the 2026-09-20 pixel audit hid it + used a real UA). r244/r245 crashed on a Node-side
  innerWidth typo; r246 = the real run (real UA, webdriver hidden, compact-size checks, AddToCart before the redirect,
  InitiateCheckout on checkout, one path with the redirect blocked to time AddToCart vs /cart/add.js).
  Lighthouse fd13-e595eb8: mobile 52/67/61, LCP 4.7/4.7/6.2 s; fd13-5d7fbe3 (02:04): mobile 42/46/57 with one 11.9 s LCP
  outlier (TBT 3,760 ms on that run — runner noise, same third-party stack); desktop unchanged.
  12:36 UTC fd13-8533abf (CSS): card price + refill "from day 30" back in Unna (a global "#root b/i{font-family:inherit
  !important}" beat the rule; now !important). r247 = 129/135: every funnel/cart/checkout check green; InitiateCheckout
  fires on the checkout page (1 per checkout, ~5 s after the click).
  META PIXEL, resolved (pixel-diag 12:5x UTC, real UA, hooks in every frame, /checkout answered with a 204 to keep the LP
  alive): the Meta channel pixel (web-pixel-476348525, lax sandbox, global fbq, consent all granted) sends PageView on
  load and THREE AddToCart beacons (kit + each scent, "sh-" event ids) 15-35 ms after the /cart/add.js response, via
  sendBeacon. r242-r247 saw none for two test reasons: the recon wrapped window.fbq to count page-level calls (the wrapper
  lost fbq.instance, which the channel pixel checks before tracking) and the "blocked redirect" used route.abort(), which
  swaps the document for chrome-error://. Redirect wait cut 1.6 s -> 0.8 s (~25x margin) in fd13-03f212c; r248 verifies
  3 AddToCart before the redirect + InitiateCheckout on checkout without the wrapper.
  r248 (13:03 UTC, fd13-03f212c) = 135/135: AddToCart x(lines) 21-53 ms after the /cart/add.js response on every path
  (kit + each scent, "sh-" event ids), redirect lands on /checkouts/ 1.9-2.6 s after the click, InitiateCheckout +
  PageView on checkout, cart lines/totals/plans correct, compact cards (94-137 px), no JS errors, no overflow.
  13:2x UTC fd13-6c193c2 — owner: "Remove the auto move to third step, people need to choose carefully". The step-2
  auto-advance effect is gone; after the last pick the page stays on step 2 with "Review my kit ➔" (button + sticky).
  QA: r249 = 140/140 (stays on step 2 after the last pick, review opens on tap; AddToCart x lines 26-49 ms after the add,
  InitiateCheckout on checkout, totals/plans/cart unchanged).
- 2026-09-25 fd14-c3e1dc7 — LIVE 15:03 UTC (app js 89817 B, css 74597 B). Owner: "if they don't choose the subscription
  we don't charge $49.95 x diffusers... how can we make it clear?" Step 3 now states the rule: title "Enjoy auto-refill with
  your free diffusers every 30 days:", owner explainer ("Other brands make this hard. We don't, because we believe in our
  craft: your N scents ship today with N free diffusers ($V value), and your next scents arrive every 30 days at $39.95
  each, 20% off for life. Skip, swap or cancel anytime, in one tap."), TWO option cards each with today's price
  (Auto-refill & 20% OFF for life · $X today · FREE DIFFUSERS · 4 perks incl. "Cancel anytime, we'll pay for return" /
  One-time payment, no refills · $Y today · $Z/DIFFUSER, whole dollars) replacing the "No thanks…" text link; diffuser
  row "FREE with Auto-refill"; when one-time is selected a red strip under the row "Diffusers are no longer free: +$Z today
  · Keep them free". Previewed on MC LP Draft Copy v79-83 (v83 also embeds the six real review photos so the artifact
  carousel matches live). QA: r250 = 140/140 (new step-3 copy/cards, one-time via the second card + red strip, AddToCart
  x lines 29-59 ms after the add, InitiateCheckout on checkout, totals/plans/cart unchanged).
- 2026-09-25 fd15-3f17cd3 — LIVE 15:36 UTC (app js 90304 B; page-body + shim). Owner: "take mobile performance to 85+
  without affecting the customer experience". Lighthouse mobile is bound by third-party main-thread work (Facebook 416 ms
  blocking, Clarity 1.0 s + 0.3 s long tasks, Shopify web-pixels manager 1.4 s boot, Klaviyo/Subi/9gtb/Postscript); our
  files are all in flight by 1.1 s. Levers inside the page: (1) page-body shim holds dynamically inserted third-party
  scripts until the first touch/scroll/key — Clarity (tier A, or 6 s), Klaviyo onsite chunks / Postscript / Gorgias / 9gtb /
  Subi SDK (tier B, or 12 s); Shopify scripts, WPM and the Meta pixel are untouched (PageView/AddToCart timing unchanged);
  (2) the app mounts the long-form sections on scroll-near (320 px sentinel) / first interaction / 6 s instead of the first
  idle slot. Not deferrable: Subi is a direct <script> tag in the head. PSI (psi.yml) hit Google's anonymous quota (429) —
  needs an API key as a GitHub secret to be usable. QA: r251 = 145/150 (all funnel/cart/checkout/pixel checks green; the 5
  fails were the "Subi absent" expectation, relaxed in r252; r252 = 150/150). Lighthouse x5 on fd15 (15:48 UTC,
  lh-20260925T1548Z.md): mobile 61/75/66/55/60 (FCP 1.8-2.1 s, LCP 4.1/2.7/4.7/4.6/6.0 s, TBT 970/640/590/960/640 ms,
  TTI 10.6-13.8 s), desktop 96/96/92/98/95 — up from 38/50/72 on fd14, target 85 not reached. Median run: Facebook 250 KB /
  724 ms main thread / 558 ms blocking, Subi 74 ms, Clarity + Klaviyo ~0 (deferred); long tasks WPM 389 ms, fbevents 347 ms,
  Meta config 287 ms, theme.js 126 ms, perf-kit 119 ms, trekkie 106 ms. Observed (unthrottled) FCP 583 ms / LCP 696 ms; the
  simulated LCP (4.1 s) is inflated because every request that finishes before the observed LCP (WPM 80 KB, Subi 58, trekkie 35,
  perf-kit 26, Shop Pay 24, shop-js 21, theme Nunito fonts 90) is pulled into the LCP dependency graph. What remains is
  Shopify's analytics stack (WPM + trekkie + perf-kit) and the Meta pixel = an analytics trade-off, so the lh-whatif workflow
  measures it before anything ships: base / body-shim holding WPM+Meta+Subi until first touch or 5 s / 8 s / all third parties
  blocked (ceiling).
- 2026-09-25 fd16-280dce7 — LIVE 16:35 UTC (page-body only, 28 KB; app js / css unchanged). What-if Lighthouse (whatif-20260925T1558Z.md,
  mobile x3 per scenario): base 67/72/54 · body-shim also holding the Meta pixel until first touch or 5 s 87/90/61 (TBT 1,207 →
  176 ms) · all third parties blocked 85/80/78 (ceiling; LCP still 4-5 s). So TBT is the Meta pixel (fbevents + config ≈ 530 ms
  blocking) and LCP is our own hero swap: the poster only paints when its CDN request lands (observed LCP 300-840 ms vs FCP
  ~250 ms), and Lantern pulls every request/CPU task that finished before that paint into the LCP graph (4-7 s simulated).
  fd16: (1) the pre-hero poster is inlined as a WebP data URI (16 KB, q78, 720 px) — no request, paints with the HTML; the
  video takes its poster from the img via a one-line script; the poster preload is gone (the app still adopts the same node,
  verified in a local harness: LCP = the pre-hero img ~100 ms after FCP, no poster request, video poster set); (2) shim tier
  C holds connect.facebook.net (fbevents.js) until the first touch/scroll/key or 5 s — the channel pixel queues PageView in
  the fbq stub, AddToCart/InitiateCheckout are after a tap anyway. Trade-off to know: visitors who leave within 5 s without
  touching the screen no longer send a Meta PageView. Revert = tier C line in page-body. QA: r253 = 150/160 (every fd16
  check green: key, poster byte-identical sha a05560d1…, no poster request, fbevents absent at buy-box time / present after
  the clicks, PageView 1, AddToCart x lines 15-40 ms after the add, InitiateCheckout on checkout; the 10 fails were two
  pre-fd16 expectations) → r254 = 160/160. Lighthouse x5 on fd16 (16:41 UTC, lh-20260925T1641Z.md): mobile 62/83/84/83/68
  (median 83; FCP 2.0-2.7 s, LCP 3.3/3.4/3.5/5.0/5.7 s, TBT 180-510 ms, TTI 7.1-8.7 s), Facebook gone from the third-party
  table (was 250 KB / 558 ms blocking). Trajectory: fd14 38/50/72 → fd15 61/75/66/55/60 → fd16 62/83/84/83/68. The two
  low runs are runner-slow runs (observed FCP 0.9 s instead of 0.25 s) where the poster paints late and Lantern pulls the
  whole theme/app load into the LCP graph. What is left is not in the page body: theme scripts + Shopify WPM/trekkie/perf-kit
  (~1.1 s main thread, 80+35+26 KB), Subi SDK head tag (58 KB), theme Nunito fonts (90 KB), 300+ KB of Shopify JS before
  the LCP paint. Ceiling measured with ALL third parties blocked: 85/80/78.
  Lighthouse fd14-c3e1dc7 (15:19 UTC): mobile 38/50/72 (LCP 6.4/7.2/3.1 s, TBT 4,810/880/810 ms — runner variance;
  best run 3.1 s LCP), desktop 93/97/94 (LCP 1.1-1.5 s). Our files are all in flight by 1.1 s and done by 1.2 s; the
  page is bound by third parties: Facebook 249 KB / 416 ms blocking, Clarity 145 ms, Shopify web-pixels manager 1.4 s
  boot. Clarity Brand Agents (azurefd, 280 KB) no longer loads.
