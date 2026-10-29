# Article fast path (2026-10-29)

Owner asked to speed up /pages/indoor-air-alerts (Lighthouse mobile 46–58, desktop 95–98) and to have it done for them.
API writes to the LIVE theme are blocked, so: duplicate of the live theme 187241169005 "MaisonCroyez — Speed round 3 (Claude)"
→ **188123349101 "MaisonCroyez — Article fast path (Claude)"**, with one line changed in layout/theme.liquid: `indoor-air-alerts`
added to the speed-round-3 landing-page list (theme.css off the critical path, store header hidden from the head, no
announcement-bar flash). `edited/layout/theme.liquid` is the uploaded file (md5 e89b711133f2963815a9670133b2a88b); the live
file is `../theme-speed3/edited/layout/theme.liquid` (md5 5f374e8fc3577656245f62c42439e87e).

To go live the owner publishes 188123349101 (Online Store → Themes → Publish). Rollback: publish 187241169005 again.
