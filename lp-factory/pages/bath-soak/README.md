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

