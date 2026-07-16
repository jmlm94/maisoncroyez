# Deploy status — offer v2

offer v2: store wiring + uploads done at 2026-07-16 19:19 UTC.
Cache key flipped fd4- -> fd5- at 19:25 UTC (owner waived the 25-min propagation wait).

Verify run 31 (19:25 UTC): INCONCLUSIVE — workflow crashed on old pick-3 selector
(.pq-b no longer exists), which is consistent with the v2 single-select page being live,
but no screenshots were captured.

Verify run 32 (triggered next): offer v2 selectors + performance audit
(3x throttled mobile lab LCP/CLS/TBT, CrUX p75 field data via PSI, asset transfer sizes).
Results will land in verify/ (verify-log.txt, perf-log.txt, psi-summary.txt, screenshots).
