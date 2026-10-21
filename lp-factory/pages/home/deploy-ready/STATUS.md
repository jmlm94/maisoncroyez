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

## Banner copy swap (2026-08-29, owner request)
- Sitewide announcement bar text -> '8 out of 10 customers said "WOW" as soon as they
  turned their diffuser on for the first time.' (style unchanged: blush #ECDFDE,
  rosewood text). Via mc-drawer.js (gid 29651366445165); live at the 23:00 UTC dr1 flip.

## Home hero redesign + stale-offer sweep (2026-09-05, owner request)
Audit (r181, commit db92f4f^): no JS errors, no broken images, every same-origin CTA/footer
link 200. Only "off" items were copy: hero bullets still sold "+1 free mystery scent",
card 1 was "The Six-Month Program from $199", guarantee said "6-Month Money-Back",
seven-scents section said "six months of fragrance, one payment", buy section repeated it.
Changes (mc-home-app.js gid 29644413796461, mc-home.css gid 29644413763693, commit db92f4f):
- Hero = rating line (4.7 ★ / 124 reviews, same figures as the Founder's Offer page) +
  H1 (unchanged) + one-line sub + single CTA "Shop the Founder's Offer" + image.
  Removed the three ✓ bullets and the shipping/guarantee/warranty strip from the fold.
- Card 1 -> "The Founder's Offer" ($69.95 / $89.95 with 2 scents / $129.95 with 3;
  chip "2 FREE scents with 2 diffusers"); CTA -> six-month-program page.
- 6-Month Money-Back -> 90-Day Money-Back Guarantee; social-proof line -> "4.7/5 from
  124 verified reviews"; seven-scents + buy-section copy no longer mention the program.
CDN: fileUpdate from raw@db92f4f, both READY, sizes 16140 / 14117 match local.
Hour-keyed (hm3-): live at the 21:00 UTC flip. Verify: r182.
Not changed (flag to owner): "100% Organic from France", "hypoallergenic … family and
pets", "Made in France", "2,500+ homes" claims; Amazon / TikTok Shop cards link to "#";
footer "Fragrance Subscription" link is the theme footer; diffuser product still $89.95.

## Home hm4 (2026-10-21, owner request: "what would you change?" → "All claims are valid, please start" → round 2 → "Deploy both")
Rebuilt around the free-diffusers offer, two preview rounds on the artifact (7bnHM4QCiuowehSdkkXP5v) before the deploy:
- Hero: rating line, H1 "It’s time to make your spaces look, feel and smell great.", three badges (🌿 Organic & hypoallergenic
  scents / 🕯️ Say goodbye to candles, sprays and plug-ins. / 🧘 Reduce stress, anxiety and brain activity.), the promise line
  ("Our promise: if your home doesn’t look, feel and smell different within 30 days, we take everything back and refund every
  dollar."), one dark CTA "Get my free diffusers" → /pages/diffuser-kits, picture = the kits step-3 image (1600×900, `height:auto`).
  Spacing tightened in round 2.
- Statement unchanged. "Start here" = the three collection cards again: Diffuser Kits → /pages/diffuser-kits, Diffusers →
  /products/maison-croyez-home-scent-diffuser (the only active diffuser product), Scents → /collections/power-fragrances.
- "Why 2,500+ homes choose Maison Croyez" heading smaller; the six rows unchanged apart from the price-free "finest retreats" line.
- Seven scents: the botanical square tiles from the kits page (same size, names on two lines), sub "Pick the scents for your
  diffusers: 2, 3 or 5 depending on the kit, $39.95 each…", CTA → kits, trust strip (30-Day Money-Back Guarantee / Lifetime
  Warranty / Free Shipping / Made in France).
- Testimonials: Kate D. feature + three snaps; FAQ: the nine kits questions; manifesto unchanged; closing band "Ready? The
  diffusers are on us." The Amazon / TikTok Shop section (links were "#") is gone until real URLs exist.
Deploy (Maison Croyez verified): fileUpdate 29644413796461 (mc-home-app.js) + 29644413763693 (mc-home.css) from raw @ 9efc817,
both READY 19:13:40Z, sizes 14,504 / 22,228 on re-query (the mutation echoes the previous sizes). Hour-keyed (hm3-): live at the
20:00 UTC flip. Verify: home-shot after the flip. Flag to owner: the "Diffusers" card target; "banner" was read as the hero
picture (the sitewide announcement bar is unchanged).
Verified after the flip: home-shot 20261021T2002 — phone and desktop show hm4 (new hero, badges, promise, CTA, three cards,
botanical scent tiles, FAQ, closing band), 0 JS errors, CTAs → /pages/diffuser-kits ×4, /products/maison-croyez-home-scent-diffuser,
/collections/power-fragrances; the theme announcement bar + header sit above the hero (phone 62 + 57 px, desktop 49 + 99 px).
