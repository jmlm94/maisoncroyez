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

## LIVE 2026-10-29: https://maisoncroyez.com/pages/indoor-air-alerts
- Page gid://shopify/Page/163225075821, title "Your “Healthy” Diffuser May Be Growing Mold", default page template, published.
- Images: 13 Shopify Files (mc-cs-*.jpg, ?v=1793302792), map in `shopify/urls.json`; body = `shopify/page-body.html` built with it.
- To change the article: edit `src/page.html`, run `python3 shopify/build.py body shopify/urls.json`, then pageUpdate the body.

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
