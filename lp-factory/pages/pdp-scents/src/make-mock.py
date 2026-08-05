#!/usr/bin/env python3
"""Scents PDP mock (artifact for owner review) — /collections/power-fragrances rework.
7 scent variants of product 8176953655405 · Subscribe $39.95 (45 days, preselected) / One-time $49.95.
Design system: lp-factory/pages/pdp-free-diffuser/DESIGN-SYSTEM.md."""
import json

imgs = json.load(open('imgs.json'))
fonts = open('/home/user/maisoncroyez/lp-factory/src/fonts.css').read()
def d(name): return 'data:image/jpeg;base64,' + imgs[name]

SCENTS = [
    {"key":"love","name":"Golden Blossom Harmony","intent":"Love","img":"frag2.jpg","top":True,
     "grad":"linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)",
     "line":"For spaces that hold gratitude. For mornings that feel abundant.",
     "chips":["🌼 Buttercup","🍯 Honey","🌻 Sunflower"]},
    {"key":"abundance","name":"Crisp Citrus Scape","intent":"Abundance","img":"frag4.jpg","top":True,
     "grad":"linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)",
     "line":"For the reset. The fresh start. The energy that says: I’m ready.",
     "chips":["🍃 Yuzu Leaf","🍊 Mandarin","🌲 Cypress"]},
    {"key":"focus","name":"Chilled Citrus","intent":"Relaxation & Concentration","img":"frag6.jpg","top":False,
     "grad":"linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)",
     "line":"For mornings that need stillness before they need speed.",
     "chips":["🍃 Eucalyptus","🌿 Chilled Lavender","🍋 White Citrus"]},
    {"key":"ideas","name":"Honey Nectar","intent":"Turn Ideas Into Reality","img":"frag1.jpg","top":False,
     "grad":"linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)",
     "line":"For the couch, the blanket, the no-plans evening. Deep, unapologetic comfort.",
     "chips":["🥛 Ginger Milk","🌿 White Birch","🍯 Eucalyptus Honey"]},
    {"key":"energy","name":"Euphoric Bloom","intent":"Raise Energy","img":"frag3.jpg","top":False,
     "grad":"linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)",
     "line":"For the mood lift. The spark before the day begins. Today is yours.",
     "chips":["🌸 Jasmine Tea","🍑 White Peach","🪵 Sandalwood Crème"]},
    {"key":"purify","name":"Wildwood Mystique","intent":"Purification","img":"frag5.jpg","top":False,
     "grad":"linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)",
     "line":"For the days when you need to clear everything out and start clean.",
     "chips":["🫐 Huckleberry","🌿 Mountain Fern","🌲 Wild Juniper"]},
    {"key":"midnight","name":"Midnight Sensation","intent":"Love Manifestation","img":"frag7.jpg","top":True,
     "grad":"linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)",
     "line":"For evenings that deserve softness, warmth, and a little mystery.",
     "chips":["🌸 Moonflower","🌺 Night Lily","🤍 Skin Musk"]},
]

def pick_cards():
    out=[]
    for s in SCENTS:
        badge = '<span class="pick-badge">Top Seller</span>' if s["top"] else ''
        out.append(f'''      <button class="pick{' on' if s is SCENTS[0] else ''}" data-key="{s['key']}" data-img="{d(s['img'])}" style="background:{s['grad']}">
        {badge}<span class="pk-name">{s['name']}</span><span class="pk-int">{s['intent']}</span>
        <span class="pk-chips">{''.join('<i>'+c+'</i>' for c in s['chips'])}</span>
      </button>''')
    return '\n'.join(out)

def chapter_cards():
    out=[]
    for s in SCENTS:
        out.append(f'''      <div class="icard">
        <div class="ph" style="background:{s['grad']}"><img src="{d(s['img'])}" alt="{s['name']}" loading="lazy"></div>
        <div class="ic-int">{s['intent']}</div>
        <h3>{s['name']}</h3>
        <p>{s['line']}</p>
        <span class="pk-chips">{''.join('<i>'+c+'</i>' for c in s['chips'])}</span>
        <button class="ic-pick" data-key="{s['key']}">Choose this scent ➔</button>
      </div>''')
    return '\n'.join(out)

html = """<title>Manifestation Scents — PDP mock</title>
<style>
""" + fonts + """
:root{--blush:#ECDFDE;--blush-soft:#F3EAE8;--rosewood:#C4A59F;--rosewood-deep:#8A5B52;--rosewood-tint:#E7D6D2;--cream:#F9F5F0;--ivory:#FFFFFF;--cta:#0A9400;--ink:#241C18;--ink-soft:#5C4F48;--gold:#A67C3D;--star:#F5B301;--radius:22px;--shadow:0 10px 34px rgba(60,38,30,.12)}
*{margin:0;padding:0;box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{font-family:'Be Vietnam Pro',system-ui,sans-serif;background:var(--ivory);color:var(--ink);line-height:1.55}
img{max-width:100%;display:block}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
h1,h2,h3{font-family:'Unna',serif;font-weight:700;line-height:.95;letter-spacing:-.05em;text-wrap:balance}
.em{font-family:'Unna',serif;font-style:italic}
.wrap{max-width:640px;margin:0 auto;padding:0 20px}
.pdpwrap{max-width:1080px;margin:0 auto;padding:0 20px}
.eyebrow{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.2em;font-size:.68rem;color:var(--rosewood-deep)}
.mockbar{background:var(--ink);color:#fff;text-align:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;padding:7px 12px}
.gal{margin:14px 0 6px}
.gal .main{border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}
.pdp-head{display:flex;flex-direction:column;gap:10px;margin-top:16px}
.pdp-head h1{font-size:2.36rem}
.pdp-head .lede{color:var(--ink-soft);font-size:.95rem}
.microproof{font-family:'Outfit',sans-serif;font-weight:700;font-size:.64rem;letter-spacing:.15em;text-transform:uppercase;color:var(--ink)}
.microproof .stars{color:var(--star);letter-spacing:1px;margin-right:6px}
.price-row{display:flex;align-items:baseline;gap:12px;margin-top:2px}
.price-row .price{font-family:'Unna',serif;font-weight:700;font-size:2.5rem;line-height:1}
.price-row .compare{color:var(--ink-soft);text-decoration:line-through;font-weight:600;font-size:1.05rem}
.price-row .per{font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--rosewood-deep)}

/* USP icon chips */
.usp-row{display:flex;gap:8px;margin-top:4px}
.usp{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;border-radius:12px;padding:10px 6px 9px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink)}
.usp span{width:38px;height:38px;border-radius:99px;display:flex;align-items:center;justify-content:center;font-size:19px}
.usp .u1{background:linear-gradient(145deg,#DFF3D8 0%,#BCE4C0 100%)}
.usp .u2{background:linear-gradient(145deg,#FBE3C9 0%,#F6C99B 100%)}
.usp .u3{background:linear-gradient(145deg,#E4D9F2 0%,#CBB7EA 100%)}
.usp:nth-child(1){background:rgba(188,228,192,.18)}
.usp:nth-child(2){background:rgba(246,201,155,.18)}
.usp:nth-child(3){background:rgba(203,183,234,.18)}

/* scent picker */
.sec-label{font-family:'Outfit',sans-serif;font-weight:700;font-size:.66rem;letter-spacing:.15em;text-transform:uppercase;color:var(--rosewood-deep);margin:18px 0 10px}
.picker{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pick{position:relative;text-align:left;border:2px solid transparent;border-radius:14px;padding:12px 12px 11px;display:flex;flex-direction:column;gap:4px;transition:border-color .15s, box-shadow .15s}
.pick.on{border-color:var(--ink);box-shadow:0 6px 16px rgba(36,28,24,.14)}
.pick-badge{position:absolute;top:-9px;right:10px;background:var(--gold);color:#fff;border-radius:999px;padding:3px 9px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.5rem;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 2px 8px rgba(166,124,61,.3)}
.pk-name{font-family:'Outfit',sans-serif;font-weight:700;font-size:.82rem;line-height:1.25}
.pk-int{font-family:'Outfit',sans-serif;font-weight:700;font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(36,28,24,.62)}
.pk-chips{display:flex;flex-wrap:wrap;gap:4px;margin-top:3px}
.pk-chips i{font-style:normal;background:rgba(255,255,255,.72);border-radius:999px;padding:2px 7px;font-size:.6rem;font-weight:600}

/* plan cards */
.plansel{display:flex;flex-direction:column;gap:22px;margin:18px 0 4px}
.plan{position:relative;text-align:left;background:#fff;border:1.5px solid rgba(36,28,24,.16);border-radius:14px;padding:16px 15px 14px;display:flex;flex-direction:column;gap:8px;transition:border-color .15s,box-shadow .15s,background .15s;width:100%}
.plan.on{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink),0 6px 16px rgba(36,28,24,.10);background:var(--blush-soft)}
.plan-badge{position:absolute;top:-10px;left:14px;background:var(--gold);color:#fff;border-radius:999px;padding:4px 11px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.56rem;letter-spacing:.09em;text-transform:uppercase;box-shadow:0 2px 8px rgba(166,124,61,.3)}
.plan-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.plan-name{font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem}
.plan-price{font-family:'Outfit',sans-serif;font-weight:800;font-size:.98rem;white-space:nowrap}
.plan-price .was{color:var(--ink-soft);text-decoration:line-through;font-weight:600;font-size:.82rem;margin-right:6px}
.plan-save{display:inline-block;background:#E4F0E4;color:#1C5E1C;border-radius:999px;padding:2px 9px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;width:fit-content}
.plan ul{list-style:none;display:flex;flex-direction:column;gap:6px}
.plan li{font-size:.88rem;line-height:1.45;padding-left:15px;position:relative}
.plan li::before{content:"";position:absolute;left:2px;top:.55em;width:5px;height:5px;border-radius:50%;background:var(--gold)}
.plan p{font-size:.88rem;line-height:1.45;color:var(--ink-soft)}

.btn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:100%;padding:17px 26px;border-radius:999px;background:var(--cta);color:#fff;font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.98rem;box-shadow:0 12px 28px rgba(0,0,0,.28);margin-top:14px}
.btn small{font-size:.62rem;letter-spacing:.14em;font-weight:700;opacity:.92}
.trust{display:flex;justify-content:space-around;margin:16px 0 6px;padding-top:12px;border-top:1px solid var(--rosewood-tint)}
.trust>div{text-align:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:.56rem;letter-spacing:.07em;text-transform:uppercase;color:var(--rosewood-deep);line-height:1.45}
.trust>div span{display:block;font-size:.95rem;margin-bottom:1px}

/* oils band */
.oils{background:var(--cream);margin-top:34px;padding:34px 0 36px;text-align:center}
.oils h2{font-size:1.75rem;margin-bottom:10px}
.oils p{color:var(--ink-soft);max-width:34em;margin:0 auto 18px;font-size:.95rem}
.statrow{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.stat{background:#fff;border:1px solid var(--rosewood-tint);border-radius:12px;padding:10px 14px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--rosewood-deep)}
.stat b{display:block;font-size:.95rem;color:var(--ink);letter-spacing:0}

/* chapter cards */
.chapter{padding:36px 0 8px}
.chapter h2{font-size:1.75rem;text-align:center;margin-bottom:6px}
.chapter .sub{text-align:center;color:var(--ink-soft);font-size:.95rem;margin-bottom:20px}
.igrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.icard{background:#fff;border:1px solid var(--rosewood-tint);border-radius:18px;padding:10px 10px 13px;display:flex;flex-direction:column;gap:7px;text-align:left}
.icard .ph{border-radius:12px;padding:10px}
.icard .ph img{border-radius:8px;mix-blend-mode:multiply}
.icard h3{font-size:1.12rem;line-height:1.05}
.ic-int{font-family:'Outfit',sans-serif;font-weight:700;font-size:.53rem;letter-spacing:.14em;text-transform:uppercase;color:var(--rosewood-deep)}
.icard p{font-size:.78rem;line-height:1.45;color:var(--ink-soft)}
.icard .pk-chips i{background:var(--cream);border:1px solid var(--rosewood-tint)}
.ic-pick{margin-top:auto;background:var(--ink);color:#fff;border-radius:999px;padding:9px 14px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;width:fit-content}

/* signature dark band */
.sig{background:#141414;margin-top:34px;padding:38px 0 42px;color:#fff}
.sig h2{font-size:1.75rem;text-align:center;color:#fff;margin-bottom:12px}
.sig h2 .em{color:#C9A25C}
.sig .lede{color:rgba(255,255,255,.85);text-align:center;max-width:36em;margin:0 auto 24px;font-size:.93rem}
.sigrid{display:grid;gap:14px}
.sigcell{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:16px}
.sigcell b{font-family:'Unna',serif;font-weight:700;font-size:1.25rem;display:block;margin-bottom:5px;letter-spacing:-.03em}
.sigcell p{font-size:.88rem;color:rgba(255,255,255,.82);line-height:1.5}
.perks{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:20px}
.perk{background:rgba(201,162,92,.15);border:1px solid rgba(201,162,92,.4);color:#E8CFA0;border-radius:999px;padding:6px 13px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase}

/* reviews */
.revs{padding:36px 0 8px}
.revs h2{font-size:1.75rem;text-align:center;margin-bottom:18px}
.rev{background:#fff;border:1px solid var(--rosewood-tint);border-radius:16px;padding:16px;margin-bottom:12px;box-shadow:var(--shadow)}
.rev .stars{color:var(--star);font-size:.8rem;letter-spacing:2px;margin-bottom:6px}
.rev p{font-style:italic;font-size:.92rem;line-height:1.55;color:var(--ink-soft)}
.rev span{display:block;margin-top:7px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rosewood-deep)}

/* FAQ + ctabreak */
.faq{padding:30px 0 8px}
.faq h2{font-size:1.75rem;text-align:center;margin-bottom:16px}
.qa{border-bottom:1px solid var(--rosewood-tint)}
.qa summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 2px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}
.qa summary::-webkit-details-marker{display:none}
.qa summary:after{content:"+";font-family:'Unna',serif;font-size:1.3rem;color:var(--rosewood-deep)}
.qa[open] summary:after{content:"–"}
.qa p{font-size:.9rem;line-height:1.55;color:var(--ink-soft);padding:0 2px 14px}
.ctabreak{background:var(--blush);margin-top:36px;padding:42px 0 46px;text-align:center}
.ctabreak h2{font-size:1.75rem;margin-bottom:8px}
.ctabreak p{color:var(--ink-soft);font-size:.95rem;margin-bottom:6px}
.footer{background:#1E1613;color:#CDBFB6;text-align:center;font-size:.72rem;padding:20px}

@media(min-width:960px){
  .pdp-grid{display:grid;grid-template-columns:1.02fr 1fr;gap:46px;align-items:start}
  .gal{position:sticky;top:18px;margin-top:26px}
  .pdp-head h1{font-size:2.6rem}
  .igrid{max-width:1000px;margin:0 auto;gap:16px}
  .sigrid{grid-template-columns:repeat(3,1fr);max-width:1000px;margin:0 auto}
  .chapter .wrap,.sig .wrap{max-width:1040px}
  .oils h2,.chapter h2,.sig h2,.revs h2,.faq h2,.ctabreak h2{font-size:2rem}
}
</style>

<div class="mockbar">Design mock — /collections/power-fragrances rework · not live</div>

<div class="pdpwrap"><div class="pdp-grid">
  <div class="gal"><div class="main"><img id="mainimg" src="__DEFAULT_IMG__" alt="Maison Croyez fragrance"></div></div>
  <div class="buycol">
    <div class="pdp-head">
      <div class="eyebrow">Maison Croyez — Power Fragrances</div>
      <h1>Maison Croyez Manifestation &amp; Attraction <span class="em">Organic Scents.</span></h1>
      <p class="lede">Every scent is composed around an intention — love, abundance, energy, relaxation, purification. Choose what you want to attract into your home; the fragrance does the rest.</p>
      <div class="microproof"><span class="stars">★★★★★</span>Loved by 2,500+ women across the U.S.</div>
      <div class="price-row"><div class="price" id="price">$39.95</div><div class="compare" id="compare">$49.95</div><div class="per" id="per">per bottle · every 45 days</div></div>
      <div class="usp-row">
        <div class="usp"><span class="u1">🌿</span>Organic</div>
        <div class="usp"><span class="u2">🐾</span>Pet-Friendly</div>
        <div class="usp"><span class="u3">⏳</span>Lasts Longer</div>
      </div>
    </div>

    <div class="sec-label">1 · Choose your intention</div>
    <div class="picker">
__PICKS__
    </div>

    <div class="sec-label">2 · Choose how you buy</div>
    <div class="plansel">
      <button class="plan on" data-plan="sub">
        <span class="plan-badge">Save $10</span>
        <div class="plan-head"><span class="plan-name">Subscribe &amp; Save</span><span class="plan-price"><span class="was">$49.95</span>$39.95</span></div>
        <ul>
          <li>A fresh bottle every 45 days — before you run out</li>
          <li>Swap your intention anytime</li>
          <li>Skip or cancel anytime, no questions</li>
        </ul>
      </button>
      <button class="plan" data-plan="one">
        <div class="plan-head"><span class="plan-name">One-Time Purchase</span><span class="plan-price">$49.95</span></div>
        <p>Buy once, no commitment. Ships free.</p>
      </button>
    </div>

    <button class="btn" id="atc"><span id="atclabel">Add to Cart · $39.95 ➔</span><small id="atcsub">Golden Blossom Harmony · every 45 days · Free shipping</small></button>
    <div class="trust">
      <div><span>🛡️</span>90-Day<br>Risk-Free Trial</div>
      <div><span>🔁</span>Swap or Cancel<br>Anytime</div>
      <div><span>🚚</span>Free<br>Shipping</div>
    </div>
  </div>
</div></div>

<div class="oils"><div class="wrap">
  <h2>Not all fragrance oils <span class="em">are created equal.</span></h2>
  <p>Most home fragrances are made with synthetic compounds designed to smell strong and fade fast. Ours are designed to feel like something.</p>
  <div class="statrow">
    <div class="stat"><b>100% Organic</b>Crafted in France</div>
    <div class="stat"><b>100ml</b>More than any competitor</div>
    <div class="stat"><b>4–6 Weeks</b>Per bottle, a few hours a day</div>
  </div>
</div></div>

<div class="chapter"><div class="wrap">
  <h2>A scent for <span class="em">every chapter.</span></h2>
  <p class="sub">Your life shifts. Your energy shifts. Your fragrance should shift with you.</p>
  <div class="igrid">
__CHAPTERS__
  </div>
</div></div>

<div class="sig"><div class="wrap">
  <h2>Once your home has a signature scent, <span class="em">you never want to go back.</span></h2>
  <p class="lede">There’s a moment — a few weeks in — when you stop noticing the fragrance consciously. But your guests still notice. Your mood still shifts when you walk through the door. That’s when you realize: this isn’t something you bought. It’s something your home became.</p>
  <div class="sigrid">
    <div class="sigcell"><b>Your scent, delivered.</b><p>Never run out. A fresh bottle arrives every 45 days, before your last one fades.</p></div>
    <div class="sigcell"><b>Your home’s signature.</b><p>The fragrance that makes people say, “your house always smells incredible.”</p></div>
    <div class="sigcell"><b>100ml of intention.</b><p>100% organic, crafted in France. Lasts longer than anything else on your shelf.</p></div>
  </div>
  <div class="perks"><span class="perk">Save $10 every bottle</span><span class="perk">Swap intentions anytime</span><span class="perk">Skip or cancel anytime</span><span class="perk">Free shipping</span></div>
</div></div>

<div class="revs"><div class="wrap">
  <h2>Real women. <span class="em">Real results.</span></h2>
  <div class="rev"><div class="stars">★★★★★</div><p>“It’s been four months. Midnight Sensation is part of my evening now. I light nothing, I do nothing — I just walk in and my bedroom already feels like mine. I can’t imagine it any other way.”</p><span>— Verified Subscriber</span></div>
  <div class="rev"><div class="stars">★★★★★</div><p>“My friends call it ‘the Maria scent’ because every time they visit, my home smells the same — warm, clean, effortless. That’s Golden Blossom Harmony. I’ve subscribed so I never run out.”</p><span>— Maria · Verified Subscriber</span></div>
</div></div>

<div class="faq"><div class="wrap">
  <h2>Questions? <span class="em">We’ve got answers.</span></h2>
  <details class="qa"><summary>How long does one bottle last?</summary><p>Running a few hours a day, a single 100ml bottle lasts 4–6 weeks. Our fragrance-saving technology delivers up to 10x the longevity of traditional plug-ins, reed diffusers, or candles.</p></details>
  <details class="qa"><summary>How does the subscription work?</summary><p>A fresh 100ml bottle ships every 45 days at $39.95 — $10 off every time. Swap your intention any cycle, skip a delivery, or cancel anytime in two taps. No minimums, no fees.</p></details>
  <details class="qa"><summary>Is it safe around kids and pets?</summary><p>Yes — every fragrance is 100% organic, hypoallergenic and non-toxic, crafted in France. No synthetic compounds, no flame, no soot.</p></details>
  <details class="qa"><summary>Do I need the Maison Croyez diffuser?</summary><p>These 100ml bottles are made for the Maison Croyez waterless diffuser. If you don’t have one yet, grab a diffuser kit first — then your scents click right in.</p></details>
</div></div>

<div class="ctabreak"><div class="wrap">
  <h2>Choose the feeling <span class="em">your home holds.</span></h2>
  <p>Seven intentions. One ritual. Delivered before you run out.</p>
  <button class="btn" style="max-width:420px;margin:14px auto 0" onclick="document.querySelector('.picker').scrollIntoView({behavior:'smooth',block:'center'})"><span>Choose My Scent ➔</span></button>
</div></div>

<div class="footer">Maison Croyez · mock for review — buttons don’t add to a real cart</div>

<script>
var SCENTS=__SCENTS_JSON__;
var sel='love', plan='sub';
function scent(){ for(var i=0;i<SCENTS.length;i++) if(SCENTS[i].key===sel) return SCENTS[i]; }
function sync(){
  document.querySelectorAll('.picker .pick').forEach(function(p){p.classList.toggle('on',p.dataset.key===sel);});
  document.querySelectorAll('.plansel .plan').forEach(function(p){p.classList.toggle('on',p.dataset.plan===plan);});
  var s=scent();
  document.getElementById('mainimg').src=document.querySelector('.pick[data-key="'+sel+'"]').dataset.img;
  var sub=plan==='sub';
  document.getElementById('price').textContent=sub?'$39.95':'$49.95';
  document.getElementById('compare').style.display=sub?'':'none';
  document.getElementById('per').textContent=sub?'per bottle · every 45 days':'one-time';
  document.getElementById('atclabel').textContent='Add to Cart · '+(sub?'$39.95':'$49.95')+' ➔';
  document.getElementById('atcsub').textContent=s.name+(sub?' · every 45 days':' · one-time')+' · Free shipping';
}
document.querySelectorAll('.picker .pick').forEach(function(p){p.addEventListener('click',function(){sel=p.dataset.key;sync();});});
document.querySelectorAll('.plansel .plan').forEach(function(p){p.addEventListener('click',function(){plan=p.dataset.plan;sync();});});
document.querySelectorAll('.ic-pick').forEach(function(b){b.addEventListener('click',function(){sel=b.dataset.key;sync();document.querySelector('.picker').scrollIntoView({behavior:'smooth',block:'center'});});});
sync();
</script>
"""

html = (html
  .replace('__PICKS__', pick_cards())
  .replace('__CHAPTERS__', chapter_cards())
  .replace('__DEFAULT_IMG__', d('frag2.jpg'))
  .replace('__SCENTS_JSON__', json.dumps([{ 'key':s['key'], 'name':s['name'] } for s in SCENTS])))

open('scents-pdp-mock.html','w').write(html)
print('scents-pdp-mock.html', len(html)//1024, 'KB')
