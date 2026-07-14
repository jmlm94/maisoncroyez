# Maison Croyez — Klaviyo Flow Email Redesign · HANDOFF

Continuation doc for a fresh Claude session. Read this first, then `lpfactory.zip → lp-factory/brand-kit.md` (design tokens, voice, verified facts, honesty gates).

## The task
Redesign every email in the Klaviyo flows using the landing-page design system, keeping each email's **existing copy** but swapping the promoted offer to the new one.

## The offer (owner-confirmed, 2026-07-14)
- **Free diffuser when customers get their first 3 scents.**
- Mechanics: **auto-added at checkout** — no discount code. Emails just drive clicks.
- Offer landing page + design source of truth: `https://maisoncroyez.com/pages/free-diffuser`
  (unreadable from the previous session — network policy blocked the domain; read it via Shopify MCP `graphql_query` on Page, or WebFetch if the new session's policy allows).
- **All CTA buttons → `https://maisoncroyez.com/pages/free-diffuser`** (owner chose: every CTA, including abandoned-cart ones).

## Owner decisions (asked & answered)
1. Offer mechanics: auto-added at checkout (no code).
2. Scope: offer goes in **all pre-purchase flows** (welcome, abandoned checkout/cart, browse abandonment). Post-purchase/winback: redesign too, offer only where sensible.
3. Process: **HTML previews first**, flow by flow, owner approves → then push to Klaviyo as templates.
4. Same copy as existing emails; only offer messaging, design, and button URLs change.

## Done so far
- `welcome-01.src.html` — approved-pending design-direction sample (Welcome #1) in the LP design language. `@@filename@@` markers are image slots.
- `build_preview.py` — inlines images from `lp-factory/assets/processed/` (unzip `lpfactory.zip` to a scratch dir; adjust `ASSETS` path) as data URIs → `mc-email-design-preview.html` (preview only; production emails need CDN-hosted images, e.g. Klaviyo image upload or the Shopify CDN rail in brand-kit.md).
- Sample delivered to owner 2026-07-14; no design-change feedback yet.

## Design system → email adaptations (keep these)
- 600px canvas. Sections: announce bar (grad-cta) → logo header → hero (grad-hero, stars + "Loved by 2,500+ women across the U.S." microproof, Unna headline with ONE italic gradient em word, ends in `.`/`:`/`?`) → offer block (cream, includes-card, FREE chip on image) → scent trio w/ intentions → 90-day guarantee badge (grad-badge circle) → final CTA break (gradient pill) → dark footer (#1E1613, italic Unna tagline, address + unsubscribe).
- CTAs: black pill, Outfit caps, label ends `➔`, sub-label line under. Exactly ONE gradient (grad-em) CTA per email — the closer.
- Fonts via Google Fonts import with fallbacks (Unna→Georgia, Outfit→Arial, Be Vietnam Pro→Helvetica). Gradient text has solid fallback `#C0589B` via `@supports`.
- Emoji icons only, images square 1:1, honesty gates from brand-kit.md apply (no invented stats/urgency).

## Next steps (in order)
1. Fresh session with Klaviyo + Shopify connectors live: `get_flows` → for each flow `get_flow_action`/`get_flow_message` + `get_email_template` to extract every email's current copy + subject/preheader.
2. Read `/pages/free-diffuser` (Shopify MCP) — confirm design details and the diffuser's stated value.
3. Confirm with owner: the "FREE · $89 VALUE" chip (inferred from Studio kit $89.95 — replace with the value the offer page states).
4. Produce per-email previews (existing copy + new offer), owner approves per flow.
5. Push approved emails to Klaviyo: `create_email_template` → `render_email_template` to verify; images uploaded first (`upload_image_from_url` from Shopify CDN).
6. Old promo line "Free 100ml fragrance for every diffuser" is DEAD — replace everywhere with the new offer.
