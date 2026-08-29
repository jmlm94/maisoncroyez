# Homepage redesign — deploy status

**State: STAGED on unpublished theme — awaiting one-click Publish in Shopify admin.**
(API cannot publish themes; connector safety policy blocks `themePublish`.)

## What's live where
- Unpublished theme: **"MaisonCroyez — Home Redesign (Claude)"** — `gid://shopify/OnlineStoreTheme/149057536109`
  (duplicated via `themeDuplicate` from live theme 134636273773 "MaisonCroyez-x-ConvertMate/main")
- Theme edits (only 2 files touched on the duplicate):
  - `sections/mc-home.liquid` — `#root` div + hour-keyed loader, cache key **hm3-**+UTC hour
  - `templates/index.json` — single section `mc-home` (replaces Instant section `instant-6Y4VQfPlqLQX27j6`)
- CDN bundle (GenericFiles, URL stable, update via fileUpdate + bump hm key):
  - mc-home.css — GID `gid://shopify/GenericFile/29644413763693`
  - mc-home-app.js — GID `gid://shopify/GenericFile/29644413796461`
- CDN images: mc-home-card1/2/3.jpg, mc-home-mani.jpg, mc-home-testa/b/c/d.jpg (MediaImage, uploaded
  via fileCreate from raw.githubusercontent URLs); reuses mc-kb-hero.jpg + mc-kb-frag1..7.jpg + mc-kb-logo.png.

## Chrome ownership (important!)
The **announcement bar + header come from the theme's Instant header-group sections** and render on
every page — they are NOT part of the index section. The bundle must NOT render its own abar/header/footer
(v2 shipped them and the preview showed duplicates; v3 strips them — keep it that way).
The mock (`src/make-home-mock.py`) still renders abar/header/footer for artifact preview only.

## Rebuild procedure
1. Edit `../src/make-home-mock.py` (single source of truth) → `python3 build-home.py`
2. Commit + push; `fileUpdate` both GenericFiles with SHA-pinned raw.githubusercontent originalSource
3. Re-upsert `sections/mc-home.liquid` bumping hm3 → hm4 (cache bust)
4. Verify via drawer-recon workflow on `https://maisoncroyez.com/?preview_theme_id=<theme id>`

## Publish (manual, 1 click)
Shopify admin → Online Store → Themes → "MaisonCroyez — Home Redesign (Claude)" → **⋯ → Publish**.

## Rollback
Re-publish the previous theme "MaisonCroyez-x-ConvertMate/main" (kept untouched).

## Verification
run 26: 25/25 PASS desktop + mobile, 0 JS errors, 0 broken images — log + screenshots in `../verify/`.
Links wired: hero CTA + seven-section CTA + Subscribe Now → /pages/build-your-kit; cards →
/pages/free-diffuser, /products/diffuser-scents, /collections/power-fragrances.

## Homepage adapted to Six-Month Program + banner restyle (2026-08-29, owner request)
mc-home-app.js (gid 29644413796461) copy sweep:
- Hero check "A FREE scent with every diffuser" -> "Founder's Offer: +1 free mystery scent
  with your kit."; "$1.33 a day" -> "$1.10 a day"; trust "30-day money-back" -> "6-month".
- Card 1 is now The Six-Month Program (chip "+1 mystery scent free", program copy with
  from $199 / $49.75-mo Shop Pay, CTA "Start Your Program").
- Card 3 subscription references removed ("Subscribe & save 25%" -> "All 7 intentions").
- Seven-scents section: program copy, CTA "Build My Kit" -> "Start Your Program",
  "90-Day Risk-Free Trial" -> "6-Month Money-Back Guarantee".
- Testimonial "Verified Circle Member" -> "Verified Buyer"; "$90" price anchor removed.
- Buy section: "FREE scents worth $119.85" -> "The full Six-Month Program. +1 mystery
  scent free."; note -> "Founder's Offer & program pricing".
Sitewide banner (theme announcement-bar section, via mc-drawer.js gid 29651366445165):
- Text -> "If your home doesn't feel different and powerful, we'll take it all back —
  anytime in your first 6 months." (was 30 days).
- Style -> brand blush #ECDFDE, gradient removed, rosewood #5B4437 600-weight text.
Both files hour-keyed (hm3-/dr1-): live at the 22:00 UTC flip. Verify r127 after flip.
