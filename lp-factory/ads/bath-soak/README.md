# Bath soak static ads (12), 2026-11-18

Owner: "Could you generate 12 Ads based on these principles please? With higgsfield? Ask me q's if needed." His answers:
static images, 4:5 for the feed, hook on the image, no price in the ads. "These principles" = his research document
(lp-factory/pages/bath-soak/README.md, round 5): her nights in her words, the one supported claim (a warm bath 1 to 2
hours before bed, review of 17 studies), the 75 / 25 claims rule, the hook bank, and what never to say.

- `ads.json`: the copy (hook and sub-line on the image; primary text, headline and description for Ads Manager).
- `img/ad-*.webp`: eleven pictures generated for these ads (1792 x 2240, the woman of woman-silver.webp and the three
  pouches as references, each composed with empty space at the top). The clock ad uses three pictures of the PDP preview.
- `make-ads.js`: lays the hook over each picture in the brand type (DM Sans Bold, Roboto Mono labels, the two-line
  wordmark), so the words are typeset, never generated. `node make-ads.js` -> `out/bath-soak-ad-<id>.jpg` (1792 x 2240).
- `build-gallery.py` -> `gallery.html` (the review page, artifact "Bath Soak Ads") and `captions.md`.

The twelve angles: 01 awake at 3 AM, 02 tired and wired, 03 "I don't need a spa day", 04 17 studies, 05 the evening
clock, 06 everything aches, 07 foot basin, 08 legs that need to settle, 09 one bag one bath, 10 pick your evening,
11 not a supplement, 12 a gift for mom. Nine use wellness wording; 04, 05 and the caption of 01 lean on the supported
claim. Nothing says absorbs, raises magnesium, treats, cures, cramps, insomnia or detox. No menopause, no price.

Open points told to him: "one bag, one bath" (09 and several captions) is still my reading of 250 g; the pouch labels in
every picture were checked by eye and are correct; nothing is uploaded to Meta.
