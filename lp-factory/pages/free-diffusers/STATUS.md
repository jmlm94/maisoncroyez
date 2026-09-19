
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
