# diffuser-kits-2 — a working copy of the kits landing page (owner 2026-11-08: "Duplicate this landing page please, let's try to do some adjustments and see if we can deploy a new one")

A second Shopify page, /pages/diffuser-kits-2, byte-identical to the live /pages/diffuser-kits (dk13) at creation, with its
own Shopify Files so it can change without touching the ad page: mc-dk2-app.js + mc-dk2.css (copies of mc-dk-app.js /
mc-dk.css @ dk13-525274f), the shared mc-lp-vendor.js / mc-lp-diffuser-assets.js / fonts unchanged. Same cart wiring (kit
variants, the 04/10 Subi plans, the FREE DIFFUSERS BXGYs), same Meta pixel. The key in page-body.html names the commit the two
files were uploaded from.

Created 2026-11-08 16:11 UTC through the connector (store confirmed Maison Croyez): fileCreate mc-dk2-app.js = GenericFile
46750702370925 (138,466 B) and mc-dk2.css = GenericFile 46750702403693 (158,443 B) from raw @ bd9ca46, both READY; pageCreate
"Diffuser Kits 2 — Maison Croyez" = Page 163782164589, handle diffuser-kits-2, published, no template suffix, metafield seo.hidden = 1,
body = page-body.html @ key dk2a-bd9ca46 (sent as a GraphQL variable; Shopify re-serialises the markup with extra newlines, so the
page-shot body check compares ignoring newlines). URL: https://maisoncroyez.com/pages/diffuser-kits-2

Not on the theme's fast path: the speed-round-3 layout (lp-factory/theme-speed3) injects the scripts and hides the header only
for page.handle diffuser-kits / manifestation-ritual / living-room-bedroom-bundle, and API writes to the live theme are blocked,
so this handle runs on the page body's own loader (TH = false: the body adds mc-dk2.css + the three scripts itself). Same
function, a later first paint than the live page. Hidden from search engines with the seo.hidden metafield.

Build / deploy: edit mc-dk2-app.js / mc-dk2.css here (or patch them from a variant), commit, then fileUpdate the two GenericFiles
from raw.githubusercontent @ that commit, set the key in page-body.html and pageUpdate the page (body as a GraphQL variable).
QA: .github/workflows/qa-kits-2.yml and page-shot-2.yml (the kits workflows pointed at this page and this folder).

## k2 (2026-11-08, owner): one page — paid diffusers, scents by quantity, Subscribe = 25% off refills (key dk2b-3deef01, live 17:18 UTC)
Owner: "1. Everything in one page, diffusers then scents then final checkout. 2. Offer changes: 1 Diffuser $89.95 / 2 Diffusers
$129.95 / 3 Diffusers $189.95, then 1 Scent $39.95 each / 2 Scents $29.95 each / 3 Scents $24.95 each, then Subscribe and get 25%
OFF on next refill / One time payment. For the scents: above the boldness, the main smell of each … SWEET & CITRIC, VANILLA …
Each scent lasts 15+ days."
- Page (mc-dk2-app.js, BuyBox rebuilt; mc-dk2.css k2 block): Step 1 diffusers (1 / 2 / 3, price, struck value + "Save $X", picture,
  coverage line; 2 preselected), Step 2 scents (quantity strip 1 / 2 / 3+ with the active tier highlighted, "Each scent lasts 15+
  days.", the three badges + IFRA, the seven tiles with a smell label above the strength — Honey floral / Fresh citrus / Lavender /
  Milk & honey / Peach & tea / Pine forest / Floral musk — up to 7 bottles), Step 3 refills (Subscribe: 25% off every refill, "$X/scent
  today, $Y on every refill", 30 / 60 / 90 | One-time payment), then the summary (diffusers with the struck value, scents at the
  quantity price with the $39.95 struck, value line, Due today "N diffusers $A + K scents × $B", the Subscribe / one-time sentence)
  and "CHECKOUT · $X ➔" (disabled until one scent). The sticky bar: "BUILD MY KIT ➔" (scrolls) or "CHECKOUT · $X ➔". The store's
  "100% ON US" announcement bar is hidden on this page by the app (the theme is untouched). The pre-hero pill in page-body.html says
  "BUILD YOUR KIT & SAVE UP TO $80".
- Checkout (k2AddToCart): the diffuser variant + the scents (with the plan or one-time) in one /cart/add.js (the channel pixel fires
  AddToCart per line), 800 ms, then straight to the checkout; from two scents through /discount/2SCENTS|3SCENTS?redirect=/checkout.
  Lines this page or the ad page own (the k2 variants, the old kit variants, the seven scents) are removed first. No cart drawer.
- Shopify (connector, store confirmed Maison Croyez before each write): product 15430881673325 "Maison Croyez Home Diffuser"
  (handle home-diffuser-kits-2, UNLISTED, published to the Online Store 22952280173, the three kit pictures) with variants
  67973611290733 1 Diffuser $89.95 · 67973611323501 2 Diffusers $129.95 (compare-at $179.90) · 67973611356269 3 Diffusers $189.95
  (compare-at $269.85), SKU MC-DIFFUSER, not tracked, CONTINUE — the ad page's kit product 8277082341485 and its BXGYs are untouched
  (its BXGY customerGets target that product's variants only). Discount codes 2SCENTS (DiscountCodeNode 1544173092973: $10 off
  each of the 7 scent variants, minimum 2 items) and 3SCENTS (1544173191277: $15 off each, minimum 3), subscription + one-time,
  every billing cycle, combine with product / order / shipping discounts; page-applied, so product pages and the ad page keep their
  pricing (a product-page visitor who types the code gets it too).
- Pending (owner, Subi): a new selling-plan group for this offer with 30 / 60 / 90-day plans at 0% off today and 25% off every
  renewal, on the 7 scents; then K2.plans = { 30, 60, 90 } ids (read them with sellingPlanGroups) and the test note disappears.
  Until then Subscribe rides the 04/10 plans (7883817069 / 7883849837 / 7883882605), which also take $10 off today, so the
  checkout shows $19.95 / $14.95 per scent on the subscribe path instead of the page's $29.95 / $24.95 (the page says so in an
  orange test note). Renewals with the codes: 25% off the quantity price (3 scents → $18.71 each) if the code carries into the
  contract; to confirm with one real subscribe order once the group exists.
- Deploy 17:1x UTC: fileUpdate 46750702370925 (135,488 B) + 46750702403693 (160,806 B) from raw @ 3deef01, READY; pageUpdate
  163782164589 with the dk2b-3deef01 body (17:18:48Z). QA: qa-kits-2.yml rewritten for the one-page flow (two real checkouts:
  one-time 2 diffusers + 3 scents = $204.80 with 3SCENTS; Subscribe 1 diffuser + 2 scents = $129.85 with 2SCENTS + the plan's $10),
  page-shot-2 (body check; the drawer cart check is off).
