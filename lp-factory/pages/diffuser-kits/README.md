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

## 2026-10-13 — dk7 (LIVE as dk7-14579ac, 17:01 UTC; the notes below are the preview rounds): one refill choice + "Where it goes"
Owner: drop the 60 / 90-day options (every 30 days or no subscription) and teach placement per kit, like the bundle page's floor plan.
App: FREQS = [30 days $24.95] only; Step 3 is now two cards ("Yes, refill every 30 days — $X today, then $24.95 per scent…" and
"No subscription — $X today, nothing after"), the "Don't want refills?" link is gone (page-shot's cart check still clicks .rf-link /
.fq:nth-child(3) — update it before the deploy: no-subscription card = `.rf2 .fq-one`). New "Where it goes" panel under the kit cards
(PLANS: studio / living room + bedroom (the bundle drawing) / living room + bedroom + kitchen, room chips with icons, caption per
tier, swaps with the selected kit); tier subtitles now name the rooms ("Studio, bathroom or entry" / "Living room + bedroom" /
"Living room, bedroom + kitchen"). CSS: .place* / .rf2 rules appended. Preview: artifact TK1GvMvzMi69pP4wiLMfyN v8, built by
inlining lp-factory/assets/cdn/{mc-lp-vendor.js,mc-lp-diffuser-assets.js} + the app + css into one HTML (fonts inlined as data URIs).
dk7b (owner round 2, preview v10): kit lines "Perfect for: Studio, Bathroom, Entry." / "Perfect for: Living Room, Bedroom, Kitchen." /
"Perfect for: 1+ Rooms, Large Spaces."; panel heading "WHERE IT GOES:" bigger + black; chips Title Case per the same lists (3D: 🏠 1+ Rooms,
📏 Large Spaces); Step 3 cards "Yes, refill every 30 days — $24.95/scent — with $15 OFF on my scent" and "One-Time Payment — $39.95/scent —
No automatic refill, scents at $39.95 each."; refill-why trimmed to the free-first-bottle line.
dk7c (owner round 3, preview v11): placement logic corrected — 2 diffusers = two coverage zones in ONE bigger room (plan: one large living
room with two diffusers, "or the bedroom, or the kitchen"); 3 diffusers = two in the living room + one in the bedroom (bundle drawing with a
second living-room zone). Captions updated to match.
dk7d (owner round 4, preview v12): refill card = one bold sentence "Yes, refill every 30 days with $15 OFF on my scent." + $24.95/scent;
one-time card grayer (title + sub) with no price on the right, "No automatic refill, scents at $39.95 each." stays below.
dk7e (owner round 5, preview v13): refill card gets a second line "Free Shipping, right at your doorstep. Swap, pause or cancel anytime."
dk7f (owner round 6, preview v14): one-time card back to the same black as the refill card; "Swap, pause or cancel anytime." bold on the
refill card and in the Step 3 subtitle ("Skip, swap, pause or cancel anytime.").
