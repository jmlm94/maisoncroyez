# dk12 — scents $29.95, 3 / 4 / 7 scents per 1 / 2 / 3 free diffusers (owner 2026-11-03; LIVE the same night, see the end)

Owner: "Scents are $29.95 each and now they need 3 for 1 diffuser, 4 for 2 diffusers and 7 for 3 diffusers. You can include
that each scent lasts aprox 15-21+ days." Previewed on MC LP Draft Copy 3 (https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN).

| Kit | Scents | Due today | Value shown |
|---|---|---|---|
| 1 diffuser (Living Room) | 3 | $89.85 | $179.80 |
| 2 diffusers (Living Room & Bedroom, Most popular) | 4 | $119.80 | $299.70 |
| 3 diffusers (whole home, Best value) | 7 | $209.65 | $479.50 |

- Page: SCENT_ONE 29.95, TIERS 3 / 4 / 7; the two FAQ answers and the comparison row now say about 15–21+ days per bottle
  (were 30+ days).
- Round 2 (owner, 2026-11-03): "the lasts 15-21+ days depending on use should appear on the second step ... above the actual
  variants ... three icons like step 1: Organic Ingredients, Parabens-Free, Cruelty-Free. they're also ifra51 compliant".
  Step 2, between the title row and the scent tiles: "Each scent lasts 15–21 days, depending on use." (round 4: no "+")
  and three badges in the step-1 colours with line icons (leaf / crossed-out drop / rabbit): Organic Ingredients,
  Paraben-Free, Cruelty-Free. Nothing about days on the step-1 cards any more.
- The Candle Swap builder (adv-kits/src/kitscss/kb.js + page.html) has the same changes (owner: same deploy).
- Not changed: the review quote "One bottle lasted five weeks" (Kate D.) — a customer's words; owner to decide.
- Build: `python3 patch.py <dir>` then `APP=<dir>/mc-dk-app.js CSS=<dir>/mc-dk.css node ../dk9s-step1-scents/build-variant.mjs <out> "MC LP Draft Copy 3"`.

## Before it can go live (Shopify, not the page)
- The checkout charges what Shopify says: the scent price on the Subi plan lines has to become $29.95 (variant price or the
  selling plan's price), or the page shows $119.80 while checkout charges $159.80.
- The automatic "N FREE DIFFUSERS — SCENT SUBSCRIPTION" discounts free the kit variant for 2 / 3 / 5 subscribed scents; they
  should require 3 / 4 / 7.
- QA: qa-kits-dk12.patch and qa-adv-dk12.patch hold the new numbers + a step-2 check; `git apply` them at deploy (pushing
  them earlier would run real carts against the old live pages).
- Store-wide price (owner, 2026-11-03: "Store-wide"): the 7 scent variants go to $29.95, so product pages and one-time
  buyers pay $29.95 too.
- Round 3 (owner comment, 2026-11-03): "all bold please, same for the icons" — the whole step-2 line is bold (800), the badge
  labels 800 and the badge icons drawn heavier (stroke 2.3 instead of 1.6). Same on the Candle Swap builder.
- Round 4 (owner comments, 2026-11-03): "15% bigger. 15-21 DAYS." — the line is .92rem (was .8) and says 15–21 days (the "+" is
  gone there, in the FAQ and the comparison row); "this below the 3" — "All IFRA 51 compliant." now sits under the three badges.

## LIVE 2026-11-03 (kits key dk12-f208dca 01:19 UTC, Candle Swap key cs17-f208dca 01:22 UTC)
Done through the Shopify connector in this order (store confirmed Maison Croyez before each write): 1. the 7 scent variants to
$29.95 (compare-at $49.95 kept), 2. both pages (the four Shopify Files from raw @ f208dca, then the page bodies), 3. the three
BXGY discounts' customerBuys quantity 2 / 3 / 5 → 3 / 4 / 7 (1389794623597 / 1389794852973 / 1389794951277). The section above
was the pre-deploy checklist; qa-kits-dk12.patch and qa-adv-dk12.patch were applied in commit 1fab4ca (live QA runs). Existing
subscribers keep their Subi prices (Subi not touched). Full deploy notes: ../../README.md (dk12 entry) and
../../../adv-kits/README.md (v17).
