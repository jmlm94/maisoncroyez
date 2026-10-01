# Instant page builder removal — status (2026-10-01)

Live theme: "MaisonCroyez — Sitewide Drawer (Claude)" id 149076607085 (MAIN). App "Instant AI Page Builder" uninstalled by the owner 2026-10-01 (confirmed gone from appInstallations).

## What Instant still rendered on the live theme before this work
- templates/product.json (DEFAULT product template) = section instant-SNQqz8AewZQLLRRB -> all 7 scents (explicit suffix instant-SNQqz8AewZQLLRRB), diffuser-scents (default).
- Diffuser PDP maison-croyez-home-scent-diffuser: suffix instant-lf6ljdl1MtYsbmA3.
- templates/collection.json (DEFAULT collection template) = section instant-FivQPNePBDqFaeAf.
- Pages page-1 ("NewHome"), landing-1 ("ES PDP KIT, NO USAR"), landing-2, landing-3: Instant page templates, empty bodies.
- 74 theme files (30 assets/instant-*.css, 31 sections/instant-*, 13 templates/*.instant-*), ~4.5 MB. App embed instant_core already disabled in settings_data. layout/theme.liquid had a small instant:add-to-cart / instant:open-cart listener.
- index.json, cart, blog, account, free-diffusers, manifestation-ritual, adv-scent-ritual etc.: no Instant.

## Done (API, reversible)
- 7 scent products: templateSuffix "" (default). Visually a no-op until the new theme is published (live default = same Instant section).
- Pages page-1, landing-1, landing-2, landing-3: templateSuffix null + unpublished (bodies were empty; they would have rendered as blank pages).
- Unpublished theme copy "MaisonCroyez — Instant removed (Claude)" id 186692370541, duplicated from the live theme, with:
  - templates/product.json <- templates/product.instant-backup-product.json (Impact main-product + related-products + apps; the pre-Instant default)
  - templates/collection.json <- templates/collection.instant-backup-collection.json (collection-banner + main-collection)
  - layout/theme.liquid: Instant cart-event listener removed (layout__theme.liquid.new, md5 8b4295091d6cf5563f5b54df64ec29fc)
  - config/settings_data.json: instant_core app-embed entry removed (config__settings_data.json.new); verified round-trip.
- Because theme files cannot be deleted through the connector, the three Instant templates that products/collections could still point at were overwritten in the copy with the restored defaults: templates/product.instant-lf6ljdl1MtYsbmA3.json and product.instant-SNQqz8AewZQLLRRB.json = product.json, collection.instant-FivQPNePBDqFaeAf.json = collection.json. So the copy renders every product on the Impact default no matter which suffix a product still carries.
- Previews of the theme's own templates on live products: previews/20261001T1619-*.png (?view=...).
- Verification of the copy through ?preview_theme_id=186692370541 (previews/20261001T1649-* and 20261001T1653-*): themeId 186692370541 confirmed in the HTML; zero Instant nodes on the diffuser PDP, a scent, the kits product, /collections/all, home, cart, /pages/manifestation-ritual and /pages/free-diffusers; product pages show h1, price, ATC and Subi; no JS errors. (One desktop /collections/all shot hit Shopify's bot challenge, 403, unrelated.)

## Blocked for the API (connector policy): deleting theme files, publishing themes
- themeFilesDelete is refused even on unpublished themes. The 74 files (instant-files.txt) are still in the copy. They are unreferenced after publish and never shipped to visitors; deleting them is housekeeping (theme storage only).
- Options: Online Store > Themes > copy > Edit code > delete each file; or Shopify CLI: `shopify theme pull --theme 186692370541`, delete the files listed in instant-files.txt locally, `shopify theme push --theme 186692370541` (push without --nodelete removes remote files missing locally).

## Published 2026-10-01 ~17:10 UTC
- Theme 186692370541 "MaisonCroyez — Instant removed (Claude)" is MAIN. Old live theme 149076607085 remains unpublished as rollback.
- Diffuser PDP (Product 8153621921901) templateSuffix set to "" (was instant-lf6ljdl1MtYsbmA3).
- Live check previews/20261001T1719-*: themeId 186692370541 on every page; zero Instant nodes on the diffuser PDP, Chilled Citrus, kits product, /collections/all, home, /pages/manifestation-ritual, /pages/free-diffusers; no JS errors. All 16 products/pages that used Instant are now on theme templates.
- Remaining housekeeping (owner): delete the 74 files in instant-files.txt from theme 186692370541 (CLI pull/push or code editor). Nothing references them.

## To finish (owner) — original plan
1. Preview theme 186692370541 in admin (Customize / Preview) — product pages, /collections/all, home, cart, /pages/manifestation-ritual, /pages/free-diffusers.
2. Publish it.
3. Then (API, me): set the diffuser PDP templateSuffix "" (cosmetic; the copy already renders it on the default).
4. Delete the 74 Instant files (see above) and the old live theme can be kept as a rollback copy.

## Notes
- Default Impact product template has enable_video_autoplay=false: the product-media video on the diffuser PDP shows with a play button. Switch it on in the theme editor (Product page > Media) if the hero should autoplay. The PDP will then show the Shopify-transcoded rendition (1.07–1.89 MB), not the 328 KB file in lp-factory/pages/pdp-diffuser/video.
- On the Impact template, the Subi widget lists every selling plan attached to the scents (Monthly 25% off, Every 3 months, Delivered every 30 days, Delivered every 45 days, Every 30 days "Save $0.00 on the first payment, then $10.00"). That is Subi plan data, not the template; it was hidden by the Instant layout's own buy box. Subi settings are off-limits for me — owner to prune the plans.
