# diffuser-kits-2 — a working copy of the kits landing page (owner 2026-11-08: "Duplicate this landing page please, let's try to do some adjustments and see if we can deploy a new one")

A second Shopify page, /pages/diffuser-kits-2, byte-identical to the live /pages/diffuser-kits (dk13) at creation, with its
own Shopify Files so it can change without touching the ad page: mc-dk2-app.js + mc-dk2.css (copies of mc-dk-app.js /
mc-dk.css @ dk13-525274f), the shared mc-lp-vendor.js / mc-lp-diffuser-assets.js / fonts unchanged. Same cart wiring (kit
variants, the 04/10 Subi plans, the FREE DIFFUSERS BXGYs), same Meta pixel. The key in page-body.html names the commit the two
files were uploaded from.

Not on the theme's fast path: the speed-round-3 layout (lp-factory/theme-speed3) injects the scripts and hides the header only
for page.handle diffuser-kits / manifestation-ritual / living-room-bedroom-bundle, and API writes to the live theme are blocked,
so this handle runs on the page body's own loader (TH = false: the body adds mc-dk2.css + the three scripts itself). Same
function, a later first paint than the live page. Hidden from search engines with the seo.hidden metafield.

Build / deploy: edit mc-dk2-app.js / mc-dk2.css here (or patch them from a variant), commit, then fileUpdate the two GenericFiles
from raw.githubusercontent @ that commit, set the key in page-body.html and pageUpdate the page (body as a GraphQL variable).
QA: .github/workflows/qa-kits-2.yml and page-shot-2.yml (the kits workflows pointed at this page and this folder).
