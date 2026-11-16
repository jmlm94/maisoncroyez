# Scent Supply page (2026-10-25) — structure, not deployed

Owner: "a step by step page where customers who already bought can get a 6, 9, 12 and 18 month supply where they can save…
first step will be supply, then selecting the scents then going to checkout… an angle of cancelling subscription which is
always a pain… They'll also have a placeholder on the third step to put their name so we can cancel their subscription
automatically… 9 months the best one where we can include a diffuser for free, 12 months 2, 18 months 3."
Answers (2026-10-25): SKUs are created by the owner after the page is done; ships all at once; promise "cancelled in less than
24 hours"; hero = placeholder until the picture comes; address /pages/supply unless told otherwise.

| supply | scents | each | total today | save vs $39.95 | free diffusers (value) |
|---|---|---|---|---|---|
| 6 months | 6 | $34.95 | $209.70 | $30 | — |
| 9 months (Most popular, default) | 9 | $29.95 | $269.55 | $90 | 1 ($89.95) |
| 12 months | 12 | $27.95 | $335.40 | $144 | 1 ($89.95) — owner 2026-10-26 (was $24.95 / 2) |
| 18 months (Best value) | 18 | $24.95 | $449.10 | $270 | 2 ($179.90) — owner 2026-10-26 (was $19.95 / 3) |

## Round 2 (owner, same day)
"No need for the information below the atc button since this is a page for customer also delete the 3 bullets below the
main image and alter the layout a little so it looks different from the sales page we have." → nothing below any button
(chips, reviews, FAQ, founder note and every long-form section are gone; step 3 keeps only "Change my scents"), the badge
strip under the H1 is gone, and the layout is its own: one centred column (no left gallery column on desktop), a kicker
"FOR MAISON CROYEZ CUSTOMERS" + H1 + a landscape banner, a 3-segment progress track (Supply · Scents · Checkout) instead
of the "STEP N OF 3" eyebrow, and the four supplies as rows (radio, months + price line + free diffusers, framed thumbnail,
total) instead of the kits card grid.

## Round 3 (owner): "Revert the variants the way it was with two and two rows was good." → the four supplies are the card
grid again (two and two on phones, one row on desktop); everything else from round 2 stays.

## Round 4 (owner): badge "EXCLUSIVELY FOR MAISON CROYEZ CUSTOMERS" (gold pill) above the H1; H1 "You already love them, stock up
for months and save a lot, no more subscription."; on the cards the count and the price sit on two lines ("6 scents" / "~~$39.95~~
$34.95 each"), the "+ N FREE Diffusers" line is all green and bold, the 6-month card says "Scents only" in black, bigger, no
nudge; step 2 uses the kits page's own scent pictures (fetched into lp-factory/assets/cdn/picks by the fetch-assets workflow and
inlined in the preview; live they load from the CDN as on the kits page); step 3 gets a "Free shipping · FREE" row, the value
line names the free diffusers when the supply includes them, and the note reads "One payment, nothing renews, free shipping."

## Round 5 (owner's artifact comments, 2026-10-25 23:52–23:55): "6× Scents" on every card; the "$89.95 value" line under the
photo removed; a soft gradient per card (cream / blush / sage / gold); step 2: the quick-fill link is a centred black button
"Pick my scents for me" (+ a small "Start over"), the "Pick N more scents…" hint bold and black, the reserved-diffuser card all
bold; step 3: the shipping row reads "Free Priority Shipping*". "And also center it" (on the value line) was read as: the card
content stays centred; the title row is kept aligned across the cards.

## Round 6 (owner picked from the CVR review): logic 1 — "On your subscription ~~$359.55~~" on every card above the total;
logic 3 — "I run 1 / 2 / 3 diffusers at home" switch (?d=1|2|3 from the email), the card months follow it (9 bottles → 4½ months
with two diffusers), steps 2 and 3 say "9-bottle supply"; logic 4 — "or 4 × $67.39 with Shop Pay" under each total and
"4 interest-free payments" under DUE TODAY (SHOP_PAY_INSTALLMENTS flag, owner to confirm the store has it on); trust 2 — the
borrowed 30-day guarantee is replaced by "Swap any unopened bottle for another scent, free, in your first 60 days" (+ a shelf-life
sentence once SHELF_LIFE_MONTHS is set); trust 3 — a 24-hour "Your price is locked for 23h 59m 59s" bar on steps 1 and 3,
counted from the email link's ?t= (unix seconds) or the first visit (localStorage); not enforced server-side, so the price must
really change after 24 h for it to be true; trust 5 — provisional hero: img/hero-mosaic.webp, a mosaic of the real diffuser
picture and the seven scent pictures (inlined in the preview; on the live page it should be a CDN file, not inline).

## Round 7 (owner): the "I run 1 / 2 / 3 diffusers" switch is gone and the months are fixed again (6 / 9 / 12 / 18, "9-month
supply" on steps 2 and 3); Shop Pay is confirmed on for the store, so the installment lines carry the Shop Pay logo
(PAY_ICONS.shop from the kits app) on the cards and under DUE TODAY.

## LIVE 2026-10-26 — https://maisoncroyez.com/pages/supply (page 163021881453, key sp1-a0c94c8)
Product "Scent Supply" 15409132994669 / variants m6 67864692326509, m9 67864692359277, m12 67864692392045, m18 67864692424813.
Files: mc-sp-app.js 46573254148205, mc-sp.css 46573254180973, hero MediaImage 46573170032749. Owner (round 8): scents go on the order
as a note (line item properties), not as variants; the countdown has nothing to do with the emails (counts from the first visit).
Redeploy: `LIVE=1 python3 make.py` → commit → fileUpdate both GenericFiles with the raw URL at that sha → live.json key spN-<sha7>
→ `python3 body.py` → pageUpdate(163021881453) with page-body.html → stamp `[run …]` in .github/workflows/page-shot-supply.yml.

## Deploy plan (2026-10-26, as executed)
1. Product "Scent Supply" (new, separate from everything in the catalogue), 4 variants: "6-Month Supply" $209.70 (compare-at $239.70),
   "9-Month Supply + 1 Free Diffuser" $269.55 ($449.50), "12-Month Supply + 2 Free Diffusers" $299.40 ($659.30),
   "18-Month Supply + 3 Free Diffusers" $359.10 ($989.00); untracked inventory, ships, published to the Online Store, in no collection.
   The order is ONE line: that variant, with line item properties "Scents: …" and "Free diffusers: N", and cart attributes
   "Cancel subscription for", "Subscription email", "Supply". No discounts, no other products touched.
2. Files on Shopify: mc-sp-app.js + mc-sp.css (LIVE=1 build, raw GitHub URL at the deploy commit) and img/hero-mosaic.jpg.
3. live.json ← key sp1-<sha7>, the hero CDN URL, the four variant ids → `python3 body.py` → page-body.html → pageCreate
   (handle "supply", same template as the kits page) with window.MC_SUPPLY in the body.
4. `page-shot-supply.yml` (kept here until the page exists, then moved to .github/workflows/): body match, screenshots of the three
   steps, and a real cart run (9 months, scents picked for me, name + email, checkout) that reads /cart.js and clears it.
Email deep links: /pages/supply?months=9&t=<unix seconds of the send> (the 24-hour lock counts from t).

## Files
- `make.py` — derives `mc-sp-app.js` + `mc-sp.css` from the live kits files (`../diffuser-kits/mc-dk-app.js|mc-dk.css`), so the
  branding, components and CSS are the kits page's. Re-run after any kits change you want carried over.
- `mc-sp-app.js`, `mc-sp.css` — generated. Not uploaded to Shopify yet.

## What the page does
1. Step 1 "How many months would you like to cover?" — four cards (2×2 on phones, one row on desktop): months, scents × price
   each (struck $39.95), SAVE pill, "+ N FREE Diffusers" with the 2D framed photo (6 months: "Scents only" + a nudge to 9),
   total today. Three lines under the cards rewrite with the selection; CTA "Pick my N scents".
   Badges under the H1: ONE PAYMENT. NOTHING RENEWS. / WE CANCEL YOUR SUBSCRIPTION FOR YOU. / FREE DIFFUSERS FROM 9 MONTHS.
   H1: "Stock up for months, save up to $360, and let us cancel your subscription for you."
2. Step 2 — the kits scent picker (−/+ per scent, duplicates allowed, cap = the supply's count), the reserved-diffuser card,
   a "Spread my N bottles across all seven scents" shortcut, price per bottle struck/tier in the smells-like bar.
3. Step 3 — review (scents at the tier price, struck list price; diffusers struck FREE), value + "You save", DUE TODAY, the
   cancellation card (name required, email optional; "cancelled in less than 24 hours"), one-payment note, SECURE CHECKOUT.
   Without a name the button toasts and focuses the field.

## Checkout (TODO, owner creates the SKUs)
`SUPPLY_CART` in the app: one variant per tier + the diffuser variant. Until they are filled the live page toasts
"This offer isn't open for checkout yet". Planned order shape: the supply variant carries the price (scents listed as a line
property), the chosen scents and the free diffusers go in as their own lines, one automatic buy-X-get-Y per tier zeroes them;
the cancellation request rides on the order as cart attributes ("Cancel subscription for", "Subscription email", "Supply").
Also pending: a Shopify page at /pages/supply with the kits page-body pattern (preload + loader + pre-hero), the hero picture,
the theme announcement bar text (it is global: today it says "THE DIFFUSERS ARE 100% ON US…" on every page).

Preview: build with `APP=… CSS=… [STANDIN=1] node build-variant.mjs` (scratchpad pw) — artifact "MC Scent Supply".

## Variant pictures (2026-10-26, owner: "create some variant images on Higgsfield… Those are not the fragrances, do it good please!")
Round 1 (references: the kits hero + one box photo) invented scent names → rejected. Round 2 used the seven real scent product
photos (`lp-factory/assets/cdn/products/*.png`, first image of each scent product) + the group shot + the diffuser hero as
references (gpt_image_2_5, 1k, high), with the real names spelled out in the prompt: overhead flat lay on marble, the exact
count of boxes + bottles, the diffuser(s) only where the offer includes them (9 → 1, 12 → 1, 18 → 2). Files:
`img/variants/supply-{6,9,12,18}-r2.png` (1024², fetched by fetch-assets.yml; round-1 files `supply-N.png` kept for the record).
LIVE on the product (title now "Maison Croyez - Scent Supply Packages", renamed by the owner): productUpdate(media) →
MediaImage 46576697606253 (6) / 46576697639021 (9) / 46576697671789 (12) / 46576697704557 (18), each attached to its variant with
productVariantsBulkUpdate(mediaId). The first media (6) is the product's featured image.
Fallback without AI: `img/variants/compose.py` (DIFF=../../../../assets/cdn/diffuser/d25.png) composes `supply-N-real.jpg` from
the real photos — one tile per bottle, one per free diffuser (d25 = the clean single-diffuser packshot of the Home Scent Diffuser
product), caption band on top. Not on the store; swap with productVariantsBulkUpdate(mediaId) if preferred.

## sp4 (2026-10-26, owner): "Exclusive for Maison Croyez VIP Customers" badge; the countdown is a black block — "YOUR PRICE IS LOCKED
FOR:" in caps, the time below it as 00:00:00 (`.sp-deadline` / `.sp-dl-lb` / `.sp-dl-t`, compact on step 3). Same 24-hour clock from
the first visit on this device. LIVE key sp4-84e4145.

## sp5 (2026-10-26, owner): countdown 20% smaller — `.sp-dl-t` 1.6 → 1.28rem (desktop 1.8 → 1.44rem, compact 1.3 → 1.04rem), block
padding 9/10 px (compact 7/8 px). LIVE key sp5-d40eaf7 (only mc-sp.css changed).

## Frozen kits base (2026-10-27)
`make.py` now reads `base/mc-dk-app.js` + `base/mc-dk.css`, a copy of the kits files at dk9w-fc4b8e5, so the kits dk9x changes
(new title, cart step, delivery line, icons) do not leak into the supply page. Rebuilding from the base gives byte-identical
`mc-sp-app.js` / `mc-sp.css` (checked).

## sp6 (2026-11-16, owner) — LIVE since 2026-11-16 15:58 UTC together with sp7 (see "sp6 + sp7 LIVE" below)

His words: "Let's do 9 12 18 and 24 months please. We'll preserve 9 with no diffuser, 12 and 18 with one diffuser and 24
with two! Modify the page as well as the discounts." Prices, from his answer to my question: "9 months 34.95 no diffuser /
12 months 29.95 1 diffuser / 18 months 27.95 1 diffuser / 24 months 24.95 2 diffuser". The 6-month option: "Remove it".

| supply | scents | each | total today | save vs $39.95 | free diffusers | value shown |
|---|---|---|---|---|---|---|
| 9 months | 9 | $34.95 | $314.55 | $45 | none ("Scents only") | $359.55 |
| 12 months (Most popular, preselected) | 12 | $29.95 | $359.40 | $120 | 1 | $569.35 |
| 18 months | 18 | $27.95 | $503.10 | $216 | 1 | $809.05 |
| 24 months (Best value) | 24 | $24.95 | $598.80 | $360 | 2 | $1,138.70 |

- The ladder is the old one moved up a step (same four prices, same 0 / 1 / 1 / 2 diffusers), so "Most popular" + the
  preselection moved from 9 to 12 and "Best value" from 18 to 24 (my call, told to him). Card tints follow the position.
- Code: make.py (TIERS, the ?months= map: 9 | 12 | 18 | 24, default 12, an old ?months=6 link lands on 12; SUPPLY_CART
  keys m9 / m12 / m18 / m24; the four tint rules) and body.py (variant keys). `LIVE=1 python3 make.py` gives the store
  files in this folder (mc-sp-app.js 132,259 B, mc-sp.css 159,326 B); the only differences from sp5 are those lines.
- Preview: artifact "MC Scent Supply" https://claude.ai/artifact/JYGDzu63F7bsBSYQqhqVTH (version 12; not watched). Walked
  on phone 400 px and desktop 1440 px: every supply through the three steps, totals as in the table, no errors.
- (written before the deploy; kept as the plan that was followed) To go live, on his word (store = Maison Croyez, confirm with get-shop-info first):
  1. Product 15409132994669: variant m9 67864692359277 -> "9-Month Supply", $314.55, compare-at $359.55; m12
     67864692392045 -> "12-Month Supply + 1 Free Diffuser", $359.40, compare-at $569.35; m18 67864692424813 -> "18-Month
     Supply + 1 Free Diffuser", $503.10, compare-at $809.05; new variant "24-Month Supply + 2 Free Diffusers", $598.80,
     compare-at $1,138.70, SKU MC-SUPPLY-24, untracked, continue selling; delete m6 67864692326509 (he chose "Remove it").
  2. Variant pictures: 9 months shows a diffuser and 18 months shows two today; 24 months has none. New pictures for
     those three (same method as before, or img/variants/compose.py).
  3. Commit, fileUpdate mc-sp-app.js 46573254148205 + mc-sp.css 46573254180973 from raw at that commit, live.json (key
     sp6-<sha7>, variants m9 / m12 / m18 / m24) -> body.py -> pageUpdate 163021881453, then the page-shot-supply check
     (its cart run must use the new default, 12 months).
  Order of operations so no buyer hits a mismatch: variants first (prices and the new one), page second, m6 deleted last.

## sp7 (2026-11-16, owner, after his call guide for Maria) — LIVE since 2026-11-16 15:58 UTC

He sent "Subscriber Switch Call Guide for Maria" (the page is what subscribers see while Maria is on the phone with them)
and asked what I would add. Of my six suggestions he took: "1. Let's just leave the savings and put them a little bigger.
That's all. 2. Let's add the Black Friday Banner. Subscribers Only. And the title as well. 3. Add 3 4".
- Savings: wording unchanged ("On your subscription", "SAVE $X"), bigger: the pill .6 -> .74rem (desktop .78), the
  "On your subscription" line .6 -> .7rem (desktop .76). He chose to keep them although some subscribers pay less than
  $39.95 a bottle (his guide tells Maria to skip the saving for those).
- Banner "Black Friday offer · Subscribers only" (was "Exclusive for Maison Croyez VIP Customers"); title "One payment.
  No more monthly charges. We cancel your subscription for you."
- The call link (his guide: "she can only get it on this call", "the price holds for 24 hours from the call"):
  the offer opens from /pages/supply?t=<unix seconds of the call> and closes 24 hours later. No link (and none stored on
  the device, key mc_sp_call) -> "This offer opens from your personal link."; older than 24 h -> "Your 24-hour price has
  ended." with "reply to the message we sent you"; the newest link wins; a link stamped in the future counts from now;
  the sticky button and the checkout are off while closed. It runs in the browser, so it is not tamper-proof.
  Maria makes the link at /pages/supply?newlink=1 ("Link for this call", a Copy button; each tap stamps the current time).
  Previews (any host but maisoncroyez.com) are always open; ?state=over|nolink shows the closed screens.
  CONSEQUENCE, told to him: the bare /pages/supply no longer shows the offer; any email or ad that links straight to it
  lands on the "personal link" screen.
- Nudge under the cards while 9 months is selected: "12 months is only $44.85 more and adds a free diffuser. Switch to
  12 months" (the amount is computed; a tap selects 12 months).
- Not taken: "for another room" next to the free diffuser, and a refund promise if the subscription bills before we
  cancel it.
- Code: a block at the end of make.py (the gate, OfferClosed, LinkMaker, the nudge, their CSS) plus the three text / size
  edits. Store build 136,255 B / 160,277 B. Tested with the preview served as maisoncroyez.com: no link, expired, one hour
  left, fresh, bare URL after a link, the nudge, the link maker; phone and desktop, no errors.
- For the go-live check: page-shot-supply must open the page with ?t=<now>.

## sp6 + sp7 LIVE — 2026-11-16 15:58 UTC, key sp7-21e2d1b

His word: "Ok we're ready to deploy. You can also fix the PDF yourself then." Store confirmed as Maison Croyez before every write.

- Files: mc-sp-app.js 46573254148205 (136,255 B) and mc-sp.css 46573254180973 (160,277 B) from raw at commit 21e2d1bf.
- Page 163021881453: body = page-body.html (5,827 chars, key sp7-21e2d1b, variants m9 / m12 / m18 / m24).
- Product 15409132994669 now has exactly four variants:
  | key | variant | title | price | compare-at | SKU | picture (MediaImage) |
  |---|---|---|---|---|---|---|
  | m9 | 67864692359277 | 9-Month Supply | $314.55 | $359.55 | MC-SUPPLY-9 | 46938409533549 (supply-9-r4.jpg) |
  | m12 | 67864692392045 | 12-Month Supply + 1 Free Diffuser | $359.40 | $569.35 | MC-SUPPLY-12 | 46576697671789 (supply-12-r2.png, unchanged, the product's first picture) |
  | m18 | 67864692424813 | 18-Month Supply + 1 Free Diffuser | $503.10 | $809.05 | MC-SUPPLY-18 | 46938409566317 (supply-18-r4.jpg) |
  | m24 | 68108599132269 | 24-Month Supply + 2 Free Diffusers | $598.80 | $1,138.70 | MC-SUPPLY-24 | 46938409599085 (supply-24-r4.jpg) |
  All untracked, continue selling. The 6-month variant 67864692326509 is deleted (his choice: "Remove it").
- Old pictures taken off the product but kept in Files (fileUpdate referencesToRemove, nothing deleted): 46576697606253
  (6 months), 46576697639021 (9 months with a diffuser), 46576697704557 (18 months with two diffusers).
- Pictures (img/variants): the generated 9-month flat lay was right; the generated 18 and 24 ones had misspelled labels
  ("Crisp Citrus Escape", "Midnight Meditation", "Maison Crotez" on the diffuser), so build-r4.py keeps their marble and
  diffusers and keys in the sets from the 9-month picture, and repaints two labels ("Sandalwood crème", "MAISON CROYEZ").
  Checked by eye: 9 sets / 18 sets + 1 diffuser / 24 sets + 2 diffusers, every name correct.
- Live check (page-shot-supply run sp7-21e2d1b, shots/20261116T1605-*): body matches the repo byte for byte; no link ->
  "This offer opens from your personal link."; a 25-hour-old link -> "Your 24-hour price has ended."; ?newlink=1 -> "Link
  for this call" with a ?t= link; a fresh link opens the offer with the timer at 23:59:53; four cards 9 / 12 / 18 / 24 at
  $34.95 / $29.95 / $27.95 / $24.95; the nudge switches 9 -> 12; the real cart run added variant 67864692392045 at $359.40
  with the scents and "Cancel subscription for" on the order, landed on checkout, and the cart was cleared. No page errors.
- The call guide ("Subscriber Switch Call Guide for Maria", https://claude.ai/artifact/QigEffDiFXeZXrVwKDrKsv) now tells
  Maria to make the link at maisoncroyez.com/pages/supply?newlink=1 for every call (the mission bullet and step 4 of the
  call), what to do when a customer says the page is closed, and adds the free 60-day scent swap to "True for every package".
- Still his to decide: any email, ad or SMS that links to the bare /pages/supply now lands on the "personal link" screen.
