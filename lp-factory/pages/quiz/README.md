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

## Competitor quizzes (2026-11-27, .github/workflows/quiz-refs.yml -> lp-factory/recon-quiz/)
A phone walk-through, first answer on every step, three passes. Read in full: Aroma360 and Flewd. In part: Laundry Sauce
(first question), Scentbird (first question), Noom (first four). Hotel Collection's "Find your scent" opens a builder,
not a quiz. AromaTech's opens a chat-style finder. Pura has no quiz we could find.
- Aroma360 "Find your scent" (8 steps): interior style | favorite scent profile (four PHOTO tiles: citrus, woodsy,
  floral, fresh) | home size (photo tiles with square feet) | personality | which collection | age | vents | then
  "Your Results Are In! Please enter your email to get your results".
- Flewd "stress quiz" (9 steps): symptoms (pick many) | how often | how intense, 0 to 5 | more symptoms | wake up
  exhausted? | fatigue in the last 30 days? | age range | first name | then "where can we send your results and
  discount code?". Small asides under each question ("don't stress this answer, go with your gut").
- Laundry Sauce: "My vibe is" (personality), "1 of 6". Scentbird: "What type of fragrance are you looking for?".
- Noom: one line of reason above a question ("Hormones impact how our bodies metabolize food."), a section label.
What none of them does: answer an objection between questions, show the price before the result, or give the result
without an e-mail. Ours does all three.
Taken from them (round 2): photo tiles on "Which smells do you love?"; the result named for the moment she chose;
the saving stated on the cost screen and the result; customers' photos on the result.
Not taken: the e-mail gate (owner: no e-mail), a discount code for finishing (no offer decided), personality and
interior-style questions (they do not change which scent fits), asking her age.

## Round 3 (owner 2026-11-27: "Implement!!!")
His calls: wire checkout when we deploy, same offer (one free scent per diffuser) | all the customer pictures across the
quiz | add emotion | Patricia's video somewhere | no samplers | same 8 questions.
- Opening screen: the muted loop from the home proposal, "Bonsoir. You gave the day to everyone else.", the rating he
  uses on his pages (4.7 | 124 reviews) and "Loved in 2,500+ homes across America." (both his numbers).
- Question 1 reworded ("When do you most want to breathe out?"); the answers and the matching are unchanged.
- A short line above each next question answers what she just said (function echo).
- The owner's 29 creator photos (Drive list in ../adv-kits/drive/ids.txt) are in img/c-01..29.webp, made by
  make-assets.sh. 24 are used, six to a strip, on the opening, trust 1, trust 3 and the result. Left out: 06, 09, 10,
  13, 29 (words burned into the frame, two of them an old price). They are shown as photos, never next to a quote.
- Trust 2 now opens on Patricia's whole video with sound (img/patricia.mp4, 2.9 MB, tap to play). Her words were not
  checked by this session (no transcription); the owner calls it "really good". The line "tests every scent in her own
  living room first" is from her founder note on the kits page.
- Result: her founder-note line, a photo strip, "Tonight, one press. The evening takes it from there."
- Checkout: on maisoncroyez.com the button clears this page's own lines from the cart, adds one kit variant (1, 2 or 3
  diffusers) and one 100 ml scent per diffuser (the three automatic discounts make them free), on the 30-day plan when
  she chose refills, then goes to /checkout. Same code path as the kits page. In the preview it opens the kits page.
  NOT run against the store yet: do it at deploy (a real cart test from the QA runner, as for the kits page).
