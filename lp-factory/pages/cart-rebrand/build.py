#!/usr/bin/env python3
"""Assembles the cart drawer proposal in the new brand: cart.src.html + the logo symbol + line icons + small pictures
-> cart-drawer.html (artifact only; nothing on the store). Pictures are inlined so the page is one file."""
import base64, json, os, re, sys
D = os.path.dirname(os.path.abspath(__file__))
LOGO = os.path.join(D, '..', '..', 'brand', 'rebrand-2026', 'board', 'logo')
ICONS = [os.path.join(D, 'icons'), os.path.join(D, '..', 'diffuser-kits-rebrand', 'icons')]
src = open(os.path.join(D, 'cart.src.html'), encoding='utf-8').read()
meta = json.load(open(os.path.join(LOGO, 'meta.json')))
sym = open(os.path.join(LOGO, 'symbols.html'), encoding='utf-8').read()
def logo(m):
    k = {'two': 'mc-two', 'm': 'mc-m'}[m.group(1)]; vb = meta[k].get('vb') or f"0 0 {meta[k]['w']} {meta[k]['h']}"
    return f'<svg class="lg" viewBox="{vb}" fill-rule="evenodd" role="img" aria-label="Maison Croyez"><use href="#{k}"/></svg>'
def icon_svg(name):
    for d in ICONS:
        p = os.path.join(d, name + '.svg')
        if os.path.exists(p):
            raw = open(p, encoding='utf-8').read()
            body = re.sub(r'\s+', ' ', re.search(r'<svg[^>]*>(.*)</svg>', raw, re.S).group(1)).strip().replace(' />', '/>')
            return f'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{body}</svg>'
    sys.exit('icon not found: ' + name)
def img(m):
    p = os.path.join(D, 'img', m.group(1)); assert os.path.exists(p), p
    return 'data:image/webp;base64,' + base64.b64encode(open(p, 'rb').read()).decode()
out = src.replace('<!--SYMBOLS-->', sym)
out = re.sub(r'\{\{logo:([a-z-]+)\}\}', logo, out)
out = re.sub(r'\{\{i:([a-z0-9-]+)\}\}', lambda m: icon_svg(m.group(1)), out)
# icons used from the script: one object, so the markup the script writes can use them by name
names = sorted(set(re.findall(r"I\.([a-z_]+)", out)))
out = out.replace('/*ICONS*/', 'var I=' + json.dumps({n: icon_svg(n.replace('_', '-')) for n in names}) + ';')
out = re.sub(r'\{\{img:([a-z0-9.-]+)\}\}', img, out)
left = re.findall(r'\{\{[^}]+\}\}', out)
if left: sys.exit('unresolved placeholders: ' + ', '.join(sorted(set(left))))
assert '·' not in out, 'middle dot in the page (the owner does not want it)'
open(os.path.join(D, 'cart-drawer.html'), 'w', encoding='utf-8').write(out)
print('built', len(out), 'bytes; script icons:', ', '.join(names))
