# Kit Builder — /pages/build-your-kit (LIVE)

- Page: gid://shopify/Page/118616064109, handle `build-your-kit`, loader key `kb3-`+UTC-hour
- Perf (kb3): images served as individual CDN files (mc-kb-*.jpg/png, pre-sized), frag/testimonial images lazy-loaded,
  desktop side photo desktop-only; critical JS+CSS ~37KB (was 647KB). mc-kit-assets.js retired (file remains on CDN, unused).
- Files (GenericFile GIDs, URLs stable, ?v bumps on fileUpdate):
  - mc-kit-app.js     gid://shopify/GenericFile/29641921167469
  - mc-kit-assets.js  gid://shopify/GenericFile/29641921200237
  - mc-kit.css        gid://shopify/GenericFile/29641921233005
- Offer: Circle-only. Scents $39.95/mo on Subi plan 2627895405 ("Delivered every 30 days ✨").
  Diffuser variant 45450822778989 ($79.95) × N added one line, zeroed by Subi automation.
- Rooms → diffusers: Living Room=1, +Bedroom=2, +Kitchen=3 (default 3). Scent count must equal N.
- ATC: POST /cart/add.js {items:[{scent,qty,selling_plan},...,{diffuser,qty:N}]} → redirect /checkout (no drawer).
- Rebuild: edit src/make-kit-mock.py (single source of truth) → python3 deploy-ready/build-kit.py →
  upload changed files (stagedUploadsCreate→curl→fileUpdate on GIDs) → bump loader key kb1→kb2 via pageUpdate.
- Rollback: unpublish page 118616064109 (pageUpdate isPublished:false).
