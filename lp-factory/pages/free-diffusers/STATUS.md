
## Deploy log
- 2026-09-19 fd1-6b26d32 — LIVE. Product 8277082341485 (variants 45900240257133 / 45900240289901 / 45900240322669),
  GenericFiles mc-fd-app.js 30137393119341 + mc-fd.css 30137393152109, Page 120358797421 /pages/free-diffusers (published).
  QA: drawer-recon r224 (5 paths, real carts + checkout) → recon/r224/.
- 2026-09-19 fd2-7516c8f — LIVE. Fixes from r224 + Lighthouse: keyed Fragment per step (r224 found the step-2
  "Review my kit" navrow surviving into step 3 → two .btn.atc; same bug class exists on the live v3 page as a stale
  pick-count line), and a poster <img id="mc-hero-p"> under the pre-hero video so the LCP candidate paints at FCP
  instead of at the video's first frame (LH mobile 68/48/48, LCP 3.2/7.6/7.8 s). QA: r225. Perf: lh-live re-run after.
