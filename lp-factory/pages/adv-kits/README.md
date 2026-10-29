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
