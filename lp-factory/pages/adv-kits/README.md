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
