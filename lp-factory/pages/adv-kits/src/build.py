#!/usr/bin/env python3
"""Builds the advertorial artifact: page.html + img.json (run images.py first) -> the scratchpad HTML that gets published."""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "candle-swap.html")
img = json.load(open(os.path.join(HERE, "img.json")))
img["kits_css"] = open(os.path.join(HERE, "kits-buybox.css"), encoding="utf-8").read()  # the kits page buy-box styles (kitscss/extract.py)
s = open(os.path.join(HERE, "page.html"), encoding="utf-8").read()
keys = set(re.findall(r"\{\{(\w+)\}\}", s))
missing = keys - set(img)
assert not missing, missing
for k in keys: s = s.replace("{{%s}}" % k, img[k])
if os.environ.get("ONETIME"):  # pricing test copy: the builder offers one-time (diffusers $49.95 each) next to the subscription
    assert s.count("var ONETIME = false,") == 1
    s = s.replace("var ONETIME = false,", "var ONETIME = true,").replace("<title>The Candle Swap</title>", "<title>Candle Swap One-Time Test</title>")
open(OUT, "w", encoding="utf-8").write(s)
print(OUT, len(s) // 1024, "KB")
