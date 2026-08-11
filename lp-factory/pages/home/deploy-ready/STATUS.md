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
