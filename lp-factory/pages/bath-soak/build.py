#!/usr/bin/env python3
"""Assembles the bath soak PDP preview: pdp.src.html + the logo symbol + line icons -> bath-soak-pdp.html (artifact only)."""
import json, os, re, sys
D = os.path.dirname(os.path.abspath(__file__))
LOGO = os.path.join(D, '..', '..', 'brand', 'rebrand-2026', 'board', 'logo')
src = open(os.path.join(D, 'pdp.src.html'), encoding='utf-8').read()
meta = json.load(open(os.path.join(LOGO, 'meta.json')))
sym = open(os.path.join(LOGO, 'symbols.html'), encoding='utf-8').read()
def logo(m):
    k = {'two': 'mc-two', 'm': 'mc-m'}[m.group(1)]; vb = meta[k].get('vb') or f"0 0 {meta[k]['w']} {meta[k]['h']}"
    return f'<svg class="lg" viewBox="{vb}" fill-rule="evenodd" role="img" aria-label="Maison Croyez"><use href="#{k}"/></svg>'
def icon(m):
    raw = open(os.path.join(D, 'icons', m.group(1) + '.svg'), encoding='utf-8').read()
    body = re.sub(r'\s+', ' ', re.search(r'<svg[^>]*>(.*)</svg>', raw, re.S).group(1)).strip().replace(' />', '/>')
    return f'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{body}</svg>'
out = src.replace('<!--SYMBOLS-->', sym)
out = re.sub(r'\{\{logo:([a-z-]+)\}\}', logo, out)
out = re.sub(r'\{\{i:([a-z0-9-]+)\}\}', icon, out)
left = re.findall(r'\{\{[^}]+\}\}', out)
if left: sys.exit('unresolved placeholders: ' + ', '.join(sorted(set(left))))
open(os.path.join(D, 'bath-soak-pdp.html'), 'w', encoding='utf-8').write(out)
print('built', len(out), 'bytes')
