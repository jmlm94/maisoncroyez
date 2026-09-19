# Sitewide cart drawer — deploy status

**LIVE.** Theme "MaisonCroyez — Sitewide Drawer (Claude)" (gid://shopify/OnlineStoreTheme/149076607085)
published by owner 2026-08-12 ~12:16 UTC. Includes the homepage redesign AND the owner's
font/announcement-bar/header edits (synced from theme 149057536109 just before publish:
config/settings_data.json checksum-identical; sections/header-group.json semantically identical,
rendering verified live — run 34, 9/9 PASS).

## What it is
mc-drawer.js (GenericFile gid://shopify/GenericFile/29651366445165, CDN files/mc-drawer.js)
loaded on EVERY page by a 6-line loader in layout/theme.liquid (cache key dr1-+UTC hour).
Extracted from the free-diffuser LP drawer (round 27), generalized:
- Title: "Congrats, your order is reserved! ✓" when cart has items, else "Your cart".
- FREE label on diffuser lines only for subscription carts.
- "Attention/Only 19 free diffusers" urgency rewrite only when a diffuser line is in the cart
  (NOTE: the base "Attention: Only 19 free diffusers left..." text is a THEME SETTING shown
  sitewide — pre-existing; edit in theme customizer if unwanted).
- First-run-wins guard window.__mcDrawer: page-local copies (free-diffuser LP fd44,
  the-scent-story ss19 — both updated to the new title) never fight the global script.

## Verification
run 32 (preview): 15/16 PASS via real ATC clicks (the one FAIL was the pre-existing theme
urgency text, see NOTE). Cart POSTs from Actions runners get 429-throttled under
preview_theme_id — verify with real UI clicks, never raw fetch.

## Rebuild
Edit lp-factory/sitewide-drawer/mc-drawer.js (or regenerate from LP src/app.js drawer block),
commit, fileUpdate the GenericFile with SHA-pinned raw URL, bump dr1→dr2 in
layout/theme.liquid (theme is now LIVE = API writes blocked; edit via a duplicate + publish,
or Shopify admin code editor).

## Rollback
Remove the loader from layout/theme.liquid (admin code editor), or republish a prior theme.

## 2026-09-05 — drawer copy cleanup (GenericFile 29651366445165 <- raw@1ec9b23, 6,680B)
Live source is lp-factory/pages/kits-lp/deploy-ready/mc-drawer.js (this folder's copy
now synced). Removed: the "Founder's Offer: +1 mystery scent added..." rewrite (the theme's
"Attention: Only 19 free diffusers" line is now hidden instead), the "Safe For Kids & Pets"
badge (-> "Free Shipping"), and the "safe around my cat" clause in the Diane R. review.
r177 live (key dr1-2026090519): mystery=false, kids=false, cat=false, badges = Money-Back /
Lifetime Warranty / Free Shipping, total $89.95 on the v3 default kit, 0 errors.
Screenshot verify/drawer-clean-v3.png.

## 2026-09-14 — Qty + variant line (GenericFile 29651366445165 <- raw@2cefb8c, 7,670B)
Each line now shows a "Qty N" pill and the variant title (e.g. "2 Diffusers + 3 Scents") under the
product title, built from /cart.js (matched by position, then by product title). Verified r207 with a
real ATC on the live page: Midnight ×1 $0.00, Golden Blossom ×2 $0.00, Special Kits "2 Diffusers + 3
Scents" $119.95, total $119.95 (refill plan). Goes live sitewide at the next UTC hour flip (dr1- key).

## 2026-09-19 — Free-shipping progress bar + "Frequently added together" (GenericFile 29651366445165 <- raw@dc78653, 12,515 B / 4.6 KB gz)
Owner request. The static "FREE SHIPPING UNLOCKED" bar is now live: reads cart.js total_price against FREE_AT=75 —
below: amber "🚚 You're $X away from FREE shipping" + progress + "Add N more scent(s) and shipping is on us."; at/above:
green "✓ FREE SHIPPING UNLOCKED — SHIPS IN 24H 🕝" (class mc-done). New .mc-fa block after the line items: the scents not
yet in the cart (7 variants, product featured images &width=200, lazy) with "+ Add · $49.95" -> POST /cart/add.js one-time,
cart:refresh, row + bar update in place. Testimonial moved below the row. Verified against a stubbed drawer + cart API
(scratchpad pw/drawer-live.mjs): $49.95 cart -> "$25.05 away", 6 cards; add -> UNLOCKED, 5 cards; $99.90 cart -> UNLOCKED.
Theme loader key is dr1-<UTC hour>, so browsers pick the new file up within the hour; live QA = drawer-recon r231 (>= 23:00 UTC).
Note for the LP pages: the cart-drawer add is one-time (a plan add would be $0 today and would not move the bar).
r231 (22:42 UTC, before the hourly key rollover) confirmed the cache caveat: the runner received the previous script
(old static bar, no .mc-fa). Page checks all passed (fd6). r232 waits for 23:01 UTC on the runner, then re-checks.
2026-09-19 23:2x — owner iPhone report: whole drawer content wider than the viewport (bar + testimonial cut off) and Add
buttons left-aligned white. Cause: the theme drawer body is a grid; the horizontally scrolling row contributed its full
intrinsic width. Fix (raw@066b335): .mc-fa{min-width:0;max-width:100%;contain:inline-size}, row width/max-width 100%,
cards flex-column with the button pinned to the bottom, button black #111 / white, flex-centered. Reproduced + verified
with a grid-body stub (pw/drawer-grid.mjs: scrollWidth == clientWidth).
