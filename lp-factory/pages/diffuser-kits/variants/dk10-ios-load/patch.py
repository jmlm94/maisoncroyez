#!/usr/bin/env python3
"""dk10 (2026-10-28, owner, iPhone screenshot: only the picture, off to the left, nothing below):
"Run one more QA because its opening like this. Also delete this from first step: Ships every 30, 60 or 90 days. Swap,
pause and cancel anytime. Diffusers are free today only. Also the three bullets no smoke, no water... bolder and remove
the . at the end on each."

App (from the live dk9z ../../mc-dk-app.js): the step-1 sub-line is gone; the three badges lose the trailing period.
CSS (from ../../mc-dk.css): the badges are bolder (Outfit 700, the heavier face we load, near-black).
Page body (from ../../page-body.html): the loading view, shown until the app mounts:
  - the picture is centred, where the app's hero sits (the line-1 rule had margin:0 !important, so it hugged the left);
  - under it, plain HTML copies of the rating line, the black FREE line and the title, so the first screen reads as the
    page even before the scripts run (the whole pre-hero block is hidden the moment #root renders, as before);
  - the loader records each script's load/error; a failed script is fetched again right away with a fresh URL, and at
    8 s anything still missing is fetched again (only scripts that have not loaded, the app guard reset);
  - at 15 s without the page, a "Tap to reload" button shows with the first script error in small grey text (reload
    adds ?mcr=… so every file comes fresh), and Clarity gets a mc_kits_stuck tag.
Writes ./mc-dk-app.js, ./mc-dk.css, ./page-body.html (key placeholder kept as the live key; deploy swaps it)."""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))
UP = os.path.join(HERE, "..", "..")
def load(n): return open(os.path.join(UP, n), encoding="utf-8").read()
def rep(s, a, b, n=1):
    assert s.count(a) == n, (s.count(a), a[:100]); return s.replace(a, b)

# ---------- app ----------
s = load("mc-dk-app.js")
s = rep(s, '''<p class="s9-sub">Ships every 30, 60 or 90 days. Swap, pause and cancel anytime. Diffusers are free today only.</p> <!-- dk9s (2026-10-25, owner): step 1 is about the scent subscription; the diffusers are the free gift per option -->''',
        '''<!-- dk10 (2026-10-28, owner): the sub-line under the step-1 title is gone -->''')
s = rep(s, '''{ short: "NO SMOKE, NO HARM." }, /* dk9x (owner): shorter, no emojis, a soft gradient on each (CSS nth-child) */''',
        '''{ short: "NO SMOKE, NO HARM" }, /* dk9x (owner): shorter, no emojis, a soft gradient on each (CSS nth-child); dk10 (owner): no period, bolder */''')
s = rep(s, '''{ short: "NO WATER, NO MOLD." },''', '''{ short: "NO WATER, NO MOLD" },''')
s = rep(s, '''{ short: "REDUCE STRESS & ANXIETY." },''', '''{ short: "REDUCE STRESS & ANXIETY" },''')
open(os.path.join(HERE, "mc-dk-app.js"), "w", encoding="utf-8").write(s)
print("mc-dk-app.js", len(s.encode()))

# ---------- css ----------
c = load("mc-dk.css")
c = c.rstrip("\n") + "\n" + '''/* dk10 (2026-10-28, owner): the three badges under the title bolder (Outfit 700 is the heavier face on the page; it was Be Vietnam Pro, whose heaviest file is 600) */
#root .hs3 .hs,#root #buybox.step-1 .hs3 .hs{font-family:'Outfit',sans-serif !important;font-weight:700 !important;color:#111 !important;letter-spacing:.035em !important;-webkit-text-stroke:.2px currentColor}
'''
open(os.path.join(HERE, "mc-dk.css"), "w", encoding="utf-8").write(c)
print("mc-dk.css", len(c.encode()))

# ---------- page body ----------
b = load("page-body.html")
b = rep(b, '''#mc-prehero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;margin:0 !important}''',
        '''#mc-prehero img{display:block;height:auto;margin:6px auto 0 !important}''')
TXT = ('''<div id="mc-pre-txt" style="box-sizing:border-box;width:calc(100vw - 40px);max-width:560px;margin:0 auto;padding:0 0 28px;text-align:center;color:#241C18">'''
       '''<div style="display:flex;align-items:center;justify-content:center;gap:8px;margin:22px 0 0;font-size:13.28px;line-height:21px"><span style="color:#E0A11B;font-size:16px;line-height:16px;letter-spacing:1px">&#9733;&#9733;&#9733;&#9733;&#9733;</span><b style="font-weight:800;text-decoration:underline;text-underline-offset:3px;text-decoration-color:#C9C4BC">4.7 Rated (124 reviews)</b></div>'''
       '''<div style="margin:14px 0 0;padding:8px 12px;border-radius:10px;background:#111;color:#fff;font-weight:800;font-size:10.88px;line-height:14.7px;letter-spacing:.08em;text-transform:uppercase">JUST FOR TODAY: THE DIFFUSERS ARE 100% FREE!</div>'''
       '''<div style="margin:8px 0 0;font-family:Unna,Georgia,serif;font-weight:700;font-size:27.52px;line-height:1.12;letter-spacing:-.05em;color:#241C18">Maison Croyez Home Diffuser &amp; 100% Organic Scents: Make your spaces look and feel great and safe again.</div>'''
       '''<div id="mc-pre-retry" style="display:none;margin:20px 0 0"><a href="?mcr=1" id="mc-pre-retry-a" style="display:inline-block;padding:13px 22px;border-radius:999px;background:#111;color:#fff;font-weight:800;font-size:13px;letter-spacing:.06em;text-decoration:none;text-transform:uppercase">Still loading? Tap to reload</a><div id="mc-pre-err" style="margin:8px 0 0;font-size:10px;line-height:1.3;color:#8A8079;word-break:break-word"></div></div>'''
       '''</div>''')
b = rep(b, '''border-radius:16px;background:#fff"></div>''', '''border-radius:16px;background:#fff">''' + TXT + '''</div>''')
m = re.search(r"var v='([^']+)';", b); key = m.group(1)
OLD_LOADER_TAIL = '''var B='https://cdn.shopify.com/s/files/1/0020/3636/7469/files/';
var l=document.createElement('link');l.rel='stylesheet';l.href=B+'mc-dk.css?v='+v;
document.head.appendChild(l);
var add=function(){['mc-lp-vendor.js','mc-lp-diffuser-assets.js','mc-dk-app.js'].forEach(function(f){
var s=document.createElement('script');s.src=B+f+'?v='+v;s.async=false;document.body.appendChild(s);});};
var fired=false;var go=function(){if(!fired){fired=true;add();}};
if(window.requestAnimationFrame){requestAnimationFrame(function(){requestAnimationFrame(go);});setTimeout(go,250);}
else{setTimeout(go,0);}})();'''
NEW_LOADER_TAIL = '''var B='https://cdn.shopify.com/s/files/1/0020/3636/7469/files/';
/* dk10 (2026-10-28, owner's iPhone showed only the picture): script load/error tracking, a fresh fetch of anything that failed or is still missing at 8 s, and a reload button at 15 s. ?mcr= (from that button) fetches every file fresh. */
var R=(location.search.match(/[?&]mcr=(\\d+)/)||[])[1],q=R?'&r=x'+R:'';
var E=window.__mcErrs=[];addEventListener('error',function(e){try{var t=e.target;if(t&&t!==window&&t.tagName&&t.tagName!=="SCRIPT")return;if(E.length<6)E.push(String((e.message||'load failed')+' @'+String(e.filename||(t&&(t.src||t.href))||'').split('/').pop().slice(0,48)+':'+(e.lineno||'')).slice(0,170));}catch(x){}},true);
var l=document.createElement('link');l.rel='stylesheet';l.href=B+'mc-dk.css?v='+v+q;
document.head.appendChild(l);
var F=['mc-lp-vendor.js','mc-lp-diffuser-assets.js','mc-dk-app.js'],st={},n=0;
var up=function(){var r=document.getElementById('root');return !!(r&&r.children.length);};
var retry=function(){if(up()||n>=2)return;if(st[F[0]]===1&&st[F[1]]===1&&st[F[2]]===1)return;n++;
var need=[];if(typeof htm==='undefined'||!window.ReactDOM)need.push(F[0]);if(!window.MC_ASSETS)need.push(F[1]);need.push(F[2]);window.__MC_KX_APP__=0;
var i=0;(function next(){if(i>=need.length||up())return;var f=need[i++],s=document.createElement('script');s.src=B+f+'?v='+v+'&r='+n+(R||'');s.onload=function(){st[f]=1;next();};s.onerror=next;document.body.appendChild(s);})();};
var add=function(){F.forEach(function(f){
var s=document.createElement('script');s.src=B+f+'?v='+v+q;s.async=false;s.onload=function(){st[f]=1;};s.onerror=function(){st[f]=2;setTimeout(retry,300);};document.body.appendChild(s);});};
var fired=false;var go=function(){if(!fired){fired=true;add();}};
if(window.requestAnimationFrame){requestAnimationFrame(function(){requestAnimationFrame(go);});setTimeout(go,250);}
else{setTimeout(go,0);}
setTimeout(retry,8000);
setTimeout(function(){if(up())return;var w=document.getElementById('mc-pre-retry'),a=document.getElementById('mc-pre-retry-a'),x=document.getElementById('mc-pre-err');
if(a)a.onclick=function(){var s=location.search.replace(/[?&]mcr=\\d+/,'');location.replace(location.pathname+(s?s+'&':'?')+'mcr='+(Date.now()%1e6));return false;};
if(x)x.textContent=E[0]||(function(){var m=F.filter(function(f){return st[f]!==1;});return m.length?'not loaded: '+m.join(', '):'loaded, no render';})();if(w)w.style.display='block';
try{if(window.clarity)window.clarity('set','mc_kits_stuck',String(E[0]||'none').slice(0,200));}catch(e){}},15000);})();'''
b = rep(b, OLD_LOADER_TAIL, NEW_LOADER_TAIL)
open(os.path.join(HERE, "page-body.html"), "w", encoding="utf-8").write(b)
print("page-body.html", len(b), "key", key)
