#!/usr/bin/env python3
"""MC kit builder — Aura-style 3-step wizard mock (Circle-only, free scent stacking).
Run from this dir: python3 make-kit-mock.py  ->  kit-builder-mock.html
Assets are pulled from the free-diffuser LP's processed folder."""
import base64, os, json

A = os.path.join(os.path.dirname(__file__) or '.', '..', '..', 'pdp-free-diffuser', 'assets', 'processed')

def b64(fn, mime='image/jpeg'):
    with open(os.path.join(A, fn), 'rb') as fh:
        return f'data:{mime};base64,' + base64.b64encode(fh.read()).decode()

IMG = {
    'hero': b64('hotel.jpg'),
    'diffuser': b64('diseno-87.jpg'),
    'logo': b64('logo-black-trim.png', 'image/png'),
    **{f'frag{i}': b64(f'frag{i}.jpg') for i in range(1, 8)},
}

FRAGS = [
    {"key":"love","name":"Golden Blossom Harmony","int":"Love","img":"frag2","top":True,
     "grad":"linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)","ings":"🌼 Buttercup  🌸 Honeysuckle  🌻 Sunflower",
     "tags":[["Cozy","#8A5A2B"],["Entertaining Guests","#6E4B8E"],["Warm & Sweet","#9C6414"]]},
    {"key":"abundance","name":"Crisp Citrus Scape","int":"Abundance","img":"frag4","top":True,
     "grad":"linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)","ings":"🍃 Yuzu Leaf  🍊 Green Mandarin  🌲 Cypress",
     "tags":[["Energizing","#8A5F00"],["Morning Routine","#2E6E8E"],["Fresh & Clean","#2F6F6A"]]},
    {"key":"focus","name":"Chilled Citrus","int":"Relaxation & Concentration","img":"frag6","top":False,
     "grad":"linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)","ings":"🪻 Chilled Lavender  🌿 Eucalyptus  🍋 White Citrus",
     "tags":[["Calming","#3D6B52"],["Morning Routine","#2E6E8E"],["Fresh & Clean","#2F6F6A"]]},
    {"key":"ideas","name":"Honey Nectar","int":"Turn Ideas Into Reality","img":"frag1","top":False,
     "grad":"linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)","ings":"🥛 Ginger Milk  🌳 White Birch  🍯 Eucalyptus Honey",
     "tags":[["Cozy","#8A5A2B"],["Winding Down","#2D4059"],["Warm & Sweet","#9C6414"]]},
    {"key":"energy","name":"Euphoric Bloom","int":"Raise Energy","img":"frag3","top":False,
     "grad":"linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)","ings":"🍵 Jasmine Tea  🍑 White Peach  🪵 Sandalwood Crème",
     "tags":[["Energizing","#8A5F00"],["Entertaining Guests","#6E4B8E"],["Floral & Soft","#A84A6E"]]},
    {"key":"purify","name":"Wildwood Mystique","int":"Purification","img":"frag5","top":False,
     "grad":"linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)","ings":"🫐 Huckleberry  🌲 Wild Juniper  🌿 Mountain Fern",
     "tags":[["Calming","#3D6B52"],["Winding Down","#2D4059"],["Earthy & Woody","#6B4F44"]]},
    {"key":"midnight","name":"Midnight Sensation","int":"Love Manifestation","img":"frag7","top":True,
     "grad":"linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)","ings":"🌙 Moonflower  🌺 Night Lily  🤍 Skin Musk",
     "tags":[["Romantic","#9C3D5F"],["Date Night","#8B1A3A"],["Floral & Soft","#A84A6E"]]},
]

SPACES = [
    {"key":"studio","label":"Studio","sub":"1 diffuser — one signature space","n":1},
    {"key":"condo","label":"Condo","sub":"3 diffusers — living room, bedroom, bath","n":3,"pop":True},
    {"key":"house","label":"House","sub":"5 diffusers — every room covered","n":5},
]

frag_cards = ""
for f in FRAGS:
    pills = "".join(f'<span class="pill" style="background:{c}">{t}</span>' for t, c in f["tags"])
    top = ' <span class="troph">🏆</span>' if f["top"] else ''
    frag_cards += f'''
      <div class="fcard" data-key="{f['key']}" style="--grad:{f['grad']}">
        <div class="frow">
          <img src="{IMG[f['img']]}" alt="{f['name']}">
          <div class="ftxt"><div class="fname">{f['name']}{top}</div><div class="fint">{f['int']}</div></div>
          <div class="stepper"><button class="sub" aria-label="remove one">−</button><span class="qty">0</span><button class="add" aria-label="add one">+</button></div>
        </div>
        <div class="fings">{f['ings']}</div>
        <div class="fpills">{pills}</div>
      </div>'''

space_cards = ""
for sp in SPACES:
    pop = '<span class="pop">Most popular</span>' if sp.get("pop") else ''
    space_cards += f'''
      <label class="scard" data-n="{sp['n']}">{pop}
        <input type="radio" name="spaces" value="{sp['n']}" {'checked' if sp['n']==1 else ''}>
        <img src="{IMG['diffuser']}" alt="">
        <span class="stxt"><b>{sp['label']}</b><i>{sp['sub']}</i>
        <em><s>${sp['n']*79.95:.2f}</s> FREE with your Circle membership</em></span>
      </label>'''

html = f'''<title>Build Your Kit — Maison Croyez</title>
<style>
:root{{--cream:#FDFBF8;--ink:#1F1A17;--ink-soft:#6B5F57;--blush:#EBDCCD;--gold:#A67C3D;--green:#0A9400;--rose:#8A4B5E}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{background:var(--cream);color:var(--ink);font-family:'Be Vietnam Pro',-apple-system,'Segoe UI',sans-serif}}
.serif{{font-family:'Unna',Georgia,'Times New Roman',serif}}
.wrap{{display:flex;min-height:100vh}}
.side{{display:none}}
@media(min-width:900px){{.side{{display:block;flex:1;background:url('{IMG['hero']}') center/cover;position:sticky;top:0;height:100vh}}}}
.panel{{flex:1;max-width:620px;margin:0 auto;padding:0 18px 120px}}
.banner{{background:var(--ink);color:#F5EFE6;text-align:center;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;padding:8px 12px;font-weight:700}}
.top{{display:flex;justify-content:center;padding:14px 0 4px}}.top img{{height:26px}}
h1{{font-family:'Unna',Georgia,serif;font-weight:700;text-align:center;font-size:1.7rem;margin:10px 0 2px}}
.h1sub{{text-align:center;color:var(--gold);font-weight:700;font-size:.95rem;margin-bottom:10px}}
.prog{{max-width:280px;margin:0 auto 4px;height:4px;background:#EBDCCD;border-radius:99px;overflow:hidden}}
.prog i{{display:block;height:100%;background:var(--ink);transition:width .35s;border-radius:99px}}
.pstep{{text-align:center;font-size:.7rem;letter-spacing:.12em;color:var(--ink-soft);text-transform:uppercase;font-weight:700;margin-bottom:14px}}
.steptitle{{font-family:'Unna',Georgia,serif;font-size:1.35rem;font-weight:700;text-align:center;margin:6px 0 12px}}
.step{{display:none}}.step.on{{display:block;animation:fade .3s}}
@keyframes fade{{from{{opacity:0;transform:translateY(8px)}}to{{opacity:1;transform:none}}}}
/* step 1 */
.scard{{display:flex;gap:12px;align-items:center;border:2px solid var(--blush);border-radius:16px;padding:13px 14px;margin-bottom:10px;cursor:pointer;position:relative;background:#fff}}
.scard input{{accent-color:var(--ink);width:18px;height:18px;flex:0 0 auto}}
.scard img{{width:52px;height:52px;object-fit:cover;border-radius:10px}}
.scard .stxt{{display:flex;flex-direction:column;gap:2px}}
.scard b{{font-size:1.02rem}}.scard i{{font-style:normal;color:var(--ink-soft);font-size:.82rem}}
.scard em{{font-style:normal;font-size:.78rem;font-weight:700;color:var(--gold)}}
.scard em s{{color:var(--ink-soft);font-weight:500;margin-right:4px}}
.scard:has(input:checked){{border-color:var(--ink);background:#FBF6EE}}
.pop{{position:absolute;top:-9px;right:14px;background:var(--gold);color:#fff;border-radius:99px;font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px}}
/* step 2 */
.fcard{{border:2px solid var(--blush);border-radius:16px;padding:11px 12px;margin-bottom:9px;background:#fff;display:flex;flex-direction:column;gap:7px}}
.fcard.picked{{border-color:var(--ink);background:var(--grad)}}
.frow{{display:flex;gap:10px;align-items:center}}
.frow img{{width:44px;height:44px;border-radius:8px;object-fit:cover;flex:0 0 44px}}
.ftxt{{flex:1;min-width:0}}
.fname{{font-weight:700;font-size:.92rem}}
.fint{{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;font-size:.6rem;color:var(--rose)}}
.fings{{font-weight:700;font-size:.8rem}}
.fpills{{display:flex;flex-wrap:wrap;gap:5px}}
.pill{{display:inline-flex;padding:4px 11px;border-radius:999px;font-size:.68rem;font-weight:700;color:#fff;white-space:nowrap}}
.stepper{{display:flex;align-items:center;gap:8px;flex:0 0 auto}}
.stepper button{{width:30px;height:30px;border-radius:50%;border:2px solid var(--ink);background:#fff;font-size:1.05rem;font-weight:700;cursor:pointer;line-height:1}}
.stepper .qty{{min-width:16px;text-align:center;font-weight:700}}
.fcard:not(.picked) .sub{{opacity:.25;pointer-events:none}}
/* step 3 */
.sumbox{{border:2px solid var(--blush);border-radius:16px;background:#fff;padding:14px 16px;display:flex;flex-direction:column;gap:9px}}
.srow{{display:flex;justify-content:space-between;gap:10px;font-size:.92rem}}
.srow .free{{color:var(--gold);font-weight:700}}
.srow s{{color:var(--ink-soft);margin-right:5px}}
.srow.total{{border-top:1.5px dashed var(--blush);padding-top:10px;font-weight:700;font-size:1.02rem}}
.snote{{font-size:.8rem;color:var(--ink-soft);line-height:1.5;margin-top:10px;text-align:center}}
.perks{{margin:12px 0;display:flex;flex-direction:column;gap:6px;font-size:.88rem}}
.perks li{{list-style:none;padding-left:22px;position:relative}}
.perks li::before{{content:"✓";position:absolute;left:0;color:var(--green);font-weight:700}}
/* nav + cta */
.navrow{{display:flex;gap:10px;margin-top:14px}}
.back{{border:2px solid var(--ink);background:#fff;color:var(--ink);border-radius:12px;padding:14px 16px;font-weight:700;cursor:pointer;font-size:.95rem}}
.cta{{flex:1;background:var(--ink);color:#fff;border:0;border-radius:12px;padding:15px 16px;font-weight:800;letter-spacing:.04em;font-size:.98rem;cursor:pointer;text-transform:uppercase}}
.cta.green{{background:var(--green)}}
.cta:disabled{{opacity:.4;cursor:not-allowed}}
.stickybar{{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1.5px solid var(--blush);padding:10px 16px;display:none;z-index:50}}
.stickybar.on{{display:flex;gap:12px;align-items:center;justify-content:space-between;max-width:620px;margin:0 auto}}
.sb-l{{font-size:.8rem;line-height:1.35}}
.sb-l b{{font-size:.95rem}}
.toast{{position:fixed;left:50%;transform:translateX(-50%);bottom:90px;background:var(--ink);color:#fff;border-radius:12px;padding:12px 18px;font-size:.85rem;max-width:90vw;opacity:0;transition:opacity .3s;z-index:99;text-align:center}}
.toast.on{{opacity:1}}
.hint{{text-align:center;font-size:.8rem;color:var(--ink-soft);margin:2px 0 12px}}
</style>
<div class="banner">Every diffuser FREE with your Circle membership</div>
<div class="wrap">
  <div class="side"></div>
  <div class="panel">
    <div class="top"><img src="{IMG['logo']}" alt="Maison Croyez"></div>
    <h1>Build your manifestation kit</h1>
    <div class="h1sub">Diffusers free · Scents $39.95/mo each · Cancel anytime</div>
    <div class="prog"><i id="bar" style="width:33%"></i></div>
    <div class="pstep"><span id="pnum">1</span> of 3</div>

    <section class="step on" id="s1">
      <div class="steptitle">How many spaces are you scenting?</div>
      {space_cards}
      <div class="navrow"><button class="cta" onclick="go(2)">Choose your scents ➔</button></div>
    </section>

    <section class="step" id="s2">
      <div class="steptitle">Stack your intentions:</div>
      <div class="hint" id="hint2">Pick at least <b>1</b> scent — one per diffuser. Add extras to rotate monthly.</div>
      {frag_cards}
    </section>

    <section class="step" id="s3">
      <div class="steptitle">Your kit</div>
      <div class="sumbox" id="sum"></div>
      <ul class="perks">
        <li>Diffusers ship free with your first scents</li>
        <li>Renews monthly at $39.95 per scent. Swap intentions anytime.</li>
        <li>30-day guarantee: full refund, you keep the scent free</li>
      </ul>
      <div class="navrow"><button class="back" onclick="go(2)">←</button><button class="cta green" onclick="joinToast()">Join the Circle ➔</button></div>
      <div class="snote">Secure checkout · Cancel anytime from any delivery email</div>
    </section>
  </div>
</div>
<div class="stickybar" id="sbar">
  <div class="sb-l"><b id="sb-count">0 scents</b><br><span id="sb-price">$0.00/mo</span> · diffusers free</div>
  <div style="display:flex;gap:8px">
    <button class="back" onclick="go(1)">←</button>
    <button class="cta" id="sb-next" onclick="go(3)" disabled>Review my kit ➔</button>
  </div>
</div>
<div class="toast" id="toast"></div>
<script>
var P=39.95, DV=79.95, N=1, picks={{}};
var FR={json.dumps({f["key"]:{"name":f["name"]} for f in FRAGS})};
function go(step){{
  document.querySelectorAll('.step').forEach(function(s){{s.classList.remove('on')}});
  document.getElementById('s'+step).classList.add('on');
  document.getElementById('bar').style.width=(step*33.34)+'%';
  document.getElementById('pnum').textContent=step;
  document.getElementById('sbar').classList.toggle('on', step===2);
  if(step===2){{N=+document.querySelector('input[name=spaces]:checked').value;
    document.getElementById('hint2').innerHTML='Pick at least <b>'+N+'</b> scent'+(N>1?'s':'')+' — one per diffuser. Add extras to rotate monthly.';refresh();}}
  if(step===3) buildSum();
  window.scrollTo(0,0);
}}
function count(){{var m=0;for(var k in picks)m+=picks[k];return m}}
function refresh(){{
  var m=count();
  document.getElementById('sb-count').textContent=m+' scent'+(m===1?'':'s')+' · '+N+' diffuser'+(N===1?'':'s');
  document.getElementById('sb-price').textContent='$'+(m*P).toFixed(2)+'/mo';
  document.getElementById('sb-next').disabled=m<N;
  document.getElementById('sb-next').textContent=m<N?('Pick '+(N-m)+' more ➔'):'Review my kit ➔';
}}
document.querySelectorAll('.fcard').forEach(function(c){{
  var k=c.dataset.key;
  c.querySelector('.add').onclick=function(){{picks[k]=(picks[k]||0)+1;c.classList.add('picked');c.querySelector('.qty').textContent=picks[k];refresh();}};
  c.querySelector('.sub').onclick=function(){{picks[k]=Math.max(0,(picks[k]||0)-1);c.querySelector('.qty').textContent=picks[k];if(!picks[k])c.classList.remove('picked');refresh();}};
}});
function buildSum(){{
  var h='',m=count();
  for(var k in picks) if(picks[k]) h+='<div class="srow"><span>'+picks[k]+' × '+FR[k].name+' <span style="color:var(--ink-soft)">(100ml/mo)</span></span><span>$'+(picks[k]*P).toFixed(2)+'/mo</span></div>';
  h+='<div class="srow"><span>'+N+' × Maison Croyez Diffuser</span><span class="free"><s>$'+(N*DV).toFixed(2)+'</s> FREE</span></div>';
  h+='<div class="srow total"><span>Today\\u2019s total:</span><span>$'+(m*P).toFixed(2)+'</span></div>';
  document.getElementById('sum').innerHTML=h;
}}
function joinToast(){{
  var t=document.getElementById('toast'),m=count();
  t.textContent='Preview mode — on the live page this adds '+N+' free diffuser'+(N===1?'':'s')+' + '+m+' scent subscription'+(m===1?'':'s')+' ($39.95/mo each, plan: Delivered every 30 days) and opens the Circle cart drawer.';
  t.classList.add('on');setTimeout(function(){{t.classList.remove('on')}},5200);
}}
</script>
'''
out = os.path.join(os.path.dirname(__file__) or '.', 'kit-builder-mock.html')
with open(out, 'w') as f:
    f.write(html)
print('kit-builder-mock.html', os.path.getsize(out)//1024, 'KB')
