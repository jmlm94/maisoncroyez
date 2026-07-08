# Maison Croyez — LP Brand Kit
Single source of truth for every landing page. A fresh Claude session should read this file first.

## Design tokens
- **Palette:** base white `#FFFFFF` · blush `#ECDFDE` · blush-soft `#F3EAE8` · rosewood `#C4A59F` · rosewood-deep `#8A5B52` · cream `#F9F5F0` · ink `#241C18` · footer `#1E1613`
- **Signature gradient (emphasis words, stat bars, sticky CTA):** `linear-gradient(92deg,#7C3AED 0%,#C0589B 48%,#F59E0B 100%)` — brighter variant for dark grounds: `#C9A9F9 → #F2A9CB → #FFC46B`
- **Blush-gold gradients** (feature bands, guarantee badge): see `src/styles.css` `--grad-values`, `--grad-badge`
- **Stars:** always yellow gold `#F5B301`
- **Type:** Unna 700 (headlines; one *italic gradient emphasis phrase* per headline; letter-spacing −.05em; line-height .92) · Outfit 700 caps wide-tracked (eyebrows/CTAs/labels) · Be Vietnam Pro (body). Embedded as woff2 data-URIs in `src/fonts.css` (regenerate: `src/mkfonts.sh`).
- **Headline punctuation:** every main headline ends with `.` `:` or `?`
- **CTAs:** solid black pill, white Outfit caps, label always ends with ` ➔`. Sticky bottom bar = the one gradient CTA. Every CTA links to the PDP.
- **Icons:** native emoji only (no SVG icon sets). All content images square 1:1.
- **iOS rule:** never `overflow-x:hidden` on body — use `overflow-x:clip` (breaks position:fixed on iOS Safari otherwise).

## Voice
Elegant, warm, intimate — a woman speaking about the home she's building. Spiritual but grounded: manifestation journal meets boutique hotel. Short sentences, sensory verbs, never cheesy. Assured, not loud.

## Verified facts (usable as-is)
- Loved by 2,500+ women across the U.S. (numeric star-rating NOT confirmed — keep gated)
- 90-Day Risk-Free Trial · Lifetime Warranty · Free Shipping
- Waterless diffuser, one-button G1/G2/G3, fills a room in <10 minutes
- 100ml bottles; lasts 10x longer; ≥30 days continuous diffusion per bottle
- Hypoallergenic · pet-friendly · flame-free · 100% organic oils
- Promo (confirm still live before each page): "Free 100ml fragrance for every diffuser ordered today"
- **Do NOT use "Made in France" as a claim** (removed on request; soft "French perfumery" narrative allowed)
- Modes: G1 Subtle (10s/220s pause) · G2 Balanced (20s/120s) · G3 Full Presence (25s/60s)

## Kits (PDP pricing)
Studio $89.95 (1+1) · Condo $189.95 (3+3) · House $289.95 (5+5, best value)

## Fragrances (transcribed from printed boxes — authoritative)
| Fragrance | Intention | Notes |
|---|---|---|
| Honey Nectar | Turn Ideas Into Reality | Ginger Milk · White Birch · Eucalyptus Honey |
| Golden Blossom Harmony | Love | Buttercup · Honeysuckle · Sunflower |
| Euphoric Bloom | Raise Energy | Jasmine Tea · White Peach · Sandalwood Crème |
| Crisp Citrus Scape | Abundance | Yuzu Leaf · Green Mandarin · Cypress |
| Wildwood Mystique | Purification | Huckleberry · Wild Juniper · Mountain Fern |
| Chilled Citrus | Relaxation & Concentration | Chilled Lavender · Eucalyptus · White Citrus |
| Midnight Sensation | Love Manifestation | Moonflower · Night Lily · Skin Musk |
Per-scent card gradients: see `intentionMap.fragrances[].grad` in `src/app.js`.

## Constants
- PDP (all CTAs): `https://maisoncroyez.com/products/diffuser-scents`
- Meta Pixel ID: `980908600592309`
- Store: maisoncroyez.com · live theme `MaisonCroyez-x-ConvertMate/main` = `gid://shopify/OnlineStoreTheme/134636273773`
- Live page #1: `/pages/maison-croyez-landing-page` (gid://shopify/Page/117070430317, templateSuffix `pre-lander`)
- CDN files (fileUpdate keeps URL, bumps ?v):
  - css `gid://shopify/GenericFile/29275754856557` → `.../files/mc-prelander.css`
  - vendor `gid://shopify/GenericFile/29275754889325` → `.../files/mc-prelander-vendor.js`
  - assets `gid://shopify/GenericFile/29275754922093` → `.../files/mc-prelander-assets.js`
  - app `gid://shopify/GenericFile/29275754954861` → `.../files/mc-prelander-app.js`
- Live template auto-versions the 3 JS bundles hourly → fileUpdate changes go live ≤1h, no template edits.
- **mc-lp rail (multi-page, deployed 2026-07-04):** loads `mc-lp-core.css` + `mc-lp-vendor.js` + per-page `mc-lp-<handle>-assets.js` / `mc-lp-<handle>-app.js`, hourly auto-versioned.
- **LP #2 ships via BODY-EMBED (live, verified by screenshot):** the Shopify connector blocks live-theme writes, so the page BODY carries the loader: stylesheet link + `#root` + Meta pixel + a takeover script that hides the theme chrome and loads the bundles. Deployed via pageUpdate, zero theme edits. UPGRADE PATH: if the owner ever pastes `lp-factory/shopify/page.mc-lp.liquid` as `templates/page.mc-lp.liquid` (liquid, not JSON), the page's templateSuffix `mc-lp` takes over automatically (cleaner: layout none, noindex) and the body loader becomes inert. New pages can reuse the body-embed pattern verbatim.
- **Verification rail:** `.github/workflows/verify-lp.yml` (GitHub Actions has open egress; the sandbox doesn't) curls the CDN + page and commits a full-page Playwright screenshot to `pages/<handle>/verify/`. Trigger by pushing any edit to the workflow file. `fetch-lp-assets.yml` does the same trick for pulling generated media into the repo.
- Live page #2: `/pages/adv-scent-ritual` (gid://shopify/Page/117105819757, templateSuffix `mc-lp`, advertorial Blueprint 002)
- Live page #3: `/pages/diffuser` (gid://shopify/Page/117264089197, DEFAULT template — renders INSIDE theme layout per owner; body-embed loader, deployed 2026-07-08). Cold-traffic PDP, Blueprint 003. Real cart: diffuser 45216681590893 + chosen fragrance variant on Subi selling plan 1605206125 -> /cart.
  - Theme wraps page body in `.prose` (h1 `.page > h1.h1.text-center` hidden via inline body style). ALL page CSS selectors are `#root`-prefixed (build step) so theme `.prose` rules can't override; body carries `#root` full-bleed breakout inline.
  - Loader version key: `'r9-'+hour` (bump rN via pageUpdate on every fileUpdate). LESSON: Shopify file origin takes ~5 min to propagate after fileUpdate — bump rN, then WAIT 5 MIN before verifying, or the new key caches the old bytes at the edge.
  - LESSON: deploy/ bundle copies must be REGENERATED from src on every deploy (round-14 shipped a stale copy). The CSS prefixer must handle spaceless `@media(...)` blocks (fixed 2026-07-08).
  - Gallery = custom carousel matching the theme's native product media (mobile: full-bleed swipe + dots; desktop: left thumb rail + round arrows). The theme's real product section can't be embedded on a page without manual theme-editor work. — bump the `rN-` counter via pageUpdate on every fileUpdate for INSTANT cache-bust (hourly key alone can be poisoned by a pre-update request in the same hour).
  - Cart wiring verified LIVE 2026-07-08 (Actions relay): POST /cart/add.js -> diffuser $89.95 one-time + fragrance $29.95/mo on plan 1605206125, cart total $119.90. Subi first-order-free applies at checkout; owner test checkout still pending.
  - ATC opens the theme cart drawer (Impact): `document.dispatchEvent(new CustomEvent('cart:refresh'))` + `#cart-drawer.show()`, /cart fallback. Verified live by clicking ATC on a runner 2026-07-08.
  - Headline emphasis AND the Top Seller badge are SOLID PURPLE #7C3AED on this page (owner rulings 2026-07-08, no gradient text/badge). Native-gallery experiment reverted same day; rounded gallery + thumb row stays.
- mc-lp-diffuser CDN files (fileUpdate keeps URL, bumps ?v):
  - css `gid://shopify/GenericFile/29317693440109` -> `.../files/mc-lp-diffuser.css` (fonts + page styles + theme-integration block; core css NOT used to avoid adv style collisions)
  - assets `gid://shopify/GenericFile/29317693472877` -> `.../files/mc-lp-diffuser-assets.js`
  - app `gid://shopify/GenericFile/29317693505645` -> `.../files/mc-lp-diffuser-app.js`
- mc-lp CDN files (fileUpdate keeps URL, bumps ?v):
  - core css `gid://shopify/GenericFile/29282275131501` → `.../files/mc-lp-core.css`
  - vendor `gid://shopify/GenericFile/29282275164269` → `.../files/mc-lp-vendor.js`
  - assets `gid://shopify/GenericFile/29282275197037` → `.../files/mc-lp-adv-scent-ritual-assets.js`
  - app `gid://shopify/GenericFile/29282275229805` → `.../files/mc-lp-adv-scent-ritual-app.js`
- NOTE: `mc-lp-core.css` currently carries adv-scent-ritual page styles too — split shared vs per-page CSS before LP #3.

## Honesty gates
Unverified content ships flagged `[PLACEHOLDER]` in CONFIG; urgency/scarcity and numeric ratings ship `confirmed:false` until the owner literally confirms. Currently still placeholder ON THE LIVE PAGE: 3 transformation quotes, Whitney P. testimonial, Jasmine T. completion, Patricia's letter.

## Owner rulings — 2026-07-04 (LP #2 audit vs Project Heart PDF)
Project Heart (May 2026) claims to supersede other docs, but the owner ruled for LP work:
- **Intentions:** the PRINTED BOXES win (Golden Blossom Harmony = Love). Project Heart's map (Golden Blossom = Peace, etc.) is NOT used on pages.
- **Offer stack:** page claims stand — lifetime warranty, 90-day risk-free on the kit, free 100ml fragrance promo, Bundle & Save packs. Project Heart's stack (1-yr warranty, scents-only refund) is outdated.
- **Voice on LPs:** Project Heart bans apply EXCEPT emojis (emoji chips/icons stay, matching live PDP). No em dashes in copy, "it's not X, it's Y" framing limited to the 2-3 strongest lines per page, no fake urgency ("limited time" softened).
