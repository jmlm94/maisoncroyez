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

## Conversion pass (2026-11-15, artifact version 2)

Owner: "Did you go through all the pages I shared earlier, their product pages and see if they had high CRO elements?"
I had only read them for branding. Read the five captured product pages (lp-factory/recon-brand/*/pdp-phone-full.jpg:
Flewd magnesium bath soak, Primally Pure cleanser, Mozi sample kit, Ketro pain gel, Hanni brooch) for conversion elements
and added the ones that need no new decision and no invented fact:

- Bag tiles show the saving ("Save 11%" / "Save 21%", worked out from the placeholder prices) — Flewd, Ketro.
- Subscribe option carries a "Best deal" tag and a checklist (price per bag, 15% every delivery, free shipping, skip /
  swap / cancel, guarantee) — Flewd, Ketro.
- "Can't decide? Take one of each." under the scent rows (sets 3 bags, one per scent) — Flewd variety link, Mozi sample kit.
- Three fold-outs under the button: what's inside + the scents / how to use + tips / shipping + returns — Flewd, Mozi,
  Primally Pure.
- Captions on gallery pictures 2 to 6 (benefit, how-to, guarantee) — Ketro.
- New section "One bath is a treat. A month is a habit." (night one / week one / month one, feelings only) with a
  button back to the buy box — Ketro "what to expect", Flewd "3+ days of calm".
- Proof section now holds EMPTY slots for: rating + count, three survey results, four customer videos, three reviews.
  Nothing is filled; none of it exists yet.
- New section "Complete the evening." (shower steamers, magnesium body spray; mockup pictures, no prices, link shows
  "Preview only") — Primally Pure, Mozi, Flewd.
- FAQ: + how strong is the scent (working copy, not a confirmed fact), + how many baths per bag (blank until known),
  + what if it is not for me.

Left for the owner (offer or fact needed): message in the top bar (the references use it for the offer or shipping),
free gift or credit with the order, price per bath, a "why does it cost this" answer, press or expert backing.
