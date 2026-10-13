# Theme speed round 3 (2026-10-13)

**LIVE since 2026-10-13 21:20 UTC** — the owner published theme 187241169005; the previous live theme
186692370541 "MaisonCroyez — Instant removed (Claude)" is still in the library for a one-click rollback.
Live checks (STATUS.md entry "speed round 3"): kits / ritual / bundle page-shot green, qa-cart 23/23, the hero is
the first paint on all three pages (fast phone LCP 459 ms, 4x CPU 633 ms), homepage unchanged apart from the two
site-wide font tweaks.

Owner request: fix the PageSpeed Insights findings on /pages/diffuser-kits (font-display 150 ms, render-blocking
requests 280 ms, LCP element render delay 2.5 s, "more than 4 preconnect" warning).

Two theme files change. `original/` is the live theme's version (layout/theme.liquid reproduced from the Admin API,
byte-identical in every rendered part; snippets/css-variables.liquid md5-identical), `edited/` is what was uploaded
to the duplicate theme **187241169005 "MaisonCroyez — Speed round 3 (Claude)"** (API writes to the LIVE theme are
blocked, so the owner publishes the duplicate from Online Store → Themes).

## snippets/css-variables.liquid
`font_face: font_display: 'fallback'` → `'swap'` (6 declarations). Text renders in the fallback font while
Nunito Sans loads instead of staying invisible; passes the PSI font-display insight. Site-wide.

## layout/theme.liquid
1. `<link rel="preconnect" href="https://fonts.shopifycdn.com">` removed — the fonts are served from
   maisoncroyez.com/cdn/fonts, Lighthouse flagged the connection as unused. Site-wide.
2. On the three landing pages only (`page.handle` = diffuser-kits / manifestation-ritual /
   living-room-bedroom-bundle):
   - `theme.css` is loaded through `preload_tag` (keeps the Link header hint) + a `media="print"` stylesheet
     whose onload flips it to `all`, adds `html.mc-tcss` and dispatches `mc:tcss`. Nothing render-blocking is left
     in the theme head; the page body's own hero (`#mc-prehero`) is the first paint.
   - A head `<style>` hides the theme header group outright (the pages render their own header) and hides the
     overlay group (cart drawer), footer group, skip link and cart-notification-drawer until `html.mc-tcss`,
     so nothing unstyled flashes.
   - An inline script sets `window.__MC_FD_LOADER__ = 1` (the page body's loader exits on that flag) and mounts
     the page app itself once theme.css has applied: it reads the body's `<link rel="preload">` entries for
     `/files/mc-*` (as=style → stylesheet, as=script → scripts in order, async=false). 4 s fallback if the
     stylesheet onload never fires. The three page bodies are unchanged.
   Every other page keeps `stylesheet_tag: preload: true` exactly as before.

## Verified on the preview theme (kits page, ?preview_theme_id=187241169005)
- page-shot 20261013T2100 (`lp-factory/pages/diffuser-kits/shots-preview/`): key dk7-14579ac, buy box mounted on
  phone / small / desktop, theme header `display:none`, 0 JS errors, cart drawer opens, every-30-days $129.95
  with the scent at $0.00, one-time $129.95 with the free-scent BXGY.
- fetch-html `lp-factory/assets/live/diffuser-kits-preview.*`: at 4x CPU the first paint IS the hero
  (FCP = LCP = 988 ms; before: FCP 439 ms was the theme header, hidden again 600 ms later, LCP 1029 ms) and the
  app mounted at 1.66 s (before 2.02 s).
- lh-live 20261013T2103Z (`lp-factory/pages/diffuser-kits/perf-preview/`) vs the 17:41 baseline: render-blocking
  list empty (was theme.css 300–920 ms), font-display passes, preconnect warning down to shop.app (Shopify's own),
  mobile FCP 2.2–2.6 s / LCP 3.5–5.0 s (baseline 2.0–3.9 / 4.5–8.1 s; preview run 1 hit a 9.6 s cold TTFB),
  desktop 96–98 both. The lab LCP stays around 4–5 s because Lighthouse charges the theme's and Shopify's early
  scripts to it; in a real browser the LCP is the first paint.

## Rollback
Republish the previous theme (186692370541 "MaisonCroyez — Instant removed (Claude)"), or paste `original/` back
over the two files.
