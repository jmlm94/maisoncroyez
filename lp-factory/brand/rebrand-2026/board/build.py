#!/usr/bin/env python3
"""Assembles the brand board page: board.src.html + the logo symbol sheet + the line icons -> maison-brand-board.html.
Run from anywhere: python3 lp-factory/brand/rebrand-2026/board/build.py"""
import json, os, re, sys
D = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, 'board.src.html'), encoding='utf-8').read()
meta = json.load(open(os.path.join(D, 'logo', 'meta.json')))
sym = open(os.path.join(D, 'logo', 'symbols.html'), encoding='utf-8').read()
LOGO = {'two': 'mc-two', 'm': 'mc-m'}
def logo(m):
    k = LOGO[m.group(1)]; vb = meta[k].get('vb') or f"0 0 {meta[k]['w']} {meta[k]['h']}"
    return (f'<svg class="lg" viewBox="{vb}" fill-rule="evenodd" role="img" aria-label="Maison Croyez">'
            f'<use href="#{k}"/></svg>')
def icon(m):
    raw = open(os.path.join(D, 'icons', m.group(1) + '.svg'), encoding='utf-8').read()
    body = re.search(r'<svg[^>]*>(.*)</svg>', raw, re.S).group(1)
    body = re.sub(r'\s+', ' ', body).strip().replace(' />', '/>')
    return ('<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{body}</svg>')
out = src.replace('<!--SYMBOLS-->', sym)
out = re.sub(r'\{\{logo:([a-z-]+)\}\}', logo, out)
out = re.sub(r'\{\{i:([a-z0-9-]+)\}\}', icon, out)
left = re.findall(r'\{\{[^}]+\}\}', out)
if left: sys.exit('unresolved placeholders: ' + ', '.join(sorted(set(left))))
open(os.path.join(D, 'maison-brand-board.html'), 'w', encoding='utf-8').write(out)
print('built', len(out), 'bytes')
