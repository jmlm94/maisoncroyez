# k2 — the one-page paid-diffuser offer (preview only, not deployed)

Owner's spec (2026-11-08): one page, diffusers (1 $89.95 / 2 $129.95 / 3 $189.95) then scents (1 $39.95 / 2 $29.95 / 3+ $24.95
each, the main smell above the strength, "Each scent lasts 15+ days") then Subscribe 25% off every refill | One-time payment,
then the checkout. Preview: artifact "MC LP Draft Copy 3" (https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN).

Files: mc-dk2-app.js + mc-dk2.css (the k2 build of the kits-2 app), page-body.html (key dk2b-3deef01, pill "BUILD YOUR KIT &
SAVE UP TO $80"), qa-kits-2-k2.yml (the QA workflow for this flow: two real checkouts; copy it over .github/workflows/qa-kits-2.yml
when the build is live). The Shopify ids in K2 (product 15430881673325, variants, codes 2SCENTS / 3SCENTS) were deleted on
2026-11-08 — nothing is created on Shopify until the owner says so. Details and the rollback in ../README.md.
