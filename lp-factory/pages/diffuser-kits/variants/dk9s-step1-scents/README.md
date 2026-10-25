# dk9s — step 1 framed around the scent subscription (PREVIEW ONLY, not deployed)

Owner request 2026-10-25: step 1 of /pages/diffuser-kits confused visitors because the three options were
"1 / 2 / 3 Diffusers" with nothing about the scents or the subscription that makes the diffusers free.
Same design; the options now read "2 / 3 / 5 Scents · Cancel anytime · [kit image] · + 1 / 2 / 3 Diffusers · $89.95 / $179.90 / $269.85 FREE",
the title is "How many scents would you like on subscription?" with the line
"Ships every 30, 60 or 90 days · Cancel anytime · Free diffusers included" under it. Steps 2 and 3, prices, plans and cart wiring unchanged.

- `patch.py <outdir>` — reads the live `mc-dk-app.js` / `mc-dk.css` and writes the variant pair into `<outdir>` (asserts on every anchor).
- `build-variant.mjs` — the scratchpad `pw/build.mjs` with `APP=` / `CSS=` env overrides; builds the self-contained preview page.
- Preview: artifact https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN v37 ("dk9s step 1 scents-first"). Local three-step walk (steps-shot.mjs): 0 JS errors on phone / small / desktop; step 1 texts
  "2 Scents Cancel anytime + 1 Diffuser $89.95 FREE" / "MOST POPULAR 3 Scents … + 2 Diffusers $179.90 FREE" / "BEST VALUE 5 Scents … + 3 Diffusers $269.85 FREE".
- Not done on purpose: no deploy, no prices on step 1 (dk9 rule), no change to the home-page cards or the qa-kits gate.
