# Perf round 2 — static pre-hero (fd45) — deploy runbook

Baseline (run 36, real Lighthouse mobile, live fd44):
SCORE 61 · FCP 1.8s · LCP 6.3s · TBT 550ms · CLS 0.064 · SI 3.1s
Targets: score >=85 · LCP <3s · TBT <200ms · CLS <=0.05 · no visual change · FB/TikTok pixels fire.

Diagnosis (done, do not redo): images fine (hero = preloaded 58KB WebP, total ~75KB).
LCP late because hero <img> exists only after React renders. Fix: static hero inside
#root that paints immediately; React root.innerHTML replace removes it seamlessly.

## BLOCKED 2026-08-13: Shopify MCP token expired mid-session (non-interactive, no OAuth).
Owner must re-authorize the Shopify connector (claude.ai connector settings), then a
follow-up session executes the steps below.

## Step 1 — pageUpdate gid://shopify/Page/117412692077
a. STEP 0 first: get-shop-info must say "Maison Croyez" / maisoncroyez.com. If not: switch-shop.
b. graphql_query the CURRENT page body. Diff against perf2/live-page-fd44.html extraction
   (bot capture) to confirm nothing moved since 2026-08-13.
c. New body = current body with BOTH edits:
   - Insert static pre-hero as FIRST child of <div id="root"> (markup: perf2/static-prehero.html).
     Hero gallery is the first element in #root, so position matches = no CLS.
   - Bump loader cache key fd44 -> fd45 (loader builds ?v=fd45-<UTCyyyymmddhh>).
d. pageUpdate with full new body. Nothing else changes.

## Step 2 — Lighthouse run 37 (post-deploy)
Restore drawer-recon.yml Lighthouse steps (disabled `if: false` during 36b capture):
`git show e8d0ea8:.github/workflows/drawer-recon.yml > .github/workflows/drawer-recon.yml`
then set comment line to "# run 37 — LP perf after static pre-hero (fd45)", change the
bot commit message to r37, push. Same URL + UTM params. Compare vs baseline above.
NOTE: run AFTER the fd45 hour boundary is safe — loader key is fd45-+UTC hour, CDN
files unchanged in step 1, so no propagation wait needed for the page body itself
(pages are not CDN-cached the same way; verify fd45 appears in the served HTML first).

## Step 3 — ONLY if score still <85: chunked render for TBT
src/app.js: App maps CONFIG.sectionOrder in one render. Render first ~3 sections
immediately; remainder after requestIdleCallback (setTimeout 200ms fallback).
Mirror EVERY edit into deploy-ready/mc-lp-free-diffuser-app.js (manual sync), commit,
then fileUpdate gid://shopify/GenericFile/29348024942701 with SHA-pinned
raw.githubusercontent.com originalSource. Wait ~20min propagation; key already fd45
(hourly rollover picks up new bytes; flip fd46 only if urgent).

## Step 4 — verify
- FB pixel: page-injected, delayed 1.2s after load — assert fbevents.js network request
  appears (Playwright). TikTok via Shopify web pixels, untouchable.
- CLS <=0.05; drawer title "Congrats, your order is reserved! ✓" must not regress
  (app bundle untouched in step 1).

## Step 5 — owner action
Remind owner: toggle OFF the Instant app embed (admin -> Themes -> Customize ->
App embeds -> Instant off). NOT done as of 2026-08-13.
Do NOT touch Klaviyo / Postscript / Subi / One-Click-Upsell.
