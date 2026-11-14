# Scent-note cards

One square card per scent: the scent name, its three notes drawn as simple illustrations, each note's name under it.
Owner (2026-11-14): "1 squared image for each with the 3 ingredients and the names ... a simple and illustrative image that
easily identifies the 3 ingredients each scent has."

| Scent | Notes (as on the kits page) | Files |
|---|---|---|
| Golden Blossom Harmony | Buttercup, Honeysuckle, Sunflower | golden-blossom-harmony.png / -1080.jpg |
| Crisp Citrus Scape | Yuzu Leaf, Green Mandarin, Cypress | crisp-citrus-scape.png / -1080.jpg |
| Chilled Citrus | Chilled Lavender, Eucalyptus, White Citrus | chilled-citrus.png / -1080.jpg |
| Honey Nectar | Ginger Milk, White Birch, Eucalyptus Honey | honey-nectar.png / -1080.jpg |
| Euphoric Bloom | Jasmine Tea, White Peach, Sandalwood Crème | euphoric-bloom.png / -1080.jpg |
| Wildwood Mystique | Huckleberry, Wild Juniper, Mountain Fern | wildwood-mystique.png / -1080.jpg |
| Midnight Sensation | Moonflower, Night Lily, Skin Musk | midnight-sensation.png / -1080.jpg |

- `<name>.png` is the 2000 x 2000 master, `<name>-1080.jpg` the 1080 x 1080 copy.
- `raw/<key>.png`: the three illustrations of each scent, 2048 x 2048, transparent, no lettering (generated with the image model
  on the Higgsfield account, 8 generations at 2.75 credits; fetched here by `.github/workflows/fetch-scent-art.yml` because the
  session container cannot reach the image host). Euphoric Bloom was taken twice: the first take was too short for the card.
- `compose.py` builds the cards: clears the faint haze the generator leaves in transparent areas, separates the three notes as
  whole shapes, and sets the scent name (Unna 700) and the note names (Outfit 700) from the brand font files in ../cdn.
- "Skin Musk" has no plant to draw; it is shown as a cotton boll with a soft blush swirl (soft, clean, skin-like).
- Not on the store and not used on any page yet.

## Photo version (2026-11-14, the current one)

Owner, after seeing the illustrated cards: "Instead of being the graphic representation, can we make it with full background?
Like for eucalyptus a colored real eucalyptus background... if its mandarin then a mandarin full orange background with
mandarins... really colorful images."

- `photo/<scent-name>.jpg` (2000 x 2000) and `photo/<scent-name>-1080.jpg`: three full-bleed photo panels per card, one per note,
  the real ingredient filling the panel on a matching bold colour; the scent name on a white plate at the top, each note's name
  on a white pill at the bottom. `photo/overview.jpg` shows all seven.
- `photo/raw/<key>-<1|2|3>.jpg`: the 21 panels, 1520 x 2688, no lettering (generated on the Higgsfield account, 21 generations
  at 2.75 credits; fetched by `.github/workflows/fetch-scent-art.yml` run 4).
- `compose_photo.py` builds the cards (cover-crops each panel, sets the names in the brand fonts).
- Panel colours: buttercup yellow, honeysuckle coral, sunflower golden orange / yuzu leaf lime, green mandarin orange, cypress
  emerald / chilled lavender violet with ice, eucalyptus teal, white citrus aqua / ginger milk apricot, white birch spring
  green, eucalyptus honey golden yellow / jasmine tea jade, white peach pink, sandalwood creme terracotta / huckleberry violet
  blue, wild juniper teal blue, mountain fern emerald / moonflower midnight blue, night lily purple, skin musk rose pink
  (cotton bolls on pink silk).
- The illustrated set above stays in this folder as an alternative. Neither set is on the store or on any page yet.
