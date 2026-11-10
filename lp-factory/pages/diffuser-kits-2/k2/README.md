# k2 — the one-page paid-diffuser offer (preview only, not deployed)

Owner's spec (2026-11-08): one page, diffusers (1 $89.95 / 2 $139.95 / 3 $209.95 since 2026-11-10; first spec 2 $129.95 / 3 $189.95) then scents (1 $39.95 / 2 $29.95 / 3+ $24.95
each, the main smell above the strength, "Each scent lasts 15+ days") then Subscribe 25% off every refill | One-time payment,
then the checkout. Preview: artifact "MC LP Draft Copy 3" (https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN).

Files: mc-dk2-app.js + mc-dk2.css (the k2 build of the kits-2 app), page-body.html (key dk2b-3deef01, pill "BUILD YOUR KIT &
SAVE UP TO $80"), qa-kits-2-k2.yml (the QA workflow for this flow: two real checkouts; copy it over .github/workflows/qa-kits-2.yml
when the build is live). The Shopify ids in K2 (product 15430881673325, variants, codes 2SCENTS / 3SCENTS) were deleted on
2026-11-08 — nothing is created on Shopify until the owner says so. Details and the rollback in ../README.md.

Last QA of this build while it was live (2026-11-08 17:29 UTC, ../qa/20261108T1729): 30/30 — phone + desktop render, the
three tiers, the quantity strip, the smell labels, both real checkouts (one-time 2 diffusers + 3 scents $204.80 with 3SCENTS;
Subscribe 1 diffuser + 2 scents $129.85 with 2SCENTS + the 04/10 plan's $10).

Round 2 (2026-11-08, the owner's artifact comments): no pill, coverage badges on the diffuser cards, no "Where it goes" block, no
bottle-life / badges / IFRA block, the scents as a list, no summary block. Details in ../README.md.

Round 3 (2026-11-08): three above-the-fold variants in the app, picked by window.__K2_VARIANT__ = "a" | "b" | "c" (default = the v66
page). Local build of a variant: build the page, then insert <script>window.__K2_VARIANT__="b"</script> before <title>. Details in ../README.md.

Round 4 (2026-11-10): hero carousel (7 slides, full size), 2 / 3 diffusers $139.95 / $209.95 with the cost per diffuser, "How many
scents?" centred with three tappable quantity tiles and "No thank you, I don't want scents" (diffusers-only checkout). Details in
../README.md. qa-kits-2-k2.yml carries the new amounts; the carousel and the no-scents path still need checks before it goes live.

Round 5 (2026-11-10): the scent list is closed until one of the three quantity tiles is tapped. Details in ../README.md.
