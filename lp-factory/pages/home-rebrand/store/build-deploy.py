#!/usr/bin/env python3
"""The store build of the new home page (owner 2026-11-27: "Deploy the new home page please.").
Reads ../home-rebrand.html (run ../build.py first), writes:
  mc-home.css       the page styles, every selector under #mch so the theme's rules cannot reach in
  page-body.html    what goes into the Shopify page body: theme overrides, the stylesheet, the page, its small script
  files.json        every picture and video the page needs and its name in Shopify Files (new: true = not there yet)
The theme's own header and footer stay; the preview's note bar, header and footer are dropped. The page's own
announcement bar stays and the theme's is hidden, as on the kits page.
usage: python3 build-deploy.py <key>      (key = cache-bust tag, e.g. home1)"""
import hashlib, json, os, re, sys
D = os.path.dirname(os.path.abspath(__file__))
KEY = sys.argv[1] if len(sys.argv) > 1 else 'dev'
B = 'https://maisoncroyez.com/cdn/shop/files/'
html = open(os.path.join(D, '..', 'home-rebrand.html'), encoding='utf-8').read()
m = re.search(r'<style>\n(.*?)</style>\n(.*)<script>\n(.*?)</script>\s*$', html, re.S); assert m, 'page structure changed'
css, body, js = m.group(1), m.group(2), m.group(3)

# ---- the markup: no preview chrome ----
def cut(pattern, n=1):
    global body
    body, k = re.subn(pattern, '', body, flags=re.S); assert k == n, (pattern[:40], k)
cut(r'<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">.*?</svg>\s*')
cut(r'<div class="note">.*?</div>\s*')
cut(r'<div class="w"><header class="hdr">.*?</header></div>\s*')
cut(r'<footer>.*?</footer>\s*')
assert '#mc-two' not in body and 'Proposal' not in body, 'preview chrome left'

# ---- pictures and video: the ones the kits page already put in Files keep that name, the rest are mc-home-* ----
KD = os.path.join(D, '..', '..', 'diffuser-kits-rebrand')
md5 = lambda p: hashlib.md5(open(p, 'rb').read()).hexdigest()
have = {}
for x in json.load(open(os.path.join(KD, 'store', 'files.json'), encoding='utf-8')):
    p = os.path.join(KD, x['repo'])
    if os.path.exists(p): have[md5(p)] = x['file']
used = sorted(set(re.findall(r'(?:src|poster)="(img/[^"]+)"', body) + re.findall(r'url\((img/[^)]+)\)', css)))
files = []
def name(p):
    h = md5(os.path.join(D, '..', p))
    return have[h] if h in have else 'mc-home-' + os.path.basename(p)
for p in used: files.append({'repo': p, 'file': name(p), 'new': not name(p).startswith('mc-dkr-')})
json.dump(files, open(os.path.join(D, 'files.json'), 'w'), indent=1)
def sized(p):
    u = B + name(p); f = os.path.basename(p)
    if f.endswith(('.mp4', '.webm')): return 'src="%s"' % u
    if f.startswith('ugc-'): return 'src="%s?width=300"' % u
    if f.startswith('pick-'): return 'src="%s?width=160"' % u
    if f.startswith('how-'): return 'src="%s?width=300"' % u
    if f.startswith('door-'): return 'src="%s?width=700" srcset="%s?width=500 500w, %s?width=700 700w, %s?width=1100 1100w" sizes="(max-width:760px) 100vw, 560px"' % (u, u, u, u)
    if f == 'closing.webp': return 'src="%s?width=1000" srcset="%s?width=700 700w, %s?width=1000 1000w, %s?width=1600 1600w" sizes="(max-width:860px) 100vw, 64vw"' % (u, u, u, u)
    if f == 'believe.webp': return 'src="%s?width=600"' % u
    if f == 'patricia1.webp': return 'src="%s?width=640" srcset="%s?width=400 400w, %s?width=640 640w" sizes="(max-width:760px) 100vw, 520px"' % (u, u, u)
    return 'src="%s"' % u
for p in used:
    body = body.replace('src="%s"' % p, sized(p))
    css = css.replace('url(%s)' % p, 'url(%s)' % (B + name(p) + ('?width=960' if 'poster-d' in p else '?width=720' if 'poster-m' in p else '')))
assert not re.search(r'(?:src|poster)="img/', body) and 'url(img/' not in css
body = body.replace('<img ', '<img decoding="async" ')

# ---- the styles under #mch ----
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'\}', '}\n', css); css = re.sub(r'(@(?:media|supports)[^{]*\{)', r'\1\n', css)
out = []
for ln in css.split('\n'):
    t = ln.strip()
    if not t: continue
    if t.startswith('@media') or t.startswith('@supports') or t == '}': out.append(t); continue
    assert not t.startswith('@'), t[:60]
    if '{' not in t: out.append(t); continue
    sel, rest = t.split('{', 1)
    if sel.strip() == 'body': rest = rest.replace('margin:0;', '')
    fixed = []
    for p in [x.strip() for x in sel.split(',')]:
        if p in (':root', 'body', 'html'): fixed.append('#mch')
        elif p == '*': fixed.append('#mch,#mch *')
        elif p.startswith(':root'): fixed.append('#mch' + p[5:])
        else: fixed.append('#mch ' + p)
    out.append(','.join(fixed) + '{' + rest)
RESET = ('/* built by store/build-deploy.py from home.src.html; do not edit by hand */\n'
         '#mch{width:100vw;margin-left:calc(50% - 50vw);overflow-x:clip;text-align:left}\n'
         '#mch h1,#mch h2,#mch h3,#mch h4,#mch p,#mch ul,#mch ol,#mch li,#mch blockquote,#mch figure,#mch summary,#mch details{margin:0;padding:0;font-family:inherit;color:inherit;text-transform:none;letter-spacing:normal;max-width:none;border:0;background:none}\n'
         '#mch h1,#mch h2,#mch h3,#mch h4{font-weight:700}\n'
         '#mch ul,#mch ol{list-style:none}\n'
         '#mch :where(p,div,ul,ol,section,a,span,video,img){margin-block-start:0}\n'
         '#mch li::before,#mch li::marker{content:none}\n'
         '#mch img,#mch svg,#mch video{margin:0 !important;border-radius:0}\n'
         '#mch a{color:inherit;text-decoration:none}\n'
         '#mch button{font-family:inherit;letter-spacing:normal;text-transform:none;box-shadow:none;margin:0;min-width:0;line-height:inherit}\n'
         '#mch blockquote{quotes:none}#mch blockquote::before,#mch blockquote::after{content:none}\n'
         '#mch details>summary{list-style:none}#mch details>summary::-webkit-details-marker{display:none}\n')
FONTS = ''.join('@font-face{font-family:"%s";font-style:normal;font-weight:%s;font-display:swap;src:url(%smc-dkr-f-%s.woff2) format("woff2")}\n' % x for x in [
    ('DM Sans', '400', B, 'dm-400'), ('DM Sans', '500', B, 'dm-500'), ('DM Sans', '600', B, 'dm-600'), ('DM Sans', '700 800', B, 'dm-700'),
    ('Roboto Mono', '400 500', B, 'mono-500'), ('Roboto Mono', '600 700', B, 'mono-600')])
LAZY = '#mch main>section{content-visibility:auto;contain-intrinsic-size:auto 800px}\n'
TAIL = '#mch .link{text-decoration:underline}\n#mch .bar{width:100%}\n'
css = FONTS + RESET + LAZY + '\n'.join(out) + '\n' + TAIL
open(os.path.join(D, 'mc-home.css'), 'w', encoding='utf-8').write(css)

# ---- the page body ----
HOLD = open(os.path.join(KD, 'store', 'third-party-hold.html'), encoding='utf-8').read()
PM, PD = B + name('img/hero-poster-m.webp') + '?width=720', B + name('img/hero-poster-d.webp') + '?width=960'
page = ('<style>.shopify-section--main-page .page > h1.h1.text-center{display:none}.shopify-section--main-page,.shopify-section--main-page .container,.shopify-section--main-page .page-spacer,.shopify-section--main-page .page,.shopify-section--main-page .prose{margin-top:0 !important;padding-top:0 !important;border-top:0 !important;margin-bottom:0 !important;padding-bottom:0 !important;max-width:none !important}'
        '.shopify-section--announcement-bar,.announcement-bar{display:none !important}#mch{width:100vw;margin-left:calc(50% - 50vw);overflow-x:clip;background:#F9F6EE}</style>\n'
        '<link rel="preload" as="image" fetchpriority="high" href="' + PM + '" media="(max-width:860px)">\n<link rel="preload" as="image" fetchpriority="high" href="' + PD + '" media="(min-width:861px)">\n'
        '<link rel="stylesheet" href="' + B + 'mc-home.css?v=' + KEY + '">\n'
        '<link rel="preload" as="font" type="font/woff2" crossorigin href="' + B + 'mc-dkr-f-dm-700.woff2">\n' +
        HOLD +
        '<div id="mch">' + body.strip() + '</div>\n<script>\n' + js.strip() + '\n</script>\n')
open(os.path.join(D, 'page-body.html'), 'w', encoding='utf-8').write(page)
for f in ('mc-home.css', 'page-body.html'): print(f, os.path.getsize(os.path.join(D, f)), 'B')
print(len(files), 'files,', sum(1 for x in files if x['new']), 'new; key', KEY)
for x in files:
    if x['new']: print('  new:', x['repo'], '->', x['file'])
