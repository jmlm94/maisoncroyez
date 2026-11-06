# adv-kits: "The Candle Swap" advertorial (draft, 2026-10-29)

Cold-traffic advertorial for the diffuser kits offer. Every CTA goes to /pages/diffuser-kits.
Artifact (private draft): https://claude.ai/artifact/M5BYkHwT7ek97t7QJ6qqdM

v2 (owner, 2026-10-29): health listicle. "5 things no one notices about candles, sprays and diffusers that can affect
your health": 1 lungs (smoke, soot, fine particles; EPA, NFPA) · 2 allergies in you, kids and pets (Steinemann 2016
survey) · 3 mold and bacteria in water diffusers (EPA humidifier care) · 4 leaks ruin furniture · 5 the $2,500+ a year
(calculator, defaults $211/mo = $2,532/yr vs the chosen kit and frequency). Then "Maison Croyez was built to fix all
five", scents, setup, offer, real quotes, FAQ, sources in the footer. Images: three Higgsfield frames in img/ (smoke
haze, allergies, leaking water diffuser; fetched by .github/workflows/fetch-adv.yml) plus existing site photos.
- Only real customer words: the kits page's customer-survey quotes and Amazon reviews, attributed as such.
  No invented people, reviews, star ratings or countdowns.
- Facts come from the kits page and lp-factory/brand-kit.md (600 sq ft, ~10 min, 30+ days per 100 ml bottle,
  3 settings, 30-day guarantee with prepaid return, lifetime warranty, swap/pause/cancel). NFPA cited for candle fires.
- Labelled "Advertorial" at the top and "Advertisement" in the footer.

Build: `python3 src/images.py` (images to data URIs, img.json is gitignored) then
`python3 src/build.py <out.html>`; publish the output to the artifact URL above.

v3 (owner, 2026-10-29): black and white only, styled as a plain news listicle ("The Indoor Air Report" header, Source
Serif 4 + Libre Franklin), not branded. Above the fold on a phone: announcement bar, header, pre-headline, headline,
description, author (with the Advertorial tag), image, "Read the 5 alerts" button. Headline (owner's words, each word
capitalised): "5 Alerts You're Missing Out About Candles, Sprays And Diffusers That Could Affect Your Health And Others".
Alerts now escalate: #1 $2,500+ a year (receipt) -> #2 furniture, walls, ceiling -> #3 allergies (you, kids, pets) ->
#4 mold in the "healthy" water diffuser -> #5 lungs and fire, each ending on a hook into the next. Then "The fix",
quotes, a plain offer box, 3 FAQ, sources. Calculator, scent grid, setup steps and kit cards removed for now.

v5 (owner comments, 2026-10-29): logo header (date removed); breadcrumb HEALTH > HEALTHY HOME > INDOOR AIR QUALITY;
sharper description with the last sentence bold; "Advertorial" tag removed from the author line (footer disclosure kept);
hero caption removed; button "Read the alerts · 5 min read"; periods on every headline; red "Alert #" labels and an
animated red announcement bar (the only colour besides black and white); mold moved to Alert #1 (order now mold, money,
furniture, allergies, lungs); key lines bold; Alert #5 adds EPA (fine particles reach the bloodstream, indoor air 2-5x,
90% of time indoors) and NFPA stats (7,400 candle fires a year, ~20 a day, 36% in bedrooms, 2015-2019 averages);
"The fix" is now Patricia's founder note with her photo (img/patricia.jpg, the owner photo from the kits page);
offer angle "We're new, so the first 1,000 diffusers are on us".

v6 (owner comments, 2026-10-29): offer box without prices and without the shipping/guarantee paragraph; trust line
under the fix button removed; "Here's How It Fixes All 5 Alerts." as a big title; each fix row = red "Alert #" label
over a green (#0A7A2F) answer box with white text; a 2x2 photo row before the quotes (creator photos mc-review-1/4/5/6
from the kits page; #3 left out because it shows a lit candle), captioned "Maison Croyez in real homes." and not
attached to the anonymous survey/Amazon quotes.

v7 (owner, 2026-10-29): fix rows are plain black text with a green check (red "Alert #" labels kept); new strip under
them, "Every Maison Croyez fragrance is:" IFRA 51 compliant / Paraben-free / Cruelty-free (owner-supplied claims).

v8 (owner: "apply all", 2026-10-29): headline "Your “healthy” diffuser may be growing mold. Here are 4 more things in your
home nobody warns you about." (sentence case, also on every alert heading); byline Patricia T. with her face crop and a
"Sponsored" tag, author note at the end; lede opens on the EPA humidifier advice; money and furniture merged into Alert #2;
new Alert #3 "What's in that “fresh” scent isn't on the label." (Steinemann et al. 2011: 25 products, 133 chemicals, 24
toxic or hazardous, one listed on a label); product photo after Patricia's note; "Meet Maison Croyez" early button after
Alert #1; offer says diffusers go back to $89.95 after the first 1,000; "Loved by 2,500+ homes in America" under both
buy buttons.

v9 (owner, 2026-10-29): every word capitalised again on the headline and all section headings; the product photo above
"Here's How It Fixes All 5 Alerts." is now the kits page's first gallery image (assets/cdn/diffuser/d92.png).

v10 (owner comments, 2026-10-29): byline is just "By Patricia T." (no role, no "Sponsored"; the footer disclosure stays);
the photo grid uses four kits-page lifestyle photos (img/kp-compare, kp-spaces, kp-badge, kp-intentions) captioned
"Maison Croyez at home."

## Shopify version (shopify/)
- `python3 shopify/build.py img` writes the 13 images as `shopify/img/mc-cs-*.jpg` (upload these to Shopify Files).
- `python3 shopify/build.py body [urls.json]` writes `shopify/page-body.html`: the store header, announcement bar, footer and page title
  are hidden, every rule is scoped under `#mcadv`, theme `.prose` styles are reset, buttons go to `/pages/diffuser-kits` in the same tab.
  Without `urls.json` the images point at raw GitHub (preview only); with it, at the Shopify CDN.
- `.github/workflows/adv-preview.yml` drops the body into a plain store page on the real theme and saves screenshots + checks to `shopify/preview/`.

## LIVE 2026-11-03 (v17 = dk12, key cs17-f208dca, 01:22:44 UTC): https://maisoncroyez.com/pages/indoor-air-alerts
- The launch-offer builder follows the kits page's dk12 (owner: same deploy): scents $29.95 each, 3 / 4 / 7 scents per
  1 / 2 / 3 free diffusers (due today $89.85 / $119.80 / $209.65); step 2 opens with "Each scent lasts 15–21 days, depending
  on use." + the Organic Ingredients / Paraben-Free / Cruelty-Free badges + "All IFRA 51 compliant.". Article: Alert #2's fix
  row and the fix list say "One 100 ml bottle lasts about 15–21 days." (were 30+ days). Source: kb.js + page.html, commits
  9ffca4b / be409b7 (owner rounds 2–4 in diffuser-kits/variants/dk12-scents2995/README.md).
- Deploy: fileUpdate GenericFile 46657364525165 mc-cs-adv.css (51,042 B) + 46657364557933 mc-cs-adv.js (31,789 B) from raw
  @ f208dca, READY; `KEY=cs17-f208dca python3 shopify/build.py body shopify/urls.json`; pageUpdate 163225075821 with the
  25,371 B body as a GraphQL variable (the connector caps the document at 16 KB). The scent price ($29.95) and the BXGY
  minimums (3 / 4 / 7) changed in Shopify the same night: see the kits README, dk12 entry. qa-adv run 3 (qa-adv-dk12.patch,
  INJECT=no, 01:26 UTC, 55/62): the three carts charged the kit (the BXGY customerBuys isSubscription had been reset by the
  minimum update, see the kits README dk12 entry) + the kept-picks checks still expected 3. Run 4 (01:34 UTC, after the fix,
  qa/20261103T0134): 62/62, carts $119.80 / $89.85 (the second add replaces the first kit) / $209.65 with the kit at $0.00,
  drawer on the article, body match. pixel-adv run 3 crashed (the script picked 3 scents for the 4-scent kit); run 3b
  (pixel/pixel-adv-20261103T013.json), phone + desktop: PageView, SubscribedButtonClick on the taps, 5x AddToCart at UNLOCK
  FREE DIFFUSERS (one per cart line), PageView + InitiateCheckout on the checkout, no errors.

- 2026-11-06: the kits page went dk13 (one-time option on its step 3 at $39.95/scent, auto-refill $29.95). Shopify: the 7
  scent variants are $39.95 store-wide and the three Subi plans of "04/10 Sub for Offer #2 and #3" take a fixed $10 off every
  cycle (the first attempt, an automatic $10-off discount on subscription lines, never applied: Shopify stacks no second
  product discount on the BXGY buy lines; it was rolled back the same evening). This page's builder is unchanged
  (subscription only, "$29.95 each"): its scent lines still read $29.95 (the plan price, no discount allocation) and its carts
  still total $119.80 / $89.85 / $209.65, so qa-adv's line expectations (price 29.95) still hold. Product-page one-time
  buyers now pay $39.95 a bottle.

## LIVE 2026-11-02 (v16, key cs16-a20283e, 00:36:53 UTC): https://maisoncroyez.com/pages/indoor-air-alerts
- Page gid://shopify/Page/163225075821. The body is now the markup + links (25 KB, shopify/page-body.html); the styles and the
  script are Shopify Files fetched from GitHub, nothing retyped: mc-cs-adv.css = GenericFile 46657364525165 (49,487 B),
  mc-cs-adv.js = GenericFile 46657364557933 (30,508 B), both created by fileCreate from raw @ a20283e (READY 00:34 UTC),
  cached by `?v=cs16-<sha>` on both URLs like the kits page. Images: the 13 mc-cs-*.jpg from 2026-10-29 (shopify/urls.json).
- To change the article now: edit src/page.html (or kb.js + `python3 src/kitscss/inline_js.py`), commit, then
  `KEY=cs<N>-<sha> python3 shopify/build.py body shopify/urls.json`, fileUpdate the two GenericFiles from raw @ <sha>, wait READY,
  commit the body, pageUpdate it (25 KB) through the connector after get-shop-info says Maison Croyez.
- The old inline deploy (2026-10-29, 13 images + a 42 KB body) is in git history (v12).

## LIVE 2026-10-29 (v12): https://maisoncroyez.com/pages/indoor-air-alerts
- Page gid://shopify/Page/163225075821, title "Your “Healthy” Diffuser May Be Growing Mold", default page template, published.
- Images: 13 Shopify Files (mc-cs-*.jpg, ?v=1793302792), map in `shopify/urls.json`; body = `shopify/page-body.html` built with it.

## Speed 2026-10-29 (perf/lh-20261029T1959Z.md)
- Lighthouse 3x: mobile 46 / 58 / 54 (LCP 6.3–7.0 s, TBT 680–1,700 ms), desktop 95 / 96 / 98 (LCP 1.1–1.4 s).
- Filmstrip: the full first screen is painted at ~1.5 s on the throttled phone; the lab LCP is the hero image, held back by
  "render delay" (4.3 s) charged to main-thread work from site-wide scripts (theme inline scripts, Facebook, Postscript, Subi, 9gtb, Klaviyo).
- The store's black announcement bar flashes for a moment before the body's CSS hides it.
- Next lever: add `indoor-air-alerts` to the theme's speed-round-3 landing-page list (theme.css off the critical path, header
  hidden from the head). Needs a theme copy the owner publishes; the kits page scores 91–92 mobile with it.
- PSI API run failed: the anonymous daily quota was used up (429).

## v11 (2026-10-29, owner): headline about what candles / sprays / plug-ins leave in the air
- h1: "The Candle In The Kitchen, The Spray In The Living Room, The Plug-In In The Bedroom: Here’s What They Actually Leave In The Air Your Kids And Pets Breathe."
- Description cut to one sentence + the bold "Read these 5 alerts" line (keeps photo + button on the first phone screen).
- Lede opens on the EPA fine-particles fact (candles and incense); the humidifier fact stays in Alert #1.
- Shopify page title to become "What Your Candles, Sprays And Plug-Ins Leave In The Air Your Kids Breathe".

## v12 (2026-10-29, owner): 8-photo creator grid
- The 2x2 kits-page photo grid is now 8 creator photos from the owner's Drive folder (fetched by fetch-drive.yml into drive/),
  one per creator, product in frame, square crops that drop the burned-in captions (shopify/img/mc-cs-ugc1..8.jpg,
  Shopify Files ?v=1793311480). 2 columns on phones, 4 from 560 px.

## Pixel check 2026-11-01 (pixel/pixel-adv-20261101T161.json), owner: "no add to carts on the advertorial campaign"
- Ad visitor path verified on iPhone + desktop: article PageView (with _fbc from the fbclid) -> "Clicked to PDP" custom event +
  SubscribedButtonClick on the offer button (Meta event-setup-tool events already configured) -> kits page in ~0.5 s -> PageView ->
  AddToCart x4 -> InitiateCheckout. Consent granted (US), one pixel 980908600592309 throughout. No JS errors.
- So the site and pixel are not the cause; check the campaign (ad destination URL, link clicks / LPV / Clicked to PDP volume, columns).

## v13 (2026-11-01, owner picked options A + B from the shortcut proposals) — review copy only, NOT live yet
- A: "Editor's note" box after the opening (screen ~1.3 on an iPhone 14): product thumbnail, the waterless fix in two lines,
  button "See the waterless diffuser" -> /pages/diffuser-kits?cta=note.
- B: a fix row at the end of each alert (screens ~2.8 / 4.5 / 5.9 / 7.4 / 9.1): thumbnail, "✓ The fix: …" (same lines as
  "Here's how it fixes all 5 alerts"), "See how it works" -> ?cta=fix-1..5. Fix row 1 replaces Alert #1's old outline box.
- Thumbnail on Shopify = mc-cs-d92.jpg resized by the CDN (&width=144). shopify/page-body.html is built and ready for pageUpdate.
- After deploy: check that the new links fire Meta's codeless "Clicked to PDP" event (rule not in the pixel config file).

## v14 (2026-11-01, owner): in-article kit builder — review copy only, NOT on Shopify
- The launch-offer box at the end now holds a 3-step builder like /pages/diffuser-kits: 1) 1 / 2 / 3 free diffusers with
  2 / 3 / 5 scents (no prices on step 1, as on the kits page), 2) pick scents from the 7 (+/- per scent, "best sellers"
  shortcut), 3) review: diffusers struck through at $89.95 each and FREE, scents at $39.95, "That's $X of value, you pay $Y
  today", Due today, refill every 60 / 30 (most popular) / 90 days, how-it-works bullets, Add to cart.
- Numbers match the kits cart check (2 diffusers + 3 scents = $299.75 value, $119.85 today). In the review copy Add to cart
  only shows a "preview only" note; the live version needs the kits page's cart code (kit variant + scents on the Subi plan
  for the chosen frequency, then the cart drawer).
- shopify/page-body.html is still v13 (A + B only); src/page.html now also has the builder, so rebuild with care.

## v15 (2026-11-01, owner): the builder now looks exactly like the kits page buy box — review copy only, NOT on Shopify
- Owner: "adapt the images … the details with the caps and everything else … only in the launch offer thing. Same layouts".
- Same markup and class names as /pages/diffuser-kits steps 1–3 (mc-dk-app.js BuyBox), rendered by a small script
  (src/kitscss/kb.js, pasted into page.html's second <script>): tier cards with the FREE pill and kit photos, "Where it
  goes" plan + room chips, scent tiles with strength dots and −/+ steppers, the "Smells like / Notes" bar, the step-3
  banner, kit review, Due today, refill pills, delivery line and the three trust chips. Not copied: rating, h1, badges,
  reviews, FAQ (the article has its own).
- Styles: src/kits-buybox.css = the mc-dk.css rules that match those elements, re-rooted from #root to #mckb, in source
  order (rebuild with `python3 src/kitscss/extract.py`; it matches selectors against kits-ref/*.html). build.py inlines it
  at {{kits_css}}. Fonts: Unna, Outfit, Be Vietnam Pro (Google Fonts in the artifact; the kits page self-hosts the same).
- On the live kits page the store theme also changes a few things (black "←" and Change-my-scents buttons with white
  text, no button shadows, 12px above div+div blocks, -0.16px letter-spacing, balanced titles). kits-buybox.yml run 2
  saved the live computed styles (kits-ref/<step>.styles.json); page.html mirrors them right after {{kits_css}}, and a
  computed-style diff of the review copy against the live page now shows no differences at phone width.
- Article rules that would leak in were narrowed: `.btn` -> `a.btn`, `.offer p/ul/li` -> direct children.
- Images: kb_kit1..3 and kb_step3 from kits-ref/img (images.py); scent tiles reuse s_*.
- Deploy notes: shopify/build.py only takes the first <script> and only fills {{…}} in the markup — before deploying the
  builder it must also ship the second script, fill the image keys inside it with CDN URLs and inline kits-buybox.css.
- Owner comments (v15, 2026-11-01): launch-offer box centered; builder on a light grey (#F4F4F4) panel that runs the full
  width of the box; "Step N of 3" bigger (.86rem); a small US flag (inline SVG, so it shows on Windows too) after both
  "Loved by 2,500+ homes in America" lines. The older comment threads (2026-10-29) were all handled in v5–v10.
- Owner comments (v15, later): no photo at the top of step 3 (kb_step3 stays in images.py, unused); the grey panel runs on
  under the builder through "Loved by 2,500+ homes in America" to the bottom of the box.
- Owner: "make all the buttons go to this new sales area". The editor's-note button, the five fix rows, "Get my free
  diffusers" under the fixes and the sticky bar now scroll to the builder (href="#mckb", data-cta = note / fix-1..5 /
  fix-all / bar, which replace the old ?cta= tags). "Read the alerts" still goes to Alert #1. No link to the kits page is
  left in the article.
- Before deploying: Meta's codeless "Clicked to PDP" event no longer means a kits-page visit (nothing leaves the page);
  measure the builder instead (steps reached, Add to cart). adv-preview.yml still clicks '#offer a.btn' and expects the
  kits page, so update that check too.

## v16 (2026-11-02, owner): the launch-offer builder gets the kits page's dk11 changes + the store logo
- Owner: "apply those changes to the candle swap advertorial, specifically on the launch offer section" and "put maison croyez
  logo above the step x of 3". Same as /pages/diffuser-kits dk11 (kb.js + the #mckb rules in page.html):
  step 1 title "Buy more scents = *Get more FREE Diffusers:*", "+ N FREE DIFFUSERS" in green caps; a little room above
  "Step N of 3" (its size stays .86rem, owner's earlier choice); step 3 = refill buttons first under "Select your auto-refill
  frequency to unlock your FREE Diffusers:", then one bold explanation ("Your diffusers are free ($89.95 each) when you select any
  auto-refill option. You can swap, pause or cancel your auto-refill anytime, and we'll send you a prepaid return label."),
  button "UNLOCK FREE DIFFUSERS ➔". The three notes and the swap / pause / cancel note are gone.
- The store header logo (mc-kb-logo.png, already on the Shopify CDN; kb_logo in images.py / shopify/build.py) sits above
  "Step N of 3" on all three steps, 96px wide, centred.
- The one-time pricing test is removed from kb.js, build.py and page.html (the kits page dropped it too, owner: "Delete one time
  purchase option entirely"). The test artifact copy stays in git history only.
- Checks: adv-preview run 41364939976 (v16 body injected into the real theme): no errors, no broken images, sticky bar OK,
  fix-row tap lands on the builder, cart = 3 scents on Every 30 days + kit $179.90 -> $0.00, total $119.85, drawer on the page.
  `.github/workflows/qa-adv.yml` is the full QA (every article button scrolls to #mckb, steps 1–3, cart drawer, a second add
  replaces the first kit, sticky bar); INJECT=yes before the deploy, INJECT=no on the live page after it.
- qa-adv runs 1–2 (injected): the page passed everywhere once the harness was right (uppercased button text, the theme scrolls
  to #mckb without setting the hash, host-probe 404s, the desktop cart on the headless browser signature). One real find: a
  second UNLOCK FREE DIFFUSERS left the first kit's lines in place (a sequential /cart/change.js got a 400 after the first
  removal re-keyed the others). kb.js now removes its lines in rounds with /cart/update.js and fresh keys (the fake-cart harness
  in the session scratchpad covers add / replace / unrelated line kept).
- Meta: the three Candle Swap ad sets optimise for Purchase (checked 2026-11-02), so moving the buttons in-page does not change
  delivery; the codeless "Clicked to PDP" event now fires on an in-page scroll, not a kits-page visit. pixel-adv.yml follows the
  new path (fix row -> builder -> UNLOCK FREE DIFFUSERS -> drawer -> checkout).
- pixel-adv run 2 (live, 2026-11-02 00:40 UTC, pixel/pixel-adv-20261102T004.json), phone + desktop: PageView on load,
  SubscribedButtonClick on the fix-row tap and on the builder buttons, 4x AddToCart at UNLOCK FREE DIFFUSERS (one per cart line,
  as on the kits page), PageView + InitiateCheckout on the checkout reached from the drawer. Consent granted (US), one pixel
  980908600592309, no JS errors. The codeless "Clicked to PDP" event does not fire any more (no link to the kits page is left);
  AddToCart on this page is the event to read instead.
