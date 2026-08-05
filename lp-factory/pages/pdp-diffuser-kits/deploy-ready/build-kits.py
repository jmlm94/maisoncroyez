#!/usr/bin/env python3
"""Build mc-kits-app.js + mc-kits.css for /products/diffuser-scents.

Ship pattern: product descriptionHtml carries <style> + #mc-kits-root + loader.
templateSuffix flips from Instant to default; a JS sibling-walk hides the
theme's own PDP blocks (gallery, price, buy box, apps) while keeping the
layout-level header, footer and #cart-drawer intact. NO drawer injector here:
kit adds open the theme's standard drawer (owner requirement — custom drawer
is Circle-only, and this page stays lean).
"""

CDN = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/"
IMG = {
    "main": CDN + "25-min.png?v=1767910199&width=900",
    "t1": CDN + "26-min.png?v=1773273488&width=900",
    "t2": CDN + "27-min.png?v=1773273488&width=900",
    "t3": CDN + "image-1_1_1.png?v=1773273488&width=900",
    "t4": CDN + "image-4_1_1.png?v=1773273488&width=900",
}
VID = {n: {"mp4": CDN + f"mc-lp-d-gif{i}.mp4?v=1783552928", "webm": CDN + f"mc-lp-d-gif{i}.webm?v=1783552928"} for i, n in ((1, "s1"), (2, "s2"), (3, "s3"))}
VAR = {"studio": 43824890511469, "condo": 43824890544237, "house": 43824890577005}

fonts = open("/home/user/maisoncroyez/lp-factory/pages/pdp-free-diffuser/src/fonts.css").read()

R = "#mc-kits-root"
css = fonts + f"""
{R}{{--blush:#ECDFDE;--blush-soft:#F3EAE8;--rosewood:#C4A59F;--rosewood-deep:#8A5B52;--rosewood-tint:#E7D6D2;--cream:#F9F5F0;--ivory:#FFFFFF;--cta:#0A9400;--ink:#241C18;--ink-soft:#5C4F48;--gold:#A67C3D;--star:#F5B301;--radius:22px;--shadow:0 10px 34px rgba(60,38,30,.12);
font-family:'Be Vietnam Pro',system-ui,sans-serif;color:var(--ink);line-height:1.55;font-size:16px;text-align:left}}
{R} *{{margin:0;padding:0;box-sizing:border-box}}
{R} img{{max-width:100%;display:block;margin:0 !important}}
{R} video{{max-width:100%;display:block;margin:0 !important}}
{R} button{{font:inherit;color:inherit;background:none;border:0;cursor:pointer}}
{R} h1,{R} h2,{R} h3{{font-family:'Unna',serif;font-weight:700;line-height:.95;letter-spacing:-.05em;text-wrap:balance}}
{R} .em{{font-family:'Unna',serif;font-style:italic}}
{R} .wrap{{max-width:640px;margin:0 auto;padding:0 20px}}
{R} .pdpwrap{{max-width:1080px;margin:0 auto;padding:0 20px}}
{R} .eyebrow{{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.2em;font-size:.68rem;color:var(--rosewood-deep)}}
{R} .gal{{margin:14px 0 6px}}
{R} .gal .main{{border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}}
{R} .thumbs{{display:flex;gap:8px;margin-top:10px}}
{R} .thumbs button{{flex:1;border:2px solid transparent;border-radius:12px;overflow:hidden;padding:0}}
{R} .thumbs button.on{{border-color:var(--ink)}}
{R} .pdp-head{{display:flex;flex-direction:column;gap:10px;margin-top:16px}}
{R} .pdp-head h1{{font-size:2.36rem}}
{R} .microproof{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.64rem;letter-spacing:.15em;text-transform:uppercase;color:var(--ink)}}
{R} .microproof .stars{{color:var(--star);letter-spacing:1px;margin-right:6px}}
{R} .price-row{{display:flex;align-items:baseline;gap:12px;margin-top:2px}}
{R} .price-row .price{{font-family:'Unna',serif;font-weight:700;font-size:2.5rem;line-height:1}}
{R} .price-row .compare{{color:var(--ink-soft);text-decoration:line-through;font-weight:600;font-size:1.05rem}}
{R} .plansel{{display:flex;flex-direction:column;gap:22px;margin:16px 0 4px}}
{R} .plan{{position:relative;text-align:left;background:#fff;border:1.5px solid rgba(36,28,24,.16);border-radius:14px;padding:16px 15px 14px;display:flex;flex-direction:column;gap:8px;color:var(--ink);transition:border-color .15s,box-shadow .15s,background .15s;width:100%}}
{R} .plan.on{{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink),0 6px 16px rgba(36,28,24,.10);background:var(--blush-soft)}}
{R} .plan-badge{{position:absolute;top:-10px;left:14px;background:var(--gold);color:#fff;border-radius:999px;padding:4px 11px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.56rem;letter-spacing:.09em;text-transform:uppercase;box-shadow:0 2px 8px rgba(166,124,61,.3)}}
{R} .plan-head{{display:flex;justify-content:space-between;align-items:baseline;gap:10px}}
{R} .plan-name{{font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem}}
{R} .plan-price{{font-family:'Outfit',sans-serif;font-weight:800;font-size:.98rem;white-space:nowrap}}
{R} .plan-price .was{{color:var(--ink-soft);text-decoration:line-through;font-weight:600;font-size:.82rem;margin-right:6px}}
{R} .plan-save{{display:inline-block;background:#E4F0E4;color:#1C5E1C;border-radius:999px;padding:2px 9px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;width:fit-content}}
{R} .plan p{{font-size:.88rem;line-height:1.45;color:var(--ink-soft)}}
{R} .offer-bullets{{list-style:none;display:flex;flex-direction:column;gap:9px;margin:10px 0 2px}}
{R} .offer-bullets li{{display:flex;gap:10px;align-items:flex-start;font-size:.94rem;line-height:1.5}}
{R} .offer-bullets .e{{flex:0 0 auto;line-height:1.5}}
{R} .offer-bullets b{{font-style:italic}}
{R} .microreview{{font-style:italic;color:var(--ink-soft);font-size:.9rem;line-height:1.55;border-left:3px solid var(--rosewood-tint);padding-left:12px;margin:10px 0 2px}}
{R} .microreview span{{display:block;font-style:normal;font-family:'Outfit',sans-serif;font-weight:700;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rosewood-deep);margin-top:5px}}
{R} .btn{{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:100%;padding:17px 26px;border-radius:999px;background:var(--cta);color:#fff;font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.98rem;box-shadow:0 12px 28px rgba(0,0,0,.28);margin-top:12px}}
{R} .btn small{{font-size:.62rem;letter-spacing:.14em;font-weight:700;opacity:.92}}
{R} .btn[disabled]{{opacity:.6}}
{R} .trust{{display:flex;justify-content:space-around;margin:16px 0 6px;padding-top:12px;border-top:1px solid var(--rosewood-tint)}}
{R} .trust>div{{text-align:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:.56rem;letter-spacing:.07em;text-transform:uppercase;color:var(--rosewood-deep);line-height:1.45}}
{R} .trust>div span{{display:block;font-size:.95rem;margin-bottom:1px}}
{R} .benefits{{background:var(--cream);margin-top:34px;padding:34px 0 38px}}
{R} .benefits h2{{font-size:1.6rem;text-align:center;margin-bottom:22px}}
{R} .bgrid{{display:grid;grid-template-columns:1fr 1fr;gap:20px 14px}}
{R} .cell{{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}}
{R} .cell .ic{{font-size:38px;line-height:1}}
{R} .cell b{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase}}
{R} .cell p{{font-size:.83rem;line-height:1.45;color:var(--ink-soft);max-width:15em}}
{R} .howto{{background:#141414;margin-top:34px;padding:36px 0 42px}}
{R} .howto h2{{font-size:1.75rem;text-align:center;color:#FFFFFF;margin-bottom:18px}}
{R} .howto h2 .em{{color:#C9A25C}}
{R} .hbullets{{list-style:none;display:flex;flex-direction:column;gap:10px;max-width:30em;margin:0 auto 24px}}
{R} .hbullets li{{display:flex;gap:10px;align-items:flex-start;font-size:.94rem;line-height:1.55;color:#FFFFFF}}
{R} .hbullets li::before{{content:"";flex:0 0 auto;width:7px;height:7px;border-radius:50%;background:#C9A25C;margin-top:.55em}}
{R} .hbullets b{{font-style:italic}}
{R} .howsteps{{display:flex;flex-direction:column;gap:26px;max-width:480px;margin:0 auto}}
{R} .hstep{{background:var(--ivory);border-radius:var(--radius);padding:16px 16px 22px;box-shadow:var(--shadow);text-align:center;display:flex;flex-direction:column;gap:10px}}
{R} .hstep video{{border-radius:14px;width:100%}}
{R} .hstep .hnum{{width:34px;height:34px;border-radius:99px;background:linear-gradient(135deg,#8A5B52 0%,#3A2721 90%);color:#FFF3EC;display:flex;align-items:center;justify-content:center;margin:-28px auto 0;position:relative;font-family:'Outfit',sans-serif;font-weight:700;font-size:.9rem;border:3px solid var(--ivory)}}
{R} .hstep h3{{font-size:1.4rem;letter-spacing:-.03em}}
{R} .hstep p{{color:var(--ink-soft);font-size:.9rem;max-width:26em;margin:0 auto}}
{R} .faq{{padding:34px 0 8px}}
{R} .faq h2{{font-size:1.6rem;text-align:center;margin-bottom:16px}}
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
{R} .bgrid{{grid-template-columns:repeat(3,1fr);gap:26px 22px;max-width:960px;margin:0 auto}}
{R} .benefits .wrap,{R} .howto .wrap{{max-width:1000px}}
{R} .howsteps{{flex-direction:row;max-width:none;gap:22px;align-items:stretch}}
{R} .howsteps>*{{flex:1}}
{R} .hbullets{{max-width:34em}}
{R} .benefits h2,{R} .howto h2,{R} .faq h2,{R} .ctabreak h2{{font-size:2rem}}
}}
"""

app = """/* mc-kits-app.js — /products/diffuser-scents takeover (build kits round 1)
   Diffusers only, one-time purchase, theme's STANDARD cart drawer (no injector). */
(function () {
  var root = document.getElementById("mc-kits-root");
  if (!root) return;

  /* hide every sibling on the path root -> <main>, force the chain itself
     visible (the Instant-built default template keeps the description block
     hidden), keep header/footer/drawer */
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
  takeover();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", takeover);
  window.addEventListener("load", takeover);

  var KITS = {
    studio: { variant: __VAR_STUDIO__, name: "The Studio Kit — 1 Diffuser", price: "$89.95", compare: "" },
    condo:  { variant: __VAR_CONDO__,  name: "The Condo Kit — 3 Diffusers", price: "$189.95", compare: "$269.85" },
    house:  { variant: __VAR_HOUSE__,  name: "The House Kit — 5 Diffusers", price: "$289.95", compare: "$449.75" }
  };
  var sel = "studio";

  root.innerHTML = __PAGE_HTML__;

  var priceEl = root.querySelector("#kx-price"), compEl = root.querySelector("#kx-compare"),
      atcLabel = root.querySelector("#kx-atclabel"), atcBtn = root.querySelector("#kx-atc");

  function select(k) {
    sel = k;
    root.querySelectorAll(".plan").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-kit") === k); });
    priceEl.textContent = KITS[k].price;
    if (KITS[k].compare) { compEl.textContent = KITS[k].compare; compEl.style.display = ""; }
    else compEl.style.display = "none";
    atcLabel.textContent = "Add to My Home \\u00B7 " + KITS[k].price + " \\u2794";
  }
  root.querySelectorAll(".plan").forEach(function (p) {
    p.addEventListener("click", function () { select(p.getAttribute("data-kit")); });
  });

  root.querySelectorAll(".thumbs button").forEach(function (b) {
    b.addEventListener("click", function () {
      root.querySelectorAll(".thumbs button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      root.querySelector("#kx-mainimg").src = b.getAttribute("data-src");
    });
  });

  function addToCart() {
    atcBtn.disabled = true;
    atcLabel.textContent = "Adding\\u2026";
    fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ id: KITS[sel].variant, quantity: 1 })
    }).then(function (r) {
      if (!r.ok) throw new Error("add failed " + r.status);
      return r.json();
    }).then(function () {
      select(sel);
      atcBtn.disabled = false;
      document.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true }));
      var d = document.getElementById("cart-drawer");
      if (d && typeof d.show === "function") d.show();
      else window.location.href = "/cart";
    }).catch(function () {
      atcBtn.disabled = false;
      select(sel);
      window.location.href = "/cart/add?id=" + KITS[sel].variant + "&quantity=1";
    });
  }
  atcBtn.addEventListener("click", addToCart);
  root.querySelector("#kx-cta2").addEventListener("click", function () {
    root.querySelector(".plansel").scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
"""

page_html = f"""
<div class="pdpwrap"><div class="pdp-grid">
  <div class="gal">
    <div class="main"><img id="kx-mainimg" src="{IMG['main']}" alt="Maison Croyez diffuser" width="900" height="900" fetchpriority="high"></div>
    <div class="thumbs">
      <button class="on" data-src="{IMG['main']}" aria-label="Photo 1"><img src="{IMG['main'].replace('width=900','width=200')}" alt="" loading="lazy"></button>
      <button data-src="{IMG['t1']}" aria-label="Photo 2"><img src="{IMG['t1'].replace('width=900','width=200')}" alt="" loading="lazy"></button>
      <button data-src="{IMG['t2']}" aria-label="Photo 3"><img src="{IMG['t2'].replace('width=900','width=200')}" alt="" loading="lazy"></button>
      <button data-src="{IMG['t3']}" aria-label="Photo 4"><img src="{IMG['t3'].replace('width=900','width=200')}" alt="" loading="lazy"></button>
      <button data-src="{IMG['t4']}" aria-label="Photo 5"><img src="{IMG['t4'].replace('width=900','width=200')}" alt="" loading="lazy"></button>
    </div>
  </div>
  <div class="buycol">
    <div class="pdp-head">
      <div class="eyebrow">Maison Croyez — Diffuser Kits</div>
      <h1>Maison Croyez Diffuser — <span class="em">Special Home Kits.</span></h1>
      <div class="microproof"><span class="stars">★★★★★</span>Loved by 2,500+ women across the U.S.</div>
      <div class="price-row"><div class="price" id="kx-price">$89.95</div><div class="compare" id="kx-compare" style="display:none">$269.85</div></div>
    </div>
    <div class="microreview">“I’ve tried so many diffusers that barely work. This one filled my entire living room in five minutes. Three weeks later, it’s still going strong.”<span>— Priya S. · Verified Buyer</span></div>
    <ul class="offer-bullets">
      <li><span class="e">💧</span><span>Completely waterless: <b>no mold, no cleaning, no leaks</b> — zero maintenance, ever.</span></li>
      <li><span class="e">💨</span><span>Fills rooms <b>up to 1,075 sq ft in under 10 minutes</b> — corner to corner, not a slow trickle.</span></li>
      <li><span class="e">🎛️</span><span>One button, three modes (G1 · G2 · G3) with timer &amp; auto-off — <b>set the mood, then forget it.</b></span></li>
      <li><span class="e">✨</span><span>Minimalist matte body that <b>looks like decor, not a gadget</b> — flame-free, safe around kids and pets.</span></li>
    </ul>
    <div class="plansel">
      <button class="plan on" data-kit="studio">
        <div class="plan-head"><span class="plan-name">The Studio Kit — 1 Diffuser</span><span class="plan-price">$89.95</span></div>
        <p>Best for 1-bedroom apartments, home office, bathroom.</p>
      </button>
      <button class="plan" data-kit="condo">
        <div class="plan-head"><span class="plan-name">The Condo Kit — 3 Diffusers</span><span class="plan-price"><span class="was">$269.85</span>$189.95</span></div>
        <span class="plan-save">You save $79.90</span>
        <p>Best for 2-bedroom apartments, townhomes.</p>
      </button>
      <button class="plan" data-kit="house">
        <span class="plan-badge">Best Value</span>
        <div class="plan-head"><span class="plan-name">The House Kit — 5 Diffusers</span><span class="plan-price"><span class="was">$449.75</span>$289.95</span></div>
        <span class="plan-save">You save $159.80</span>
        <p>Best for penthouses, 4-bedroom houses, large spaces.</p>
      </button>
    </div>
    <button class="btn" id="kx-atc"><span id="kx-atclabel">Add to My Home · $89.95 ➔</span><small>One-time purchase · Free shipping</small></button>
    <div class="trust">
      <div><span>🛡️</span>90-Day<br>Risk-Free Trial</div>
      <div><span>♾️</span>Lifetime<br>Warranty</div>
      <div><span>🚚</span>Free<br>Shipping</div>
    </div>
  </div>
</div></div>

<div class="benefits"><div class="wrap">
  <h2>Designed to disappear into your space. <span class="em">Built to transform it.</span></h2>
  <div class="bgrid">
    <div class="cell"><div class="ic">💧</div><b>Waterless</b><p>No water, no mold, no bacteria. Zero residue, zero upkeep.</p></div>
    <div class="cell"><div class="ic">💨</div><b>Room-Filling</b><p>Every corner in under 10 minutes. Refined, never overpowering.</p></div>
    <div class="cell"><div class="ic">🕯️</div><b>Flame-Free</b><p>No soot, no smoke, no fire risk. The clean upgrade from candles.</p></div>
    <div class="cell"><div class="ic">🌿</div><b>Clean &amp; Safe</b><p>Hypoallergenic and pet-friendly with 100% organic fragrance oils.</p></div>
    <div class="cell"><div class="ic">✨</div><b>Design-Forward</b><p>A diffuser that looks as good as your furniture. No ugly cords.</p></div>
    <div class="cell"><div class="ic">🧴</div><b>Fits Every Scent</b><p>Works with all 7 intention fragrances — swap moods room by room.</p></div>
  </div>
</div></div>

<div class="howto"><div class="wrap">
  <h2>Three steps. <span class="em">That’s the whole ritual.</span></h2>
  <ul class="hbullets">
    <li><span>No water to refill, no app to pair, no wick to trim.</span></li>
    <li><span><b>Pour the fragrance in once, press the button once.</b> That’s the entire setup.</span></li>
    <li><span>Your home takes it from there, <b>for weeks at a time</b>.</span></li>
  </ul>
  <div class="howsteps">
    <div class="hstep"><video autoplay muted loop playsinline preload="metadata"><source src="{VID['s1']['webm']}" type="video/webm"><source src="{VID['s1']['mp4']}" type="video/mp4"></video><div class="hnum">1</div><h3>Pour in your intention</h3><p>Your 100ml fragrance. No water, no dilution.</p></div>
    <div class="hstep"><video autoplay muted loop playsinline preload="metadata"><source src="{VID['s2']['webm']}" type="video/webm"><source src="{VID['s2']['mp4']}" type="video/mp4"></video><div class="hnum">2</div><h3>Press once</h3><p>One button, three strengths: from a soft everyday scent to full presence for guests.</p></div>
    <div class="hstep"><video autoplay muted loop playsinline preload="metadata"><source src="{VID['s3']['webm']}" type="video/webm"><source src="{VID['s3']['mp4']}" type="video/mp4"></video><div class="hnum">3</div><h3>Walk away</h3><p>Under 10 minutes to fill the room. Weeks of presence.</p></div>
  </div>
</div></div>

<div class="faq"><div class="wrap">
  <h2>Questions? <span class="em">We’ve got answers.</span></h2>
  <details class="qa"><summary>Does this kit include fragrance?</summary><p>No — this page is diffusers only, so you can add devices to the rooms you love without doubling up on scents. Every diffuser is compatible with all 7 Maison Croyez intention fragrances, available separately.</p></details>
  <details class="qa"><summary>Does it actually fill the room?</summary><p>Within minutes. Unlike candles that barely scent the corner they sit in, the diffuser distributes fragrance evenly across up to 1,075 sq ft — soft enough to feel elegant, present enough that every guest notices.</p></details>
  <details class="qa"><summary>How do the intensity modes work?</summary><p>One button cycles three settings: G1 Subtle (a whisper in the background), G2 Balanced (the everyday setting), G3 Full Presence (fills the room before guests arrive). Timer and auto-off included.</p></details>
  <details class="qa"><summary>What if it’s not right for my space?</summary><p>Every kit includes a 90-Day Risk-Free Trial and a Lifetime Warranty. If it’s not right, we make it right — no questions, no hassle.</p></details>
</div></div>

<div class="ctabreak"><div class="wrap">
  <h2>Every room deserves <span class="em">its own intention.</span></h2>
  <p>One for the entry. One for the bedroom. One for wherever life happens.</p>
  <button class="btn" id="kx-cta2" style="max-width:420px;margin:14px auto 0"><span>Choose My Kit ➔</span></button>
</div></div>
"""

import json
app = (app
       .replace("__VAR_STUDIO__", str(VAR["studio"]))
       .replace("__VAR_CONDO__", str(VAR["condo"]))
       .replace("__VAR_HOUSE__", str(VAR["house"]))
       .replace("__PAGE_HTML__", json.dumps(page_html)))

import os
HERE = os.path.dirname(os.path.abspath(__file__))
open(os.path.join(HERE, "mc-kits-app.js"), "w").write(app)
open(os.path.join(HERE, "mc-kits.css"), "w").write(css)
for f in ["mc-kits-app.js", "mc-kits.css"]:
    print(f, os.path.getsize(os.path.join(HERE, f)) // 1024, "KB")
