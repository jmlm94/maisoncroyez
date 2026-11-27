# Home page proposal in the new brand (2026-11-27)

Owner: "could you create a proposal for our home page with the new Maison's branding and voice/tone please?"
Artifact only; nothing here is on the store. Source: home.src.html -> `python3 build.py` -> home-rebrand.html. Pictures:
`python3 make-img.py` (his shoot photos and the kits page's files, into img/).

## What it follows
- Brand board v1.2 (lp-factory/brand/rebrand-2026/README.md): Cream / Night / Blue Hour #6169DF buttons with white text, DM
  Sans Bold titles closed with a period, Roboto Mono only for small labels, the two-line wordmark centered in the header,
  tagline "Exhale the day." as the closing line and under the footer logo, the four beliefs, "Bonsoir" opens and "Bonne
  nuit" closes, no emojis, no medical claims, intentions and manifestation gone.
- His later preferences from the kits page: no small labels above section titles, no numbered labels, no middle dot (the
  build fails if one is in the page), compact sections, real photos, social proof, one title size and one spacing for
  every section.
- Every fact and every review is one already on the kits page (prices, 100 ml, 15+ days, 600 sq ft is not used here,
  shipping from Miami in about 5 business days, 30 days, lifetime warranty, 4.7 from 124 reviews, 2,500+ homes, the
  three reviews, the founder note, the scent descriptions). Nothing new is claimed.

## Sections
Announcement bar (his new text) | header | hero "Bonsoir. Leave the day at the door." | three facts | Start here (two
doors: Diffuser kits -> /pages/diffuser-kits-2, Scents -> /collections/power-fragrances) | As simple as 1, 2, 3 | Seven
scents (the kits page's tiles) | Croyez means believe (the four beliefs, the one Night band) | What customers told us +
customer photos | A note from our founder (-> /pages/who-we-are) | the 30-day promise | five questions | closing band
"Exhale the day." | footer (the store's links, brand colours, tagline under the logo).

## Left out of the live home page on purpose
"The diffusers are 100% on us" / "Get my free diffusers" (the offer is now kits with the first scents free), the
intentions and manifesting copy, "Made in France" and "100% organic from France" (unconfirmed, conflicting sources),
"Reduce stress, anxiety and brain activity" (medical-sounding), the emoji bullets, the four named reviews (not verified as
real), the third door to /products/diffuser-scents (the older 1 / 3 / 5 diffuser bundles).

## Decided (owner, 2026-11-27)
Headline stays "Leave the day at the door." | "Bonsoir." stays | two doors only (Diffuser kits and Scents; no door to the
older bundles page) | the kits buttons point to /pages/diffuser-kits-2.
Next: he asked to check competitors' home pages for anything missing (.github/workflows/home-refs.yml ->
lp-factory/recon-home/competitors/).

## Competitor check (2026-11-27)
Nine home pages read on a phone by `.github/workflows/home-refs.yml` (results in `lp-factory/recon-home/competitors/`:
headings in page order, page text, buttons, a full-page screenshot each): Aroma360, AromaTech, Hotel Collection, Pura
(scent diffusers) and Ketro, Mozi Wash, Flewd, Hanni, Primally Pure (the reference brands).

Added to the proposal because most of them have it and every fact is already on the kits page:
- "How many rooms?" | 1, 2 or 3 diffusers with coverage (600 / 1,200 / 1,800 sq ft) and price ($89 / $159 / $239).
  Pura, Aroma360 and Hotel Collection all sort diffusers by room size.
- A safety row under the three steps (overnight, kids and pets, no tank, timer). Aroma360, Pura, Mozi and Flewd put
  this near the top; here it was only in the questions.
- Scent tiles: each goes to its own product page, the three best sellers are marked (the same three the kits page
  picks: Midnight Sensation, Golden Blossom Harmony, Crisp Citrus Scape), the price is in the line above.
- Footer: "Contact us" (/pages/contact) and the Instagram, TikTok and Facebook profiles the live site links to.
Section bands now run cream, sand, cream, sand, night.

Seen on their pages, not added (needs the owner's decision or material):
- A seasonal offer in the hero: all nine lead with Black Friday today. The proposal keeps the standing offer.
- An offer for joining the e-mail list (Pura 10%, AromaTech 15%). The footer form has no offer.
- Video: Aroma360, AromaTech, Mozi and Ketro run clips or customer videos. The proposal is stills only.
- A scent quiz (AromaTech, Flewd, Hotel Collection). The tiles and best-seller marks stand in for it.
- Press or named endorsements (Mozi, Hotel Collection, Ketro's doctors). None on file, none invented.
- A page that backs the clean claims with the ingredient list or standards (Pura, Mozi). "100% organic" has no
  document behind it in this repo.
- Star ratings per scent (Mozi, Aroma360, AromaTech, Hotel Collection). Needs the per-product review counts.

## Hero video (2026-11-27)
The owner sent his founder video (1080x1920, 51 s, with sound; the source is not in the repo). `make-video.sh` cuts a
12-second muted loop from its silent product close-ups (book and mug, pouring the scent, head on the bottle, bottle into
the diffuser, one press, diffuser by the flowers), cropped square: `img/hero-1080.mp4` (1.4 MB, desktop),
`img/hero-720.mp4` (0.7 MB, phone), `img/hero-720.webm` (fallback), `img/hero-poster.webp` (the still shown first).
The hero frame is square on phone now (it was 5:4). A round button pauses and plays it; with "reduce motion" on, it
starts paused. Checked in Chromium on phone and desktop: plays, loops, pauses.
The parts where the founder speaks are not in the loop: they need sound. Open: use the full video, with sound and a
play button, in "A note from our founder" (her words were not checked; no transcription tool here).
