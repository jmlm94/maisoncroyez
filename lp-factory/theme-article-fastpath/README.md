# Article fast path (2026-10-29)

Owner asked to speed up /pages/indoor-air-alerts (Lighthouse mobile 46–58, desktop 95–98) and to have it done for them.
API writes to the LIVE theme are blocked, so: duplicate of the live theme 187241169005 "MaisonCroyez — Speed round 3 (Claude)"
→ **188123349101 "MaisonCroyez — Article fast path (Claude)"**, with one line changed in layout/theme.liquid: `indoor-air-alerts`
added to the speed-round-3 landing-page list (theme.css off the critical path, store header hidden from the head, no
announcement-bar flash). `edited/layout/theme.liquid` is the uploaded file (md5 e89b711133f2963815a9670133b2a88b); the live
file is `../theme-speed3/edited/layout/theme.liquid` (md5 5f374e8fc3577656245f62c42439e87e).

To go live the owner publishes 188123349101 (Online Store → Themes → Publish). Rollback: publish 187241169005 again.

## Preview results (2026-10-29 20:33 UTC, ?preview_theme_id=188123349101)
- Page checks (shopify/preview-theme/report.json): article mounted at top 0 on phone / small / desktop, store header + footer
  hidden, 14/14 images, fonts loaded, no JS errors, sticky bar correct, offer button lands on /pages/diffuser-kits.
- Lighthouse 3x (adv-kits/perf-preview/lh-20261029T2033Z.md): mobile 63 / 66 / 69 (live theme: 46 / 58 / 54), TBT 420–470 ms
  (was 680–1,700), LCP 4.3–6.2 s (was 6.3–7.0); desktop 91 / 96 / 97. Filmstrip: no announcement-bar flash any more; the
  black bar at the bottom of the frames is Shopify's preview bar, which only exists in preview.
