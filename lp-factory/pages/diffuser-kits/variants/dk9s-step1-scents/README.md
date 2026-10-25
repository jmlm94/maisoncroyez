# dk9s — step 1 framed around the scent subscription (PREVIEW ONLY, not deployed)

Owner request 2026-10-25: step 1 of /pages/diffuser-kits confused visitors because the three options were
"1 / 2 / 3 Diffusers" with nothing about the scents or the subscription that makes the diffusers free.
Same design; live page stays dk9r. Steps 2 and 3, prices, plans and cart wiring unchanged.

## Round 1 (artifact v37)
Title "How many scents would you like on subscription?" + line "Ships every 30, 60 or 90 days · Cancel anytime · Free diffusers included";
cards "2 / 3 / 5 Scents · Cancel anytime · [kit image] · + 1 / 2 / 3 Diffusers · $89.95 / $179.90 / $269.85 FREE".

## Round 2 (artifact v38) — owner: "add an extra image … show the free diffusers … put the price on each variant, $39.95, and the total"
Each card now reads, top to bottom: "2 / 3 / 5 Scents" · a row of 2 / 3 / 5 bottle thumbnails (the step-2 product photos, slots love / abundance / … in FILL_ORDER) ·
"$39.95 each" · "+ 1 / 2 / 3 Diffusers" · the kit picture (1 / 2 / 3 diffusers) · struck $89.95 / $179.90 / $269.85 + FREE pill · "TOTAL TODAY $79.90 / $119.85 / $199.75".
"Cancel anytime" moved off the card into the title line and a new three-line strip under the cards (my addition, owner asked what else would cut friction):
"Today you pay only for your scents. The free diffuser(s) ship with them." / "Next boxes are scents only, same price, every 30, 60 or 90 days. You pick on the last step." /
"Cancel anytime from any delivery email. 30-day money-back, prepaid return." (all three restate the page's own FAQ answers).

- `patch.py <outdir>` — reads the live `mc-dk-app.js` / `mc-dk.css` and writes the variant pair into `<outdir>` (asserts on every anchor; adds `fragSrc()` next to `fillKeys()`).
- `build-variant.mjs` — the scratchpad `pw/build.mjs` with `APP=` / `CSS=` env overrides; inlines the kit pictures and the ritual bottle webps. `STANDIN=1` swaps the CDN-only product photos for the ritual bottle shots (local screenshots only — the sandbox cannot reach the Shopify CDN; the published artifact keeps the real URLs).
- Local three-step walk (steps-shot.mjs) after round 2: 0 JS errors on phone / small / desktop; step-1 card texts
  "2 Scents $39.95 each + 1 Diffuser $89.95 FREE TOTAL TODAY $79.90" / "MOST POPULAR 3 Scents … + 2 Diffusers $179.90 FREE TOTAL TODAY $119.85" / "BEST VALUE 5 Scents … + 3 Diffusers $269.85 FREE TOTAL TODAY $199.75".
- Not done on purpose: no deploy, no change to the home-page cards or the qa-kits gate (its step-1 checks would need the new texts before any deploy).
