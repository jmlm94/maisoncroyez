# Living Room + Bedroom Bundle (Copy 4)

Fork of `lp-factory/pages/diffuser-kits/` (dk6, 2026-10-03) for the third offer. Preview artifact: MC LP Draft Copy 4
(https://claude.ai/artifact/48br1pMyzaPM2CE6nn5773). Not deployed; no Shopify page or variant exists for it yet.

Offer (owner, 2026-10-03): one bundle, 2 diffusers + 2 scents for $169, one-time (no refill step), the only decision is the
two scents. Gifting angle ("one to keep, one to gift") in the announcement bar, the step title, the sticky bar and the order
summary. Compare-at $359.80 = 2 × $129.95 (diffuser reference from the kits page) + 2 × $49.95. Two-scent picker: the kits
grid, tap toggles, a third pick replaces the oldest; Chilled Citrus + Honey Nectar preselected.

Files: `mc-lb-app.js`, `mc-lb.css` (patched copies; patch-bundle1.py in the session scratchpad). Everything below the buy box
is identical to the ritual page.

Cart wiring open (`CART3.bundleVariant` is null → preview toast): needs one bundle variant at $169 (2 diffusers) and a way to
make the two scents $0 in the cart (an automatic buy-the-bundle-get-2-scents-free discount, one-time only).
