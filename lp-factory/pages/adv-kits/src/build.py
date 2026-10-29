#!/usr/bin/env python3
"""Builds the advertorial artifact: page.html + img.json (run images.py first) -> the scratchpad HTML that gets published."""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "candle-swap.html")
img = json.load(open(os.path.join(HERE, "img.json")))
s = open(os.path.join(HERE, "page.html"), encoding="utf-8").read()
keys = set(re.findall(r"\{\{(\w+)\}\}", s))
missing = keys - set(img)
assert not missing, missing
for k in keys: s = s.replace("{{%s}}" % k, img[k])
open(OUT, "w", encoding="utf-8").write(s)
print(OUT, len(s) // 1024, "KB")
