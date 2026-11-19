# Bath soak static ads (12)

Nothing here is uploaded to Meta. Review page: artifact "Bath Soak Ads" (`gallery.html`).

## Version 2, 2026-11-19 (current)

The owner on version 1: the branding is fine, but (1) every ad must show the product itself, in use or as a product
picture; (2) every ad must say that the product is a magnesium bath soak; (3) "I don't see them extremely real ... this
is basically what you did for the product page, and I didn't like that. Try to get something as real as possible",
another model if needed; (4) many different lifestyle pictures, "someone on the bathtub with the product there, the
other one pouring the soak into the bathtub"; (5) "all of the images should contain the 3 biggest benefits", as a list
or with icons.

What changed:

- **Photos.** All redone as candid photos in ordinary homes (plain bathrooms, a living room, a kitchen table, a
  bedroom at night), no warm glow, real skin. Model: `nano_banana_2_1` (2k, thinking high) with the pouch pictures as
  references. Three models were tested on the same scene first; this one gave the most real result and kept the label.
  The prompt does most of the work: "candid, unretouched", "ordinary lived-in home", "available light", "no golden
  glow, no haze, no airbrushed skin", and a framing rule (upper 40% plain wall, subject in the middle, lowest 20%
  empty) so the hook and the card fit. Scenes that came back too tight were reshot wider (r3-*, r4-*).
- **The product is in every photo**: on the tub ledge while she soaks, in her hands, being poured, beside the foot
  basin, on the nightstand, in the gift box. The clock ad shows it in its first picture.
- **The card at the bottom of every ad** names the product ("Magnesium Bath Soak") and lists the three benefits with
  icons: Wind down before bed / Soothe tired muscles & feet / Calm a busy mind. These three are my pick from the page
  and the research (wellness wording, inside the claims rule). They live in `ads.json` (`benefits`), one edit changes
  all twelve.
- Layout in `make-ads.js`: wordmark, hook, optional sub-line, photo, card. Per ad: `size` (hook), `fade` (how far the
  wash behind the hook reaches), `zoom` + `origin`, `shift`, `tag` (the small line in the card).

Files: `ads.json` (copy, benefits, captions) · `img/` (13 photos) · `icons/` (three Lucide icons, ISC licence) ·
`fonts/` · `make-ads.js` -> `out/bath-soak-ad-<id>.jpg` (1792 x 2240) · `build-gallery.py` -> `gallery.html` and
`captions.md`.

The twelve: 01 awake at 3 AM (bag on the nightstand) · 02 tired and wired (on the tub edge, bag in her hands) ·
03 "I don't need a spa day" (in the bath) · 04 17 studies (running the bath) · 05 the evening clock (pour, cool down,
sleep) · 06 everything aches (in the bath, hand on her neck) · 07 foot basin on the sofa · 08 legs in the water ·
09 one bag one bath (pouring) · 10 pick your evening (three bags, a hand choosing) · 11 not a supplement (a customer
holding the bag) · 12 gift for mom (opening the box with her daughter).

Claims: nine ads use wellness wording; 04 and 05 and the caption of 01 lean on the supported claim (a warm bath 1 to 2
hours before bed), and 04's source line says the studies are about warm baths. Nothing says absorbs, raises magnesium,
treats, cures, cramps, insomnia or detox. No menopause, no price.

Told to the owner: the people and rooms are generated, not customers; the big words on every bag are right, the
smallest line of print is not letter-perfect on 01, 07 and 12 when zoomed all the way in; "one bag, one bath" (09) is
still my reading of 250 g; the 30-day guarantee and the scent swap in three captions are the stand-ins from the page.

## Version 1, 2026-11-18 (replaced)

Warm, styled pictures (the look of the product page), hook and sub-line only, a small "Magnesium bath soak" label.
Four of the twelve had no product in them. In git history before 2026-11-19.
