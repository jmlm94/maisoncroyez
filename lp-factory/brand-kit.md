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

## Honesty gates
Unverified content ships flagged `[PLACEHOLDER]` in CONFIG; urgency/scarcity and numeric ratings ship `confirmed:false` until the owner literally confirms. Currently still placeholder ON THE LIVE PAGE: 3 transformation quotes, Whitney P. testimonial, Jasmine T. completion, Patricia's letter.
