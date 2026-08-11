#!/usr/bin/env python3
"""MC kit builder v3 — 3-step Circle-only wizard, exact free-diffuser LP branding.
Fonts inlined (real Unna/Outfit/BVP), tokens + component CSS lifted from the LP stylesheet.
Run from this dir: python3 make-kit-mock.py  ->  kit-builder-mock.html"""
import base64, os, json

HERE = os.path.dirname(__file__) or '.'
A = os.path.join(HERE, '..', '..', 'pdp-free-diffuser', 'assets', 'processed')
FONTS = open(os.path.join(HERE, 'fonts-inline.css')).read()

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
     "grad":"linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)","ings":"Buttercup, Honeysuckle & Sunflower",
     "tags":[["Cozy","#8A5A2B"],["Entertaining Guests","#6E4B8E"],["Warm & Sweet","#9C6414"]]},
    {"key":"abundance","name":"Crisp Citrus Scape","int":"Abundance","img":"frag4","top":True,
     "grad":"linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)","ings":"Yuzu Leaf, Green Mandarin & Cypress",
     "tags":[["Energizing","#8A5F00"],["Morning Routine","#2E6E8E"],["Fresh & Clean","#2F6F6A"]]},
    {"key":"focus","name":"Chilled Citrus","int":"Relaxation & Concentration","img":"frag6","top":False,
     "grad":"linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)","ings":"Chilled Lavender, Eucalyptus & White Citrus",
     "tags":[["Calming","#3D6B52"],["Morning Routine","#2E6E8E"],["Fresh & Clean","#2F6F6A"]]},
    {"key":"ideas","name":"Honey Nectar","int":"Turn Ideas Into Reality","img":"frag1","top":False,
     "grad":"linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)","ings":"Ginger Milk, White Birch & Eucalyptus Honey",
     "tags":[["Cozy","#8A5A2B"],["Winding Down","#2D4059"],["Warm & Sweet","#9C6414"]]},
    {"key":"energy","name":"Euphoric Bloom","int":"Raise Energy","img":"frag3","top":False,
     "grad":"linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)","ings":"Jasmine Tea, White Peach & Sandalwood Crème",
     "tags":[["Energizing","#8A5F00"],["Entertaining Guests","#6E4B8E"],["Floral & Soft","#A84A6E"]]},
    {"key":"purify","name":"Wildwood Mystique","int":"Purification","img":"frag5","top":False,
     "grad":"linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)","ings":"Huckleberry, Wild Juniper & Mountain Fern",
     "tags":[["Calming","#3D6B52"],["Winding Down","#2D4059"],["Earthy & Woody","#6B4F44"]]},
    {"key":"midnight","name":"Midnight Sensation","int":"Love Manifestation","img":"frag7","top":True,
     "grad":"linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)","ings":"Moonflower, Night Lily & Skin Musk",
     "tags":[["Romantic","#9C3D5F"],["Date Night","#8B1A3A"],["Floral & Soft","#A84A6E"]]},
]

SPACES = [
    {"key":"living","label":"Living Room","n":1,"img":"room1",
     "lis":["1 free diffuser — your signature space, covered.","Covers up to 600 sq ft · 2,500+ homes scented."]},
    {"key":"bedroom","label":"Living Room & Bedroom","n":2,"img":"room3",
     "lis":["2 free diffusers — where you host and where you rest.","Each covers up to 600 sq ft · 2,500+ homes scented."]},
    {"key":"kitchen","label":"Living Room, Bedroom & Kitchen","n":3,"img":"room5","pop":True,
     "lis":["3 free diffusers — your whole home holds the scent.","Each covers up to 600 sq ft · 2,500+ homes scented."]},
]

frag_cards = ""
for i, f in enumerate(FRAGS):
    pills = "".join(f'<span class="tagpill" style="background:{c}">{t}</span>' for t, c in f["tags"])
    top = ' 🏆' if f["top"] else ''
    frag_cards += f'''
      <div class="pick" data-key="{f['key']}" style="--grad:{f['grad']}">
        <div class="pick-row">
          <img src="{IMG[f['img']]}" alt="{f['name']}">
          <span class="pick-txt"><span class="pick-name">{f['name']}{top}</span><span class="pick-int">{f['int']}</span></span>
          <span class="stepper"><button class="sub" aria-label="remove one">−</button><span class="qty">0</span><button class="add" aria-label="add one">+</button></span>
        </div>
        <span class="pick-desc"><b class="pick-ings">{f['ings']}</b></span>
        <span class="pick-tags">{pills}</span>
      </div>'''

space_cards = ""
for sp in SPACES:
    pop = '<span class="plan-badge">Most popular</span>' if sp.get("pop") else ''
    lis = "".join(f'<li>{x}</li>' for x in sp["lis"])
    space_cards += f'''
      <button class="plan{' on' if sp['n']==3 else ''}" data-n="{sp['n']}" type="button">{pop}
        <span class="plan-flex">
          <img class="plan-img" src="{IMG[sp['img']]}" alt="">
          <span class="plan-info">
            <span class="plan-head"><span class="plan-name">{sp['label']}</span></span>
            <span class="plan-price"><s>${sp['n']*79.95:.2f}</s> <b>FREE</b></span>
            <ul>{lis}</ul>
          </span>
        </span>
      </button>'''

html = f'''<title>Build Your Manifestation Kit — Maison Croyez</title>
<style>
{FONTS}
:root{{
  --blush:#ECDFDE;--blush-soft:#F3EAE8;--rosewood:#C4A59F;--rosewood-deep:#8A5B52;
  --cream:#F9F5F0;--ivory:#FFFFFF;--cta:#0A9400;--ink:#241C18;--ink-soft:#5C4F48;
  --star:#F5B301;--gold:#A67C3D;
}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{background:var(--cream);color:var(--ink);font-family:'Be Vietnam Pro',-apple-system,'Segoe UI',sans-serif;line-height:1.45}}
.wrap{{display:flex;min-height:100vh}}
.side{{display:none}}
@media(min-width:900px){{.side{{display:block;flex:1;background:url('{IMG['hero']}') center/cover;position:sticky;top:0;height:100vh}}}}
.panel{{flex:1;max-width:560px;margin:0 auto;padding:0 16px 130px}}
.banner{{background:linear-gradient(92deg,#A67C3D 0%,#B8905A 55%,#C9A25C 100%);color:#fff;text-align:center;font-family:'Outfit',sans-serif;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;padding:8px 12px;font-weight:700}}
.top{{display:flex;justify-content:center;padding:14px 0 2px}}.top img{{height:29px}}
.rating{{display:flex;justify-content:center;align-items:center;gap:8px;font-family:'Outfit',sans-serif;font-weight:700;font-size:clamp(.5rem,2.05vw,.64rem);letter-spacing:.05em;text-transform:uppercase;margin:10px 0 2px;white-space:nowrap}}
.rating .stars{{color:var(--star);letter-spacing:1px}}
h1{{font-family:'Unna',Georgia,serif;font-weight:700;text-align:center;font-size:2rem;line-height:1.12;margin:6px 0 4px;text-wrap:balance}}
h1 em{{color:var(--ink);font-style:italic}}
.h1sub{{text-align:center;color:var(--ink-soft);font-size:.9rem;margin-bottom:12px}}
.h1sub b{{color:var(--ink);font-weight:700}}
.prog{{max-width:260px;margin:0 auto 5px;height:5px;background:var(--blush);border-radius:99px;overflow:hidden}}
.prog i{{display:block;height:100%;background:var(--ink);transition:width .35s;border-radius:99px}}
.pstep{{text-align:center;font-family:'Outfit',sans-serif;font-size:.6rem;letter-spacing:.16em;color:var(--rosewood-deep);text-transform:uppercase;font-weight:700;margin-bottom:14px}}
.steptitle{{font-family:'Unna',Georgia,serif;font-size:1.5rem;font-weight:700;text-align:center;margin:6px 0 4px;line-height:1.15}}
.steptitle em{{color:var(--ink);font-style:italic}}
.stepsub{{text-align:center;font-size:.88rem;color:var(--ink-soft);margin-bottom:14px;line-height:1.5}}
.step{{display:none}}.step.on{{display:block;animation:fade .3s}}
@keyframes fade{{from{{opacity:0;transform:translateY(8px)}}to{{opacity:1;transform:none}}}}
.heroshot{{width:100%;border-radius:14px;margin:0 0 14px;display:block}}
@media(min-width:900px){{.heroshot{{display:none}}}}
/* step 1 — LP plan cards */
.plansel{{display:flex;flex-direction:column;gap:14px;margin-top:8px}}
.plan{{position:relative;overflow:visible;text-align:left;background:#fff;border:1.5px solid rgba(36,28,24,.16);border-radius:14px;padding:14px 15px;display:flex;flex-direction:column;gap:9px;color:var(--ink);cursor:pointer;font:inherit;transition:border-color .15s ease,box-shadow .15s ease,background .15s ease;width:100%}}
.plan.on{{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink),0 6px 16px rgba(36,28,24,.10);background:var(--blush-soft)}}
.plan-badge{{position:absolute;top:-10px;left:14px;background:#A67C3D;color:#fff;border-radius:999px;padding:4px 11px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.56rem;letter-spacing:.09em;text-transform:uppercase;box-shadow:0 2px 8px rgba(166,124,61,.3)}}
.plan-flex{{display:flex;gap:12px;align-items:flex-start}}
.plan-img{{width:88px;height:88px;object-fit:cover;border-radius:10px;flex:0 0 88px}}
.plan-info{{display:flex;flex-direction:column;gap:5px;min-width:0}}
.plan-head{{display:flex;justify-content:space-between;align-items:baseline;gap:10px}}
.plan-name{{font-family:'Outfit',sans-serif;font-weight:700;font-size:1.05rem}}
.plan-price{{font-family:'Outfit',sans-serif;font-weight:800;font-size:.95rem;white-space:nowrap}}
.plan-price s{{color:var(--ink-soft);font-weight:600;margin-right:4px}}
.plan-price b{{color:var(--cta)}}
.plan ul{{list-style:none;display:flex;flex-direction:column;gap:6px}}
.plan li{{font-size:.88rem;line-height:1.45;padding-left:15px;position:relative}}
.plan li::before{{content:"";position:absolute;left:2px;top:.55em;width:5px;height:5px;border-radius:50%;background:#A67C3D}}
/* step 2 — LP pick cards */
.picker{{display:flex;flex-direction:column;gap:8px}}
.pick{{display:flex;flex-direction:column;gap:8px;width:100%;text-align:left;border:1.5px solid var(--blush);border-radius:14px;padding:11px 12px;background:var(--ivory);transition:border-color .15s ease}}
.pick.on{{border-color:var(--ink);background:var(--grad)}}
.pick-row{{display:flex;align-items:center;gap:12px}}
.pick-row img{{width:44px;height:44px;border-radius:8px;object-fit:cover;flex:0 0 44px}}
.pick-txt{{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}}
.pick-name{{font-weight:700;font-size:.92rem}}
.pick-int{{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.1em;font-size:.6rem;color:var(--rosewood-deep)}}
.pick-ings{{font-weight:700;color:var(--ink);font-size:.8rem}}
.pick-tags{{display:flex;flex-wrap:wrap;gap:5px}}
.tagpill{{display:inline-flex;align-items:center;padding:4px 11px;border-radius:999px;font-size:.68rem;font-weight:700;color:#fff;line-height:1.35;white-space:nowrap}}
.stepper{{display:flex;align-items:center;gap:8px;flex:0 0 auto}}
.stepper button{{width:32px;height:32px;border-radius:50%;border:2px solid var(--rosewood);background:#fff;color:var(--ink);font-size:1.1rem;font-weight:700;cursor:pointer;line-height:1}}
.pick.on .stepper button{{border-color:var(--ink)}}
.pick.on .add{{background:var(--ink);color:#fff}}
.stepper .qty{{min-width:16px;text-align:center;font-weight:700}}
.pick:not(.on) .sub{{opacity:.25;pointer-events:none}}
/* usp chips — main-PDP style */
.usp3{{display:flex;gap:8px;margin:14px 0 2px}}
.usp3 .usp{{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;border-radius:12px;padding:11px 6px 10px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.07em;text-transform:uppercase;text-align:center;color:var(--ink);line-height:1.35}}
.usp3 .usp-ic{{width:38px;height:38px;border-radius:99px;display:flex;align-items:center;justify-content:center;font-size:19px}}
.usp3 .usp-tx{{white-space:pre-line}}
.usp3 .usp:nth-child(1) .usp-ic{{background:linear-gradient(145deg,#D8ECF3 0%,#B7D9E8 100%)}}
.usp3 .usp:nth-child(2) .usp-ic{{background:linear-gradient(145deg,#FBE3C9 0%,#F6C99B 100%)}}
.usp3 .usp:nth-child(3) .usp-ic{{background:linear-gradient(145deg,#DFF3D8 0%,#BCE4C0 100%)}}
.usp3 .usp:nth-child(1){{background:rgba(183,217,232,.16)}}
.usp3 .usp:nth-child(2){{background:rgba(246,201,155,.16)}}
.usp3 .usp:nth-child(3){{background:rgba(188,228,192,.16)}}
/* testimonial — LP gold box */
.exitfeat{{display:flex;gap:11px;align-items:center;background:#fff;border:1.5px solid #DECBA0;border-radius:14px;padding:13px 15px;font-size:.92rem;line-height:1.55;text-align:left;color:var(--ink);margin:12px 0}}
/* step 3 — LP valstack */
.valstack{{border:1.5px solid #E2D2AC;border-radius:14px;background:#F5EEDD;padding:14px 16px;display:flex;flex-direction:column;gap:9px}}
.vrow{{display:flex;justify-content:space-between;gap:10px;font-size:.92rem}}
.vrow .vfree{{color:var(--cta);font-weight:700;white-space:nowrap}}
.vrow s{{color:var(--ink-soft);margin-right:5px}}
.vrow.total{{border-top:1.5px dashed #DECBA0;padding-top:10px;font-weight:700;font-size:1.05rem}}
.valline{{text-align:center;font-size:.86rem;margin:10px 0 0;color:var(--ink-soft)}}
.valline b{{color:var(--cta)}}
.offer-terms{{display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:#F7F3EE;border:1px solid var(--blush);border-radius:14px;margin:14px 0 4px}}
.term-row{{display:flex;gap:11px;align-items:flex-start;font-size:.9rem;line-height:1.5;text-align:left}}
.term-ic{{flex:0 0 auto;font-size:1.05rem;line-height:1.4}}
.term-row strong{{font-weight:700}}
.trust-strip{{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);border-top:1px solid var(--blush);border-bottom:1px solid var(--blush);padding:11px 4px;margin:14px 0}}
/* review-step blocks */
.due{{display:flex;flex-direction:column;align-items:center;gap:1px;margin:2px 0 12px;text-align:center}}
.due-k{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--rosewood-deep)}}
.due-v{{font-family:'Unna',Georgia,serif;font-weight:700;font-size:2.4rem;line-height:1.05}}
.due-sub{{font-size:.8rem;color:var(--ink-soft)}}
.hiw{{display:flex;flex-direction:column;gap:9px;margin:14px 0 4px}}
.hiw-row{{display:flex;gap:12px;align-items:flex-start;font-size:.88rem;line-height:1.5;background:#fff;border:1.5px solid var(--blush);border-radius:12px;padding:10px 13px}}
.hiw-k{{flex:0 0 88px;font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.07em;font-size:.62rem;color:var(--rosewood-deep);padding-top:3px}}
.nolock{{margin:12px 0 2px;background:#EAF7E6;border:1.5px solid #BFE3B4;border-radius:12px;padding:11px 13px;font-size:.86rem;line-height:1.5}}
.perkhead{{font-family:'Unna',Georgia,serif;font-weight:700;font-size:1.15rem;margin:16px 0 8px;text-align:center}}
.faqs{{display:flex;flex-direction:column;gap:7px;margin:4px 0 8px}}
.faqs details{{background:#fff;border:1.5px solid var(--blush);border-radius:12px;padding:11px 14px}}
.faqs summary{{font-weight:700;font-size:.9rem;cursor:pointer;list-style:none;position:relative;padding-right:22px}}
.faqs summary::after{{content:"+";position:absolute;right:0;top:0;font-weight:700;color:var(--rosewood-deep)}}
.faqs details[open] summary::after{{content:"−"}}
.faqs p{{font-size:.86rem;color:var(--ink-soft);line-height:1.55;margin-top:7px}}
.cd{{display:inline-block;min-width:74px;font-variant-numeric:tabular-nums;background:rgba(0,0,0,.22);border-radius:6px;padding:1px 7px;margin-left:6px}}
/* CTA — LP pill button */
.btn{{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:100%;padding:17px 26px;border-radius:999px;background:var(--cta);color:#fff;border:0;font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.86rem;box-shadow:0 12px 28px rgba(0,0,0,.28);transition:transform .15s ease,box-shadow .15s ease;text-align:center;cursor:pointer}}
.btn:hover{{transform:translateY(-1px);box-shadow:0 16px 34px rgba(0,0,0,.36)}}
.btn[disabled]{{background:#B7ABA6;box-shadow:none;cursor:not-allowed;transform:none}}
.btn .btn-sub{{font-size:.62rem;letter-spacing:.18em;opacity:.85;font-weight:700}}
.btn.secondary{{background:transparent;color:var(--ink);border:1.5px solid var(--ink);box-shadow:none;width:auto;padding:17px 20px}}
.navrow{{display:flex;gap:10px;margin-top:16px}}
.stickybar{{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1.5px solid var(--blush);padding:10px 16px;display:none;z-index:50;box-shadow:0 -4px 18px rgba(36,28,24,.08)}}
.stickybar.on{{display:block}}
.sb-in{{display:flex;gap:12px;align-items:center;justify-content:space-between;max-width:560px;margin:0 auto}}
.sb-l{{font-size:.78rem;line-height:1.35;color:var(--ink-soft)}}
.sb-l b{{font-size:.95rem;color:var(--ink)}}
.sb-in .btn{{width:auto;flex:0 0 auto;padding:13px 22px;font-size:.72rem}}
.sb-in .btn.secondary{{padding:13px 16px}}
.toast{{position:fixed;left:50%;transform:translateX(-50%);bottom:96px;background:var(--ink);color:#fff;border-radius:12px;padding:12px 18px;font-size:.85rem;max-width:90vw;opacity:0;transition:opacity .3s;z-index:99;text-align:center}}
.toast.on{{opacity:1}}
</style>
<div class="banner">GET A FREE DIFFUSER FOR EVERY SCENT YOU PICK — TODAY ONLY! <span class="cd" id="cd">23:59:59</span></div>
<div class="wrap">
  <div class="side"></div>
  <div class="panel">
    <div class="top"><img src="{IMG['logo']}" alt="Maison Croyez"></div>
    <div class="rating"><span class="stars">★★★★★</span> 2,500+ guests asked “what’s that smell?” so far!</div>
    <h1>Build your <em>Manifestation Kit.</em></h1>
    <div class="h1sub">Claim a <b>free diffuser</b> for every scent you pick. Delivers every 30 days. Pause, swap or cancel anytime.</div>
    <div class="prog"><i id="bar" style="width:33%"></i></div>
    <div class="pstep"><span id="pnum">1</span> of 3</div>

    <section class="step on" id="s1">
      <img class="heroshot" src="{IMG['product']}" alt="Maison Croyez diffuser">
      <div class="steptitle">How many spaces are you <em>scenting?</em></div>
      <div class="stepsub">One diffuser covers up to 600 sq ft for over 30 days.</div>
      <div class="plansel">{space_cards}</div>
      <div class="usp3">
        <span class="usp"><span class="usp-ic">🌬️</span><span class="usp-tx">Surprise your guests
effortlessly</span></span>
        <span class="usp"><span class="usp-ic">✨</span><span class="usp-tx">Manifest what you
want in life</span></span>
        <span class="usp"><span class="usp-ic">🌿</span><span class="usp-tx">No mold, leaking
or maintenance</span></span>
      </div>
      <div class="trust-strip"><span>🚚 Free shipping</span><span>🛡️ 30-day guarantee</span><span>🔄 Cancel anytime</span></div>
      <div class="navrow"><button class="btn" onclick="go(2)"><span>Choose your scents ➔</span></button></div>
    </section>

    <section class="step" id="s2">
      <div class="steptitle">Stack your <em>intentions:</em></div>
      <div class="stepsub" id="hint2">Pick <b>3</b> scents — every scent you pick comes with a free diffuser.</div>
      <div class="picker">{frag_cards}</div>
    </section>

    <section class="step" id="s3">
      <div class="steptitle">Your kit is <em>ready.</em></div>
      <div class="stepsub">Everything ships together, free.</div>
      <div class="due"><span class="due-k">Due today:</span><span class="due-v" id="duetoday">$0.00</span>
        <span class="due-sub">then $39.95/mo per scent · swap or cancel anytime</span></div>
      <div class="valstack" id="sum"></div>
      <div class="valline" id="valline"></div>

      <div class="hiw">
        <div class="hiw-row"><span class="hiw-k">Today</span><span>Your diffusers and first scents ship together, <strong>free</strong>. You pay only for the scents.</span></div>
        <div class="hiw-row"><span class="hiw-k">Every month</span><span>Fresh 100ml scents arrive before the last ones run out. <strong>Swap intentions anytime.</strong></span></div>
        <div class="hiw-row"><span class="hiw-k">3rd delivery</span><span>Your diffusers become <strong>permanently yours</strong> — plus a free full-size scent as a gift.</span></div>
      </div>

      <div class="nolock">✓ <strong>No lock-in. No cancellation fee.</strong> Cancel from any delivery email — unlike other “free diffuser” clubs, there’s no 6-month commitment here.</div>

      <div class="perkhead">Circle Perks</div>
      <div class="offer-terms">
        <div class="term-row"><span class="term-ic">🎁</span><span><strong>Your diffusers ship free</strong> with your first scents — on your third delivery they’re permanently yours.</span></div>
        <div class="term-row"><span class="term-ic">🔄</span><span>Renews monthly at $39.95 per scent. <strong>Swap intentions anytime.</strong></span></div>
        <div class="term-row"><span class="term-ic">🚚</span><span><strong>Free shipping, always</strong> — on every delivery and everything you add.</span></div>
        <div class="term-row"><span class="term-ic">✨</span><span><strong>First access to new scents</strong> and member-only launches.</span></div>
        <div class="term-row"><span class="term-ic">🛡️</span><span><strong>30-day guarantee:</strong> full refund, prepaid return label, and the scent stays with you.</span></div>
      </div>

      <div class="exitfeat testi">
        <img src="{IMG['guests']}" alt="">
        <div><div class="tstars">★★★★★</div>
        <p class="tq">“Seven of my friends have asked the same question — WHO lives here?”</p>
        <span class="twho">Diane R. · Verified Circle member · January 2026</span></div>
      </div>

      <div class="trust-strip"><span>🔒 Secure checkout</span><span>🚚 Free shipping</span><span>🛡️ 1-year warranty</span></div>

      <div class="faqs">
        <details><summary>When am I charged?</summary><p>Today you pay only for your scents. Then the same amount renews monthly as each new box ships. You get an email reminder before every renewal.</p></details>
        <details><summary>Can I swap scents?</summary><p>Yes — swap any of your intentions before any delivery, right from your delivery email. No calls, no forms.</p></details>
        <details><summary>What if I cancel?</summary><p>Cancel anytime from any delivery email. Within the first 30 days we refund every dollar and send a prepaid label for the diffusers — the scents stay with you.</p></details>
        <details><summary>Is it safe for pets and kids?</summary><p>Yes. 100% waterless, no heat, no mold, and organic scent compositions that are safe around your whole household.</p></details>
      </div>
      <div class="navrow"><button class="btn secondary" onclick="go(2)">←</button>
        <button class="btn" onclick="joinToast()"><span>Join the Circle ➔</span><span class="btn-sub">Only 19 free-diffuser kits left!</span></button></div>
    </section>
  </div>
</div>
<div class="stickybar on" id="sbar"><div class="sb-in">
  <div class="sb-l" id="sb-l"><b id="sb-count">3 free diffusers</b><br><span id="sb-price">selected</span></div>
  <div style="display:flex;gap:8px">
    <button class="btn secondary" id="sb-back" onclick="go(1)" style="display:none">←</button>
    <button class="btn" id="sb-next" onclick="go(2)">Choose your scents ➔</button>
  </div>
</div></div>
<div class="toast" id="toast"></div>
<script>
var P=39.95, DV=79.95, N=3, picks={{}}, STEP=1;
(function(){{var el=document.getElementById('cd');function tick(){{var now=new Date();var end=new Date(now);end.setHours(23,59,59,999);var d=Math.max(0,end-now);var h=String(Math.floor(d/3600000)).padStart(2,'0'),m=String(Math.floor(d%3600000/60000)).padStart(2,'0'),x=String(Math.floor(d%60000/1000)).padStart(2,'0');el.textContent=h+':'+m+':'+x;}}tick();setInterval(tick,1000);}})();
var FR={json.dumps({f["key"]:{"name":f["name"]} for f in FRAGS})};
document.querySelectorAll('.plan').forEach(function(p){{
  p.onclick=function(){{document.querySelectorAll('.plan').forEach(function(x){{x.classList.remove('on')}});p.classList.add('on');refresh();}};
}});
function go(step){{
  document.querySelectorAll('.step').forEach(function(s){{s.classList.remove('on')}});
  document.getElementById('s'+step).classList.add('on');
  document.getElementById('bar').style.width=(step*33.34)+'%';
  document.getElementById('pnum').textContent=step;
  STEP=step;
  if(step===2){{N=+document.querySelector('.plan.on').dataset.n;
    document.getElementById('hint2').innerHTML='Pick <b>'+N+'</b> scent'+(N>1?'s':'')+' — every scent you pick comes with a free diffuser.';}}
  if(step===3) buildSum();
  refresh();
  window.scrollTo(0,0);
}}
function count(){{var m=0;for(var k in picks)m+=picks[k];return m}}
function refresh(){{
  var m=count(), next=document.getElementById('sb-next'), back=document.getElementById('sb-back');
  var cEl=document.getElementById('sb-count'), pEl=document.getElementById('sb-price');
  if(STEP===1){{
    var n=+document.querySelector('.plan.on').dataset.n;
    cEl.textContent=n+' free diffuser'+(n===1?'':'s');pEl.textContent='selected · $0 today';
    back.style.display='none';next.disabled=false;next.textContent='Choose your scents ➔';next.onclick=function(){{go(2)}};
  }} else if(STEP===2){{
    cEl.textContent=m+' of '+N+' scents · '+N+' diffuser'+(N===1?'':'s');pEl.textContent='$'+(m*P).toFixed(2)+'/mo';
    back.style.display='';back.onclick=function(){{go(1)}};
    next.disabled=m!==N;next.textContent=m<N?('Pick '+(N-m)+' more ➔'):'Review my kit ➔';next.onclick=function(){{go(3)}};
  }} else {{
    cEl.textContent='Due today: $'+(m*P).toFixed(2);pEl.textContent=N+' free diffuser'+(N===1?'':'s')+' included';
    back.style.display='';back.onclick=function(){{go(2)}};
    next.disabled=false;next.textContent='Join the Circle ➔';next.onclick=joinToast;
  }}
  document.querySelectorAll('.pick .add').forEach(function(b){{b.disabled=m>=N&&STEP===2;b.style.opacity=(m>=N&&STEP===2)?'.25':'1'}});
}}
document.querySelectorAll('.pick').forEach(function(c){{
  var k=c.dataset.key;
  c.querySelector('.add').onclick=function(){{if(count()>=N)return;picks[k]=(picks[k]||0)+1;c.classList.add('on');c.querySelector('.qty').textContent=picks[k];refresh();}};
  c.querySelector('.sub').onclick=function(){{picks[k]=Math.max(0,(picks[k]||0)-1);c.querySelector('.qty').textContent=picks[k];if(!picks[k])c.classList.remove('on');refresh();}};
}});
function buildSum(){{
  var h='',m=count();
  for(var k in picks) if(picks[k]) h+='<div class="vrow"><span>'+picks[k]+' × '+FR[k].name+' <span style="color:var(--ink-soft)">(100ml/mo)</span></span><span>$'+(picks[k]*P).toFixed(2)+'/mo</span></div>';
  h+='<div class="vrow"><span>'+N+' × Maison Croyez Diffuser</span><span class="vfree"><s>$'+(N*DV).toFixed(2)+'</s> FREE</span></div>';
  h+='<div class="vrow total"><span>Today\\u2019s total:</span><span>$'+(m*P).toFixed(2)+'</span></div>';
  document.getElementById('sum').innerHTML=h;
  document.getElementById('valline').innerHTML='That\\u2019s <b>$'+(m*P+N*DV).toFixed(2)+' of value</b> \\u2014 you pay $'+(m*P).toFixed(2)+' today.';
  document.getElementById('duetoday').textContent='$'+(m*P).toFixed(2);
}}
function joinToast(){{
  var t=document.getElementById('toast'),m=count();
  t.textContent='Preview mode — on the live page this adds '+N+' free diffuser'+(N===1?'':'s')+' + '+m+' scent subscription'+(m===1?'':'s')+' ($39.95/mo each, plan: Delivered every 30 days) and opens the Circle cart drawer.';
  t.classList.add('on');setTimeout(function(){{t.classList.remove('on')}},5200);
}}
</script>
'''
out = os.path.join(HERE, 'kit-builder-mock.html')
with open(out, 'w') as f:
    f.write(html)
print('kit-builder-mock.html', os.path.getsize(out)//1024, 'KB')
