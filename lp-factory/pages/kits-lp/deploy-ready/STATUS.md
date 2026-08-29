# Six-Month Transformation Program — PAGES deploy (p6m1)

Live URL: https://maisoncroyez.com/pages/six-month-program
Page: gid://shopify/Page/119394369645 (published 2026-08-29)

## Deploy state (p6m1, 2026-08-29)
- Page body: prehero (Diseno_sin_titulo_92.png) + font preloads + #root + fixed-key loader
  `p6m1-472a4f6` loading mc-lp-vendor.js (shared React) + mc-lp-diffuser-assets.js (CDN asset map)
  + mc-6mp-app.js + mc-6mp.css; MutationObserver hides prehero once the app mounts; FB pixel init
  lives inside the app file (1.5s, no-op if theme fbq exists) + fbq AddToCart on the button.
- Files: mc-6mp-app.js gid://shopify/GenericFile/29842134663277 (sha 472a4f6 src, ~46KB minified),
  mc-6mp.css gid://shopify/GenericFile/29842134696045 (~78KB, CDN fonts).
- App source = artifact 959573c9 with: one-time purchase only (subscription toggle removed),
  old-offer FAQ item ("Can I get refills later?" / Manifestation Circle) deleted, picker
  "before renewal" copy trimmed, legacy in-app cart-drawer takeover stripped, ritual variant
  45728132202605, cart line = kit variant + "Scents" property.
- Product 8215141417069 variants (used by ATC): $199/$279/$399, compareAt 239.75/479.50/719.25,
  inventoryPolicy CONTINUE.

## Product page REVERTED (owner request 2026-08-29)
/products/maison-croyez-manifestation-specia-bundles is back to its pre-deploy state:
original descriptionHtml (kt5 hour-key loader) restored and the original mc-kits-app.js
(13.7KB vanilla app, gid 29577274294381) / mc-kits.css (gid 29577274327149) re-uploaded.
Variant fixes (compareAt + CONTINUE) kept — the pages ATC sells those variants.

## Verified live (recon r99–r100)
- /pages/six-month-program: renders (announcement, 3 tiers, 8/8 picks, ATC $279), cart/add 200,
  drawer opens, prehero hides, 0 JS errors, 0 overflow.
- Product page: old app renders, new-offer content gone, kt5 loader present, 0 errors.

## Known sitewide leftover (NOT part of this deploy)
mc-drawer.js (theme-level, hour key dr1-<hour>) injects an OLD-offer cart-drawer testimonial
("Verified Circle member… subscription… free diffuser… 30-day") + trust badges on EVERY page,
including this one and build-your-kit-2. Owner to decide whether to update/remove it.
