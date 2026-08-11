#!/usr/bin/env python3
"""MC kit builder — LIVE bundle generator for /pages/build-your-kit.
Reads the mock generator's HTML/CSS/JS (single source of truth) and emits:
  mc-kit-assets.js  (window.MCKIT_ASSETS data URIs)
  mc-kit.css        (#root-prefixed)
  mc-kit-app.js     (injects wizard into #root; real ATC -> /checkout)
Run from this dir: python3 build-kit.py
Wiring: scents on Subi plan 2627895405 ($39.95/30d), diffuser 45450822778989 free via Subi automation.
"""
import base64, os, re, sys, io

HERE = os.path.dirname(__file__) or '.'
SRC = os.path.join(HERE, '..', 'src')
sys.path.insert(0, SRC)

# Run the mock generator in-memory to get its html (it writes kit-builder-mock.html too; harmless)
cwd = os.getcwd()
os.chdir(SRC)
mock_globals = {'__file__': os.path.join(SRC, 'make-kit-mock.py'), '__name__': 'mockgen'}
exec(open('make-kit-mock.py', encoding='utf-8').read(), mock_globals)
os.chdir(cwd)
html = mock_globals['html']
IMG = mock_globals['IMG']

# ---------- 1) CDN image URLs (uploaded as Shopify files; no assets bundle) ----------
B = 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/'
CDN = {
    'hero': B + 'mc-kb-side.jpg',
    'product': B + 'mc-kb-hero.jpg',
    'room1': B + 'mc-kb-kit1.jpg',
    'room3': B + 'mc-kb-kit2.jpg',
    'room5': B + 'mc-kb-kit3.jpg',
    'guests': B + 'mc-kb-guests.jpg',
    'logo': B + 'mc-kb-logo.png',
    **{f'frag{i}': B + f'mc-kb-frag{i}.jpg' for i in range(1, 8)},
}
keys = list(CDN)

# swap inline data URIs in html for asset placeholders (longest first to avoid prefix clashes)
for k in sorted(keys, key=lambda k: -len(IMG[k])):
    html = html.replace(IMG[k], f'@@ASSET:{k}@@')

# ---------- 2) split html -> css / body / js ----------
m = re.search(r'<style>\n(.*?)\n</style>\n(.*)<script>\n(.*?)\n</script>\n?$', html, re.S)
assert m, 'html structure changed'
css, body, js = m.group(1), m.group(2), m.group(3)

# fonts: replace inlined data-URI @font-face block with the CDN font css used by the live LP
fonts_cdn = open(os.path.join(SRC, '..', '..', 'pdp-free-diffuser', 'src', 'fonts.css')).read()
# the mock css starts with the inlined fonts (from fonts-inline.css); strip all @font-face rules then prepend CDN ones
css = re.sub(r'@font-face\{[^}]*\}', '', css)
css = fonts_cdn + '\n' + css

# prefix selectors with #root (keep :root, @font-face, @media, @keyframes)
def prefix_css(text):
    out, i = [], 0
    lines = text.split('\n')
    media_depth = 0
    for ln in lines:
        stripped = ln.strip()
        if not stripped:
            out.append(ln); continue
        if stripped.startswith('@media'):
            out.append(ln); media_depth += 1; continue
        if stripped.startswith('@keyframes') or stripped.startswith('@font-face') or stripped.startswith(':root'):
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
                elif p.startswith('*'):
                    fixed.append('#root ' + p if p != '*' else '#root, #root *')
                else:
                    fixed.append('#root ' + p)
            out.append((('  ' if media_depth else '') + ', '.join(fixed) + '{' + rest))
        else:
            out.append(ln)
    return '\n'.join(out)

css = re.sub(r'\}', '}\n', css)
css = re.sub(r'(@media[^{]*\{)', r'\1\n', css)
css = prefix_css(css)
# takeover niceties: #root paints its own ground and resets box-sizing
css = css.replace('#root, #root *{margin:0;padding:0;box-sizing:border-box}',
                  '#root, #root *{margin:0;padding:0;box-sizing:border-box}')
with open(os.path.join(HERE, 'mc-kit.css'), 'w') as f:
    f.write(css)

# ---------- 3) app js ----------
body = body.replace("'", "\\'").replace('\n', '\\n')  # not used — we embed via backtick template below
# rebuild body from the original (unescaped) match
body = m.group(2)
# real ATC replaces the preview toast
js = js.replace('''function joinToast(){
  var t=document.getElementById('toast'),m=count();
  t.textContent='Preview mode — on the live page this adds '+N+' free diffuser'+(N===1?'':'s')+' + '+m+' scent subscription'+(m===1?'':'s')+' ($39.95/mo each, plan: Delivered every 30 days) and opens the Circle cart drawer.';
  t.classList.add('on');setTimeout(function(){t.classList.remove('on')},5200);
}''', '''var BUSY=false;
function joinToast(){
  if(BUSY) return; BUSY=true;
  var btns=[].slice.call(document.querySelectorAll('.btn')).filter(function(b){return b.textContent.indexOf('Join the Circle')>-1});
  btns.forEach(function(b){b.disabled=true;var s=b.querySelector('span');if(s)s.textContent='Adding your kit\\u2026';});
  var items=[];
  for(var k in picks) if(picks[k]) items.push({id:VAR[k],quantity:picks[k],selling_plan:PLAN});
  items.push({id:DIFF,quantity:N});
  fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:items})})
    .then(function(r){if(!r.ok)throw new Error('add failed');window.location.href='/checkout';})
    .catch(function(){BUSY=false;btns.forEach(function(b){b.disabled=false;var s=b.querySelector('span');if(s)s.textContent='Join the Circle \\u2794';});
      var t=document.getElementById('toast');t.textContent='Something went wrong \\u2014 please try again.';t.classList.add('on');setTimeout(function(){t.classList.remove('on')},4000);});
}''')
js = ('var VAR={love:41212020457581,abundance:41212018655341,focus:41212021506157,ideas:41212021342317,'
      'energy:41212020752493,purify:41212021669997,midnight:41212019933293};\n'
      'var PLAN=2627895405, DIFF=45450822778989;\n' + js)

def js_string(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('</script>', '<\\/script>') + '"'

body = body.replace('<img src="@@ASSET:frag', '<img loading="lazy" decoding="async" src="@@ASSET:frag')
body = body.replace('<img src="@@ASSET:guests', '<img loading="lazy" decoding="async" src="@@ASSET:guests')
body_js = js_string(body)
for k in keys:
    body_js = body_js.replace(f'@@ASSET:{k}@@', CDN[k])
js = js.replace("url('@@ASSET:hero@@')", "url('\"+(A[\"hero\"]||\"\")+\"')")  # no-op safety

app = ('(function(){\n'
       'var root=document.getElementById("root");\n'
       'if(!root) return;\n'
       'root.innerHTML=' + body_js + ';\n'
       + js + '\n'
       'window.go=go;window.joinToast=joinToast;\n'
       '})();\n')
# the desktop side image is set in CSS via placeholder — swap it there instead
with open(os.path.join(HERE, 'mc-kit-app.js'), 'w') as f:
    f.write(app)

# css contains @@ASSET:hero@@ inside url() — replace with the actual data URI (kept in css: it is loaded once)
css = css.replace('@@ASSET:hero@@', CDN['hero'])
with open(os.path.join(HERE, 'mc-kit.css'), 'w') as f:
    f.write(css)

for fn in ['mc-kit.css', 'mc-kit-app.js']:
    print(fn, os.path.getsize(os.path.join(HERE, fn)) // 1024, 'KB')
