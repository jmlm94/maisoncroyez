# dk11 — one-time option on step 3 (preview only, NOT live)

Owner, 2026-11-01: "$49.95/diffuser if no subscription and if you decide to subscribe later, full $99.90 refund …"
"I'm talking to see it on the diffusers-kit page". Previewed as artifact v49 of MC LP Draft Copy 3
(https://claude.ai/artifact/TK1GvMvzMi69pP4wiLMfyN). The live page is unchanged.

Round 2 (artifact v50), owner: "leave it the same, just add a clickable link below the frequencies … add the explanation the
same way". Step 3 is the live page plus one underlined link under the 30 / 60 / 90-day buttons: "One-Time Purchase: Diffusers
$49.95 each. Full refund if you subscribe within 30 days." (owner's wording, v51). Tapping it switches to one-time: the kit line shows ~~$179.90~~ $99.90, the title drops "free",
Due today adds "+ $49.95/diffuser", the refill buttons give way to "← Subscribe instead and get your diffusers FREE", and the
bullets read "Nothing is charged later" / "Change your mind? Start a refill plan within 30 days and we refund the $X you paid
for your diffusers" / 30-day money-back. (Round 1, v49, had two Subscribe / One-time cards; dropped.)

| Kit | Subscribe today | One-time today | Refund if they subscribe later |
|---|---|---|---|
| 1 diffuser + 2 scents | $79.90 | $129.85 | $49.95 |
| 2 diffusers + 3 scents | $119.85 | $219.75 | $99.90 |
| 3 diffusers + 5 scents | $199.75 | $349.60 | $149.85 |

Build: `python3 patch.py <dir>` then `APP=<dir>/mc-dk-app.js CSS=<dir>/mc-dk.css node ../dk9s-step1-scents/build-variant.mjs <out> "MC LP Draft Copy 3"`;
the published file also inlines the seven scent photos from ../../../adv-kits/kits-ref/img (webp).

Before this could go live: the 30-day window is a placeholder (owner to confirm); one-time cart wiring is missing (on the
store a one-time Add to cart only shows a message): the unused "(One-Time)" kit variants (45900920324205 / …356973 / …389741,
now $80.00 / $90.05 / $140.10) would need $49.95 / $99.90 / $149.85 and the scents added without a selling plan; check that
the FREE DIFFUSERS BXGYs (customerBuys isOneTimePurchase: true) do not also zero those one-time kit lines; the
refund-on-subscribe would be a manual support step.
