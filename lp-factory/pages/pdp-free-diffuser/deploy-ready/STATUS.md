# Deploy status — mc-lp-free-diffuser.css

## DEPLOY COMPLETE — 2026-07-15 17:37 UTC

1. Shop sanity check: Maison Croyez / maisoncroyez.com ✅
2. Staged upload of mc-lp-free-diffuser.css (310,590 bytes): HTTP 201 ✅ (17:08 UTC)
3. fileUpdate on gid://shopify/GenericFile/29348024909933: fileStatus READY, no userErrors ✅ (17:10 UTC)
4. Waited 25+ min for Shopify file-origin propagation ✅ (17:10 → 17:36 UTC)
5. Page cache key flipped fd3- → fd4- on gid://shopify/Page/117412692077 via pageUpdate: no userErrors ✅ (17:37 UTC)
   - Body re-queried and verified: fd4- present, everything else unchanged.
6. Verification workflow run 29 (gold palette live check) triggered via verify-lp.yml push.
   Results (screenshots + verify-log.txt) will be committed by CI to lp-factory/pages/pdp-free-diffuser/verify/.

The live page https://maisoncroyez.com/pages/free-diffuser now loads the new CSS
(gold palette) under the fd4- cache key. No products, prices, discounts, or other
pages were touched.
