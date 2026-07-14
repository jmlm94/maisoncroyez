#!/usr/bin/env python3
"""Inline image assets as data URIs into the email preview HTML."""
import base64, pathlib, re, sys

ASSETS = pathlib.Path(__file__).resolve().parent.parent / "lpfactory/lp-factory/assets/processed"
SRC = pathlib.Path(__file__).resolve().parent / "welcome-01.src.html"
OUT = pathlib.Path(__file__).resolve().parent / "mc-email-design-preview.html"

html = SRC.read_text()

def datauri(name: str) -> str:
    p = ASSETS / name
    mime = "image/png" if name.endswith(".png") else "image/jpeg"
    return f"data:{mime};base64,{base64.b64encode(p.read_bytes()).decode()}"

for m in set(re.findall(r'@@([\w.\-]+)@@', html)):
    html = html.replace(f"@@{m}@@", datauri(m))

OUT.write_text(html)
print(f"wrote {OUT} ({OUT.stat().st_size//1024} KB)")
