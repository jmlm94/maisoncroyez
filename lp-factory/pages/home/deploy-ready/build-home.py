#!/usr/bin/env python3
"""MC homepage — LIVE bundle generator.
Reads the mock generator (single source of truth) and emits:
  mc-home.css      (#root-prefixed, CDN fonts + images)
  mc-home-app.js   (injects the page into #root)
The theme's own announcement bar / header / footer stay — the mock's preview chrome is stripped.
Run from this dir: python3 build-home.py
"""
import os, re, sys

HERE = os.path.dirname(__file__) or '.'
SRC = os.path.join(HERE, '..', 'src')

cwd = os.getcwd()
os.chdir(SRC)
mock_globals = {'__file__': os.path.join(SRC, 'make-home-mock.py'), '__name__': 'mockgen'}
exec(open('make-home-mock.py', encoding='utf-8').read(), mock_globals)
os.chdir(cwd)
html = mock_globals['html']
IMG = mock_globals['IMG']

# ---------- CDN image URLs ----------
B = 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/'
CDN = {
    'hero': B + 'mc-kb-hero.jpg',
    'logo': B + 'mc-kb-logo.png',
    'cardkit': B + 'mc-home-card1.jpg',
    'carddiff': B + 'mc-home-card2.jpg',
    'cardfrag': B + 'mc-home-card3.jpg',
    'manifesto': B + 'mc-home-mani.jpg',
    'testa': B + 'mc-home-testa.jpg',
    'testb': B + 'mc-home-testb.jpg',
    'testc': B + 'mc-home-testc.jpg',
    'testd': B + 'mc-home-testd.jpg',
    'logocream': B + 'mc-kb-logo.png',  # footer stripped; kept as safety
    **{f'frag{i}': B + f'mc-kb-frag{i}.jpg' for i in range(1, 8)},
}
for k in sorted(CDN, key=lambda k: -len(IMG[k])):
    html = html.replace(IMG[k], f'@@ASSET:{k}@@')

# ---------- split ----------
m = re.search(r'<style>\n(.*?)\n</style>\n(.*)<script>\n(.*?)\n</script>\n?$', html, re.S)
assert m, 'html structure changed'
css, body, js = m.group(1), m.group(2), m.group(3)

# strip preview chrome (theme provides announcement bar, header, footer)
n0 = len(body)
body = re.sub(r'<div class="abar">.*?</div>\s*', '', body, flags=re.S)
body = re.sub(r'<header>.*?</header>\s*', '', body, flags=re.S)
body = re.sub(r'<footer>.*?</footer>\s*', '', body, flags=re.S)
assert len(body) < n0, 'chrome strip failed'
assert 'abar' not in body and '<footer' not in body

# lazy-load everything below the fold (hero image stays eager)
body = body.replace('<img src="', '<img loading="lazy" decoding="async" src="')
body = body.replace('<img loading="lazy" decoding="async" src="@@ASSET:hero@@"',
                    '<img fetchpriority="high" src="@@ASSET:hero@@"')

# ---------- fonts ----------
fonts_cdn = open(os.path.join(SRC, '..', '..', 'pdp-free-diffuser', 'src', 'fonts.css')).read()
css = re.sub(r'@font-face\{[^}]*\}', '', css)
css = fonts_cdn + '\n' + css

# ---------- #root prefix (split multi-rule lines first — specificity bug otherwise) ----------
def prefix_css(text):
    out = []
    media_depth = 0
    for ln in text.split('\n'):
        stripped = ln.strip()
        if not stripped:
            out.append(ln); continue
        if stripped.startswith('@media'):
            out.append(ln); media_depth += 1; continue
        if stripped.startswith('@keyframes') or stripped.startswith('@font-face') or stripped.startswith(':root') or stripped.startswith('html{'):
            out.append(ln); continue
        if stripped == '}':
            out.append(ln)
            if media_depth: media_depth -= 1
            continue
        if stripped.startswith(('from{', 'to{', '0%', '100%')):
            out.append(ln); continue
        if '{' in stripped and not stripped.startswith('@'):
            sel, rest = stripped.split('{', 1)
            parts = [p.strip() for p in sel.split(',')]
            fixed = []
            for p in parts:
                if p == 'body':
                    fixed.append('#root')
                elif p == '*':
                    fixed.append('#root, #root *')
                elif p.startswith('*'):
                    fixed.append('#root ' + p)
                else:
                    fixed.append('#root ' + p)
            out.append((('  ' if media_depth else '') + ', '.join(fixed) + '{' + rest))
        else:
            out.append(ln)
    return '\n'.join(out)

css = re.sub(r'\}', '}\n', css)
css = re.sub(r'(@media[^{]*\{)', r'\1\n', css)
css = prefix_css(css)
for k, u in CDN.items():
    css = css.replace(f'@@ASSET:{k}@@', u)
with open(os.path.join(HERE, 'mc-home.css'), 'w') as f:
    f.write(css)

# ---------- app js ----------
def js_string(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('</script>', '<\\/script>') + '"'

body_js = js_string(body)
for k, u in CDN.items():
    body_js = body_js.replace(f'@@ASSET:{k}@@', u)

app = ('(function(){\n'
       'var root=document.getElementById("root");\n'
       'if(!root) return;\n'
       'root.innerHTML=' + body_js + ';\n'
       + js + '\n'
       '})();\n')
with open(os.path.join(HERE, 'mc-home-app.js'), 'w') as f:
    f.write(app)

for fn in ['mc-home.css', 'mc-home-app.js']:
    print(fn, os.path.getsize(os.path.join(HERE, fn)) // 1024, 'KB')
assert '@@ASSET' not in css and '@@ASSET' not in app, 'unreplaced asset placeholder'
print('OK')
