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

Still to do: read the screenshot and cart check (.github/workflows/dkr-shot.yml -> store/shots/); his test checkout; the kit
product has no picture yet; refills are off (plans = null in ids.json, step 3 hidden) until his Subi plans exist: every 4 /
8 / 12 weeks on the seven scents, first delivery $0, then $29 a scent.

To undo: productDelete 15507003506797; discountAutomaticDelete the three nodes; fileDelete the 37 files; pageUpdate 163782164589 back to
lp-factory/pages/diffuser-kits-2/page-body.html (key dk2a-bd9ca46).
