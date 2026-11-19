# Bath soak static ads (12)

Nothing here is uploaded to Meta. Review page: artifact "Bath Soak Ads" (`gallery.html`).

## Version 3, 2026-11-19 (current)

The owner on version 2: the benefits looked the same on every ad ("the way you did it is basically the same for each
one"); "add a call to action button on each one ... totally related to a conversion"; change the positions and the
titles that repeat; "different setups and different frameworks and different layouts, and that way we can attack
different audiences".

Same thirteen photos as version 2. What changed is `make-ads.js`: one layout function per ad (`layout` in `ads.json`).

| Ad | Layout | How the benefits show | Button |
|---|---|---|---|
| 01 awake | `list` | a list on the dark wall under the hook | Try it tonight (wide, cream) |
| 02 tired and wired | `callouts` | three callouts around her | Shop now |
| 03 spa day | `band` | a dark band across the bottom | Shop now |
| 04 17 studies | `framed` | numbered 01 / 02 / 03 under a framed photo | Start tonight |
| 05 clock | `clock` | one row under the timeline | Shop the magnesium bath soak (wide) |
| 06 aches | `splitBottom` | a row inside a purple block under the photo | Shop now (cream) |
| 07 foot basin | `tiles` | three tiles on the floor | Get the foot soak (wide, dark) |
| 08 legs | `panel` | a checklist panel beside her | Shop now |
| 09 one bag | `card` | one card with icons | Shop now (inside the card) |
| 10 scents | `shelf` | one line under a caption for each bag | Shop the 3 scents |
| 11 honest | `stickers` | three round stickers | Try it tonight |
| 12 gift | `splitTop` | outlined tags in a terracotta block above the photo | Gift the sampler |

The product is named a different way per layout (a pill beside the wordmark, a line in the hook, a card title, a panel
title, the button itself); the script checks that every ad says "magnesium bath soak", has a button, and that no text
leaves the frame. The benefit wording is the same three everywhere; their order changes with the audience (`order`):
mind first on 01 to 03, muscles and feet first on 06 to 08.

### Version 3.1, 2026-11-19: the owner's notes on version 3

His words: "01: Change magnesium bath soak for -> #1 Magnesium Bath Soak for the hour before bed. Let's also add a
picture on a circle pouring the soak into the bathtub so they know. Delete the lavender word. / 02: Delete the magnesium
bath soak from there and add a title above the shop now button, big: TRY OUR MAGNESIUM BATH SOAK / 04: REMOVE THE review
of 17 studies ... Also -> Try our Bath Soak. / 06: re-do the image because package looks weird. / most of the images
should be like 09 where the product is being used ... at least the ones where the product is not clear enough. / My
favorite is 10 because when you say magnesium bath soak for ...... it's more clear. Let's try to implement that as well."

- 01: the line above the button is "#1 Magnesium Bath Soak for the hour before bed."; a round picture of the bag being
  poured into the bath (img/pour-lavender.webp, one of the first test photos) with "Pour it in the bath"; "Lavender" gone.
  TOLD TO HIM: "#1" is a ranking claim and needs something behind it.
- 02: the pill by the logo is gone; "TRY OUR MAGNESIUM BATH SOAK" in large type above the button.
- 04: the source line is gone; the words beside the button are "Try our Bath Soak." (his wording: this ad no longer
  says "magnesium" outside the bag).
- 06: new photo, the bag being poured while she holds her neck (r5-aches-a). The product line sits in the purple block
  and the button is full width.
- 07: new photo, the bag being poured into the foot basin (r5-foot-b), because the bag was small in the old one.
- "Magnesium bath soak for ..." as the line under the hook, the way ad 10 does it, on 03, 05, 06, 07, 08, 09, 11
  and 12. Where that made the product name appear twice, the second one became something else (`name`, `panelTitle`).

## Version 2, 2026-11-19 (replaced by the layouts above; the photos are still these)

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
- Per ad in `ads.json`: `size` (hook), `fade` (how far the wash behind the hook reaches), `zoom` + `origin`, `shift`.

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
