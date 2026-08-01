# Blueprint 002 — Mellow-style Advertorial
Source: Mellow Sleep "adv-cap-game-changer" advertorial (`lp-references/mellowsleep-adv-cap-game-changer.pdf`). Output: `/pages/adv-scent-ritual`. Cold traffic → PDP click-through. All CTAs → PDP, label + ` ➔`.

## Brief (owner-approved 2026-07-04)
- Angle 1 (Attraction-Driven Fragrance Rituals), story scent Golden Blossom Harmony (Love)
- Fictional first-person narrator ("Rebecca H.") — owner approved shipping live, incl. comments + review wall (no [PLACEHOLDER] gates)
- Dollar amounts deliberately anchored ABOVE the $89.95 offer ($200+/mo candle habit, $2,300 over two years)
- FAQ included (unlike reference) · handle `adv-scent-ritual`

## Section order (as built)
announcement w/ inline claim CTA ("selling fast" pill gated `confirmed:false`) → article header (SPECIAL REPORT eyebrow · headline · byline w/ portrait + auto "Last updated") → hero split (✕ graveyard / ✓ golden room) → top comments (2 FB-style) → story part 1 (pain → graveyard w/ price badges → Elena pull-quote reveal → annotated product → research bullets w/ price anchor → first evening → timeline pills → checks → mechanism cards) → intentionMap → ctaBreak feature → story part 2 (why-I'm-telling + honest truth + CTA) → offer → guarantee → review wall (7) → FAQ (10) → guarantee compact → sticky gradient bar.

## Mellow structural DNA (reuse for any advertorial reference)
News-article disguise → relatable pain story → product graveyard w/ wasted $ → authority/friend pivot quote → skeptic's research checklist ending on the price → results timeline → mechanism feature cards → sincerity beat ("I'm not an influencer") → anti-hype honesty section → offer block → review wall → final CTA. Their chiropractor = our Elena (friend whose home stops you at the door). Their $49 anchor = our "less than one month of the candle habit."

## New reusable components (page src/app.js — backport to core when stable)
Article block renderer (`h2/p/img/quote/bullets/grave/timeline/checks/cards/cta`), ArticleHeader + byline, HeroSplit, Comments, price-badge overlay (`pbadge`), product callout chips, adv announcement bar.

## Media
4 Higgsfield-generated editorial images (raw/ + processed/): grave, pain-scene, golden-room (cropped out of a magazine-page gen artifact — regenerate w/ product reference if owner wants the real diffuser in shot), narrator. Reused: adefsrtd4 (product), dsc6068 (perfumery), offer45, frags 1-7, logos.
NOTE: sandbox egress can't reach the Higgsfield CDN — `.github/workflows/fetch-lp-assets.yml` fetches media via GitHub Actions (edit URLs, push the workflow file to trigger).
