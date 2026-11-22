#!/usr/bin/env python3
"""The store build of the rebranded diffuser kits page (for the hidden test page /pages/diffuser-kits-2).
Reads ../diffuser-kits-rebrand.html (run ../build.py first) and ids.json, writes:
  mc-dkr.css        the page styles, every selector under #mcr so the theme's .prose rules cannot reach in
  mc-dkr-app.js     puts the page into #mcr, runs the page script, and does the real add to cart + checkout
  page-body.html    what goes into the Shopify page body: theme overrides, the stylesheet, #mcr, the script
The theme's own announcement bar, header and footer stay; the preview's are dropped.
usage: python3 build-deploy.py <key>      (key = cache-bust tag, e.g. dkr1-<commit>)"""
import json, os, re, sys
D = os.path.dirname(os.path.abspath(__file__))
KEY = sys.argv[1] if len(sys.argv) > 1 else 'dev'
IDS = json.load(open(os.path.join(D, 'ids.json'), encoding='utf-8'))
B = 'https://maisoncroyez.com/cdn/shop/files/'   # the same files as cdn.shopify.com/s/files/1/0020/3636/7469/files/, on the shop's own domain: no second connection
html = open(os.path.join(D, '..', 'diffuser-kits-rebrand.html'), encoding='utf-8').read()

m = re.search(r'<style>\n(.*?)</style>\n(.*)<script>\n(.*?)</script>\s*$', html, re.S); assert m, 'page structure changed'
css, body, js = m.group(1), m.group(2), m.group(3)

# ---- the markup: no preview chrome, CDN pictures ----
def cut(pattern, n=1):
    global body
    body, k = re.subn(pattern, '', body, flags=re.S); assert k == n, (pattern[:40], k)
cut(r'<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">.*?</svg>\s*')   # logo symbol: only the preview header and footer used it
cut(r'<div class="note">.*?</div>\s*')
cut(r'<div class="w"><header class="hdr">.*?</header></div>\s*')
cut(r'<footer>.*?</footer>\s*')
assert '#mc-two' not in body and 'Preview' not in body.replace('Preview only. Nothing was added.', ''), 'preview chrome left'
pics = sorted(set(re.findall(r'src="((?:img|old)/[^"]+)"', body)))
# gallery pictures carry a round tag (g2 = the shoot-photo set, 2026-11-22) so a new set never meets a cached old one
# photos the owner uploaded to Files himself-named (mc-shoot-NN-<name>.webp) keep that name
name = lambda p: os.path.basename(p) if os.path.basename(p).startswith('mc-shoot-') else 'mc-dkr-' + p.replace('img/g-', 'g2-').replace('img/', '').replace('old/', 'o-')
def sized(p):
    u = B + name(p); f = os.path.basename(p)
    if f.startswith('g-'):   # the gallery: full column width on a phone, about 640 px on a desktop
        return 'src="%s?width=900" srcset="%s?width=600 600w, %s?width=900 900w, %s?width=1400 1400w" sizes="(max-width:860px) 100vw, 640px"' % (u, u, u, u)
    if f.startswith('ugc-'): return 'src="%s?width=200"' % u
    if f.startswith('pick-'): return 'src="%s?width=160"' % u
    if f.startswith('step'): return 'src="%s?width=300"' % u
    if f in ('hero-frame.webp', 'spaces1.webp', 'goodbye1.webp', 'badge1.webp') or f.startswith('mc-shoot-'):
        return 'src="%s?width=640" srcset="%s?width=400 400w, %s?width=640 640w" sizes="(max-width:860px) 46vw, 560px"' % (u, u, u)
    return 'src="%s"' % u
for p in pics: body = body.replace('src="%s"' % p, sized(p))
assert not re.search(r'src="(?:img|old)/', body)
body = body.replace('<img ', '<img decoding="async" ').replace('<img decoding="async" src="%smc-dkr-g2-00.webp' % B, '<img src="%smc-dkr-g2-00.webp' % B)
json.dump([{'repo': p, 'file': name(p)} for p in pics], open(os.path.join(D, 'files.json'), 'w'), indent=1)

# ---- the styles under #mcr ----
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'\}', '}\n', css); css = re.sub(r'(@(?:media|supports)[^{]*\{)', r'\1\n', css)
out = []
for ln in css.split('\n'):
    t = ln.strip()
    if not t: continue
    if t.startswith('@media') or t.startswith('@supports') or t == '}': out.append(t); continue
    assert not t.startswith('@'), t[:60]
    if '{' not in t: out.append(t); continue        # a continuation line inside a declaration block
    sel, rest = t.split('{', 1)
    if sel.strip() == 'body': rest = rest.replace('margin:0;', '')   # #mcr keeps its full-width breakout margin
    fixed = []
    for p in [x.strip() for x in sel.split(',')]:
        if p in (':root', 'body', 'html'): fixed.append('#mcr')
        elif p == '*': fixed.append('#mcr,#mcr *')
        elif p.startswith(':root'): fixed.append('#mcr' + p[5:])
        else: fixed.append('#mcr ' + p)
    out.append(','.join(fixed) + '{' + rest)
RESET = ('/* built by store/build-deploy.py from pdp.src.html; do not edit by hand */\n'
         '#mcr{width:100vw;margin-left:calc(50% - 50vw);overflow-x:clip;text-align:left}\n'
         '#mcr h1,#mcr h2,#mcr h3,#mcr h4,#mcr p,#mcr ul,#mcr ol,#mcr li,#mcr blockquote,#mcr figure,#mcr summary,#mcr details{margin:0;padding:0;font-family:inherit;color:inherit;text-transform:none;letter-spacing:normal;max-width:none;border:0;background:none}\n'
         '#mcr h1,#mcr h2,#mcr h3,#mcr h4{font-weight:700}\n'
         '#mcr ul,#mcr ol{list-style:none}\n'
         '#mcr :where(p,div,ul,ol){margin-block-start:0}\n'   # the theme's .prose * + :is(p,div,ul,ol) adds 12 px between siblings; the page sets its own spacing
         '#mcr li::before,#mcr li::marker{content:none}\n'
         '#mcr img,#mcr svg,#mcr video{margin:0 !important;border-radius:0}\n'
         '#mcr a{color:inherit;text-decoration:none}\n'
         '#mcr button{font-family:inherit;letter-spacing:normal;text-transform:none;box-shadow:none;margin:0;width:auto;min-width:0;line-height:inherit}\n'
         '#mcr blockquote{quotes:none}#mcr blockquote::before,#mcr blockquote::after{content:none}\n'
         '#mcr details>summary{list-style:none}#mcr details>summary::-webkit-details-marker{display:none}\n')
FONTS = ''.join('@font-face{font-family:"%s";font-style:normal;font-weight:%s;font-display:swap;src:url(%smc-dkr-f-%s.woff2) format("woff2")}\n' % x + '' for x in [
    ('DM Sans', '400', B, 'dm-400'), ('DM Sans', '500', B, 'dm-500'), ('DM Sans', '600', B, 'dm-600'), ('DM Sans', '700 800', B, 'dm-700'),
    ('Roboto Mono', '400 500', B, 'mono-500'), ('Roboto Mono', '600 700', B, 'mono-600')])
LAZY = '#mcr main>section{content-visibility:auto;contain-intrinsic-size:auto 900px}\n'
css = FONTS + RESET + LAZY + '\n'.join(out) + '\n#mcr .stick{z-index:60}\n#mcr #step1{scroll-margin-top:96px}\n#mcr .stick .stick-go{display:flex;align-items:center;justify-content:center;text-align:center}\n#mcr .bar{width:100%}\n#mcr #cta[aria-busy="true"],#mcr #stick-go[aria-busy="true"]{opacity:.7;pointer-events:none}\n'
open(os.path.join(D, 'mc-dkr.css'), 'w', encoding='utf-8').write(css)

# ---- the script: the page's own, with the real cart ----
a = "  $('#cta').addEventListener('click',function(){topUp();say('Preview only. Nothing was added.')});\n"; assert js.count(a) == 1
js = js.replace(a, "  $('#cta').addEventListener('click',function(){checkout()});\n")
# round 19: the sticky button only scrolls to step 1 (no cart), so the page's own handler stays as it is
a = "  render();\n})();"; assert js.count(a) == 1
CART = r'''
  /* ---- the store: one kit variant + the picked scents (on the refill plan, or one-time) -> /cart/add.js -> checkout.
     The free scents come from the automatic discounts "Diffuser kit: N free scent(s)". Lines this page owns are removed
     first, so the checkout holds exactly what the page shows. No plans yet (CFG.plans = null): step 3 is hidden and the
     scents go in one-time. ---- */
  var CFG=__CFG__;
  var onStore=/(^|\.)maisoncroyez\.com$/.test(location.hostname),busy=false;
  function post(u,b){return fetch(u,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(b)}).then(function(r){if(!r.ok)throw new Error(u+' '+r.status);return r.json()})}
  function setBusy(v){busy=v;['#cta','#stick-go'].forEach(function(q){var e=$(q);if(e)e.setAttribute('aria-busy',String(v))})}
  function checkout(){
    if(busy)return;topUp();
    var plan=(CFG.plans&&st.freq>0)?CFG.plans[st.freq]:null,items=[{id:CFG.kit[st.diff],quantity:1}];
    ORDER.forEach(function(k){if(st.picks[k]>0){var l={id:CFG.scent[k],quantity:st.picks[k]};if(plan)l.selling_plan=plan;items.push(l)}});
    if(!onStore){say('Preview only. Nothing was added.');return}
    setBusy(true);
    var mine=[CFG.kit[1],CFG.kit[2],CFG.kit[3]].concat(ORDER.map(function(k){return CFG.scent[k]}));
    fetch('/cart.js',{headers:{'Accept':'application/json'}}).then(function(r){return r.json()}).then(function(c){
      var u={},n=0;(c.items||[]).forEach(function(l){if(mine.indexOf(l.variant_id)>-1){u[l.key]=0;n++}});
      return n?post('/cart/update.js',{updates:u}):0;
    }).then(function(){return post('/cart/add.js',{items:items})}).then(function(){
      setTimeout(function(){location.href='/checkout'},800); /* the channel pixel sends AddToCart right after /cart/add.js */
    }).catch(function(){setBusy(false);say('Something went wrong adding to your cart. Please try again.')});
  }
  if(!CFG.plans){st.freq=0;var s3=$('#step3');if(s3)s3.hidden=true;
    $$('.step-h .lab').forEach(function(l){l.textContent=l.textContent.replace('of 3','of 2')});
    $$('.faq summary').forEach(function(q){if(/subscription/i.test(q.textContent))q.parentNode.hidden=true})}
  window.addEventListener('pageshow',function(e){if(e.persisted)setBusy(false)});
  render();
})();'''
js = js.replace(a, CART.replace('__CFG__', json.dumps({'kit': IDS['kit'], 'scent': IDS['scent'], 'plans': IDS.get('plans')}, separators=(',', ':'))))
S = lambda s: '"' + s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('</script>', '<\\/script>') + '"'
# The page body carries the top bar and the main picture as plain HTML (so the largest picture does not wait for this
# file); this file brings the rest of the page and moves that same <img> into its place in the gallery.
app = ('/* built by store/build-deploy.py; do not edit by hand */\n(function(){\nvar root=document.getElementById("mcr");if(!root||root.getAttribute("data-up"))return;root.setAttribute("data-up","1");\n'
       'var pre=document.getElementById("mcr-hero"),t=document.createElement("div");t.innerHTML=' + S(body.strip()) + ';\n'
       'if(pre){var n=t.querySelector("#track .slide img");if(n)n.parentNode.replaceChild(pre,n)}\n'
       'root.textContent="";while(t.firstChild)root.appendChild(t.firstChild);root.style.minHeight="";\n})();\n' + js.strip() + '\n')
open(os.path.join(D, 'mc-dkr-app.js'), 'w', encoding='utf-8').write(app)

# ---- the page body ----
HOLD = open(os.path.join(D, 'third-party-hold.html'), encoding='utf-8').read()   # the kits page's own, proven there: holds Clarity, Klaviyo, Postscript, Gorgias, the Subi SDK and the Meta pixel library until the first touch or a timeout
G0 = B + 'mc-dkr-g2-00.webp'
bar = re.search(r'<div class="bar">.*?</div>', body, re.S).group(0)
hero = re.search(r'<img [^>]*mc-dkr-g2-00\.webp[^>]*>', body).group(0).replace('<img ', '<img id="mcr-hero" ', 1)
page = ('<style>.shopify-section--main-page .page > h1.h1.text-center{display:none}.shopify-section--main-page,.shopify-section--main-page .container,.shopify-section--main-page .page-spacer,.shopify-section--main-page .page,.shopify-section--main-page .prose{margin-top:0 !important;padding-top:0 !important;border-top:0 !important;margin-bottom:0 !important;padding-bottom:0 !important}'
        '.shopify-section--announcement-bar,.announcement-bar{display:none !important}#mcr{width:100vw;margin-left:calc(50% - 50vw);overflow-x:clip;background:#F9F6EE}</style>\n'
        '<link rel="preload" as="image" fetchpriority="high" href="@G@?width=900" imagesrcset="@G@?width=600 600w, @G@?width=900 900w, @G@?width=1400 1400w" imagesizes="(max-width:860px) 100vw, 640px">\n'
        '<link rel="stylesheet" href="@B@mc-dkr.css?v=@K@">\n'
        '<link rel="preload" as="font" type="font/woff2" crossorigin href="@B@mc-dkr-f-dm-700.woff2">\n'
        + HOLD +
        '<div id="mcr" style="min-height:100vh">' + bar + '<main><div class="w"><div class="bb" id="buybox"><div class="gal"><div class="track" id="track"><div class="slide">' + hero + '</div></div></div><div></div></div></div></main></div>\n'
        '<script src="@B@mc-dkr-app.js?v=@K@"></script>\n').replace('@G@', G0).replace('@B@', B).replace('@K@', KEY)
open(os.path.join(D, 'page-body.html'), 'w', encoding='utf-8').write(page)
for f in ('mc-dkr.css', 'mc-dkr-app.js', 'page-body.html'): print(f, os.path.getsize(os.path.join(D, f)), 'B')
print(len(pics), 'pictures; key', KEY)
