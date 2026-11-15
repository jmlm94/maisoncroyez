# Maison Croyez rebrand (started 2026-11-15)

Owner (2026-11-15): "I'd like to rebuild Maison's branding with your help. First of all, let's grab the current branding we
have ... We'd like to rebrand absolutely everything. ... please ask me as many questions as you wish. By the way, we'll try
other products such as shower steamers, magnesium bath soaks and scented creams. Everything under the scent."

References he sent: primallypure.com, ketroskin.com, flewdstresscare.com, moziwash.com. He also attached a finished brand board
from his other brand as the format the final result should follow. That file is his upload and is not stored in this repo.

## Status
- Step 1, round one (done 2026-11-15): audit of the current brand, the four references, the outline of the board, 30 questions.
- Step 1, round two (open): the owner answered the seven priority questions in the chat (decisions below) and said "Keep asking
  questions, you shouldn't be able to build anything yet. Let's do it alright and use all our resources." The brief now shows
  the decisions, the buyer numbers and 44 new questions (ids r01..r44, nine marked "first").
  Later the same day he answered the nine "first" questions in the chat (round-two decisions below) and asked for the rest
  there: "Send me the other remaining questions here please." Sent as chat questions 10 to 46 (map at the end). The brief
  page still shows all 44 as open; the chat is the record.
  Artifact "Maison Rebrand Brief": https://claude.ai/artifact/GkEWZF1tzmEjV1jJhT5sEj (v2; source: brief-template.html here; the
  published page embeds images from the repo's own photos and captures). Answers save in the page's database, collection
  `answers`, one document per question id: `{q, sel[], note, at}`. The session is not notified when he answers; he says so in
  the chat or pastes "Copy my answers".
- Round two answered in full (2026-11-15, chat questions 10 to 46; decisions below). SCOPE RULE from the owner, same message:
  "For the rest of answers, please, don't mention anything about the products or the sales or the offer, it's irrelevant, i
  need to talk ONLY about the branding the website needs, please. Don't make m waste time." So: the deliverable is a WEBSITE
  brand board (his reference board is one: brand, colour, typography, imagery, iconography, UI and touchpoints), plus the logo
  he keeps. Do not raise products, formats, prices, stock, sales channels, offers or claims again. Scent system and packaging
  are out of scope until he brings them up.
- GO-AHEAD (2026-11-15, question dialog): "Full board now" (he skipped the two-directions step), pictures "Both" (evening
  scenes with a woman plus texture close-ups), "Light + dark sections".
- Step 3 BUILT, first draft (2026-11-15): artifact "Maison Croyez Brand Board"
  https://claude.ai/artifact/GdkV9ERQHTegES3nrP3WJ8 (v3 = board v1.2 after his two reviews, see below). Source in board/.
  The session does not watch this artifact (webhook limit), so comments on the page do not arrive; he replies in chat.
- Nothing on Shopify changes in any of this until he says so. The live pages are untouched.

## Owner's review of the first draft (2026-11-15) -> board v1.1
His words: "Primary for background: Between Paper & Cream, something in the middle. Signature for buttons and links: Between
Blue hour and blue hour light, something in the middle. Primary for text and dark, a little darker than night. We'll stay
with bold sans type system. Tagline: Let's keep talking to see if we can build the perfect one. Brand pillars, let's also
talk about this and figure it ut. the logo needs to be the two line wordmark everywhere."
- DECIDED: bold sans (DM Sans Bold headlines, Roboto Mono labels); the headline switcher and the serif are gone.
- DECIDED: the two-line wordmark is the only logo. Stamp, monogram and one-line are out of the board (their SVGs stay in
  board/logo/ unused). My one flagged exception, awaiting his OK: the 16 px browser tab icon, where I suggest the M of the
  wordmark alone (board/logo/maison-croyez-m.svg).
- Colors as he asked (exact midpoints): Cream #F9F6EE (was #F6F1E7), signature Blue Hour #7A82E7 (was #4B55D6), Night
  #161210 (was #1F1B18). Followed from that: Paper #FFFDF9, Dusk #231D19, Wash #E9EAFB. Consequence I told him: white text
  on #7A82E7 is 3.4:1, so button text is Night (5.5:1), and links and small labels on light use the old blue, kept as
  "Blue Hour Deep" #4B55D6 (5.4:1); #7A82E7 on Cream is 3.1:1, fills and large UI only. The page keeps one switch: his mix
  against the first draft's blue.
- OPEN, in discussion: tagline (eight candidates on the board: Exhale the day. / Leave the day at the door. / The evening
  is yours. / Believe in the evening. / Unwind in 3, 2, 1. / Scent for the end of the day. / The day ends here. / Stress,
  meet your match.; my picks are the first two) and brand pillars (three builds on the board: A short phrases, B one word
  each, C as beliefs "We believe..."; my pick is C).

## Owner's second review (2026-11-15) -> board v1.2
His words: "I found another reference which is https://heyhanni.com/ would you get something out of this to make our new
branding even better. Based on my choice, for the button text make it white than and maybe make the purple a liiiiiitlle
darker. for the browser tab do whatyou think it's better. Exhale the day is better. With C for the pillars."
- DECIDED tagline: "Exhale the day." (footer under the logo, end of emails and ads, closing line of the home page; always
  with the period). "Stress, meet your match." and "Leave the day at the door." stay as campaign headlines.
- DECIDED pillars, as beliefs: The evening is hers. / Scent is the shortcut. / Rest should be easy. / Premium, within reach.
- DECIDED signature: white button text, on Blue Hour #6169DF. That is the lightest blue between the first draft (#4B55D6)
  and his mix (#7A82E7) where white text reaches 4.5:1 (4.57). I told him it is more than "a little" darker and why. Wash
  #E7E8FB. Links and small labels on light stay Blue Hour Deep #4B55D6 (#6169DF on Cream is 4.2:1, large type and fills
  only). The page's one switch now compares the decided blue with his lighter mix.
- DECIDED (he left it to me): the browser tab icon is the M of the wordmark alone; everywhere else the two-line wordmark.
- Fifth reference, Hanni (captured in lp-factory/recon-brand/heyhanni/; the full-page captures are stretched, the top
  captures and tokens.json are good). What it does: cream #F4EDE4 with one deep brand color for all text and buttons
  (#6A1A31), a soft serif display (Cooper Light) over Inter, a 70-year-old model as the hero, its initial repeated as a
  wallpaper pattern, a centered logo with the menu on the left, short two-word names, small quiet buttons, and a seasonal
  campaign that takes over only the hero. Taken into v1.2: (1) header with the logo centered; (2) casting from 35 to 70+,
  "age shown as elegance", with a new reference picture board/img/woman-silver.webp; (3) an OPTIONAL tone-on-tone pattern
  of the wordmark's M, awaiting his OK; (4) a rule that a seasonal campaign may bring one guest color and a pattern into
  the hero and top bar only. Not taken: the serif (he locked bold sans), the loud color and wallpaper as the base look.

## Pack mockups, round 1 (2026-11-15)
His words: "Yes to the M pattern. Now, with higgsfield, let's create a mock up for the three products we're planning to
launch. Ask me questions if needed." (The pattern is now a plain part of the board, no longer "optional".)
- His picks in a question dialog: formats "Pouch, box, bottle" (soak in a matte stand-up pouch, steamers in a slim upright
  carton, spray in an aluminum mist bottle); color "Rich color per scent" (logo in cream); working names "Sandalwood,
  Eucalyptus, Lavender" under the moods Unwind / Be here / Drift off.
- Method that worked: draw the flat front artwork with the real wordmark and fonts (mockups/make-labels.js ->
  mockups/labels/<product>-<scent>.png, nine files), push, import them into Higgsfield by raw GitHub link
  (media_import_url; the repo is public), then generate with gpt_image_2_6 (2k, high) passing three labels as
  image_references and a prompt that says to reproduce each reference exactly. Logo and every word came out right first
  time. Results fetched by fetch-brand-art.yml with DEST = mockups/img.
- Pack front: wordmark top left, "01 / 03" top right, mood name in DM Sans Bold, scent under it, numbered rule, product in
  mono capitals bottom left, "Exhale the day." bottom right. No weights, counts or claims printed.
- Working colors: clay #A9512F, eucalyptus green #2F5D4B, violet #5A4694 (cream text 5.0 / 7.0 / 7.1 to 1).
- Five pictures in mockups/img: family, soak, steamers, spray, dusk. Page: mockups/pack-mockups.html, artifact
  "Maison Croyez Pack Mockups" https://claude.ai/artifact/HYroMJ4kuuYez3UPRd9jRW (not watched).
- Row 2, same day. While round 1 was being finished he sent four pack references and wrote: "What if I give you these
  references as a second row after you're done with this?" The four: a Saltair body wash (deep matte pump bottle, giant
  wordmark at the base, tiny text block), a Melabody toner held by a model (tonal brown, typewriter "[ 02 ] tone"), an OSEA
  body scrub jar with a swatch of the product behind it, and an Alo single-use magnesium bath soak sachet (cream, centered
  logo). What they share: the wordmark is the hero, small type, tonal color. Row 1 did the opposite (mood big, logo small).
- Row 2 artwork (mockups/make-labels-r2.js -> labels/r2-*.png): deep bottle and carton with a small text block high up and
  the two-line wordmark across the base; cream single-bath sachet, centered, the mood in the scent color; pale-tint jar
  with the wordmark centered. Pictures in mockups/img: r2-family, r2-sachets, r2-jar, r2-bottles, r2-model (a woman in her
  fifties holding the bottle; generated, no reference photo of a person was passed to the generator).
- The page now shows both rows and a comparison. Asked him: row 1, row 2 or a mix (big wordmark on full color); the soak
  pack (stand-up pouch, single-bath sachet or jar); keep the three colors; pump in cream or in the bottle color.
- DECIDED (2026-11-15): after seeing both rows he wrote "Revert, we like the prior design really." Read as: row 1 (the mood
  leads, full color, pouch / carton / bottle) is the pack direction, and row 2 is dropped. The page and the artifact are
  back to row 1 only. Row 2's artwork, script and pictures stay in mockups/ (labels/r2-*, img/r2-*, make-labels-r2.js) as
  a record of what was tried; they are not used anywhere. Still open: pump in cream or in the pack color.
- First page in the new brand (2026-11-15): a bath soak PDP preview, artifact only, following the kits page structure. Source
  and notes in lp-factory/pages/bath-soak/ (README there lists every placeholder). https://claude.ai/artifact/AviMUuKqQSgBeMufQFpJ19
- Higgsfield so far for the rebrand: 26 generations at 2.75 credits.

## The board (first draft, 2026-11-15; everything in it is a proposal until he confirms)
- Format: his reference board's parts, plus a logo part. Cover · 01 The brand · 02 Logo · 03 Color · 04 Typography ·
  05 Imagery · 06 Iconography · 07 UI & touchpoints (eight components, a desktop home hero, a phone night section, three
  scent tiles). Cream pages with Night bands. No products, prices, offers or claims in it; sample UI copy stays generic.
- Brand words: statement, mission "Give her the evening back.", audience "Women 35 and up." (readable for 55+),
  personality "Calm and plain-spoken.", pillars Evening first / Scent leads / Simple as 1, 2, 3 / High-end, within reach.
  Tagline proposed "Believe in the evening." (Croyez = believe); alternates "The day ends here." and "Stress, meet your
  match.". Voice: short, plain, benefit first, a light smile. French touch: "Bonsoir" opens, "Bonne nuit" closes.
- Color: Cream #F6F1E7, Night #1F1B18, signature Blue Hour #4B55D6 (recommended; on Night #A9AEF7, wash #E6E7FA). Switchable
  alternates on the page: Ember #E4572E (needs dark button text) and Fig #7D3C74. Neutrals Paper #FCFAF5, Sand #EAE1D1,
  Stone #CFC4B1, Driftwood #6E655B, Dusk #2B2622; Alert #B4432B. Ratio 70 neutrals / 20 Night / 10 signature. Other color
  comes only from pictures and scent tiles (three placeholder tints).
- Type: DM Sans Bold headlines (sentence case, closed with a period), DM Sans text, Roboto Mono capitals for labels. This is
  Ketro's pair with the mono moved from headlines to labels. Switchable alternates: Roboto Mono capitals as Ketro, and
  Instrument Serif. All free on Google Fonts.
- Logo: kept as is. Three source PNGs (1080 px): two-line (repo root "MC VERSION 2-01 (1).png"), stamp (Drive "MC VERSION
  1-01.png", id 1iVtZaZlUtNUZcklZYf0BlA1P6QDEnSKu), monogram (Drive "VERSION 4-01.png", id 1XDp3NHnNClAIhMZPLRaXB2dl6h7ytC8_).
  Traced to vectors with vtracer at 6x (board/logo/*.svg). No one-line file exists, so the one-line version is the two-line
  letters set on one line (word space 0.54 of the cap height, measured on the stamp lettering). Good for screens; print
  needs a hand-finished master. He chose "identical", so nothing was refined.
- Imagery: dusk and after, one warm lamp, blue at the window, women 35+, water / steam / salt / linen. Nine generated
  reference pictures (Higgsfield gpt_image_2_6, 2k, 10 jobs incl. one rejected) in board/img/, fetched by
  .github/workflows/fetch-brand-art.yml. They are references, not final photography.
- Icons: Lucide (ISC license), stroke 1.5 px; the 21 used are copied into board/icons/.
- Files: board/board.src.html (the page, with {{logo:..}} and {{i:..}} placeholders) -> `python3 board/build.py` ->
  board/maison-brand-board.html (published file). Republish: Artifact publish of that file with root = board/ and the nine
  img/*.webp as files. A local look needs the publish skeleton around the file (doctype + body) and board/img beside it.
- Not done yet: the board as a "Design System" artifact for building pages, print masters, the three scents and names,
  packaging. Roll-out to pages only after he approves the board.

## Decisions (owner, 2026-11-15, round one)
- Name: still Maison Croyez. He is "open to start our branding process completely from scratch and create a new identity".
- Feel: "more minimalistic, easy to understand and digest and a sense of high-end affordable branding".
- Inspiration mix: 50% Ketro, 30% Mozi, 20% Flewd. "Neutral colors as the main ones but making the buttons and some elements
  more colorful. At the end the packaging we'll use is gonna be colorful as well." Primally Pure gets no weight.
- One signature colour. (Open: how it lives next to colourful packs, question r14.)
- "Intentions & Manifestation go, however we'll keep doing scents to enhance mood and increase relaxation and presence."
- Products: diffusers + scents continue; launching Scented Magnesium Bath Soak, Shower Steamers, "maybe magnesium spray".
  (Scented creams were in his first message and not in this list.)
- Scents: 7 for the diffuser "as always"; "only 3 scents" for the other three products.
- Rule: "If anything has conflicts or contradictions, remove both and let's build again." Applied to the eight gaps below: all
  four colour systems, both voices, Project Heart's never-list and the live pages' counter-practices, all three intention maps,
  the home-only / women-30+ rule, both origin claims. These are blank in the new brand. The live pages are untouched.

## Decisions (owner, 2026-11-15, round two: the nine "first" questions, answered in the chat)
- r01 audience: "women from 35+ if possible, which is more or less what we wanted for Maison at the beginning". My reading,
  told to him: aimed at 35 to 55, still comfortable to read for the 55+ woman who buys today.
- r03 why now: "we don't have a strong branding and there's no congruence anywhere + whatever we did doesn't look as
  professional and consistent as the references I shared".
- r05 promise: "Relaxation after a whole day with scented products that enhance your mood and make you stay present. The
  affordable luxury is more for the branding." Relaxation leads the message; affordable luxury is the look, not the words.
- r09 three scents for the new products: "Haven't decided." r10 scent names: "Haven't decided."
- r14 colour: "one colour everywhere, the other mix of colors should be given by the products, but the site should be really
  sober. I think Mozi is the perfect example for this."
- r17 Ketro: "the black and white plus the bold and modern headlines and descriptions. I think those are the perfect fonts for
  Maison but open to what you say." Ketro's fonts as captured: Roboto Mono 600/700 (headlines, capitals) + DM Sans (text),
  both free. My note to him: DM Sans yes; Roboto Mono is what makes Ketro look clinical and it is heavy next to the thin
  logo, so compare it with one softer bold option in step 2 before locking it.
- r24 new products: "Ideas only. Need to develop the new branding in order to continue."
- r33 tone: "between stress, meet your match and calmer evening as simple as 1, 2, 3". Reading: short, plain, benefit first,
  a light smile allowed.
- "Drop sales by scent, orders, reviews. It doesn't mater to the context. Drive doesn't matter either." No store data and no
  Drive files are needed for the rebrand; the connectors stay as they are.
- "Logo is the only thing we're preserving here." Everything else is new. Open: which logo pieces and a vector redraw (chat
  questions 23 to 25).
- "Also we'll do spray instead." Magnesium spray is in, scented creams are out.

## Decisions (owner, 2026-11-15, round two: chat questions 10 to 46)
- 10: she comes for "one of the three products we'll launch. We're dropping diffusers and scents for now. Should be more a
  treat for herself of course."
- 11 success in a year: "Revenue and profit (?) Community too..."
- 12 tagline "Attract what you sense": "Drop it, let's find something new."
- 13 "Croyez" = believe: yes, part of the story. 14 French feel: "Could be, I like it."
- 15: finish the branding first; the three scents and the names come after.
- 16: "Mood mostly, three different options for different tastes. I'm imagining sandalwood, bergamot, eucalyptus, lavender,
  etc... but not sure as of now."
- 17 moods: "Relax, which leads to presence, which leads to sleep. I think we'll use the night angle more really."
- 18 diffuser scents: "Same formulas, same everything, we're not dropping them, just putting them aside. However everything
  we say and determine should help the diffusers and scents to be sold too."
- 19 signature colour: "between warm and cool really. You can also surprise me." 20 neutrals: warm (cream, sand, soft black).
- 21 serif: show both. 22 fonts: happy to license a typeface.
- 23 logo: all four versions from the old toolkit stay. 24: redraw as a vector, identical. 25: MAISON CROYEZ in full, always.
- 26 from Mozi: one pack shape with a colour per scent, "Meet our scents" as the way to shop, a sample kit first.
- 27 from Flewd: names that say the benefit, trios and samplers. (Not the playful tone, pill buttons, quiz or shiny pouches.)
- 28 to 33: nothing fixed ("It doesn't matter. We're building the branding toolkit."); the new products lead at launch.
- 35: the diffuser hardware stays as it is. 36: no documented claims yet. 37: feelings and body language are both allowed.
- 40 emojis: "15% presence emojs only" (reading: rare, about one piece in seven, never the default).
- 43: Claude makes the final files. 44: "Ideas." (reading: idea-level mockups are fine). 45: he alone approves; no deadline.
- 34, 38, 39, 41, 42: "Irrelevant."

## What the data says (read-only, 2026-11-15)
- Meta Ads, account "Maison Croyez Ad Account ['25]" (act_522507185818783), last 90 days (17 Aug to 14 Nov 2026), purchases
  credited to ads: 231 purchases on $38,129 spend. By age: 18-24 0 · 25-34 8 (3%) · 35-44 13 (6%) · 45-54 36 (16%) ·
  55-64 74 (32%) · 65+ 100 (43%). By gender: women 216 (94%), men 15 (6%). So 75% of ad purchases come from people 55+,
  91% from 45+. The three weighted references all speak to a younger shopper: this is question r01.
- NOT read: the Shopify, Klaviyo and Triple Whale connectors were pointed at the owner's other store (Carbinox) on this date,
  so no Maison sales by scent, orders or reviews. Do not query or switch them without his say (switching Shopify revokes the
  current token). Earlier repo notes (pages/free-diffusers/STATUS.md, 2026-10-02) name Golden Blossom Harmony, Crisp Citrus
  Scape and Midnight Sensation as the three top sellers; unconfirmed today.
- Google Drive: the complete "TOOLKIT MAISON CROYEZ.pdf" (8.9 MB, with images; file id 1jfz4mQDblLhPkigwe_wrwZIFXczvL7fd) and a
  "Logos" folder (id 1oYkEwHjHTWf2WnsiEISvmIh0iJnIcz1H) with PNG versions (MC VERSION 1-01 / 1-02 / 2-01 / 2-02, VERSION 4-01 /
  4-02). No vector logo, no dielines, nothing on the new products. Notion: nothing on the new products.

## Target format of the final board
One long page in numbered parts: cover · 01 the brand (statement, mission, audience, personality, pillars, voice and tone) ·
02 colour (core, neutrals, dominance ratio, contrast checks) · 03 typography (families, licences and fallbacks, type scale) ·
04 imagery (art direction, treatments, do and do not) · 05 iconography · 06 UI and touchpoints (buttons, chips, ratings, FAQ
rows, navigation, sample pages on desktop and phone). For Maison add: logo system, scent system (naming and colour across
products), packaging (diffuser, oils, steamers, soaks, spray).

## The brand today
Sources: Brand Identity Guidelines, Toolkit 2023, Content Guidelines, Marketing Angles, Scripts Feb 25, AI Character Bible
Apr 2026, Project Heart v2.0 May 2026, lp-factory/brand-kit.md, pages/pdp-free-diffuser/DESIGN-SYSTEM.md, the built pages,
the recon-home capture, the photos at the repo root.
- What it is: luxury home fragrance, one waterless plug-in diffuser + seven intention-based scents, women 30+ (older docs: 35+),
  tagline "Attract what you sense". Project Heart's three pillars: Intention, Quiet Luxury, Effortless.
- Logo: two-line wordmark, light geometric sans, looped M ("MC VERSION 2-01 (1).png" is the only logo file in the repo);
  outlined MC monogram on boxes and bottles. Toolkit: four logo versions (stamp, one-line, isotype, two-line).
- Type: Unna (headlines), Outfit (caps labels, buttons), Be Vietnam Pro (body). Consistent since 2023.
- Colour, four systems in use: toolkit blush #ECDFDE + rosewood #C4A59F + multi-colour gradients; store theme pink-to-coral
  bar (#E8ABB4 -> #EB6D4A), cream #FCFBF7, near-black buttons #1F1F1F; mid-2026 landing pages blush / rosewood-deep #8A5B52 /
  green CTA #0A9400 / gradient #7C3AED -> #C0589B -> #F59E0B / stars #F5B301; current kits page ink #141414 / #241C18, cream
  #FDFBF8, gold #A3874A, savings green #1E7A1E, pastel pills.
- Packaging: one gradient per scent on a textured box (monogram, name, intention, three notes), matte black aluminium bottle
  100 ml; diffuser = grey woven fabric cylinder, matte white top.
- Photography: ingredient flat lays on blush, concrete-grey studio pack shots, creator scenes in warm neutral homes.
- Voice: documents = elegant, warm, quiet luxury, no emojis, no medical claims; selling pages = direct response
  ("JUST FOR TODAY: THE DIFFUSERS ARE 100% FREE!", "NO SMOKE, NO HARM", "REDUCE STRESS & ANXIETY").

## Eight things the rebrand has to settle
1. Four colour systems at once.
2. Two voices.
3. Project Heart's rules (no free-diffuser offers, no medical-sounding claims, no emojis) against the live pages.
4. Intentions disagree: Golden Blossom Harmony = Love on the box, Peace in Project Heart, Prosperity & Harmony in the
   character bible.
5. Project Heart defines Maison as home fragrance for women 30+ and rules out candles, room sprays and perfume. The new body
   products break that frame.
6. "Maison" means house.
7. Origin claims conflict: "100% organic from France" vs never "Made in France" vs a U.S. supplier.
8. "TOOLKIT MAISON CROYEZ 5.pdf" in the repo lost its images (logo versions, palette, patterns, packaging renders are blank)
   and there is no vector logo.

## The four references
Captured 2026-11-15 by .github/workflows/brand-refs.yml into lp-factory/recon-brand/<site>/ (home + first product page,
phone + desktop, tokens.json with fonts, colours, headings, buttons).
- Primally Pure: calm, natural, premium. Silk Serif Light + Apercu + Apercu Mono caps; olive #505B43, sand #CBBEA5, cream
  #E9E3DB, ink #2F3433; square buttons. Ritual sets, a signature scent, "Over 40,000 5-Star Reviews".
- Ketro: clean, bold, clinical. Roboto Mono caps + DM Sans; coral #ED5A44 on black #231F20 and off-white #F8F8F6; 8 px buttons;
  huge wordmark on the tube; "Originally formulated for the Boston Red Sox", Us / Them, advisory board.
- Flewd Stresscare: loud, playful. Gilmer 900 lowercase + a bubbly display face; lime #E0FE2C, purple #B800FF, lilac #ECD5EC;
  pill buttons with a hard shadow; chrome pouches; products named by benefit ("cramp deleting soak"); quiz, sampler, trios.
- Mozi Wash: friendly, scent-led. Degular; teal #13ACAC, lavender #EBECFF, cream #FAF3E0; one bottle shape, one colour per
  scent; "Meet Our Scents" (Signature Cozy, Vanilla Moon, Malibu Mornings); sample kit, build-a-bundle.
- Shared: one owned colour on calm neutrals, a recognisable type voice, colour-coded packaging as the hero, plain-word product
  names, proof near the top, few products with clear first offers.

## Round-two questions (44; nine marked "first")
First: r01 who the brand is for (today's buyer is a woman 55+) · r03 why rebrand now · r05 what leads the promise · r09 which
three scents for the new products · r10 scent names · r14 signature colour vs colourful packs · r17 which parts of Ketro ·
r24 where the new products stand · r33 pick the line that sounds like the new Maison.
Rest: what she comes for, success in a year, tagline, "Croyez" = believe, French feel, what a scent carries, moods, formulas,
signature colour and neutrals, parts of Mozi and Flewd, serif, font licences, short name on packs, monogram, soak format,
steamers per pack, spray, target prices, pack printing, launch hero, current stock, diffuser hardware, provable claims, body
claims, offers, proof, emojis, live pages, channels, who makes the final files, mockups, approvers and deadline, anything else.

Chat numbering of what was still open (sent 2026-11-15; answers arrive like "10ab, 11: ..., 12a"):
10 r02 · 11 r04 · 12 r06 · 13 r07 · 14 r08 · 15 new: who picks the three scents and the names (stands in for r09 and r10) ·
16 r11 · 17 r12 · 18 r13 · 19 r15 · 20 r16 · 21 r20 · 22 r21 · 23 r23 reworded: which logo pieces stay · 24 new: redraw the
logo as a vector · 25 r22 · 26 r18 · 27 r19 · 28 r25 · 29 r26 · 30 r27 · 31 r28 · 32 r29 · 33 r30 · 34 r31 · 35 r32 · 36 r34 ·
37 r35 · 38 r36 · 39 r37 · 40 r38 · 41 r39 · 42 r40 · 43 r41 · 44 r42 (mockups, since the products are ideas only) ·
45 r43 · 46 r44.

## Round-one questions (30; superseded by round two)
q01 which reference is closest · q03 the brand in one line · q04 what happens to intentions and manifestation · q07 does the
name stay · q10 products at launch · q12 how many scents, shared across products · q17 one signature colour or a colour per
scent. The rest: likes and dislikes per reference, customer, price, logo, tagline, hero product, scent names, naming scheme,
packaging (new and current), light or dark, typography, what must survive, photography, voice, provable claims, stress
language, emojis, board scope, where it goes live first, decision makers and deadline, original files, anything else.
