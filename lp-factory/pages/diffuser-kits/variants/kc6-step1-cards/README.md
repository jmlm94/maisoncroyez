# kc6 — five step-1 kit-card variants (board only, NOT live)

Owner, 2026-11-01: "design 5 high converting variants of this [the three kit cards on step 1]" so visitors get that
the diffusers are free ($89.95 each), free with auto-refill and cancel anytime, how long the scents last, that it's
limited, and that it's a whole kit for their home. Answers: ~15 days per 100 ml bottle in one diffuser; the limit is the
first 1,000 diffusers; nothing else is in the box.

Board: https://claude.ai/artifact/Lzhx4wb14vECDPwK4oTFcg (`python3 gen.py <out.html>`). Mockups are live HTML using the
kits page's own CSS (../../../adv-kits/src/kits-buybox.css + the theme's measured additions), resolved for phone and
desktop and scoped to `.mk.ph` / `.mk.dk`; tap a kit to switch.

| | Variant | Leads with | Change |
|---|---|---|---|
| A | The Kit List | whole-home kit | three full-width rows: Room Kit / Home Kit / Whole Home Kit, price today, "N FREE diffusers ~~$value~~", scents · $39.95 each, ≈days of scent · sq ft; refill + launch lines under them |
| B | The Receipt | free value | today's cards + live receipt for the selected kit: diffusers ~~$value~~ FREE, scents + days, total value, you pay today, "You get $X free" |
| C | Days of Scent | duration | cards headline ≈30 / 45 / 75 days of scent with one bottle drawn per scent; ≈$2.66 a day |
| D | Launch Drop | limited + free | black launch bar (first 1,000 free, then $89.95 each), "N FREE Diffusers", ~~$value~~ $0 |
| E | How It Works | auto-refill | today's cards + 3 steps for the selected kit: Today / Every 30, 60 or 90 days / Anytime cancel |

Suggested: test A against today's cards, then add D's launch bar to the winner; B if three columns must stay.

Notes for the owner (also on the board):
- Bottle life: the kits FAQ says "One bottle lasts 30+ days on the everyday setting" (live; changing it needs a deploy).
  The advertorial review copy now says "about 15 days" (2 lines, v20).
- Refill timing: running every diffuser daily, a box lasts ≈30 days (1 diffuser, 2 bottles), ≈22 (2 / 3), ≈25 (3 / 5),
  against a 30-day default refill. Cards show total days (bottles × 15).
- No claimed counter is shown; add one only with the real count.
