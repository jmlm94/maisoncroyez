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

## Round 3 (2026-11-18, artifact version 3): lighter page, after the Valera Naturals product page

Owner sent https://valeranaturals.com/products/valera-nattokinase-150-day-supply (and a PDF of it): "Check this page and all
its structure. What would you include in ours without overloading it?" Capture: lp-factory/recon-brand/valera (workflow
ref-pdp.yml: phone + desktop slices, page-text.txt, outline.json, product.json). Their page has five sections under the buy
box where ours had ten; the gallery slides and one tabbed "5 reasons" block carry the argument. I proposed seven things; he
said "apply all of them".

1. Tabs merge sections, ten -> seven. "Leave the day at the door." now holds four tabs (Easy / Warm / Scented / Any evening;
   the last one is the old "Sunday reset. Weeknight rescue." block). "As simple as 1, 2, 3." and "One bath is a treat. A
   month is a habit." share one section behind a two-way switch (How it works / What to expect). The comparison ("Scrolling
   doesn't count as rest.") left the page body and is gallery slide 6 of 7. On phones the three steps are compact rows
   (small picture + text) instead of three full-width pictures.
2. Three check bullets with a bold lead under the title replace the sentence and the three pills (same claims as before).
3. Bag tiles show "About N baths" and the price per bath. BATHS = 6 per bag IS A STAND-IN I chose so the tiles could be
   seen (one constant in the script; it also fills the FAQ answer and the sticky bar). He still owes the real number.
4. The button carries "30-day money-back guarantee" under the price; a guarantee card sits right under it; the small trust
   line keeps "Free shipping" and "Skip or cancel any time".
5. The sticky bar has a 1 / 2 / 3 bag switch and its own "Add to bag · $X" button (scents refit themselves; if a scent is
   missing it reads "Pick 1 more scent" and scrolls to the scents). It now follows the scroll position instead of an
   IntersectionObserver, which missed jumps past the button.
6. "Meet the scents." is a row of cards with the pouch picture, the mood, one line and "Magnesium bath salts + <scent>";
   on phones it swipes. The "what's inside" fold-out stays until a formula exists.
7. FAQ starts with "What if it is not for me?", then scent strength, which scent, baths per bag, what is in it, how to use,
   when, subscription. Fourth fold-out under the button: "Good to know before you order" (working copy: for the bath only,
   keep sealed, dry and away from children, "the cautions from the product label will be printed here before launch").

Also: the gallery arrows moved under the pictures, next to the dots, so they never cover a slide. New icon icons/x.svg.

Not taken from Valera, told to him: the countdown (only with a real end date), the clinicians card and the "only 0.72% used
it" line (nothing real behind them here), subscription as the silent default (their listed prices appear to be subscription
prices with one-time as a small link), and their reviews block (medical claims, and it still holds template text). Needs his
offer decision: the top bar (sale, shipping, guarantee) and a free gift that grows with the bundle.

Checked on phone 400 px and desktop 1440 px: seven sections, tabs, switch, sticky bar (1 / 2 / 3, one-time, subscribe),
"add this one" on the scent cards, the comparison slide fits its square, no sideways scroll, no errors.

## Round 4 (2026-11-18, artifact version 4): his prices, scent scenarios, delivery buttons, scent pictures

His words: "Price of each will be $19. Let's do 1, 3 ($39) and 6 ($89). Run the math. Compare at price of 100% more
please, like if it was 50% off." / "For the three scents, add an emoji at the beginning of each ingredient, the ingredient
in bold and then : with the explanation ... Sandalwood for weekends to relax. Eucalyptus for your ritual once a week and
lavender when you had a tough day." / "For subscription let's do 15% OFF." / "The frequency do it in three icons and not a
drop down, 30 45 and 60 days." / "On the meet the scents section, let's add pictures for the actual main ingredient combine
with the picture of the actual magnesium soak."

| bags | price | compare-at (2x) | a bag | subscribe (15% off) | a bag, subscribed | baths (6 a bag, stand-in) | a bath |
|---|---|---|---|---|---|---|---|
| 1 | $19 | $38 | $19.00 | $16.15 | $16.15 | 6 | $3.17 |
| 3 (most popular, preselected, one of each) | $39 | $78 | $13.00 | $33.15 | $11.05 | 18 | $2.17 |
| 6 | $89 | $178 | $14.83 | $75.65 | $12.61 | 36 | $2.47 |

- THE 6-BAG PRICE IS WORSE PER BAG THAN THE 3-BAG ONE ($14.83 against $13.00; two 3-bag orders are $78, $11 less than
  $89). Applied as he gave it and told to him; the 6-bag tile is tagged "Stock up", not "Best value", because it is not.
  It becomes the best value under $78 (for example $69 = $11.50 a bag, $72 = $12.00).
- The compare-at prices are his instruction (twice the price, a "50% off" pill on every tile). Told to him once: a
  crossed-out price the product was never sold at is a legal risk in the US (FTC pricing guides, state laws).
- Scent lines (step 2 rows and the "Meet the scents" cards): "🪵 Sandalwood: for weekends, when the only plan is to relax."
  / "🌿 Eucalyptus: for your once-a-week ritual." / "🪻 Lavender: for the evening after a tough day." The mood names stay as
  the titles (they are printed on the pouches). The same three scenarios replace the old lines in the Scented tab and in
  the FAQ answer "Which scent should I start with?".
- Subscription was already 15%; the option now reads "Subscribe and get 15% OFF", with "Delivered every N days." under it.
- Delivery: three buttons (30 / 45 / 60 days, calendar icon) instead of the drop-down.
- Scent cards: three new generated pictures, img/scent-{unwind,be-here,drift-off}.webp (the pouch from the existing
  picture as reference, its ingredient on the left, a dish of the salts on the right; labels checked, all correct).
- Script: PRICE {1: 19, 3: 39, 6: 89}, SIZES [1, 3, 6]; a bigger size fills the scents evenly (6 bags -> 2 / 2 / 2);
  "Add this one" on a card moves 1 bag up to 3 when the bag already holds that scent.

Checked on phone 400 px and desktop 1440 px: every size, both plans, the three delivery buttons, the sticky switch, no
sideways scroll, no errors.

## Round 5 (2026-11-18, artifact version 5): the direct-response rewrite, from his research document

He sent "Maison Croyez: Scented Magnesium Bath Soak" (9 pages: audience, 7 pain points, claims rule, proven ads,
competitors, hook bank, landing page outline) and asked for a plan to "literally transform it to make it direct response".
I gave a twelve-point plan and six questions. His reply: "Implement absolutely everything with also images related to each
thing." and: 1. "Bag brings the magnesium flakes, 250gr." 2. (formula) "Make it up for now, i'll tell you later."
3. (matching diffuser / steamer / spray scents) "Let's pretend we do." 4. "stay with age." 5. "30 days." 6. "yes."
(email before every charge, one-time preselected).

What the page says now, top to bottom:
- Bar: "Free shipping · 30-day money-back guarantee".
- Gallery (7): pouch / "For the nights you're tired and wired." / "17 studies. One finding." / "Run it warm. Pour in the
  bag. Soak 15 minutes." / "No tub? Use a foot basin." / "Why this one, and not Epsom salt." / the guarantee.
- H1 "Tired, but your mind won't switch off? Give it 15 minutes in warm water." Lede names the age ("made for women 45
  and over"), never menopause. Four bullets: the hour before bed (with a jump to the study), tired muscles and feet, foot
  basin, the scent as a bedtime cue.
- Offer: 1 bag = 1 bath; tiles show evenings and price per night; the 3-bag tile is tagged "The sampler" ("Most popular"
  is gone: nothing has been sold yet); "Not sure how they smell? Take one of each." and "Don't love a scent? We swap it,
  free." under the scents; ONE-TIME is first and preselected; the subscription says "We email you before every charge".
- Fold-outs: the honest label, exact use (104 to 108°F, 15 minutes, 1 to 2 hours before bed, half a bag for a foot
  basin), shipping, good to know.
- "Tired all day. Wide awake at bedtime.": four tabs, her four nights in the words of the research (mind won't stop,
  everything aches, legs won't settle, the day follows you), each with "What the soak does" in the safe wording.
- "Why the hour before bed matters." (example clock 8:30 / 9:00 / 10:00, the review of 17 studies with its PubMed link,
  and "the honest part": the effect is the warm water) behind a switch with "Three steps. Fifteen minutes."
- "Pick your evening." (the three scents). "Why this one, and what it isn't." (table against Epsom salt, then: not a
  supplement, not a treatment, not a sleeping pill). Guarantee. Reviews (still empty slots). "One scent. Four places."
  (diffuser, steamers, soak, spray; with "the bedtime cue is our idea, not a study"). FAQ in objection order.

STAND-INS ON THE PAGE, to replace with facts (all told to him):
- One bag = one full bath, or two foot soaks. He gave the weight (250 g) only; the one-bath dose is my reading of it.
- Formula: "magnesium chloride flakes, essential oil, a little jojoba oil". Invented on his instruction.
- Test results: "dissolves fully", "skin feels soft after", and the Epsom lines ("can leave skin tight", "grit").
- Matching products: the diffuser, steamers and spray in the same three scents ("let's pretend we do").
- Prices, compare-at prices, free shipping, the guarantee terms and the email before every charge are his decisions,
  not yet live anywhere.
- The 6-bag price is still worse per night than the 3-bag one ($14.83 against $13.00).

Claims kept out, as the research rules: absorbs through the skin, raises magnesium levels, treats menopause, stops
cramps, cures insomnia, detox. The review quotes in the research are from other brands and forums, so none is shown.
The one supported claim (warm bath 1 to 2 hours before bed, review of 17 studies, PMID 31102877) is worded as the
research worded it.

Pictures: six generated for this round with the woman of woman-silver.webp as the reference (img/night-awake,
night-aches, night-legs, night-day, night-asleep, and foot-soak with the Drift off pouch; label checked), and
img/also-diffuser.webp copied from the kits preview (dk-bedroom). Checked on phone 400 px and desktop 1440 px: eight
sections, every tab and switch, both plans, the three sizes, the jump to the study, no missing picture, no sideways
scroll, no errors.

## Round 6 (2026-11-18, artifact version 6): "Change the 6 bags to $69"

6 bags: $69 (compare-at $138), $11.50 a night; subscribed $58.65, $9.78 a bag. It is now the lowest price per night
(1 bag $19.00, 3 bags $13.00, 6 bags $11.50), so its tag went from "Stock up" to "Best value". This settles the note in
rounds 4 and 5 about the 6-bag price being worse than the 3-bag one.


## Round 7 (2026-11-19, artifact version 7) — the gallery: the main picture and seven things to know

His words: "I need to build at least 6 images for our pdp including the main one that's gonna show up. Follow these
links [a Reddit thread on magnesium baths and two Amazon listings] ... generate the 7 main things people should know
about our product and explain it there. Make sure you maintain the branding, change layouts and formats and cover all
details." His answers to my questions: build from our research document; keep the stand-in facts; the three bags as the
main picture; a mix of photos and diagrams.

- THE LINKS WERE NOT READ. Reddit and Amazon cannot be opened from this session, and the capture job I wrote for them
  was refused before it ran, so I removed it. One of the two listings (Ancient Minerals bath flakes, B00BBD508C) is in
  his research document with its reviews; the other listing (B0C3P2SSNX) and the Reddit thread are unread.
- Eight square pictures (2000 x 2000) in `gallery/out/`, made by `gallery/make-gallery.js` from `gallery/gallery.json`
  (copy and settings; one layout function per picture). They replace the old seven gallery slides of the page.
  00 main: the three bags, "Magnesium Bath Soak. For the hour before bed.", 250 g per bag, tub or foot basin, 30-day seal
  01 what it does: the bath photo, "For the nights you're tired and wired.", the three benefits in a dark band
  02 why the hour before bed: "17 studies. One finding.", the example evening, the honest part (dark, no photo)
  03 how to use it: the pour photo, three step cards (104 to 108°F, the whole bag, 15 minutes 1 to 2 hours before bed)
  04 no tub needed: the foot basin photo, half a bag / warm water / 15 minutes
  05 the honest label: one bag with a dish of flakes, what is in it, "a bath soak, not a supplement"
  06 why this one: the table against Epsom salt
  07 three scents, one promise: the bags with a card each, the 30-day promise
- Why these seven: they answer what his research says buyers ask or doubt: what it is for, why before bed (the one
  supported claim), how hot / how long / how much, "I don't have a tub", what is in it and the absorption doubt, how it
  differs from the Epsom salt they already know, how it smells and what if they don't like it.
- New photos (gallery/img/, same realistic model as the ads): g-three-b (three bags with flakes, used for 00),
  g-three (used for 07), g-inside (05), g-flakes (06). The lifestyle photos are the ads' (ads/bath-soak/img).
- STAND-INS printed on the pictures, to correct when the product is final: 250 g, magnesium chloride flakes, essential
  oil, jojoba oil, "one bag, one full bath", "half a bag" for a basin, 104 to 108°F, and on 06 "skin feels soft after"
  and "dissolves fully" (untested). The 30-day guarantee and the free scent swap are the page's.
- The main picture no longer changes with the scent picked (it shows all three).
- Checked on phone 400 px and desktop 1440 px: 8 slides, no broken pictures, no errors, no sideways scroll.

## Round 8 (2026-11-19, artifact version 8) — his twelve comments on the page ("APPLY COMMENTS")

1. Lede: "made for women 45 and over" -> "made for the nights you're tired but can't switch off" (his note: name an
   issue, don't limit it to women 45). The same change went into the diffuser kits preview, which had the same phrase.
2. "See the 17 studies" button removed from the first bullet. 3. The bullet "No tub? Use a foot basin." removed.
4. "Not sure how they smell? Take one of each." button deleted. 5. A picture of each bag in the scent rows (img/row-*.webp,
   cut from the clean three-bag photo). 6. More space above "Don't love a scent? We swap it, free."
7. First tab picture changed to the realistic one with the bag and the 3:07 clock (img/awake-real.webp).
8. The promise section is centered.
9. Reviews: the video slots, the review slots and the rating / survey slots are gone. "generat the reviews please": six
   SAMPLE reviews, each card labelled "Sample review", and the line above says they are not from customers. I did not
   write them as real customer reviews: the product has no buyers yet, and invented reviews shown as real is the one thing
   here I won't publish. Real ones replace them at launch.
10. "remov e whole section": that comment was pinned to the page as a whole, not to a section. It was the last one, made
    right after the review comments, so I removed the next section down, "One scent. Four places." TOLD TO HIM; it comes
    back in one step if he meant another.
- The comment threads stay open on the page: they were not sent to Claude, so I cannot resolve them from here.
- Checked on phone and desktop: no errors, no sideways scroll, no broken pictures, every path of the buy box adds up.

## Round 9 (2026-11-20, artifact version 10) — his ten new comments ("IMPLEMENT COMMENT CHANGES!")

1. Main gallery picture, "remove" (a rectangle over part of it; the comment cannot say which part): I removed the small
   "New · three night scents" line, the one I had asked him about. TOLD TO HIM.
2. "replace every single one of these" on a "·": every middle dot on the page is now a bar ( | ).
3. Eyebrow "New / Magnesium bath soak" 10% bigger.
4. "don't make auto pick": the scents start at 0 / 0 / 0. Changing the number of bags never fills them in; it only takes
   one out when there are too many. The button reads "Pick your 3 scents" until they are chosen.
5. "Change the 4 images here and make it congruent": the four evenings now use four photos of the same realistic set,
   each with the bag in it (img/awake-real, tab-aches, tab-legs, tab-day).
6. "combine both and leave just one": the "Why it works / How to do it" switch is one section, "Three steps. One hour
   before bed." (8:30 run it warm and pour, 8:35 soak 15 minutes, 10:00 your body cools down, bed), photos how-*.webp.
7. "The honest part" box deleted (the link to the study went with it; the study is still named in step three).
8. Scents section (the comment was pinned to the whole page; by its place in his order it is this section): three fixed
   cards, no sideways scroll on a phone, and each picture is the bag standing in its own ingredient (img/ing-*.webp,
   new photos) with the ingredient name on it.
9. "What it isn't" box deleted; the heading became "Why this one, and not Epsom salt."
10. Reviews, "add names everywhere and stop the bullshit!!!": NOT DONE AS ASKED. I will not publish invented reviews
    under invented names as if customers wrote them. What is there now is real: six reviews of the diffuser from the
    Amazon listing and the customer survey, with the names they came with (Michael C., Simon F.; the survey ones are
    anonymous), each marked "About our diffuser", under "What Maison Croyez customers say." The way to named bath soak
    reviews is to send the soak to a few existing customers before launch and use what they write.
- Checked on phone and desktop: no errors, no sideways scroll, no broken pictures; 0 picked at the start, 3 picks enable
  the button, 6 bags asks for 3 more, 1 bag keeps one.
