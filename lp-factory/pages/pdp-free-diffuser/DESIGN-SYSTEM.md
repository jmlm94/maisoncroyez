# Maison Croyez — PDP Design System (free-diffuser / Manifestation Circle)

Exact, verified values extracted from the shipped page (`src/styles.css` + `src/app.js`, live on
`/pages/free-diffuser` and the sales half of `/pages/the-scent-story`). Use this to replicate the
design on any other page. Last synced: 2026-08-05 (fd31 deploy).

---

## 1. Color palette

### Core tokens (CSS custom properties, copy as-is)
```css
:root{
  --blush:#ECDFDE;          /* section tint bands, CTA breaks */
  --blush-soft:#F3EAE8;     /* chips, selected plan card fill */
  --rosewood:#C4A59F;       /* mid accent */
  --rosewood-deep:#8A5B52;  /* eyebrows, small labels, focus rings */
  --rosewood-tint:#E7D6D2;  /* hairline borders, inactive dots */
  --cream:#F9F5F0;          /* alt background */
  --ivory:#FFFFFF;          /* page base */
  --cta:#0A9400;            /* THE conversion green — every buy button */
  --ink:#241C18;            /* primary text, near-black warm */
  --ink-soft:#5C4F48;       /* secondary text, strikethrough prices */
  --footer:#1E1613;         /* footer ground */
  --gold:#D9B08C;           /* soft gold accent */
  --star:#F5B301;           /* review stars, always this yellow */
}
```

### Secondary fixed colors (used outside the token block)
| Use | Hex |
|---|---|
| Plan-card badge + plan bullet dots ("MOST POPULAR" gold) | `#A67C3D` |
| Cart-drawer black CTA (Secure Checkout) | `#111111` |
| Drawer free-shipping ribbon bg / text | `#E4F0E4` / `#1C5E1C` |
| Drawer "FREE" price flag | `#0A9400` |
| Drawer card hairlines | `#EFE7DD` |
| Drawer muted text / attribution | `#6E5B4F` |
| Drawer trust-badge caps text | `#8A6F5C` |
| Drawer ✕ remove (idle → hover) | `#B9AA9C` → `#6E5B4F` |
| Drawer testimonial stars | `#E8B23A` |

### Gradients
```css
--grad-em:    linear-gradient(92deg,#7C3AED 0%,#C0589B 48%,#F59E0B 100%);  /* signature: italic emphasis words, bullet dots, stat bars */
--grad-hero:  linear-gradient(168deg,#F3E7E3 0%,#ECDFDE 34%,#E6CDBB 72%,#DCB99F 100%);
--grad-values:linear-gradient(160deg,#F6ECE6 0%,#ECDFDE 45%,#E9D3BE 100%); /* feature bands */
--grad-badge: linear-gradient(145deg,#D9A98F 0%,#C4A59F 55%,#E3C1A4 100%); /* guarantee badge */
--grad-cta:   linear-gradient(135deg,#8A5B52 0%,#3A2721 90%);
```
Bright variant of `--grad-em` for dark grounds: `#C9A9F9 → #F2A9CB → #FFC46B`.
Gradient-text recipe: `background:var(--grad-em); -webkit-background-clip:text; background-clip:text; color:transparent;`

---

## 2. Typography

Three families, embedded as subset woff2 (already on the store CDN, `?v=1784231284`):
`mc-lp-f-unna-700.woff2` · `mc-lp-f-unna-700i.woff2` · `mc-lp-f-bvp-400.woff2` · `mc-lp-f-outfit-700.woff2`

| Role | Family | Rules |
|---|---|---|
| Headlines (h1–h3) | **Unna 700** serif | `line-height:.92; letter-spacing:-.05em; text-wrap:balance`. One *italic* emphasis phrase per headline (Unna 700 italic, often gradient-clipped). Every main headline ends with `.` `:` or `?` |
| Eyebrows / CTAs / labels / badges | **Outfit 700** | ALL-CAPS, wide tracking `.09em–.2em`, tiny sizes `.55rem–.7rem` for labels |
| Body | **Be Vietnam Pro 400/600** | `line-height:1.5–1.6`; bold+italic (`<strong>` styled italic) for impact words inside bullets |

Key sizes (mobile → desktop):
- Hero price: `2.2rem → 3rem` Unna 700
- Section headline: `clamp(1.4rem, 5.4vw, 1.9rem)` and up
- Offer bullets: `.94rem → 1.06rem` body
- Plan card name/price: `1rem` / `.98rem` Outfit 700/800
- Micro-labels (badges, tags): `.55–.66rem` Outfit caps

---

## 3. Shape, depth, spacing
```css
--radius:22px;                              /* images, cards, big surfaces */
--shadow:0 10px 34px rgba(60,38,30,.12);    /* standard card lift */
--maxw:1080px;                              /* content column; .wrap pads 20px */
```
- Pills everywhere: buttons and badges use `border-radius:999px`; plan cards `14px`.
- Card borders: `1.5px solid rgba(36,28,24,.16)`; selected state = ink border + `inset 0 0 0 1px var(--ink)` + `--blush-soft` fill.
- Section rhythm: 48px+ vertical padding on tinted bands (`.ctabreak.tinted`).

---

## 4. Buttons

### Primary (the green ATC — used for every buy action)
```css
.btn{
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
  width:100%;padding:17px 26px;border-radius:999px;
  background:var(--cta);color:#FFF;
  font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  font-size:.86rem;box-shadow:0 12px 28px rgba(0,0,0,.28);
}
.btn:hover{transform:translateY(-1px);box-shadow:0 16px 34px rgba(0,0,0,.36)}
```
- Label pattern: `CLAIM MY FREE DIFFUSER · $49.95 ➔` — always ends with ` ➔`.
- Second line inside the button (smaller): variant/offer recap.
- Secondary button: transparent, `1.5px solid var(--ink)`, ink text, no shadow.
- Cart-drawer checkout button: same pill but **black `#111`**, label `SECURE CHECKOUT ➔`.

---

## 5. Component recipes (as shipped)

- **Eyebrow**: Outfit 700 caps, `.7rem`, `letter-spacing:.2em`, color `--rosewood-deep`, above every headline.
- **Price row**: Unna price + struck compare (`--ink-soft`, Be Vietnam 600) + tiny caps "today" label in `--rosewood-deep`; baseline-aligned flex, 8px gaps around.
- **Offer bullets**: emoji prefix + body text; impact words `<strong>` (rendered **bold italic**); gap 9px; no list markers on mobile buybox.
- **Plan cards** (subscription vs one-time): white card, 14px radius; floating gold badge `#A67C3D` top-left (`MOST POPULAR`-style, Outfit .56rem caps); bullets with 5px gold dots; selected = ink outline + blush-soft fill.
- **Scent picker (`.pick`)**: bordered rows/cards, per-scent pastel gradients defined in `app.js` (`fragrances[].grad`), emoji note chips.
- **Timeline ("Joining the Manifestation Circle? You need to know this:")**: label column Outfit caps + body rows, hairline separators `--rosewood-tint`.
- **Benefits grid**: 2-col mobile / 4-col ≥900px; 44px emoji in gradient-badge circle, Be Vietnam 600 `1.05rem` caption.
- **FAQ accordion (`.acc.faq`)**: transparent bg, hairline dividers, Outfit caps question rows.
- **Testimonial card** (drawer + page): white card, `1px solid #EFE7DD`, radius 12px; star row `#E8B23A` + `VERIFIED CIRCLE MEMBER` pill (`#E4F0E4`/`#1C5E1C`, .55rem caps); italic quote; `— Name` in `#6E5B4F` 700.
- **Urgency line**: `Only <b>19</b> free diffusers left. Yours is reserved at checkout.` — .72rem.
- **Trust badges row**: 3 items, emoji over two-line Outfit caps `.56rem`, color `#8A6F5C`, top hairline `#EFE7DD`.
- **Free-shipping ribbon**: full-width tint bar `#E4F0E4`, text `#1C5E1C` Outfit 700 `.72rem` caps: `FREE SHIPPING UNLOCKED — SHIPS IN 24H 🕝`.

---

## 6. Imagery & icon rules
- All content images **square 1:1**, radius `--radius` (22px).
- Icons = native emoji only. No SVG icon sets.
- Photography: warm cream interiors, wood + boucle textures, golden lamp light (see `mc-lp-intentions-v2.jpg` for the reference grade).

---

## 7. Voice (one paragraph)
Elegant, warm, intimate — a woman speaking about the home she's building. Manifestation journal meets
boutique hotel. Short sentences, sensory verbs, assured not loud. Bold-italic only the phrases that carry
money or feeling ("**fills up to 600 sq ft for over 45 days**").

---

## 8. Platform gotchas (hard-won)
- Never `overflow-x:hidden` on body — use `overflow-x:clip` (iOS Safari breaks `position:fixed` otherwise).
- All page CSS selectors are `#root`-prefixed at build time so the theme's `.prose` can't override.
- Reserve `min-height` on `#root`/`#advroot` in the page body CSS or the theme footer flashes → CLS.
- Page-body loader versions bundles with `'<key>-'+UTC-hour` → CDN self-heals hourly; flip the key to force-refresh.
- Fonts: preload the 4 woff2 subsets (see §2) with `crossorigin`.

## 9. Where the truth lives
- `src/styles.css` — every rule above, in context (1,278 lines).
- `src/app.js` — CONFIG: copy, gallery, scents + per-scent gradients, offer wiring, cart-drawer injector (rounds 23–27).
- `../../brand-kit.md` — store-wide kit (older pages); this file supersedes it for the free-diffuser design language.
