# Diffuser kits in the new brand — preview only (artifact, nothing on Shopify)

Owner (2026-11-15): "Why don't you create an artifact now for the diffuser-kits but now with this branding and principles
applied just to see how it looks."

Artifact "Maison Croyez Diffuser Kits": https://claude.ai/artifact/BG8w2of9xszLDSDEwcTQLi (now version 17, see the rounds at the end; not watched, he replies in chat).

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

## Round 9 (2026-11-21, artifact version 10) — creator photos under the main picture

His words: "check this folder full of images of people using the diffuser and create a section right below the main image
on pdp as a carousel ... and like a title to represent the thousands of customers we have ... theres more than one pic
per creator. make sure all the faces are different. make them squeared too. I need to fill the page with social proof."

- Source: his Drive folder (29 frames from 12 creators, file names carry the creator's name). One frame per creator, read
  through the Drive connector, cropped square to 720 px, saved as img/ugc-01..10.webp (no names in the file names).
- Ten are used. Two creators are left out because the diffuser is not in any of their three frames.
- The strip sits inside the gallery column, right under the arrows: title "Loved in thousands of homes.", ten square
  tiles, swipe on a phone, two arrow buttons. No names and no quotes on the tiles: these are creators' video frames, not
  reviews. "Thousands" is his number; nothing in the repo confirms it (brand-kit.md has "2,500+ women", unconfirmed).
- The left column is taller now, so it only stays pinned on screens 900 px high or more.

## The seven gallery pictures (2026-11-21) — gallery/

His words: "for the diffusers specifically and based on all the data we've gathered in the past few months. Would you be
able to determine the 7 pieces of information and angles these prospects should know right away to remove 85%+ of
friction? If so, I need you to generate them as images as we did with the magnesium soak. Branded, different layouts,
with the important information."

Review page: https://claude.ai/artifact/KwVy9bytKra8cC2SwZAAg1 (gallery/review.html, built by gallery/build-review.py).
Pictures: gallery/out/diffuser-gallery-01..07 (2000 x 2000 JPEG), drawn by `node gallery/make-gallery.js`; alt text in
gallery/alt-text.json. In the page gallery since round 10 (img/g-01..07.webp, 1400 px), after the video.

1. What it is: "Scent for the whole room. No water. No flame." 10 min, 600 sq ft, 1 button.
2. How it smells (survey reason one): first scent free, the seven scents with their notes, free swap.
3. Safe to leave on: no flame, no water, no heat, the timer, the survey quote about the bedroom.
4. Why not a candle or a plug-in: the four rows of the page's comparison slide.
5. How to use it: pour, press, exhale; three strengths (Subtle, Balanced, Full), timer, night light.
6. How long a bottle lasts and what it costs after today (survey reasons two and three): 15+ days, "under $2 an
   evening" (assumes the $29 refill), refills optional, an email before every charge, skip or cancel.
7. The promise: 30 days, free shipping, prepaid return label, free scent swap, lifetime warranty.

Every fact is one the page already states. "85%" is not something these pictures can be shown to do; they cover the
objections that appear in the survey and in the page's own questions. Photos: old/ (the photo shoot) for 4, 5 and 7,
img/dk-* (generated from the real product photo) for 1, 3, 5 (step two) and 6, old/pick-* for the scent boxes.

## Round 10 (2026-11-21, artifact version 11) — "Make all the fixes you can now and swap in the images"

- Gallery: the video, then the seven pictures (img/g-01..07.webp, made from gallery/out at 1400 px). The five older
  slides and the HTML comparison slide are out of the page; their files stay in img/. Eight dots.
- Reviews: the four empty video slots are gone; the rating is one strip above the six quotes.
- "Complete the evening" (soak, steamers, spray: products that do not exist yet) is removed.
- Scents section: one flat grid of the seven scents plus "Can't decide?", no mood headings, no sideways scroll (four
  across on desktop, two on a phone). Eyebrow "Seven scents".
- "What to expect | How to use it" is one section without the switch: "As simple as 1, 2, 3." (three photo steps, three
  ticks), then "An example evening." (the timeline) and the honest part.
- The guarantee near the button is said once: the trust row keeps free shipping and lifetime warranty, the card above
  it carries the 30 days. The full promise section lower down stays.
- "When am I charged?" now answers with her own numbers (id `charge`, written in render()): what she pays today, that
  the scents are free, and the refill total per delivery for her kit and frequency, or "nothing renews". This is where
  the refill total lives; the "Due today" and renewal lines he deleted near the button were not put back.
- Not changed, waiting on facts from him: delivery time, where it ships, diffuser size / cord / noise, how a return
  starts and how fast the refund lands. The "what it isn't" box is still on the page.
- Checked on phone 400 px and desktop 1440 px: no errors, no broken pictures, no sideways scroll, 8 slides / 8 dots,
  the charge line for 1, 2 and 3 diffusers with and without refills.

## Round 11 (2026-11-21, artifact version 12) — his seven changes and his delivery, size and return facts

His words: "Remove the video, let's leave a main image that basically represents what we're doing here, like the main
purchase driver. We should include diffuser and scents of course. / Let's move the customers carousel below this
section: A waterless scent diffuser for the evenings ... then move the Loved in thousands of homes. to the right side. /
Add a sticky button please that shows from the beginning, all purple. / Sound familiar? Home at last. Still switched on.
-> Turn it to a straight straight claim please. / Delete: The honest part ... / Pick the evening you want. -> Make this
section way smaller please, group them in rows of 4. no add this one buttons. / Delete What it isn't section." Then:
"Delivery time 5 vusiness days from Miami. Diffuser size ... 4" L x 4" W x 11.5" H (about 103 x 103 x 293 mm), and weighs
2.25 pounds. Return free of stress and refund right away".

- Gallery: no video. First picture is the new main one (gallery/out/diffuser-gallery-00-main.jpg -> img/g-00.webp):
  the old page's photo of the diffuser with three scents (old/g-d92.webp), "Leave the day at the door.", "One press.
  The whole room in about ten minutes.", three ticks (10 min / no water, no flame / first scent free) and the 30-day
  seal. Then the seven. Eight dots. The smallest print on the boxes in that photo is not letter-perfect.
- Customer photos: moved out of the gallery column to right under the opening paragraph. The photos scroll on the
  left, "Loved in thousands of homes." sits to their right (my reading of "to the right side"), arrows under it on
  desktop.
- Sticky button: one full-width purple bar, on from the first pixel. It says "Pick your scents | $159" until the scents
  are picked (tap jumps to step 2), then "Checkout | $159". The 1 / 2 / 3 switch and the summary are no longer shown in it.
- "Sound familiar? / Home at last. Still switched on." is now "What it does / Your home goes from day to evening in ten
  minutes." The four tabs under it are unchanged.
- "The honest part" box and the "What it isn't" box are deleted; that section's title is "Why this one."
- Scents section: a small list, four to a row on every screen (thumbnail, name, family; the notes show on desktop), no
  "Add this one" buttons; the eighth tile is "Can't decide? Take our best sellers".
- His facts: trust row "Free shipping from Miami / Arrives in about 5 business days / Lifetime warranty"; size and
  weight in "What's in the box" and a new FAQ "How big is the diffuser?"; delivery in "Shipping, returns + warranty" and
  a new FAQ "How long does delivery take?"; returns worded "tell us and we send a prepaid label and refund you right
  away" in the fold-out and in "What if I don't like it?". Still unknown: where it ships to, cord length, noise level.
- Checked on phone 400 px and desktop 1440 px: no errors, no broken pictures, no sideways scroll.

## Round 12 (2026-11-21, artifact version 13) — his nine comments on version 12

- Gallery: the row under it (arrows + dots) is gone; two round arrows sit on the picture. No dots.
- The opening paragraph ("A waterless scent diffuser for the evenings you can't switch off...") is deleted.
- "Loved in thousands of homes." is a full title above the photo strip (arrows at its right); photos 5% bigger
  (88 px, 78 px on a phone).
- Fourth bullet ("Don't know how it smells?") deleted; three bullets left.
- "Step N of 3" labels are bigger and bold. The notes line of every scent in step 2 is bold.
- The four tabs under "Your home goes from day to evening in ten minutes." are four good feelings instead of four
  problems: The day stays outside / Ready for bed / Safe to leave on / Nothing to look after. Each panel: the feeling,
  how, and "Why it works".
- The three ticks under "As simple as 1, 2, 3." (night light, timer, two rooms) are deleted.
- Scents section, eighth tile: "100% organic ingredients / Paraben-free / Cruelty-free" instead of "Can't decide?".
  His words; the same three claims are on his Candle Swap page (there with "IFRA 51 compliant" too).

## Round 13 (2026-11-21, artifact version 14) — what is worth keeping from The Candle Swap and MC LP Draft Copy 3

His words: "what valuable info would you take from these two artficats? ... we cover important stuff in here too that
even if it's not related to the new angle, may be worth having it whether it's on the image gallery at the top or
sections." I listed ten; he answered "Implement all the ones you think are good". Sources: The Candle Swap
(https://claude.ai/artifact/M5BYkHwT7ek97t7QJ6qqdM) and MC LP Draft Copy 3 (https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN).

Added:
- "Smells like" for each scent (Draft Copy 3 wording): a line in every step 2 row, on the small scent tiles (desktop), and
  in gallery picture 2 (the short "Like ..." half, above the notes).
- Why it fills the room: a paragraph under "Why this one." (pure oil as a fine dry mist; candles, plug-ins and reeds
  scent the air next to them) and the sub line of gallery picture 4.
- Kids, pets, allergies: "Safe to leave on overnight, in a kid's room or near pets." in the third tab, and two FAQs in
  The Candle Swap's wording ("hypoallergenic" is in brand-kit.md's verified list).
- The guarantee in full: "even if you've tried the scents. No forms, no arguing." and "If it ever stops working, we
  replace it." in the promise section, the fold-out and the FAQ.
- "Loved in 2,500+ homes." as the photo title (his number: The Candle Swap, brand-kit.md).
- Three more survey reviews (nine now): heavier stream than two other waterless diffusers / almost didn't buy because
  of the price / bought it for dog smell. Quotes and tags as they stand in Draft Copy 3's survey list.
- A note from the founder before the reviews: Patricia's words from The Candle Swap, shortened (no "ingredients from
  France", no health passage), with her photo (old/patricia1.webp). The first tab's picture is now old/hero-frame.webp so
  her photo is not on the page twice.
- FAQ "How long does one bottle last?": about 15 to 21 days on the everyday setting, higher settings use it faster.
- New gallery picture 08 (the look and the size): "Guests ask what it is. Most people think it's a speaker.", Michael
  C.'s review line, 11.5 in / 4 x 4 in / 2.25 lb on the real product photo (assets/cdn/diffuser/d25.png). Nine
  pictures in the gallery now.

Left out on purpose: the five health alerts and their statistics, the $2,532-a-year cost table (an example), "eliminates
pet and food odors", the "first 1,000 free" offer, the manifestation wording, "92% come back", "IFRA 51" (not confirmed),
the six named carousel reviews of Draft Copy 3 (marked fictional in its own code), and room names on the step 1 cards
(he deleted "One room" there on 2026-11-21).
Open questions put to him: "Pour it in" vs "the bottle locks in"; whether returned scents come back or stay.

## Round 14 (2026-11-21, artifact version 15) — his twelve comments on version 14

- Rating line 10% bigger; the eyebrow "Maison Croyez waterless diffuser & scents" 15% bigger.
- Photo title: "Loved in 2,500+ homes across America."
- Step 2: the scents sit two to a row (small picture + name, the stepper, then "Smells like" and "Notes").
- Step 3: title "Select your frequency and get 25% OFF lifetime:" (his words); the "Subscribe. Save 25%." pill is gone.
- The small labels above the section titles are removed everywhere (eight of them). The scents title is now "Seven
  scents. Pick the evening you want."; the founder's note has its own title, "A note from our founder."
- The founder's note is the first section under the buy box (after the fold-outs under the button).
- "Your home goes from day to evening in ten minutes.": no tabs; four cards, two to a row on every screen (picture,
  feeling, one or two lines). "Why it works" removed from each.
- "As simple as 1, 2, 3.": the three pictures are 30% of their old width and sit beside each step.
- The promise section is centered.
- Headline: he asked for four ideas, given in chat; the headline on the page is unchanged until he picks.

## Round 15 (2026-11-21, artifact version 16) — the headline, and "We're ready to deploy"

- Headline (his pick, idea 1): "Walk in stressed? Fill the room with a scent strong enough to change your mood."
- His words: "Let's do 1. We're ready to deploy. Ask me q's if you need anything". Nothing was written to Shopify in this
  round: the Shopify connector answered as Carbinox Co. (shopcarbinox.com), so no write was made, and the deploy
  questions (store connection, where it goes live, prices and refill plans, facts to confirm) were put to him first.

## Deployed to the hidden test page (2026-11-21)

Live at https://maisoncroyez.com/pages/diffuser-kits-2 (not linked, hidden from search). The store build is in store/
(build-deploy.py -> mc-dkr.css, mc-dkr-app.js, page-body.html); everything created in the store, the checks and how to undo
it are in store/STATUS.md. Refills are off until the Subi plans exist; the cart needs the owner's test checkout.

2026-11-22: speed pass on the test page (mobile about 61 -> about 82, LCP 6.6 s -> 3.9 s; desktop 97-98) and the refill step
switched to 30 / 60 / 90 days at $29.95 instead of $39.95. Refills are still not wired; the reason and the open decision
are in store/STATUS.md. One review no longer names two competing diffusers.

## Gallery round 2: rebuilt on the owner's shoot (2026-11-22)

Owner: "I still don't love some of the images used to build the main carousel" + a zip of 18 photos from his shoot
(800 x 800, exported from Canva). They are in gallery/shoot/shoot-01..18.jpg. What they have in common: side daylight,
low contrast, shallow focus with the diffuser sharp in front; plaster walls, linen, walnut, stone, plants, a dog, friends
on a sofa; evening shots dark with the night light as the one warm point.
- All nine pictures now use only those photos (00 main: 14 | 01: 15 | 02: 5 | 03: 11 | 04: 1 | 05: 2, 1, 8 | 06: 14 |
  07: 6 | 08: 10). Nothing generated. Words unchanged, except the main picture's alt text.
- Palette from the photos: linen #F4EFE7, plaster #E6DDD0, clay #CBBBA8, walnut #4A3526, espresso #211811. The purple
  (#4B55D6) is only the accent now: no purple or lavender blocks, no peach gradient. Picture 08 lost its measuring lines
  (the three numbers carry the size).
- The photos are 800 px, so they are enlarged about 2x (gallery/prep-shoot.py -> gallery/hd, not committed). With the
  full-size originals saved as gallery/hd/shoot-NN.png, `node gallery/make-gallery.js` gives sharp pictures, no other
  change. A sharpened set was made in Higgsfield (2 of 18) but could not be downloaded into this session.
- Preview page and review page updated (artifact versions 18 and 3). The store page is not changed yet.

2026-11-22, five more photos from the owner (2000 x 2000 webp): shoot 19 entry table with keys and a Wildwood bottle,
20 three scent boxes on green marble, 21 travertine side table with a mug, 22 sofa and coffee table with a golden dog,
23 desk with a journal, the Wildwood box and bottle. Full size in gallery/shoot-full/shoot-19..23.webp, 800 px copies in
gallery/shoot-800/ (the ones uploaded to the store's Files as mc-shoot-NN-<name>.webp) and gallery/shoot/shoot-NN.jpg.
Not used on the page yet: he will say which pictures to switch. To check before use: the small print on the bottle in
19 and on the box and bottle in 23 is not the real label text (19: "FIMIIICATION", "3 Sulss"; 23: "100 ml | 2.56oz",
misspelled notes). 20 reads correctly.

## Round 16: alignment pass, site footer (2026-11-22)

Owner: "make sure all sections are symmetric in terms of size", "make the footer the one that appears on the site", and
a comment: delete the "Maison Croyez waterless diffuser & scents" label above the headline.
Measured with scratchpad sym/audit.js (per section: padding, title size, space under the title, grid items) on 390 and 1440.
- One title size for every section (32 px phone / 58 px desktop): the founder note (was 22 / 30, now a normal title above
  the photo and quote) and the scents section (was 26 / 36). One section padding (52 / 101; the scents section was 30 / 52).
  One space under a title before the first block (--gh, 24 / 44; was 8 to 44).
- Step 2: name, - 0 +, "smells like" and "notes" sit on the same lines in both tiles of a row (subgrid). The seventh tile
  no longer sits next to an empty slot: "Can't decide? Take our best sellers." is the eighth tile (it stays, greyed, as
  "Best sellers picked." once used). The swap line's icon sits with its text.
- Day-to-evening cards: titles and paragraphs line up across a row. 1, 2, 3: the three step titles sit on one line.
- Small scent tiles: equal rows; on a phone the note line sits at the bottom of every tile.
- Promise: the four lines are one centered block with the checks in one column. Reviews: equal cards, names on one line.
- Preview footer copies the store's footer (newsletter, two link columns, social, payment marks). The store build drops
  it; the theme's own footer shows there.
- Store build: handles @supports; the white strip between the page and the theme footer is closed (bottom margin and
  padding of the theme's page wrapper set to 0). Built as dkr8-align, NOT deployed.

## Round 17: six comments (2026-11-22)

Applied: headline sized to its column (container width, 38 px on a phone, 51 px on a 1440 desktop; it used to leave
about 70 to 95 px empty on the right); small arrows on the customer photos on a phone too; founder photo a little
bigger (square on a phone, 47% of the row on desktop) with 6 px corners; her quote 5% smaller. Checked, no change
needed: the three step 1 cards are the same size (114 x 197 on a phone, 156 x 180 on desktop, inner lines at the same
heights). NOT applied: "Include it is 50ml on each" on the step 2 scents. The store only sells 100 ml scents ($39.95,
the seven products wired to the page) and the page says 100 ml in twelve places, so the owner was asked which is right.
Store files built as dkr9-comments, not deployed: the Shopify connector asked for a new sign-in.

Round 17b: the owner chose "100 ml on each tile" for the size comment; each of the seven step 2 tiles now carries a small
"100 ml" line under its scent family. Store build dkr9-comments rebuilt with it.

Round 17c: headline 15% smaller on his word (32 px on a phone, 43.5 px on a 1440 desktop). Store build dkr10-h1.

Round 17d (comment sent to Claude, 2026-11-22): headline and the "Loved in 2,500+ homes" title 20% smaller (headline 26 px
on a phone, 35 px on a 1440 desktop; photo title 17.6 to 22.4 px). Store build dkr11-h1b, not deployed.

Round 17e (comment sent to Claude, 2026-11-22: "Reduce 20px for phone and 30px in desktop"): read as "reduce to": the
headline is 20 px up to 860 px wide and 30 px above (taking 20 / 30 px off 26 / 35 px would leave 6 / 5 px). Store build
dkr12-h1c, not deployed.

Round 17f (comment sent to Claude): the "Most popular" and "Whole home" badges on the step 1 cards sit centered on their
card (they were 10 px from the left edge). Store build dkr13-tags, not deployed.

Round 17g (comment sent to Claude): headline 15% bigger, 23 px on a phone and 34.5 px on desktop. Store build dkr14-h1d,
not deployed.
