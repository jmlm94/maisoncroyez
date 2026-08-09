#!/usr/bin/env python3
"""MC kit builder v2 — 3-step Circle-only wizard in the main-PDP brand system.
Run from this dir: python3 make-kit-mock.py  ->  kit-builder-mock.html"""
import base64, os, json

A = os.path.join(os.path.dirname(__file__) or '.', '..', '..', 'pdp-free-diffuser', 'assets', 'processed')

def b64(fn, mime='image/jpeg'):
    with open(os.path.join(A, fn), 'rb') as fh:
        return f'data:{mime};base64,' + base64.b64encode(fh.read()).decode()

IMG = {
    'hero': b64('hotel.jpg'),
    'product': b64('diseno-87.jpg'),
    'room1': b64('diseno-88.jpg'),
    'room3': b64('golden-room.jpg'),
    'room5': b64('hotel2.jpg'),
    'guests': b64('guests.jpg'),
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
    {"key":"studio","label":"Studio","sub":"1 diffuser · one signature space","n":1,"img":"room1"},
    {"key":"condo","label":"Condo","sub":"3 diffusers · living room, bedroom, bath","n":3,"img":"room3","pop":True},
    {"key":"house","label":"House","sub":"5 diffusers · every room covered","n":5,"img":"room5"},
]

frag_cards = ""
for i, f in enumerate(FRAGS):
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
    if i == 2:
        frag_cards += f'''
      <div class="testi">
        <img src="{IMG['guests']}" alt="">
        <div><div class="stars">★★★★★</div>
        <p>“Seven of my friends have asked the same question — WHO lives here?”</p>
        <span>Diane R. · Verified Circle member</span></div>
      </div>'''

space_cards = ""
for sp in SPACES:
    pop = '<span class="pop">Most popular</span>' if sp.get("pop") else ''
    space_cards += f'''
      <label class="scard" data-n="{sp['n']}">{pop}
        <input type="radio" name="spaces" value="{sp['n']}" {'checked' if sp['n']==3 else ''}>
        <span class="simg"><img src="{IMG[sp['img']]}" alt=""></span>
        <span class="stxt"><b>{sp['label']}</b><i>{sp['sub']}</i>
        <em><s>${sp['n']*79.95:.2f}</s> FREE with membership</em></span>
      </label>'''

html = f'''<title>Build Your Manifestation Kit — Maison Croyez</title>
<style>
@font-face{{font-family:'Unna';font-style:normal;font-weight:700;font-display:swap;src:url(https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-f-unna-700.woff2?v=1784231284) format('woff2')}}
@font-face{{font-family:'Unna';font-style:italic;font-weight:700;font-display:swap;src:url(https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-f-unna-700i.woff2?v=1784231284) format('woff2')}}
@font-face{{font-family:'Be Vietnam Pro';font-style:normal;font-weight:400;font-display:swap;src:url(https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-f-bvp-400.woff2?v=1784231284) format('woff2')}}
@font-face{{font-family:'Outfit';font-style:normal;font-weight:700;font-display:swap;src:url(https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-f-outfit-700.woff2?v=1784231284) format('woff2')}}
:root{{--cream:#FDFBF8;--ink:#1F1A17;--ink-soft:#6B5F57;--blush:#EBDCCD;--gold:#A67C3D;--green:#0A9400;--rose:#8A4B5E;--star:#E8A33D}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{background:var(--cream);color:var(--ink);font-family:'Be Vietnam Pro',-apple-system,'Segoe UI',sans-serif}}
.wrap{{display:flex;min-height:100vh}}
.side{{display:none}}
@media(min-width:900px){{.side{{display:block;flex:1;background:url('{IMG['hero']}') center/cover;position:sticky;top:0;height:100vh}}}}
.panel{{flex:1;max-width:620px;margin:0 auto;padding:0 18px 130px}}
.banner{{background:linear-gradient(92deg,#A67C3D 0%,#B8905A 55%,#C9A25C 100%);color:#fff;text-align:center;font-family:'Outfit',sans-serif;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;padding:8px 12px;font-weight:700}}
.top{{display:flex;justify-content:center;padding:14px 0 2px}}.top img{{height:26px}}
.rating{{display:flex;justify-content:center;align-items:center;gap:8px;font-family:'Outfit',sans-serif;font-weight:700;font-size:clamp(.5rem,2.2vw,.66rem);letter-spacing:.06em;text-transform:uppercase;margin:8px 0 2px}}
.rating .stars{{color:var(--star);letter-spacing:1px}}
h1{{font-family:'Unna',Georgia,serif;font-weight:700;text-align:center;font-size:1.8rem;line-height:1.15;margin:6px 0 2px;text-wrap:balance}}
h1 em{{color:var(--gold)}}
.h1sub{{text-align:center;color:var(--ink-soft);font-size:.9rem;margin-bottom:12px}}
.h1sub b{{color:var(--ink)}}
.prog{{max-width:280px;margin:0 auto 4px;height:5px;background:var(--blush);border-radius:99px;overflow:hidden}}
.prog i{{display:block;height:100%;background:linear-gradient(92deg,#A67C3D,#C9A25C);transition:width .35s;border-radius:99px}}
.pstep{{text-align:center;font-family:'Outfit',sans-serif;font-size:.62rem;letter-spacing:.14em;color:var(--ink-soft);text-transform:uppercase;font-weight:700;margin-bottom:14px}}
.steptitle{{font-family:'Unna',Georgia,serif;font-size:1.4rem;font-weight:700;text-align:center;margin:6px 0 4px}}
.stepsub{{text-align:center;font-size:.85rem;color:var(--ink-soft);margin-bottom:14px;line-height:1.5}}
.step{{display:none}}.step.on{{display:block;animation:fade .3s}}
@keyframes fade{{from{{opacity:0;transform:translateY(8px)}}to{{opacity:1;transform:none}}}}
.heroshot{{width:100%;border-radius:16px;margin:0 0 14px;display:block}}
@media(min-width:900px){{.heroshot{{display:none}}}}
/* step 1 */
.scard{{display:flex;gap:12px;align-items:center;border:2px solid var(--blush);border-radius:16px;padding:12px;margin-bottom:10px;cursor:pointer;position:relative;background:#fff}}
.scard input{{accent-color:var(--ink);width:18px;height:18px;flex:0 0 auto}}
.scard .simg{{flex:0 0 84px}}
.scard .simg img{{width:84px;height:66px;object-fit:cover;border-radius:10px;display:block}}
.scard .stxt{{display:flex;flex-direction:column;gap:2px;min-width:0}}
.scard b{{font-size:1.05rem}}
.scard i{{font-style:normal;color:var(--ink-soft);font-size:.8rem}}
.scard em{{font-style:normal;font-size:.78rem;font-weight:700;color:var(--gold)}}
.scard em s{{color:var(--ink-soft);font-weight:500;margin-right:4px}}
.scard:has(input:checked){{border-color:var(--gold);background:#FBF6EE;box-shadow:0 2px 12px rgba(166,124,61,.14)}}
.pop{{position:absolute;top:-9px;right:14px;background:var(--gold);color:#fff;border-radius:99px;font-family:'Outfit',sans-serif;font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px}}
/* step 2 */
.fcard{{border:2px solid var(--blush);border-radius:16px;padding:11px 12px;margin-bottom:9px;background:#fff;display:flex;flex-direction:column;gap:7px}}
.fcard.picked{{border-color:var(--ink);background:var(--grad)}}
.frow{{display:flex;gap:10px;align-items:center}}
.frow img{{width:48px;height:48px;border-radius:9px;object-fit:cover;flex:0 0 48px}}
.ftxt{{flex:1;min-width:0}}
.fname{{font-weight:700;font-size:.92rem}}
.fint{{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;font-size:.6rem;color:var(--rose)}}
.fings{{font-weight:700;font-size:.8rem}}
.fpills{{display:flex;flex-wrap:wrap;gap:5px}}
.pill{{display:inline-flex;padding:4px 11px;border-radius:999px;font-size:.68rem;font-weight:700;color:#fff;white-space:nowrap;line-height:1.35}}
.stepper{{display:flex;align-items:center;gap:8px;flex:0 0 auto}}
.stepper button{{width:32px;height:32px;border-radius:50%;border:2px solid var(--ink);background:#fff;font-size:1.1rem;font-weight:700;cursor:pointer;line-height:1}}
.fcard.picked .add{{background:var(--ink);color:#fff}}
.stepper .qty{{min-width:16px;text-align:center;font-weight:700}}
.fcard:not(.picked) .sub{{opacity:.25;pointer-events:none}}
.testi{{display:flex;gap:12px;align-items:center;background:#FBF6EE;border:1.5px solid #E2D2AC;border-radius:16px;padding:12px 14px;margin:12px 0}}
.testi img{{width:64px;height:64px;object-fit:cover;border-radius:12px;flex:0 0 64px}}
.testi .stars{{color:var(--star);font-size:.8rem;letter-spacing:2px}}
.testi p{{font-family:'Unna',Georgia,serif;font-style:italic;font-weight:700;font-size:.98rem;line-height:1.35;margin:2px 0}}
.testi span{{font-size:.72rem;color:var(--ink-soft)}}
/* step 3 */
.sumbox{{border:2px solid #E2D2AC;border-radius:16px;background:#F5EEDD;padding:14px 16px;display:flex;flex-direction:column;gap:9px}}
.srow{{display:flex;justify-content:space-between;gap:10px;font-size:.92rem}}
.srow .free{{color:var(--gold);font-weight:700;white-space:nowrap}}
.srow s{{color:var(--ink-soft);margin-right:5px}}
.srow.total{{border-top:1.5px dashed #DECBA0;padding-top:10px;font-weight:700;font-size:1.05rem}}
.valline{{text-align:center;font-size:.85rem;margin:10px 0 0;color:var(--ink-soft)}}
.valline b{{color:var(--green)}}
.perks{{margin:14px 0 4px;display:flex;flex-direction:column;gap:7px;font-size:.9rem}}
.perks li{{list-style:none;padding-left:24px;position:relative;line-height:1.45}}
.perks li::before{{content:"✓";position:absolute;left:2px;color:var(--green);font-weight:700}}
.trust{{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);border-top:1px solid var(--blush);border-bottom:1px solid var(--blush);padding:10px 4px;margin:14px 0}}
/* nav + cta */
.navrow{{display:flex;gap:10px;margin-top:16px}}
.back{{border:2px solid var(--ink);background:#fff;color:var(--ink);border-radius:12px;padding:14px 16px;font-weight:700;cursor:pointer;font-size:.95rem}}
.cta{{flex:1;background:var(--green);color:#fff;border:0;border-radius:12px;padding:16px;font-weight:800;letter-spacing:.04em;font-size:1rem;cursor:pointer;text-transform:uppercase;box-shadow:0 4px 14px rgba(10,148,0,.25)}}
.cta:disabled{{opacity:.4;cursor:not-allowed;box-shadow:none}}
.urg{{text-align:center;font-size:.8rem;font-weight:700;color:var(--rose);margin-top:10px}}
.stickybar{{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1.5px solid var(--blush);padding:10px 16px;display:none;z-index:50;box-shadow:0 -4px 18px rgba(31,26,23,.08)}}
.stickybar.on{{display:block}}
.sb-in{{display:flex;gap:12px;align-items:center;justify-content:space-between;max-width:620px;margin:0 auto}}
.sb-l{{font-size:.78rem;line-height:1.35;color:var(--ink-soft)}}
.sb-l b{{font-size:.95rem;color:var(--ink)}}
.toast{{position:fixed;left:50%;transform:translateX(-50%);bottom:96px;background:var(--ink);color:#fff;border-radius:12px;padding:12px 18px;font-size:.85rem;max-width:90vw;opacity:0;transition:opacity .3s;z-index:99;text-align:center}}
.toast.on{{opacity:1}}
</style>
<div class="banner">Every diffuser FREE with your Circle membership</div>
<div class="wrap">
  <div class="side"></div>
  <div class="panel">
    <div class="top"><img src="{IMG['logo']}" alt="Maison Croyez"></div>
    <div class="rating"><span class="stars">★★★★★</span> 2,500+ guests asked “what’s that smell?” so far!</div>
    <h1>Build your <em>Manifestation Kit.</em></h1>
    <div class="h1sub">Diffusers <b>free</b> · Scents <b>$39.95/mo</b> each · Cancel anytime</div>
    <div class="prog"><i id="bar" style="width:33%"></i></div>
    <div class="pstep"><span id="pnum">1</span> of 3</div>

    <section class="step on" id="s1">
      <img class="heroshot" src="{IMG['product']}" alt="Maison Croyez diffuser">
      <div class="steptitle">How many spaces are you scenting?</div>
      <div class="stepsub">One diffuser covers up to 600 sq ft for over 30 days — pick your home size.</div>
      {space_cards}
      <div class="trust"><span>🚚 Free shipping</span><span>🛡️ 30-day guarantee</span><span>🔄 Cancel anytime</span></div>
      <div class="navrow"><button class="cta" onclick="go(2)">Choose your scents ➔</button></div>
    </section>

    <section class="step" id="s2">
      <div class="steptitle">Stack your intentions:</div>
      <div class="stepsub" id="hint2">Pick at least <b>1</b> scent — one per diffuser. Add extras to rotate monthly.</div>
      {frag_cards}
    </section>

    <section class="step" id="s3">
      <div class="steptitle">Your kit is ready.</div>
      <div class="stepsub">Everything ships together, free.</div>
      <div class="sumbox" id="sum"></div>
      <div class="valline" id="valline"></div>
      <ul class="perks">
        <li><b>Your diffusers ship free</b> with your first scents — on your third delivery they’re permanently yours.</li>
        <li>Renews monthly at $39.95 per scent. <b>Swap intentions anytime.</b></li>
        <li><b>30-day guarantee:</b> full refund, prepaid return label, and the scent stays with you.</li>
      </ul>
      <div class="trust"><span>🔒 Secure checkout</span><span>🚚 Free shipping</span><span>🛡️ 1-year warranty</span></div>
      <div class="navrow"><button class="back" onclick="go(2)">←</button><button class="cta" onclick="joinToast()">Join the Circle ➔</button></div>
      <div class="urg">Only 19 free-diffuser kits left!</div>
    </section>
  </div>
</div>
<div class="stickybar" id="sbar"><div class="sb-in">
  <div class="sb-l"><b id="sb-count">0 scents</b><br><span id="sb-price">$0.00/mo</span> · diffusers free</div>
  <div style="display:flex;gap:8px">
    <button class="back" onclick="go(1)">←</button>
    <button class="cta" id="sb-next" onclick="go(3)" disabled>Review my kit ➔</button>
  </div>
</div></div>
<div class="toast" id="toast"></div>
<script>
var P=39.95, DV=79.95, N=3, picks={{}};
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
  document.getElementById('valline').innerHTML='That\\u2019s <b>$'+(m*P+N*DV).toFixed(2)+' of value</b> \\u2014 you pay $'+(m*P).toFixed(2)+' today.';
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
