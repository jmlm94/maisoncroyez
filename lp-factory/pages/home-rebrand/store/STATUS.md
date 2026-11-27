# New home page on the store
Owner, 2026-11-27: "Deploy the new home page please." (Shopify reconnected the same day; store confirmed as Maison Croyez
with get-shop-info before any write.)

## What is live
- Page https://maisoncroyez.com/pages/home-2 | Page gid://shopify/Page/164803412077 | title "Exhale the day" | key home1.
  Not linked from the menu. The store's front page "/" is unchanged (see below).
- The theme's header and footer stay. The theme's announcement bar is hidden on this page and the page's own bar shows.
- Build: `python3 ../build.py && python3 build-deploy.py <key>` -> mc-home.css, mc-home-app.js, page-body.html, files.json.

## Files in Shopify
- Styles: gid://shopify/GenericFile/47158470410349 -> mc-home_d0ac09a1-005c-476d-8722-e8803b478692.css
- Script: gid://shopify/GenericFile/47158474342509 -> mc-home-app_f34470c5-4798-4360-b62b-cac8c73edb36.js
  (Shopify added the ids to the names because Files already holds mc-home.css and mc-home-app.js from the October home
  test. Those two older files were not touched.)
- Video (generic files, served as video/mp4 with byte ranges): mc-home-hero-m.mp4 (…312045), mc-home-hero-d.mp4
  (…344813), mc-home-hero-m.webm (…377581).
- Pictures (MediaImage 47158470017133 … 47158470279277): mc-home-believe, -closing, -door-kits, -door-scents,
  -hero-poster-d, -hero-poster-m, -how-1, -how-2, -how-3 (.webp).
- Reused from the kits page: the fonts (mc-dkr-f-*), the scent boxes (mc-dkr-o-pick-*), the customer photos
  (mc-dkr-ugc-*), Patricia's photo (mc-dkr-o-patricia1.webp).

## To change the page later
build -> commit -> push -> fileUpdate the two generic files above with originalSource =
https://raw.githubusercontent.com/jmlm94/maisoncroyez/<commit>/lp-factory/pages/home-rebrand/store/<file> -> wait until
the CDN serves it -> pageUpdate with page-body.html only if the body changed -> edit the "run note" line in
.github/workflows/home2-shot.yml and push -> read shots/result.json.

## Live check (home2-shot, run 1)
Phone 390 and desktop 1440: status 200, no sideways scroll, 25 pictures and none broken, the hero video plays and the
pause button works, DM Sans and Roboto Mono loaded, h1 40 px / 84 px, section titles 32 px / 58 px, tiles the same size
(rooms 114x157 / 368x196, scents 85x152 / 279x115), no gap above the footer, no script errors.
The test browser has no H.264, so it played the WebM copy; phones and desktop browsers take the MP4.

## Not done
- The front page "/" still shows the old home page. Making this the front page needs the theme (its index template).
  The connector allows theme edits only on an unpublished copy and does not allow publishing; the owner publishes in
  Shopify admin.
- "Build my kit" goes to /pages/diffuser-kits-2, the test kits page, which still picks Crisp Citrus Scape as third best
  seller until the Euphoric Bloom switch is deployed there.
- The page's own footer form and links were dropped with the footer; the theme footer still has the old links
  ("Claim a Free Diffuser", "Fragrance Subscription").
