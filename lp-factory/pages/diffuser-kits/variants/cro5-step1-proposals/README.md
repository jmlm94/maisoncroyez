# cro5 — five CRO proposals for the kits step 1 (2026-10-25)

Owner asked for "5 high CRO proposals for this to explain the offer as well as making the customer feel
extremely convinced to keep going and aware that we're giving literally FREE diffusers", then "show them to
me designed please on an artifact".

Board artifact: https://claude.ai/artifact/W7XnjHzk2Uyn9zmSoGXwgG (six renders + interactive previews p1…p5, all).
Nothing here is deployed. Built on the live dk9v files (app @ a21d428).

| # | Proposal | Change |
|---|---|---|
| 1 | The receipt | `.t9p1` bill under the cards for the selected option: scents × $39.95, diffusers struck to $0, you pay today, "You get $X free. That is more than you pay." |
| 2 | FREE on the picture | green `.t9p2-tag` on the diffuser photo corner, "+ N FREE Diffusers" (FREE green), "~~$value~~ value" under the photo, no green pill |
| 3 | Why free? | `.t9p3-why` note under the sub-line (honest reason; the "keep the diffuser" ending is NOT in the mock — policy decision) |
| 4 | Your plan, in numbers | `.t9s-how.t9p4` lines use the selected option's numbers + "Diffusers are never charged", label "Your plan · N scents" |
| 5 | The gift on the button | "Pick my N scents ➔" + sub-line "N free diffusers ship with them · $X today" on the step-next button and the sticky bar |
| all | All five | stacked; if taken together, drop either the receipt's "You pay today" or the plan's "Today" line |

Files: `patch.py` (applies each proposal to the live app/css → `<variant>/mc-dk-app.js|mc-dk.css`), `shot.mjs`
(step-1 region on phone + desktop, hides the sticky bar), `board.py` (the board page), `shots/` (phone renders).
Suggested order: 2 + 5, then 1 + 4, then 3.
