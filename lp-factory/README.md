# Maison Croyez — Landing Page Factory

System for producing high-converting MC landing pages (pre-landers, listicles, advertorials, sales pages) from winner references. Built July 2026; first output: `/pages/maison-croyez-landing-page`.

## For a fresh Claude session — bootstrap
Read, in order: `brand-kit.md` → `blueprints/` → `src/app.js` (the CONFIG pattern + component library). Deploy constants (CDN file GIDs, theme/page GIDs, pixel) are in brand-kit.md. The Shopify MCP connector handles deploys; it is flaky — expect reconnects, and remember it CANNOT write to the published theme (Files/CDN + page creation only).

## Roles
- **Owner (Jose):** brings reference (full-page scroll PDF preferred), approves the Phase 1 spec, gives edit rounds on the artifact preview, drops media into the repo, approves ship. Never touches Shopify after initial template setup.
- **Claude:** analysis, spec, build, compression, deploy, verification.

## Per-page pipeline
1. **Intake** — Owner: reference PDF + one line ("listicle for Chilled Citrus, promo X, CTA to PDP"). Media goes to `lp-assets/<page-handle>/` — name files after their slot when possible.
2. **Phase 1 spec** — Claude: section map (reference → MC equivalent), copy angles, ambiguities. STOP for approval.
3. **Build** — on the component library (`src/`), new CONFIG per page. Every unverified claim flagged `[PLACEHOLDER]`; urgency/ratings gated `confirmed:false`.
4. **Preview loop** — artifact link; owner iterates in plain language ("stars gold, delete section X").
5. **Ship** — Claude builds bundles, pushes to Shopify CDN (staged upload → fileCreate/fileUpdate), creates the Shopify page via API, verifies template/page by API read-back. Owner points ads.

## Component library (src/app.js)
Hero (flat / dark-overlay / light-halo variants, A/B via ?hero=B) · announcement bar · transformation cards · how-to steps with autoplay video · intention map (7 scent gradient cards) · CTA breaks (plain/feature) · stat bars · offer block · founder letter · testimonial stack · quality ladder (bad-rungs + featured top) · FAQ accordion · sticky gradient CTA. New formats add components here permanently.

## Build commands (from src/)
- `python3 build.py` — bundles `../assets/processed/` into `images.js` (per its MANIFEST) and builds `preview.html`, a single-file preview of the whole page
- `vendor.js` = React 18 + ReactDOM + htm, prebuilt (re-fetch from registry.npmjs.org only if upgrading)
- `bash mkfonts.sh` — regenerate fonts.css from woff2 (only if fonts change)
- Deploy files = css (`fonts.css`+`styles.css` concatenated), `vendor.js`, `images.js` (media), `app.js` (code+copy) — uploaded to Shopify CDN under the mc-prelander-* names in brand-kit.md

## Deploy rail
Current: ONE Shopify page template (`page.pre-lander.liquid`, already live) loads the 3 JS bundles with hourly auto-versioning → fileUpdate on the CDN files goes live ≤1h with zero owner action.
**Planned upgrade (one-time, before page #2):** `shopify/page.mc-lp.liquid` — loads per-page bundles by `{{ page.handle }}` so ONE template serves unlimited pages. Migration: Claude stages `mc-lp-core.css`, `mc-lp-vendor.js` and per-page bundles on CDN first, owner pastes the new template once, Claude creates pages via API thereafter.

## Media rules
Square 1:1 everywhere. Claude compresses hard: photos → jpeg q68–74 ≤800px; video → mp4 h264 540px/24fps/no audio + webm vp9 twin (dual-source for codec coverage). Videos autoplay muted loop.

## Honesty rules
Real facts per brand-kit.md only. No invented stats, review counts, sold-out claims. Placeholders visibly flagged until replaced. Advertorial/listicle formats: revisit claims whitelist before scaling spend.
