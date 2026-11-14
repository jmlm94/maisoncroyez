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
