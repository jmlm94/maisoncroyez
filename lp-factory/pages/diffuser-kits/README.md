# Diffuser kits + one free scent (Copy 3)

Fork of `lp-factory/pages/free-diffusers/ritual/` (rt18, 2026-10-03) for the second offer. Preview artifact: MC LP Draft Copy 3
(https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN). Not deployed; no Shopify page, variants or plans exist for it yet.

Offer (owner, 2026-10-03): 1 / 2 / 3 diffusers at $129.95 / $149.95 / $199.95, one scent free today on every kit, optional
refills every 30 / 60 / 90 days at $34.95 / $39.95 / $44.95 per bottle (same Subi prices as the ritual page), or no subscription.
2 diffusers = Most popular (preselected), 3 = Best value. Savings shown against $129.95 per diffuser + the $49.95 scent.

Files: `mc-dk-app.js`, `mc-dk.css` (patched copies of mc-rt-app.js / mc-rt.css; patch scripts patch-kits1/2.py in the session
scratchpad). Everything below the buy box is identical to the ritual page.

Cart wiring still open (`CART3.kitsFreeScent` is null → preview toast): needs three kit variants ($129.95 / $149.95 / $199.95),
a way to make the first scent $0 on the subscription path (a Subi plan group whose first payment is 100% off, then $15 / $10 / $5
off), and an automatic discount for the no-subscription path (buy a kit → 1 scent free).
