#!/usr/bin/env python3
"""Assemble the diffuser-kits PDP mock (artifact for owner review).
Design system: lp-factory/pages/pdp-free-diffuser/DESIGN-SYSTEM.md — replicated compactly."""
import json

imgs = json.load(open('imgs.json'))
fonts = open('/home/user/maisoncroyez/lp-factory/src/fonts.css').read()

def d(name): return 'data:image/jpeg;base64,' + imgs[name]

html = """<title>Diffuser Kits — PDP mock</title>
<style>
""" + fonts + """
:root{
  --blush:#ECDFDE;--blush-soft:#F3EAE8;--rosewood:#C4A59F;--rosewood-deep:#8A5B52;
  --rosewood-tint:#E7D6D2;--cream:#F9F5F0;--ivory:#FFFFFF;--cta:#0A9400;
  --ink:#241C18;--ink-soft:#5C4F48;--gold:#A67C3D;--star:#F5B301;
  --grad-em:linear-gradient(92deg,#7C3AED 0%,#C0589B 48%,#F59E0B 100%);
  --radius:22px;--shadow:0 10px 34px rgba(60,38,30,.12);
}
*{margin:0;padding:0;box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{font-family:'Be Vietnam Pro',system-ui,sans-serif;background:var(--ivory);color:var(--ink);line-height:1.55}
img{max-width:100%;display:block}
h1,h2{font-family:'Unna',serif;font-weight:700;line-height:.95;letter-spacing:-.05em;text-wrap:balance}
.wrap{max-width:520px;margin:0 auto;padding:0 20px}
.em{font-family:'Unna',serif;font-style:italic}
.eyebrow{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.2em;font-size:.68rem;color:var(--rosewood-deep)}

/* mock banner */
.mockbar{background:var(--ink);color:#fff;text-align:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;padding:7px 12px}

/* gallery */
.gal{margin:14px 0 6px}
.gal .main{border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}
.thumbs{display:flex;gap:8px;margin-top:10px}
.thumbs button{flex:1;border:2px solid transparent;border-radius:12px;overflow:hidden;padding:0;background:none;cursor:pointer}
.thumbs button.on{border-color:var(--ink)}

/* head block */
.pdp-head{display:flex;flex-direction:column;gap:10px;margin-top:16px}
.pdp-head h1{font-size:2.36rem}
.microproof{font-family:'Outfit',sans-serif;font-weight:700;font-size:.64rem;letter-spacing:.15em;text-transform:uppercase;color:var(--ink)}
.microproof .stars{color:var(--star);letter-spacing:1px;margin-right:6px}

/* price row */
.price-row{display:flex;align-items:baseline;gap:12px;margin-top:2px}
.price-row .price{font-family:'Unna',serif;font-weight:700;font-size:2.5rem;line-height:1}
.price-row .compare{color:var(--ink-soft);text-decoration:line-through;font-weight:600;font-size:1.05rem}
.price-row .today{font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:var(--rosewood-deep)}

/* kit cards */
.plansel{display:flex;flex-direction:column;gap:22px;margin:16px 0 4px}
.plan{position:relative;text-align:left;background:#fff;border:1.5px solid rgba(36,28,24,.16);border-radius:14px;padding:16px 15px 14px;display:flex;flex-direction:column;gap:8px;cursor:pointer;font:inherit;color:var(--ink);transition:border-color .15s,box-shadow .15s,background .15s}
.plan.on{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink),0 6px 16px rgba(36,28,24,.10);background:var(--blush-soft)}
.plan-badge{position:absolute;top:-10px;left:14px;background:var(--gold);color:#fff;border-radius:999px;padding:4px 11px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.56rem;letter-spacing:.09em;text-transform:uppercase;box-shadow:0 2px 8px rgba(166,124,61,.3)}
.plan-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.plan-name{font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem}
.plan-price{font-family:'Outfit',sans-serif;font-weight:800;font-size:.98rem;white-space:nowrap}
.plan-price .was{color:var(--ink-soft);text-decoration:line-through;font-weight:600;font-size:.82rem;margin-right:6px}
.plan-save{display:inline-block;background:#E4F0E4;color:#1C5E1C;border-radius:999px;padding:2px 9px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;width:fit-content}
.plan p{font-size:.88rem;line-height:1.45;color:var(--ink-soft)}

/* scents-sold-separately note */
.note{display:flex;gap:10px;align-items:flex-start;background:var(--cream);border:1px solid var(--rosewood-tint);border-radius:12px;padding:11px 13px;font-size:.85rem;line-height:1.5;margin:6px 0 2px}
.note b{font-style:italic}

/* bullets */
.offer-bullets{list-style:none;display:flex;flex-direction:column;gap:9px;margin:10px 0 2px}
.offer-bullets li{display:flex;gap:10px;align-items:flex-start;font-size:.94rem;line-height:1.5}
.offer-bullets .e{flex:0 0 auto;line-height:1.5}
.offer-bullets b{font-style:italic}

/* microreview */
.microreview{font-style:italic;color:var(--ink-soft);font-size:.9rem;line-height:1.55;border-left:3px solid var(--rosewood-tint);padding-left:12px;margin:10px 0 2px}
.microreview span{display:block;font-style:normal;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rosewood-deep);margin-top:5px}

/* CTA */
.btn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:100%;padding:17px 26px;border-radius:999px;background:var(--cta);color:#fff;border:0;font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.98rem;box-shadow:0 12px 28px rgba(0,0,0,.28);cursor:pointer;margin-top:12px}
.btn small{font-size:.62rem;letter-spacing:.14em;font-weight:700;opacity:.92}
.trust{display:flex;justify-content:space-around;margin:16px 0 6px;padding-top:12px;border-top:1px solid var(--rosewood-tint)}
.trust div{text-align:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:.56rem;letter-spacing:.07em;text-transform:uppercase;color:var(--rosewood-deep);line-height:1.45}
.trust div span{display:block;font-size:.95rem;margin-bottom:1px}

/* benefits */
.benefits{background:var(--cream);margin-top:34px;padding:34px 0 38px}
.benefits h2{font-size:1.6rem;text-align:center;margin-bottom:22px}
.bgrid{display:grid;grid-template-columns:1fr 1fr;gap:20px 14px}
.cell{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}
.cell .ic{font-size:38px;line-height:1}
.cell b{font-family:'Outfit',sans-serif;font-weight:700;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase}
.cell p{font-size:.83rem;line-height:1.45;color:var(--ink-soft);max-width:15em}

/* FAQ */
.faq{padding:34px 0 8px}
.faq h2{font-size:1.6rem;text-align:center;margin-bottom:16px}
.qa{border-bottom:1px solid var(--rosewood-tint)}
.qa summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 2px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}
.qa summary::-webkit-details-marker{display:none}
.qa summary:after{content:"+";font-family:'Unna',serif;font-size:1.3rem;color:var(--rosewood-deep)}
.qa[open] summary:after{content:"–"}
.qa p{font-size:.9rem;line-height:1.55;color:var(--ink-soft);padding:0 2px 14px}

/* CTA break */
.ctabreak{background:var(--blush);margin-top:36px;padding:42px 0 46px;text-align:center}
.ctabreak h2{font-size:1.75rem;margin-bottom:8px}
.ctabreak p{color:var(--ink-soft);font-size:.95rem;margin-bottom:6px}
.footer{background:#1E1613;color:#CDBFB6;text-align:center;font-size:.72rem;padding:20px;margin-top:0}
@media(min-width:760px){
  .wrap{max-width:560px}
}
</style>

<div class="mockbar">Design mock — /products/diffuser-scents rework · not live</div>

<div class="wrap">
  <div class="gal">
    <div class="main"><img id="mainimg" src="__IMG_MAIN__" alt="Maison Croyez diffuser"></div>
    <div class="thumbs">
      <button class="on" data-src="__IMG_MAIN__"><img src="__IMG_MAIN__" alt=""></button>
      <button data-src="__IMG_T1__"><img src="__IMG_T1__" alt=""></button>
      <button data-src="__IMG_T2__"><img src="__IMG_T2__" alt=""></button>
      <button data-src="__IMG_T3__"><img src="__IMG_T3__" alt=""></button>
      <button data-src="__IMG_T4__"><img src="__IMG_T4__" alt=""></button>
    </div>
  </div>

  <div class="pdp-head">
    <div class="eyebrow">Maison Croyez — Diffuser Kits</div>
    <h1>Maison Croyez Diffuser — <span class="em">Special Home Kits.</span></h1>
    <div class="microproof"><span class="stars">★★★★★</span>Loved by 2,500+ women across the U.S.</div>
    <div class="price-row">
      <div class="price" id="price">$89.95</div>
      <div class="compare" id="compare" style="display:none">$269.85</div>
    </div>
  </div>

  <div class="microreview">“I’ve tried so many diffusers that barely work. This one filled my entire living room in five minutes. Three weeks later, it’s still going strong.”<span>— Priya S. · Verified Buyer</span></div>

  <ul class="offer-bullets">
    <li><span class="e">💧</span><span>Completely waterless: <b>no mold, no cleaning, no leaks</b> — zero maintenance, ever.</span></li>
    <li><span class="e">💨</span><span>Fills rooms <b>up to 1,075 sq ft in under 10 minutes</b> — corner to corner, not a slow trickle.</span></li>
    <li><span class="e">🎛️</span><span>One button, three modes (G1 · G2 · G3) with timer &amp; auto-off — <b>set the mood, then forget it.</b></span></li>
    <li><span class="e">✨</span><span>Minimalist matte body that <b>looks like decor, not a gadget</b> — flame-free, safe around kids and pets.</span></li>
  </ul>

  <div class="plansel">
    <button class="plan on" data-price="$89.95" data-compare="" data-label="The Studio Kit · $89.95">
      <div class="plan-head"><span class="plan-name">The Studio Kit — 1 Diffuser</span><span class="plan-price">$89.95</span></div>
      <p>Best for 1-bedroom apartments, home office, bathroom.</p>
    </button>
    <button class="plan" data-price="$189.95" data-compare="$269.85" data-label="The Condo Kit · $189.95">
      <div class="plan-head"><span class="plan-name">The Condo Kit — 3 Diffusers</span><span class="plan-price"><span class="was">$269.85</span>$189.95</span></div>
      <span class="plan-save">You save $79.90</span>
      <p>Best for 2-bedroom apartments, townhomes.</p>
    </button>
    <button class="plan" data-price="$289.95" data-compare="$449.75" data-label="The House Kit · $289.95">
      <span class="plan-badge">Best Value</span>
      <div class="plan-head"><span class="plan-name">The House Kit — 5 Diffusers</span><span class="plan-price"><span class="was">$449.75</span>$289.95</span></div>
      <span class="plan-save">You save $159.80</span>
      <p>Best for penthouses, 4-bedroom houses, large spaces.</p>
    </button>
  </div>

  <button class="btn" id="atc"><span id="atclabel">Add to My Home · $89.95 ➔</span><small>One-time purchase · Free shipping</small></button>

  <div class="trust">
    <div><span>🛡️</span>90-Day<br>Risk-Free Trial</div>
    <div><span>♾️</span>Lifetime<br>Warranty</div>
    <div><span>🚚</span>Free<br>Shipping</div>
  </div>
</div>

<div class="benefits">
  <div class="wrap">
    <h2>Designed to disappear into your space. <span class="em">Built to transform it.</span></h2>
    <div class="bgrid">
      <div class="cell"><div class="ic">💧</div><b>Waterless</b><p>No water, no mold, no bacteria. Zero residue, zero upkeep.</p></div>
      <div class="cell"><div class="ic">💨</div><b>Room-Filling</b><p>Every corner in under 10 minutes. Refined, never overpowering.</p></div>
      <div class="cell"><div class="ic">🕯️</div><b>Flame-Free</b><p>No soot, no smoke, no fire risk. The clean upgrade from candles.</p></div>
      <div class="cell"><div class="ic">🌿</div><b>Clean &amp; Safe</b><p>Hypoallergenic and pet-friendly with 100% organic fragrance oils.</p></div>
      <div class="cell"><div class="ic">✨</div><b>Design-Forward</b><p>A diffuser that looks as good as your furniture. No ugly cords.</p></div>
      <div class="cell"><div class="ic">🧴</div><b>Fits Every Scent</b><p>Works with all 7 intention fragrances — swap moods room by room.</p></div>
    </div>
  </div>
</div>

<div class="faq">
  <div class="wrap">
    <h2>Questions? <span class="em">We’ve got answers.</span></h2>
    <details class="qa"><summary>Does this kit include fragrance?</summary><p>No — this page is diffusers only, so you can add devices to the rooms you love without doubling up on scents. Every diffuser is compatible with all 7 Maison Croyez intention fragrances, available separately.</p></details>
    <details class="qa"><summary>Does it actually fill the room?</summary><p>Within minutes. Unlike candles that barely scent the corner they sit in, the diffuser distributes fragrance evenly across up to 1,075 sq ft — soft enough to feel elegant, present enough that every guest notices.</p></details>
    <details class="qa"><summary>How do the intensity modes work?</summary><p>One button cycles three settings: G1 Subtle (a whisper in the background), G2 Balanced (the everyday setting), G3 Full Presence (fills the room before guests arrive). Timer and auto-off included.</p></details>
    <details class="qa"><summary>What if it’s not right for my space?</summary><p>Every kit includes a 90-Day Risk-Free Trial and a Lifetime Warranty. If it’s not right, we make it right — no questions, no hassle.</p></details>
  </div>
</div>

<div class="ctabreak">
  <div class="wrap">
    <h2>Every room deserves <span class="em">its own intention.</span></h2>
    <p>One for the entry. One for the bedroom. One for wherever life happens.</p>
    <button class="btn" style="max-width:420px;margin:14px auto 0" onclick="document.querySelector('.plansel').scrollIntoView({behavior:'smooth',block:'center'})"><span>Choose My Kit ➔</span></button>
  </div>
</div>

<div class="footer">Maison Croyez · mock for review — buttons don’t add to a real cart</div>

<script>
document.querySelectorAll('.thumbs button').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.thumbs button').forEach(function(x){x.classList.remove('on')});
    b.classList.add('on');
    document.getElementById('mainimg').src=b.dataset.src;
  });
});
document.querySelectorAll('.plan').forEach(function(p){
  p.addEventListener('click',function(){
    document.querySelectorAll('.plan').forEach(function(x){x.classList.remove('on')});
    p.classList.add('on');
    document.getElementById('price').textContent=p.dataset.price;
    var c=document.getElementById('compare');
    if(p.dataset.compare){c.textContent=p.dataset.compare;c.style.display='';}else{c.style.display='none';}
    document.getElementById('atclabel').textContent='Add to My Home · '+p.dataset.price+' ➔';
  });
});
</script>
"""

html = (html
  .replace('__IMG_MAIN__', d('25-min.jpg'))
  .replace('__IMG_T1__', d('26-min.jpg'))
  .replace('__IMG_T2__', d('27-min.jpg'))
  .replace('__IMG_T3__', d('image-1_1_1.jpg'))
  .replace('__IMG_T4__', d('image-4_1_1.jpg')))

open('kits-page-mock.html','w').write(html)
print('kits-page-mock.html', len(html)//1024, 'KB')
