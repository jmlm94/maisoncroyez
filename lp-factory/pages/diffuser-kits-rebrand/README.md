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

## Round 2 (2026-11-15, artifact version 2) — the owner's notes; this replaces the offer and the pictures described above

His words: "Replace the main image with the video we had in the past. / Waterless scent diffuser -> maison croyez waterless
diffuser & 100% organic scents. / Main title -> Leave the day at the door, it's time to align yourself to the ultimate
relaxation & unwinding experience. / The three bullets below: Same as the previous design please. / For the diffusers, show
picture of each wuantity. also centered square footage. / For the scents, include a main title to define real quick what
is is but also include the three ingredients and smells like: comparing to some brand that people know about it. / The
rest, let's try to preserve the images we had before in the old page since they were professional photshoots." Then: "Also
I want to see the pictures of each scent same way they were before." "on the variants for scents". Then: "Also let's do a
free scent for each diffuser and step 3 will be asking them if they want to receive again in 4 weeks for $39.95 or they
don't want to refill, scents are still free. Also update prices then to $89, $159 and $239" and "scents actually for $39/mo".

- Main picture: the old hero video (store file mc-pdp-hero-720.mp4, 8 s, 720 px, muted loop), then five of the six old
  gallery pictures. Left out: the one that says "Your space is already manifesting something" (he dropped manifestation).
- Label, title and the three bullets as he wrote them; the bullets are the old page's own (HEALTH3): "No smoke, no harm",
  "No water, no mold", "Reduce stress & anxiety". The first clause of the title is set large, the rest smaller, same heading.
- OFFER NOW: 1 / 2 / 3 diffusers = $89 / $159 / $239 (against $178 / $267 at the single price: save $19 / $28; $79.50
  and $79.67 each, so 3 costs slightly more per diffuser than 2, hence the tag "Whole home", not "Best value"). One free
  scent per diffuser, picked in step 2 (the list is open, repeats allowed, the button waits until all are picked). Step 3
  "Want them again in 4 weeks?": "Yes, send my scents every 4 weeks" or "No refills, thank you"; today's scents are free
  either way. Quantity pricing for scents, "No thank you, I don't want scents", 25% off refills and 30 / 60 / 90 days
  are gone.
- MY READING, TO CONFIRM: $39 is per scent, so 2 diffusers = $78 every 4 weeks and 3 = $117 (the other reading is $39
  for the whole refill). "Yes" is pre-selected, with the renewal amount written out above the button.
- Diffuser cards: the old kit pictures (200 px originals), everything centered, "600 / 1,200 / 1,800 sq ft coverage".
- Scents (rows in step 2 and cards in the scents section): the old botanical picture, a plain main title (his own labels
  from k2: Honey floral, Fresh citrus, Lavender, Milk & honey, Peach & tea, Pine forest, Floral musk), the name and
  strength, the three notes, and "Smells like". The seven comparisons are MY GUESSES from the notes, to be corrected by
  someone who has smelled them: Chloé Eau de Parfum · Dolce & Gabbana Light Blue · Bath & Body Works Stress Relief ·
  Philosophy Fresh Cream · Jo Malone Nectarine Blossom & Honey · Thymes Frasier Fir · Narciso Rodriguez For Her. A line
  under the step title says what the scents are ("100% organic scent oil for your diffuser...", his claim).
- Section pictures are the old page's photos: goodbye1, compare1, step1-3, patricia1 (timeline), spaces1, scents1, badge1
  (guarantee, with the 30-day seal on it). The eight generated dk-* pictures and the seven working scent colors are no
  longer used (files kept in img/).
- Media: old/ holds the copies from the store CDN (fetched by .github/workflows/fetch-kit-media.yml, pictures as WebP),
  plus g-*.webp made from lp-factory/assets/cdn/diffuser and hero-frame.webp (first frame of the video).
- Checked on phone 400 px and desktop 1440 px: no errors, no sideways scroll, the video plays, every path adds up
  (1 = $89, 2 = $159, 3 = $239; refills $39 / $78 / $117).
