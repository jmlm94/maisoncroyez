# Deploy status — offer v2 + perf round 1

## Offer v2 (DONE, verified live)
- Subi "Plan 3" 2627895405 wired; duplicate diffuser variant 45450822778989 at $120.00;
  BXGY 1375641600109 unlocks with 1 subscription fragrance.
- Verified end-to-end (runs 32/34/35): single-select picker, ATC, cart = 1 fragrance
  $39.95 on plan 2627895405 + diffuser $120 -> $0, total $39.95.

## Performance round 1 (DONE, verified live — run 35 vs run 32, Slow-4G/4xCPU mobile lab, median of 3)
- LCP  15.9s  -> 5.0s   (-69%)
- CLS  1.18   -> 0.0009 (fixed; was late-CSS render shift)
- TBT  1.12s  -> 0.79s
- Full load 18.4s -> 10.0s; transfer 3.95MB -> 2.52MB during load
- How: render-critical CSS 189KB -> 11-13KB compressed (fonts subset via pyftsubset and
  de-inlined to 9 CDN woff2 files mc-lp-f-*.woff2, GenericFiles 293940275/6/7/8/9xx);
  videos lazy via IntersectionObserver + post-load idle fallback (LazyVid).
- Cache key: loader still fd6-+hour (hourly rollover picked up new bytes; fd7 flip unnecessary).
- CrUX p75 field data (lcp75/inp75/cls75): PSI anonymous quota exhausted all day — page-level
  CrUX likely absent anyway (page is new). Retry when quota resets; lab INP proxy healthy (<=64ms).

## Next lever (needs owner decision — theme, out of scope this session)
- LCP element is the hero image (58KB, but 4.6s on Slow-4G due to contention from theme baggage):
  3x Merriweather fonts ~330KB EACH (~1MB, unused by the LP), ~1MB theme PNGs, hydrate.js 204KB.
  A lighter page template / theme font change would push LCP toward ~2.5s.

## Content round 2 (2026-07-22, verified live — run 36, fd7 key)
- New H1: "Maison Croyez Manifestation & Attraction Organic Scents — Award-Winning Diffuser included for free."
- ATC buttons #0A9400 / white; subline "This offer ends today" (was booklet line)
- Removed: value-stack footnote, early-cancellation term row, Pet-Friendly + Free Shipping icons
- Funnel re-verified: cart = fragrance $39.95 on plan 2627895405 + diffuser $120 -> $0, total $39.95
- Preview artifact 277243ec updated to match

## Offer v3 — multi-diffuser (DEPLOYING 2026-07-29 — owner go received)
Preview: artifact 277243ec (label per-diffuser-copy). Code in repo (src/ = deploy source).
Features: 1/2/3 free-diffuser selector (Most Popular on 2), pick-N fragrances with
repeatable scents (xN stepper), dynamic price/value-stack/free-line/ATC, per-diffuser
copy in terms + FAQs, cart sends N fragrance bottles on plan 2627895405 + diffuser qty N.

Owner content round (2026-07-29, in this deploy): vessel qty icons, downgrade resets
picks, Midnight Sensation top seller (Euphoric Bloom badge off), new top-3 buyer-reason
bullets, bullets above value stack, gold Most Popular chip, ATC sub "Only 79 free
diffusers left!", intention heading "Love? Relaxation? Abundance?..."

LAUNCH CHECKLIST (on owner go):
1. [DONE 07-29] Rebuild deploy CSS: patched deploy-ready css + new qtysel/qpop/pqb rules from src/styles.css
   (deploy css carries ~2.5KB round-13/14 fixes NOT in src — patch, do not regenerate).
2. [DONE 07-29] cp src/app.js -> deploy-ready/mc-lp-free-diffuser-app.js
3. [DONE 07-29] discountAutomaticBxgyUpdate 1375641600109: usesPerOrderLimit 1 -> 3 (else only 1 of N zeroed).
4. [DONE 07-29] (variant untracked -> cannot block; price drift 119.95 found and reset to 120.00) Check inventory on duplicate diffuser variant 45450822778989 (orders can pull 3).
5. [DONE 07-29, both 201 + READY] stagedUploadsCreate + curl + fileUpdate (GenericFiles 29348024909933 css / 29348024942701 js).
6. Wait ~20 min propagation, flip page 117412692077 cache key fd7- -> fd8-.
7. Trigger verify run 37; check cart: N bottles on plan + N diffusers all at $0, total 39.95*N.


## Offer-clarity rework (DEPLOYED 2026-07-30, fd12 key)
Fixes checkout-shock leak (ATC high, checkout completion ~25-30%).
- Price row: $39.95/mo + badge "3-Month Commitment · Return & Cancel Anytime*"
- Value stack footer: "3-month commitment if you love it. Return right away + full refund if you don't."
- How-it-works timeline BELOW ATC (replaces icon terms rows): Today / Months 2-3 /
  After month 3 / gold 30-Days money-back guarantee row
- All guarantee copy 90 -> 30 days (owner correction); refunds cancel the subscription
- Sticky bar price scales with diffuser count + /mo (was hardcoded $39.95)
- Owner applying via language editor: drawer terms line under total, checkout
  subscription strings; Subi plan rename "Monthly Scent Drop · $39.95/mo · 3-month min"
- Verify: run 44


## OFFER V4 — THE MANIFESTATION RITUAL (DEPLOYED 2026-07-31, fd17 key)
Replaces the 3-month commitment offer entirely.
- Two options: The Manifestation Ritual ($49.95 today + every 45 days, Subi
  Plan 4 gid 2661875821, no minimum, cancel anytime, '#1 most ordered!')
  vs One-Time Set (displayed $139.95; cart charges $49.95 scent + $89.95
  diffuser = $139.90, no plan, no discount)
- H1 em: 'FREE Award Winning Diffuser.'; subline 'No commitments...'
- Store side: all 7 fragrances $49.95 + Plan 4 attached; diffuser dup
  45450822778989 at $89.95; BXGY 1375641600109 unchanged (subscription-only,
  zeroes diffuser for ritual carts only)
- 1-Year Warranty everywhere (lifetime removed); 30-day guarantee verbatim;
  buybox FAQ = owner's 6 questions
- KNOWN NICKEL: page displays One-Time Set $139.95, cart totals $139.90
  (components). Direction favors customer; owner aware.
- Verify: run 49 (v4 walkthrough: both cart paths, cart cleared between)
