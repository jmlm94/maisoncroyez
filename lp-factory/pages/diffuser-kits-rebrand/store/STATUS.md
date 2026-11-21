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

Still to do (in order): the three automatic "free scent" discounts; build with a key, commit, push; fileCreate mc-dkr.css,
mc-dkr-app.js and the 35 pictures (files.json) from raw.githubusercontent at that commit; pageUpdate Page 163782164589
(diffuser-kits-2) with store/page-body.html; screenshot check through .github/workflows/page-shot-2.yml; his test
checkout. Refills: off (plans = null in ids.json, step 3 hidden) until his Subi plans exist.

To undo: productDelete 15507003506797; delete the discounts and files listed here; pageUpdate 163782164589 back to
lp-factory/pages/diffuser-kits-2/page-body.html (key dk2a-bd9ca46).
