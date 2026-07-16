# Deploy status — offer v2

Offer v2 wiring + design: LIVE and verified (run 32, 19:28 UTC): h1/price/single-select
correct; cart = 1 fragrance $39.95 on plan 2627895405 + diffuser $120 -> $0 by
"Free Diffuser — 90-Day Manifestation Ritual"; total $39.95.

Perf audit (run 32, Slow-4G/4x-CPU lab, median of 3): TTFB 30ms, FCP 436ms,
LCP 15.9s, CLS 1.18, TBT 1.1s, 3.95MB/190 reqs. CrUX p75 blocked by PSI quota.

Perf round 1 (uploaded 19:50 UTC, zero visual change):
- fonts subset + de-inlined to 9 CDN woff2 files (CSS 189KB gz -> 13KB gz)
- videos lazy-load via IntersectionObserver (autoPlay was defeating preload=none)
Waiting origin propagation; next: flip cache key fd5- -> fd6-, verify run 33
(re-measure + CLS source attribution + font checks).

Theme baggage (needs owner/theme change, out of scope here): ~1MB Merriweather
(3 x 330KB, unused by LP), ~1MB theme PNGs, 200KB+ theme JS.
