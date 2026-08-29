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
