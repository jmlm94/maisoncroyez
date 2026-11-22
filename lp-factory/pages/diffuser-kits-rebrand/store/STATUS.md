# Deploy log: the rebranded diffuser kits page -> hidden test page /pages/diffuser-kits-2

Owner, 2026-11-21: "We're ready to deploy." His answers: switch the connector to Maison Croyez (yes); go live first on the
hidden test page; build what the page says (I create the kit product and the free-scent discount, he creates the 4 / 8 /
12-week $29 refill plans in Subi and sends their names); confirmed 4.7 from 124 reviews, the creator photos, "Pour it
in"; the two competitor names were cut from one review.

Store confirmed by name before every write: Maison Croyez (maisoncroyez.com).

Done in the store:
- productSet: "Maison Croyez Diffuser Kit" = Product 15507003506797, handle maison-croyez-diffuser-kit, status UNLISTED,
  not tracked, variants 1 Diffuser 68206141505645 ($89), 2 Diffusers 68206141538413 ($159, compare $178), 3 Diffusers
  68206141571181 ($239, compare $267). Published to the Online Store publication 22952280173.

- discountAutomaticBxgyCreate x3 (buy the kit variant, get N of the seven scent products 100% off, once per order, combines
  with product / order / shipping discounts): "FREE SCENT — Diffuser Kit (1 Diffuser)" = DiscountAutomaticNode
  1547759452269, "FREE SCENTS — Diffuser Kit (2 Diffusers)" = 1547759485037, "FREE SCENTS — Diffuser Kit (3 Diffusers)" =
  1547759517805, all ACTIVE. Shopify does not let an automatic BXGY name subscription lines (appliesOnSubscription was
  refused), so with refills the free first delivery has to come from the Subi plan itself (first delivery $0, then $29).

- fileCreate (37 files, from raw.githubusercontent @ 257f7a2, all READY): the 35 pictures as mc-dkr-<name>.webp (MediaImage
  47043375562861 ... 47043376676973, names in files.json), mc-dkr.css = GenericFile 47043376742509, mc-dkr-app.js =
  GenericFile 47043376775277. To change the styles or the script later: build, commit, push, then fileUpdate those two
  GenericFiles from raw @ the new commit and pageUpdate the body with the new key.
- pageUpdate Page 163782164589 (diffuser-kits-2, published, seo.hidden = 1) 2026-11-21 23:23:46Z: body = store/page-body.html,
  key dkr1-257f7a2. The page it held before (the dk13 copy of the live kits page) is lp-factory/pages/diffuser-kits-2/page-body.html.
  URL: https://maisoncroyez.com/pages/diffuser-kits-2

- Second pass the same evening: our own top bar kept, the theme's announcement bar hidden on this page (it said "THE
  DIFFUSERS ARE 100% ON US", another offer), sticky button centered. fileUpdate of the two GenericFiles from raw @ 2d7ff75,
  five-minute wait, pageUpdate 23:40:10Z with key dkr2-2d7ff75.

Checked on the live page (.github/workflows/dkr-shot.yml -> store/shots/, phone 390 px and desktop 1440 px): status 200, the
page renders inside the theme (header shown, theme page title hidden, full width, DM Sans), no page errors, no broken
pictures, sticky button in place, step 3 hidden.
NOT checked: add to cart and checkout. From the GitHub runner /cart/add.js and /cart.js answered 429 "Verifying your
connection..." (the store's bot check), so the robot could not build a cart; the request the page sends is the kit variant
plus the picked scent variants. This needs the owner's own test checkout.

## Speed pass (2026-11-22, owner: "Run a page speed test and implement changes to make it go faster")

Lighthouse through .github/workflows/dkr-lh.yml (3 runs per form factor, results in store/perf/):
- Before (key dkr2): mobile 58 / 61 / 62, LCP 6.5-7.2 s, blocking time 440-580 ms; desktop not kept.
- After (key dkr4-cf380c4): mobile 37 / 82 / 83 (the first run of every batch is a cold outlier: 51 in the batch before),
  LCP 3.9 s, blocking time 210 ms on the two warm runs; desktop 97 / 97 / 98, LCP about 1.1 s.
What changed: the top bar and the main picture are plain HTML in the page body (the script brings the rest and moves that
same <img> into the gallery); pictures are asked for at the size they are shown (CDN ?width=, srcset on the gallery);
DM Sans and Roboto Mono come from the store's own files (six woff2, GenericFile 47043567091821 ... 47043567255661, uploaded
from lp-factory/ads/bath-soak/fonts) instead of Google Fonts; the kits page's third-party hold script
(store/third-party-hold.html) keeps Clarity, Klaviyo, Postscript, Gorgias, the Subi SDK and the Meta pixel library back
until the first touch or a timeout; sections below the fold render on demand (content-visibility); every file is loaded
from https://maisoncroyez.com/cdn/shop/files/ (same files, the shop's own domain, no second connection).
Deploys: fileUpdate from raw @ 615d462 then pageUpdate 00:08:44Z (key dkr3), fileUpdate from raw @ cf380c4 then pageUpdate
00:21:42Z (key dkr4-cf380c4). Live check after each: 200, no errors, no broken pictures, phone and desktop.

## Refills (owner 2026-11-22: "switch to 30 60 90 days and use 04/10 Sub for Offer #2 and #3 as the plan")

The page now says every 30 / 60 / 90 days, $29.95 a scent instead of $39.95. NOT wired: the group "04/10 Sub for Offer #2
and #3" (SellingPlanGroup 5188911213: Every 30 days 7883817069, Every 60 days 7883849837, Every 90 days 7883882605) takes
$10 off every delivery including the first, so a scent on that plan costs $29.95 today, and Shopify's buy-X-get-Y
discounts (automatic or code) cannot be set to cover subscription lines (appliesOnSubscription refused twice). With that
plan as it is, "today's scents are free" would not hold for buyers who pick refills. Put to the owner: a Subi plan with
the first delivery free, or scents charged today on the refill path (page wording to change), or one-time only.
plans stays null in ids.json (step 3 hidden on the store) until he decides.

Still to do: his test checkout; a picture on the kit product; the refill decision above.
Note: the scents are $39.95 in the store; the page now says "$39.95 value".

To undo: productDelete 15507003506797; discountAutomaticDelete the three nodes; fileDelete the 37 files and the six fonts; pageUpdate 163782164589 back to
lp-factory/pages/diffuser-kits-2/page-body.html (key dk2a-bd9ca46).

## Three QA tests on the live test page (2026-11-22, owner: "run 3 QA tests")

1. Prices and discounts (Shopify draftOrderCalculate, automatic discounts on): 1 diffuser + 1 scent = $89.00, 2 + 2 =
   $159.00, 3 + 3 = $239.00, scents at $0 each time; 1 diffuser + 2 scents = $128.95 (only one free). Passed.
2. The page and the buy box (.github/workflows/dkr-shot.yml, run for a3750342; phone 390, tablet 820, desktop 1440): 200,
   no script errors, 42 pictures none broken, fonts loaded, 9 gallery pictures and the arrow moves them, FAQ opens,
   9 reviews, 7 scents, 10 customer photos, theme bar and title hidden, no sideways scroll, sticky button at the bottom,
   step 3 hidden. Buy box with the cart answered by the test: for 1 / 2 / 3 diffusers the button is locked until the
   scents are picked, no more than the kit allows can be picked, both buttons show $89 / $159 / $239, and the cart
   receives exactly the kit variant plus the picked scents. Passed on all three screens.
3. The real button once (phone, 2 diffusers + the two best sellers): cart.js 200, cart/add.js 200, landed on
   /checkouts/..., order summary "Total price $238.90, Discounted price $159.00". Passed. No order was placed.
Not covered by a machine: paying. Results in store/shots/result.json.

Gallery round 2 (same day) is in the preview only; the store page still shows the round-1 pictures until the owner says
to swap them (37 files -> the nine mc-dkr-g-0N.webp need replacing, then a new key).

## Gallery swap on the store (2026-11-22, owner: "Yes swap")

Nine new files, mc-dkr-g2-00..08.webp (MediaImage 47043818193005, ...225773, ...258541, ...291309, ...324077, ...356845,
...389613, ...422381, ...455149), uploaded from img/g-0N.webp @ 088d3695. New names (g2) so no cached old picture can be
served; build-deploy.py maps img/g-0N.webp -> mc-dkr-g2-0N.webp. fileUpdate css + js from raw @ dc45de80, pageUpdate
00:52:52Z, key dkr6-g2shoot. The nine old mc-dkr-g-0N.webp files are still in Files, unused (delete when he is happy).

## Five more photos in Files (2026-11-22, owner: "compress and reduce size to 800x800 and upload them in Shopify")

mc-shoot-19-entry-keys.webp (MediaImage 47044202889325), mc-shoot-20-three-scent-boxes.webp (47044202922093),
mc-shoot-21-side-table-mug.webp (47044202954861), mc-shoot-22-sofa-dog.webp (47044202987629),
mc-shoot-23-desk-journal.webp (47044203020397). 800 x 800, 31-46 KB each, from gallery/shoot-800 @ 6b8ad70a. Not used on
the page; he will say which pictures to switch.

2026-11-22, comment on the preview: first "day to evening" card photo -> mc-shoot-19-entry-keys.webp (already in Files).
Done in the preview (artifact version 20). Deployed on his "push live": fileUpdate css + js from raw @ 1e89063c, pageUpdate 02:31:17Z, key dkr7-shoot19.

2026-11-22, round 16 (alignment pass, label above the headline deleted): preview only (artifact version 21). Store files
built with key dkr8-align and committed, NOT deployed; the live page is still dkr7-shoot19 until the owner says to push.

2026-11-22, rounds 16 + 17 (alignment pass, six comments, "100 ml" on the scent tiles): owner said "push live". Store files
built with key dkr9-comments and committed @ d311802a, NOT deployed: the Shopify connector refused twice with "needs you
to sign in again". The live page is still dkr7-shoot19. When he is signed in: confirm the shop is Maison Croyez, fileUpdate
css + js from raw @ d311802a (or later), pageUpdate with store/page-body.html, then the dkr-shot run.
