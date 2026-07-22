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
