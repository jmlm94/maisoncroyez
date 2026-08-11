# Scents PDP — deploy status

Live at https://maisoncroyez.com/collections/power-fragrances since 2026-08-05 (pf1).

- Collection: gid://shopify/Collection/282645856365 (Power Fragrances)
  - templateSuffix: "" (was `instant-FivQPNePBDqFaeAf` — restore to roll back)
  - descriptionHtml carries takeover style + frag2 preload + #mc-scents-root + pf-key loader
- Product: gid://shopify/Product/8176953655405 (Manifestation Scents 100ml), 7 variants @ $39.95 base (repriced from $49.95 on 2026-08-11)
  - love 45511812251757 · abundance 45511812317293 · focus 45511812153453 · ideas 45511812186221
  - energy 45511812218989 · purify 45511812120685 · midnight 45511812284525
- CDN files (fileUpdate keeps URL, bumps ?v):
  - app `gid://shopify/GenericFile/29577723904109` → mc-scents-app.js
  - css `gid://shopify/GenericFile/29577723936877` → mc-scents.css
  - flat-lays mc-scents-flat-<key>.jpg ?v=1785972642
- PLAN_ID in build-scents.py = 0 → subscription card HIDDEN, one-time $39.95 only (loader pf3).
  WHEN the owner creates the Subi plan ($39.95 / every 45 days on this product):
  read the plan id from product.sellingPlanGroups, set PLAN_ID, rebuild,
  fileUpdate the app GID, flip loader key pf1→pf2. Sub card + $39.95 pricing
  activate automatically.
- STANDARD theme drawer (no injector) by design.
- Verify rail: .github/workflows/verify-scents.yml
