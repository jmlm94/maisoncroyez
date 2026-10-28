#!/usr/bin/env python3
"""dk10b (2026-10-28): the real cause of the owner's iPhone screenshot (picture only, nothing below).
The theme layout (speed round 3, theme.liquid) sets window.__MC_FD_LOADER__ and injects the page's scripts itself as
soon as theme.css applies, reading them from the page body's preload links (top of the body). On a cached repeat visit
that can happen before the parser reaches <div id="root"> (it sits after the ~32 KB inline pre-hero picture), so the app
ran ReactDOM.createRoot(null) -> "null is not an object (evaluating 'u.__k')" and the page stayed on the pre-hero.
ios-check caught it on dk10 (webkit-empty). Because the theme loader runs first, the page body's own loader exited, so
dk10's re-fetch / reload button never ran either.
- App (from live dk10 ../../mc-dk-app.js): render as soon as #root exists (poll 25 ms + DOMContentLoaded), never on null.
- Page body (from live dk10 ../../page-body.html): the loader no longer exits when the theme loader is active; it then
  skips injecting the scripts (the theme does that) but still records script errors, re-fetches at 8 s if the page has
  not rendered, and shows the reload button at 15 s.
Writes ./mc-dk-app.js and ./page-body.html (the deploy swaps the key)."""
import os
HERE = os.path.dirname(os.path.abspath(__file__)); UP = os.path.join(HERE, "..", "..")
def load(n): return open(os.path.join(UP, n), encoding="utf-8").read()
def rep(s, a, b, n=1):
    assert s.count(a) == n, (s.count(a), a[:100]); return s.replace(a, b)
s = load("mc-dk-app.js")
s = rep(s, '''ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);''',
'''/* dk10b (2026-10-28): the theme layout injects this app as soon as theme.css applies, which on a cached repeat visit can be
   before the parser has reached <div id="root">; render once #root exists instead of failing on null. */
(function mountWhenReady() {
  let done = false;
  const tryMount = () => { if (done) return true; const r = document.getElementById("root"); if (!r) return false; done = true; ReactDOM.createRoot(r).render(html`<${App}/>`); return true; };
  if (tryMount()) return;
  const iv = setInterval(() => { if (tryMount()) clearInterval(iv); }, 25);
  document.addEventListener("DOMContentLoaded", () => { if (tryMount()) clearInterval(iv); });
})();''')
open(os.path.join(HERE, "mc-dk-app.js"), "w", encoding="utf-8").write(s); print("mc-dk-app.js", len(s.encode()))
b = load("page-body.html")
b = rep(b, '''(function(){if(window.__MC_FD_LOADER__)return;window.__MC_FD_LOADER__=1;''',
           '''(function(){if(window.__MC_FD_BODY__)return;window.__MC_FD_BODY__=1;var TH=!!window.__MC_FD_LOADER__;window.__MC_FD_LOADER__=1; /* dk10b: TH = the theme layout already injects the scripts (speed round 3); this loader then only watches */''')
b = rep(b, '''var l=document.createElement('link');l.rel='stylesheet';l.href=B+'mc-dk.css?v='+v+q;
document.head.appendChild(l);''', '''if(!TH){var l=document.createElement('link');l.rel='stylesheet';l.href=B+'mc-dk.css?v='+v+q;
document.head.appendChild(l);}''')
b = rep(b, '''if(st[F[0]]===1&&st[F[1]]===1&&st[F[2]]===1)return;n++;''', '''if(!TH&&st[F[0]]===1&&st[F[1]]===1&&st[F[2]]===1)return;n++;''')
b = rep(b, '''var fired=false;var go=function(){if(!fired){fired=true;add();}};
if(window.requestAnimationFrame){requestAnimationFrame(function(){requestAnimationFrame(go);});setTimeout(go,250);}
else{setTimeout(go,0);}''', '''if(!TH){var fired=false;var go=function(){if(!fired){fired=true;add();}};
if(window.requestAnimationFrame){requestAnimationFrame(function(){requestAnimationFrame(go);});setTimeout(go,250);}
else{setTimeout(go,0);}}''')
b = rep(b, '''return m.length?'not loaded: '+m.join(', '):'loaded, no render';''', '''return TH?'no render (theme loader)':(m.length?'not loaded: '+m.join(', '):'loaded, no render');''')
open(os.path.join(HERE, "page-body.html"), "w", encoding="utf-8").write(b); print("page-body.html", len(b))
