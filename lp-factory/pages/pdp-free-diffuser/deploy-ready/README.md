# Deploy-ready bundle (round 11 — postcard gold palette)
Generated from src/ 2026-07-15. PENDING UPLOAD, blocked by Shopify connector approval issue.

To deploy (any session with working Shopify MCP):
1. stagedUploadsCreate for mc-lp-free-diffuser.css (resource FILE, mime text/css)
   — app.js here is ALREADY LIVE (rounds ≤9); only the CSS changed in rounds 10-11.
2. curl multipart POST to the staged target (sandbox egress allows shopify-staged-uploads.storage.googleapis.com)
3. fileUpdate gid://shopify/GenericFile/29348024909933 (css) — keeps URL, bumps ?v
4. Wait ~20 min origin propagation, then pageUpdate gid://shopify/Page/117412692077
   bumping loader key 'fd4-'+hour (or rely on hourly rollover)
5. Trigger verify-lp.yml (run 29) by pushing an edit to it
