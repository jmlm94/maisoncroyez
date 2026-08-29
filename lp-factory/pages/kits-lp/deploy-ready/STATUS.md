# Six-Month Transformation Program — product-page deploy

Live URL: https://maisoncroyez.com/products/maison-croyez-manifestation-specia-bundles
Product: gid://shopify/Product/8215141417069 (status UNLISTED — direct URL works, hidden from listings)

## Deploy state (kx4, 2026-08-29)
- Loader: product descriptionHtml, fixed key `kx4-ba20d16`, loads
  mc-lp-vendor.js (shared React) + mc-lp-diffuser-assets.js (CDN asset map) + mc-kits-app.js + mc-kits.css
- Files: mc-kits-app.js gid://shopify/GenericFile/29577274294381 (sha ba20d16, ~64KB src),
  mc-kits.css gid://shopify/GenericFile/29577274327149 (~88KB, CDN fonts)
- App source built from artifact 959573c9 ("MC LP Variant Draft") with:
  run-once IIFE guard (theme renders description twice), theme-template takeover
  (hides product template inside main; header/footer/cart-drawer untouched),
  FB pixel init in-app (1500ms, no-op if fbq exists) + fbq AddToCart on ATC click,
  CDN assets instead of data URIs, ritual variant 45728132202605,
  line-item properties "Scents" + "Plan".
- Variants fixed: compareAt 239.75 / 479.50 / 719.25; inventoryPolicy CONTINUE (was DENY with 0/-3/-2 stock).

## Verified live (recon r94–r97)
- App renders (announcement, 3 tiers w/ 🎁 badge, 8/8 preselected, ATC $279), 0 JS errors, 0 overflow
- /cart/add.js 200 + cart drawer opens; theme header visible; product template hidden
- Pixel: fbevents.js loads + signals/config fetched for 980908600592309, consent granted (r97)

## Notes
- Subscription/renewal toggle REMOVED (owner request 2026-08-29) — one-time purchase only;
  cart line carries "Scents" property only.
- Sanctuary variant is titled "The House Kit" in Shopify vs "The Sanctuary Kit" on page (checkout shows Shopify title).
