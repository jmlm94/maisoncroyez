#!/usr/bin/env python3
"""Build page-body.html for /pages/supply from live.json ({"key","hero","variants":{"m6","m9","m12","m18"}}).

The body follows the kits page-body pattern (theme overrides on line 1, preloads, the third-party hold script, the loader
with the cache key) minus the pre-hero: the supply hero is a landscape picture rendered by the app from window.MC_SUPPLY.hero
(preloaded here). window.MC_SUPPLY also carries the variant ids, so a new SKU never needs a new app file, only a page update.
usage: python3 body.py   → page-body.html (and prints its size)"""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
KITS = os.path.join(HERE, "..", "diffuser-kits", "page-body.html")
cfg = json.load(open(os.path.join(HERE, "live.json")))
assert cfg["key"] and cfg["hero"] and all(cfg["variants"].get(k) for k in ("m6", "m9", "m12", "m18")), cfg
kits = open(KITS, encoding="utf-8").read()
style = kits.split("\n")[0]
assert style.startswith("<style>") and style.endswith("</style>")
m = re.search(r"<script>\n\(function\(\)\{if\(window\.__MC_TP__\).*?</script>", kits, re.S); assert m
tp = m.group(0)
fonts = "\n".join(l for l in kits.split("\n") if l.startswith('<link rel="preload" as="font"'))
assert fonts.count("\n") == 3
B = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/"
k = cfg["key"]
supply = json.dumps({"variants": {kk: int(v) for kk, v in cfg["variants"].items()}, "hero": cfg["hero"], "checkoutUrl": "/checkout"}, separators=(",", ":"))
body = f"""{style}
<link rel="preload" as="style" href="{B}mc-sp.css?v={k}">
<link rel="preload" as="script" fetchpriority="high" href="{B}mc-lp-vendor.js?v={k}">
<link rel="preload" as="script" href="{B}mc-lp-diffuser-assets.js?v={k}">
<link rel="preload" as="script" href="{B}mc-sp-app.js?v={k}">
<link rel="preload" as="image" fetchpriority="high" href="{cfg['hero']}">
{fonts}
{tp}
<script>window.MC_SUPPLY={supply};</script>
<div id="root"></div>
<script>
(function(){{if(window.__MC_FD_LOADER__)return;window.__MC_FD_LOADER__=1;
var v='{k}'; /* supply page: the theme's header, announcement bar and footer show around the page; the app renders no header of its own */
var B='{B}';
var l=document.createElement('link');l.rel='stylesheet';l.href=B+'mc-sp.css?v='+v;
document.head.appendChild(l);
var add=function(){{['mc-lp-vendor.js','mc-lp-diffuser-assets.js','mc-sp-app.js'].forEach(function(f){{
var s=document.createElement('script');s.src=B+f+'?v='+v;s.async=false;document.body.appendChild(s);}});}};
var fired=false;var go=function(){{if(!fired){{fired=true;add();}}}};
if(window.requestAnimationFrame){{requestAnimationFrame(function(){{requestAnimationFrame(go);}});setTimeout(go,250);}}
else{{setTimeout(go,0);}}}})();
</script>
<!-- /mc-supply -->"""
open(os.path.join(HERE, "page-body.html"), "w", encoding="utf-8").write(body)
print("page-body.html", len(body.encode()), "key", k)
