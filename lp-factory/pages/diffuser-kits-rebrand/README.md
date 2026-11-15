# Diffuser kits in the new brand — preview only (artifact, nothing on Shopify)

Owner (2026-11-15): "Why don't you create an artifact now for the diffuser-kits but now with this branding and principles
applied just to see how it looks."

Artifact "Maison Croyez Diffuser Kits": https://claude.ai/artifact/BG8w2of9xszLDSDEwcTQLi (version 1; not watched, he replies in chat).

- What it is: the kits one-page offer (the k2 preview, lp-factory/pages/diffuser-kits-2/k2, state v68) rebuilt as a static
  page in the new brand (board v1.2) with the conversion elements from the bath soak pass. Not the store app: plain HTML,
  CSS and a small script. The live pages and the k2 preview are untouched.
- Offer, carried over unchanged from k2: diffusers 1 / 2 / 3 = $89.95 / $139.95 / $209.95 (list $179.90 / $269.85, 600 /
  1,200 / 1,800 sq ft); scents 1 / 2 / 3+ = $39.95 / $29.95 / $24.95 each, up to 7, list closed until a quantity is tapped,
  "No thank you, I don't want scents"; Subscribe = 25% off every refill (30 / 60 / 90 days) or one-time; checkout button
  with the total (2 diffusers + 3 scents = $214.80). The button only shows "Preview only. Nothing was added."
- Facts carried over from the current page: about ten minutes to fill a room, up to 600 sq ft, no water / flame / heat,
  100 ml bottles that last 15+ days, three strengths, free shipping, 30-day money-back with prepaid label, free scent swap,
  lifetime warranty, the notes of each scent. Dropped: intentions and manifestation (his round-one decision), the
  odor-removal lines, "92% come back", "2,500+ homes", "organic ingredients from France", IFRA.
- Reviews: six quotes and "4.5 out of 5 on Amazon · 44 ratings" taken as they are from the k2 page's CONFIG.reviews
  (described there as verified buyers from the customer survey and the Amazon listing). The six named photo reviews of the
  old page (REVIEWS6) and its "4.7 from 124 reviews" line are not used. Four empty "Video slot" boxes.
- New in this version (mine, to confirm): headline "Leave the day at the door." (one of his two campaign lines); the
  third diffuser tag says "Whole home" instead of "Best value" because 2 and 3 cost the same per diffuser ($69.98); seven
  working scent colors (#8F6410 #4F6B2A #5A4694 #7A4A2A #B04E4A #2F5D4B #2A2E63, cream text 4.8:1 or better); the
  shortcut "one soft, one medium, one bold" (Chilled Citrus, Honey Nectar, Midnight Sensation: the same three the old
  page named as the usual start); the timeline "Ten minutes tonight. Every evening after."; the pairs-with row.
- Pictures: eight generated with Higgsfield (gpt_image_2_6, 2k, high) from the real product photo
  lp-factory/assets/cdn/diffuser/d25.png (d26 for the trio) plus the two-line logo as references: dk-one / dk-two /
  dk-three (the main picture follows the number of diffusers), dk-living, dk-bedroom, dk-bottle (plain black bottle, no
  label), dk-button, dk-woman. Fetched by .github/workflows/fetch-brand-art.yml (run 6). The also-* pictures are the pack
  mockups.
- Files: pdp.src.html -> `python3 build.py` -> diffuser-kits-rebrand.html (published). Checked on phone 400 px and
  desktop 1440 px: no errors, no sideways scroll, every path of the buy box adds up.
