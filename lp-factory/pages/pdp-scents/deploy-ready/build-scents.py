#!/usr/bin/env python3
"""Build mc-scents-app.js + mc-scents.css for /collections/power-fragrances.

Takeover rail: collection descriptionHtml carries <style> + #mc-scents-root +
loader; collection templateSuffix flips from Instant to default. Same
sibling-walk takeover as the kits PDP (keeps header/footer/#cart-drawer,
hides theme content, forces the ancestor chain visible) + the stale
header-announcement hider. STANDARD theme drawer — no injector.

PLAN_ID: Subi selling plan for $39.95 / 45 days on product 8176953655405.
0 = plan not created yet -> subscription card hidden, one-time only.
When the owner creates the plan, set PLAN_ID and redeploy (one fileUpdate).
"""

PLAN_ID = 0  # <- Subi selling plan numeric id, e.g. 2661875821-style

CDN = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/"
PIMG = {"love":"18.png?v=1779490806","abundance":"16.png?v=1779490806","focus":"14.png?v=1779490806","ideas":"20.png?v=1779490807","energy":"17.png?v=1779490806","purify":"15.png?v=1779490806","midnight":"19.png?v=1779490806"}
FLAT_V = "?v=1785972642"

SCENTS = [
    {"key":"love","name":"Golden Blossom Harmony","intent":"Love","variant":45511812251757,"frag":"mc-lp-d-frag2.jpg","top":True,
     "grad":"linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)",
     "line":"For spaces that hold gratitude. For mornings that feel abundant.",
     "chips":["🌼 Buttercup","🍯 Honey","🌻 Sunflower"]},
    {"key":"abundance","name":"Crisp Citrus Scape","intent":"Abundance","variant":45511812317293,"frag":"mc-lp-d-frag4.jpg","top":True,
     "grad":"linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)",
     "line":"For the reset. The fresh start. The energy that says: I’m ready.",
     "chips":["🍃 Yuzu Leaf","🍊 Mandarin","🌲 Cypress"]},
    {"key":"focus","name":"Chilled Citrus","intent":"Relaxation & Concentration","variant":45511812153453,"frag":"mc-lp-d-frag6.jpg","top":False,
     "grad":"linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)",
     "line":"For mornings that need stillness before they need speed.",
     "chips":["🍃 Eucalyptus","🌿 Chilled Lavender","🍋 White Citrus"]},
    {"key":"ideas","name":"Honey Nectar","intent":"Turn Ideas Into Reality","variant":45511812186221,"frag":"mc-lp-d-frag1.jpg","top":False,
     "grad":"linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)",
     "line":"For the couch, the blanket, the no-plans evening. Deep, unapologetic comfort.",
     "chips":["🥛 Ginger Milk","🌿 White Birch","🍯 Eucalyptus Honey"]},
    {"key":"energy","name":"Euphoric Bloom","intent":"Raise Energy","variant":45511812218989,"frag":"mc-lp-d-frag3.jpg","top":False,
     "grad":"linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)",
     "line":"For the mood lift. The spark before the day begins. Today is yours.",
     "chips":["🌸 Jasmine Tea","🍑 White Peach","🪵 Sandalwood Crème"]},
    {"key":"purify","name":"Wildwood Mystique","intent":"Purification","variant":45511812120685,"frag":"mc-lp-d-frag5.jpg","top":False,
     "grad":"linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)",
     "line":"For the days when you need to clear everything out and start clean.",
     "chips":["🫐 Huckleberry","🌿 Mountain Fern","🌲 Wild Juniper"]},
    {"key":"midnight","name":"Midnight Sensation","intent":"Love Manifestation","variant":45511812284525,"frag":"mc-lp-d-frag7.jpg","top":True,
     "grad":"linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)",
     "line":"For evenings that deserve softness, warmth, and a little mystery.",
     "chips":["🌸 Moonflower","🌺 Night Lily","🤍 Skin Musk"]},
]

def frag_url(s): return CDN + PIMG[s["key"]] + "&width=900"
def flat_url(s): return CDN + "mc-scents-flat-" + s["key"] + ".jpg" + FLAT_V + "&width=700"

fonts = open("/home/user/maisoncroyez/lp-factory/pages/pdp-free-diffuser/src/fonts.css").read()
R = "#mc-scents-root"

css = fonts + f"""
{R}{{--blush:#ECDFDE;--blush-soft:#F3EAE8;--rosewood:#C4A59F;--rosewood-deep:#8A5B52;--rosewood-tint:#E7D6D2;--cream:#F9F5F0;--ivory:#FFFFFF;--cta:#0A9400;--ink:#241C18;--ink-soft:#5C4F48;--gold:#A67C3D;--star:#F5B301;--radius:22px;--shadow:0 10px 34px rgba(60,38,30,.12);
font-family:'Be Vietnam Pro',system-ui,sans-serif;color:var(--ink);line-height:1.55;font-size:16px;text-align:left}}
{R} *{{margin:0;padding:0;box-sizing:border-box}}
{R} img{{max-width:100%;display:block;margin:0 !important}}
{R} button{{font:inherit;color:inherit;background:none;border:0;cursor:pointer}}
{R} h1,{R} h2,{R} h3{{font-family:'Unna',serif;font-weight:700;line-height:.95;letter-spacing:-.05em;text-wrap:balance}}
{R} .em{{font-family:'Unna',serif;font-style:italic}}
{R} .wrap{{max-width:640px;margin:0 auto;padding:0 20px}}
{R} .pdpwrap{{max-width:1080px;margin:0 auto;padding:0 20px}}
{R} .eyebrow{{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.2em;font-size:.68rem;color:var(--rosewood-deep)}}
{R} .gal{{margin:14px 0 6px}}
{R} .gal .main{{border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}}
{R} .pdp-head{{display:flex;flex-direction:column;gap:10px;margin-top:16px}}
{R} .pdp-head h1{{font-size:2.36rem}}
{R} .pdp-head .lede{{color:var(--ink-soft);font-size:.95rem}}
{R} .microproof{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.64rem;letter-spacing:.15em;text-transform:uppercase;color:var(--ink)}}
{R} .microproof .stars{{color:var(--star);letter-spacing:1px;margin-right:6px}}
{R} .price-row{{display:flex;align-items:baseline;gap:12px;margin-top:2px}}
{R} .price-row .price{{font-family:'Unna',serif;font-weight:700;font-size:2.5rem;line-height:1}}
{R} .price-row .compare{{color:var(--ink-soft);text-decoration:line-through;font-weight:600;font-size:1.05rem}}
{R} .price-row .per{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--rosewood-deep)}}
{R} .usp-row{{display:flex;gap:8px;margin-top:4px}}
{R} .usp{{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;border-radius:12px;padding:10px 6px 9px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink)}}
{R} .usp span{{width:38px;height:38px;border-radius:99px;display:flex;align-items:center;justify-content:center;font-size:19px}}
{R} .usp .u1{{background:linear-gradient(145deg,#DFF3D8 0%,#BCE4C0 100%)}}
{R} .usp .u2{{background:linear-gradient(145deg,#FBE3C9 0%,#F6C99B 100%)}}
{R} .usp .u3{{background:linear-gradient(145deg,#E4D9F2 0%,#CBB7EA 100%)}}
{R} .usp:nth-child(1){{background:rgba(188,228,192,.18)}}
{R} .usp:nth-child(2){{background:rgba(246,201,155,.18)}}
{R} .usp:nth-child(3){{background:rgba(203,183,234,.18)}}
{R} .sec-label{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.66rem;letter-spacing:.15em;text-transform:uppercase;color:var(--rosewood-deep);margin:18px 0 10px}}
{R} .picker{{display:grid;grid-template-columns:1fr;gap:12px}}
{R} .pick{{position:relative;text-align:left;border:2px solid transparent;border-radius:14px;padding:12px 12px 11px;display:flex;flex-direction:column;gap:4px;transition:border-color .15s, box-shadow .15s;width:100%}}
{R} .pick.on{{border-color:var(--ink);box-shadow:0 6px 16px rgba(36,28,24,.14)}}
{R} .pick-badge{{position:absolute;top:-9px;right:10px;background:var(--gold);color:#fff;border-radius:999px;padding:3px 9px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.5rem;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 2px 8px rgba(166,124,61,.3)}}
{R} .pk-name{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.82rem;line-height:1.25}}
{R} .pk-int{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(36,28,24,.62)}}
{R} .pk-chips{{display:flex;flex-wrap:wrap;gap:4px;margin-top:3px}}
{R} .pk-chips i{{font-style:normal;background:rgba(255,255,255,.72);border-radius:999px;padding:2px 7px;font-size:.6rem;font-weight:600}}
{R} .plansel{{display:flex;flex-direction:column;gap:22px;margin:8px 0 4px}}
{R} .plan{{position:relative;text-align:left;background:#fff;border:1.5px solid rgba(36,28,24,.16);border-radius:14px;padding:16px 15px 14px;display:flex;flex-direction:column;gap:8px;transition:border-color .15s,box-shadow .15s,background .15s;width:100%}}
{R} .plan.on{{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink),0 6px 16px rgba(36,28,24,.10);background:var(--blush-soft)}}
{R} .plan-badge{{position:absolute;top:-10px;left:14px;background:var(--gold);color:#fff;border-radius:999px;padding:4px 11px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.56rem;letter-spacing:.09em;text-transform:uppercase;box-shadow:0 2px 8px rgba(166,124,61,.3)}}
{R} .plan-head{{display:flex;justify-content:space-between;align-items:baseline;gap:10px}}
{R} .plan-name{{font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem}}
{R} .plan-price{{font-family:'Outfit',sans-serif;font-weight:800;font-size:.98rem;white-space:nowrap}}
{R} .plan-price .was{{color:var(--ink-soft);text-decoration:line-through;font-weight:600;font-size:.82rem;margin-right:6px}}
{R} .plan ul{{list-style:none;display:flex;flex-direction:column;gap:6px}}
{R} .plan li{{font-size:.88rem;line-height:1.45;padding-left:15px;position:relative}}
{R} .plan li::before{{content:"";position:absolute;left:2px;top:.55em;width:5px;height:5px;border-radius:50%;background:var(--gold)}}
{R} .plan p{{font-size:.88rem;line-height:1.45;color:var(--ink-soft)}}
{R} .btn{{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:100%;padding:17px 26px;border-radius:999px;background:var(--cta);color:#fff;font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.98rem;box-shadow:0 12px 28px rgba(0,0,0,.28);margin-top:14px}}
{R} .btn small{{font-size:.62rem;letter-spacing:.14em;font-weight:700;opacity:.92}}
{R} .btn[disabled]{{opacity:.6}}
{R} .trust{{display:flex;justify-content:space-around;margin:16px 0 6px;padding-top:12px;border-top:1px solid var(--rosewood-tint)}}
{R} .trust>div{{text-align:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:.56rem;letter-spacing:.07em;text-transform:uppercase;color:var(--rosewood-deep);line-height:1.45}}
{R} .trust>div span{{display:block;font-size:.95rem;margin-bottom:1px}}
{R} .oils{{background:var(--cream);margin-top:34px;padding:34px 0 36px;text-align:center}}
{R} .oils h2{{font-size:1.75rem;margin-bottom:10px}}
{R} .oils p{{color:var(--ink-soft);max-width:34em;margin:0 auto 18px;font-size:.95rem}}
{R} .statrow{{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}}
{R} .stat{{background:#fff;border:1px solid var(--rosewood-tint);border-radius:12px;padding:10px 14px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--rosewood-deep)}}
{R} .stat b{{display:block;font-size:.95rem;color:var(--ink);letter-spacing:0}}
{R} .chapter{{padding:36px 0 8px}}
{R} .chapter h2{{font-size:1.75rem;text-align:center;margin-bottom:6px}}
{R} .chapter .sub{{text-align:center;color:var(--ink-soft);font-size:.95rem;margin-bottom:20px}}
{R} .igrid{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}
{R} .icard{{background:#fff;border:1px solid var(--rosewood-tint);border-radius:18px;padding:10px 10px 13px;display:flex;flex-direction:column;gap:7px;text-align:left}}
{R} .icard .flat{{border-radius:12px}}
{R} .icard h3{{font-size:1.12rem;line-height:1.05}}
{R} .ic-int{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.53rem;letter-spacing:.14em;text-transform:uppercase;color:var(--rosewood-deep)}}
{R} .icard p{{font-size:.78rem;line-height:1.45;color:var(--ink-soft)}}
{R} .icard .pk-chips i{{background:var(--cream);border:1px solid var(--rosewood-tint)}}
{R} .ic-pick{{margin-top:auto;background:var(--ink);color:#fff;border-radius:999px;padding:9px 14px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;width:fit-content}}
{R} .sig{{background:#141414;margin-top:34px;padding:38px 0 42px;color:#fff}}
{R} .sig h2{{font-size:1.75rem;text-align:center;color:#fff;margin-bottom:12px}}
{R} .sig h2 .em{{color:#C9A25C}}
{R} .sig .lede{{color:rgba(255,255,255,.85);text-align:center;max-width:36em;margin:0 auto 24px;font-size:.93rem}}
{R} .sigrid{{display:grid;gap:14px}}
{R} .sigcell{{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:16px}}
{R} .sigcell b{{font-family:'Unna',serif;font-weight:700;font-size:1.25rem;display:block;margin-bottom:5px;letter-spacing:-.03em}}
{R} .sigcell p{{font-size:.88rem;color:rgba(255,255,255,.82);line-height:1.5}}
{R} .perks{{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:20px}}
{R} .perk{{background:rgba(201,162,92,.15);border:1px solid rgba(201,162,92,.4);color:#E8CFA0;border-radius:999px;padding:6px 13px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase}}
{R} .revs{{padding:36px 0 8px}}
{R} .revs h2{{font-size:1.75rem;text-align:center;margin-bottom:18px}}
{R} .rev{{background:#fff;border:1px solid var(--rosewood-tint);border-radius:16px;padding:16px;margin-bottom:12px;box-shadow:var(--shadow)}}
{R} .rev .stars{{color:var(--star);font-size:.8rem;letter-spacing:2px;margin-bottom:6px}}
{R} .rev p{{font-style:italic;font-size:.92rem;line-height:1.55;color:var(--ink-soft)}}
{R} .rev span{{display:block;margin-top:7px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rosewood-deep)}}
{R} .faq{{padding:30px 0 8px}}
{R} .faq h2{{font-size:1.75rem;text-align:center;margin-bottom:16px}}
{R} .qa{{border-bottom:1px solid var(--rosewood-tint)}}
{R} .qa summary{{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 2px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}}
{R} .qa summary::-webkit-details-marker{{display:none}}
{R} .qa summary:after{{content:"+";font-family:'Unna',serif;font-size:1.3rem;color:var(--rosewood-deep)}}
{R} .qa[open] summary:after{{content:"–"}}
{R} .qa p{{font-size:.9rem;line-height:1.55;color:var(--ink-soft);padding:0 2px 14px}}
{R} .ctabreak{{background:var(--blush);margin-top:36px;padding:42px 0 46px;text-align:center}}
{R} .ctabreak h2{{font-size:1.75rem;margin-bottom:8px}}
{R} .ctabreak p{{color:var(--ink-soft);font-size:.95rem;margin-bottom:6px}}
@media(min-width:960px){{
{R} .pdp-grid{{display:grid;grid-template-columns:1.02fr 1fr;gap:46px;align-items:start}}
{R} .gal{{position:sticky;top:18px;margin-top:26px}}
{R} .pdp-head h1{{font-size:2.6rem}}
{R} .igrid{{max-width:1000px;margin:0 auto;gap:16px}}
{R} .sigrid{{grid-template-columns:repeat(3,1fr);max-width:1000px;margin:0 auto}}
{R} .chapter .wrap,{R} .sig .wrap{{max-width:1040px}}
{R} .oils h2,{R} .chapter h2,{R} .sig h2,{R} .revs h2,{R} .faq h2,{R} .ctabreak h2{{font-size:2rem}}
}}
"""

def pick_cards():
    out = []
    for i, s in enumerate(SCENTS):
        badge = '<span class="pick-badge">Top Seller</span>' if s["top"] else ''
        out.append(f'''<button class="pick{' on' if i == 0 else ''}" data-key="{s['key']}" style="background:{s['grad']}">{badge}<span class="pk-name">{s['name']}</span><span class="pk-int">{s['intent']}</span><span class="pk-chips">{''.join('<i>'+c+'</i>' for c in s['chips'])}</span></button>''')
    return ''.join(out)

def chapter_cards():
    out = []
    for s in SCENTS:
        out.append(f'''<div class="icard"><img class="flat" src="{flat_url(s)}" alt="{s['name']}" loading="lazy"><div class="ic-int">{s['intent']}</div><h3>{s['name']}</h3><p>{s['line']}</p><span class="pk-chips">{''.join('<i>'+c+'</i>' for c in s['chips'])}</span><button class="ic-pick" data-key="{s['key']}">Choose this scent ➔</button></div>''')
    return ''.join(out)

page_html = f"""
<div class="pdpwrap"><div class="pdp-grid">
  <div class="gal"><div class="main"><img id="sx-mainimg" src="{frag_url(SCENTS[0])}" alt="Maison Croyez fragrance" width="900" height="900" fetchpriority="high"></div></div>
  <div class="buycol">
    <div class="pdp-head">
      <div class="eyebrow">Maison Croyez — Power Fragrances</div>
      <h1>Maison Croyez Manifestation &amp; Attraction <span class="em">Organic Scents (100ml).</span></h1>
      <p class="lede">Every scent is composed around an intention — love, abundance, energy, relaxation, purification. Choose what you want to attract into your home; the fragrance does the rest.</p>
      <div class="microproof"><span class="stars">★★★★★</span>Loved by 2,500+ women across the U.S.</div>
      <div class="price-row"><div class="price" id="sx-price">$39.95</div><div class="compare" id="sx-compare" style="display:none">$49.95</div><div class="per" id="sx-per">one-time</div></div>
      <div class="usp-row">
        <div class="usp"><span class="u1">🌿</span>Organic</div>
        <div class="usp"><span class="u2">🐾</span>Pet-Friendly</div>
        <div class="usp"><span class="u3">⏳</span>Lasts Longer</div>
      </div>
    </div>
    <div class="sec-label">1 · Choose your intention:</div>
    <div class="picker">{pick_cards()}</div>
    <div class="sec-label">2 · Choose how you buy:</div>
    <div class="plansel">
      <button class="plan" data-plan="sub" id="sx-subplan">
        <span class="plan-badge">Save $10</span>
        <div class="plan-head"><span class="plan-name">Subscribe &amp; Save</span><span class="plan-price"><span class="was">$49.95</span>$39.95</span></div>
        <ul>
          <li>A fresh bottle every 45 days — before you run out</li>
          <li>Swap your intention anytime</li>
          <li>Skip or cancel anytime, no questions</li>
        </ul>
      </button>
      <button class="plan" data-plan="one">
        <div class="plan-head"><span class="plan-name">One-Time Purchase</span><span class="plan-price">$39.95</span></div>
        <p>Buy once, no commitment. Ships free.</p>
      </button>
    </div>
    <button class="btn" id="sx-atc"><span id="sx-atclabel">Add to Cart · $39.95 ➔</span><small id="sx-atcsub">Golden Blossom Harmony · one-time · Free shipping</small></button>
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
  <div class="igrid">{chapter_cards()}</div>
</div></div>

<div class="sig"><div class="wrap">
  <h2>Once your home has a signature scent, <span class="em">you never want to go back.</span></h2>
  <p class="lede">There’s a moment — a few weeks in — when you stop noticing the fragrance consciously. But your guests still notice. Your mood still shifts when you walk through the door. That’s when you realize: this isn’t something you bought. It’s something your home became.</p>
  <div class="sigrid">
    <div class="sigcell"><b>Your scent, delivered.</b><p>Never run out. A fresh bottle arrives every 45 days, before your last one fades.</p></div>
    <div class="sigcell"><b>Your home’s signature.</b><p>The fragrance that makes people say, “your house always smells incredible.”</p></div>
    <div class="sigcell"><b>100ml of intention.</b><p>100% organic, crafted in France. Lasts longer than anything else on your shelf.</p></div>
  </div>
  <div class="perks"><span class="perk">$39.95 per bottle</span><span class="perk">Swap intentions anytime</span><span class="perk">Skip or cancel anytime</span><span class="perk">Free shipping</span></div>
</div></div>

<div class="revs"><div class="wrap">
  <h2>Real women. <span class="em">Real results.</span></h2>
  <div class="rev"><div class="stars">★★★★★</div><p>“It’s been four months. Midnight Sensation is part of my evening now. I light nothing, I do nothing — I just walk in and my bedroom already feels like mine. I can’t imagine it any other way.”</p><span>— Verified Subscriber</span></div>
  <div class="rev"><div class="stars">★★★★★</div><p>“My friends call it ‘the Maria scent’ because every time they visit, my home smells the same — warm, clean, effortless. That’s Golden Blossom Harmony. I’ve subscribed so I never run out.”</p><span>— Maria · Verified Subscriber</span></div>
</div></div>

<div class="faq"><div class="wrap">
  <h2>Questions? <span class="em">We’ve got answers.</span></h2>
  <details class="qa"><summary>How long does one bottle last?</summary><p>Running a few hours a day, a single 100ml bottle lasts 4–6 weeks. Our fragrance-saving technology delivers up to 10x the longevity of traditional plug-ins, reed diffusers, or candles.</p></details>
  <details class="qa"><summary>How does the subscription work?</summary><p>A fresh 100ml bottle ships every 45 days at $39.95. Swap your intention any cycle, skip a delivery, or cancel anytime in two taps. No minimums, no fees.</p></details>
  <details class="qa"><summary>Is it safe around kids and pets?</summary><p>Yes — every fragrance is 100% organic, hypoallergenic and non-toxic, crafted in France. No synthetic compounds, no flame, no soot.</p></details>
  <details class="qa"><summary>Do I need the Maison Croyez diffuser?</summary><p>These 100ml bottles are made for the Maison Croyez waterless diffuser. If you don’t have one yet, grab a diffuser kit first — then your scents click right in.</p></details>
</div></div>

<div class="ctabreak"><div class="wrap">
  <h2>Choose the feeling <span class="em">your home holds.</span></h2>
  <p>Seven intentions. One ritual. Delivered before you run out.</p>
  <button class="btn" id="sx-cta2" style="max-width:420px;margin:14px auto 0"><span>Choose My Scent ➔</span></button>
</div></div>
"""

app = """/* mc-scents-app.js — /collections/power-fragrances takeover (build scents round 1)
   7 scent variants, sub $39.95/45d (PLAN_ID-gated) or one-time $49.95.
   STANDARD theme drawer — no injector. */
(function () {
  var root = document.getElementById("mc-scents-root");
  if (!root) return;

  function takeover() {
    var n = root;
    while (n && n.parentElement) {
      var p = n.parentElement;
      for (var i = 0; i < p.children.length; i++) {
        var c = p.children[i];
        if (c !== n && !/^(SCRIPT|STYLE|LINK)$/.test(c.tagName)) c.style.setProperty("display", "none", "important");
      }
      p.style.setProperty("display", "block", "important");
      p.style.setProperty("visibility", "visible", "important");
      p.style.setProperty("opacity", "1", "important");
      p.style.setProperty("height", "auto", "important");
      p.style.setProperty("max-height", "none", "important");
      p.style.setProperty("overflow", "visible", "important");
      p.style.setProperty("position", "static", "important");
      p.style.setProperty("transform", "none", "important");
      p.style.setProperty("clip-path", "none", "important");
      p.style.setProperty("padding", "0", "important");
      p.style.setProperty("margin", "0", "important");
      p.style.setProperty("width", "auto", "important");
      p.style.setProperty("max-width", "none", "important");
      if (p.tagName === "MAIN" || p.id === "main" || p === document.body) break;
      n = p;
    }
  }
  function hideStaleAnnouncement() {
    document.querySelectorAll(".shopify-section-group-header-group").forEach(function (sec) {
      for (var i = 0; i < sec.children.length; i++) {
        var c = sec.children[i];
        var t = (c.textContent || "");
        if (/Just pick the scent|diffuser is free/i.test(t) && !c.querySelector("nav") && t.replace(/\\s+/g, " ").trim().length < 260) {
          c.style.setProperty("display", "none", "important");
        } else {
          c.querySelectorAll("div,p,section").forEach(function (el) {
            var tt = (el.textContent || "").replace(/\\s+/g, " ").trim();
            if (/Just pick the scent|diffuser is free/i.test(tt) && tt.length < 260 && !el.querySelector("nav,img")) {
              el.style.setProperty("display", "none", "important");
            }
          });
        }
      }
    });
  }
  function boot() { takeover(); hideStaleAnnouncement(); }

  var PLAN_ID = __PLAN_ID__;
  var SCENTS = __SCENTS_JSON__;
  var sel = SCENTS[0].key, plan = PLAN_ID ? "sub" : "one";

  root.innerHTML = __PAGE_HTML__;
  boot();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  window.addEventListener("load", boot);

  if (!PLAN_ID) {
    var sp = root.querySelector("#sx-subplan");
    if (sp) sp.style.display = "none";
  }

  function scent() { for (var i = 0; i < SCENTS.length; i++) if (SCENTS[i].key === sel) return SCENTS[i]; }
  function sync() {
    root.querySelectorAll(".picker .pick").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-key") === sel); });
    root.querySelectorAll(".plansel .plan").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-plan") === plan); });
    var s = scent(), sub = plan === "sub";
    var main = root.querySelector("#sx-mainimg");
    if (main && main.src !== s.img) main.src = s.img;
    root.querySelector("#sx-price").textContent = "$39.95";
    root.querySelector("#sx-compare").style.display = sub ? "" : "none";
    root.querySelector("#sx-per").textContent = sub ? "per bottle \\u00B7 every 45 days" : "one-time";
    root.querySelector("#sx-atclabel").textContent = "Add to Cart \\u00B7 $39.95 \\u2794";
    root.querySelector("#sx-atcsub").textContent = s.name + (sub ? " \\u00B7 every 45 days" : " \\u00B7 one-time") + " \\u00B7 Free shipping";
  }
  root.querySelectorAll(".picker .pick").forEach(function (p) { p.addEventListener("click", function () { sel = p.getAttribute("data-key"); sync(); }); });
  root.querySelectorAll(".plansel .plan").forEach(function (p) { p.addEventListener("click", function () { plan = p.getAttribute("data-plan"); sync(); }); });
  root.querySelectorAll(".ic-pick").forEach(function (b) { b.addEventListener("click", function () { sel = b.getAttribute("data-key"); sync(); root.querySelector(".picker").scrollIntoView({ behavior: "smooth", block: "center" }); }); });
  root.querySelector("#sx-cta2").addEventListener("click", function () { root.querySelector(".picker").scrollIntoView({ behavior: "smooth", block: "center" }); });

  var atc = root.querySelector("#sx-atc"), atcLabel = root.querySelector("#sx-atclabel");
  atc.addEventListener("click", function () {
    var s = scent(), sub = plan === "sub" && PLAN_ID;
    var body = { id: s.variant, quantity: 1 };
    if (sub) body.selling_plan = PLAN_ID;
    atc.disabled = true;
    atcLabel.textContent = "Adding\\u2026";
    fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok) throw new Error("add failed " + r.status);
      return r.json();
    }).then(function () {
      atc.disabled = false; sync();
      document.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true }));
      var d = document.getElementById("cart-drawer");
      if (d && typeof d.show === "function") d.show();
      else window.location.href = "/cart";
    }).catch(function () {
      atc.disabled = false; sync();
      window.location.href = "/cart/add?id=" + s.variant + "&quantity=1";
    });
  });
  sync();
})();
"""

import json, os
app = (app
       .replace("__PLAN_ID__", str(PLAN_ID))
       .replace("__SCENTS_JSON__", json.dumps([{"key": s["key"], "name": s["name"], "variant": s["variant"], "img": frag_url(s)} for s in SCENTS]))
       .replace("__PAGE_HTML__", json.dumps(page_html)))

HERE = os.path.dirname(os.path.abspath(__file__))
open(os.path.join(HERE, "mc-scents-app.js"), "w").write(app)
open(os.path.join(HERE, "mc-scents.css"), "w").write(css)
for f in ["mc-scents-app.js", "mc-scents.css"]:
    print(f, os.path.getsize(os.path.join(HERE, f)) // 1024, "KB")
print("PLAN_ID =", PLAN_ID, "(0 = subscription hidden until Subi plan exists)")
