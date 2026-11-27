# Scent quiz (proposal, artifact only)
Owner, 2026-11-27: "The quiz is being made to literally make them feel convinced about buying. Wanna fight prices,
scents, skepticism, everything." | no email step, it builds her package right away | "every 2-3 [questions] we should
show a screen replying to xyz objection" | third best seller switched to Euphoric Bloom.
Build: `python3 build.py` (quiz.src.html + logo + icons -> quiz.html). Pictures in img/ are copies from home-rebrand.
Research behind it: lp-factory/quiz/RESEARCH.md.

## Flow (13 or 14 screens, one tap each where possible)
1. When do you want your home to smell its best? (one answer)
2. What do you use at home today? (the survey's own list)
3. TRUST 1, "is it better than what I use / too good to be true": changes with answer 2 (water diffuser, candles, another
   waterless diffuser, nothing yet, or plug-ins and sprays). Real survey quote and the survey's switching numbers.
4. What does all of that cost you a month? (skipped when she uses nothing yet)
5. Which smells do you love? (one or two of seven kinds, or "surprise me")
6. Any smells you don't enjoy? (those scents are left out)
7. TRUST 2, "I can't smell it through a screen": free swap, 30 days, first scents free.
8. How strong do you like it?
9. Who's at home? (kids, dog, cat, allergies)
10. TRUST 3, strength and safety: changes with answers 8 and 9.
11. Which rooms? (sets 1, 2 or 3 diffusers)
12. TRUST 4, price and subscription: the cost for her rooms, "no subscription needed", her own monthly spend next to
    the $29.95 refill, the survey's bottle-life numbers.
13. A two-second "putting your kit together" screen.
14. Her kit: 1 / 2 / 3 diffusers (changeable), one scent per room with the reason, a "change scent" list on each,
    her strength setting, the cost, refills (none, or every 30 days), "Checkout".

## Matching (in quiz.src.html, function match)
Points per scent from what she loves (by the notes printed on the boxes), scents she dislikes removed, a small nudge
for the moment she named and for soft/sensitive (Crisp Citrus Scape and Chilled Citrus, "the two lightest" per the kits
page), a small edge for what sells more, and for the second and third scent a small edge for what customers order
together (store data). Nobody smelled the scents for this: the matching rests on the ingredient notes and sales.

## Facts used (all on file)
Survey numbers (23 real answers, Sept 2026): 16 switched from plug-ins, 14 from candles; bottle lasted two weeks or
longer for 19, more than a month for 11. Quotes are from that survey, lightly trimmed, anonymous. Prices, coverage,
timer, guarantee, swap, warranty and the kids-and-pets wording are the kits page's own.
Not used: "hypoallergenic", "100% organic", any review count, any quote from the fictional lists, and the words of the
unhappy respondents as praise.

## Open
- The "Checkout" button opens the kits page for now. To go straight to checkout with her kit, the quiz has to run on
  the store (same cart code as the kits page); Shopify is disconnected since 2026-11-23.
- Refills on the result start on "No refills for now" (the kits page starts on "Every 30 days"). Owner to decide.
- Where it lives (its own page, a button on the home page, the ads) and how answers are counted (no tracking yet).
