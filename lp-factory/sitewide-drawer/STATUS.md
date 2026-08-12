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
