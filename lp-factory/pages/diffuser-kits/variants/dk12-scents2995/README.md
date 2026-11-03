# dk12 — scents $29.95, 3 / 4 / 7 scents per 1 / 2 / 3 free diffusers (preview, owner 2026-11-03)

Owner: "Scents are $29.95 each and now they need 3 for 1 diffuser, 4 for 2 diffusers and 7 for 3 diffusers. You can include
that each scent lasts aprox 15-21+ days." Previewed on MC LP Draft Copy 3 (https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN).

| Kit | Scents | Due today | Value shown |
|---|---|---|---|
| 1 diffuser (Living Room) | 3 | $89.85 | $179.80 |
| 2 diffusers (Living Room & Bedroom, Most popular) | 4 | $119.80 | $299.70 |
| 3 diffusers (whole home, Best value) | 7 | $209.65 | $479.50 |

- Page: SCENT_ONE 29.95, TIERS 3 / 4 / 7, step-1 cards "Lasts 15–21+ days" under "$29.95 each", the two FAQ answers and the
  comparison row now say about 15–21+ days per bottle (were 30+ days).
- Not changed: the review quote "One bottle lasted five weeks" (Kate D.) — a customer's words; owner to decide.
- Build: `python3 patch.py <dir>` then `APP=<dir>/mc-dk-app.js CSS=<dir>/mc-dk.css node ../dk9s-step1-scents/build-variant.mjs <out> "MC LP Draft Copy 3"`.

## Before it can go live (Shopify, not the page)
- The checkout charges what Shopify says: the scent price on the Subi plan lines has to become $29.95 (variant price or the
  selling plan's price), or the page shows $119.80 while checkout charges $159.80.
- The automatic "N FREE DIFFUSERS — SCENT SUBSCRIPTION" discounts free the kit variant for 2 / 3 / 5 subscribed scents; they
  should require 3 / 4 / 7.
- qa-kits.yml cart totals ($119.85 / $79.90) and copy checks need the new numbers.
