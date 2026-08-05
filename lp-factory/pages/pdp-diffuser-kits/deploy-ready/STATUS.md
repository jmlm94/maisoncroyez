# Kits PDP — deploy status

Live at https://maisoncroyez.com/products/diffuser-scents since 2026-08-05 (kt3).

- Product: gid://shopify/Product/7936904855661 (Home Diffuser Kits)
  - templateSuffix: "" (was `instant-fWIywQ91DdFfsKEE` — restore that to roll back)
  - descriptionHtml carries: takeover style + hero preload + #mc-kits-root + kt-key loader
- CDN files (fileUpdate keeps URL, bumps ?v):
  - app `gid://shopify/GenericFile/29577274294381` → mc-kits-app.js (14KB)
  - css `gid://shopify/GenericFile/29577274327149` → mc-kits.css (10KB)
- Variants: studio 43824890511469 ($89.95) · condo 43824890544237 ($189.95) · house 43824890577005 ($289.95)
- NO drawer injector on this page by owner requirement: kit adds open the
  theme's STANDARD drawer. Custom drawer = Circle landing pages only.
- App also hides the stale Instant header announcement ("The diffuser is
  free. Just pick the scent.") — wrong offer for this page.
- Verify rail: .github/workflows/verify-kits.yml (run 3 = 15/15 PASS).
