# Diffuser kits in the new brand — preview only (artifact, nothing on Shopify)

Owner (2026-11-15): "Why don't you create an artifact now for the diffuser-kits but now with this branding and principles
applied just to see how it looks."

Artifact "Maison Croyez Diffuser Kits": https://claude.ai/artifact/BG8w2of9xszLDSDEwcTQLi (now version 7, see Round 7 at the end; not watched, he replies in chat).

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

## Round 3 (2026-11-15, artifact version 3)

His words: "Video full size pleae. / Leave the day at the door. with the . and below It's.... / delete diffuser pictures
they don't look good. / also for scents make the biggest text the name of the scent and below just the kinda smell Honey
Floral, Fresh Citrus, etc. / notes add a . at the end of each. / delete smells like. / change can't decide to make it
automatically our best sellers and thats it. / For the step 3, make them select frequency instead and also the no refills."

- Gallery (video first): edge to edge on phones, no rounded corners, no gap under the header; on desktop the left column
  is wider (1.25 : 1), the video fills it (604 px at 1440). My reading of "full size".
- Title "Leave the day at the door." and, below it, "It's time to align yourself to the ultimate relaxation & unwinding
  experience." as its own line.
- Diffuser cards: no pictures (old/kit1-3.webp are no longer used).
- Scents, rows and cards: the name is the big text, the kind of smell below (Honey Floral, Fresh Citrus, Lavender, Milk &
  Honey, Peach & Tea, Pine Forest, Floral Musk), notes end with a period, "Smells like" removed. Strength shows only as
  the small corner label on the cards of the scents section.
- "Can't decide? Take our best sellers." picks Midnight Sensation, then Golden Blossom Harmony, then Crisp Citrus Scape,
  as many as the kit holds. Source: earlier repo notes (pages/free-diffusers/STATUS.md and pdp-free-diffuser STATUS);
  NOT checked against current sales.
- Step 3 "How often do you want refills?": every 4 / 8 / 12 weeks (4 pre-selected, tagged "Most popular" as the old page
  tagged 30 days) or "No refills, thank you". $39 a scent at every frequency (still my per-scent reading). The weeks are
  my choice; the old page offered 30 / 60 / 90 days.
- He also asked what else to add, adjust or remove so the page speaks to the new value proposition; answered in chat
  (the evening first and the candle comparison later, group the seven scents under Unwind / Be here / Drift off, new
  gallery slides, feeling words in place of "Reduce stress & anxiety", proof for "100% organic", the "align yourself"
  wording). Nothing from that list is applied yet.

## Round 4 (2026-11-16, artifact version 4) — "apply all of them" (the eight changes proposed in chat)

1. Evening first. Section order is now: buy box -> "Ten minutes tonight. Every evening after." -> "Living room, bedroom,
   hallway." -> "As simple as 1, 2, 3." -> night light + timer (new, dark band) -> the scents -> "Say goodbye to sprays,
   plug-ins and candles." -> the comparison table -> guarantee -> reviews -> pairs well with -> FAQ.
2. The seven scents sit under the three moods of the new products, in step 2 and in the scents section ("Pick the evening
   you want."). MY GROUPING, from the notes, to confirm by nose: Unwind = Golden Blossom Harmony, Honey Nectar · Be here =
   Crisp Citrus Scape, Euphoric Bloom, Wildwood Mystique · Drift off = Chilled Citrus, Midnight Sensation. Mood colors as
   on the packs: clay #A9512F, green #2F5D4B, violet #5A4694.
3. Bullets: "Unwind in ten minutes" / "Fills the whole room" / "No water, no flame" (were the old page's three).
4. Line under the title: "Come home, press once, and let the scent tell you the day is over."
5. Her evening, not her guests: "Come home to it." in the guarantee, "Soft for a quiet night, fuller when you want more",
   "where you sit and where you sleep"; the two photos of one woman resting lead, the friends photo sits lower.
6. Night light and timer: new section "Set it for the evening. It turns itself off." (night light on or off, timer 1 / 3 /
   6 / 12 hours, three strengths: all read off the old gallery picture lp-factory/assets/cdn/diffuser/d7.png), a line in
   the "How it works + tips" fold-out and a new FAQ entry "Does it turn itself off?".
7. Old gallery slides out. Five new ones in the new look, drawn by make-slides.js from the old page's own photos
   (img/slide-1..5.webp, 1080 px): fills the room / night light + timer / no water, no flame / three moods / the promise.
   The video stays first.
8. "100% organic" removed everywhere (label, step 2 line, scents section). It goes back if he has the proof.
- The guarantee is back to the seal alone; the kitchen photo moved to "Say goodbye". No longer used: old/g-d1, g-d2,
  g-d3, g-d6 (g-d92 only feeds slide 4), old/kit1-3, old/hero-poster.
- Checked on phone 400 px and desktop 1440 px: no errors, no sideways scroll, the video plays, every path adds up.

## Round 5 (2026-11-16, artifact version 5)

His words: "make them save 25% if they subscribe to refills."
- Refills on any frequency are 25% off the $39 scent: $29.25 a scent (2 = $58.50, 3 = $87.75 per refill). Step 3 shows
  "Subscribe. Save 25%.", "$29.25 a scent instead of $39" and the struck $39 on each frequency; the line above the button,
  the fold-out, the FAQ and the timeline quote the same.
- MY READING, TO CONFIRM: 25% comes off $39 (so $29.25), not "$39 is already the price after 25% off a $52 scent".
  Still per scent.

## Round 6 (2026-11-16, artifact version 6)

His words: "Let's do $29 but maintaining the $29". MY READING (the second number looks like a typo for $39): refills cost
$29 a scent, shown against the $39 regular price, which stays as the struck price and as the value of the free scents.
- Refill = $29 a scent (2 = $58, 3 = $87). $10 off $39 is 25.6%, so "Subscribe. Save 25%." stays. Every place that quoted
  $29.25 now says "$29 instead of $39".

## Round 7 (2026-11-19, artifact version 7) — the audience learnings and the bath soak page's conversion elements

His words: "with all these learnings about our audience, please adapt some of the pain points and analysis overall as
well as the CRO elements you added on the last PDP to the diffuser-kits artifact ... Dont ask for permission, fully
implement based on your criteria". The offer (prices, free scents, refills at $29, 4 / 8 / 12 weeks) is untouched.

From the research (Maison_Bath_Soak_Research, Nov 18): the buyer is a woman 45+ who can't switch off at night; in the
customer survey (24 answers) the three reasons people almost didn't buy were not knowing how it smells, price, and the
subscription commitment; bedroom use shows up on its own ("I can go to sleep with it on in our bedroom and feel safe");
the same scent every night as a bedtime cue is "our idea, not a study"; honest label as a trust edge.

- Top bar: "Free shipping · 30-day money-back guarantee · Lifetime warranty" (was "Bonsoir. Exhale the day.").
- Headline: "Home, but the day won't leave your head? Leave it at the door." His line stays as the answer. Lede names
  the buyer ("made for women 45 and over"). Four check bullets replace the three pills: a cue to switch off (jumps to
  the evening section) / fills the room in about ten minutes / made to be left on / don't know how it smells.
- Gallery: one new slide, "Why this one, and not a candle." (drawn in HTML); arrows moved under the pictures.
- Step 2: the three moods in her words (walk in with the day in your head / the weekend at home / the bedroom, the hour
  before bed) and "Not sure how they smell? Pick now. If you don't love one, we swap it, free."
- Step 3: "under $2 an evening" ($29 a bottle that lasts 15+ days) and three lines against the subscription fear: we
  email you before every charge / skip, swap or cancel any time / no commitment, today's scents are free either way.
  KEPT AS IT WAS: refills every 4 weeks stay pre-selected. The research says "one-time purchase first"; I did not flip
  the default because the free scents are paid for by the refills. His call.
- Button carries "30-day money-back guarantee"; a guarantee card sits under it.
- New section "Sound familiar? Home at last. Still switched on." with four tabs: the day follows me home / mind won't
  stop at bedtime / I can't leave a candle / one more thing to look after. Each: her words, then "What the diffuser
  does". Photos are the old page's (patricia1, spaces1, goodbye1, badge1).
- "What to expect | How to use it" switch (id `why`): an example evening (6:30 PM press once, 6:40 the room smells like
  the evening, 10:00 it turns itself off) with "The honest part: a scent does not put you to sleep, and we don't claim
  it does ... our idea, not a study"; the 1-2-3 steps with night light, timer and two rooms.
- "Why this one, and what it isn't.": the comparison table (the flame first) and a "What it isn't" box: not a sleep
  aid, not a treatment, not an air purifier. Replaces "Say goodbye to sprays..." and the separate table section.
- Guarantee: "Love the way your evenings feel in 30 days". Reviews: the bedroom quote and the "It was relaxing" quote
  lead. FAQ in the order of the objections: will it help me switch off / can I leave it on in bed / I don't know how
  they smell / too strong / am I signing up for a subscription / what if I don't like it / then the product questions.
- Sticky bar: choose 1, 2 or 3 diffusers from anywhere; the button shows the total and goes to the scents until they
  are picked. It now follows the scroll position (the old observer missed fast scrolls).
- Removed sections (their content moved into the ones above): "Living room, bedroom, hallway.", "Set it for the
  evening. It turns itself off.", "Say goodbye to sprays, plug-ins and candles."
- NOT ADDED, on purpose: the lavender and sleep claim his claims rule allows. The studies used lavender essential oil;
  Chilled Citrus is a fragrance oil with a lavender note and I can't tell that it is the same thing. It goes in if he
  confirms. "Crisp Citrus Scape and Chilled Citrus are the two lightest scents" comes from the "soft" labels on the cards.
- Checked on phone 400 px and desktop 1440 px: no errors, no sideways scroll, no broken pictures, 7 slides, the tabs
  and the switch work, every path adds up (1 = $89, 2 = $159, 3 = $239; refills $29 / $58 / $87).

## Round 8 (2026-11-21, artifact version 9) — his nine comments on the page

(Version 8, 2026-11-19, was one line: the lede no longer names an age, "for the evenings you can't switch off".)
1. Rating line at the top: "Update the reviews here and delete that is from Amazon" -> "4.7 | 124 reviews", the figure his live
   kits pages show ("4.7 Rated (124 reviews)", lp-factory/assets/cdn/mc-dk-app.js). NOT VERIFIED BY ME: the store
   connector was pointed at the other store today, so I could not read the review app; brand-kit.md still lists the
   numeric rating as unconfirmed. TOLD TO HIM. Amazon is no longer named anywhere on the page (rating block, the line
   above the quotes, the two quote sources now read "Verified purchase").
2. "See how an evening goes" button deleted. 3. "A free scent with each" pill deleted.
4. "One room", "Save $19", "Save $28" deleted from the three diffuser cards.
5. Step 2: the seven scents are one list, no Unwind / Be here / Drift off headings. (The scents section lower down is
   still grouped; he commented on step 2 only.)
6. "One 100 ml bottle lasts 15+ days..." is black. 7. "Can't decide?" and "Not sure how they smell?" are centered.
8. A period at the end of each of the three reassurance lines in step 3.
9. "Due today ..." and the renewal sentence above the button deleted. The renewal amount for her kit is now stated only
   in the "When am I charged?" fold-out and the FAQ.
- He also asked for a 1 to 10 rating of everything below the button for friction; given in chat, nothing from it applied.
- Checked on phone and desktop: no errors, no sideways scroll, every path of the buy box still adds up.
