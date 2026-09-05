# Six-Month Transformation Program — PAGES deploy (p6m1)

Live URL: https://maisoncroyez.com/pages/six-month-program
Page: gid://shopify/Page/119394369645 (published 2026-08-29)

## Deploy state (p6m1, 2026-08-29)
- Page body: prehero (Diseno_sin_titulo_92.png) + font preloads + #root + fixed-key loader
  `p6m1-472a4f6` loading mc-lp-vendor.js (shared React) + mc-lp-diffuser-assets.js (CDN asset map)
  + mc-6mp-app.js + mc-6mp.css; MutationObserver hides prehero once the app mounts; FB pixel init
  lives inside the app file (1.5s, no-op if theme fbq exists) + fbq AddToCart on the button.
- Files: mc-6mp-app.js gid://shopify/GenericFile/29842134663277 (sha 472a4f6 src, ~46KB minified),
  mc-6mp.css gid://shopify/GenericFile/29842134696045 (~78KB, CDN fonts).
- App source = artifact 959573c9 with: one-time purchase only (subscription toggle removed),
  old-offer FAQ item ("Can I get refills later?" / Manifestation Circle) deleted, picker
  "before renewal" copy trimmed, legacy in-app cart-drawer takeover stripped, ritual variant
  45728132202605, cart line = kit variant + "Scents" property.
- Product 8215141417069 variants (used by ATC): $199/$279/$399, compareAt 239.75/479.50/719.25,
  inventoryPolicy CONTINUE.

## Product page REVERTED (owner request 2026-08-29)
/products/maison-croyez-manifestation-specia-bundles is back to its pre-deploy state:
original descriptionHtml (kt5 hour-key loader) restored and the original mc-kits-app.js
(13.7KB vanilla app, gid 29577274294381) / mc-kits.css (gid 29577274327149) re-uploaded.
Variant fixes (compareAt + CONTINUE) kept — the pages ATC sells those variants.

## Verified live (recon r99–r100)
- /pages/six-month-program: renders (announcement, 3 tiers, 8/8 picks, ATC $279), cart/add 200,
  drawer opens, prehero hides, 0 JS errors, 0 overflow.
- Product page: old app renders, new-offer content gone, kt5 loader present, 0 errors.

## Known sitewide leftover (NOT part of this deploy)
mc-drawer.js (theme-level, hour key dr1-<hour>) injects an OLD-offer cart-drawer testimonial
("Verified Circle member… subscription… free diffuser… 30-day") + trust badges on EVERY page,
including this one and build-your-kit-2. Owner to decide whether to update/remove it.

## Sitewide drawer refresh (2026-08-29, gid 29651366445165, live at next dr1 hour flip)
mc-drawer.js updated for the current offer: testimonial now "Verified Buyer" (money-back
guarantee / boutique hotel / 100ml lasts a month — no subscription/Circle/free-diffuser/30-day),
urgency line now "Founder's Offer: +1 mystery scent added to your kit, free — reserved at
checkout" (triggers on diffuser/program/kit lines), trust badges now Money-Back Guarantee /
Lifetime Warranty / Safe For Kids & Pets, dead selling-plan FREE-repricing removed.

## QA (recon r102) — drawer purchase flow
QA1 six-month-program happy path: PASS (drawer opens, Home Kit $279 + Scents property,
  checkout button reaches /checkouts/, 0 errors)
QA2 drawer operations: PASS (2 tiers $478, ✕ remove works -> $279, drawer stays functional)
QA3 build-your-kit-2: **FAIL — page is broken/mischarging**: still advertises
  $79.95/$139.95/$209.95 but tier-1 variant 45644596936813 no longer exists (cart 422) and
  tiers 2/3 add the repriced $279/$399 program variants. All homepage CTAs point at this page.
  Owner decision pending: repoint funnel to /pages/six-month-program or restore V2 variants.

## Funnel repointed to /pages/six-month-program (2026-08-29, owner request after QA3 fail)
- Homepage app (mc-home-app.js gid 29644413796461): all 4 CTAs -> /pages/six-month-program;
  hero CTA text "Claim Your Free Scents" -> "Start Your Program" (live at hm3 hour flip).
- Header menu item 568907530349: "Build your Kit ->" retitled "Six-Month Program ->" + repointed.
- Footer menu item 566031679597: "Get Your FREE Scents" retitled "The Six-Month Program" + repointed.
- /pages/build-your-kit-2: UNPUBLISHED (page gid 119186260077 kept as draft) and 301-redirected
  to /pages/six-month-program (redirect gid 356090544237).
- Verified (recon r103): redirect 301 live; header/footer menus updated, zero build-your-kit-2
  links on rendered pages; repointed home app confirmed on CDN (4 new links, 0 old).

## Mobile layout breakage fixed (2026-08-29, reported via owner screen recording)
Symptom: on live /pages/six-month-program the tier/scent card layouts collapsed
(prices glued "$199$239.75", stepper vertical, tier image stacked). Reproduced in CI
chromium; local harness rendered fine.
Root cause (recon r105-r107): the app renders its layout rows as <span>s (required:
tier cards are <button>s, phrasing content only). The theme's page template wraps the
page body in .prose, and a theme rule targeting spans there (specificity 0,1,1)
out-competes our single-class rules like .kit-txt{display:flex} (0,1,0), killing every
flex container that is a span. Only compound-selector rules (e.g. .picker .pick-row)
survived. A secondary find: the fixed CDN key p6m1-472a4f6 had also cached a stale
copy of mc-6mp.css (78,014 bytes vs current 78,009) — keys are cached forever at
first request, so the key was bumped as part of the fix.
Fix: appended a "theme-cascade hardening" block to mc-6mp.css — for every rule that
sets display, re-assert it as `#root <selector>{display:<value> !important}` (209
top-level rules + 3 media-query rules, generated from the source; id selector beats
any theme class rule). Verified in an adversarial local harness (.prose span
{display:inline-block} injected) before deploy.
- mc-6mp.css (gid 29842134696045) updated: source 97,321 bytes, minified 83,595.
- Page loader key bumped p6m1-472a4f6 -> p6m3-593d6c2 (p6m2-4a69f1f was an
  intermediate bump before the cascade root cause was found).
- Verified live (recon r109): kit-row/kit-txt/kit-price-row/pick-row/pick-txt/pick-qty
  all compute flex at 390px, 0 page errors, screenshots match approved artifact;
  ATC smoke: /cart/add.js 200, Ritual Kit $199.00, test line removed after check.
- Repo deploy-ready/mc-6mp.css now carries the hardened source.
Note: the artifact draft is unchanged on purpose — the hardening is live-only armor
against theme CSS; the artifact has no theme cascade.

## Announcement moved below hero + 92% line removed (2026-08-29, owner request)
- Founder's Offer bar no longer renders at the very top of the app; it now renders
  inside the buy section, directly below the hero gallery (wrapped with the gallery in
  a new .gal-col div). Full-bleed black bar on mobile (<=899px); rounded card under the
  gallery column on desktop (>=860px). Rating line ("★★★★★ 92% ...") deleted from the
  buybox; the microProof string remains in CONFIG but is unused.
- mc-6mp-app.js (gid 29842134663277) + mc-6mp.css (gid 29842134696045) updated;
  css hardening block regenerated. Page loader key bumped p6m3-593d6c2 -> p6m4-e4326f9
  after origin-gate (recon r111).
- Verified live (recon r112 + screenshots): announcement below gallery at 390px,
  full-bleed, 0 rating elements, flex layout intact, 0 page errors.
- Artifact 959573c9 (MC LP Variant Draft) republished with the same changes.

## Announcement one-liner + kit-card spacing polish (2026-08-29, owner request)
- Announcement text shortened: "Founder's Offer: +1 free mystery scent with your kit."
  Forced to one line (nowrap + clamp(.72rem,3.5vw,.9rem)); bar bottom padding 11px -> 21px.
- Kit tier cards decompressed: image 74 -> 88px, .kit-txt line gap 3 -> 5px, includes line
  demoted to 500-weight muted (.84rem), coverage line .76rem muted, price row margin-top
  5px / gap 10px, card padding 17px 16px 16px, gap between cards 14 -> 16px, plan-name
  1.14rem / line-height 1.22.
- mc-6mp-app.js + mc-6mp.css updated (origin-gated r113); page key p6m4 -> p6m5-b53588d.
- Verified live (recon r114 screenshots @390px): one-line bar with extra bottom padding,
  roomier cards, layout intact.
- Artifact 959573c9 republished to match.

## Announcement spacing correction: padding -> margin (2026-08-29, owner clarification)
- The 10px extra bottom space on the announcement bar is now OUTSIDE the bar:
  .gal-col .adv-announce{padding:11px 15px;margin-bottom:10px} (two-class selector to
  out-rank the earlier mobile relocation rule, whose 4px margin was also raised to 10px).
- css-only change (origin-gated r115/r117 — first upload's single-class rule lost the
  cascade, second upload fixed specificity); page key p6m5 -> p6m6 -> p6m7-a4b967c.
- Verified live (recon r118): padding-bottom 11px, margin-bottom 10px, one-line text,
  0 errors. Artifact 959573c9 republished to match.

## Brand fonts + list markers fixed sitewide on the page (2026-08-29, owner report)
Symptom: live h1/h2/body text rendered in the theme font (Nunito-style sans) instead of
brand fonts; below-fold bullets showed doubled markers (gold dot + theme disc).
Root cause: same theme-cascade issue as the flex breakage — theme .prose rules (0,1,1)
out-rank our element-level typography rules like h1,h2,h3{font-family:'Unna'} (0,0,1)
and every ul{list-style:none} (0,1,0 or less).
Fix (css only, generated hardening extended):
- New base rule #root{font-family:'Be Vietnam Pro',...} + inherit blanket
  (#root p/span/div/li/button/... {font-family:inherit !important}).
- Every rule setting font-family re-emitted as #root-prefixed !important, carrying its
  font-weight/font-style/letter-spacing/line-height/text-transform (127 rules).
- List hardening: #root ul,ol{list-style:none;padding-left:0;margin-left:0 !important},
  #root li + li::marker neutralized (every list in the design is list-style:none with
  custom ::before markers).
- Keys p6m8-47256b3 (fonts) then p6m9-c6f219e (lists), each origin-gated (r119/r120/r122).
- Verified live (r121/r123): h1 Unna 700 line-height .92, h2 Unna, prices/names Unna,
  base+paragraphs Be Vietnam Pro, ul list-style none pad 0, screenshots of hero,
  below-fold sections and FAQ all match the approved artifact; 0 page errors.
Artifact draft unchanged except it already carried the body BVP base — the hardening is
live-only armor against theme CSS.

## Micro-tweaks (2026-08-29, owner request)
- Announcement bar bottom margin 10px -> 16px (more air before the title).
- Hero price line "From $199 or $49.75/mo with Shop Pay" reduced 10%: 1.15rem -> 1.04rem.
- Scent cards: "$39.95 Included FREE in your kit" -> "$39.95 Included!" (app copy).
- app + css updated, origin-gated (r124); page key p6m9 -> p6m10-c8caec2.
- Verified live (r125): margin-bottom 16px, price 16.64px (exactly -10%), "$39.95 Included!",
  0 errors; screenshots confirm. Artifact 959573c9 republished to match.

## Tier selector redesigned: WEEM-style price grid (2026-08-29, owner-approved after 5 draft rounds)
- Old horizontal row cards (image + text) replaced by a 3-across grid: kit name + emoji
  on top, bold "1x Diffuser / 4x Scents" counts, compare-at above a 2.15rem Unna price,
  white $/day pill ($1.10/$0.77/$0.73). Pastel gradients per card (gold/blush/lavender).
- Home Kit card scaled 1.07 with drop shadow; chips: Most Popular (Home), Best Value
  (Sanctuary — tag added to KITS data).
- Below the section title: big green "6-MONTH SUPPLY PER DIFFUSER" pill + black
  "+ Extra Mystery Scent if you buy today 🎁" line. Old per-card mystery badge, includes/
  coverage/Shop Pay detail panel and kit thumbnails removed.
- Selection logic unchanged (sel.setKit drives scent counts + ATC variant as before).
- app+css uploaded (origin-gated r128); page key p6m10 -> p6m11-a1a9522. Hardening
  regenerated (214 display + 133 typography rules) — new kg spans armored vs theme.
- Verified live (r129): grid/cards flex, banner+extra, chips, $/day pills, 0 errors;
  ATC smoke Home Kit $279.00 add+remove OK. Artifact 959573c9 already matched (v5).

## 2026-08-30 — Page-speed QA + optimization program (keys p6m12 → p6m15)

Jose asked for 3 QA speed tests + optimization. All tests: GitHub Actions recon,
390×844 viewport, slow-4G (1.6Mbps/150ms RTT) + 4× CPU throttle, 3 fresh-context
runs per round.

Baseline (r131, key p6m11): FCP ~0.5s · LCP ~4.3s · app-render ~4.0s · load ~7.2s ·
our JS 76KB gz (vendor = full React 43.1KB).

Rounds:
1. r133 — hero width=900→780 + low-pri scripts. LCP regressed to ~5.1s: the real
   LCP element is the app gallery's first image (same Diseno file); changing only
   the prehero width broke the URL cache match → refetch. Lesson: prehero and
   gallery slide 1 must share the exact image URL.
2. r135 (p6m12) — gallery URLs also →780 (cache match restored) + head preloads
   for CSS + 3 scripts (vendor fetchpriority=high). LCP back to baseline.
3. r139 (p6m13) — **vendor swapped React→Preact** (preact 10.19.3 + hooks + htm
   + React-compat shim; source in lp-factory/pages/kits-lp/vendor-slim/,
   mc-lp-vendor.js gid 29282275164269). 43.1KB → 6.6KB gz. App-render 4.0→2.4s.
   All consumers of the shared vendor (6mp app, old kits app, free-diffuser app)
   audited: hooks/createElement/createRoot only — shim-complete. ATC verified.
4. r141 (p6m14) — FB pixel deferred (first interaction / load+0.5s / 8s cap) and
   gallery slides 2+ src-gated until load+300ms — they were flooding the LCP
   window after the now-early app mount.
5. r143 (p6m15) — same late-arm gate applied to all below-fold <Img> media
   (scent thumbs, section images) via window.__mcLateOn queue.

Final (r143): FCP ~0.49s · LCP ~4.5s (≈baseline; photo is bandwidth-bound by
theme/app-embed weight) · **app-render ~2.6s (−35-40%)** · load ~7.3s · our JS
39KB gz · PNG-fallback hero 1.59MB→758KB · zero JS errors · ATC 200 · grid/rows
intact.

Untouchable early-window weight (theme locked / third-party apps): session-
recorder embed 70.6KB, theme Nunito fonts ~89KB (unused on this page), Shopify
platform scripts ~230KB.

NOTE: deploys in this window used fileUpdate originalSource pointed at
raw.githubusercontent.com (repo is public) — staged-upload curl was blocked by
the sandbox permission layer. Pattern: commit file → fileUpdate with the raw URL
pinned to the commit sha.

## 2026-08-30 — Card polish round (key p6m16-991ea6e)
Per Jose: removed "From" in hero price line; removed the 6-MONTH SUPPLY PER
DIFFUSER badge (kept "+ Extra Mystery Scent..." line, margin-top 9px→2px);
bottom-anchored tier-card price block (.kg-compare margin-top:auto +
padding-top:6px) so Ritual and Sanctuary read equal, Home Kit stays scale(1.07).
CSS edits applied identically to source and hardened file (no display/font
rules touched, hardening blocks unchanged). Verified live r145: price text,
badge gone, pill bottoms aligned, 0 errors. Artifact 959573c9 republished from
the live copy + these edits (local draft had drifted ~14KB; merged onto live).

## 2026-08-30 — Banner override removed from mc-drawer.js
Per Jose (he'll set the announcement bar manually in the theme customizer):
deleted the banner IIFE (WOW text + blush #mc-banner-style) from mc-drawer.js;
cart-drawer takeover unchanged. Origin-gated r146 (banner=0, drawer intact,
6807 bytes). File uses the theme's HOURLY dr1- key — goes live at the 01:00 UTC
flip; check-in trig_01NNHnoXeqpdRqA4erHVsigM verifies at 01:05Z.
Also r147: confirmed storefront HTML serves p6m16 (Jose's "don't see changes"
was device cache — advised hard refresh).

## 2026-08-30 — Badge correction + card equalization (keys p6m17 → p6m18)
Jose clarified: the badge to remove was the BLACK "6-MONTH SUPPLY" pill next to
the price line (.price-badge.supply-badge), not the green one above the grid
(both now gone). Removed in app (p6m17).
Card side-difference root cause found via r150 computed-style diag: the THEME
applies margin-top:16px to every .kg-card except the first (adjacent-sibling
spacing rule); in a stretch grid, item margins subtract from stretched height,
so Sanctuary rendered 16px shorter/lower than Ritual. Fix: added
`.kitgrid>.kg-card{margin:0 !important}` to css source+hardened (p6m18).
Verified r152 at 1280 AND 390: Ritual/Sanctuary pixel-identical (h239, same
top), Home 256 elevated, pill gone, price "$199 or $49.75/mo with Shop Pay",
0 errors. Artifact republished.
LESSON: theme sibling-margin rules hit grid items — add margin hardening for
any future grid/flex rows inside .prose.

## 2026-08-30 — Price line fully removed + green banner restored (key p6m19-6099d6e)
Jose's original "remove the from 199 or 49.75" meant the ENTIRE price line
("$199 or $49.75/mo with Shop Pay"), not just the word "From" — the whole
.price-row div is now deleted from the buybox (prices live in the tier cards).
Green "6-MONTH SUPPLY PER DIFFUSER" banner restored above the grid (was removed
by my earlier misread; .supply-extra margin-top back to 9px). Black pill stays
removed. Verified live r154: priceLine:false, banner text present, pill:false,
grid+7 rows, 0 errors. Artifact republished in sync.
Final buybox order: h1 → $99 Ritual Program box → picker title → green banner
→ extra-scent line → tier grid.

## 2026-08-30 — Final polish round (key p6m20-f50505c)
Per Jose: (1) h1→ritual-box gap 10→6px (.buybox h1 + .ritual-incl margin-top:-4px);
(2) kitgrid→"Your scents" title gap ~28→48px (.kitgrid + .picker-title
margin-top:38px); (3) .pick-count .79rem→1.02rem; (4) 100ml pill added next to
every scent name (.pick-ml span in pick-name; css appended to source+hardened
with #root display hardening line). Verified live r156: ml:7, cntSize 16.32px,
h1ToRitual 6, gridToTitle 48, key20, 0 errors.
Also r156 confirmed: mc-banner-style injector fully gone post-01:00Z flip
(annStyleTag:false); WOW text now shown is Jose's own theme-customizer setting.

## 2026-08-30 — Pill to bottom-right + gap 8px (keys p6m21-b668aab → p6m22-21b8371)
Jose: "put the 100ml bottom right same small size and everything" + h1→ritual
gap "Do 8px". App: .pick-ml span moved from pick-name to after .pick-smells
inside each .pick. CSS: .pick-ml now absolute right:12px bottom:11px (needs
.pick{position:relative}, already present line 967); .buybox h1 + .ritual-incl
margin-top:-2px (= 8px effective with 10px flex gap). Deployed b668aab, gated
r157, flipped p6m21, verified r158 (mlCount 7, insets ~13/12, h1ToRitual 8) —
but screenshot showed pill overlapping tail of long SMELLS LIKE line on card 1.
Fix: .pick-smells padding-right:58px (source+hardened, commit 21b8371), gated
r159 (pad=1 abs=1), flipped p6m22-21b8371. r160 verifies clearance via
Range.getClientRects vs pill rect + commits final-pill-clear.png.

## 2026-09-03 — Inner Circle offer prep (LIVE STORE CHANGES, page not yet deployed)
New offer designed in artifact mock (free diffuser + 2 scents / $89.95 per 45
days, "Inner Circle Membership"). Shopify changes applied at Jose's direction:
- Diffuser variant 45450822778989 price 79.95 -> 89.95.
- All 7 scent variants 39.95 -> 49.95; junk 0.00 compareAtPrice cleared.
- NEW automatic discount "Inner Circle — 2 scents for $89.95"
  (DiscountAutomaticNode/1385978429549): $9.95 off, min qty 2, the 7 scent
  products, SUBSCRIPTION ONLY, all recurring cycles, combinesWith
  productDiscounts+shippingDiscounts.
- Existing BXGY "Manifestation Ritual" (1375641600109) intentionally untouched
  — old funnel still depends on it; re-aim at deploy.
Deploy TODO: rewrite page ATC to add 2 scents on Subi 45-day plan
(SellingPlan/2661875821, group Plan 4) + diffuser; verify all 7 scents attached
to that plan group in Subi; member 20% extra-scent discount; Subi portal
settings must match page promises (2-click cancel, skip/pause/swap, 90-day
return policy).

## 2026-09-03 — INNER CIRCLE DEPLOYED LIVE (key ic1-324cb59)
Six-month page now runs the Inner Circle offer: mc-ic-app.js + mc-ic.css
(GenericFiles 29898459742317 / 29898459775085), hero video mc-hero-loop-780
(mp4 29898457055341 / webm 29898457088109). NOTE: Shopify CDN auto-MINIFIES
served js/css — origin gates must use minify-tolerant greps (r161 "truncation"
scare was this).
Key findings/decisions:
- Shopify automatic BXGY does NOT count subscription lines as qualifying buys
  (r162 isolation proof). Free diffuser therefore ships as $0 variant
  45771775639661 ("FREE Diffuser — Inner Circle Membership") on the unlisted
  program product; "Manifestation Ritual" BXGY DEACTIVATED.
- Pair discount 1385978429549 ($9.95 off 2+ sub scents) lands 2×$49.95 at
  exactly $89.95/cycle; verified in cart (4498+4497).
- INNERCIRCLE20 code (1385979117677): 20% off scents, segment-gated to active
  subscribers (Segment 484030316653).
- r164 LIVE e2e: render ✓ video ✓ zero errors ✓ real ATC click → cart total
  8995 ($0 diffuser + 2 plan scents) ✓. Screenshots ic-live-top/card.png.
Rollback: pageUpdate body back to p6m22-21b8371 file set (mc-6mp.* untouched).

## 2026-09-04 — IC polish v=ic4-48ec907 (LIVE)
Jose's three fixes, all live-verified (r165–r168):
1. Video is the only gallery media: removed `poster` from the gal video (old product image no longer layers under/behind it); page-body prehero hide hardened — hides ALL `#mc-prehero` nodes (theme can double-render the body), injects a permanent `#mc-prehero{display:none!important}` style, MutationObserver + 300ms interval + immediate check (`__MC_PREHIDE__` guard).
2. Title→badges gap 30px→4px. Root cause found via r167 computed-style debug: theme prose rule gives the element after an h1 `margin-top:20px`. Fix: `#root .buybox h1 + .featbs{margin-top:-6px !important}` (+ `#root .buybox h1{margin:0!important;padding:0!important}`); `.featbs` base margin-top 2px→-6px.
3. Optout single underline: `#root .optout a{text-decoration:underline!important;...;border-bottom:none!important;box-shadow:none!important;background-image:none!important}` kills the theme's second underline.
Deploy: mc-ic-app.js 62,634B + mc-ic.css 126,445B via fileUpdate (raw@48ec907); page body v bumped ic1→ic4-48ec907 (same file set, new observer script). r168 live: gap 4px, video playing/no poster/0 gal imgs, prehero hidden, optout clean, 0 errors, 0 hscroll. Screenshots: live/ic4-live-top.png, live/ic4-live-optout.png.
Branch note: work now lives on claude/maison-diffuser-perf-fixes-f45ggl (fast-forwarded from claude/maison-offer-v2-deploy-dspkwe history).

## 2026-09-04 — IC polish round 2, v=ic5-395d4d2 (LIVE, r169)
Jose's screen recording showed the REAL video complaint: on slow/cellular loads the OLD product photo (prehero placeholder) greets every page load before the ~1MB video arrives. Fix: extracted frame 1 of the hero loop as mc-hero-poster.jpg (780x780, 37KB; Shopify MediaImage 29905600643181, cdn .../mc-hero-poster.jpg?v=1788533350) and use it BOTH as the prehero placeholder (page body img + preload, aspect 1/1) AND as the video poster (MC_HERO_POSTER in app). Load is now seamless: still of frame 1 -> video starts from that exact frame. Old Diseno_sin_titulo_92.png no longer referenced by this page.
Same deploy, per Jose mid-turn: title->badges gap 4px->10px (h1+.featbs margin-top 0); ledger prices smaller: FREE (.off-lrow .off-price) 1.5->1.3rem, $89.95-today (.off-scent-price) 1.3->1.15rem; main ATC sub-line -> "You're saving $100 today, don't miss it out!" (sticky-bar sub unchanged). Note: .off-pricerow / bare .off-price rules are dead CSS (element not rendered).
r169 live: prehero src+poster = mc-hero-poster.jpg, video playing, gap 10px, sizes 20.8/18.4px, btnSub correct, 0 errors. Screenshots live/ic5-live-top.png, live/ic5-live-hero.png.


## 2026-09-05 — FOUNDER'S OFFER v3 DEPLOYED LIVE (key v3-e408ba3)
Six-month page (119394369645, /pages/six-month-program) now runs the v3 offer:
1 Diffuser $69.95 · 2 Diffusers + 2 scents $89.95 · 3 Diffusers + 3 scents $129.95;
scents $49.95 one-time or $39.95 on the Subi 45-day plan (20% off every delivery).
Files: mc-v3-app.js 89,113B (GenericFile 29920808403053) + mc-v3.css 152,677B
(GenericFile 29920808435821), both from raw@e408ba3. Old mc-ic.* files untouched.
Page title -> "Maison Croyez Diffuser — Founder's Offer".

Shopify commerce setup (all new, additive):
- Product 8245945434221 "Maison Croyez Diffuser — Founder's Offer" (UNLISTED,
  published to Online Store). Variants: 1D 45784228429933 $69.95 · 2D
  45784228462701 $89.95 (cmp 139.90) · 3D 45784228495469 $129.95 (cmp 209.85).
  Untracked inventory, CONTINUE, 0.4/0.8/1.2 lb, kit images mc-kb-kit1/2/3.
- Auto discounts (all product-class, combinable with product+shipping):
  D1 1386354278509 BXGY buy 2D variant (one-time) -> 2 scents 100% off
  D2 1386354311277 BXGY buy 3D variant (one-time) -> 3 scents 100% off
  D3 1386357850221 Basic 20% off the 7 scents, SUBSCRIPTION ONLY, all cycles
  D4 1386354344045 BXGY buy 2 SUBSCRIPTION scents -> 2D variant $79.90 off
  D5 1386354376813 BXGY buy 3 SUBSCRIPTION scents -> 3D variant $119.85 off
  Why D4/D5: Shopify BXGY only supports subscriptions when X is the
  subscription and Y is one-time (changelog 2025-01), so the "included scents
  today, first refill in 45 days" promise is built as: scents ride the plan at
  $39.95 (D3) and the kit line absorbs the same amount (D4/D5) => today's total
  equals the kit price; renewals = scents only at $39.95 via D3.
- DEACTIVATED: 1385978429549 "Inner Circle — 2 scents for $89.95" ($9.95 pair).
  INNERCIRCLE20 code (1385979117677) left as is.
Cart wiring (mc-v3-app.js CART3): kit variant + scent lines (+ selling_plan
2661875821 when the refill plan is chosen); Shop Pay installments line hidden
for subscription carts.
Verification: local render harness (vendor+assets+v3 files) clean; live r174.
Cart e2e from GitHub runners is currently answered 429 "Verifying your
connection" by Shopify bot protection (r171-r173) — draft orders don't apply
automatic discounts and storefront-token creation is policy-blocked, so cart
math must be confirmed from a real browser / first abandoned checkouts.
Rollback: pageUpdate body back to the ic5-395d4d2 file set (mc-ic.css /
mc-ic-app.js), reactivate 1385978429549, deactivate D1-D5.

### 2026-09-05 — v3b hot-fix (key v3b-fbc1fdb, mc-v3-app.js 89,214B via fileUpdate raw@fbc1fdb)
r174 live: page renders (key, tiers, badges, grid picker, steps timeline, 6 pay
logos, 5+5 FAQs, video playing, prehero hidden, h1 gap 10px, 0 errors). Real
ATC click on the default (2D + refill plan) priced 109.95, not 89.95: D4 fired
(kit -79.90) but Shopify does NOT stack D3 (20% sub) on scent lines that are
the BXGY's prerequisite (allocation shows D4 at $0 on them, no D3).
Fix shipped: refill plan offered on the 1-diffuser tier only; tiers 2/3 are
one-time (plan forced "one"), step 3 hidden for them.
r175 live: 2D one-time = 8995 (2 scents zeroed by D1) ✓; 1D + 1 scent on plan
= 10991 (D3 20% -> 39.96, 1c rounding vs page 39.95 — D3 switched to flat
$10.00/item right after) ✓; 0 errors.
TO RESTORE refill on 2/3 packs: put the 20% on the Subi plan itself (Plan 4 /
SellingPlan 2661875821, or a new 45-day plan) — plan-priced lines still count
as BXGY prerequisites (proven by D4 firing) so kit absorbs 79.90/119.85 and
today's total = kit price; then deactivate D3 and re-enable the step in the app
(setTier plan rule + `if (inc) return null`).
Known: sitewide cart drawer (mc-drawer.js) still says "Founder's Offer: +1
mystery scent added..." and "SAFE FOR KIDS & PETS" — separate deploy, flagged.
r176 live: 3D one-time = 12995 (3 scents zeroed by D2) ✓, no "France" text on the page ✓.
Sitewide drawer cleaned the same day (see sitewide-drawer/STATUS.md). Mock artifact
6886f6ee republished at v3b parity (refill step on tier 1 only). H1 left as is (owner).
