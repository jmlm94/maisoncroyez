# Bath soak PDP — preview only (artifact, nothing on Shopify)

Owner (2026-11-15): "let's try to create a PDP artifact real quick for the magnesium bath soak to see how it goes. Emulate the
page structure we have for the last pdp we created diffuser-kits but applying everything we've been building. ... It's gonna
be an artifact only."

Artifact "Maison Croyez Bath Soak PDP": https://claude.ai/artifact/AviMUuKqQSgBeMufQFpJ19 (not watched; he replies in chat).

- Structure taken from the kits preview (lp-factory/pages/diffuser-kits-2/k2): gallery + three-step buy box (how many /
  which scents / subscribe or one-time), then "say goodbye" block -> comparison table -> how it works -> where it fits ->
  the scents -> 30-day guarantee -> reviews -> FAQ, plus the sticky bar.
- Brand from lp-factory/brand/rebrand-2026 (board v1.2): Cream #F9F6EE, Night #161210, Blue Hour #6169DF with white button
  text, Blue Hour Deep #4B55D6 for small text, DM Sans Bold + Roboto Mono labels, two-line wordmark centered in the header,
  "Exhale the day.", "Bonsoir" / "Bonne nuit", the row 1 pouch (Unwind / Be here / Drift off).
- EVERYTHING COMMERCIAL IS A PLACEHOLDER I chose so the page could work: prices ($28 / $50 / $66 for 1 / 2 / 3 bags),
  subscribe 15%, delivery every 30 / 45 / 60 days, free shipping, 30-day money-back and scent swap (carried over from the
  kits page), "about twenty minutes", "a generous handful". No formula exists, so the copy claims only what the product
  name implies (magnesium bath salts, scent) plus feelings and body language ("helps you unwind", "eases tired shoulders").
- No reviews exist: the page shows a "New" tag instead of a rating, and empty review slots ("Only real ones go here").
- Files: pdp.src.html -> `python3 build.py` -> bath-soak-pdp.html (published). Pictures in img/ (five generated for this
  page from the row 1 pouch artwork: soak-unwind / soak-be-here / soak-drift-off / soak-dusk / soak-pour; the rest copied
  from the board and the mockups). The main button only shows "Preview only. Nothing was added."
