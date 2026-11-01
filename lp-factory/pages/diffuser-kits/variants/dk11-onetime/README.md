# dk11 — step 1 / step 3 changes on /pages/diffuser-kits (preview only, NOT live; one-time option removed in round 10)


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

Round 4 (v52), owner: "switch this, frequency vs one time payment section first and then the three notes". Step 3 order is
now: kit summary, value, Due today, refill buttons + one-time link (or, in one-time mode, the link back), the three notes
("You pick just above"), the guarantee note, Add to cart.

Round 5 (v53), owner: the refill heading reads "Select your auto-refill frequency to unlock your FREE Diffusers:" with a
small line under it, "Cancel within 30 days for a full refund." Round 6 (v54): that small line deleted (owner).
Round 8 (v56), owner: in subscription mode the three notes become one explanation, "Your diffusers are free ($89.95 each)
when you select any auto-refill option. You can swap, pause or cancel your auto-refill anytime, and we'll send you a prepaid
return label.", and the "Swap, pause and cancel anytime…" note under it is gone (one-time mode unchanged).
Round 7 (v55), owner: on step 1 the "+ N FREE Diffusers" line is ALL CAPS and green on all three cards.

Build: `python3 patch.py <dir>` then `APP=<dir>/mc-dk-app.js CSS=<dir>/mc-dk.css node ../dk9s-step1-scents/build-variant.mjs <out> "MC LP Draft Copy 3"`;
the published file also inlines the seven scent photos from ../../../adv-kits/kits-ref/img (webp).

Before this could go live: the 30-day window is a placeholder (owner to confirm); one-time cart wiring is missing (on the
store a one-time Add to cart only shows a message): the unused "(One-Time)" kit variants (45900920324205 / …356973 / …389741,
now $80.00 / $90.05 / $140.10) would need $49.95 / $99.90 / $149.85 and the scents added without a selling plan; check that
the FREE DIFFUSERS BXGYs (customerBuys isOneTimePurchase: true) do not also zero those one-time kit lines; the
refund-on-subscribe would be a manual support step.

## Rounds 9 and 10 (artifact v57, owner, 2026-11-01)

- Round 9: step 1 title "How many scents and diffusers would you like?" is now "Buy more scents = *Get more FREE Diffusers:*"
  (the italic half stays on one line; on a phone the "=" ends line one). The "Step N of 3" label is 25% bigger (.62rem to
  .775rem) with 14px above it, on all three steps.
- Round 10: "Delete one time purchase option entirely." The default build (`python3 patch.py <dir>`, `python3 live.py [KEY]`)
  is subscription only: no one-time link, no one-time step 3, and the cart code is the live dk10b one, untouched.
  `DK11_ONETIME=1` still builds the one-time version (and live.py's one-time cart wiring) for reference.
  Because of that, a dk11 deploy no longer needs the "(One-Time)" kit variants repriced.
