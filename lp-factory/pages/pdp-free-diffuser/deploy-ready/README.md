# Deploy-ready bundle — OFFER V2 (1 fragrance $39.95/mo + free diffuser, 3-mo min)
Generated 2026-07-16. Design approved in preview; Shopify wiring + upload PENDING.

## Store changes required FIRST (Shopify MCP)
1. Find Subi "Plan 3" gid: query productVariant(id:"gid://shopify/ProductVariant/41212020457581")
   -> product -> sellingPlanGroups -> the group/plan the owner created named "Plan 3"
   (expect monthly billing/delivery, $39.95, alongside existing plans 1605206125 monthly-25%-off
   and 2615967853 every-3-months). Confirm it is attached to ALL 7 fragrance products.
2. Patch the plan gid into BOTH files (same one-line change):
   - src/app.js and deploy-ready/mc-lp-free-diffuser-app.js
   - replace `sellingPlan: 0,` with `sellingPlan: <numeric plan3 id>,`
   Commit + push.
3. Bump duplicate diffuser price to $120.00: productVariantsBulkUpdate on
   product gid://shopify/Product/8153621921901, variant gid://shopify/ProductVariant/45450822778989,
   price "120.00". (NEVER touch product 8089183551597 — the live $89.95 diffuser.)
4. Update the free-diffuser discount gid://shopify/DiscountAutomaticNode/1375641600109 via
   discountAutomaticBxgyUpdate: customerBuys { isSubscription: true, isOneTimePurchase: false,
   items { products { productsToAdd: [] } }, value { quantity: "1" } }
   (quantity 3 -> 1; one subscription fragrance now unlocks the free diffuser).

## Upload + flip (same rail as before)
5. stagedUploadsCreate for BOTH deploy-ready files (css text/css, app.js text/javascript, resource FILE).
6. curl multipart POST each to its staged target (201 expected).
7. fileUpdate: css -> gid://shopify/GenericFile/29348024909933,
   app -> gid://shopify/GenericFile/29348024942701.
8. Commit STATUS.md progress. Wait 25 minutes (origin propagation).
9. pageUpdate gid://shopify/Page/117412692077: replace 'fd4-' with 'fd5-' in body. Nothing else.
10. Trigger verify: set verify-lp.yml comment line to "# run: 31 — offer v2 live check" and push.
    NOTE for verify: the page is now SINGLE-select; the workflow's pick-3 clicks will no-op
    harmlessly (radio swap), and the cart should show 1 fragrance on plan 3 + diffuser $0,
    total $39.95.
11. Update STATUS.md with the final outcome and push.
