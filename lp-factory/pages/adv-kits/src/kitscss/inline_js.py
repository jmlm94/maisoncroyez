#!/usr/bin/env python3
"""Pastes kitscss/kb.js (plus the kits page's floor plans and icons, kitscss/icons.json) into page.html's second <script>."""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
PAGE = os.path.join(HERE, "..", "page.html")
P = json.load(open(os.path.join(HERE, "icons.json")))
js = open(os.path.join(HERE, "kb.js"), encoding="utf-8").read().strip()
js = js.replace("/*PLANS*/{}", json.dumps(P["PLANS"], ensure_ascii=False)).replace("/*RIC*/{}", json.dumps(P["ROOM_IC"], ensure_ascii=False))
js = js.replace("/*IC*/{}", json.dumps({k: P["MCI"][k] for k in ("truck", "shield", "lifetime", "up")}, ensure_ascii=False))
s = open(PAGE, encoding="utf-8").read()
a = s.rindex("<script>"); b = s.index("</script>", a) + len("</script>")
s = s[:a] + "<script>\n" + js + "\n</script>" + s[b:]
open(PAGE, "w", encoding="utf-8").write(s)
print("page.html builder script updated", len(js))
